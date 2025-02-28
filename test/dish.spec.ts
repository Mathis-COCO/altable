import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Dish } from './../src/dish/entities/dish.entity';
import { DishType } from './../src/dish/enums/DishType.enum';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DishController } from '../src/dish/controllers/dish.controller';
import { DishService } from '../src/dish/services/dish.service';

// ---------- CAS DE TESTS ---------- //

// 1. Créer des plats
const createDish: Dish = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Pizza',
  description: 'Pizza 4 fromages',
  type: DishType.PLAT_PRINCIPAL,
  price: 12.5,
  quantity: 10,
};

const createDishes = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Test Dish 1',
    description: 'Test Description 1',
    type: DishType.ENTREE,
    price: 9.5,
    quantity: 6,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Test Dish 2',
    description: 'Test Description 2',
    type: DishType.DESSERT,
    price: 16.5,
    quantity: 14,
  },
];

// ---------TESTS UNITAIRES --------- //

describe('DishController (e2e)', () => {
  let app: INestApplication;
  let dishRepository: Repository<Dish>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DishController],
      providers: [
        DishService,
        {
          provide: getRepositoryToken(Dish),
          useValue: {
            findOne: jest.fn().mockResolvedValue(createDish),
            save: jest.fn().mockResolvedValue(createDish),
            find: jest.fn().mockResolvedValue(createDishes),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            clear: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    dishRepository = moduleRef.get(getRepositoryToken(Dish));
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Test pour créer un plat
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

  // Test pour récupérer un plat par ID
  it('/GET dish by id', () => {
    return request(app.getHttpServer())
      .get(`/dishes/${createDish.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toEqual(createDish.id);
        expect(body.name).toEqual(createDish.name);
        expect(body.description).toEqual(createDish.description);
        expect(body.type).toEqual(createDish.type);
        expect(body.price).toEqual(createDish.price);
        expect(body.quantity).toEqual(createDish.quantity);
      });
  });

  // Test pour mettre à jour un plat
  it('/PUT update dish', () => {
    return request(app.getHttpServer())
      .put(`/dishes/${createDish.id}`)
      .send({ ...createDish, quantity: 12 })
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toEqual(createDish.id);
        expect(body.name).toEqual(createDish.name);
        expect(body.description).toEqual(createDish.description);
        expect(body.type).toEqual(createDish.type);
        expect(body.price).toEqual(createDish.price);
        expect(body.quantity).toEqual(12);
      });
  });

  // Test pour lister tous les plats
  it('/GET list all dishes', () => {
    return request(app.getHttpServer())
      .get('/dishes')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(createDishes);
      });
  });

  // Test pour supprimer tous les plats
  it('/DELETE all dishes', () => {
    return request(app.getHttpServer())
      .delete('/dishes')
      .expect(200)
      .expect(() => {
        return request(app.getHttpServer())
          .get('/dishes')
          .expect(200)
          .expect(({ body }) => {
            expect(body.length).toBe(0);
          });
      });
  });

  // Test pour afficher le menu
  it('/GET show menu', () => {
    return request(app.getHttpServer())
      .get('/dishes/menu')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(createDish);
      });
  });
});
