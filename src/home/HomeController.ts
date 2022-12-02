import { Controller, Inject } from "@tsed/di";
import { Get } from "@tsed/schema";
import { View } from "@tsed/platform-views";
import { ScoreService } from "../scores";
import { PathParams, QueryParams } from "@tsed/platform-params";
import { NotFound } from "@tsed/exceptions";
import { envs } from "src/config/envs";
import { Request, Response } from "@tsed/common";

@Controller('/')
export class HomeController {
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
    const download = envs['HIGHSCORE_DOWNLOAD_URL'];
    const android = envs['HIGHSCORE_ANDROID_DOWNLOAD_URL'];
    const ios = envs['HIGHSCORE_IOS_DOWNLOAD_URL'];
    const windows = envs['HIGHSCORE_WINDOWS_DOWNLOAD_URL'];
    const linux = envs['HIGHSCORE_LINUX_DOWNLOAD_URL'];
    const macos = envs['HIGHSCORE_MACOS_DOWNLOAD_URL'];
    const os = req.useragent?.platform;

    if (os === 'Android' && android) {
      return res.redirect(android);
    }

    if (os === 'iOS' && ios) {
      return res.redirect(ios);
    }

    if (os === 'Windows' && windows) {
      return res.redirect(windows);
    }   
    
    if (os === 'Linux' && linux) {
      return res.redirect(linux);
    }

    if (os === 'Mac' && macos) {
      return res.redirect(macos);
    }

    return res.redirect(download || '/');
  }
}