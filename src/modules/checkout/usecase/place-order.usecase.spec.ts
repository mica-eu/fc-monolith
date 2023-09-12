import { container } from 'tsyringe';
import { PlaceOrderUseCase } from './place-order.usecase';
import {
  ClientAdmFacadeAddInputDto,
  ClientAdmFacadeAddOutputDto,
  ClientAdmFacadeFindOutputDto,
  ClientAdmFacadeInterface,
} from '../../client-adm/facade/client-adm.facade.interface';
import {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
  ProductAdmFacadeInterface,
} from '../../product-adm/facade/product-adm.facade.interface';
import {
  StoreCatalogFacadeFindOutputDto,
  StoreCatalogFacadeInterface,
  StoreCatalogFacadeListOutputDto,
} from '../../store-catalog/facade/store-catalog.facade.interface';
import {
  PaymentFacadeInputDto,
  PaymentFacadeInterface,
  PaymentFacadeOutputDto,
} from '../../payment/facade/payment.facade.interface';
import Id from '../../@shared/value-object/id.value-object';

class ClientAdmFacadeStub implements ClientAdmFacadeInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(_inputDto: ClientAdmFacadeAddInputDto): Promise<ClientAdmFacadeAddOutputDto> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(id: string): Promise<ClientAdmFacadeFindOutputDto> {
    return Promise.resolve({
      id: 'valid_user_id',
      name: 'valid_user_name',
      email: 'valid_user_email',
      address: 'valid_user_address',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

class StoreCatalogFacadeStub implements StoreCatalogFacadeInterface {
  find(id: string): Promise<StoreCatalogFacadeFindOutputDto> {
    return Promise.resolve({
      id,
      name: 'valid_store_name',
      address: 'valid_store_address',
      description: 'valid_store_description',
      salesPrice: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  list(): Promise<StoreCatalogFacadeListOutputDto> {
    throw new Error('Method not implemented.');
  }
}

class ProductAdmFacadeStub implements ProductAdmFacadeInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addProduct(product: AddProductFacadeInputDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  checkStock(product: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return Promise.resolve({
      productId: product.productId,
      stock: 1,
    });
  }
}

class PaymentFacadeStub implements PaymentFacadeInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  process(inputDto: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return Promise.resolve({
      transactionId: 'valid_transaction_id',
      status: 'valid_status',
      amount: inputDto.amount,
      orderId: inputDto.orderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

function makeSut(): PlaceOrderUseCase {
  return container
    .register('ProductAdmFacade', ProductAdmFacadeStub)
    .register('ClientAdmFacade', ClientAdmFacadeStub)
    .register('StoreCatalogFacade', StoreCatalogFacadeStub)
    .register('PaymentFacade', PaymentFacadeStub)
    .resolve(PlaceOrderUseCase);
}

describe('PlaceOrderUseCase', () => {
  it('throws an error if client does not exist', () => {
    // @ts-expect-error ...
    jest.spyOn(ClientAdmFacadeStub.prototype, 'find').mockResolvedValueOnce(null);
    const sut = makeSut();
    expect(() =>
      sut.execute({
        clientId: 'invalid_user_id',
        products: [{ id: 'valid_product_id' }],
      })
    ).rejects.toThrow(new Error('User does not exist'));
  });

  it('throws an error if products are not valid', () => {
    const sut = makeSut();
    expect(() =>
      sut.execute({
        clientId: 'valid_client_id',
        products: [],
      })
    ).rejects.toThrow(new Error('No product selected'));
  });

  it('throws an error if product is out of stock', () => {
    jest.spyOn(ProductAdmFacadeStub.prototype, 'checkStock').mockResolvedValueOnce({
      productId: 'valid_product_id',
      stock: 0,
    });
    const sut = makeSut();
    expect(() =>
      sut.execute({
        clientId: 'valid_client_id',
        products: [{ id: 'valid_product_id' }],
      })
    ).rejects.toThrow(new Error('Product out of stock'));
  });

  it('throws an error if product not found', () => {
    // @ts-expect-error ...
    jest.spyOn(StoreCatalogFacadeStub.prototype, 'find').mockResolvedValueOnce(null);
    const sut = makeSut();
    expect(() =>
      sut.execute({
        clientId: 'valid_client_id',
        products: [{ id: 'valid_product_id' }],
      })
    ).rejects.toThrow(new Error('Product not found'));
  });

  it('places an order', async () => {
    const sut = makeSut();
    const outputDto = await sut.execute({
      clientId: 'valid_client_id',
      products: [{ id: 'valid_product_id' }],
    });
    expect(outputDto).toEqual({
      id: expect.any(String),
      invoiceId: '',
      status: 'pending',
      total: 100,
      products: [{ id: 'valid_product_id' }],
    });
  });
});
