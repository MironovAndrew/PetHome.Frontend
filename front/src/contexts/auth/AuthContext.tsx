import { createContext } from "react";
import { User } from "../../models/dtos/User";

export type AuthContextType = {
  accessToken: string | undefined;
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  test: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
