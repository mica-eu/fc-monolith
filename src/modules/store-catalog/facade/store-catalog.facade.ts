import { inject, injectable } from 'tsyringe';
import {
  StoreCatalogFacadeFindOutputDto,
  StoreCatalogFacadeInterface,
  StoreCatalogFacadeListOutputDto,
} from './store-catalog.facade.interface';
import { FindProductUseCase } from '../usecase/find-product.usecase';
import { ListProductsUseCase } from '../usecase/list-products.usecase';

@injectable()
export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  constructor(
    @inject('FindProductUseCase')
    private readonly findProductUseCase: FindProductUseCase,
    @inject('ListProductsUseCase')
    private readonly listProductsUseCase: ListProductsUseCase
  ) {}

  async find(id: string): Promise<StoreCatalogFacadeFindOutputDto> {
    const product = await this.findProductUseCase.execute({ id });
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
  async list(): Promise<StoreCatalogFacadeListOutputDto> {
    const { products } = await this.listProductsUseCase.execute();
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
