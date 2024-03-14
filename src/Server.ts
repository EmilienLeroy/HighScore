import { join } from 'path';
import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import '@tsed/ajv';
import '@tsed/mongoose';
import '@tsed/swagger';
import type { MongooseConnectionOptions } from '@tsed/mongoose';
import * as useragent from 'express-useragent';
import { config } from './config/index';
import { ScoreController } from './scores';
import { HomeController } from './home';
import { envs, isProduction } from './config/envs';
import { isAuthMetrics, useAuthMetrics, useMetrics } from './config/metrics';
import { isAuthDocs, useAuthDocs, useSwagger } from './config/swagger';
import { useRateLimit } from './config/limit';

const [connection] = config.mongoose as MongooseConnectionOptions[];
const {
  HIGHSCORE_SESSION_SECRET,
  HIGHSCORE_PORT,
  HIGHSCORE_TITLE,
  HIGHSCORE_DESCRIPTION,
  HIGHSCORE_LOGO_URL,
  HIGHSCORE_FAVICON_URL,
  HIGHSCORE_CSS_URL,
  HIGHSCORE_DOWNLOAD_URL,
  HIGHSCORE_WINDOWS_DOWNLOAD_URL,
  HIGHSCORE_LINUX_DOWNLOAD_URL,
  HIGHSCORE_MACOS_DOWNLOAD_URL,
  HIGHSCORE_ANDROID_DOWNLOAD_URL,
  HIGHSCORE_IOS_DOWNLOAD_URL,
  HIGHSCORE_PRIVACY_EMAIL,
  HIGHSCORE_PRIVACY_WEBSITE,
  HIGHSCORE_PRIVACY_COUNTRY,
} = envs;

@Configuration({
  ...config,
  acceptMimes: ['application/json'],
  httpPort: HIGHSCORE_PORT || 8081,
  httpsPort: false,
  componentsScan: false,
  mount: {
    '/': [HomeController],
    '/api': [
      ScoreController,
    ],
  },
  swagger: useSwagger(),
  middlewares: [
    cors(),
    cookieParser(HIGHSCORE_SESSION_SECRET),
    compress({}),
    methodOverride(),
    useRateLimit(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    }),
  ],
  views: {
    root: join(process.cwd(), '../views'),
    extensions: {
      ejs: 'ejs',
    },
  },
  statics: {
    '/': [
      {
        root: './public',
      },
    ],
    '/custom': [{
      root: './custom',
    }],
  },
  exclude: [
    '**/*.spec.ts',
  ],
  highscore: {
    custom: {
      title: HIGHSCORE_TITLE || 'HighScore',
      description: HIGHSCORE_DESCRIPTION || 'Open Source leaderboard',
      logo: HIGHSCORE_LOGO_URL || '/logo.png',
      favicon: HIGHSCORE_FAVICON_URL || '/favicon.ico',
      css: HIGHSCORE_CSS_URL || '',
    },
    download: {
      default: HIGHSCORE_DOWNLOAD_URL || '',
      android: HIGHSCORE_ANDROID_DOWNLOAD_URL || '',
      ios: HIGHSCORE_IOS_DOWNLOAD_URL || '',
      windows: HIGHSCORE_WINDOWS_DOWNLOAD_URL || '',
      linux: HIGHSCORE_LINUX_DOWNLOAD_URL || '',
      macos: HIGHSCORE_MACOS_DOWNLOAD_URL || '',
    },
    privacy: {
      email: HIGHSCORE_PRIVACY_EMAIL || '',
      website: HIGHSCORE_PRIVACY_WEBSITE || '',
      country: HIGHSCORE_PRIVACY_COUNTRY || '',
    },
  },
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  public $beforeRoutesInit(): void | Promise<any> {
    const sess = {
      secret: HIGHSCORE_SESSION_SECRET || 'asupersecret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        expires: new Date(253402300000000),
      },
      store: MongoStore.create({
        mongoUrl: connection.url,
        mongoOptions: connection.connectionOptions,
      }),
    } as session.SessionOptions;

    if (isProduction) {
      this.app.getApp().set('trust proxy', 1);
      sess.cookie!.secure = true;
    }

    if (isAuthDocs()) {
      this.app.use('/docs', useAuthDocs());
    }

    if (isAuthMetrics()) {
      this.app.use('/metrics', useAuthMetrics());
    }

    this.app.use(session(sess));
    this.app.use(useragent.express());
    this.app.get('/metrics', useMetrics);
  }
}
