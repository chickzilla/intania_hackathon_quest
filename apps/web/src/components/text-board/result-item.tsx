import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const CircularContainer = styled("div")(({ theme }) => ({
	position: "relative",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
}));

const IconContainer = styled("div")(({ theme }) => ({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
}));

export default function ResultItem({
	mood,
	percent,
	children,
	color,
	sizeCircle,
}: {
	mood: string;
	percent: number;
	children: React.ReactNode;
	color: string;
	sizeCircle: number;
}) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const animateProgress = setTimeout(() => {
			setProgress(Number((percent * 100).toFixed(2)));
		}, 200); // delay for starting the animation

		return () => clearTimeout(animateProgress);
	}, [percent]);

	return (
		<div className="flex-col items-center justify-center text-center text-gray-400 move-right-to-left">
			<CircularContainer>
				<CircularProgress
					variant="determinate"
					value={progress}
					size={sizeCircle + 30}
					sx={{
						color: color,
						transition: "value 1.5s ease-in-out", // smooth transition for progress
					}}
				/>
				<IconContainer>{children}</IconContainer>
			</CircularContainer>
			<div className={`text-white font-semibold text-center `}>{mood}</div>
			<div>
				<span className="font-semibold text-base text-gray-500">
					{progress}%
				</span>
			</div>
		</div>
	);
}
