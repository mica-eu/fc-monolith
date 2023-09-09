import { Transaction } from '../domain/transaction.entity';

export interface PaymentGatewayInterface {
  save(transaction: Transaction): Promise<void>;
}
