import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { TextAiModule } from 'src/text-ai/text-ai.module';
import { TextAiRouter } from './routers/text-ai.router';

@Module({
  imports: [TextAiModule],
  providers: [TrpcService, TrpcRouter, TextAiRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
