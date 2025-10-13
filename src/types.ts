export type Geo = {
  id: string;
  city: string;
  region: string;
};

export type RestrictionType = "cuisine" | "dietary" | "price";

export type Restriction = {
  cuisineId: string;
  restrictionId: string;
  guestId: string;
};
