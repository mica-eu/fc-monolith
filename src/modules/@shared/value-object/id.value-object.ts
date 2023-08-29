import { randomUUID } from 'crypto';
import ValueObject from './value-object.interface';

export default class Id implements ValueObject {
  #value: string;

  constructor(id?: string) {
    this.#value = id ?? randomUUID().toString();
  }

  get value(): string {
    return this.#value;
  }
}
