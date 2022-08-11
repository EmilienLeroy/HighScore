import { Controller, Inject } from "@tsed/di";
import { Get } from "@tsed/schema";
import {View} from "@tsed/platform-views";
import { ScoreService } from "../scores";

@Controller('/')
export class HomeController {
  @Inject(ScoreService)
  private scoreService: ScoreService;

  @Get("/")
  @View("index.ejs")
  public async getHomeView() {
    const scores = await this.scoreService.getScores();

    return { scores };
  }
}