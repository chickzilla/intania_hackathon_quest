import { HistoryResponse } from "@/interface/history";

export default async function GetHistories({
    limit, offset,sortBy, orderBy
} : {
    limit?: number;
    offset?: number;
    sortBy?: string;
    orderBy?: string;
}): Promise<HistoryResponse>{
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
    const response = await fetch(
        `${API_URL}/histories?limit=${limit}&offset=${offset}&sortBy=${sortBy}&orderBy=${orderBy}`, {
            credentials: 'include'
        }
    );

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  return await response.json();
}