import { Toaster } from "@/components/alert/toaster";
import Footer from "@/components/footer/footer";
import NavbarDashBoard from "@/components/navbar/dashboard/navbar-dashboard";
import Navbar from "@/components/navbar/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Text Moods - Text-Based Mood Prediction",
	description:
		"With TextMoods, reveal the emotional insights concealed in words. You may improve your understanding of and relationships with the significant someone in your life by using our sophisticated mood prediction tool, which analyzes text to uncover underlying emotions. TextMoods offers precise and customized mood forecasts to help you navigate relationships and strengthen bonds, whether you're just inquisitive or navigating a friendship.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="flex">
				<Navbar isTextBlack={false} />
				<NavbarDashBoard />
				{children}
			</div>
		</>
	);
}
