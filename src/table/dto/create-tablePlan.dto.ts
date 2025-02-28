/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Table } from '../entities/table.entity';
import { ServiceStatus } from '../enums/ServiceStatus.enum';

export class CreateTablePlanDto {
  @IsNotEmpty({ message: 'Un plan de table contient forcément une ou plusieurs tables'})
  tables: Table[];

  @IsNotEmpty({ message: "Le status du plan de table doit être défini." })
  status: ServiceStatus;
}
