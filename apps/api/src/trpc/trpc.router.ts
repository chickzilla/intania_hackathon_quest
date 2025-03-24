import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AuthRouter } from './routers/auth.router';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpcService: TrpcService,
    private readonly authRouter: AuthRouter,
  ) {}

  appRouter = this.trpcService.router({
    hello: this.trpcService.procedure.query(() => 'Hello from tRPC!'),
    auth: this.authRouter.appRouter,
  });

  applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
