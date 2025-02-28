import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Table } from './table.entity';
import { TablePlans } from '../enums/TablePlan.enum';

@Entity()
export class TablePlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: TablePlans;

  @OneToMany(() => Table, (table) => table.tablePlan, { cascade: true })
  tables: Table[];
}
