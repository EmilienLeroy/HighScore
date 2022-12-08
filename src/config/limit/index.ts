import rateLimit from 'express-rate-limit';
import { envs } from '../envs';

const { 
  HIGHSCORE_DISABLE_RATE_LIMIT,
  HIGHSCORE_RATE_LIMIT_MINUTE,
  HIGHSCORE_RATE_LIMIT_NUMBER
} = envs;

const useRateLimit = () => {
  if (HIGHSCORE_DISABLE_RATE_LIMIT === 'true') {
    return;
  }

  const minute = HIGHSCORE_RATE_LIMIT_MINUTE ? Number(HIGHSCORE_RATE_LIMIT_MINUTE) : 60;
  const number = HIGHSCORE_RATE_LIMIT_NUMBER ? Number(HIGHSCORE_RATE_LIMIT_NUMBER) : 1000;

  return rateLimit({
    windowMs: minute * 60 * 1000,
    max: number,
    standardHeaders: true,
    legacyHeaders: false,
  });
} 

export {
  useRateLimit,
}