// eslint-disable-next-line max-classes-per-file
import { Property, Integer } from '@tsed/schema';

export class ScoreHttpQuery {
  @Property()
    category?: string;

  @Integer()
    limit?: number;

  @Integer()
    skip?: number;
}

export class ScoreQuery extends ScoreHttpQuery {
  @Property()
    _id?: string;

  @Property()
    session?: string;
}
