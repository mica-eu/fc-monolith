import Product from '../domain/product.entity';

export interface ProductGatewayInterface {
  add(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}
