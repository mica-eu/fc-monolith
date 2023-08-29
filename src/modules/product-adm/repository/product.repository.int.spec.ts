import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from './product.model';
import Product from '../domain/product.entity';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('creates a product', async () => {
    jest.useFakeTimers();
    const sut = new ProductRepository();
    const product = new Product({
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
    });
    await sut.add(product);
    const productModel = await ProductModel.findByPk(product.id.value);
    expect(productModel?.toJSON()).toEqual({
      id: product.id.value,
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('finds a product', async () => {
    const productModel = await ProductModel.create({
      id: 'any_id',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const sut = new ProductRepository();
    const product = await sut.find('any_id');
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id.value,
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  });

  it('throws an error when product is not found', async () => {
    const sut = new ProductRepository();
    await expect(sut.find('any_id')).rejects.toThrow('Product not found');
  });
});
