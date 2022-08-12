import {Context} from "@tsed/platform-params";
import {MiddlewareMethods, Middleware} from "@tsed/platform-middlewares";

const {
  HIGHSCORE_TITLE,
  HIGHSCORE_DESCRIPTION,
  HIGHSCORE_LOGO_URL,
  HIGHSCORE_FAVICON_URL,
  HIGHSCORE_CSS_URL,
} = process.env;

@Middleware()
export class InjectEnvMiddleware implements MiddlewareMethods {
  use(@Context() $ctx: Context) {
    const { locals } = $ctx.response;

    locals.HIGHSCORE_TITLE = HIGHSCORE_TITLE || 'HighScore';
    locals.HIGHSCORE_DESCRIPTION = HIGHSCORE_DESCRIPTION || 'Open Source leaderboard';
    locals.HIGHSCORE_LOGO_URL = HIGHSCORE_LOGO_URL || '/logo.png';
    locals.HIGHSCORE_FAVICON_URL = HIGHSCORE_FAVICON_URL || '/favicon.ico';
    locals.HIGHSCORE_CSS_URL = HIGHSCORE_CSS_URL;
  }
}