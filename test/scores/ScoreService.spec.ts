import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Score, ScoreService } from '../../src/scores';

describe('ScoreService', () => {
  let service: ScoreService;
  let ScoreModel: MongooseModel<Score>;

  beforeAll(async () => {
    await PlatformTest.create();
    await TestMongooseContext.create();

    service = PlatformTest.get<ScoreService>(ScoreService);
    ScoreModel = PlatformTest.get<MongooseModel<Score>>(Score);
  });

  afterAll(TestMongooseContext.reset);

  describe('#getScores()', () => {
    let score: Score;

    beforeAll(async () => {
      score = await new ScoreModel({
        name: 'Player 0',
        value: 0,
      }).save();

      await new ScoreModel({
        name: 'Player 1',
        value: 200,
      }).save();

      await new ScoreModel({
        name: 'Player 2',
        value: 5,
      }).save();

      await new ScoreModel({
        name: 'Player 3',
        value: 2000,
      }).save();

      await new ScoreModel({
        name: 'Player 4',
        value: 1500,
        category: 'hard',
      }).save();
    });

    afterAll(TestMongooseContext.clearDatabase);

    it('should get the complete leaderboard', async () => {
      const scores = await service.getScores();

      expect(scores[0].name).toEqual('Player 3');
      expect(scores[0].rank).toEqual(1);

      expect(scores[1].name).toEqual('Player 1');
      expect(scores[1].rank).toEqual(2);

      expect(scores[2].name).toEqual('Player 2');
      expect(scores[2].rank).toEqual(3);
    });

    it('should only get the top 2', async () => {
      const scores = await service.getScores({ limit: 2 });

      expect(scores.length).toEqual(2);

      expect(scores[0].name).toEqual('Player 3');
      expect(scores[0].rank).toEqual(1);

      expect(scores[1].name).toEqual('Player 1');
      expect(scores[1].rank).toEqual(2);
    });

    it('should skip the first score', async () => {
      const scores = await service.getScores({ skip: 1 });

      expect(scores[0].name).toEqual('Player 1');
      expect(scores[0].rank).toEqual(2);
    });

    it('should skip and only get the next top 2', async () => {
      const scores = await service.getScores({ skip: 1, limit: 2 });

      expect(scores.length).toEqual(2);

      expect(scores[0].name).toEqual('Player 1');
      expect(scores[0].rank).toEqual(2);

      expect(scores[1].name).toEqual('Player 2');
      expect(scores[1].rank).toEqual(3);
    });

    it('should get leaderboard for the hard category', async () => {
      const scores = await service.getScores({ category: 'hard' });

      expect(scores.length).toEqual(1);

      expect(scores[0].name).toEqual('Player 4');
      expect(scores[0].rank).toEqual(1);
    });

    it('should get a single score with his rank', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const scores = await service.getScores({ _id: score._id });

      expect(scores.length).toEqual(1);

      expect(scores[0].name).toEqual('Player 0');
      expect(scores[0].rank).toEqual(4);
    });
  });
});
