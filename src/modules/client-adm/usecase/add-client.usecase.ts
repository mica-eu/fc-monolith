import { inject, injectable } from 'tsyringe';
import { UseCase } from '../../@shared/usecase/usecase.interface';
import { AddClientInputDto, AddClientOutputDto } from './add-client.dto';
import { Client } from '../domain/client.entity';
import Id from '../../@shared/value-object/id.value-object';
import { ClientGateway } from '../gateway/client.gateway.interface';

@injectable()
export class AddClientUseCase implements UseCase {
  constructor(
    @inject('ClientGateway')
    private readonly clientGateway: ClientGateway
  ) {}

  async execute(inputDto: AddClientInputDto): Promise<AddClientOutputDto> {
    const client = new Client(new Id(), inputDto.name, inputDto.email, inputDto.address);
    await this.clientGateway.add(client);
    const clientModel = await this.clientGateway.find(client.id.value);
    return {
      id: clientModel.id.value,
      name: clientModel.name,
      email: clientModel.email,
      address: clientModel.address,
    };
  }
}
