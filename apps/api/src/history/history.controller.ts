import { Body, Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { BodyDTO } from 'src/dto/body.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('get-histories')
  getHistories(@Body() body: BodyDTO) {
    return this.historyService.getUserHistories(body.req, body.res);
  }
}
