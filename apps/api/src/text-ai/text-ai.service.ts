import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UserHistory } from 'src/entities/userHistory.entity';
import TextResponseData, { AiResponseData } from 'src/interfaces/textResponseData';
import { Repository } from 'typeorm';
//import { config } from 'dotenv';
import { Response } from 'express';

//config();

@Injectable()
export class TextAiService {
  constructor(
    @InjectRepository(UserHistory)
    private readonly historyRepository: Repository<UserHistory>,
  ) {}

  async sendPrompt(prompt : string){
    
    const textAIURL = process.env.TEXT_AI_URL;

    if (!textAIURL) {
      throw new Error('TEXT_AI_URL is not defined in environment variables');
    }

    try {
      const response = await axios.post<TextResponseData>(
        `${textAIURL}/prompt`,
        { prompt },
      );
      const responseData = response.data;

      const newHistory = this.historyRepository.create({
          prompt,
          loveProb: responseData.data.love,
          sadnessProb: responseData.data.sadness,
          joyProb: responseData.data.joy,
          angryProb: responseData.data.anger,
          surpriseProb: responseData.data.surprise,
          fearProb: responseData.data.fear,
        });
      await this.historyRepository.save(newHistory);

      return {
        sadness: responseData.data.sadness,
        joy: responseData.data.joy,
        love: responseData.data.love,
        anger: responseData.data.anger,
        fear: responseData.data.fear,
        surprise: responseData.data.surprise,
      }
    } catch (error) {
      throw new Error('Failed to communicate with Text-AI service');
    }
  }
}
