import {readFileSync} from "fs";
import {envs} from "./envs/index";
import loggerConfig from "./logger/index";
import mongooseConfig from "./mongoose/index";

const pkg = JSON.parse(readFileSync("./package.json", {encoding: "utf8"}));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  mongoose: mongooseConfig,
  // additional shared configuration
};
