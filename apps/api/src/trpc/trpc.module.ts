import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { TextAiModule } from 'src/text-ai/text-ai.module';
import { TextAiRouter } from './routers/text-ai.router';
import { AuthRouter } from './routers/auth.router';
import { AuthModule } from 'src/auth/auth.module';
import { HistoryModule } from 'src/history/history.module';
import { HistoryRouter } from './routers/user-history.router';

@Module({
  imports: [TextAiModule, AuthModule, HistoryModule],
  providers: [TrpcService, TrpcRouter, TextAiRouter, AuthRouter, HistoryRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
