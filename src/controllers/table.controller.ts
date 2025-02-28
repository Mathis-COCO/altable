/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Delete } from '@nestjs/common';
import { TableService } from '../services/table.service';
import { CreateTableDto } from '../dto/create-table.dto';
import { Table } from '../entities/table.entity';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  async create(@Body() createTableDto: CreateTableDto): Promise<Table> {
    return this.tableService.create(createTableDto);
  }
  
  @Get()
  async findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }
  
  @Delete()
  async removeAll(): Promise<void> {
    return this.tableService.removeAll();
  }
}
