import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHistory } from 'src/entities/userHistory.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHistory, User]), AuthModule],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
