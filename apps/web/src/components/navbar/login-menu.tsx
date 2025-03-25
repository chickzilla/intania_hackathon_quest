import Link from "next/link";

export default function LoginMenu({ isTextBlack }: { isTextBlack: boolean }) {
  return (
    <div
      className={`${
        isTextBlack ? "text-black" : "text-white"
      } flex flex-row space-x-5 text-xs : lg:text-base font-light`}
    >
      {isTextBlack ? (
        <Link
          href="/board/text"
          className={`hover:bg-black px-4 rounded-xl hover:bg-opacity-20 transition duration-200 `}
        >
          <div className="hover:cursor-pointer ">Predict as guest</div>
        </Link>
      ) : null}
      <Link
        href="/auth/sign-up"
        className={`${
          isTextBlack ? "hover:bg-black" : "hover:bg-slate-200"
        } px-4 rounded-xl hover:bg-opacity-20 transition duration-200 `}
      >
        <div className="hover:cursor-pointer navbarText">Sign up</div>
      </Link>
      <Link
        href="/auth/sign-in"
        className={`${
          isTextBlack ? "hover:bg-black" : "hover:bg-slate-200"
        } px-4 rounded-xl hover:bg-opacity-20 transition duration-200`}
      >
        <div className="hover:cursor-pointer navbarText">Sign in</div>
      </Link>
    </div>
  );
}
