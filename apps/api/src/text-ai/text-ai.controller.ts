import { Body, Controller, Post } from '@nestjs/common';
import { TextAiService } from './text-ai.service';
import { BodyDTO } from 'src/dto/body.dto';

@Controller('text-ai')
export class TextAiController {
  constructor(private readonly textAIService: TextAiService) {}

  @Post('get-result-text')
  getResultText(@Body() body: BodyDTO) {
    return this.textAIService.sendPrompt(body.req, body.res);
  }
}
