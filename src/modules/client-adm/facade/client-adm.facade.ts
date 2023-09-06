import { inject, injectable } from 'tsyringe';
import {
  ClientAdmFacadeAddInputDto,
  ClientAdmFacadeAddOutputDto,
  ClientAdmFacadeFindOutputDto,
  ClientAdmFacadeInterface,
} from './client-adm.facade.interface';
import { AddClientUseCase } from '../usecase/add-client.usecase';
import { FindClientUsecase } from '../usecase/find-client.usecase';

@injectable()
export class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(
    @inject('AddClientUseCase')
    private readonly addClientUseCase: AddClientUseCase,
    @inject('FindClientUseCase')
    private readonly findClientUseCase: FindClientUsecase
  ) {}

  async add(inputDto: ClientAdmFacadeAddInputDto): Promise<ClientAdmFacadeAddOutputDto> {
    const clientDto = await this.addClientUseCase.execute(inputDto);
    return {
      id: clientDto.id,
      name: clientDto.name,
      email: clientDto.email,
      address: clientDto.address,
    };
  }
  async find(id: string): Promise<ClientAdmFacadeFindOutputDto> {
    const clientDto = await this.findClientUseCase.execute(id);
    return {
      id: clientDto.id,
      name: clientDto.name,
      email: clientDto.email,
      address: clientDto.address,
      createdAt: clientDto.createdAt,
      updatedAt: clientDto.updatedAt,
    };
  }
}
