import { container, injectable } from 'tsyringe';
import { Client } from '../domain/client.entity';
import { ClientGateway } from '../gateway/client.gateway.interface';
import { AddClientUseCase } from './add-client.usecase';
import Id from '../../@shared/value-object/id.value-object';

injectable();
class ClientRepositoryStub implements ClientGateway {
  add(client: Client): Promise<Client> {
    return Promise.resolve(client);
  }
  find(id: string): Promise<Client> {
    return Promise.resolve(new Client(new Id(id), 'any_name', 'any_email', 'any_address'));
  }
}

function makeSut(): AddClientUseCase {
  return container.register('ClientGateway', ClientRepositoryStub).resolve(AddClientUseCase);
}

describe('AddClientUseCase', () => {
  it('adds a client', async () => {
    const clientRepositoryAddSpy = jest.spyOn(ClientRepositoryStub.prototype, 'add');
    const sut = makeSut();
    const clientDto = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
    });
    expect(clientRepositoryAddSpy).toBeCalledTimes(1);
    expect(clientDto).toEqual({
      id: expect.any(String),
      name: 'any_name',
      email: 'any_email',
      address: 'any_address',
    });
  });
});
