import Link from "next/link";
import { PRICES } from "@/utils/constants";
import toggleRestriction from "../toggleRestriction";
import { GroupQueryRestrictions, PersonalRestriction, Screen } from "@/types";

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
    if (restriction.restrictionType === "price") {
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
        <h2 className="text-2xl font-bold">Choose a Restriction</h2>
        {PRICES.map((price) => {
          const restriction = cuisineIds.get(price.id);
          return (
            <div key={price.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={price.id}
                name={price.name}
                value={price.id}
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
              <label htmlFor={price.id}>{price.name}</label>
            </div>
          );
        })}
        <Link href={`/groups/${groupId}/results`}>See results</Link>
      </main>
    </div>
  );
}
