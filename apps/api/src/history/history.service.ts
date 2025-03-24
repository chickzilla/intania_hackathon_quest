import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserHistory } from 'src/entities/userHistory.entity';
import { CustomRequest } from 'src/interfaces/customRequest';
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
    email: string,
    prompt: string,
    response: any,
  ): Promise<UserHistory> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Email not found');
    }

    const newHistory = this.historyRepository.create({
      userId: user.id,
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

  async getUserHistories(req: CustomRequest, res: Response) {
    const userId = req.userId;
    const {
      limit = 5,
      offset = 0,
      sortBy = 'createdAt',
      orderBy = 'DESC',
    } = req.query;

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
        where: { userId },
        order: { [sortField]: orderDirection },
        take: Number(limit),
        skip: Number(offset),
      });

      return res.status(200).json({
        data: {
          items: histories,
          metaData: { total, count: histories.length },
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
