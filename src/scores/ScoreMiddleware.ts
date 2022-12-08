import { MiddlewareMethods, Middleware } from "@tsed/platform-middlewares";
import { Context, Next } from "@tsed/common";
import { words } from '../../config/ban.json';
import { envs } from "src/config/envs";
import BadWordsFilter from "bad-words";


@Middleware()
export class ScoreMiddleware implements MiddlewareMethods {
  private filter: BadWordsFilter;
  
  constructor() {
    const { HIGHSCORE_DISABLE_BAD_WORDS } = envs;

    this.filter = new BadWordsFilter({ 
      emptyList: HIGHSCORE_DISABLE_BAD_WORDS === 'true' 
    });

    this.filter.addWords(...words);
  }
  
  use(@Context() $ctx: Context, @Next() next: Next) {
    if (!$ctx.request.body) {
      return next();
    }

    const { name } = $ctx.request.body;
    $ctx.request.body.name = this.filter.clean(name);
    return next();
  }
}