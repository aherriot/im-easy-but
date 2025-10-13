/**
 * Builds a TripAdvisor restaurant search URL.
 * @param geoId The geographical ID for the search.
 * @param cuisineIdsArray An array of cuisine IDs to filter by.
 * @param dietaryIdsArray An array of dietary preference IDs to filter by.
 * @param priceIdsArray An array of price range IDs to filter by.
 * @returns The constructed URL as a string.
 */

export default function buildUrl(
  geoId: string,
  cuisineIdsArray: string[],
  dietaryIdsArray: string[],
  priceIdsArray: string[]
): string {
  const url = new URL(`https://www.tripadvisor.com/FindRestaurants`);
  url.searchParams.append("geo", geoId);
  url.searchParams.append("establishmentTypes", "10591");
  url.searchParams.append("broadened", "false");

  if (cuisineIdsArray.length > 0) {
    url.searchParams.append("cuisines", cuisineIdsArray.join(","));
  }

  if (dietaryIdsArray.length > 0) {
    url.searchParams.append("diets", dietaryIdsArray.join(","));
  }

  if (priceIdsArray.length > 0) {
    url.searchParams.append("priceTypes", priceIdsArray.join(","));
  }
  // else {
  // const priceIds = priceIdsArray.length > 0 ? priceIdsArray : ["10953"];

  // }

  return url.toString();
}
