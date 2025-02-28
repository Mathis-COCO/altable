import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TablePlan } from '../../table/entities/tablePlan.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startTime: Date;

  @ManyToOne(() => TablePlan, (tablePlan) => tablePlan.services)
  tablePlan: TablePlan;
}
