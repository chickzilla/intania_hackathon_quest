import { trpcClient } from "../utils/trpc";

export async function callHelloAPI() {
  try {
    const response = await trpcClient.hello.query();
    console.log("Response from tRPC API:", response);
    return response;
  } catch (error) {
    console.error("Error calling tRPC API:", error);
    return null;
  }
}
