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
import Header from "@/components/ui/header";

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
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        Loading
      </div>
    );
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

  // useEffect(() => {
  //   publishPresence({ name: "andrew" });
  // }, [guestId, publishPresence]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {screen === "name" && (
          <Name
            setScreen={setScreen}
            name={name}
            setName={setName}
            groupName={group.name}
            geoName={`${geo.city}, ${geo.region}`}
          />
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
    </div>
  );
}
