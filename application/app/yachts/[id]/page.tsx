"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MessageContext from "../../../context/message";

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

interface Request {
  from: Date;
  to: Date;
  remarks: string;
  yachtID: number;
}

export default function Page({ params }: any) {
  const messageContext = useContext(MessageContext);
  const router = useRouter();
  const [yacht, setYacht] = useState<Yacht>({
    ID: 0,
    type: "",
    name: "",
    description: "",
    image: "",
    price: 0,
    created: new Date(),
    updated: new Date(),
  });

  const [request, setRequest] = useState<Request>({
    from: new Date(),
    to: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    remarks: "your remarks",
    yachtID: Number(params.id),
  });

  useEffect(() => {
    fetch(`http://localhost:5000/yachts/${params.id}`)
      .then((response) => response.json())
      .then((yacht) => setYacht(yacht))
      .catch((err) => console.error(err));
  }, []);

  const create = () => {
    fetch(`http://localhost:5000/reservations`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(request),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return res.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((_) => router.push("/yachts"))
      .catch((err) => messageContext.setMessage(err.message));
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage: `url('${yacht.image}')`,
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              {yacht.name}
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {yacht.description}
            </p>

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Type of boat
                </label>
                <input
                  readOnly={true}
                  value={yacht.type}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Price per day
                </label>
                <input
                  readOnly={true}
                  value={yacht.price}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  From
                </label>
                <input
                  value={request.from.toLocaleDateString("en-CA")}
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setRequest({
                      ...request,
                      from: new Date(event.target.value),
                    });
                  }}
                  type="date"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  To
                </label>
                <input
                  value={request.to.toLocaleDateString("en-CA")}
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setRequest({
                      ...request,
                      to: new Date(event.target.value),
                    });
                  }}
                  type="date"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Remarks
                </label>
                <input
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setRequest({
                      ...request,
                      remarks: event.target.value,
                    });
                  }}
                  value={request.remarks}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <br />

              <p
                onClick={() => create()}
                className="cursor-pointer flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>
                  Pay{" "}
                  {yacht.price *
                    Math.round(Math.abs(+request.from - +request.to) / 8.64e7)}
                  $ for{" "}
                  {Math.round(Math.abs(+request.from - +request.to) / 8.64e7)}{" "}
                  days
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
              <p
                onClick={() => router.back()}
                className="cursor-pointer flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Go back</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
