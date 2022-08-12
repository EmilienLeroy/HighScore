
import { Delete, Get, Groups, Post, Put, Returns } from '@tsed/schema';
import { Controller, Inject } from '@tsed/di';
import { ScoreService } from './ScoreService';
import { Score } from './Score';
import { InternalServerError, NotFound } from '@tsed/exceptions';
import { BodyParams, PathParams, QueryParams } from '@tsed/common';

@Controller('/scores')
export class ScoreController {
  @Inject(ScoreService)
  private scoreService: ScoreService;

  @Get()
  @Returns(200, Array).Of(Score).Groups('read')
  public get(
    @QueryParams('limit') limit?: number,
    @QueryParams('skip') skip?: number
  ): Promise<Score[]> {
    try {
      return this.scoreService.getScores({
        limit,
        skip,
      }); 
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  @Get('/:id')
  @Returns(200, Score).Groups('read')
  public getById(@PathParams('id') id: string) {
    try {
      return this.scoreService.getScore(id);
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  @Post('/')
  @Returns(201, Score).Groups('read')
  public post(@BodyParams() @Groups('create') score: Score) {
    try {
      return this.scoreService.addScore(score);
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  @Put('/:id')
  @Returns(200, Score).Groups('read')
  public async put(@PathParams('id') id: string, @BodyParams() @Groups('update') score: Score) {
    const oldScore = this.scoreService.getScore(id);

    if (!oldScore) {
      throw new NotFound('Can\'t find score');
    }

    try {
      const updatedScore = await this.scoreService.updateScore(id, score);
      return updatedScore;
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  @Delete('/:id')
  public async delete(@PathParams('id') id: string) {
    const oldScore = this.scoreService.getScore(id);

    if (!oldScore) {
      throw new NotFound('Can\'t find score');
    }

    try {
      const deleteInfo = await this.scoreService.deleteScore(id);
      return deleteInfo;
    } catch (error) {
      throw new InternalServerError(error);
    }
  }
}