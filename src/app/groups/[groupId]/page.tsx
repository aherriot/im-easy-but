"use client";

import { id } from "@instantdb/react";
import { use, useEffect } from "react";

import { CUISINES, PRICES, DIETARY } from "@/utils/constants";
import db from "@/utils/db";
import GEOS from "@/data/canada";
import { Geo, Restriction, RestrictionType } from "@/types";
import buildUrl from "@/utils/buildUrl";
import Link from "next/link";

type toggleRestrictionType = {
  groupId: string;
  guestId: string;
  restrictionType: RestrictionType;
  restrictionId: string;
  referenceId: string;
  isChecked: boolean;
};

async function toggleRestriction({
  groupId,
  guestId,
  restrictionType,
  restrictionId,
  referenceId,
  isChecked,
}: toggleRestrictionType) {
  if (isChecked) {
    await db.transact(
      db.tx.restrictions[id()]
        .update({
          guestId,
          restrictionType,
          referenceId,
        })
        .link({ group: groupId })
    );
  } else {
    await db.transact(db.tx.restrictions[restrictionId].delete());
  }
}

export default function Group({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = use(params);
  const guestId = db.useLocalId("guest");

  const { isLoading, error, data } = db.useQuery({
    groups: {
      $: {
        where: {
          id: groupId,
        },
        limit: 1,
      },
      restrictions: {},
    },
  });

  if (!guestId) {
    return <div>No guestId found</div>;
  }

  if (isLoading) return <div>Fetching data...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const { groups } = data;
  if (!groups || groups.length !== 1) {
    return <div>Group not found</div>;
  }
  const group = groups[0];

  const geo: Geo | undefined = GEOS.find(
    (location) => location.id === group.geoId
  );

  if (!geo) {
    return <div>Location not found</div>;
  }

  const cuisineIds = new Map<string, Restriction>();
  const dietaryIds = new Set<string>();
  const priceIds = new Set<string>();

  group.restrictions.map((restriction) => {
    if (restriction.restrictionType === "cuisine") {
      cuisineIds.set(restriction.referenceId, {
        cuisineId: restriction.referenceId,
        restrictionId: restriction.id,
        guestId: restriction.guestId,
      });
    } else if (restriction.restrictionType === "dietary") {
      dietaryIds.add(restriction.referenceId);
    } else if (restriction.restrictionType === "price") {
      priceIds.add(restriction.referenceId);
    }
  });

  // Convert the Set to an array
  const dietaryIdsArray = Array.from(dietaryIds);
  const priceIdsArray = Array.from(priceIds);
  const cuisineIdsArray = Array.from(cuisineIds.keys());

  const link = buildUrl(
    geo.id,
    cuisineIdsArray,
    dietaryIdsArray,
    priceIdsArray
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-gray-500">
          Choose a restaurant with{" "}
          <span className="text-black">{group.name}</span> in{" "}
          <span className="text-black">
            {geo.city}, {geo.region}
          </span>
        </h1>
        <div>
          <b>guestId</b> {guestId}
        </div>

        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>

        <h2 className="text-2xl font-bold">Choose a Cuisine</h2>
        {CUISINES.map((cuisine) => {
          const restriction = cuisineIds.get(cuisine.id);
          return (
            <div key={cuisine.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={cuisine.id}
                name={cuisine.name}
                value={cuisine.id}
                checked={restriction && restriction.guestId === guestId}
                data-id={"test"}
                onChange={(e) => {
                  toggleRestriction({
                    groupId: group.id,
                    guestId,
                    restrictionType: "cuisine",
                    restrictionId:
                      cuisineIds.get(cuisine.id)?.restrictionId || "",
                    referenceId: e.target.value,
                    isChecked: e.target.checked,
                  });
                }}
              />
              <label htmlFor={cuisine.id}>{cuisine.name}</label>
            </div>
          );
        })}

        <h2 className="text-2xl font-bold">Choose a Restriction</h2>
        {DIETARY.map((dietary) => (
          <div key={dietary.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={dietary.id}
              name={dietary.name}
              value={dietary.id}
            />
            <label htmlFor={dietary.id}>{dietary.name}</label>
          </div>
        ))}
        <h2 className="text-2xl font-bold">Choose a Price</h2>
        {PRICES.map((price) => (
          <div key={price.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={price.id}
              name={price.name}
              value={price.id}
            />
            <label htmlFor={price.id}>{price.name}</label>
          </div>
        ))}
        <Link href={`/groups/${groupId}/results`}>See results</Link>
      </main>
    </div>
  );
}
