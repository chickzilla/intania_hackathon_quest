import ResultItem from "./result-item";
import HelpSearchQuery from "./help-search-query";
import ResultHover from "./result-hover";
import ResultDescription from "./result-description";
import { FeelingResponse } from "@/interface/feeling";
import { Drawer } from "../ui/drawer";

export default function HaveResult({
	resultPrompt,
}: {
	resultPrompt: FeelingResponse | undefined;
}) {
	return (
		<div className=" items-center justify-center text-center text-black space-y-6 w-full pb-10">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-5 py-10">
				<div className="">
					<ResultItem
						mood="Sad"
						percent={Number(resultPrompt?.sadness) || 0}
						color="gray"
						sizeCircle={50}
					>
						<div className="text-4xl">😥</div>
					</ResultItem>
				</div>

				<div className="">
					<ResultItem
						mood="Joy"
						percent={Number(resultPrompt?.joy) || 0}
						color="yellowgreen"
						sizeCircle={50}
					>
						<div className="text-4xl">😂</div>
					</ResultItem>
				</div>
				<div className="">
					<ResultItem
						mood="Love"
						percent={Number(resultPrompt?.love) || 0}
						color="pink"
						sizeCircle={50}
					>
						<div className="text-4xl">🥰</div>
					</ResultItem>
				</div>
				<div className="">
					<ResultItem
						mood="Angry"
						percent={Number(resultPrompt?.anger) || 0}
						color="red"
						sizeCircle={50}
					>
						<div className="text-4xl">😤</div>
					</ResultItem>
				</div>
				<div className="">
					<ResultItem
						mood="Fear"
						percent={Number(resultPrompt?.fear) || 0}
						color="purple"
						sizeCircle={50}
					>
						<div className="text-4xl">😨</div>
					</ResultItem>
				</div>
				<div className="">
					<ResultItem
						mood="Surprise"
						percent={Number(resultPrompt?.surprise) || 0}
						color="orange"
						sizeCircle={50}
					>
						<div className="text-4xl">😦</div>
					</ResultItem>
				</div>
			</div>
		</div>
	);
}
