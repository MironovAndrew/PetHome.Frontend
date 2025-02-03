import { useEffect, useLayoutEffect, useState } from "react";
import { AccountService } from "../../api/AccountService";
import { User } from "../../models/dtos/User";
import { AuthContext } from "./AuthContext";
import { api } from "../../api/api";
import { AxiosPromise } from "axios";
import { Envelope } from "../../models/Error/Envelope";
import { LoginFields } from "../../models/DataRequests/Login/LoginFields";
import { LoginResponse } from "../../models/DataResponses/Login/LoginResponse";
import { requisite } from "../../models/dtos/Requisite";
import dayjs, { Dayjs } from "dayjs";

export type Props = { children: React.ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const accessTokenInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = accessToken
        ? `Bearer ${accessToken}`
        : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.response.eject(accessTokenInterceptor);
    };
  }, [accessToken]);

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
      const loginResponseData = loginResponse.data.result;
      console.log(loginResponse);

      setAccessToken(loginResponse.data.result!.accessToken);
      setUser({
        id: loginResponseData.userId,
        email: loginResponseData.email,
        username: loginResponseData.userName,
      } as User);
    } catch (error) {
      console.log(error);
      setUser(undefined);
    }
  };

  const participantRegistration = async (email: string, password: string) => {
    try {
      const loginResponse = await AccountService.ParticipantRegistration(
        email,
        password
      );
      const loginResponseData = loginResponse.data.result;
      console.log(loginResponse);

      setAccessToken(loginResponse.data.result!.accessToken);
      setUser({
        id: loginResponseData.userId,
        email: loginResponseData.email,
        username: loginResponseData.userName,
      } as User);
    } catch (error) {
      console.log(error);
      setUser(undefined);
    }
  };

  const volunteerRegistration = async (
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    startVolunteeringDate: Dayjs | null,
    phoneNumbers: string[],
    socialNetworks: string[],
    requisitesesDto: requisite[]
  ) => {
    try {
      const loginResponse = await AccountService.VolunteerRegistration(
        email,
        username,
        password,
        firstName,
        lastName,
        startVolunteeringDate,
        phoneNumbers,
        socialNetworks,
        requisitesesDto
      );
      const loginResponseData = loginResponse.data.result;
      console.log(loginResponse);

      setAccessToken(loginResponse.data.result!.accessToken);
      setUser({
        id: loginResponseData.userId,
        email: loginResponseData.email,
        username: loginResponseData.userName,
      } as User);
    } catch (error) {
      console.log(error);
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
