import { IsNotEmpty, IsOptional } from 'class-validator';
import { Table } from '../entities/table.entity';
import { ServiceStatus } from '../enums/ServiceStatus.enum';

export class UpdateTablePlanDto {
  @IsOptional()
  tables?: Table[];

  @IsNotEmpty({ message: 'Le status du plan de table doit être défini.' })
  status: ServiceStatus;
}
