import { useState } from "react";
import { AccountService } from "../../api/AccountService";
import { User } from "../../models/dtos/User";
import { AuthContext } from "./AuthContext";
import { api } from "../../api/api";

export type Props = { children: React.ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>();

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await AccountService.Login(email, password);
      console.log(loginResponse);

      setAccessToken(loginResponse.data.Result!.AccessToken);
      setRefreshToken(loginResponse.data.Result!.RefreshToken);

      api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
