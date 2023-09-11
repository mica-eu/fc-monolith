import { container } from 'tsyringe';
import { PaymentRepository } from '../repository/payment.repository';
import { ProcessPaymentUsecase } from '../usecase/process-payment.usecase';
import { PaymentFacade } from '../facade/payment.facade';

export class PaymentFacadeFactory {
  static create() {
    return container
      .register('PaymentGateway', PaymentRepository)
      .register('ProcessPaymentUseCase', ProcessPaymentUsecase)
      .resolve(PaymentFacade);
  }
}
