import { injectable } from 'tsyringe';
import Id from '../../@shared/value-object/id.value-object';
import { Product } from '../domain/product.entity';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import { ProductModel } from './product.model';

@injectable()
export class ProductRepository implements ProductGatewayInterface {
  async find(id: string): Promise<Product> {
    const product = await ProductModel.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return new Product(new Id(product.id), product.name, product.description, product.salesPrice);
  }

  async list(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) =>
        new Product(new Id(product.id), product.name, product.description, product.salesPrice)
    );
  }
}
