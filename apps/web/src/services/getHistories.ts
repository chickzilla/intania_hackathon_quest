import { trpc } from "@/app/trpc";
import { HistoryResponse } from "@/interface/history";

export default async function GetHistories({
    limit, offset,sortBy, orderBy
} : {
    limit?: number;
    offset?: number;
    sortBy?: string;
    orderBy?: string;
}): Promise<HistoryResponse>{

    const validOrderBy: "ASC" | "DESC" | undefined =
        orderBy === "ASC" || orderBy === "DESC" ? orderBy : undefined;

    const data = await trpc.history.getHistories.mutate({
        limit,
        offset,
        sortBy,
        orderBy: validOrderBy,
    });

  if (!data) {
    throw new Error("Failed to fetch history");
  }

  return data;
}