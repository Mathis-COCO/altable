import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { TablePlan } from './tablePlan.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsInt({ message: 'La quantité doit être un entier.' })
  @Min(1, { message: 'La quantité doit être supérieure ou égale à 1.' })
  @IsNotEmpty({ message: 'La quantité est obligatoire.' })
  @Column()
  maxSeats: number;

  @Column()
  isAvailable: boolean;

  @ManyToOne(() => TablePlan, (tablePlan) => tablePlan.tables)
  tablePlan?: TablePlan;
}
