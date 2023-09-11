import { Sequelize } from 'sequelize-typescript';
import { TransactionModel } from '../repository/transaction.model';
import { PaymentFacadeFactory } from '../factory/payment.facade.factory';

describe('PaymentFacade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('process payment', async () => {
    jest.useFakeTimers();
    const sut = PaymentFacadeFactory.create();
    const outputDto = await sut.process({
      orderId: 'any_order_id',
      amount: 100,
    });
    expect(outputDto).toEqual({
      transactionId: expect.any(String),
      status: 'approved',
      amount: 100,
      orderId: 'any_order_id',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
