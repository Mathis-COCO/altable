import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsInt,
  Min,
} from 'class-validator';
import { DishType } from '../enums/DishType.enum';

export class CreateDishDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  name: string;

  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La description est obligatoire.' })
  description: string;

  @IsEnum(DishType, { message: 'Le type de plat doit être une valeur valide.' })
  @IsNotEmpty({ message: 'Le type de plat est obligatoire.' })
  type: DishType;

  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  @IsNotEmpty({ message: 'Le prix est obligatoire.' })
  price: number;

  @IsInt({ message: 'La quantité doit être un entier.' })
  @Min(0, { message: 'La quantité doit être supérieure ou égale à 0.' })
  @IsNotEmpty({ message: 'La quantité est obligatoire.' })
  quantity: number;
}
