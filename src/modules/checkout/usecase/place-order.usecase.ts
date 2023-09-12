import { inject, injectable } from 'tsyringe';
import { UseCase } from '../../@shared/usecase/usecase.interface';
import { PlaceOrderUseCaseInputDto, PlaceOrderUseCaseOutputDto } from './place-order.dto';
import { ClientAdmFacadeInterface } from '../../client-adm/facade/client-adm.facade.interface';
import { ProductAdmFacadeInterface } from '../../product-adm/facade/product-adm.facade.interface';
import { StoreCatalogFacadeInterface } from '../../store-catalog/facade/store-catalog.facade.interface';
import { PaymentFacadeInterface } from '../../payment/facade/payment.facade.interface';
import { Product } from '../domain/product.entity';
import { Client } from '../domain/client.entity';
import { Order } from '../domain/order.entity';

@injectable()
export class PlaceOrderUseCase implements UseCase {
  constructor(
    @inject('ClientAdmFacade')
    private readonly clientAdmFacade: ClientAdmFacadeInterface,
    @inject('ProductAdmFacade')
    private readonly productAdmFacade: ProductAdmFacadeInterface,
    @inject('StoreCatalogFacade')
    private readonly storeCatalogFacade: StoreCatalogFacadeInterface,
    @inject('PaymentFacade')
    private readonly paymentFacade: PaymentFacadeInterface
  ) {}

  async execute(inputDto: PlaceOrderUseCaseInputDto): Promise<PlaceOrderUseCaseOutputDto> {
    await this.validateProducts(inputDto);
    const client = await this.getClient(inputDto);
    const products = await this.getProducts(inputDto);
    const order = new Order({ client, products });
    const payment = await this.paymentFacade.process({
      orderId: order.id.value,
      amount: order.total,
    });
    if (payment.status === 'approved') {
      // create invoice
      // save order
    }
    return {
      id: order.id.value,
      invoiceId: '',
      status: order.status,
      total: order.total,
      products: order.products.map(({ id }) => ({ id: id.value })),
    };
  }

  private async validateProducts(inputDto: PlaceOrderUseCaseInputDto): Promise<void> {
    if (!inputDto.products.length) throw new Error('No product selected');
    const products = await Promise.all(
      inputDto.products.map(({ id: productId }) => this.productAdmFacade.checkStock({ productId }))
    );
    const hasProductOutOfStock = products.some(({ stock }) => stock <= 0);
    if (hasProductOutOfStock) throw new Error('Product out of stock');
  }

  private async getProducts(inputDto: PlaceOrderUseCaseInputDto): Promise<Product[]> {
    const products = await Promise.all(
      inputDto.products.map(({ id: productId }) => this.storeCatalogFacade.find(productId))
    );
    if (products.some((product) => !product)) {
      throw new Error('Product not found');
    }
    return products.map(
      ({ id, name, description, salesPrice }) => new Product({ id, name, description, salesPrice })
    );
  }

  private async getClient(inputDto: PlaceOrderUseCaseInputDto): Promise<Client> {
    const client = await this.clientAdmFacade.find(inputDto.clientId);
    if (!client) throw new Error('User does not exist');
    return new Client({
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
    });
  }
}
