"use client";
import { useState, useEffect, use } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "../ui/use-toast";
import authWithSSO from "@/services/authWithSSO";
import { setItemToLocalStorage } from "@/lib/localstorage";
import { useRouter } from "next/navigation";

export default function SignInWithSSO({
	setParentRedered,
}: {
	setParentRedered: (isRendered: boolean) => void;
}) {
	const [isRendered, setIsRendered] = useState(false);
	const router = useRouter();

	const onSuccess = async (response: any) => {
		const token = response.credential;

		if (token) {
			const decodedToken: any = jwtDecode(token);
			const userProfile = {
				email: decodedToken.email,
				picture: decodedToken.picture,
			};

			try {
				const email = userProfile.email;
				const response = await authWithSSO({ email });
				if (response.error) {
					toast({
						title: "Cannot sign in with Google",
						description: response.error,
						isError: true,
					});
				}

				setItemToLocalStorage({
					key: "profile_image",
					value: userProfile.picture,
				});

				toast({
					title: "Login success",
					description: "Welcome back",
					isError: false,
				});

				window.location.href = "/board/text";
			} catch (error) {
				console.log(error);
				toast({
					title: "Cannot sign in with Google",
					description: "Failed to sign in with Google",
					isError: true,
				});
			}
		}
	};

	const onFailure = () => {
		toast({
			title: "Cannot sign in",
			description: "Failed to sign in with Google",
			isError: true,
		});
	};

	useEffect(() => {
		setIsRendered(true);
		setParentRedered(true);
	}, []);

	if (!isRendered) return null;
	return (
		<div className="flex flex-col space-y-4 ">
			<div className="flex items-center">
				<div className="flex-grow border-t-2 border-gray-400"></div>
				<span className="mx-4">OR</span>
				<div className="flex-grow border-t-2 border-gray-400"></div>
			</div>
			<div className="w-full items-center flex flex-col">
				<GoogleLogin
					onSuccess={onSuccess}
					onError={onFailure}
					state_cookie_domain={undefined}
					text="continue_with"
					size="large"
					width="300px"
				/>
			</div>
		</div>
	);
}
