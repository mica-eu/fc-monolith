import { inject, injectable } from 'tsyringe';
import {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
  ProductAdmFacadeInterface,
} from './product-adm.facade.interface';
import { UseCase } from '../../@shared/usecase/usecase.interface';

@injectable()
export class ProductAdmFacade implements ProductAdmFacadeInterface {
  constructor(
    @inject('AddProductUseCase')
    private readonly addProductUseCase: UseCase,
    @inject('CheckStockUseCase')
    private readonly checkStockUseCase: UseCase
  ) {}

  async addProduct(productDto: AddProductFacadeInputDto): Promise<void> {
    await this.addProductUseCase.execute({
      id: productDto.id,
      name: productDto.name,
      description: productDto.description,
      purchasePrice: productDto.purchasePrice,
      stock: productDto.stock,
    });
  }
  async checkStock(productDto: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    const stockDto = await this.checkStockUseCase.execute({
      productId: productDto.productId,
    });
    return {
      productId: stockDto.productId,
      stock: stockDto.stock,
    };
  }
}
