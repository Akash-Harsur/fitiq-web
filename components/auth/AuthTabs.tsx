"use client";

type AuthTabsProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AuthTabs({
  isLogin,
  setIsLogin,
}: AuthTabsProps) {
  return (
    <div className="mt-8 flex rounded-xl bg-gray-100 p-1">

      <button
        onClick={() => setIsLogin(true)}
        className={`flex-1 rounded-lg py-3 font-semibold transition ${
          isLogin
            ? "bg-white text-black shadow-sm"
            : "text-gray-500"
        }`}
      >
        Sign In
      </button>

      <button
        onClick={() => setIsLogin(false)}
        className={`flex-1 rounded-lg py-3 font-semibold transition ${
          !isLogin
            ? "bg-white text-black shadow-sm"
            : "text-gray-500"
        }`}
      >
        Sign Up
      </button>

    </div>
  );
}