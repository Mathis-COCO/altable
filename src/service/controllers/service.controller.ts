/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Delete } from '@nestjs/common';
import { ServiceService } from '../services/service.service'
import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../entities/service.entity';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(createServiceDto);
  }
  
  @Get()
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }
  
  @Delete()
  async removeAll(): Promise<void> {
    return this.serviceService.removeAll();
  }
}
