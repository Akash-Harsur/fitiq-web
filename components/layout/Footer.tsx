import Image from "next/image";
import Link from "next/link";

import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-8 py-12">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Logo */}

          <div>

            <Image
              src="/image/logo.jpeg"
              alt="FitIQ Logo"
              width={180}
              height={50}
              className="fitiq-logo h-auto w-auto"
            />

            <p className="mt-5 max-w-xs text-gray-600 leading-7">
              <span className="font-semibold text-black">
                Smarter Workouts. Better Results.
              </span>

              <br />
              Train smarter with structured workouts,
              nutrition guidance and progress tracking.
            </p>

            <div className="mt-8 flex gap-5 text-2xl">

              <a
                href="#"
                className="transition duration-300 hover:-translate-y-1 hover:text-black"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="transition duration-300 hover:-translate-y-1 hover:text-black"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className="transition duration-300 hover:-translate-y-1 hover:text-black"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="transition duration-300 hover:-translate-y-1 hover:text-black"
              >
                <FaXTwitter />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="#programs"
                  className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Programs
                </Link>
              </li>

              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  FAQ
                </Link>
              </li>

            </ul>

          </div>

          {/* Programs */}

          <div>

            <h3 className="text-xl font-bold">
              Programs
            </h3>

            <ul className="mt-6 space-y-4">

              <li className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black">
                Muscle Gain
              </li>

              <li className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black">
                Fat Loss
              </li>

              <li className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black">
                Strength
              </li>

              <li className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black">
                Mobility
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold">
              Company
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  href="/about"
                  className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Terms of Service
                </Link>
              </li>

            </ul>

          </div>

        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">

          <p className="text-center text-sm text-gray-500">
            © 2026 FitIQ. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}