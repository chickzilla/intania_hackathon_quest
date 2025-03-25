import { History } from "@/interface/history";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "prompt",
    header: "Prompt",
  },
  {
    accessorKey: "sadnessProb",
    header: "Sad",
  },
  {
    accessorKey: "loveProb",
    header: "Love",
  },
  {
    accessorKey: "joyProb",
    header: "Joy",
  },
  {
    accessorKey: "angryProb",
    header: "Angry",
  },
  {
    accessorKey: "fearProb",
    header: "Fear",
  },
  {
    accessorKey: "surpriseProb",
    header: "Surprise",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
