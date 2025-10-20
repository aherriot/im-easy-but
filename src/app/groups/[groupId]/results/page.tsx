"use client";

import { use } from "react";

import Link from "next/link";

import db from "@/utils/db";
import GEOS from "@/data/canada";
import { Geo, Restriction } from "@/types";
import buildUrl from "@/utils/buildUrl";
import Header from "@/components/ui/header";

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
  const dietIds = new Set<string>();
  const priceIds = new Set<string>();

  group.restrictions.map((restriction) => {
    if (restriction.restrictionType === "cuisine") {
      cuisineIds.set(restriction.referenceId, {
        cuisineId: restriction.referenceId,
        restrictionId: restriction.id,
        guestId: restriction.guestId,
      });
    } else if (restriction.restrictionType === "diet") {
      dietIds.add(restriction.referenceId);
    } else if (restriction.restrictionType === "price") {
      priceIds.add(restriction.referenceId);
    }
  });

  // Convert the Set to an array
  const dietIdsArray = Array.from(dietIds);
  const priceIdsArray = Array.from(priceIds);
  const cuisineIdsArray = Array.from(cuisineIds.keys());

  const restaurantListUrl = buildUrl(
    geo.id,
    cuisineIdsArray,
    dietIdsArray,
    priceIdsArray
  );

  return (
    <div className="items-center text-white justify-items-center min-h-screen gap-16  bg-neutral-50">
      <Header showInvite />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Results</h1>

        <a
          className="btn-primary"
          href={restaurantListUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Restaurant List
        </a>
        <Link href={`/groups/${groupId}`}>← Back to restrictions</Link>
      </main>
    </div>
  );
}
