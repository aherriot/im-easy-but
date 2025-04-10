import { useState } from "react";

import locations from "@/data/canada";
import { Button } from "@/components/ui/button";
import db from "@/utils/db";
import { id } from "@instantdb/react";
import { redirect } from "next/navigation";

type LocationProps = {
  name: string;
  setScreen: (screen: "start" | "location") => void;
};

async function createGroup(name: string) {
  const newGroupId = id();
  await db.transact(
    db.tx.groups[newGroupId].update({
      name,
      createdAt: JSON.stringify(new Date()),
    })
  );

  redirect(`/groups/${newGroupId}`);
}

export default function Location({ setScreen, name }: LocationProps) {
  const [location, setLocation] = useState<string>("");

  return (
    <div className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold">{location}</h1>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        autoFocus
      >
        <option value="" disabled>
          Select your location
        </option>
        {locations.map((location) => (
          <option key={location.geoId} value={location.city}>
            {location.city}, {location.region}
          </option>
        ))}
      </select>
      <Button onClick={() => setScreen("start")}>back</Button>
      <Button onClick={() => createGroup(name)} disabled={!location}>
        Jump in
      </Button>
    </div>
  );
}

/*
      <Command value={location} onValueChange={setLocation}>
        <CommandInput placeholder="Search for a city..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {locations.map((location) => (
              <CommandItem key={location.geoId} value={location.city}>
                {location.city}, {location.region}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      */
