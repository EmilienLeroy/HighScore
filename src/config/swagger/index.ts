import { SwaggerSettings } from "@tsed/swagger";
import basic from "express-basic-auth";

const { 
  HIGHSCORE_USERNAME_DOCS,
  HIGHSCORE_PASSWORD_DOCS,
  HIGHSCORE_DISABLE_DOCS 
} = process.env;


const isAuthDocs = () => {
  return HIGHSCORE_USERNAME_DOCS 
    && HIGHSCORE_PASSWORD_DOCS 
    && HIGHSCORE_DISABLE_DOCS !== 'true'
}

const useAuthDocs = () => {
  if (!isAuthDocs()) {
    return;
  }

  return basic({
    users: {
      [HIGHSCORE_USERNAME_DOCS!]: HIGHSCORE_PASSWORD_DOCS!,
    }
  })
}

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
  useSwagger,
  isAuthDocs,
  useAuthDocs
}