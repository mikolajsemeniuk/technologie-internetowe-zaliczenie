import React from "react";

interface State {
  message: string;
  setMessage: (_: string) => void;
}

export default React.createContext<State>({
  message: "",
  setMessage: (_: string) => {},
});
