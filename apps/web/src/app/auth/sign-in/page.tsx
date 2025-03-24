"use client";
import SignInForm from "@/components/sign-in/sign-in-form";
import SignInWithSSO from "@/components/sign-in/sign-in-with-SSO";
import { useEffect, useState } from "react";

export default function LoginPage() {
	const [finishedAllRedered, setFinishedAllRedered] = useState(false);
	useEffect(() => {
		setFinishedAllRedered(true);
	}, [finishedAllRedered]);

	if (!finishedAllRedered) return null;
	return (
		<main className="w-[100vw] px-10 lg:px-20 pt-[20px] lg:pt-[100px] space-y-12 h-[100vh] overflow-y-hidden bg-slate-100 overflow-x-hidden pb-20 flex flex-col items-center justify-center text-center">
			<div className="space-y-4">
				<div className="">
					<div className="text-4xl font-semibold">Login</div>
				</div>
				<SignInForm />
				<SignInWithSSO
					setParentRedered={(isRendered: boolean) => {
						setFinishedAllRedered(isRendered);
					}}
				/>
			</div>
		</main>
	);
}
