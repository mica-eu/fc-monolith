import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import Entity from '../../@shared/entity/entity';
import Id from '../../@shared/value-object/id.value-object';

type ClientProps = {
  id?: string;
  name: string;
  email: string;
  address: string;
};

export class Client extends Entity implements AggregateRoot {
  readonly name: string;
  readonly email: string;
  readonly address: string;

  constructor(props: ClientProps) {
    super(new Id(props.id));
    this.name = props.name;
    this.email = props.email;
    this.address = props.address;
  }
}
