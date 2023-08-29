import { container } from 'tsyringe';
import { ProductAdmFacade } from '../facade/product-adm.facade';
import { AddProductUseCase } from '../usecase/add-product.usecase';
import { CheckStockUseCase } from '../usecase/check-stock.usecase';
import { ProductRepository } from '../repository/product.repository';

export class ProductAdmFacadeFactory {
  static create(): ProductAdmFacade {
    return container
      .register('ProductGateway', ProductRepository)
      .register('AddProductUseCase', AddProductUseCase)
      .register('CheckStockUseCase', CheckStockUseCase)
      .resolve(ProductAdmFacade);
  }
}
