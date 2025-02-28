import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Dish } from './../src/entities/dish.entity';
import { DishType } from './../src/enums/DishType.enum';

// ---------- CAS DE TESTS ---------- //

// 1. Créer un plat
const createDish: Dish = {
  name: 'Pizza',
  description: 'Pizza 4 fromages',
  type: DishType.PLAT_PRINCIPAL,
  price: 12.5,
  quantity: 10,
};
