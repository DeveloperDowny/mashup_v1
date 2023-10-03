"use client";

import React, { useEffect, useState } from "react";
import APIRequests from "../../api";

const Page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const response = await fetch("/api/data"); // Use the API route you created or your backend URL
        const result = await response.json();
        console.log("Result from client: ", result);
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="mx-[4rem] my-[8rem] px-[3rem] py-[4rem] border border-gray-300 rounded w-[60vw]">
        <h1 className="text-[4rem] font-semibold mb-4">Fun Facts</h1>
        {isLoading && <div>Loading...</div>}
        {!isLoading && data && (
          <ul className="list-disc list-inside">
            {data.map((item, index) => (
              <li key={index} className="mb-2">
                {item.fact}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
