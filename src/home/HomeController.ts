import { Controller, Inject } from "@tsed/di";
import { Get } from "@tsed/schema";
import {View} from "@tsed/platform-views";
import { ScoreService } from "../scores";
import { QueryParams } from "@tsed/platform-params";

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
}