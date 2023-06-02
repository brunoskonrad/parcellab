import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Wrap your component with `AuthProvider`");
  }

  return context;
}
