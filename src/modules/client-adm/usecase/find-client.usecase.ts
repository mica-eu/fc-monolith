import { inject, injectable } from 'tsyringe';
import { UseCase } from '../../@shared/usecase/usecase.interface';
import { FindClientOutputDto } from './find-client.dto';
import { ClientGateway } from '../gateway/client.gateway.interface';

@injectable()
export class FindClientUsecase implements UseCase {
  constructor(
    @inject('ClientGateway')
    private readonly clientGateway: ClientGateway
  ) {}

  async execute(id: string): Promise<FindClientOutputDto> {
    const product = await this.clientGateway.find(id);
    return {
      id: product.id.value,
      name: product.name,
      email: product.email,
      address: product.address,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
