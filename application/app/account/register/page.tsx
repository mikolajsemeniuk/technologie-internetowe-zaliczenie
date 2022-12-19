"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import AccountContext, { Account } from "../../../context/account";
import MessageContext from "../../../context/message";

interface Request {
  email: string;
  name: string;
  password: string;
}

export default function Page() {
  const router = useRouter();
  const [request, setRequest] = useState<Request>({
    email: "mike@mock.com",
    name: "mike",
    password: "P@ssw0rd",
  });
  const accountContext = useContext(AccountContext);
  const messageContext = useContext(MessageContext);

  const register = async (req: Request) => {
    await fetch(`http://localhost:5000/account/register`, {
      method: "POST",
      body: JSON.stringify(req),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();

        return res.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((response: Account) => {
        accountContext.setAccount(response);
        router.push("/");
      })
      .catch((err) => messageContext.setMessage(err.message));
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">Brand</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                  Brand
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign up to access your account
                </p>
              </div>

              <div className="mt-8">
                <div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Email
                    </label>
                    <input
                      placeholder="your email"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setRequest({
                          ...request,
                          email: event.target.value,
                        });
                      }}
                      value={request.email}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Name
                    </label>
                    <input
                      placeholder="your name"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setRequest({
                          ...request,
                          name: event.target.value,
                        });
                      }}
                      value={request.name}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="your password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setRequest({
                          ...request,
                          password: event.target.value,
                        });
                      }}
                      value={request.password}
                    />
                  </div>

                  <div onClick={() => register(request)} className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign up
                    </button>
                  </div>
                </div>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/account/login"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign in
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
