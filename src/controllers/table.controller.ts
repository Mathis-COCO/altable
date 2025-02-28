import { Controller } from '@nestjs/common';
import { TableService } from '../services/table.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tableService: TableService) {}
  // TODO:
}
