import { inject, injectable } from 'tsyringe';
import { ListProductsOutputDto } from './list-products.dto';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import { UseCase } from '../../@shared/usecase/usecase.interface';

@injectable()
export class ListProductsUseCase implements UseCase {
  constructor(
    @inject('ProductGateway')
    private readonly productGateway: ProductGatewayInterface
  ) {}

  async execute(): Promise<ListProductsOutputDto> {
    const products = await this.productGateway.list();
    return {
      products: products.map((product) => ({
        id: product.id.value,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
