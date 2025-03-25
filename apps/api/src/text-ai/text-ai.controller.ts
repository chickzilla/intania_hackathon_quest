import { Body, Controller, Get, Post } from '@nestjs/common';
import { TextAiService } from './text-ai.service';
import { BodyDTO } from 'src/dto/body.dto';

@Controller('x')
export class TextAiController {
  constructor(private readonly textAIService: TextAiService) {}

  @Post('a')
  getResultText(@Body() body: BodyDTO) {
    return this.textAIService.sendPrompt(body.prompt);
  }

  @Get('s')
  getHello(): string {
    return "Hello World!s";
  }
}
