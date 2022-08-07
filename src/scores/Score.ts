import { Model, ObjectID } from '@tsed/mongoose';
import { Property, Required, Groups } from '@tsed/schema';

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
}