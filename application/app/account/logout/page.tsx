"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import AccountContext from "../../../context/account";

export default function Page() {
  const router = useRouter();
  const accountContext = useContext(AccountContext);
  useEffect(() => {
    fetch(`http://localhost:5000/account/logout`, { credentials: "include" })
      .then((response) => response.json())
      .then((_) => accountContext.setAccount(null))
      .catch((err) => console.error(err));
    setTimeout(() => router.push("/"), 2000);
  }, [router, accountContext]);

  return (
    <section className="py-24 flex items-center min-h-screen justify-center bg-white">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-indigo-600/95">
            You were successfully logged out
          </p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
            See you later 😊
          </h1>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            className="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
            href="/account/register"
          >
            Register
          </Link>
          <Link
            href="/account/login"
            className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
