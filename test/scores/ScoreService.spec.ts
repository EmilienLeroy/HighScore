import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import mongoose from 'mongoose';
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
        session: 'fakesession',
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

    it('should get scores for the fake session', async () => {
      const scores = await service.getScores({ session: 'fakesession' });

      expect(scores.length).toEqual(1);

      expect(scores[0].name).toEqual('Player 1');
      expect(scores[0].rank).toEqual(2);
    });
  });

  describe('#getScore()', () => {
    let testScore: Score;

    beforeAll(async () => {
      await new ScoreModel({
        name: 'Player 0',
        value: 0,
      }).save();

      testScore = await new ScoreModel({
        name: 'Player 1',
        value: 200,
      }).save();

      await new ScoreModel({
        name: 'Player 2',
        value: 5,
      }).save();
    });

    afterAll(TestMongooseContext.clearDatabase);

    it('should return nothing if score does not exist', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const score = await service.getScore(fakeId.toString());

      expect(score).toBeUndefined();
    });

    it('should return the score with his rank', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const score = await service.getScore(testScore._id);

      expect(score).toMatchObject({
        name: 'Player 1',
        value: 200,
        rank: 1,
      });
    });
  });

  describe('#addScore()', () => {
    beforeAll(async () => {
      await new ScoreModel({
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

    it('should throw an error if score is invalid', async () => {
      expect(async () => {
        await service.addScore({ name: 'wrong' });
      }).rejects.toThrow('Score validation failed: value: Path `value` is required.');
    });

    it('should create a score for the main leaderboard', async () => {
      const score = await service.addScore({
        name: 'New Player',
        value: 1750,
      });

      expect(score).toMatchObject({
        name: 'New Player',
        value: 1750,
        rank: 2,
      });
    });

    it('should create a score for the hard leaderboard', async () => {
      const score = await service.addScore({
        name: 'New Player',
        value: 1000,
        category: 'hard',
      });

      expect(score).toMatchObject({
        name: 'New Player',
        value: 1000,
        category: 'hard',
        rank: 2,
      });
    });

    it('should create a score with a meta field', async () => {
      const score = await service.addScore({
        name: 'New Player',
        value: 1600,
        meta: {
          level: 45,
        },
      });

      expect(score).toMatchObject({
        name: 'New Player',
        value: 1600,
        rank: 3,
        meta: {
          level: 45,
        },
      });
    });
  });

  describe('#updateScore()', () => {
    let testScore: Score;

    beforeAll(async () => {
      await new ScoreModel({
        name: 'Player 0',
        value: 0,
      }).save();

      testScore = await new ScoreModel({
        name: 'Player 1',
        value: 200,
      }).save();

      await new ScoreModel({
        name: 'Player 2',
        value: 5,
      }).save();
    });

    afterAll(TestMongooseContext.clearDatabase);

    it('should update and return nothing if score does not exist', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const score = await service.updateScore(fakeId.toString(), {
        name: 'fake',
      });

      expect(score).toBeUndefined();
    });

    it('should update a score', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const newScore = await service.updateScore(testScore._id.toString(), {
        name: 'Updated Player 1',
      });

      expect(newScore).toMatchObject({
        name: 'Updated Player 1',
        value: 200,
        rank: 1,
      });
    });
  });

  describe('#deleteScore()', () => {
    let testScore: Score;

    beforeAll(async () => {
      testScore = await new ScoreModel({
        name: 'Player 1',
        value: 200,
      }).save();
    });

    afterAll(TestMongooseContext.clearDatabase);

    it('should delete nothing if the score does not exist', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const info = await service.deleteScore(fakeId.toString());

      expect(info.deletedCount).toEqual(0);
    });

    it('should delete a score', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const info = await service.deleteScore(testScore._id.toString());

      expect(info.deletedCount).toEqual(1);
    });
  });

  describe('#getNumberOfPages()', () => {
    beforeAll(async () => {
      await new ScoreModel({
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

      await new ScoreModel({
        name: 'Player 5',
        value: 1500,
        category: 'hard',
      }).save();

      await new ScoreModel({
        name: 'Player 6',
        value: 1508,
        category: 'hard',
      }).save();

      await new ScoreModel({
        name: 'Player 7',
        value: 1300,
        category: 'hard',
      }).save();

      await new ScoreModel({
        name: 'Player 8',
        value: 15000,
        category: 'hard',
      }).save();
    });

    afterAll(TestMongooseContext.clearDatabase);

    it('should return 2 for the main leaderboard', async () => {
      const pages = await service.getNumberOfPages(3);

      expect(pages).toEqual(2);
    });

    it('should return 2 for the hard leaderboard', async () => {
      const pages = await service.getNumberOfPages(3, 'hard');

      expect(pages).toEqual(2);
    });
  });
});
