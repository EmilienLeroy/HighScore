import { Request, Response } from '@tsed/common';
import { collectDefaultMetrics, Gauge, Registry } from 'prom-client';
import { version } from '../../../package.json';

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

const useMetrics = async (req: Request, res: Response) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
}

export {
  register,
  useMetrics
};