import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = express();

  const trpcRouter = app.get(TrpcRouter);
  trpcRouter.applyMiddleware(expressApp);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(expressApp);
  await app.listen(8000);
}
bootstrap();
