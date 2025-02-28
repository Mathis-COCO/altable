/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from '../dto/create-table.dto';
import { Table } from '../entities/table.entity';

@Injectable()
export class TableService {
  constructor(@InjectRepository(Table) private tableRepository: Repository<Table>) { }

  async create(createTableDto: CreateTableDto): Promise<Table> {
    return this.tableRepository.save(createTableDto);
  }

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find();
  }

  async removeAll(): Promise<void> {
    await this.tableRepository.clear();
  }

  async removeById(id: string): Promise<void> {
    await this.tableRepository.delete(id);
  }
}