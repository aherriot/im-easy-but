"use client";

import { CUISINES } from "@/utils/constants";
import { GroupQueryRestrictions, PersonalRestriction, Screen } from "@/types";
import toggleRestriction from "../toggleRestriction";
import { Button } from "@/components/ui/button";

type CuisineProps = {
  guestId: string;
  groupId: string;
  restrictions: GroupQueryRestrictions;
  setScreen: (screen: Screen) => void;
};

export default function Cuisine({
  guestId,
  groupId,
  restrictions,
  setScreen,
}: CuisineProps) {
  const cuisineIds = new Map<string, PersonalRestriction>();

  restrictions.map((restriction) => {
    if (restriction.restrictionType === "cuisine") {
      if (
        !cuisineIds.has(restriction.referenceId) &&
        restriction.guestId === guestId
      ) {
        cuisineIds.set(restriction.referenceId, {
          cuisineId: restriction.referenceId,
          restrictionId: restriction.id,
        });
      }
    }
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2 className="text-2xl font-bold">What food will you NOT eat?</h2>
        {CUISINES.map((cuisine) => {
          const restriction = cuisineIds.get(cuisine.id);
          return (
            <div key={cuisine.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={cuisine.id}
                name={cuisine.name}
                value={cuisine.id}
                checked={!!restriction}
                onChange={(e) => {
                  toggleRestriction({
                    groupId,
                    guestId,
                    restrictionType: "cuisine",
                    restrictionId: restriction?.restrictionId ?? "",
                    referenceId: e.target.value,
                    isChecked: e.target.checked,
                  });
                }}
              />
              <label htmlFor={cuisine.id}>{cuisine.name}</label>
            </div>
          );
        })}

        <Button onClick={() => setScreen("diet")}>Next</Button>
      </main>
    </div>
  );
}
