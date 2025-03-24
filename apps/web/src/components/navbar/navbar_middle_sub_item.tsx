import Link from "next/link";

export default function NavbarMiddleSubItem({
  name,
  isActive,
  href,
}: {
  name: string;
  isActive: boolean;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="hover:cursor-pointer">Board</div>
    </Link>
  );
}
