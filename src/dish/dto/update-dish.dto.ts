import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { DishType } from '../enums/DishType.enum';

export class UpdateDishDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  @IsOptional()
  description?: string;

  @IsEnum(DishType, { message: 'Le type de plat doit être une valeur valide.' })
  @IsOptional()
  type?: DishType;

  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  @IsOptional()
  price?: number;

  @IsInt({ message: 'La quantité doit être un entier.' })
  @Min(0, { message: 'La quantité doit être supérieure ou égale à 0.' })
  @IsOptional()
  quantity?: number;
}
