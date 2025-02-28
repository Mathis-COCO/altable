/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, IsNotEmpty, IsInt, Min, IsBoolean } from 'class-validator';

export class CreateTableDto {
  // @IsString({ message: "L'id doit être une chaîne de caractères." })
  // @IsNotEmpty({ message: "L'id est obligatoire." })
  // id: string;

  @IsInt({ message: 'La quantité doit être un entier.' })
  @Min(1, { message: 'La quantité doit être supérieure ou égale à 1.' })
  @IsNotEmpty({ message: 'La quantité est obligatoire.' })
  maxSeats: number;

  @IsBoolean()
  isAvailable: boolean;
}
