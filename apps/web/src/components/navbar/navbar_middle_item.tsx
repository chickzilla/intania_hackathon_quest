"use client";
import { useRouter } from "next/navigation";

export default function NavbarMiddleItem({
  isTextBlack,
}: {
  isTextBlack: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className={`text-center items-center font-light flex flex-row space-x-7 navbarText ${
        isTextBlack ? "text-black" : "text-white"
      }`}
    >
      {/*

			<Link
				href="/board/history"
				className="hover:bg-slate-200 px-4 rounded-xl hover:bg-opacity-20 transition duration-200"
			>
				<div className="hover:cursor-pointer ">History</div>
			</Link>
				*/}
      {/*

					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem className="">
								<NavigationMenuTrigger className="font-light navbarText">
									Our service
								</NavigationMenuTrigger>
								<NavigationMenuContent className="">
									<div className=" bg-black rounded-2xl border-2 border-borderColor bg-opacity-30 p-3 flex flex-row space-x-5 ">
										<NavbarDropdownItem
											name="Text"
											href="/board/text"
											description="From text alone, we can gauge her feelings."
										/>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					*/}
      {/*
				<Link
					href="https://github.com/chickzilla/her-feeling-client"
					className="hover:bg-slate-200 px-4 rounded-xl hover:bg-opacity-20 transition duration-200"
				>
					<div className="hover:cursor-pointer ">Github</div>
				</Link>*/}
    </div>
  );
}
