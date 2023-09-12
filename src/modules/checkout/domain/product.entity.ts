import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import Entity from '../../@shared/entity/entity';
import Id from '../../@shared/value-object/id.value-object';

type ProductProps = {
  id?: string;
  name: string;
  description: string;
  salesPrice: number;
};

export class Product extends Entity implements AggregateRoot {
  readonly name: string;
  readonly description: string;
  readonly salesPrice: number;

  constructor(props: ProductProps) {
    super(new Id(props.id));
    this.name = props.name;
    this.description = props.description;
    this.salesPrice = props.salesPrice;
  }
}
