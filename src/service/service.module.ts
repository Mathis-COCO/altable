import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './controllers/service.controller';
import { ServiceService } from './services/service.service';
import { Service } from './entities/service.entity';
import { TablePlan } from '../table/entities/tablePlan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, TablePlan])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
