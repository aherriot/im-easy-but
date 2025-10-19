/**
 * Builds a TripAdvisor restaurant search URL.
 * @param geoId The geographical ID for the search.
 * @param excludedCuisineIdsArray An array of cuisine IDs to filter by.
 * @param dietIdsArray An array of dietary preference IDs to filter by.
 * @param priceIdsArray An array of price range IDs to filter by.
 * @returns The constructed URL as a string.
 */
import { CUISINES } from "./constants";

export default function buildUrl(
  geoId: string,
  excludedCuisineIdsArray: string[],
  dietIdsArray: string[],
  priceIdsArray: string[]
): string {
  const url = new URL(`https://www.tripadvisor.com/FindRestaurants`);
  url.searchParams.append("geo", geoId);
  url.searchParams.append("establishmentTypes", "10591");
  url.searchParams.append("broadened", "false");

  const cuisineIdsSet = new Set(excludedCuisineIdsArray);
  const remainingCuisines: string[] = [];
  CUISINES.forEach((cuisine) => {
    // if a cuisine is NOT in the excluded list, add it to the URL
    if (!cuisineIdsSet.has(cuisine.id)) {
      remainingCuisines.push(cuisine.id);
    }
  });
  url.searchParams.append("cuisines", remainingCuisines.join(","));

  if (dietIdsArray.length > 0) {
    url.searchParams.append("diets", dietIdsArray.join(","));
  }

  if (priceIdsArray.length > 0) {
    url.searchParams.append("priceTypes", priceIdsArray.join(","));
  }

  return url.toString();
}
