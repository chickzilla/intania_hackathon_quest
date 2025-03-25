"use client";

import { BookType, Menu } from "lucide-react";
import { TbLogs } from "react-icons/tb";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarItem from "./navbar-item";
import { useTheme, useMediaQuery } from "@mui/material";
import { IoLogoGithub } from "react-icons/io5";

export default function NavbarDashBoard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!isSmallScreen) {
      setExpanded(true);
    } else {
      const expandedDefault =
        typeof window !== "undefined"
          ? localStorage.getItem("navbarExpanded")
          : "false";
      setExpanded(expandedDefault === "true");
    }
  }, [isSmallScreen]);

  const pathname = usePathname();

  return (
    <aside
      className={`h-screen ${
        !expanded ? "bg-coffeeBlack" : "bg-blackGray"
      } flex-none fixed top-0 py-16 transition-all z-20 ${
        !isSmallScreen && expanded ? "sticky" : ""
      } ${isSmallScreen && expanded ? "z-50" : ""}`}
      style={{ width: expanded ? "240px" : "100px" }}
    >
      {isSmallScreen && (
        <button
          onClick={() => {
            localStorage.setItem("navbarExpanded", String(!expanded));
            setExpanded((curr) => !curr);
          }}
          className="p-1.5 rounded-xl top-20 text-gray-400 fade-in-delay-0 pl-[40px]"
        >
          {expanded ? <Menu /> : <Menu />}
        </button>
      )}

      <nav
        className={`h-full flex flex-col max-w-60 justify-between overflow-x-hidden transition-all overflow-y-hidden no-scrollbar py-14 ${
          expanded ? "px-10" : "px-4"
        } fade-in-delay-0 md:pb-28 `}
      >
        <div className="flex flex-col justify-around items-center gap-3.5 px-2">
          {isSmallScreen && expanded && (
            <div className="flex justify-center items-center mt-6">
              <img
                src="/images/logo/logo.svg"
                alt="TextMoods Logo"
                className="h-10 w-10"
              />
            </div>
          )}
          <span
            className={`text-white text-sm text-center font-semibold overflow-hidden text-nowrap ${
              expanded ? "w-full" : "w-0"
            }`}
          >
            {isSmallScreen ? "TextMoods" : "Menu"}
          </span>
          <hr className="w-full bg-[#041016] my-5" />
        </div>
        <ul className="flex-1 flex gap-2.5 flex-col">
          <NavbarItem
            icon={<BookType size={20} />}
            text="Predictions"
            expanded={expanded}
            active={pathname.startsWith("/board/text")}
            href="/board/text"
          />
          <NavbarItem
            icon={<TbLogs size={20} />}
            text="History"
            expanded={expanded}
            active={pathname.startsWith("/board/history")}
            href="/board/history"
          />
        </ul>
      </nav>
    </aside>
  );
}
