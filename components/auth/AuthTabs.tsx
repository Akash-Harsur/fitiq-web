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
        type="button"
        onClick={() => setIsLogin(true)}
        className={`flex-1 rounded-lg py-3 font-semibold transition duration-300 active:scale-95 ${
          isLogin
            ? "bg-white text-black shadow-sm"
            : "text-gray-500 hover:text-black"
        }`}
      >
        Sign In
      </button>

      <button
        type="button"
        onClick={() => setIsLogin(false)}
        className={`flex-1 rounded-lg py-3 font-semibold transition duration-300 active:scale-95 ${
          !isLogin
            ? "bg-white text-black shadow-sm"
            : "text-gray-500 hover:text-black"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}