import {Context} from "@tsed/platform-params";
import {MiddlewareMethods, Middleware} from "@tsed/platform-middlewares";
import dayjs from "dayjs";

const {
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
} = process.env;

@Middleware()
export class InjectEnvMiddleware implements MiddlewareMethods {
  use(@Context() $ctx: Context) {
    const { locals } = $ctx.response;

    locals.$day = dayjs;
    locals.HIGHSCORE_TITLE = HIGHSCORE_TITLE || 'HighScore';
    locals.HIGHSCORE_DESCRIPTION = HIGHSCORE_DESCRIPTION || 'Open Source leaderboard';
    locals.HIGHSCORE_LOGO_URL = HIGHSCORE_LOGO_URL || '/logo.png';
    locals.HIGHSCORE_FAVICON_URL = HIGHSCORE_FAVICON_URL || '/favicon.ico';
    locals.HIGHSCORE_CSS_URL = HIGHSCORE_CSS_URL;
    locals.HIGHSCORE_DOWNLOAD_URL = HIGHSCORE_DOWNLOAD_URL; 
    locals.HIGHSCORE_WINDOWS_DOWNLOAD_URL = HIGHSCORE_WINDOWS_DOWNLOAD_URL;
    locals.HIGHSCORE_LINUX_DOWNLOAD_URL = HIGHSCORE_LINUX_DOWNLOAD_URL
    locals.HIGHSCORE_MACOS_DOWNLOAD_URL = HIGHSCORE_MACOS_DOWNLOAD_URL
    locals.HIGHSCORE_ANDROID_DOWNLOAD_URL = HIGHSCORE_ANDROID_DOWNLOAD_URL
    locals.HIGHSCORE_IOS_DOWNLOAD_URL = HIGHSCORE_IOS_DOWNLOAD_URL
  }
}