import { Controller, Inject } from '@tsed/di';
import { Get } from '@tsed/schema';
import { View } from '@tsed/platform-views';
import { Context, PathParams, QueryParams } from '@tsed/platform-params';
import { NotFound } from '@tsed/exceptions';
import { Request, Response, UseBefore } from '@tsed/common';
import { ScoreService } from '../scores';
import { HomeService } from './HomeService';
import { HomeMiddleware } from './HomeMiddleware';

@Controller('/')
@UseBefore(HomeMiddleware)
export class HomeController {
  @Inject(HomeService)
  private homeService: HomeService;

  @Inject(ScoreService)
  private scoreService: ScoreService;

  @Get('/')
  @View('index.ejs')
  public async getHomeView(
  @QueryParams('category') category?: string,
    @QueryParams('page') page: number = 1,
  ) {
    const limit = 50;
    const skip = limit * (page - 1);

    const pages = await this.scoreService.getNumberOfPages(limit, category);
    const scores = await this.scoreService.getScores({
      category,
      limit,
      skip,
    });

    return {
      scores,
      category,
      page,
      pages,
    };
  }

  @Get('/score/:id')
  @View('score.ejs')
  public async getScoreView(@PathParams('id') id: string) {
    const score = await this.scoreService.getScore(id);

    if (!score) {
      throw new NotFound('Score doesn\'t exist !');
    }

    return {
      score,
    };
  }

  @Get('/download')
  public redirectToDownload(@Context() $ctx: Context) {
    const os = $ctx.getRequest<Request>().useragent?.platform;
    const download = this.homeService.getDownloadLink(os);

    return $ctx.getResponse<Response>().redirect(download || '/');
  }

  @Get('/privacy')
  @View('privacy.ejs')
  public getPrivacyView() {
    return {};
  }
}
