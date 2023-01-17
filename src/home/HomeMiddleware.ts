import { MiddlewareMethods, Middleware } from '@tsed/platform-middlewares';
import { Inject } from '@tsed/di';
import { Context, Locals, Request } from '@tsed/common';
import { HomeService } from './HomeService';

@Middleware()
export class HomeMiddleware implements MiddlewareMethods {
  @Inject(HomeService)
  private homeService: HomeService;

  use(@Locals() locals: any, @Context() $ctx: Context) {
    const os = $ctx.getRequest<Request>().useragent?.platform;
    const download = this.homeService.getDownloadLink(os);

    locals.download = download;
  }
}
