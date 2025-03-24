"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { getItemFromLocalStorage } from "@/lib/localstorage";
import { LogOut, History } from "lucide-react";

import {
	Divider,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Tooltip,
} from "@mui/material";
import { dropDownMenuStyle } from "@/style/dropdown-menu-style";
import SignOut from "@/services/signOut";
import { toast } from "../ui/use-toast";

export default function AvatarProfile() {
	const [pictureURL, setPictureURL] = useState("");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
		const url = getItemFromLocalStorage({ key: "profile_image" });
		setPictureURL(url || "/images/user_profile.jpg");
	}, []);
	useEffect(() => {}, [pictureURL]);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHistory = () => {
		window.location.href = "/board/history";
	};

	const signOut = async () => {
		localStorage.removeItem("profile_image");

		try {
			const res = await SignOut();

			window.location.href = "/board/text";
		} catch (e) {
			console.error(e);
			toast({
				title: "Sign out failed",
				description: "Please try again later",
				isError: true,
			});
		}
	};
	return (
		<>
			<Tooltip title="Account menu">
				<IconButton
					onClick={handleClick}
					size="small"
					sx={{ ml: 2 }}
					aria-controls={open ? "account-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
				>
					<Avatar className="move-up hover:bg-zinc-700">
						<AvatarImage
							src={pictureURL}
							alt="profile picture"
							className="hover:cursor-pointer"
						/>
					</Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				slotProps={dropDownMenuStyle}
			>
				<MenuItem
					onClick={handleHistory}
					className="text-sm text-white w-48 hover:bg-zinc-600 bg-transparent rounded-xl py-2"
				>
					<ListItemIcon>
						<History fontSize="small" className="text-white" />
					</ListItemIcon>
					History
				</MenuItem>
				<Divider />
				<MenuItem
					onClick={signOut}
					className="text-sm text-white w-48 hover:bg-zinc-600 bg-transparent rounded-xl py-2"
				>
					<ListItemIcon>
						<LogOut fontSize="small" className="text-white" />
					</ListItemIcon>
					Sign Out
				</MenuItem>
			</Menu>
		</>
	);
}
