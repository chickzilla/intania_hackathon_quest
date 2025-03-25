import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateKey } from 'src/utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(email : string, password : string): Promise<string> {
    console.log(email, password);

    try {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        email,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);

      const jwt = generateKey(email);
      return jwt;
    } catch (error) {
        console.log(error);
      throw new Error(error.message);
    }
  }

  async signIn(email: string, password:string): Promise<string> {
    console.log(email, password);
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const jwt = generateKey(email);
      console.log("login ok");

      return jwt;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
  }
}
