import { container } from 'tsyringe';
import { ListProductsUseCase } from './list-products.usecase';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import { Product } from '../domain/product.entity';
import Id from '../../@shared/value-object/id.value-object';

class ProductGatewayStub implements ProductGatewayInterface {
  list(): Promise<Product[]> {
    return Promise.resolve([
      new Product(new Id('1'), 'Product 1', 'Product 1 description', 10),
      new Product(new Id('2'), 'Product 2', 'Product 2 description', 20),
    ]);
  }
}

function makeSut(): ListProductsUseCase {
  return container.register('ProductGateway', ProductGatewayStub).resolve(ListProductsUseCase);
}

describe('ListProductsUseCase', () => {
  it('lists products', async () => {
    const sut = makeSut();
    const products = await sut.execute();
    expect(products).toEqual({
      products: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Product 1 description',
          salesPrice: 10,
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Product 2 description',
          salesPrice: 20,
        },
      ],
    });
  });

  it('calls productGateway with correct params', async () => {
    const productGatewaySpy = jest.spyOn(ProductGatewayStub.prototype, 'list');
    const sut = makeSut();
    await sut.execute();
    expect(productGatewaySpy).toBeCalledTimes(1);
  });
});
