export type Geo = {
  id: string;
  city: string;
  region: string;
};

export type RestrictionType = "cuisine" | "diet" | "price";

export type Screen = "name" | "cuisine" | "diet" | "price";

export type Restriction = {
  cuisineId: string;
  restrictionId: string;
  guestId: string;
};

export type GroupQueryRestrictions = {
  id: string;
  guestId: string;
  restrictionType: "cuisine" | "diet" | "price";
  referenceId: string;
}[];

export type PersonalRestriction = {
  cuisineId: string;
  restrictionId: string;
};
