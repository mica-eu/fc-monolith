import { Sequelize } from 'sequelize-typescript';
import { TransactionModel } from './transaction.model';
import { PaymentRepository } from './payment.repository';
import { Transaction } from '../domain/transaction.entity';
import Id from '../../@shared/value-object/id.value-object';

describe('ClientRepository', () => {
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

  it('saves a transaction', async () => {
    jest.useFakeTimers();
    const sut = new PaymentRepository();
    const transaction = new Transaction(new Id(), new Id(), 100, 'pending', new Date(), new Date());
    await sut.save(transaction);
    const transactionModel = await TransactionModel.findOne({
      where: { id: transaction.id.value },
    });
    expect(transactionModel?.toJSON()).toEqual({
      id: transaction.id.value,
      orderId: transaction.orderId.value,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });
  });
});
