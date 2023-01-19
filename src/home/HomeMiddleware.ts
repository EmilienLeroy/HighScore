import { MiddlewareMethods, Middleware } from '@tsed/platform-middlewares';
import { Constant, Inject } from '@tsed/di';
import { Context, Locals, Request } from '@tsed/common';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { HomeService } from './HomeService';

@Middleware()
export class HomeMiddleware implements MiddlewareMethods {
  @Constant('highscore.custom', '')
  private custom: Record<string, string>;

  @Constant('highscore.privacy', '')
  private privacy: Record<string, string>;

  @Inject(HomeService)
  private homeService: HomeService;

  use(@Locals() locals: any, @Context() $ctx: Context) {
    const os = $ctx.getRequest<Request>().useragent?.platform;
    const download = this.homeService.getDownloadLink(os);
    const $day = dayjs;

    $day.extend(relativeTime);
    locals.$day = $day;
    locals.download = download;
    locals.custom = this.custom;
    locals.privacy = this.privacy;
  }
}
