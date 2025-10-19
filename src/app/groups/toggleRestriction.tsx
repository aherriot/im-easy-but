import { id } from "@instantdb/react";
import db from "@/utils/db";
import { RestrictionType } from "@/types";

type toggleRestrictionType = {
  groupId: string;
  guestId: string;
  restrictionType: RestrictionType;
  restrictionId: string;
  referenceId: string;
  isChecked: boolean;
};

export default async function toggleRestriction({
  groupId,
  guestId,
  restrictionType,
  restrictionId,
  referenceId,
  isChecked,
}: toggleRestrictionType) {
  if (isChecked) {
    await db.transact(
      db.tx.restrictions[id()]
        .update({
          guestId,
          restrictionType,
          referenceId,
        })
        .link({ group: groupId })
    );
  } else {
    await db.transact(db.tx.restrictions[restrictionId].delete());
  }
}
