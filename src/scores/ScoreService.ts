import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Groups } from '@tsed/schema';
import mongoose, { PipelineStage } from 'mongoose';
import { Score } from './Score';

@Service()
export class ScoreService {
  @Inject(Score)
  private Score: MongooseModel<Score>;

  public async getScores({ _id }: { _id?: string } = {}) {
    const query = [{
      $setWindowFields: {
        sortBy: { value: -1 },
        output: {
          rank: {
            $rank: {}
          }
        }
      }
    }] as PipelineStage[];

    if (_id) {
      query.push({ 
        $match: { 
          _id: new mongoose.Types.ObjectId(_id) 
        } 
      });
    }

    return this.Score.aggregate(query);
  }

  public async getScore(_id: string) {
    const [score] = await this.getScores({ _id });
    return score;
  }

  public async addScore(@Groups('create') score: Score) {
    return new this.Score(score).save();
  }

  public async updateScore(_id: string, @Groups('update') score: Score) {
    await this.Score.updateOne({ _id }, score);
    return this.getScore(_id);
  }

  public async deleteScore(_id: string) {
    return this.Score.deleteOne({ _id });
  }
}