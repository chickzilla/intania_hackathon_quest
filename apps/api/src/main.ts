import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = express();

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app)

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'], 
  });

  app.use(expressApp);
  await app.listen(8080);
}
bootstrap();
console.log('Server running at http://localhost:8080');
