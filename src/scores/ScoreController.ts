
import { Get } from '@tsed/schema';
import { Controller, Inject } from '@tsed/di';
import { ScoreService } from './ScoreService';
import { Score } from './Score';

@Controller('/scores')
export class ScoreController {
  @Inject(ScoreService)
  private scoreService: ScoreService;

  @Get()
  getScores(): Promise<Score[]> {
    return this.scoreService.getScores();
  }
}