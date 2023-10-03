import { NextResponse } from "next/server";

export const GET = async () => {
  // Set your API key here
  const apiKey = "c7ML58q65WsyXksa7Uwk1g==NG42o4vtZ96HjRZn";

  // Create an array of API endpoints
  const endpoints = [
    "https://api.api-ninjas.com/v1/nutrition?query=apple",
    "https://api.api-ninjas.com/v1/nutrition?query=mango",
    "https://api.api-ninjas.com/v1/nutrition?query=pineapple",
    "https://api.api-ninjas.com/v1/facts?limit=10",
  ];

  const promises = [];

  // Loop through each endpoint and make a fetch request with custom headers
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
      // const mRes = [];

      // const formatted = res[0].map((item, index) => {
      //   return {
      //     fact: `${item.name} has ${item.calories} calories`,
      //   };
      // });
      // mRes.push(...formatted);
      // mRes.push(...res[1]);
      // return NextResponse.json(mRes);
    } else {
      // Handle the error for this endpoint, you can choose to throw an error or handle it as per your requirements
      console.error(
        `Error fetching data from ${endpoint}: ${response.statusText}`
      );
    }
  }
  const mRes = [];
  // capitalize below string
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
  // console.log("mRes", mRes);
  // console.log("res", promises);

  // You can now use the data collected from all endpoints as needed
  // For example, you can return it as a JSON response
  return NextResponse.json(mRes);
};
