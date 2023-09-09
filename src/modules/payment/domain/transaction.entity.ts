import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import Entity from '../../@shared/entity/entity';
import Id from '../../@shared/value-object/id.value-object';

export class Transaction extends Entity implements AggregateRoot {
  id: Id;
  #orderId: Id;
  #amount: number;
  #status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: Id,
    orderId: Id,
    amount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id);
    this.id = id;
    this.#orderId = orderId;
    this.#amount = amount;
    this.#status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.validate();
  }

  get orderId(): Id {
    return this.#orderId;
  }

  get amount(): number {
    return this.#amount;
  }

  get status(): string {
    return this.#status;
  }

  private validate(): void {
    if (this.#amount <= 0) {
      throw new Error('Invalid amount');
    }
  }

  public approve(): void {
    this.#status = 'approved';
  }

  public decline(): void {
    this.#status = 'rejected';
  }

  public process(): void {
    if (this.#amount >= 100) {
      this.approve();
    } else {
      this.decline();
    }
  }
}
