import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHistory } from 'src/entities/userHistory.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHistory, User])],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
