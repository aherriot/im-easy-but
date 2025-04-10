"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Picky Picky</h1>
        <p className="text-lg">
          A collaborative food ordering app for picky eaters.
        </p>
        <Link
          href="/start"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Jump in
        </Link>
      </main>
    </div>
  );
}
