import buildUrl from "../buildUrl";

describe("buildUrl", () => {
  it("should build a basic URL with just geoId", () => {
    const url = buildUrl("12345", [], [], []);
    expect(url).toBe(
      "https://www.tripadvisor.com/FindRestaurants?geo=12345&establishmentTypes=10591&broadened=false"
    );
  });

  it("should include cuisine IDs in the URL", () => {
    const url = buildUrl("12345", ["10640", "10659"], [], []);
    expect(url).toBe(
      "https://www.tripadvisor.com/FindRestaurants?geo=12345&establishmentTypes=10591&broadened=false&cuisines=10640%2C10659"
    );
  });

  it("should include diet IDs in the URL", () => {
    const url = buildUrl("12345", [], ["10665", "10697"], []);
    expect(url).toBe(
      "https://www.tripadvisor.com/FindRestaurants?geo=12345&establishmentTypes=10591&broadened=false&diets=10665%2C10697"
    );
  });

  it("should include price IDs in the URL", () => {
    const url = buildUrl("12345", [], [], ["10953", "10955"]);
    expect(url).toBe(
      "https://www.tripadvisor.com/FindRestaurants?geo=12345&establishmentTypes=10591&broadened=false&priceTypes=10953%2C10955"
    );
  });

  it("should include all parameters when provided", () => {
    const url = buildUrl("12345", ["10640"], ["10665"], ["10953"]);
    expect(url).toBe(
      "https://www.tripadvisor.com/FindRestaurants?geo=12345&establishmentTypes=10591&broadened=false&cuisines=10640&diets=10665&priceTypes=10953"
    );
  });

  it("should properly encode commas in parameter values", () => {
    const url = buildUrl("12345", ["10640,extra", "10659"], [], []);
    expect(url).toBe(
      "https://www.tripadvisor.com/FindRestaurants?geo=12345&establishmentTypes=10591&broadened=false&cuisines=10640%2Cextra%2C10659"
    );
  });

  it("should handle empty arrays for all filter parameters", () => {
    const url = buildUrl("12345", [], [], []);
    expect(url).toBe(
      "https://www.tripadvisor.com/FindRestaurants?geo=12345&establishmentTypes=10591&broadened=false"
    );
  });
});
