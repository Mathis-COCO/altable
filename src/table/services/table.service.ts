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
import { OrderDish } from '../entities/orderDish.entity';
import { Dish } from '../../dish/entities/dish.entity';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table) private tableRepository: Repository<Table>,
    @InjectRepository(OrderDish)
    private orderDishRepository: Repository<OrderDish>,
  ) {}

  async create(
    createTableDto: CreateTableDto,
    dishes: { dishId: string; quantity: number }[],
  ): Promise<Table> {
    const savedTable = await this.tableRepository.save(createTableDto);
    if (dishes && dishes.length > 0) {
      await this.addDishesToTable(savedTable, dishes);
    }
    return savedTable;
  }

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find({
      relations: ['orderDishes', 'orderDishes.dish'],
    });
  }

  async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException(`Table avec l'ID ${id} non trouvée.`);
    }
    if (table.maxSeats < updateTableDto.occupiedSeats) {
      throw new BadRequestException(
        `Le nombre de places installées ne peut pas être supérieur au nombre de places maximum. Nombre de places maximum: ${table.maxSeats}`,
      );
    } else if (updateTableDto.occupiedSeats === 0) {
      table.isAvailable = true;
    } else {
      table.isAvailable = false;
    }
    Object.assign(table, updateTableDto);
    return this.tableRepository.save(table);
  }

  async close(id: string) {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException(`Table avec l'ID ${id} non trouvée.`);
    }
    if (table.isAvailable) {
      throw new BadRequestException(`La table est déjà disponible.`);
    }
    table.isAvailable = true;
    table.occupiedSeats = 0;
    return this.tableRepository.save(table);
  }

  async removeAll(): Promise<void> {
    await this.tableRepository.clear();
  }

  async removeById(id: string): Promise<void> {
    await this.tableRepository.delete(id);
  }

  async addDishesToTable(
    table: Table,
    dishes: { dishId: string; quantity: number }[],
  ): Promise<OrderDish[]> {
    const orderDishes: OrderDish[] = [];
    for (const dish of dishes) {
      const orderDish = new OrderDish();
      orderDish.table = table;
      orderDish.dish = { id: dish.dishId } as Dish;
      orderDish.quantity = dish.quantity;
      orderDishes.push(await this.orderDishRepository.save(orderDish));
    }
    return orderDishes;
  }

  async updateOrder(
    tableId: string,
    orderId: string,
    newQuantity: number,
  ): Promise<OrderDish> {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
    });
    if (!table) {
      throw new NotFoundException(`Table avec l'ID ${tableId} non trouvée.`);
    }
    const orderDish = await this.orderDishRepository.findOne({
      where: { id: orderId, table: { id: tableId } },
      relations: ['table'],
    });
    if (!orderDish) {
      throw new NotFoundException(
        `Commande avec l'ID ${orderId} non trouvée pour la table ${tableId}.`,
      );
    }
    orderDish.quantity = newQuantity;
    return this.orderDishRepository.save(orderDish);
  }

  async deleteOrder(tableId: string, orderId: string): Promise<void> {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
    });
    if (!table) {
      throw new NotFoundException(`Table avec l'ID ${tableId} non trouvée.`);
    }
    const result = await this.orderDishRepository.delete({
      id: orderId,
      table: { id: tableId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Commande avec l'ID ${orderId} non trouvée pour la table ${tableId}.`,
      );
    }
  }
}
