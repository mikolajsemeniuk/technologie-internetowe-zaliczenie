"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Request {
  name: string;
  type: string;
  price: number;
  description: string;
  image: string;
}

export default function Page() {
  const router = useRouter();
  const [request, setRequest] = useState<Request>({
    name: "Maxus",
    type: "yacht",
    price: 100,
    description: "your favorite yacht",
    image:
      "https://images.pexels.com/photos/843633/pexels-photo-843633.jpeg?auto=compress&cs=tinysrgb&w=1200",
  });

  const create = () => {
    fetch(`http://localhost:5000/admin/create`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((_) => router.push("/admin"))
      .catch((error) => console.log(error));
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{ backgroundImage: `url(${request.image})` }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Add your yacht
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Lets get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Name
                </label>
                <input
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setRequest({
                      ...request,
                      name: event.target.value,
                    });
                  }}
                  value={request.name}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Type
                </label>
                <input
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setRequest({
                      ...request,
                      type: event.target.value,
                    });
                  }}
                  value={request.type}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Price
                </label>
                <input
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setRequest({
                      ...request,
                      price: Number(event.target.value),
                    });
                  }}
                  value={request.price}
                  type="number"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Description
                </label>
                <input
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setRequest({
                      ...request,
                      description: event.target.value,
                    });
                  }}
                  value={request.description}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Image
                </label>
                <input
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setRequest({
                      ...request,
                      image: event.target.value,
                    });
                  }}
                  value={request.image}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <br />

              <p
                onClick={() => create()}
                className="cursor-pointer flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Create restaurant</span>

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
