"use client";
import HeaderTitle from "@/components/text-board/header-title";
import ResultPane from "@/components/text-board/resultPane";
import TextAreaSendPrompt from "@/components/text-board/text-area-send-prompt";
import { FeelingResponse } from "@/interface/feeling";
import { useState } from "react";

export default function BoardTextPage() {
	const [promptResult, setPromptResult] = useState<FeelingResponse | undefined>(
		undefined
	);
	const [isOpenResult, setIsOpenResult] = useState<boolean | undefined>(
		undefined
	);

	return (
		<main className="w-[100vw] px-10 lg:px-20 space-y-12 h-[100vh] overflow-y-hidden text-black bg-coffeeBlack overflow-x-hidden pb-20 pt-16 pl-[140px] lg:pl-10">
			<div className="flex flex-col h-[100vh] justify-around">
				<HeaderTitle />
				<div className="flex flex-col text-center justify-around">
					<div className="title-1 text-base lg:text-2xl move-up w-[100%] lg:w-auto leading-snug text-start text-orange-500">
						Let's Predict 🧐
					</div>
					<TextAreaSendPrompt
						setResultPromptToParent={(prompt: FeelingResponse) => {
							setPromptResult(prompt);
						}}
						setOpenResultToParent={(isOpen: boolean) => {
							setIsOpenResult(!isOpen);
						}}
					/>
					<div className="text-xs mt-4 text-gray-400 text-start w-full">
						👉 Prediction could be wrong. Please use them for decision-making
						purposes only.
					</div>
				</div>
				<div className="">
					<ResultPane
						resultPrompt={promptResult}
						openResultFromParent={isOpenResult}
					/>
				</div>
			</div>
		</main>
	);
}
