import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user_history')
export class UserHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  prompt: string;

  @Column('float')
  sadnessProb: number;

  @Column('float')
  loveProb: number;

  @Column('float')
  joyProb: number;

  @Column('float')
  angryProb: number;

  @Column('float')
  fearProb: number;

  @Column('float')
  surpriseProb: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
