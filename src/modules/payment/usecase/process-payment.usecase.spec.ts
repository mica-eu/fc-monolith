import { container } from 'tsyringe';
import { ProcessPaymentUsecase } from './process-payment.usecase';
import { PaymentGatewayInterface } from '../gateway/payment.gateway.interface';
import { Transaction } from '../domain/transaction.entity';

class PaymentRepositoryStub implements PaymentGatewayInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(transaction: Transaction): Promise<void> {
    return Promise.resolve();
  }
}

function makeSut(): ProcessPaymentUsecase {
  return container.register('PaymentGateway', PaymentRepositoryStub).resolve(ProcessPaymentUsecase);
}

describe('ProcessPaymentUsecase', () => {
  it('process payment', async () => {
    const sut = makeSut();
    const payment = await sut.execute({
      amount: 100,
      orderId: 'any_order_id',
    });
    expect(payment).toEqual({
      transactionId: expect.any(String),
      status: 'approved',
      amount: 100,
      orderId: 'any_order_id',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('declines a payment', async () => {
    const sut = makeSut();
    const payment = await sut.execute({
      amount: 90,
      orderId: 'any_order_id',
    });
    expect(payment).toEqual({
      transactionId: expect.any(String),
      status: 'rejected',
      amount: 90,
      orderId: 'any_order_id',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
