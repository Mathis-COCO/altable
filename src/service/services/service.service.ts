/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../entities/service.entity';
import { ServiceStatus } from '../../table/enums/ServiceStatus.enum';
import { TablePlan } from '../../table/entities/tablePlan.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(TablePlan)
    private tablePlanRepository: Repository<TablePlan>
  ) { }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = new Service();
    service.startTime = new Date(createServiceDto.startTime); 

    if (createServiceDto.tablePlan) {
      const tablePlan = await this.tablePlanRepository.findOne({
        where: { id: createServiceDto.tablePlan.id },
        relations: ['tables'],
      });
      if (!tablePlan) {
        throw new Error('Plan de table introuvable.');
      }
      service.tablePlan = tablePlan;
      if (Array.isArray(service.tablePlan.tables)) {
        for (const table of service.tablePlan.tables) {
          table.isAvailable = true;
        }
      }
      service.tablePlan.status = ServiceStatus.ACTIVE;
    }
    return this.serviceRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async removeAll(): Promise<void> {
    await this.serviceRepository.clear();
  }
}