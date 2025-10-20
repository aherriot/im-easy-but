import Link from "next/link";
import { PRICES } from "@/utils/constants";
import toggleRestriction from "../toggleRestriction";
import { GroupQueryRestrictions, PersonalRestriction, Screen } from "@/types";
import { CheckboxListItem } from "@/components/ui/checkbox-list-item";
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
    <div className="min-h-screen bg-neutral-50 p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="heading-lg text-neutral-900 mb-2">Price Range</h2>
          <p className="body text-neutral-600">
            Select price ranges you want to avoid
          </p>
        </div>

        {/* Checkbox list with no gaps */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {PRICES.map((price) => {
            const restriction = cuisineIds.get(price.id);
            return (
              <CheckboxListItem
                key={price.id}
                id={price.id}
                label={price.name}
                checked={!!restriction}
                onChange={(isChecked) => {
                  toggleRestriction({
                    groupId,
                    guestId,
                    restrictionType: "price",
                    restrictionId: restriction?.restrictionId ?? "",
                    referenceId: price.id,
                    isChecked,
                  });
                }}
              />
            );
          })}
        </div>

        <Link href={`/groups/${groupId}/results`}>
          <Button variant="primary" size="lg">
            See Results
          </Button>
        </Link>
      </div>
    </div>
  );
}
