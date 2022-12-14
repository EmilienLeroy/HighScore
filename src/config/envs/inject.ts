import { Context } from '@tsed/platform-params';
import { MiddlewareMethods, Middleware } from '@tsed/platform-middlewares';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
  HIGHSCORE_PRIVACY_EMAIL,
  HIGHSCORE_PRIVACY_WEBSITE,
  HIGHSCORE_PRIVACY_COUNTRY,
} = process.env;

@Middleware()
export class InjectEnvMiddleware implements MiddlewareMethods {
  use(@Context() $ctx: Context) {
    const { locals } = $ctx.response;
    const $day = dayjs;

    $day.extend(relativeTime);

    locals.$day = $day;
    locals.HIGHSCORE_TITLE = HIGHSCORE_TITLE || 'HighScore';
    locals.HIGHSCORE_DESCRIPTION = HIGHSCORE_DESCRIPTION || 'Open Source leaderboard';
    locals.HIGHSCORE_LOGO_URL = HIGHSCORE_LOGO_URL || '/logo.png';
    locals.HIGHSCORE_FAVICON_URL = HIGHSCORE_FAVICON_URL || '/favicon.ico';
    locals.HIGHSCORE_PRIVACY_EMAIL = HIGHSCORE_PRIVACY_EMAIL || '';
    locals.HIGHSCORE_PRIVACY_WEBSITE = HIGHSCORE_PRIVACY_WEBSITE || '';
    locals.HIGHSCORE_PRIVACY_COUNTRY = HIGHSCORE_PRIVACY_COUNTRY || '';
    locals.HIGHSCORE_CSS_URL = HIGHSCORE_CSS_URL;
    locals.HIGHSCORE_DOWNLOAD_URL = HIGHSCORE_DOWNLOAD_URL;
    locals.HIGHSCORE_WINDOWS_DOWNLOAD_URL = HIGHSCORE_WINDOWS_DOWNLOAD_URL;
    locals.HIGHSCORE_LINUX_DOWNLOAD_URL = HIGHSCORE_LINUX_DOWNLOAD_URL;
    locals.HIGHSCORE_MACOS_DOWNLOAD_URL = HIGHSCORE_MACOS_DOWNLOAD_URL;
    locals.HIGHSCORE_ANDROID_DOWNLOAD_URL = HIGHSCORE_ANDROID_DOWNLOAD_URL;
    locals.HIGHSCORE_IOS_DOWNLOAD_URL = HIGHSCORE_IOS_DOWNLOAD_URL;
  }
}
