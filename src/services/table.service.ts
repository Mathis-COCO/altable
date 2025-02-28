/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from '../dto/create-table.dto';
import { Table } from '../entities/table.entity';

@Injectable()
export class TableService {
  constructor(@InjectRepository(Table) private tableRepository: Repository<Table>) { }

  // Création d'une table
  async create(createTableDto: CreateTableDto): Promise<Table> {
    const newTable = ({
      id: createTableDto.id,
      maxSeats: createTableDto.maxSeats,
      isAvailable: createTableDto.isAvailable,
    });
    return this.tableRepository.save(newTable);
  }

  // Récupération de toutes les tables
  async findAll(): Promise<Table[]> {
    return this.tableRepository.find();
  }

  // Suppresion de toutes les tables
  async removeAll(): Promise<void> {
    await this.tableRepository.clear();
  }

}