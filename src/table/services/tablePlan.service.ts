/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TablePlan } from '../entities/tablePlan.entity';
import { CreateTablePlanDto } from '../dto/create-tablePlan.dto';
import { UpdateTablePlanDto } from '../dto/update-tablePlan.dto';
import { ServiceStatus } from '../enums/ServiceStatus.enum';

@Injectable()
export class TablePlanService {
  constructor(@InjectRepository(TablePlan) private tablePlanRepository: Repository<TablePlan>) { }

  async create(createTablePlanDto: CreateTablePlanDto): Promise<TablePlan> {
    const tablePlan = new TablePlan();
    Object.assign(tablePlan, createTablePlanDto);
    tablePlan.status = ServiceStatus.INACTIVE;
    return this.tablePlanRepository.save(tablePlan);
  }

  async update(id: string, updateTablePlanDto: UpdateTablePlanDto): Promise<TablePlan> {
    if (updateTablePlanDto.status === ServiceStatus.ACTIVE) {
      throw new Error('Impossible de mettre à jour le plan de table car un service est en cours.');
    } else if (updateTablePlanDto.status === ServiceStatus.FINISHED) {
      throw new Error('Impossible de mettre à jour le plan de table car le service est terminé.');
    }
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
