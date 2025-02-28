import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Dish } from '../entities/dish.entity';
import { CreateDishDto } from '../dto/create-dish.dto';
import { UpdateDishDto } from '../dto/update-dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  async create(createDishDto: CreateDishDto): Promise<Dish> {
    return this.dishRepository.save(createDishDto);
  }

  async update(id: string, updateDishDto: UpdateDishDto): Promise<Dish> {
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

  findAvailableDishes(): Promise<Dish[]> {
    return this.dishRepository.find({ where: { quantity: MoreThan(0) } });
  }

  async getById(id: string): Promise<Dish | null> {
    return this.dishRepository.findOne({ where: { id } });
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.dishRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Plat avec l'ID ${id} non trouvé.`);
    }
  }

  async removeAll(): Promise<void> {
    await this.dishRepository.clear();
  }
}
