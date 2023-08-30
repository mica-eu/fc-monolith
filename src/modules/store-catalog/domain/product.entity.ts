import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import Entity from '../../@shared/entity/entity';
import Id from '../../@shared/value-object/id.value-object';

export class Product extends Entity implements AggregateRoot {
  constructor(
    id: Id,
    readonly name: string,
    readonly description: string,
    readonly salesPrice: number
  ) {
    super(id);
  }
}
