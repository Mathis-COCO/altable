import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  @Column({ unique: true })
  id: string;

  @IsInt({ message: 'La quantité doit être un entier.' })
  @Min(1, { message: 'La quantité doit être supérieure ou égale à 1.' })
  @IsNotEmpty({ message: 'La quantité est obligatoire.' })
  maxSeats: number;

  @Column()
  isAvailable: boolean;
}
