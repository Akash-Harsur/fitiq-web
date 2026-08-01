"use client";

export default function TestPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => alert("WORKING")}
        className="rounded bg-black px-6 py-4 text-white"
      >
        Test Button
      </button>
    </main>
  );
}