import { NextResponse } from "next/server";

export const GET = async () => {
  const apiKey = "c7ML58q65WsyXksa7Uwk1g==NG42o4vtZ96HjRZn";

  const endpoints = [
    "https://api.api-ninjas.com/v1/nutrition?query=apple",
    "https://api.api-ninjas.com/v1/nutrition?query=mango",
    "https://api.api-ninjas.com/v1/nutrition?query=pineapple",
    "https://api.api-ninjas.com/v1/facts?limit=10",
  ];

  const promises = [];

  for (const endpoint of endpoints) {
    const headers = new Headers();
    headers.append("X-Api-Key", apiKey);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();
      promises.push(data);
    } else {
      console.error(
        `Error fetching data from ${endpoint}: ${response.statusText}`
      );
    }
  }
  const mRes = [];

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  for (let i = 0; i < 3; i++) {
    const formatted = promises[i].map((item, index) => {
      return {
        fact: `${capitalize(item.name)} has ${item.calories} calories`,
      };
    });
    mRes.push(...formatted);
  }
  mRes.push(...promises[3]);

  return NextResponse.json(mRes);
};
