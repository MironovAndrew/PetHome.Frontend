import { Dayjs } from "dayjs";
import { useEffect, useLayoutEffect, useState } from "react";
import { api } from "../../api/api";
import { AccountService } from "../../api/services/accountService";
import { User } from "../../domain/accountEntity/User";
import { Requisite } from "../../shared/models/dto/Requisite";
import { AuthContext } from "./AuthContext";

export type Props = { children: React.ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>();

  // Добавление access token (если он доступен) перед каждым запросом
  useEffect(() => {
    const accessTokenInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = accessToken
        ? `Bearer ${accessToken}`
        : config.headers.Authorization;
      return config;
    });

    // Завершение перехватчика
    return () => {
      api.interceptors.response.eject(accessTokenInterceptor);
    };
  }, [accessToken]);

  // Перехватчик ответа. Если 401 (не авторизирован), но есть access token, сгенерировать новый 
  useLayoutEffect(() => {
    const refreshTokenInterceptor = api.interceptors.response.use(
      (config) => config,
      async (error) => {
        if (error.response.status === 401) {
          const originalRequest = error.config;
          try {
            const response = await AccountService.Refresh();
            const responseData = response.data.result;

            setAccessToken(responseData.accessToken);
            console.log(
              "\tnew access token -----> " + (accessToken ?? "empty")
            );

            const user = {
              id: responseData.userId,
              username: responseData.userName,
              email: responseData.email,
            } as User;
            setUser(user);
            console.log("\tuser -----> " + (user ?? "empty"));

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            return api(originalRequest);
          } catch (error) {
            console.log(error);
            setAccessToken(undefined);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshTokenInterceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await AccountService.Login(email, password);
      console.log(loginResponse);
    } catch (error) {
      console.log(error);
      setUser(undefined);
      setAccessToken(undefined);
    }
  };

  const participantRegistration = async (email: string, password: string) => {
    try {
      const loginResponse = await AccountService.ParticipantRegistration(
        email,
        password
      );
      console.log(loginResponse);
    } catch (error) {
      console.log(error);
      setUser(undefined);
      setAccessToken(undefined);
    }
  };

  const volunteerRegistration = async (
    email: string,
    username: string,
    description: string,
    password: string,
    firstName: string,
    lastName: string,
    startVolunteeringDate: Dayjs | null,
    phoneNumbers: string[],
    socialNetworks: string[],
    requisitesesDto: Requisite[]
  ) => {
    try {
      const loginResponse = await AccountService.VolunteerRegistration(
        email,
        username,
        description,
        password,
        firstName,
        lastName,
        startVolunteeringDate,
        phoneNumbers,
        socialNetworks,
        requisitesesDto
      );
      console.log(loginResponse);
    } catch (error) {
      console.log(error);
      setAccessToken(undefined);
      setUser(undefined);
    }
  };

  const authChecker = async () => {
    try {
      const authCheckerResponse = await AccountService.AuthChecker();
      console.log(authCheckerResponse);
      console.log(user);
    } catch (error) {
      console.log(error);
      setAccessToken(undefined);
      setUser(undefined);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        participantRegistration,
        volunteerRegistration,
        authChecker,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
