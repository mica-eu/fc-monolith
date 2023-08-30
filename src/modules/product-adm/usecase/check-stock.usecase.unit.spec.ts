import { container } from 'tsyringe';
import Id from '../../@shared/value-object/id.value-object';
import Product from '../domain/product.entity';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import { CheckStockUseCase } from './check-stock.usecase';

class ProductGatewayStub implements ProductGatewayInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(product: Product): Promise<void> {
    return Promise.resolve();
  }
  find(id: string): Promise<Product> {
    return Promise.resolve(
      new Product({
        id: new Id(id),
        name: 'any_name',
        description: 'any_description',
        purchasePrice: 10,
        stock: 10,
      })
    );
  }
}

function makeSut(): CheckStockUseCase {
  return container.register('ProductGateway', ProductGatewayStub).resolve(CheckStockUseCase);
}

describe('CheckStockUseCase', () => {
  it('gets the stock of a product', async () => {
    const sut = makeSut();
    const stock = await sut.execute({ productId: '1' });
    expect(stock).toEqual({
      productId: '1',
      stock: 10,
    });
  });

  it('calls productGateway with correct params', async () => {
    const productGatewaySpy = jest.spyOn(ProductGatewayStub.prototype, 'find');
    const sut = makeSut();
    await sut.execute({ productId: '1' });
    expect(productGatewaySpy).toHaveBeenLastCalledWith('1');
  });
});
