import Link from "next/link";

export default function NavbarDropdownItem({
	name,
	description,
	href,
}: {
	name: string;
	description: string;
	href: string;
}) {
	return (
		<Link
			href={href}
			className="hover:cursor-pointer text-start p-4 hover:bg-slate-600 rounded-2xl hover:bg-opacity-70"
		>
			<div className="text-base font-bold">{name}</div>
			<div className="w-[15vw] text-gray-200 text-sm">{description}</div>
		</Link>
	);
}
