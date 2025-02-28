/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Delete, Param, Put } from '@nestjs/common';
import { TableService } from '../services/table.service';
import { CreateTableDto } from '../dto/create-table.dto';
import { Table } from '../entities/table.entity';
import { UpdateTableDto } from '../dto/update-table.dto';
import { OrderDish } from '../entities/orderDish.entity';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) { }

    @Post()
    async create(@Body() createTableDto: CreateTableDto): Promise<Table> {
        return this.tableService.create(createTableDto, []);
    }

    @Get()
    async findAll(): Promise<Table[]> {
        return this.tableService.findAll();
    }

    @Put('update/:id')
    async update(
        @Param('id') id: string,
        @Body() updateDishDto: UpdateTableDto,
    ): Promise<Table> {
        return this.tableService.update(id, updateDishDto);
    }

    @Put('close/:id')
    async close(
        @Param('id') id: string,
    ): Promise<Table> {
        return this.tableService.close(id);
    }

    @Delete()
    async removeAll(): Promise<void> {
        return this.tableService.removeAll();
    }

    @Delete(':id')
    async removeById(@Param('id') id: string): Promise<void> {
        return this.tableService.removeById(id);
    }

    @Post(':tableId/order')
    async addDishesToTable(
        @Param('tableId') tableId: string,
        @Body() dishes: { dishId: string; quantity: number }[],
    ): Promise<OrderDish[]> {
        return this.tableService.addDishesToTable(
            { id: tableId } as Table, // Création d'un objet Table avec l'ID
            dishes,
        );
    }

    @Put(':tableId/order/:orderId')
    async updateOrder(
        @Param('tableId') tableId: string,
        @Param('orderId') orderId: string,
        @Body('quantity') quantity: number,
    ): Promise<OrderDish> {
        return this.tableService.updateOrder(tableId, orderId, quantity);
    }

    @Delete(':tableId/order/:orderId')
    async deleteOrder(
        @Param('tableId') tableId: string,
        @Param('orderId') orderId: string,
    ): Promise<void> {
        return this.tableService.deleteOrder(tableId, orderId);
    }
}