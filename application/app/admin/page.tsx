"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AccountContext from "../../context/account";

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
  const accountContext = useContext(AccountContext);
  const router = useRouter();
  const [yachts, setYachts] = useState<Yacht[]>([]);
  useEffect(() => {
    fetch(`http://localhost:5000/admin/list`, {
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
        accountContext.setAccount(null);
        router.push("/account/unauthorized");
      });
  }, []);

  // setYachts(yachts.filter((yacht) => yacht.id !== id))
  const remove = (id: number) => {
    fetch(`http://localhost:5000/admin/remove/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((_) => {})
      .catch((err) => {
        console.log(err.code);
      });
  };

  return (
    <div className="pt-16 sm:px-6 w-full">
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="flex items-center justify-between">
          <p
            tabIndex={0}
            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
          >
            Currently has {yachts.length} yachts
          </p>
        </div>
      </div>
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="sm:flex items-center justify-between">
          <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
            <Link
              href="/admin/create"
              className="text-sm font-medium leading-none text-white"
            >
              Add Yacht
            </Link>
          </button>
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <tbody>
              {yachts.map((yacht, i) => (
                <tr
                  key={i}
                  tabIndex={0}
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td className="">
                    <img
                      width="150"
                      height="150"
                      className="rounded-md"
                      src={yacht.image}
                      alt="img"
                    />
                  </td>
                  <td className="">
                    <div className="flex items-center pl-5">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        {yacht.name}
                      </p>
                    </div>
                  </td>
                  <td className="pl-24">
                    <div className="flex items-center">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        {yacht.type}
                      </p>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center pl-5">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        {yacht.description}
                      </p>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-center pl-5">
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        {yacht.price}
                      </p>
                    </div>
                  </td>
                  <td className="pl-12">
                    <Link
                      href={`/admin/${yacht.ID}`}
                      className="text-sm leading-none text-blue-900 py-3 px-5 bg-blue-300 rounded hover:bg-blue-500 focus:outline-none"
                    >
                      View
                    </Link>
                  </td>
                  <td className="">
                    <Link
                      href={`/admin/update/${yacht.ID}`}
                      className="text-sm leading-none text-orange-900 py-3 px-5 bg-orange-300 rounded hover:bg-orange-500 focus:outline-none"
                    >
                      Update
                    </Link>
                  </td>
                  <td className="">
                    <button className="text-sm leading-none text-red-900 py-3 px-5 bg-red-300 rounded hover:bg-red-500 focus:outline-none">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
