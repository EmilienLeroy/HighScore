import { Controller, Inject } from "@tsed/di";
import { Get } from "@tsed/schema";
import { View } from "@tsed/platform-views";
import { ScoreService } from "../scores";
import { PathParams, QueryParams } from "@tsed/platform-params";
import { NotFound } from "@tsed/exceptions";
import { Request, Response, UseBefore } from "@tsed/common";
import { HomeService } from "./HomeService";
import { HomeControllerMiddleware } from "./HomeMiddleware";

@Controller('/')
@UseBefore(HomeControllerMiddleware)
export class HomeController {
  @Inject(HomeService)
  private homeService: HomeService;

  @Inject(ScoreService)
  private scoreService: ScoreService;

  @Get("/")
  @View("index.ejs")
  public async getHomeView(@QueryParams('page') page: number = 1) {
    const limit = 50;
    const skip = limit * (page - 1);

    const pages = await this.scoreService.getNumberOfPages(limit);
    const scores = await this.scoreService.getScores({
      limit,
      skip
    });

    return { 
      scores,
      page, 
      pages
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
    }
  }

  @Get('/download')
  public redirectToDownload(@Request() req: Request, @Response() res: Response) {                    
    const os = req.useragent?.platform;
    const download = this.homeService.getDownloadLink(os);

    return res.redirect(download || '/');
  }
}