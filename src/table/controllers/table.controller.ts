/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Delete, Param, Put } from '@nestjs/common';
import { TableService } from '../services/table.service';
import { CreateTableDto } from '../dto/create-table.dto';
import { Table } from '../entities/table.entity';
import { UpdateTableDto } from '../dto/update-table.dto';

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
  
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDishDto: UpdateTableDto,
  ): Promise<Table> {
    return this.tableService.update(id, updateDishDto);
  }
  
  @Delete()
  async removeAll(): Promise<void> {
    return this.tableService.removeAll();
  }

  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<void> {
    return this.tableService.removeById(id);
  }
}
