import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { TextAiModule } from 'src/text-ai/text-ai.module';
import { TextAiRouter } from './routers/text-ai.router';
import { AuthRouter } from './routers/auth.router';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TextAiModule, AuthModule],
  providers: [TrpcService, TrpcRouter, TextAiRouter, AuthRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
