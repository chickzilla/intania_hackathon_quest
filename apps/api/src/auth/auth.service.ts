import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { generateKey } from 'src/utils/jwt.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(email:string, password:string): Promise<string> {
    console.log(email, password);
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new ForbiddenException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        email,
        password: hashedPassword,
        onlySSO: false,
      });
      await this.userRepository.save(newUser);

      const jwtToken = generateKey(email);

      return jwtToken;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signIn(email:string, password:string): Promise<string> {

    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new ForbiddenException('Email not found');
      }

      if (user.onlySSO) {
        throw new ForbiddenException('This account is SSO only');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new ForbiddenException('Invalid password');
      }

      const jwtToken = generateKey(email);
      return jwtToken;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
/*
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
  }*/
}
