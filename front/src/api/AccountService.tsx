import axios, { AxiosResponse } from "axios";
import { Envelope } from "../models/Error/Envelope";
import { LoginResponse } from "../models/DataResponses/Login/LoginResponse";
import { api, API_URL } from "./api";

export class AccountService {
  static async Login(
    email: string,
    password: string
  ): Promise<AxiosResponse<Envelope<LoginResponse>>> {
    const method = "login";
    const response = await api.post(method, {
      email,
      password,
    });

    return response;
  }

  static async Refresh(): Promise<AxiosResponse<Envelope<LoginResponse>>> {
    const method = "refresh";

    return await api.post(
      method,
      {},
      {
        withCredentials: true,
      }
    );
  }

  static async AuthChecker() {
    const method = "auth-checker";

    return await api.post(
      method,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
