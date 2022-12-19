"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AccountContext from "../../../../context/account";

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

export default function Page({ params }: any) {
  const router = useRouter();
  const accountContext = useContext(AccountContext);
  const [yacht, setYacht] = useState<Yacht>({
    ID: params.id,
    type: "",
    name: "",
    description: "",
    image: "",
    price: 0,
    created: new Date(),
    updated: new Date(),
  });

  useEffect(() => {
    fetch(`http://localhost:5000/admin/yacht/${params.id}`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          throw new Error("unauthorized");
        }

        return response.json();
      })
      .then((yacht) => setYacht(yacht))
      .catch((err) => {
        console.error(err);
        accountContext.setAccount(null);
        router.push("/account/unauthorized");
      });
  }, []);

  const update = () => {
    fetch(`http://localhost:5000/admin/yacht/update`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(yacht),
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          throw new Error("unauthorized");
        }

        return response.json();
      })
      .then((_) => router.push(`/admin`))
      .catch((err) => {
        console.error(err);
        accountContext.setAccount(null);
        router.push("/account/unauthorized");
      });
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
              Update your yacht
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
                    setYacht({
                      ...yacht,
                      name: event.target.value,
                    });
                  }}
                  value={yacht.name}
                  placeholder="your perfect name"
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
                    setYacht({
                      ...yacht,
                      type: event.target.value,
                    });
                  }}
                  value={yacht.type}
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
                    setYacht({
                      ...yacht,
                      price: Number(event.target.value),
                    });
                  }}
                  value={yacht.price}
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
                    setYacht({
                      ...yacht,
                      description: event.target.value,
                    });
                  }}
                  value={yacht.description}
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
                    setYacht({
                      ...yacht,
                      image: event.target.value,
                    });
                  }}
                  value={yacht.image}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <hr />
              <p
                onClick={() => update()}
                className="cursor-pointer flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Update yacht</span>

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
