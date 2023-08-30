import { inject, injectable } from 'tsyringe';
import { UseCase } from '../../@shared/usecase/usecase.interface';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import { CheckStockInputDto, CheckStockOutputDto } from './check-stock.dto';

@injectable()
export class CheckStockUseCase implements UseCase {
  constructor(@inject('ProductGateway') private readonly productGateway: ProductGatewayInterface) {}

  async execute(checkStockInputDto: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this.productGateway.find(checkStockInputDto.productId);
    return {
      productId: product.id.value,
      stock: product.stock,
    };
  }
}
