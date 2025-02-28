import { IsNumber } from 'class-validator';

export class UpdateTableDto {
  @IsNumber(
    {},
    { message: 'Le nombre de personnes à installer doit être un nombre.' },
  )
  occupiedSeats: number;
}
