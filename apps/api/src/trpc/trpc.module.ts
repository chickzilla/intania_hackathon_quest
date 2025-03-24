import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthRouter } from './routers/auth.router';

@Module({
  imports: [AuthModule],
  providers: [TrpcService, TrpcRouter, AuthRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
