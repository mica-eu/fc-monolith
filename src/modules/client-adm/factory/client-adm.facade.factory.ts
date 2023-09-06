import { container } from 'tsyringe';
import { ClientAdmFacade } from '../facade/client-adm.facade';
import { ClientRepository } from '../repository/client.repository';
import { AddClientUseCase } from '../usecase/add-client.usecase';
import { FindClientUsecase } from '../usecase/find-client.usecase';

export class ClientAdmFacadeFactory {
  static create(): ClientAdmFacade {
    return container
      .register('ClientGateway', ClientRepository)
      .register('AddClientUseCase', AddClientUseCase)
      .register('FindClientUseCase', FindClientUsecase)
      .resolve(ClientAdmFacade);
  }
}
