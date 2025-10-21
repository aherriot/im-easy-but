import Link from "next/link";
import { DIETS } from "@/utils/constants";
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
  setScreen,
}: CuisineProps) {
  const cuisineIds = new Map<string, PersonalRestriction>();

  restrictions.map((restriction) => {
    if (restriction.restrictionType === "diet") {
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
    <div className="p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="heading-lg text-neutral-900 mb-2">Choose a Diet</h2>
          <p className="body text-neutral-600">
            Select any dietary preferences or restrictions
          </p>
        </div>

        {/* Checkbox list with no gaps */}
        <div className="bg-black shadow-md mb-8">
          {DIETS.map((diet) => {
            const restriction = cuisineIds.get(diet.id);
            return (
              <CheckboxListItem
                positive
                key={diet.id}
                id={diet.id}
                label={diet.name}
                checked={!!restriction}
                onChange={(isChecked) => {
                  toggleRestriction({
                    groupId,
                    guestId,
                    restrictionType: "diet",
                    restrictionId: restriction?.restrictionId ?? "",
                    referenceId: diet.id,
                    isChecked,
                  });
                }}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setScreen("cuisine")}
            size="lg"
          >
            Back
          </Button>
          <Link href={`/groups/${groupId}/results`}>
            <Button variant="primary" size="lg">
              See Results
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
