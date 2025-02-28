import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableController } from './controllers/table.controller';
import { TablePlanController } from './controllers/tablePlan.controller';
import { TableService } from './services/table.service';
import { TablePlanService } from './services/tablePlan.service';
import { Table } from './entities/table.entity';
import { TablePlan } from './entities/tablePlan.entity';
import { OrderDish } from './entities/orderDish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table, TablePlan, OrderDish])],
  controllers: [TableController, TablePlanController],
  providers: [TableService, TablePlanService],
})
export class TableModule {}
