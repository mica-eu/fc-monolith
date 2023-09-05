import { inject, injectable } from 'tsyringe';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import { FindProductInputDto, FindProductOutputDto } from './find-product.dto';

@injectable()
export class FindProductUseCase {
  constructor(
    @inject('ProductGateway')
    private readonly productGateway: ProductGatewayInterface
  ) {}

  async execute(inputDto: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productGateway.find(inputDto.id);
    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
