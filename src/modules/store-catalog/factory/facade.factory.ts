import { container } from 'tsyringe';
import { ProductRepository } from '../repository/product.repository';
import { FindProductUseCase } from '../usecase/find-product.usecase';
import { ListProductsUseCase } from '../usecase/list-products.usecase';
import { StoreCatalogFacade } from '../facade/store-catalog.facade';

export class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    return container
      .register('ProductGateway', ProductRepository)
      .register('FindProductUseCase', FindProductUseCase)
      .register('ListProductsUseCase', ListProductsUseCase)
      .resolve(StoreCatalogFacade);
  }
}
