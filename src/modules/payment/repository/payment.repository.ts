import { injectable } from 'tsyringe';
import { Transaction } from '../domain/transaction.entity';
import { PaymentGatewayInterface } from '../gateway/payment.gateway.interface';
import { TransactionModel } from './transaction.model';

@injectable()
export class PaymentRepository implements PaymentGatewayInterface {
  async save(transaction: Transaction): Promise<void> {
    await TransactionModel.create({
      id: transaction.id.value,
      orderId: transaction.orderId.value,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });
  }
}
