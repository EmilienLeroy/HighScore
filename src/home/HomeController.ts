import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import {View} from "@tsed/platform-views";

@Controller('/')
export class HomeController {
  @Get("/")
  @View("index.ejs")
  public getHomeView() {
    return {};
  }
}