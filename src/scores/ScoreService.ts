import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Groups } from '@tsed/schema';
import { Score } from './Score';

@Service()
export class ScoreService {
  @Inject(Score)
  private Score: MongooseModel<Score>;

  public async getScores() {
    return this.Score.find();
  }

  public async getScore(_id: string) {
    return this.Score.findOne({ _id });
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