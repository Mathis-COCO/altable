/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { CreateTableDto } from './create-table.dto';

export class CreateTablePlanDto {
  @IsNotEmpty({ message: 'Un plan de table contient forcément une ou plusieurs tables'})
  tables: CreateTableDto[];
}
