import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DishController } from './controllers/dish.controller';
import { DishService } from './services/dish.service';
import { Dish } from './entities/dish.entity';
import { TableController } from './controllers/table.controller';
import { TablePlanController } from './controllers/tablePlan.controller';
import { TableService } from './services/table.service';
import { TablePlanService } from './services/tablePlan.service';
import 'dotenv/config';
import { Table } from './entities/table.entity';
import { TablePlan } from './entities/tablePlan.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'db',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([Dish]),
    TypeOrmModule.forFeature([Table]),
    TypeOrmModule.forFeature([TablePlan]),
  ],
  controllers: [DishController, TableController, TablePlanController],
  providers: [DishService, TableService, TablePlanService],
})
export class AppModule {}
