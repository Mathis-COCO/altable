/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Put, Param, Get, Delete } from '@nestjs/common';
import { TablePlanService } from '../services/tablePlan.service';
import { UpdateTablePlanDto } from '../dto/update-tablePlan.dto';
import { CreateTablePlanDto } from '../dto/create-tablePlan.dto';
import { TablePlan } from '../entities/tablePlan.entity';
import { TablePlans } from '../enums/TablePlan.enum';

@Controller('tablePlan')
export class TablePlanController {
  constructor(private readonly tablePlanService: TablePlanService) {}

  @Post()
  async create(@Body() createTablePlanDto: CreateTablePlanDto): Promise<TablePlan> {
    return this.tablePlanService.create(createTablePlanDto);
  }
  
  @Put(':id')
  async update(@Param('id') id: TablePlans, @Body() updateDishDto: UpdateTablePlanDto): Promise<TablePlan> {
    return this.tablePlanService.update(id, updateDishDto);
  }
  
  @Get()
  async findAll(): Promise<TablePlan[]> {
    return this.tablePlanService.findAll();
  }
  
  @Delete()
  async removeAll(): Promise<void> {
    return this.tablePlanService.removeAll();
  }
}