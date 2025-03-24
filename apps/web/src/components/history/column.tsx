import { History, HistoryForTable } from "@/interface/history";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<History>[] = [
	{
		accessorKey: "Prompt",
		header: "Prompt",
	},
	{
		accessorKey: "SadnessProb",
		header: "Sad",
	},
	{
		accessorKey: "LoveProb",
		header: "Love",
	},
	{
		accessorKey: "JoyProb",
		header: "Joy",
	},
	{
		accessorKey: "AngryProb",
		header: "Angry",
	},
	{
		accessorKey: "FearProb",
		header: "Fear",
	},
	{
		accessorKey: "SurpriseProb",
		header: "Surprise",
	},
	{
		accessorKey: "CreatedAt",
		header: "Date",
	},
];
