import { Telescope } from "lucide-react";
import { Send, Award } from "lucide-react";

export default function NoResult() {
	return (
		<div className="flex flex-col items-center justify-center text-center text-gray-400 space-y-5">
			<Telescope size={100} />
			<div className="text-xl font-semibold">
				Click <Send className="inline" /> to find something amazing
			</div>
		</div>
	);
}
