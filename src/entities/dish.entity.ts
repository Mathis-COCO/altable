import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DishType } from '../enums/DishType.enum';
import { IsInt, Min } from 'class-validator';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: DishType,
  })
  type: DishType;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ default: 0 })
  @IsInt()
  @Min(0)
  quantity: number;
}
