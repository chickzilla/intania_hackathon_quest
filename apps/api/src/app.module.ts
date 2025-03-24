import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './trpc/trpc.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { HistoryModule } from './history/history.module';
import { TextAiModule } from './text-ai/text-ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          url: configService.get<string>('DATABASE_URL'),
          entities: [join(__dirname, '**/*.entity.{ts,js}')],
          driver: require('mysql2'),
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    TrpcModule,
    AuthModule,
    HistoryModule,
    TextAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
