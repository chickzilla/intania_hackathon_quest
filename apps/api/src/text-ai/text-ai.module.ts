import { Module } from '@nestjs/common';
import { TextAiController } from './text-ai.controller';
import { TextAiService } from './text-ai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHistory } from 'src/entities/userHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHistory])],
  controllers: [TextAiController],
  providers: [TextAiService],
  exports: [TextAiService],
})
export class TextAiModule {}
