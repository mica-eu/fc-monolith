import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'product',
  timestamps: false,
})
export class ProductModel extends Model {
  @Column({ primaryKey: true, allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare salesPrice: number;
}
