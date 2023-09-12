import { Order } from '../domain/order.entity';

export interface CheckoutGatewayInterface {
  save(order: Order): Promise<void>;
  find(id: string): Promise<Order | null>;
}
