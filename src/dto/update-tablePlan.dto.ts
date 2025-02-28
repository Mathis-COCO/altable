/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { Table } from '../entities/table.entity';

export class UpdateTablePlanDto {
  @IsOptional()
  tables?: Table[];
}