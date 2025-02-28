import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Table } from './table.entity';
import { TablePlans } from '../enums/TablePlan.enum';

@Entity()
export class TablePlan {
  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: TablePlans;

  @Column()
  tables: Table[];
}
