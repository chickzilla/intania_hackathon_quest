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
    ></div>
  );
}
