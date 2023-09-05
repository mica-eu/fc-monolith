import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from './client.model';
import { Client } from '../domain/client.entity';
import { ClientRepository } from './client.repository';
import Id from '../../@shared/value-object/id.value-object';

describe('ClientRepository', () => {
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

  it('creates a client', async () => {
    const sut = new ClientRepository();
    const client = new Client(new Id(), 'valid_name', 'valid_email', 'valid_address');
    await sut.add(client);
    const clientModel = await ClientModel.findByPk(client.id.value);
    expect(clientModel?.toJSON()).toEqual({
      id: client.id.value,
      name: 'valid_name',
      email: 'valid_email',
      address: 'valid_address',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('finds a client', async () => {
    const clientModel = await ClientModel.create({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      address: 'valid_address',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const sut = new ClientRepository();
    const client = await sut.find('valid_id');
    expect(clientModel.toJSON()).toEqual({
      id: client.id.value,
      name: 'valid_name',
      email: 'valid_email',
      address: 'valid_address',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('throws an error when client is not found', async () => {
    const sut = new ClientRepository();
    await expect(sut.find('invalid_id')).rejects.toThrow('Client not found');
  });
});
