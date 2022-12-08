import {join} from "path";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import session from "express-session";
import methodOverride from "method-override";
import cors from "cors";
import MongoStore from "connect-mongo";
import "@tsed/ajv";
import "@tsed/mongoose";
import "@tsed/swagger"; 
import {config} from "./config/index";
import { ScoreController } from './scores';
import { HomeController } from "./home";
import { InjectEnvMiddleware, isProduction } from "./config/envs";
import type { MongooseConnectionOptions } from "@tsed/mongoose";
import { isAuthMetrics, useAuthMetrics, useMetrics } from "./config/metrics";
import { isAuthDocs, useAuthDocs, useSwagger } from "./config/swagger";
import { useRateLimit } from "./config/limit";
import * as useragent from "express-useragent";

const [connection] = config.mongoose as MongooseConnectionOptions[];
const { 
  HIGHSCORE_SESSION_SECRET,
  HIGHSCORE_PORT
} = process.env;

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: HIGHSCORE_PORT || 8083,
  httpsPort: false,
  componentsScan: false,
  mount: {
    "/": [HomeController],
    "/api": [
      ScoreController
    ]
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
      extended: true
    }),
    InjectEnvMiddleware
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  statics: {
    "/": [
      {
        root: `./public`,
      }
    ],
    "/custom": [{
      root: './custom'
    }]
  },
  exclude: [
    "**/*.spec.ts"
  ]
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
      })
    } as session.SessionOptions
    
    if (isProduction) {
      this.app.getApp().set("trust proxy", 1);
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
