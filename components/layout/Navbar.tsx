import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/image/logo.jpeg"
            alt="FitIQ Logo"
            width={150}
            height={45}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10 text-lg font-medium md:flex">
          <a
            href="#programs"
            className="transition duration-200 hover:text-gray-500"
          >
            Programs
          </a>

          <a
            href="#pricing"
            className="transition duration-200 hover:text-gray-500"
          >
            Pricing
          </a>

          <a
            href="#faq"
            className="transition duration-200 hover:text-gray-500"
          >
            FAQ
          </a>
        </div>

        {/* CTA Button */}
        <Link
          href="/auth"
          className="hidden rounded-full bg-black px-7 py-3 text-white transition duration-200 hover:bg-gray-800 md:block"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
}