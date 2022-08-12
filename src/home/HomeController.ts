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
  public async getHomeView(@QueryParams('page') page?: number) {
    const limit = 50;
    const skip = page ? limit * (page - 1) : 0;

    const scores = await this.scoreService.getScores({
      limit,
      skip
    });

    return { scores };
  }
}