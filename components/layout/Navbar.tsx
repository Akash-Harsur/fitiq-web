export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        <h1 className="text-3xl font-black tracking-tight">
          FITIQ
        </h1>

        <div className="hidden items-center gap-8 text-lg font-medium md:flex">
          <a href="#programs" className="transition hover:text-gray-500">
            Programs
          </a>

          <a href="#pricing" className="transition hover:text-gray-500">
            Pricing
          </a>

          <a href="#faq" className="transition hover:text-gray-500">
            FAQ
          </a>
        </div>

        <button className="hidden rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800 md:block">
          Get Started
        </button>

      </div>
    </nav>
  );
}