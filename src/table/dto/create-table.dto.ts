/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsInt, Min, IsBoolean } from 'class-validator';

export class CreateTableDto {
  @IsInt({ message: 'La quantité doit être un entier.' })
  @Min(1, { message: 'La quantité doit être supérieure ou égale à 1.' })
  @IsNotEmpty({ message: 'La quantité est obligatoire.' })
  maxSeats: number;

  @IsBoolean()
  isAvailable: boolean;
}
