import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import mongoose from 'mongoose';
import SuperTest from 'supertest';
import { Score } from '../../src/scores/Score';
import { Server } from '../../src/Server';

describe('ScoreController', () => {
  // bootstrap your Server to load all endpoints before run your test
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let ScoreModel: MongooseModel<Score>;

  beforeAll(TestMongooseContext.bootstrap(Server));
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
    ScoreModel = PlatformTest.get<MongooseModel<Score>>(Score);
  });
  afterAll(TestMongooseContext.reset);

  describe('GET /api/scores', () => {
    beforeAll(async () => {
      await new ScoreModel({
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

    it('should get all scores for the main leaderboard', async () => {
      const { body, status } = await request.get('/api/scores');

      expect(status).toEqual(200);

      expect(body[0].name).toEqual('Player 3');
      expect(body[0].rank).toEqual(1);

      expect(body[1].name).toEqual('Player 1');
      expect(body[1].rank).toEqual(2);

      expect(body[2].name).toEqual('Player 2');
      expect(body[2].rank).toEqual(3);
    });

    it('should get all scores for the hard category', async () => {
      const { body, status } = await request.get('/api/scores?category=hard');

      expect(status).toEqual(200);
      expect(body.length).toEqual(1);

      expect(body[0].name).toEqual('Player 4');
      expect(body[0].rank).toEqual(1);
    });

    it('should get the top 3 scores', async () => {
      const { body, status } = await request.get('/api/scores?limit=2');

      expect(status).toEqual(200);
      expect(body.length).toEqual(2);

      expect(body[0].name).toEqual('Player 3');
      expect(body[0].rank).toEqual(1);

      expect(body[1].name).toEqual('Player 1');
      expect(body[1].rank).toEqual(2);
    });

    it('should skip the first score', async () => {
      const { body, status } = await request.get('/api/scores?skip=1');

      expect(status).toEqual(200);

      expect(body[0].name).toEqual('Player 1');
      expect(body[0].rank).toEqual(2);
    });
  });

  describe('GET /api/scores/:id', () => {
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

    it('should return a 500 error', async () => {
      const { status } = await request.get('/api/scores/error');

      expect(status).toEqual(500);
    });

    it('should return a 404 error', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const { status } = await request.get(`/api/scores/${fakeId}`);

      expect(status).toEqual(404);
    });

    it('should return the score', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const { status, body } = await request.get(`/api/scores/${testScore._id.toString()}`);

      expect(status).toEqual(200);
      expect(body).toMatchObject({
        name: 'Player 1',
        value: 200,
        rank: 1,
      });
    });
  });

  describe('POST /api/scores', () => {
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

    it('should return an 400 status', async () => {
      const { status } = await request.post('/api/scores').send({
        name: 'wrong',
      });

      expect(status).toEqual(400);
    });

    it('should add a score', async () => {
      const { body, status } = await request.post('/api/scores').send({
        name: 'New Player',
        value: 1750,
      });

      expect(status).toEqual(201);

      expect(body).toMatchObject({
        name: 'New Player',
        value: 1750,
        rank: 2,
      });
    });
  });

  describe('PUT /api/scores/:id', () => {
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

    it('should return a 404 error', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const { status } = await request.put(`/api/scores/${fakeId}`).send({
        name: 'wrong',
        value: 1000,
      });

      expect(status).toEqual(404);
    });

    it('should update a score', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const { status, body } = await request.put(`/api/scores/${testScore._id.toString()}`).send({
        name: 'Updated Player 1',
        value: 200,
      });

      expect(status).toEqual(200);

      expect(body).toMatchObject({
        name: 'Updated Player 1',
        value: 200,
        rank: 1,
      });
    });
  });
});
