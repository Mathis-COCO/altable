import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Put,
  Param,
  NotFoundException,
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

  @Get('availableDishes')
  async findAvailableDishes(): Promise<Dish[]> {
    return this.dishService.findAvailableDishes();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Dish> {
    const dish = await this.dishService.getById(id);
    if (!dish) {
      throw new NotFoundException(`Plat avec l'ID ${id} non trouvé.`);
    }
    return dish;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    await this.dishService.deleteById(id);
  }

  @Delete()
  async removeAll(): Promise<void> {
    return this.dishService.removeAll();
  }
}
