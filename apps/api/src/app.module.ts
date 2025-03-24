import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './trpc/trpc.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    TrpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
