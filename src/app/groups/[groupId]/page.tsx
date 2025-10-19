"use client";

import { use, useState } from "react";
import { Geo, Screen } from "@/types";
import GEOS from "@/data/canada";
import useLocalStorageState from "@/hooks/useLocalStorageState";

import Name from "./Name";
import Cuisine from "./Cuisine";
import Diet from "./Diet";
import Price from "./Price";
import db from "@/utils/db";

export default function Groups({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = use(params);
  const guestId = db.useLocalId("guest");

  const [name, setName] = useLocalStorageState<string>("name", "");
  const [screen, setScreen] = useState<Screen>("name");

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

  const groups = data.groups;
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

  // const {
  //   user,
  //   peers,
  //   publishPresence,
  //   isLoading: isUserLoading,
  // } = db.rooms.usePresence(room, {
  //   initialData: { name: guestId ?? "" },
  // });

  // console.log("peers", peers);

  // useEffect(() => {
  //   publishPresence({ name: "andrew" });
  // }, [guestId, publishPresence]);

  return (
    <div className="min-h-screen max-w-2xl m-auto p-8 gap-16font-[family-name:var(--font-geist-sans)]">
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
      {screen === "name" && (
        <Name setScreen={setScreen} name={name} setName={setName} />
      )}
      {screen === "cuisine" && (
        <Cuisine
          setScreen={setScreen}
          guestId={guestId}
          groupId={groupId}
          restrictions={group.restrictions}
        />
      )}

      {screen === "diet" && (
        <Diet
          setScreen={setScreen}
          guestId={guestId}
          groupId={groupId}
          restrictions={group.restrictions}
        />
      )}

      {screen === "price" && (
        <Price
          setScreen={setScreen}
          guestId={guestId}
          groupId={groupId}
          restrictions={group.restrictions}
        />
      )}
    </div>
  );
}
