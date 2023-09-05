import Id from '../value-object/id.value-object';

export default class Entity {
  readonly id: Id;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(id?: Id) {
    this.id = id ?? new Id();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
