import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { ProductRepository } from './product.repository';
import Id from '../../@shared/value-object/id.value-object';

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

  it('list products', async () => {
    const productModel = await ProductModel.create({
      id: 'any_id',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const sut = new ProductRepository();
    const products = await sut.list();
    expect(products.length).toBe(1);
    const [firstProduct] = products;
    expect(firstProduct.id).toStrictEqual(new Id(productModel.id));
    expect(firstProduct.name).toBe('Product 1');
    expect(firstProduct.description).toBe('Product 1 description');
    expect(firstProduct.salesPrice).toBe(10);
  });

  it('find product', async () => {
    const productModel = await ProductModel.create({
      id: 'any_id',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const sut = new ProductRepository();
    const product = await sut.find(productModel.id);
    expect(product.id).toStrictEqual(new Id(productModel.id));
    expect(product.name).toBe('Product 1');
    expect(product.description).toBe('Product 1 description');
    expect(product.salesPrice).toBe(10);
  });
});
