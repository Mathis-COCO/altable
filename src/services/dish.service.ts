import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from '../entities/dish.entity';
import { CreateDishDto } from 'src/dto/create-dish.dto';
import { UpdateDishDto } from 'src/dto/update-dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  async create(createDishDto: CreateDishDto): Promise<Dish> {
    return this.dishRepository.save(createDishDto);
  }

  async update(id: number, updateDishDto: UpdateDishDto): Promise<Dish> {
    const dish = await this.dishRepository.findOne({ where: { id } });
    if (!dish) {
      throw new NotFoundException(`Plat avec l'ID ${id} non trouvé.`);
    }
    Object.assign(dish, updateDishDto);
    return this.dishRepository.save(dish);
  }

  async findAll(): Promise<Dish[]> {
    return this.dishRepository.find();
  }

  async removeAll(): Promise<void> {
    await this.dishRepository.clear();
  }
}
