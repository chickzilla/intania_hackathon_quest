import Link from "next/link";

export default function NavbarItem({
  icon,
  text,
  active,
  expanded,
  href,
  isBlank,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  expanded: boolean;
  href: string;
  isBlank?: boolean;
}) {
  return (
    <Link href={href} target={isBlank ? "_blank" : "_self"}>
      <li
        className={`relative rounded-xl flex items-center py-2.5 px-2.5 justify-center cursor-pointer transition-colors group ${
          active
            ? "bg-white text-[#041016]"
            : "hover:bg-white text-white  hover:text-black"
        }`}
      >
        <div className="flex-initial h-6">{icon}</div>
        <span
          className={`overflow-hidden transition-all font-medium font-inter ${
            expanded ? "w-60 ml-2.5" : "hidden"
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
