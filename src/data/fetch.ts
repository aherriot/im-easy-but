import data from "./us";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getGeoId = async (city: string, region: string) => {
  const response = await fetch("https://www.tripadvisor.ca/data/graphql/ids", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-device-memory": "8",
      "sec-ch-ua": '"Chromium";v="135", "Not-A.Brand";v="8"',
      "sec-ch-ua-arch": '"arm"',
      "sec-ch-ua-full-version-list":
        '"Chromium";v="135.0.7049.42", "Not-A.Brand";v="8.0.0.0"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "same-origin",
      "sec-fetch-site": "same-origin",
      cookie:
        "TASameSite=1; TAUnique=%1%enc%3Abx8XH8mWZrBZMMc0JZt56CI8yp7TjXUDibH4KrGHntwzq%2FQEVy13Ks7bG7YNjUiKNox8JbUSTxk%3D; TASSK=enc%3AAF7d3qVNpeLZ7fUVACpf8kxiQI37gWtpaAu3Rts7XNm%2F4DvGW5wv2RkvTeDxw%2FZx%2FUJC%2BjbHq1%2FEi%2FjQLZ%2BWzVk6pUuZhgXNlLVzVIWjqBIJSccRTAxBKFWU%2BGvxMQYcVw%3D%3D; VRMCID=%1%V1*id.10568*llp.%2F*e.1739820550433; TATrkConsent=eyJvdXQiOiJBRFYsRlVOQ1RJT05BTCxTT0NJQUxfTUVESUEiLCJpbiI6IkFOQSJ9; ServerPool=T; TADCID=84X0Efv7AsfvymR_ABQCJ4S5rDsRRMescG99HippfoSbCuxPxAbrkM_ytKYzzl2Qo8Mnv1OV3mVwPzJYedi4ZrWhF3tJeyDGghs; PMC=V2*MS.39*MD.20250309*LD.20250331; TATravelInfo=V2*A.2*MG.-1*HP.2*FL.3*RS.1; TAReturnTo=%1%%2FRestaurants; roybatty=TNI1625!ANy3bKNpXrCmpIxhqHv9JBG%2B27RonmvmIb6J8YORbt7IZn1tkUTQ0etM61xBgQL6cLiSdmbuOkdTgSgpIKT47HVUoe9fZE1JV3SdxOBe2xbLQYGck5tPzAKKSsGtZ3trKvYXCVWqNXCxk7DcnJmvweUcl56lrLvOiKULHvR%2BnsSvLag8rexKVj6kc3DtutQNiQ%3D%3D%2C1; TAUD=LA-1743440500968-1*RDD-1-2025_03_31*LG-7405-2.1.F.*LD-7406-.....; TASID=FE361408AFF0996CD1D17B00C562FB76; TASession=V2ID.FE361408AFF0996CD1D17B00C562FB76*SQ.38*LS.Home*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*FA.1*DF.0*TRA.true*LD.155004*EAU._; PAC=AEgLpu4ghtaVKjdUTlWJaF2Qq9PKzfsRYU3rbOHQvqRANb-f9wivZCsWyQJyI1jFWmOnMs1IfC1R1XFH_hhcjF3LI6bC3HtqbIOIWw_FvW-vdms09x95ZtjAAi_L8WQYCA%3D%3D; SRT=TART_SYNC; TART=%1%enc%3Aalad2yINRd9i%2BvUjbEujT%2BQ0bli45j8dxC9ic51BRodN3bDqhYg%2BZTzrkqapd3xlkMrE3%2FXzZXs%3D; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Apr+05+2025+20%3A15%3A45+GMT-0400+(Eastern+Daylight+Time)&version=202405.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=4a8b1e2d-b8f3-43d6-a3d9-33765efa1a51&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A0&AwaitingReconsent=false; __gads=ID=9aa616d42622be02:T=1743898546:RT=1743900174:S=ALNI_Ma0GPe0faaESRU23vUiwnmae6QmPA; __gpi=UID=00001091fe290d39:T=1743898546:RT=1743900174:S=ALNI_MbmO11c4HH9-r_31ADSXhm5aMKEcQ; __eoi=ID=dffcf2b3aa2e6962:T=1743898546:RT=1743900174:S=AA-AfjbXxfCzCOhjKyHxk84mg-Hn; datadome=ow6oIfcSTYyR~FEy4t3yGCs6zMXtz3EA9S_Nsy4t3fHlrxGM5q70I63eTcQwK7JGsFaQ6rJiC1kAYPSOMAnWXsKaHklfbYaTuIv8evAYWM_VqKnRA41BWap7M9XjiqHj; __vt=CP9kNFA55mYAklgEABQCT24E-H_BQo6gx1APGQJPtzSWmCiHo3yf99Bh0AnUhkusJHxvHblf7Z0DACN5BcZNdcCDYT2gh4cQvYmeDDs27Z2IPmch09UapRV5i9IoOgX-9FAaxgrXz51lzTirvi_yL3uprgw",
      Referer: "https://www.tripadvisor.ca/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `[{"variables":{"request":{"query":"${city}, ${region}","limit":1,"scope":"WORLDWIDE","locale":"en-CA","scopeGeoId":1,"searchCenter":null,"types":["LOCATION","QUERY_SUGGESTION","RESCUE_RESULT"],"locationTypes":["GEO"],"userId":null,"context":{"searchSessionId":"001d797a1cdbae81.ssid","typeaheadId":"1743900175408","uiOrigin":"homepage_faceted_search_all","routeUid":"514c2962-cfe5-4264-b10a-37a6ffb2e2d0"},"enabledFeatures":["articles"],"includeRecent":true,"includeNestedResults":true}},"extensions":{"preRegisteredQueryId":"c2e5695e939386e4"}}]`,
    method: "POST",
  });

  const result = await response.json();

  return (
    result?.[0]?.data?.Typeahead_autocomplete?.results?.[0]?.locationId ?? null
  );
};

async function main() {
  for (let i = 0; i < data.length; i++) {
    const { city, region } = data[i];
    const geoId = await getGeoId(city, region);
    console.log(`{city: "${city}", region: "${region}", geoId: ${geoId}},`);
    sleep(10);
  }
}

main();
