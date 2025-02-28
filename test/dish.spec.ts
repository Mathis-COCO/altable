import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Dish } from './../src/entities/dish.entity';
import { DishType } from './../src/enums/DishType.enum';

// ---------- CAS DE TESTS ---------- //

// 1. Créer un plat
const createDish: Dish = {
  id: 1,
  name: 'Pizza',
  description: 'Pizza 4 fromages',
  type: DishType.PLAT_PRINCIPAL,
  price: 12.5,
  quantity: 10,
};

// ---------TESTS UNITAIRES --------- //

describe('DishController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST create dish', () => {
    return request(app.getHttpServer())
      .post('/dishes')
      .send(createDish)
      .expect(201)
      .expect(({ body }) => {
        expect(body.id).toEqual(createDish.id);
        expect(body.name).toEqual(createDish.name);
        expect(body.description).toEqual(createDish.description);
        expect(body.type).toEqual(createDish.type);
        expect(body.price).toEqual(createDish.price);
        expect(body.quantity).toEqual(createDish.quantity);
      });
  });
});
