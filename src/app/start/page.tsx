"use client";

import { useState } from "react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
import Name from "./name";
import Location from "./location";

type Screen = "start" | "location";

export default function Start() {
  const [screen, setScreen] = useState<Screen>("start");
  const [name, setName] = useState<string>("");

  return (
    <div className="min-h-screen max-w-2xl m-auto p-8 gap-16font-[family-name:var(--font-geist-sans)]">
      {screen === "start" && (
        <Name setScreen={setScreen} name={name} setName={setName} />
      )}
      {screen === "location" && <Location setScreen={setScreen} name={name} />}
    </div>
  );
}
