import { trpc } from "@/app/trpc";
import Feeling, { FeelingResponse } from "@/interface/feeling";

export default async function getFeeling({
  prompt,
}: {
  prompt: string;
}): Promise<FeelingResponse> {
  
  const data = await trpc.ai.predict.mutate({ prompt });
  console.log("test ", data);

  return data;
}
