import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TextAiRouter } from './routers/text-ai.router';
import { AuthRouter } from './routers/auth.router';


@Injectable()
export class TrpcRouter {
  constructor(private readonly trpcService: TrpcService,
    private readonly textAiRouter: TextAiRouter,
    private readonly authRouter: AuthRouter
  ) {}

  appRouter = this.trpcService.router({
    hello: this.trpcService.procedure.query(() => 'Hello from tRPC!'),
    ai: this.textAiRouter.appRouter,
    auth: this.authRouter.appRouter
  });

  applyMiddleware(app: INestApplication) {
    app.use('/trpc', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Credentials', 'true');

      if (req.method === 'OPTIONS') {
        res.status(204).send();
      } else {
        next();
      }
    });

    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
