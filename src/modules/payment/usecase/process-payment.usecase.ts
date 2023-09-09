import { inject, injectable } from 'tsyringe';
import { UseCase } from '../../@shared/usecase/usecase.interface';
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from './process-payment.dto';
import { PaymentGatewayInterface } from '../gateway/payment.gateway.interface';
import { Transaction } from '../domain/transaction.entity';
import Id from '../../@shared/value-object/id.value-object';

@injectable()
export class ProcessPaymentUsecase implements UseCase {
  constructor(
    @inject('PaymentGateway')
    private readonly paymentGateway: PaymentGatewayInterface
  ) {}

  async execute(inputDto: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction(
      new Id(),
      new Id(inputDto.orderId),
      inputDto.amount,
      'pending',
      new Date(),
      new Date()
    );
    transaction.process();
    await this.paymentGateway.save(transaction);
    return {
      transactionId: transaction.id.value,
      status: transaction.status,
      amount: transaction.amount,
      orderId: transaction.orderId.value,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }
}
