import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import mongoose from 'mongoose';
import SuperTest from 'supertest';
import { Score } from '../../src/scores/Score';
import { Server } from '../../src/Server';

describe('HomeController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let ScoreModel: MongooseModel<Score>;

  beforeAll(TestMongooseContext.bootstrap(Server));
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
    ScoreModel = PlatformTest.get<MongooseModel<Score>>(Score);
  });

  afterAll(TestMongooseContext.reset);

  describe('GET /', () => {
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

    it('should return the home page with the defautl title', async () => {
      const { status, text } = await request.get('/');

      expect(status).toEqual(200);
      expect(text).toMatch(/<title>HighScore<\/title>/);
      expect(text).toMatch(/<p>Player 1<\/p>/);
      expect(text).toMatch(/<div>2000<\/div>/);
    });

    it('should return the home page with a custom title', async () => {
      process.env.HIGHSCORE_TITLE = 'My Super Leaderboard';
      process.env.HIGHSCORE_DESCRIPTION = 'A super leaderboard for my games';

      const { status, text } = await request.get('/');

      expect(status).toEqual(200);
      expect(text).toMatch(/<title>My Super Leaderboard<\/title>/);
      expect(text).toMatch(/<h2 class="highscore__description">A super leaderboard for my games<\/h2>/);
      expect(text).toMatch(/<p>Player 1<\/p>/);
      expect(text).toMatch(/<div>2000<\/div>/);
    });
  });

  describe('GET /score/:id', () => {
    let score: Score;

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

      score = await new ScoreModel({
        name: 'Player 4',
        value: 1500,
        category: 'hard',
      }).save();
    });

    afterAll(TestMongooseContext.clearDatabase);

    it('should return a status 404', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const { status } = await request.get(`/score/${fakeId}`);

      expect(status).toEqual(404);
    });

    it('should return a score view', async () => {
      // eslint-disable-next-line no-underscore-dangle
      const { status, text } = await request.get(`/score/${score._id.toString()}`);

      expect(status).toEqual(200);
      expect(text).toMatch(/Player 4/);
      expect(text).toMatch(/1500/);
      expect(text).toMatch(/hard/);
    });
  });
});
