/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TablePlan } from '../entities/tablePlan.entity';
import { CreateTablePlanDto } from '../dto/create-tablePlan.dto';
import { UpdateTablePlanDto } from '../dto/update-tablePlan.dto';
import { TablePlans } from '../enums/TablePlan.enum';

@Injectable()
export class TablePlanService {
  constructor(@InjectRepository(TablePlan) private tablePlanRepository: Repository<TablePlan>) { }

  async create(createTablePlanDto: CreateTablePlanDto): Promise<TablePlan> {
    return this.tablePlanRepository.save(createTablePlanDto);
  }

  async update(id: TablePlans, updateTablePlanDto: UpdateTablePlanDto): Promise<TablePlan> {
    const tablePlan = await this.tablePlanRepository.findOne({ where: { id } });
    if (!tablePlan) {
      throw new NotFoundException(`Plan de table avec l'ID ${id} non trouvé.`);
    }
    Object.assign(tablePlan, updateTablePlanDto);
    return this.tablePlanRepository.save(tablePlan);
  }

  async findAll(): Promise<TablePlan[]> {
    return this.tablePlanRepository.find();
  }

  async removeAll(): Promise<void> {
    await this.tablePlanRepository.clear();
  }
}
