import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { TrpcService } from "../trpc.service";
import { z } from "zod";

@Injectable()
export class AuthRouter {
    constructor(
        private readonly authService: AuthService, 
        private readonly trpcService: TrpcService
    ) {}

    appRouter = this.trpcService.router({
        signUp: this.trpcService.trpc.procedure
          .input(
            z.object({
                email: z.string().email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
              password: z.string().min(1, { message: "Password is required" }),
            }),
          )
          .mutation(({ input }) => {
            return this.authService.signUp(input.email, input.password);
          }),
        /*validateToken: this.trpcService.trpc.procedure
          .input(
            z.object({
              accessToken: z.string(),
            }),
          )
          .query(({ input }) => {
            return this.authService.validateJWT(input.accessToken);
          }),
        refreshToken: this.trpcService.trpc.procedure
          .input(
            z.object({
              userId: z.string(),
              refreshToken: z.string(),
            }),
          )
          .query(({ input }) => {
            return this.authService.refreshToken(input.userId, input.refreshToken);
          }),
        signOut: this.trpcService.trpc.procedure
          .input(
            z.object({
              accessToken: z.string(),
            }),
          )
          .query(({ input }) => {
            return this.authService.signOut(input.accessToken);
          }),*/
      });
}   