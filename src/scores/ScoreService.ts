import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Groups } from '@tsed/schema';
import mongoose, { PipelineStage } from 'mongoose';
import { Score } from './Score';

export interface ScoreQuery {
  _id?: string,
  skip?: number,
  limit?: number
}

@Service()
export class ScoreService {
  @Inject(Score)
  private Score: MongooseModel<Score>;

  public async getScores({ _id, skip, limit }: ScoreQuery = {}) {
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

    if (skip) {
      query.push({ $skip: skip });
    }

    if (limit) {
      query.push({ $limit: limit });
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

  public async getNumberOfPages(limit: number) {
    const scores = await this.getScores();
    const pages = scores.length / limit;

    return Math.ceil(pages);
  }
}