import { Entity, Column } from 'typeorm';
import { Table } from './table.entity';
import { TablePlans } from '../enums/TablePlan.enum';

@Entity()
export class TablePlan {
  @Column({ unique: true })
  id: TablePlans; // "ID" spécial pour les différents plans de tables

  @Column()
  tables: Table[];
}
