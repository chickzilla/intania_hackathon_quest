import { Injectable } from "@nestjs/common";
import { TrpcService } from "../trpc.service";
import { z } from "zod";
import { TextAiService } from "src/text-ai/text-ai.service";


@Injectable()
export class TextAiRouter {
    constructor(
        private readonly textAiService: TextAiService, 
        private readonly trpcService: TrpcService
    ) {}

    appRouter = this.trpcService.router({
        predict: this.trpcService.trpc.procedure
          .input(
            z.object({
                prompt: z.string().min(1, { message: "Prompt is required" }),
            }),
          )
          .mutation(async({ input }) => {
            const result = await this.textAiService.sendPrompt(input.prompt);
            return result;
          }),
        });
}   