import Id from '../../@shared/value-object/id.value-object';
import { Client } from '../domain/client.entity';
import { ClientGateway } from '../gateway/client.gateway.interface';
import { ClientModel } from './client.model';

export class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  async find(id: string): Promise<Client> {
    const clientModel = await ClientModel.findByPk(id);
    if (!clientModel) {
      throw new Error('Client not found');
    }
    return new Client(
      new Id(clientModel.id),
      clientModel.name,
      clientModel.email,
      clientModel.address
    );
  }
}
