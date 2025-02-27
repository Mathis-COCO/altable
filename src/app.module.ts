import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DishController } from './controllers/dish.controller';
import { DishService } from './services/dish.service';
import { Dish } from './entities/dish.entity';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre ConfigModule accessible globalement
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'db',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, // 🔥 Active SSL pour Render
        },
      },
    }),
    TypeOrmModule.forFeature([Dish]),
  ],
  controllers: [DishController],
  providers: [DishService],
})
export class AppModule {}
