import { MiddlewareMethods, Middleware } from '@tsed/platform-middlewares';
import { BodyParams, Context } from '@tsed/common';
import BadWordsFilter from 'bad-words';
import { words } from '../../config/ban.json';
import { envs } from '../config/envs';

@Middleware()
export class ScoreMiddleware implements MiddlewareMethods {
  private filter: BadWordsFilter;

  constructor() {
    const { HIGHSCORE_DISABLE_BAD_WORDS } = envs;

    this.filter = new BadWordsFilter({
      emptyList: HIGHSCORE_DISABLE_BAD_WORDS === 'true',
    });

    this.filter.addWords(...words);
  }

  use(@BodyParams('name') name: string, @Context() $ctx: Context) {
    if (name) {
      $ctx.request.body.name = this.filter.clean(name);
    }
  }
}
