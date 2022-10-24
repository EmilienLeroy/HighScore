import { SwaggerSettings } from "@tsed/swagger";

const { HIGHSCORE_DISABLE_DOCS } = process.env;

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

export {
  useSwagger
}