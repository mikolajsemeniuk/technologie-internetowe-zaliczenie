import { useContext } from "react";
import MessageContext from "../context/message";

export default function Notification() {
  const messageContext = useContext(MessageContext);

  // animate-wiggle
  return (
    <div
      style={{
        transform:
          messageContext.message != "" ? "translateX(0px)" : "translateX(50px)",
        opacity: messageContext.message != "" ? 1 : 0,
        transition: "all 0.5s ease-out;",
      }}
      className={`fixed bg-blue-500 min-h-[40px] flex justify-center items-center text-white rounded-lg shadow-xl px-12 top-24 right-8 z-30`}
    >
      {messageContext.message}
    </div>
  );
}
