"use client";

import React, { useState } from "react";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { MoodDescriptionEmojiHistory } from "@/constant/emoji";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isGetData: boolean;
}

function getMostProbableEmotion(data: any) {
	const emotions = {
		Sad: data.SadnessProb,
		Love: data.LoveProb,
		Joy: data.JoyProb,
		Angry: data.AngryProb,
		Fear: data.FearProb,
		Surprise: data.SurpriseProb,
	};

	const [mostProbableEmotion, maxProb] = Object.entries(emotions).reduce(
		([maxEmotion, maxValue], [currentEmotion, currentValue]) =>
			currentValue > maxValue
				? [currentEmotion, currentValue]
				: [maxEmotion, maxValue],
		["", -Infinity]
	);

	return `${MoodDescriptionEmojiHistory.get(
		mostProbableEmotion
	)} ${mostProbableEmotion} (${(maxProb * 100).toFixed(2)}%)`;
}

function getHighestProbKey(data: any) {
	const emotions = {
		SadnessProb: data.SadnessProb,
		LoveProb: data.LoveProb,
		JoyProb: data.JoyProb,
		AngryProb: data.AngryProb,
		FearProb: data.FearProb,
		SurpriseProb: data.SurpriseProb,
	};

	const [highestProbKey] = Object.entries(emotions).reduce(
		([maxKey, maxValue], [currentKey, currentValue]) =>
			currentValue > maxValue ? [currentKey, currentValue] : [maxKey, maxValue],
		["", -Infinity]
	);

	return highestProbKey;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isGetData,
}: DataTableProps<TData, TValue>) {
	const [selectedRowData, setSelectedRowData] = useState<TData | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const handleRowClick = (rowData: TData) => {
		setSelectedRowData(rowData);
		setIsDialogOpen(true);
	};

	return (
		<div className="w-full mb-4 overflow-x-auto">
			<Table className="border-none h-full w-full">
				<TableHeader className="sticky top-0 bg-[#2f2f2f] z-10">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} className="text-sm md:text-base">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>

				{!isGetData ? (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className="h-24 text-center px-0 space-y-5"
						>
							<Skeleton className="h-10 w-full bg-[#2f2f2f]" />
							<Skeleton className="h-10 w-full bg-[#2f2f2f]" />
							<Skeleton className="h-10 w-full bg-[#2f2f2f]" />
							<Skeleton className="h-10 w-full bg-[#2f2f2f]" />
						</TableCell>
					</TableRow>
				) : (
					<TableBody>
						{data ? (
							table.getRowModel().rows.map((row, index) => {
								const highestProbKey = getHighestProbKey(row.original as any);

								return (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										className={`${
											index % 2 === 0 ? "bg-[#3d3d3d]" : "bg-[#2f2f2f]"
										} text-gray-200 text-xs hover:bg-black hover:cursor-pointer`}
										onClick={() => handleRowClick(row.original)}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className={`${
													cell.column.id === highestProbKey
														? "text-green-400 font-bold"
														: ""
												} truncate max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis`}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				)}
			</Table>

			<Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
				<DialogContent className="text-gray-200 w-[80vw]">
					<DialogHeader>
						<DialogTitle className="text-center text-lg">Prompt</DialogTitle>
					</DialogHeader>
					<div className="overflow-y-scroll w-full h-[40vh] p-4 text-sm bg-zinc-300 text-black rounded-lg">
						{selectedRowData
							? (selectedRowData as any).Prompt || "No Prompt available"
							: "No data available."}
					</div>
					<div className="flex w-full justify-between flex-row text-sm md:text-base">
						<div className="p-4">
							{selectedRowData
								? (selectedRowData as any).CreatedAt ||
								  "No Description available"
								: "No data available."}
						</div>
						<div className="p-4">
							{selectedRowData
								? getMostProbableEmotion(selectedRowData as any) ||
								  "No Description available"
								: "No data available."}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
