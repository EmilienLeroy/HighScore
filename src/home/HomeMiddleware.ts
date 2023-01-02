import { MiddlewareMethods, Middleware } from '@tsed/platform-middlewares';
import { Inject } from '@tsed/di';
import { Context, Request } from '@tsed/common';
import { HomeService } from './HomeService';

@Middleware()
export class HomeMiddleware implements MiddlewareMethods {
  @Inject(HomeService)
  private homeService: HomeService;

  use(@Request() req: Request, @Context() $ctx: Context) {
    const os = req.useragent?.platform;
    const download = this.homeService.getDownloadLink(os);
    const { locals } = $ctx.response;

    locals.download = download;
  }
}
