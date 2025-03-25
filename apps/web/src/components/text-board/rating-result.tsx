export default function RatingResult() {
  return (
    <div className="flex flex-col space-y-9 ">
      <div className="title-2 text-start text-white">
        In case our AI cant help you.
      </div>
      <div className="description text-start w-[100%] lg:w-[60%]">
        Please select the right mood you think. We will make it to make our AI
        more accurate.
      </div>
      <div className=" flex flex-col space-y-10 bg-neutral-800 rounded-2xl p-10 min-h-[10vh]"></div>
    </div>
  );
}
