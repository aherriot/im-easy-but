"use client";

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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 mt-[-4rem]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="heading-xl text-gradient-warm mb-8">
          I&apos;m easy, but...
        </h1>

        {/* Rotating excuses */}
        <div className="mb-8">
          <p className="body-lg text-neutral-600 min-h-[2rem] transition-all duration-500 italic">
            &ldquo;{excuses[currentExcuseIndex]}&rdquo;
          </p>
        </div>

        {/* Description */}
        <p className="body-lg text-neutral-700 mb-10 max-w-xl mx-auto">
          A collaborative restaurant choosing app for picky eaters.
        </p>

        {/* CTA Button */}
        <Link href="/start" className="btn-primary inline-block">
          Jump in →
        </Link>
      </div>
    </div>
  );
}
