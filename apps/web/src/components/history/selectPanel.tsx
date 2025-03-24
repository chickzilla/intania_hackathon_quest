import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectPanel({
  setSortByToParent,
  setOrderByToParent,
}: {
  setSortByToParent: (value: string) => void;
  setOrderByToParent: (value: string) => void;
}) {
  return (
    <div className="flex flex-row space-x-5 w-full">
      <div className="space-y-2">
        <div className="text-xs">Sort By:</div>
        <Select
          onValueChange={(value: string) => {
            setSortByToParent(value);
          }}
        >
          <SelectTrigger className="px-4 py-2 text-white">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="SadnessProb" className="text-xs">
              Date
            </SelectItem>
            <SelectItem value="sadness_prob" className="text-xs">
              Sad
            </SelectItem>
            <SelectItem value="love_prob" className="text-xs">
              Love
            </SelectItem>
            <SelectItem value="joy_prob" className="text-xs">
              Joy
            </SelectItem>
            <SelectItem value="angry_prob" className="text-xs">
              Angry
            </SelectItem>
            <SelectItem value="fear_prob" className="text-xs">
              Fear
            </SelectItem>
            <SelectItem value="surprise_prob" className="text-xs">
              Surprise
            </SelectItem>
            <SelectItem value="created_at" className="text-xs">
              Date
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <div className="text-xs">Order By:</div>
        <Select
          onValueChange={(value: string) => {
            setOrderByToParent(value);
          }}
        >
          <SelectTrigger className="px-4 py-2 text-white">
            <SelectValue placeholder="DESC" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="ASC">ASC</SelectItem>
            <SelectItem value="DESC">DESC</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
