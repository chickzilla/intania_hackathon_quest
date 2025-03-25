import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
/* 
  @Column({ default: false })
  onlySSO: boolean; */

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
