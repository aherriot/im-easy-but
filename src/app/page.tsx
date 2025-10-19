"use client";

import Header from "@/components/ui/header";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const excuses = [
    "I don't like anything too spicy",
    "I'm not in the mood for pizza again",
    "I can't eat dairy right now",
    "I don't want anything with mushrooms",
    "I had Mexican food yesterday",
    "I don't want to spend too much",
    "I want something vegetarian",
    "I'm trying to eat healthier",
    "I don't want a heavy meal",
    "I need somewhere with parking",
    "I don't feel like driving far",
    "I want somewhere that's not too crowded",
  ];

  const [currentExcuseIndex, setCurrentExcuseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExcuseIndex((prev) => (prev + 1) % excuses.length);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [excuses.length]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold">I&apos;m easy, but...</h1>
          <p className="text-2xl text-gray-600 mt-2 min-h-[2.5rem] transition-opacity duration-300">
            {excuses[currentExcuseIndex]}
          </p>
        </div>
        <p className="text-lg">
          A collaborative restaurant choosing app for picky eaters.
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
