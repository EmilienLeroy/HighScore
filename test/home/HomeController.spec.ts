import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import mongoose from 'mongoose';
import SuperTest from 'supertest';
import { envs } from '../../src/config/envs';
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

  describe('GET /download', () => {
    beforeAll(() => {
      envs.HIGHSCORE_WINDOWS_DOWNLOAD_URL = '/windows';
      envs.HIGHSCORE_LINUX_DOWNLOAD_URL = '/linux';
      envs.HIGHSCORE_MACOS_DOWNLOAD_URL = '/macos';
      envs.HIGHSCORE_ANDROID_DOWNLOAD_URL = '/android';
      envs.HIGHSCORE_IOS_DOWNLOAD_URL = '/ios';
    });

    it('should redirect to the windows link', async () => {
      const { status, text } = await request
        .get('/download')
        .set(
          'User-Agent',
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
        );

      expect(status).toEqual(302);
      expect(text).toEqual('Found. Redirecting to /windows');
    });

    it('should redirect to the linux link', async () => {
      const { status, text } = await request
        .get('/download')
        .set('User-Agent', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1');

      expect(status).toEqual(302);
      expect(text).toEqual('Found. Redirecting to /linux');
    });

    it('should redirect to the macos link', async () => {
      const { status, text } = await request
        .get('/download')
        .set(
          'User-Agent',
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
        );

      expect(status).toEqual(302);
      expect(text).toEqual('Found. Redirecting to /macos');
    });

    it('should redirect to the android link', async () => {
      const { status, text } = await request
        .get('/download')
        .set(
          'User-Agent',
          'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
        );

      expect(status).toEqual(302);
      expect(text).toEqual('Found. Redirecting to /android');
    });

    it('should redirect to the ios link', async () => {
      const { status, text } = await request
        .get('/download')
        .set(
          'User-Agent',
          'Mozilla/5.0 (iPhone13,2; U; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1',
        );

      expect(status).toEqual(302);
      expect(text).toEqual('Found. Redirecting to /ios');
    });
  });

  describe('GET /privacy', () => {
    it('should get the privacy view with some custom information', async () => {
      process.env.HIGHSCORE_PRIVACY_EMAIL = 'test@test.fr';
      process.env.HIGHSCORE_PRIVACY_WEBSITE = 'privacy.test.fr';
      process.env.HIGHSCORE_PRIVACY_COUNTRY = 'france';

      const { status, text } = await request.get('/privacy').set('useragent', '');

      expect(status).toEqual(200);
      expect(text).toMatch(/Privacy/);
      expect(text).toMatch(/test@test.fr/);
      expect(text).toMatch(/privacy.test.fr/);
      expect(text).toMatch(/france/);
    });
  });
});
