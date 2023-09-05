import { container } from 'tsyringe';
import { FindProductUseCase } from './find-product.usecase';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import { Product } from '../domain/product.entity';
import Id from '../../@shared/value-object/id.value-object';

class ProductGatewayStub implements ProductGatewayInterface {
  find(id: string): Promise<Product> {
    return Promise.resolve(new Product(new Id(id), 'Product 1', 'Product 1 description', 10));
  }

  list(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
}

function makeSut(): FindProductUseCase {
  return container.register('ProductGateway', ProductGatewayStub).resolve(FindProductUseCase);
}

describe('FindProductUseCase', () => {
  it('finds product', async () => {
    const sut = makeSut();
    const product = await sut.execute({ id: '1' });
    expect(product).toEqual({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 10,
    });
  });

  it('calls productGateway with correct params', async () => {
    const productGatewaySpy = jest.spyOn(ProductGatewayStub.prototype, 'find');
    const sut = makeSut();
    await sut.execute({ id: '1' });
    expect(productGatewaySpy).toBeCalledTimes(1);
    expect(productGatewaySpy).toBeCalledWith('1');
  });

  it('throws if product not found', async () => {
    const sut = makeSut();
    jest.spyOn(ProductGatewayStub.prototype, 'find').mockImplementationOnce(() => {
      throw new Error('Product not found');
    });
    await expect(sut.execute({ id: '1' })).rejects.toThrow('Product not found');
  });
});
