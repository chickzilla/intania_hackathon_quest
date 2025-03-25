import { Injectable } from "@nestjs/common";
import { TrpcService } from "../trpc.service";
import { z } from "zod";
import { TextAiService } from "src/text-ai/text-ai.service";
import { HistoryService } from "src/history/history.service";


@Injectable()
export class HistoryRouter {
    constructor(
        private readonly historyService: HistoryService, 
        private readonly trpcService: TrpcService
    ) {}

    appRouter = this.trpcService.router({
        getHistories: this.trpcService.trpc.procedure
          .input(
            z.object({
                limit: z.number().min(1).max(100).default(10), 
                offset: z.number().min(0).default(0),
                sortBy: z.string().optional(), 
                orderBy: z.enum(["ASC", "DESC"]).default("DESC"),
            }),
          )
          .mutation(async({ input }) => {
            const result = await this.historyService.getUserHistories(
                input.limit, 
                input.offset, 
                input.sortBy, 
                input.orderBy
            );
            return result;
          }),
        });
}   