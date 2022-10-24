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
import { SwaggerSettings } from "@tsed/swagger";
import { useMetrics } from "./config/metrics";

const [connection] = config.mongoose as MongooseConnectionOptions[];
const { 
  HIGHSCORE_SESSION_SECRET,
  HIGHSCORE_DISABLE_DOCS
} = process.env;

const useSwagger = () => {
  if (HIGHSCORE_DISABLE_DOCS === 'true') {
    return undefined;
  }

  return [{
    path: "/docs",
    pathPatterns: ["/api/**"],
    specVersion: "3.0.1",
  }] as SwaggerSettings[];
}

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
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
    
    this.app.use(session(sess));
    this.app.get('/metrics', useMetrics)
  }
}
