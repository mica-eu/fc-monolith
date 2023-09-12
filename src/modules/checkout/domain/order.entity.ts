import Entity from '../../@shared/entity/entity';
import Id from '../../@shared/value-object/id.value-object';
import { Client } from './client.entity';
import { Product } from './product.entity';

type OrderProps = {
  id?: string;
  client: Client;
  products: Product[];
  status?: string;
};

export class Order extends Entity {
  readonly client: Client;
  readonly products: Product[];
  status: string;

  constructor(props: OrderProps) {
    super(new Id(props.id));
    this.client = props.client;
    this.products = props.products;
    this.status = props.status ?? 'pending';
  }

  approve(): void {
    this.status = 'approved';
  }

  get total(): number {
    return this.products.reduce((total, product) => {
      return total + product.salesPrice;
    }, 0);
  }
}
