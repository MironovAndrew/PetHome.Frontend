import { useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("Auth context is null!");

  return authContext;
};
