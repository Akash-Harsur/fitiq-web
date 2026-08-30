"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-200 bg-white">
      {/* ================= DESKTOP NAVBAR ================= */}
      <div className="mx-auto flex h-[100px] w-full max-w-[1440px] items-center justify-between px-8 lg:px-10">
        
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
        >
          <Image
            src="/image/logo.jpeg"
            alt="FitIQ"
            width={185}
            height={56}
            priority
            className="block h-auto w-[185px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-[38px] md:flex">
          <Link
            href="/#programs"
            className="whitespace-nowrap text-[18px] font-normal leading-none text-[#111827] transition-opacity duration-200 hover:opacity-60"
          >
            Programs
          </Link>

          <Link
            href="/#pricing"
            className="whitespace-nowrap text-[18px] font-normal leading-none text-[#111827] transition-opacity duration-200 hover:opacity-60"
          >
            Pricing
          </Link>

          <Link
            href="/merchandise"
            className="whitespace-nowrap text-[18px] font-normal leading-none text-[#111827] transition-opacity duration-200 hover:opacity-60"
          >
            Merchandise
          </Link>

          <Link
            href="/supplements"
            className="whitespace-nowrap text-[18px] font-normal leading-none text-[#111827] transition-opacity duration-200 hover:opacity-60"
          >
            Supplements
          </Link>

          <Link
            href="/#faq"
            className="whitespace-nowrap text-[18px] font-normal leading-none text-[#111827] transition-opacity duration-200 hover:opacity-60"
          >
            FAQ
          </Link>

          <Link
            href="/contact"
            className="whitespace-nowrap text-[18px] font-normal leading-none text-[#111827] transition-opacity duration-200 hover:opacity-60"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Get Started */}
        <Link
          href="/auth"
          className="hidden shrink-0 rounded-full bg-black px-[30px] py-[16px] text-[16px] font-medium leading-none text-white transition-colors duration-200 hover:bg-gray-800 md:block"
        >
          Get Started
        </Link>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 md:hidden"
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-black transition-all duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-5 bg-black transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-5 bg-black transition-all duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* ================= MOBILE NAVIGATION ================= */}
      <div
        className={`border-t border-gray-200 bg-white md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-full px-6 py-5">
          <div className="flex flex-col">
            
            <Link
              href="/#programs"
              onClick={closeMenu}
              className="border-b border-gray-100 py-4 text-[17px] font-normal text-[#111827] transition hover:text-gray-500"
            >
              Programs
            </Link>

            <Link
              href="/#pricing"
              onClick={closeMenu}
              className="border-b border-gray-100 py-4 text-[17px] font-normal text-[#111827] transition hover:text-gray-500"
            >
              Pricing
            </Link>

            <Link
              href="/merchandise"
              onClick={closeMenu}
              className="border-b border-gray-100 py-4 text-[17px] font-normal text-[#111827] transition hover:text-gray-500"
            >
              Merchandise
            </Link>

            <Link
              href="/supplements"
              onClick={closeMenu}
              className="border-b border-gray-100 py-4 text-[17px] font-normal text-[#111827] transition hover:text-gray-500"
            >
              Supplements
            </Link>

            <Link
              href="/#faq"
              onClick={closeMenu}
              className="border-b border-gray-100 py-4 text-[17px] font-normal text-[#111827] transition hover:text-gray-500"
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="border-b border-gray-100 py-4 text-[17px] font-normal text-[#111827] transition hover:text-gray-500"
            >
              Contact
            </Link>

            {/* Mobile Get Started */}
            <Link
              href="/auth"
              onClick={closeMenu}
              className="mt-5 flex w-full items-center justify-center rounded-full bg-black py-3.5 text-[17px] font-medium text-white transition hover:bg-gray-800"
            >
              Get Started
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}