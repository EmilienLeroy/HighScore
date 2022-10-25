import { Request, Response } from '@tsed/common';
import { collectDefaultMetrics, Gauge, Registry } from 'prom-client';
import { version } from '../../../package.json';
import basic from "express-basic-auth";

const { 
  HIGHSCORE_USERNAME_METRICS,
  HIGHSCORE_DISABLE_METRICS,
  HIGHSCORE_PASSWORD_METRICS
} = process.env;

const register = new Registry();

collectDefaultMetrics({ 
  register,
});

new Gauge({
  name: 'nodejs_app_version_info',
  help: 'Application version info.',
  labelNames: ['version'],
  registers: [register],
  aggregator: 'first',
  collect() {
    this.labels(version).set(1);
  },
});

const isAuthMetrics = () => {
  return HIGHSCORE_USERNAME_METRICS 
    && HIGHSCORE_PASSWORD_METRICS 
    && HIGHSCORE_DISABLE_METRICS !== 'true'
}

const useAuthMetrics = () => {
  if (!isAuthMetrics()) {
    return;
  }

  return basic({
    users: {
      [HIGHSCORE_USERNAME_METRICS!]: HIGHSCORE_PASSWORD_METRICS!,
    }
  })
}

const useMetrics = async (req: Request, res: Response) => {
  if (HIGHSCORE_DISABLE_METRICS === 'true') {
    return res.status(404).end();
  }

  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
}

export {
  register,
  useMetrics,
  isAuthMetrics,
  useAuthMetrics,
};