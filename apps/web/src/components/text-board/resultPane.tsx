"use client";
import { FeelingResponse } from "@/interface/feeling";
import HaveResult from "./have-result";
import { useState, useEffect } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "../ui/drawer";
import { Mood } from "@/constant/enum";
import { MoodDescription } from "@/constant/quote";
import NoResult from "./no-result";

export default function ResultPane({
	resultPrompt,
	openResultFromParent,
}: {
	resultPrompt: FeelingResponse | undefined;
	openResultFromParent: boolean | undefined;
}) {
	const [isResult, setIsResult] = useState(false);
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [highestMood, setHighestMood] = useState<Mood | undefined>(undefined);
	useEffect(() => {
		if (resultPrompt === undefined) {
			setIsResult(false);
		} else {
			setIsResult(true);
			setIsOpenDrawer(true);
			const maxMood = Math.max(
				resultPrompt.sadness,
				resultPrompt.joy,
				resultPrompt.love,
				resultPrompt.anger,
				resultPrompt.fear,
				resultPrompt.surprise
			);
			if (maxMood === resultPrompt.sadness) {
				setHighestMood(Mood.SADNESS);
			} else if (maxMood === resultPrompt.joy) {
				setHighestMood(Mood.JOY);
			} else if (maxMood === resultPrompt.love) {
				setHighestMood(Mood.LOVE);
			} else if (maxMood === resultPrompt.anger) {
				setHighestMood(Mood.ANGER);
			} else if (maxMood === resultPrompt.fear) {
				setHighestMood(Mood.FEAR);
			} else if (maxMood === resultPrompt.surprise) {
				setHighestMood(Mood.SURPRISE);
			}
		}
	}, [resultPrompt]);

	useEffect(() => {
		if (openResultFromParent !== undefined) {
			setIsOpenDrawer(true);
		}
	}, [openResultFromParent]);

	return (
		<>
			<Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
				{isResult ? (
					<DrawerContent>
						<DrawerHeader className="flex-col items-center justify-center py-1 space-y-2">
							<DrawerTitle className="text-white font-bold text-2xl lg:text-4xl text-center">
								{highestMood}
							</DrawerTitle>
							<DrawerDescription className="text-white text-center px-16 text-sm lg:text-base">
								{MoodDescription.get(highestMood as Mood)}
							</DrawerDescription>
						</DrawerHeader>
						<HaveResult resultPrompt={resultPrompt} />{" "}
					</DrawerContent>
				) : (
					<DrawerContent className="pb-10">
						<DrawerHeader className="flex-col items-center justify-center space-y-2">
							<DrawerTitle className="text-white font-bold text-4xl text-center">
								No Result
							</DrawerTitle>
						</DrawerHeader>
						<NoResult />
					</DrawerContent>
				)}
			</Drawer>
		</>
	);
}
