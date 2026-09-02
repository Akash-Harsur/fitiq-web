"use client";

import Link from "next/link";
import { useState } from "react";
import {
    MessageCircle,
    CreditCard,
    Handshake,
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    ShieldCheck,
    HelpCircle,
    ArrowRight,
} from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-white text-[#101828]">
            {/* ================= NAVBAR ================= */}
            {/* ================= NAVBAR ================= */}
            <nav className="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-[100px] w-full max-w-[1440px] items-center justify-between px-8 lg:px-10">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex shrink-0 items-center"
                    >
                        <img
                            src="/image/logo.jpeg"
                            alt="FitIQ"
                            className="fitiq-logo block h-auto w-[185px] object-contain"
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

                    {/* Get Started */}
                    <Link
                        href="/auth"
                        className="hidden shrink-0 rounded-full bg-black px-[30px] py-[16px] text-[16px] font-medium leading-none text-white transition-colors duration-200 hover:bg-gray-800 md:block"
                    >
                        Get Started
                    </Link>

                </div>
            </nav>

            {/* ================= HERO ================= */}
            <section className="mx-auto max-w-[1440px] px-8 pb-24 pt-28 lg:px-20">
                <div className="grid items-stretch gap-16 lg:grid-cols-[1fr_0.9fr]">
                    {/* Left */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8 inline-flex w-fit rounded-full border border-gray-200 px-5 py-2">
                            <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#31577d]">
                                We&apos;d love to hear from you
                            </span>
                        </div>

                        <h1 className="max-w-[650px] text-[64px] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#101828] md:text-[76px]">
                            Let&apos;s Talk.
                            <br />
                            We&apos;re Here
                            <br />
                            to Help.
                        </h1>

                        <p className="mt-10 max-w-[650px] text-[18px] leading-8 text-[#31577d]">
                            Have a question about FitIQ, your workout plan, subscription, or
                            anything else? Send us a message and our team will get back to
                            you.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <a
                                href="#message"
                                className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-[16px] font-semibold text-white transition hover:bg-gray-800"
                            >
                                Send a Message
                                <ArrowRight size={18} />
                            </a>

                            <a
                                href="#faq"
                                className="inline-flex items-center rounded-full border border-gray-300 px-8 py-4 text-[16px] font-semibold text-[#101828] transition hover:bg-gray-50"
                            >
                                Visit FAQ
                            </a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative min-h-[620px] overflow-hidden bg-[#eeeeee]">
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
                            }}
                        >
                            <img
                                src="/image/contact-gym.jpg"
                                alt="FitIQ training"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CONTACT CARDS ================= */}
            <section className="border-t border-gray-200 bg-[#f8fafb]">
                <div className="mx-auto max-w-[1440px] px-8 py-20 lg:px-20">
                    <div className="grid gap-5 md:grid-cols-3">
                        {/* General Support */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf8f8]">
                                <MessageCircle size={23} />
                            </div>

                            <h2 className="text-2xl font-bold">General Support</h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                Questions about FitIQ, your account, workouts, or anything
                                else? We&apos;re here to help.
                            </p>

                            <a
                                href="mailto:support@fitiq.co.in"
                                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#101828] hover:underline"
                            >
                                <Mail size={18} />
                                support@fitiq.co.in
                            </a>
                        </div>

                        {/* Billing */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff5c7]">
                                <CreditCard size={23} />
                            </div>

                            <h2 className="text-2xl font-bold">Billing & Payments</h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                Need help with subscriptions, payments, invoices, or billing?
                                Contact our support team.
                            </p>

                            <a
                                href="mailto:support@fitiq.co.in"
                                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#101828] hover:underline"
                            >
                                <Mail size={18} />
                                support@fitiq.co.in
                            </a>
                        </div>

                        {/* Business */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-8">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf8f8]">
                                <Handshake size={23} />
                            </div>

                            <h2 className="text-2xl font-bold">Business Enquiries</h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                For partnerships, collaborations, brand enquiries, or
                                business opportunities.
                            </p>

                            <a
                                href="mailto:support@fitiq.co.in"
                                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#101828] hover:underline"
                            >
                                <Mail size={18} />
                                support@fitiq.co.in
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= MESSAGE SECTION ================= */}
            <section id="message" className="mx-auto max-w-[1440px] px-8 py-24 lg:px-20">
                <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
                    {/* Info */}
                    <div>
                        <div className="mb-6 inline-flex rounded-full border border-gray-200 px-5 py-2">
                            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#31577d]">
                                Get in touch
                            </span>
                        </div>

                        <h2 className="text-5xl font-extrabold tracking-[-0.04em]">
                            We&apos;re listening.
                        </h2>

                        <p className="mt-6 max-w-[500px] text-[17px] leading-8 text-gray-600">
                            Tell us what you need help with and we&apos;ll make sure your
                            message reaches the right person.
                        </p>

                        <div className="mt-10 space-y-7">
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                    <Phone size={19} />
                                </div>

                                <div>
                                    <p className="font-semibold">Call us</p>
                                    <a
                                        href="tel:+917678040883"
                                        className="mt-1 block text-gray-600 hover:underline"
                                    >
                                        +91 76780 40883
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                    <Mail size={19} />
                                </div>

                                <div>
                                    <p className="font-semibold">Email us</p>
                                    <a
                                        href="mailto:support@fitiq.co.in"
                                        className="mt-1 block text-gray-600 hover:underline"
                                    >
                                        support@fitiq.co.in
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                    <Clock size={19} />
                                </div>

                                <div>
                                    <p className="font-semibold">Response time</p>
                                    <p className="mt-1 text-gray-600">
                                        Usually within 24–48 hours
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm md:p-10">
                        {submitted ? (
                            <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f8f8]">
                                    <ShieldCheck size={32} />
                                </div>

                                <h3 className="mt-6 text-3xl font-bold">
                                    Message received.
                                </h3>

                                <p className="mt-3 max-w-[420px] leading-7 text-gray-600">
                                    Thanks for reaching out to FitIQ. Our team will get back to
                                    you as soon as possible.
                                </p>

                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 rounded-full border border-gray-300 px-7 py-3 font-semibold"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="mb-2 block text-sm font-semibold"
                                        >
                                            First name
                                        </label>

                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            placeholder="Your first name"
                                            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="mb-2 block text-sm font-semibold"
                                        >
                                            Last name
                                        </label>

                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Your last name"
                                            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-sm font-semibold"
                                    >
                                        Subject
                                    </label>

                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none transition focus:border-black"
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="general">General Support</option>
                                        <option value="workout">Workout Plan</option>
                                        <option value="nutrition">Nutrition</option>
                                        <option value="billing">Billing & Subscription</option>
                                        <option value="business">Business Enquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-semibold"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        placeholder="Tell us how we can help..."
                                        className="w-full resize-none rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-black"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-8 py-4 text-[16px] font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Send Message
                                    <Send size={18} />
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    We normally respond within 24–48 hours.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* ================= FAQ ================= */}
            <section id="faq" className="border-t border-gray-200 bg-[#f8fafb]">
                <div className="mx-auto max-w-[1000px] px-8 py-24">
                    <div className="text-center">
                        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                            <HelpCircle size={24} />
                        </div>

                        <h2 className="text-4xl font-extrabold tracking-[-0.03em]">
                            Before you reach out
                        </h2>

                        <p className="mx-auto mt-4 max-w-[600px] text-gray-600">
                            Here are a few quick answers to common questions.
                        </p>
                    </div>

                    <div className="mt-12 space-y-4">
                        <details className="rounded-2xl border border-gray-200 bg-white p-6">
                            <summary className="cursor-pointer list-none font-semibold">
                                How quickly will I get a response?
                            </summary>

                            <p className="mt-4 leading-7 text-gray-600">
                                Our team generally responds within 24–48 hours.
                            </p>
                        </details>

                        <details className="rounded-2xl border border-gray-200 bg-white p-6">
                            <summary className="cursor-pointer list-none font-semibold">
                                Can I ask about my workout plan?
                            </summary>

                            <p className="mt-4 leading-7 text-gray-600">
                                Yes. Select “Workout Plan” when submitting your message and
                                include as much detail as possible.
                            </p>
                        </details>

                        <details className="rounded-2xl border border-gray-200 bg-white p-6">
                            <summary className="cursor-pointer list-none font-semibold">
                                Where should I contact you about billing?
                            </summary>

                            <p className="mt-4 leading-7 text-gray-600">
                                You can use the same support email:
                                <span className="font-semibold">
                                    {" "}
                                    support@fitiq.co.in
                                </span>
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="border-t border-gray-200 bg-white">
                <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-8 py-10 text-sm text-gray-500 md:flex-row md:items-center md:justify-between lg:px-20">
                    <p>© {new Date().getFullYear()} FitIQ. All rights reserved.</p>

                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-black">
                            Privacy
                        </Link>

                        <Link href="/terms" className="hover:text-black">
                            Terms
                        </Link>

                        <Link href="/contact" className="hover:text-black">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}