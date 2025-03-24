export default function HelpSearchQuery() {
  return (
    <div className="flex flex-col space-y-9 ">
      <div className="title-2 text-start text-orange-500">Maybe this help</div>
      <div className="description text-start w-[100%] lg:w-[60%]">
        Praising the celestial entities for their benevolence, we are profoundly
        grateful to retain the unparalleled assistance and wisdom provided by
        Chat-GPT lol.
      </div>
      <div className=" flex flex-col space-y-10 bg-neutral-800 rounded-2xl p-10 min-h-[10vh] max-h-[50vh] lg:max-h-max overflow-y-auto">
        <div className="text-white text-start">
          Embrace the Power of Yet: Understand that where you are now doesn't
          dictate where you'll end up. If you haven't achieved something yet, it
          simply means you're on a journey toward it. Adding "yet" to the end of
          sentences like "I can't do this" transforms them into opportunities
          for growth: "I can't do this yet." View Challenges as Opportunities:
          Instead of seeing obstacles as roadblocks, consider them as chances to
          learn and improve. Challenges push you out of your comfort zone,
          Understand...
        </div>
      </div>
      <div className="text-end">
        <button
          className={`bg-orange-700 text-white py-2 px-5 rounded-xl font-normal fade-in-delay-0  
         w-[100%] lg:w-40 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-orange-400 hover:bg-white hover:text-black hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 
          `}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
