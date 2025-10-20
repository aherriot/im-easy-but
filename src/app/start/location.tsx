import { useState } from "react";
import { redirect } from "next/navigation";
import { id } from "@instantdb/react";

import { Button } from "@/components/ui/button";
import db from "@/utils/db";
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

  return (
    <div className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
      <h1 className="text-gray-200 text-xl">
        {name}, where do you want to find a restaurant?
      </h1>
      <select
        className="input"
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
      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={() => setScreen("start")}>
          Back
        </Button>
        <Button onClick={() => createGroup(name, geoId)} disabled={!location}>
          Jump in
        </Button>
      </div>
    </div>
  );
}
