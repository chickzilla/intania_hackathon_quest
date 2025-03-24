import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function ResultHover({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger className="hover:cursor-pointer">
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="bg-white text-black p-4 rounded-2xl">
          The React Framework – created and maintained by @vercel.
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
