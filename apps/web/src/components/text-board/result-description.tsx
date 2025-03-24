"use client";

import { Mood } from "@/constant/enum";
import { FeelingResponse } from "@/interface/feeling";
import { useEffect, useState } from "react";

export default function ResultDescription({
	resultPrompt,
}: {
	resultPrompt: FeelingResponse | undefined;
}) {
	const [highestMood, setHighestMood] = useState<Mood | undefined>(undefined);
	useEffect(() => {
		if (resultPrompt === undefined) {
			return;
		} else {
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
	if (!highestMood) return null;
	return (
		<div className="flex flex-col space-y-4">
			<div className="title-2 text-center text-white">{highestMood}</div>
			<div className="description text-start text-white border-borderColor border-2 py-6 px-10 rounded-2xl">
				You find yourself standing at the edge of a vast, deserted field as the
				sun begins to set, casting long, melancholic shadows across the land.
				The air is thick with the scent of rain, though none has fallen yet. In
				the distance, the faint outline of a dilapidated farmhouse stands as a
				solitary sentinel, a reminder of better days long past. The once-vibrant
				crops that used to dance in the breeze now lay withered and forgotten, a
				testament to the passage of time and neglect.
			</div>
		</div>
	);
}
