import Image from "next/image";
import NavbarMiddleItem from "./navbar_middle_item";
import Link from "next/link";

export default function Navbar({ isTextBlack }: { isTextBlack: boolean }) {
  return (
    <nav
      className={`fixed top-0 w-screen h-16 px-8 items-center z-30 
      bg-transparent text-white fade-in-delay-0* 
      `}
    >
      <div className="text-center items-center font-bold flex flex-row justify-between h-full text-sm lg:text-base">
        <Link href="/board/text">
          <div className="flex flex-row items-center space-x-5 text-xs lg:text-base">
            <Image
              alt="predict feeling bt text and image classifier model"
              src="/images/logo/logo.png"
              width={30}
              height={30}
            />
            <div className={`${isTextBlack ? "text-black" : "text-white"}`}>
              TextMoods
            </div>
          </div>
        </Link>
        <NavbarMiddleItem isTextBlack={isTextBlack} />
        {/*         <AvartarProfile />
         */}{" "}
      </div>
    </nav>
  );
}
