import { Injectable } from "@nestjs/common";
import { TrpcService } from "../trpc.service";
import { z } from "zod";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthRouter {
  constructor(
    private readonly authService: AuthService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    sigUp: this.trpcService.trpc.procedure
      .input(
        z.object({
          email: z.string().email().min(1, { message: "Email is required" }),
          password: z.string().min(1, { message: "Password is required" }),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.authService.signUp(input.email, input.password);
      }),
    signIn: this.trpcService.trpc.procedure
      .input(
        z.object({
          email: z.string().email().min(1, { message: "Email is required" }),
          password: z.string().min(1, { message: "Password is required" }),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.authService.signIn(input.email, input.password);
      }),
  });
}
