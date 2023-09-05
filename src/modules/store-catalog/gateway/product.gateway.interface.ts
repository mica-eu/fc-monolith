import { Product } from '../domain/product.entity';

export interface ProductGatewayInterface {
  list(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}
