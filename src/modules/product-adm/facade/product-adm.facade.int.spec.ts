import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../repository/product.model';
import { ProductAdmFacadeInterface } from './product-adm.facade.interface';
import { ProductAdmFacadeFactory } from '../factory/product-adm-facade.factory';

function makeSut(): ProductAdmFacadeInterface {
  return ProductAdmFacadeFactory.create();
}

describe('ProductAdmFacade', () => {
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
    const sut = makeSut();
    await sut.addProduct({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
    });
    const product = await ProductModel.findOne({ where: { id: '1' } });
    expect(product).not.toBeNull();
  });
});
