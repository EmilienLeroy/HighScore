import { Model, ObjectID } from '@tsed/mongoose';
import {
  Property, Required, Groups, Format, Any,
} from '@tsed/schema';

@Model({
  collection: 'scores',
  schemaOptions: {
    timestamps: true,
  },
})
export class Score {
  @ObjectID()
  @Groups('read')
  public _id: string;

  @Required()
  @Property()
  @Groups('read', 'create', 'update')
  public name: string;

  @Required()
  @Property()
  @Groups('read', 'create', 'update')
  public value: number;

  @Groups('read')
  public rank: number;

  @Groups('!read', '!create', '!update')
  @Property()
  public session?: string;

  @Groups('read', 'create', 'update')
  @Property()
  public category?: string;

  @Groups('read', 'create', 'update')
  @Any('object')
  @Property()
  public meta?: any;

  @Groups('read')
  @Format('date')
  @Property()
  public createdAt: Date;

  @Groups('read')
  @Format('date')
  @Property()
  public updatedAt: Date;
}
