"use client";

import React, { useEffect, useState } from "react";
import APIRequests from "../../api";

const page = () => {
  //   const [data, setdata] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const fetchData = async () => {
  //     const res = await APIRequests.mtest().catch((err) => {
  //       console.log(err);
  //     });
  //     if (!res) {
  //       return;
  //     }
  //     console.log("res.data", res.data);

  //     setdata(res.data);
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

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
    <div className="">
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && (
        <div>
          {data.map((item, index) => (
            <div key={index}>{item.fact}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
