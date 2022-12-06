import {MiddlewareMethods, Middleware} from "@tsed/platform-middlewares";
import { Context } from "@tsed/common";
import BadWordsFilter from "bad-words";

@Middleware()
export class ScoreMiddleware implements MiddlewareMethods {
  private filter: BadWordsFilter;
  
  constructor() {
    this.filter = new BadWordsFilter()
  }
  
  use(@Context() $ctx: Context) {
    const { name } = $ctx.request.body;

    $ctx.request.body.name = this.filter.clean(name)
  }
}