// src/table/entities/orderDish.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Table } from './table.entity';
import { Dish } from '../../dish/entities/dish.entity';

@Entity()
export class OrderDish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Table, (table) => table.orderDishes)
  table: Table;

  @ManyToOne(() => Dish)
  dish: Dish;

  @Column()
  quantity: number;
}
