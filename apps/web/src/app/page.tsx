import { redirect } from "next/navigation";

export default function Home() {
  redirect("/board/text");

  return <main className="h-screen bg-black"></main>;
}
