import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Table } from './table.entity';
import { TablePlans } from '../enums/TablePlan.enum';
import { Service } from '../../service/entities/service.entity';
import { ServiceStatus } from '../enums/ServiceStatus.enum';

@Entity()
export class TablePlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: TablePlans;

  @OneToMany(() => Table, (table) => table.tablePlan, { cascade: true })
  tables: Table[];

  @OneToMany(() => Service, (service) => service.tablePlan)
  services: Service[];

  @Column({ default: ServiceStatus.INACTIVE })
  status: ServiceStatus;
}
