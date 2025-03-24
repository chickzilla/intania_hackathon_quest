import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CustomRequest } from 'src/interfaces/customRequest';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { generateKey } from 'src/utils/jwt.util';
import { SignInDTO, SignInWithSSODTO, SignOutDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(req: SignInDTO) {
    const { email, password } = req;
    console.log(email, password);

    try {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        return JSON.stringify({ error: 'Email already exists' });
      }

      const hashedPassword = await argon2.hash(password);
      const newUser = this.userRepository.create({
        email,
        password: hashedPassword,
        onlySSO: false,
      });
      await this.userRepository.save(newUser);

      return JSON.stringify({ response: 'Created successfully' });
    } catch (error) {
      return JSON.stringify({ error: error.message });
    }
  }

  async signIn(req: SignInDTO) {
    const { email, password } = req;

    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return JSON.stringify({ error: 'Email not found' });
      }

      if (user.onlySSO) {
        return JSON.stringify({ error: 'This email can only be accessed via SSO' });
      }

      const isValidPassword = await argon2.verify(password, user.password);
      if (!isValidPassword) {
        return JSON.stringify({ error: 'Wrong password' });
      }

      const jwtToken = generateKey(email);
      return JSON.stringify({ response: jwtToken });
    } catch (error) {
      return JSON.stringify({ error: error.message });
    }
  }

  async signInWithSSO(req: SignInWithSSODTO) {
    const { email } = req;

    try {
      let user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        user = this.userRepository.create({ email, onlySSO: true });
        await this.userRepository.save(user);
      }

      const jwtToken = generateKey(email);
      return JSON.stringify({ response: jwtToken });
    } catch (error) {
      return JSON.stringify({ error: error.message });
    }
  }

  signOut(req: SignOutDTO) {
    return JSON.stringify({ message: 'Signed out' });
  }
}
