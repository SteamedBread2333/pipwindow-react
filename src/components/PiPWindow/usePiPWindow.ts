import { useContext } from "react";
import PiPContext, { PiPContextType } from "./PiPContext";

export function usePiPWindow(): PiPContextType {
  const context = useContext(PiPContext);

  if (context === undefined) {
    throw new Error("usePiPWindow must be used within a PiPContext");
  }

  console.log("context", context);

  return context;
}
