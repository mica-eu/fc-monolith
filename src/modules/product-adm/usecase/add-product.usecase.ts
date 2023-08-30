import { inject, injectable } from 'tsyringe';
import { ProductGatewayInterface } from '../gateway/product.gateway.interface';
import { AddProductInputDto, AddProductOutputDto } from './add-product.dto';
import Product from '../domain/product.entity';
import { UseCase } from '../../@shared/usecase/usecase.interface';
import Id from '../../@shared/value-object/id.value-object';

@injectable()
export class AddProductUseCase implements UseCase {
  constructor(
    @inject('ProductGateway')
    private readonly productGateway: ProductGatewayInterface
  ) {}

  async execute(productInputDto: AddProductInputDto): Promise<AddProductOutputDto> {
    const product = new Product({
      id: new Id(productInputDto?.id),
      name: productInputDto.name,
      description: productInputDto.description,
      purchasePrice: productInputDto.purchasePrice,
      stock: productInputDto.stock,
    });
    await this.productGateway.add(product);
    const createdProduct = await this.productGateway.find(product.id.value);
    return {
      id: createdProduct.id.value,
      name: createdProduct.name,
      description: createdProduct.description,
      purchasePrice: createdProduct.purchasePrice,
      stock: createdProduct.stock,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };
  }
}
