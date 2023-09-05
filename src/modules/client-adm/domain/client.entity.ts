import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import Entity from '../../@shared/entity/entity';
import Id from '../../@shared/value-object/id.value-object';

export class Client extends Entity implements AggregateRoot {
  constructor(id: Id, readonly name: string, readonly email: string, readonly address: string) {
    super(id);
  }
}
