import { inject, injectable } from 'tsyringe';
import {
  PaymentFacadeInputDto,
  PaymentFacadeInterface,
  PaymentFacadeOutputDto,
} from './payment.facade.interface';
import { ProcessPaymentUsecase } from '../usecase/process-payment.usecase';

@injectable()
export class PaymentFacade implements PaymentFacadeInterface {
  constructor(
    @inject('ProcessPaymentUseCase')
    private readonly processPaymentUsecase: ProcessPaymentUsecase
  ) {}

  process(inputDto: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUsecase.execute(inputDto);
  }
}
