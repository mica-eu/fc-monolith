import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../repository/client.model';
import { ClientAdmFacadeFactory } from '../factory/client-adm.facade.factory';

describe('ClientAdmFacade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('adds a client', async () => {
    const sut = ClientAdmFacadeFactory.create();
    const client = await sut.add({
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
    });
    expect(client).toEqual({
      id: expect.any(String),
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
    });
  });

  it('finds a client', async () => {
    const sut = ClientAdmFacadeFactory.create();
    const client = await sut.add({
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
    });
    const foundClient = await sut.find(client.id);
    expect(foundClient).toEqual({
      id: client.id,
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
