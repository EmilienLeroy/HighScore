import { Request, Response } from '@tsed/common';
import { collectDefaultMetrics, Registry } from 'prom-client';

const register = new Registry();

collectDefaultMetrics({ 
  register,
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