"use client";

import { id } from "@instantdb/react";
import { use } from "react";

import { CUISINES, PRICES, RESTRICTIONS } from "@/utils/constants";
import db from "@/utils/db";

async function toggleCuisine(groupId: string, name: string) {
  console.log("toggleCuisine", groupId, name);
  const result = await db.transact(
    db.tx.members[id()]
      .update({
        name,
        createdAt: JSON.stringify(new Date()),
      })
      .link({ group: groupId })
  );

  console.log(result);
}

export default function Group({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { isLoading, error, data } = db.useQuery({
    groups: {
      $: {
        where: {
          id,
        },
        limit: 1,
      },
    },
  });

  if (isLoading) return <div>Fetching data...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const { groups } = data;
  if (!groups || groups.length !== 1) {
    return <div>Group not found</div>;
  }
  const group = groups[0];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">
          Choose a Restaurant with {group.name}
        </h1>

        <h2 className="text-2xl font-bold">Choose a Cuisine</h2>
        {CUISINES.map((cuisine) => (
          <div key={cuisine.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={cuisine.name}
              name={cuisine.name}
              value={cuisine.name}
              onChange={(e) => {
                toggleCuisine(group.id, e.target.value);
              }}
            />
            <label htmlFor={cuisine.name}>{cuisine.name}</label>
          </div>
        ))}

        <h2 className="text-2xl font-bold">Choose a Restriction</h2>
        {RESTRICTIONS.map((restriction) => (
          <div key={restriction.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={restriction.name}
              name={restriction.name}
              value={restriction.name}
            />
            <label htmlFor={restriction.name}>{restriction.name}</label>
          </div>
        ))}
        <h2 className="text-2xl font-bold">Choose a Price</h2>
        {PRICES.map((price) => (
          <div key={price.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={price.name}
              name={price.name}
              value={price.name}
            />
            <label htmlFor={price.name}>{price.name}</label>
          </div>
        ))}
      </main>
    </div>
  );
}
