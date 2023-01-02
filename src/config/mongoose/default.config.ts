export default {
  id: 'default',
  url: process.env.HIGHSCORE_DB_URL || 'mongodb://localhost:27017/highscore',
  connectionOptions: { },
};
