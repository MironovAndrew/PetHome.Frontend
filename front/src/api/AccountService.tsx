import axios, { AxiosResponse } from "axios";
import { LoginFields } from "../models/DataRequests/Login/LoginFields";
import { Envelope } from "../models/Error/Envelope";
import { LoginResponse } from "../models/DataResponses/Login/LoginResponse";

export const API_URL: string = "http://localhost:5258/AccountAuthentication/";
export class AccountService {
  static async Login(
    email: string,
    password: string
  ): Promise<AxiosResponse<Envelope<LoginResponse>>> {
    const method = "login";
    const response = await axios.post(API_URL + method, { email, password });
    return response.data;
  }

  static async Registration() {
    const method = "registration";
    const response = await axios.get(API_URL + method);
    return response.data;
  }
}
