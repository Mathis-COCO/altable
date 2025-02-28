import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from '../dto/create-table.dto';
import { Table } from '../entities/table.entity';
import { UpdateTableDto } from '../dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table) private tableRepository: Repository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    return this.tableRepository.save(createTableDto);
  }

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find();
  }

  async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException(`Table avec l'ID ${id} non trouvée.`);
    }
    if (table.maxSeats < updateTableDto.nbPeopleInstalled) {
      throw new BadRequestException(
        `Le nombre de places installées ne peut pas être supérieur au nombre de places maximum. Nombre de places maximum: ${table.maxSeats}`,
      );
    } else {
      table.isAvailable = false;
    }
    Object.assign(table, updateTableDto);
    return this.tableRepository.save(table);
  }

  async removeAll(): Promise<void> {
    await this.tableRepository.clear();
  }

  async removeById(id: string): Promise<void> {
    await this.tableRepository.delete(id);
  }
}
