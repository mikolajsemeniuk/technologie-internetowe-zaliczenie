"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Yacht {
  ID: number;
  type: string;
  name: string;
  description: string;
  image: string;
  price: number;
  created: Date;
  updated: Date;
}

export default function Page() {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  useEffect(() => {
    fetch(`http://localhost:5000/yachts`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          throw new Error("unauthorized");
        }

        return response.json();
      })
      .then((response) => setYachts(response))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="pt-12 bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
          Yachts
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          {yachts.map((yacht) => (
            <div key={yacht.ID} className="lg:flex">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src={yacht.image}
                alt=""
              />
              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white ">
                  {yacht.name}
                </h1>
                <p className="text-lg text-gray-600 py-4">
                  {yacht.description} + lorem ipsum dolor sit amet lorem ipsum
                  dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor
                </p>

                <Link
                  className="my-2 max-w-[150px] py-1 shadow-lg bg-blue-600 hover:shadow-xl hover:bg-blue-700 text-white rounded-lg text-center"
                  href={`/yachts/${yacht.ID}`}
                >
                  Reserve
                </Link>

                <span className="text-sm text-gray-500 dark:text-gray-300">
                  On: {yacht.created.toLocaleString().substring(0, 10)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
