import {join} from "path";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/mongoose";
import "@tsed/swagger"; 
import {config} from "./config/index";
import { ScoreController } from './scores';
import { HomeController } from "./home";
import { InjectEnvMiddleware } from "./config/envs";


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
  swagger: [    {
    path: "/docs",
    pathPatterns: ["/api/**"],
    specVersion: "3.0.1"
  }],
  middlewares: [
    cors(),
    cookieParser(),
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
    ]
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
}
