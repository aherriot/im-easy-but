"use client";

import Link from "next/link";
import { id } from "@instantdb/react";
import db from "@/utils/db";
import { useState } from "react";
import { redirect } from "next/navigation";

async function createGroup(name: string) {
  const result = await db.transact(
    db.tx.groups[id()].update({
      name,
      createdAt: JSON.stringify(new Date()),
    })
  );

  redirect(`/group/${result.clientId}`);
}

export default function Home() {
  const [name, setName] = useState<string>("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Picky Picky</h1>
        <Link
          href="/group/123"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Join a group
        </Link>
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded px-4 py-2"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => createGroup(name)}
        >
          Help Choose Restaurant
        </button>
      </main>
    </div>
  );
}
