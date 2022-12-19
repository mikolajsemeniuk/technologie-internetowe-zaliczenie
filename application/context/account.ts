import React from "react";

export interface Account {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface State {
  account: Account | null;
  setAccount: (_: Account | null) => void;
}

export default React.createContext<State>({
  account: null,
  setAccount: (_: Account | null) => {},
});
