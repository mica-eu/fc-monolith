import { container, injectable } from 'tsyringe';
import { ClientGateway } from '../gateway/client.gateway.interface';
import { Client } from '../domain/client.entity';
import Id from '../../@shared/value-object/id.value-object';
import { FindClientUsecase } from './find-client.usecase';

injectable();
class ClientRepositoryStub implements ClientGateway {
  add(client: Client): Promise<void> {
    return Promise.resolve();
  }
  find(id: string): Promise<Client> {
    return Promise.resolve(new Client(new Id(id), 'any_name', 'any_email', 'any_address'));
  }
}

function makeSut(): FindClientUsecase {
  return container.register('ClientGateway', ClientRepositoryStub).resolve(FindClientUsecase);
}

describe('FindClientUsecase', () => {
  it('finds a client', async () => {
    const sut = makeSut();
    const client = await sut.execute('any_id');
    expect(client).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
