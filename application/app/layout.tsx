"use client";

import "../styles/output.css";
import Navigation from "../components/navigation";
import Notification from "../components/notification";
import AccountContext, { Account } from "../context/account";
import MessageContext from "../context/message";
import { useEffect, useState } from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem("account");
    if (data) {
      setAccount(JSON.parse(data));
    } else {
      localStorage.removeItem("account");
    }
  }, []);

  return (
    <MessageContext.Provider
      value={{
        message: message,
        setMessage: (message: string) => {
          setMessage(message);
          setTimeout(() => setMessage(""), 2000);
        },
      }}
    >
      <AccountContext.Provider
        value={{
          account: account,
          setAccount: (account: Account | null) => {
            if (account) {
              localStorage.setItem("account", JSON.stringify(account));
            } else {
              localStorage.removeItem("account");
            }
            setAccount(account);
          },
        }}
      >
        <html lang="en">
          <body>
            <Notification />
            <Navigation />
            {children}
          </body>
        </html>
      </AccountContext.Provider>
    </MessageContext.Provider>
  );
}
