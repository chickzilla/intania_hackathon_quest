import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserHistory } from 'src/entities/userHistory.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(UserHistory)
    private readonly historyRepository: Repository<UserHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUserHistory(
    prompt: string,
    response: any,
  ): Promise<UserHistory> {
    const newHistory = this.historyRepository.create({
      prompt,
      loveProb: response.Data.Love,
      sadnessProb: response.Data.Sadness,
      joyProb: response.Data.Joy,
      angryProb: response.Data.Anger,
      surpriseProb: response.Data.Surprise,
      fearProb: response.Data.Fear,
    });

    return await this.historyRepository.save(newHistory);
  }

  async getUserHistories(
    limit: number = 5,
    offset: number = 0,
    sortBy: string = "createdAt",
    orderBy: string = "DESC"
  ): Promise<{ data: { items: UserHistory[]; metaData: { total: number; count: number } } }> {
    

    const validSortFields = [
      'createdAt',
      'loveProb',
      'sadnessProb',
      'joyProb',
      'angryProb',
      'fearProb',
      'surpriseProb',
    ];
    const validOrderDirections = ['ASC', 'DESC'];

    const sortField = validSortFields.includes(sortBy as string)
      ? (sortBy as string)
      : 'createdAt';
    const orderDirection = validOrderDirections.includes(orderBy as string)
      ? (orderBy as string)
      : 'DESC';

    try {
      const [histories, total] = await this.historyRepository.findAndCount({
        order: { [sortField]: orderDirection },
        take: Number(limit),
        skip: Number(offset),
      });

      return { data: {
          items: histories,
          metaData: {
            total: total,
            count: histories.length,
          },
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch user histories');
    }
  }
}
