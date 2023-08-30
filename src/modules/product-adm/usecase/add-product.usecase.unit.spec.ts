import { container } from 'tsyringe';
import { AddProductUseCase } from './add-product.usecase';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import Product from '../domain/product.entity';
import Id from '../../@shared/value-object/id.value-object';

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

function makeSut(): AddProductUseCase {
  return container.register('ProductGateway', ProductGatewayStub).resolve(AddProductUseCase);
}

describe('AddProductUseCase', () => {
  it('adds a product', async () => {
    const sut = makeSut();
    const productGatewaySpy = jest.spyOn(ProductGatewayStub.prototype, 'add');
    const productInputDto = {
      name: 'any_name',
      description: 'any_description',
      purchasePrice: 10,
      stock: 10,
    };
    const productOutputDto = await sut.execute(productInputDto);
    expect(productOutputDto).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'any_name',
        description: 'any_description',
        purchasePrice: 10,
        stock: 10,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
    expect(productGatewaySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'any_name',
        description: 'any_description',
        purchasePrice: 10,
        stock: 10,
      })
    );
  });
});
