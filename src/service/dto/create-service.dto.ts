/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsDateString, IsNotEmpty } from 'class-validator';
import { TablePlan } from '../../table/entities/tablePlan.entity';

export class CreateServiceDto {
  @IsDateString()
  @IsNotEmpty({ message: 'La date/heure de début est obligatoire.' })
  startTime: string;

  @IsNotEmpty({ message: 'Un service doit avoir un plan de table.' })
  tablePlan: TablePlan;
}
