import Id from '../value-object/id.value-object';

export default class Entity {
  #id: Id;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(id?: Id) {
    this.#id = id ?? new Id();
    this.#createdAt = new Date();
    this.#updatedAt = new Date();
  }

  get id(): Id {
    return this.#id;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
