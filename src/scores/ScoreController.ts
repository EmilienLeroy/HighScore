import {
  Delete, Get, Groups, Post, Put, Returns,
} from '@tsed/schema';
import { Controller, Inject } from '@tsed/di';
import { NotFound } from '@tsed/exceptions';
import {
  BodyParams, PathParams, QueryParams, Request, UseBefore,
} from '@tsed/common';
import { ScoreService } from './ScoreService';
import { Score } from './Score';
import { ScoreMiddleware } from './ScoreMiddleware';

@Controller('/scores')
@UseBefore(ScoreMiddleware)
export class ScoreController {
  @Inject(ScoreService)
  private scoreService: ScoreService;

  @Get()
  @Returns(200, Array).Of(Score).Groups('read')
  public get(
    @QueryParams('category') category?: string,
      @QueryParams('limit') limit?: number,
      @QueryParams('skip') skip?: number,
  ): Promise<Score[]> {
    return this.scoreService.getScores({
      category,
      limit,
      skip,
    });
  }

  @Get('/me')
  @Returns(200, Array).Of(Score).Groups('read')
  public getMyScores(
    @Request() req: Request,
      @QueryParams('category') category?: string,
      @QueryParams('limit') limit?: number,
      @QueryParams('skip') skip?: number,
  ): Promise<Score[]> {
    return this.scoreService.getScores({
      category,
      limit,
      skip,
      session: req.sessionID,
    });
  }

  @Get('/:id')
  @Returns(200, Score).Groups('read')
  @Returns(404, NotFound).Description('Score not found')
  public async getById(@PathParams('id') id: string) {
    const score = await this.scoreService.getScore(id);

    if (!score) {
      throw new NotFound('Score not found');
    }

    return score;
  }

  @Post('/')
  @Returns(201, Score).Groups('read')
  public post(
  @BodyParams() @Groups('create') score: Score,
    @Request() req: Request,
  ) {
    return this.scoreService.addScore({
      ...score,
      session: req.sessionID,
    });
  }

  @Put('/:id')
  @Returns(200, Score).Groups('read')
  @Returns(404, NotFound).Description('Score not found')
  public async put(@PathParams('id') id: string, @BodyParams() @Groups('update') score: Score) {
    const oldScore = await this.scoreService.getScore(id);

    if (!oldScore) {
      throw new NotFound('Score not found');
    }

    return this.scoreService.updateScore(id, score);
  }

  @Delete('/:id')
  @Returns(404, NotFound).Description('Score not found')
  public async delete(@PathParams('id') id: string) {
    const oldScore = await this.scoreService.getScore(id);

    if (!oldScore) {
      throw new NotFound('Score not found');
    }

    return this.scoreService.deleteScore(id);
  }
}
