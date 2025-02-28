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

  // Création d'un plan de table
  async create(createTablePlanDto: CreateTablePlanDto): Promise<TablePlan> {
    return this.tablePlanRepository.save(createTablePlanDto);
  }

  // Mise à jour d'un plan de table
  async update(id: TablePlans, updateTablePlanDto: UpdateTablePlanDto): Promise<TablePlan> {
    const tablePlan = await this.tablePlanRepository.findOne({ where: { id } });
    // Si le plan de table n'existe pas...
    if (!tablePlan) {
      throw new NotFoundException(`Plan de table avec l'ID ${id} non trouvé.`);
    }
    Object.assign(tablePlan, updateTablePlanDto); // On renseigne les nouvelles informations
    return this.tablePlanRepository.save(tablePlan);
  }

  // Récupération de tous les plans de tables
  async findAll(): Promise<TablePlan[]> {
    return this.tablePlanRepository.find();
  }

  // Suppresion de tous les plans de tables
  async removeAll(): Promise<void> {
    await this.tablePlanRepository.clear();
  }
}
