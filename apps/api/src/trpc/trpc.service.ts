import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { Context } from 'vm';

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<Context>().create();
  router = this.trpc.router;
  procedure = this.trpc.procedure;
}
