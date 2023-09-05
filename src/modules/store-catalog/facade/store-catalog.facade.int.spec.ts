import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../repository/product.model';
import { StoreCatalogFacadeFactory } from '../factory/facade.factory';

describe('StoreCatalogFacade', () => {
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

  it('finds product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 100,
    });
    const sut = StoreCatalogFacadeFactory.create();
    const result = await sut.find('1');
    expect(result).toEqual({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 100,
    });
  });

  it('lists products', async () => {
    await ProductModel.bulkCreate([
      {
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        salesPrice: 100,
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Product 2 description',
        salesPrice: 200,
      },
    ]);
    const sut = StoreCatalogFacadeFactory.create();
    const result = await sut.list();
    expect(result).toEqual({
      products: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Product 1 description',
          salesPrice: 100,
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Product 2 description',
          salesPrice: 200,
        },
      ],
    });
  });
});
