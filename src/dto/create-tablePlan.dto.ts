/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Table } from '../entities/table.entity';

export class CreateTablePlanDto {
  @IsNotEmpty({ message: 'Un plan de table contient forcément une ou plusieurs tables'})
  tables: Table[];
}
