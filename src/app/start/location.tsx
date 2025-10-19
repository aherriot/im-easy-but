import { useState } from "react";
import { redirect } from "next/navigation";
import { id } from "@instantdb/react";

import { Button } from "@/components/ui/button";
import db from "@/utils/db";
import type { Geo } from "@/types";
import GEOS from "@/data/canada";

type LocationProps = {
  name: string;
  setScreen: (screen: "start" | "location") => void;
};

async function createGroup(name: string, geoId: string) {
  const localId = await db.getLocalId("guest");
  if (!localId) {
    throw new Error("No local ID found");
  }
  const newGroupId = id();
  await db.transact(
    db.tx.groups[newGroupId].update({
      name,
      createdAt: JSON.stringify(new Date()),
      ownerId: localId,
      geoId,
    })
  );

  redirect(`/groups/${newGroupId}`);
}

export default function Location({ setScreen, name }: LocationProps) {
  const [geoId, setGeoId] = useState<string>("");

  const selectedGeo: Geo | undefined = GEOS.find(
    (location) => location.id === geoId
  );

  return (
    <div className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
      <h1>{name}, where do you want to find a restaurant?</h1>
      <select
        value={geoId}
        onChange={(e) => setGeoId(e.target.value)}
        autoFocus
      >
        <option value="" disabled>
          Select your location
        </option>
        {GEOS.sort((a, b) => a.city.localeCompare(b.city)).map((location) => (
          <option key={location.id} value={location.id}>
            {location.city}, {location.region}
          </option>
        ))}
      </select>
      <Button onClick={() => setScreen("start")}>back</Button>
      <Button onClick={() => createGroup(name, geoId)} disabled={!location}>
        Jump in
      </Button>
    </div>
  );
}
