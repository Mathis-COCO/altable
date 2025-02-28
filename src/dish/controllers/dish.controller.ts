import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { Dish } from '../entities/dish.entity';
import { CreateDishDto } from '../dto/create-dish.dto';
import { UpdateDishDto } from '../dto/update-dish.dto';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  async create(@Body() createDishDto: CreateDishDto): Promise<Dish> {
    return this.dishService.create(createDishDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDto,
  ): Promise<Dish> {
    return this.dishService.update(id, updateDishDto);
  }
  @Get()
  async findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Delete()
  async removeAll(): Promise<void> {
    return this.dishService.removeAll();
  }
}
