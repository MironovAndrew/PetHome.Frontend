import axios, { AxiosResponse } from "axios";
import { Envelope } from "../models/Error/Envelope";
import { LoginResponse } from "../models/DataResponses/Login/LoginResponse";
import { api, API_URL } from "./api";
import { UserRegistrationFields } from "../models/DataRequests/Registration/RegistrationFields";
import { requisite } from "../models/dtos/Requisite";
import dayjs, { Dayjs } from "dayjs";

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

  static async ParticipantRegistration(email: string, password: string) {
    const method = "registration";
    return await api.post(method, { email, password });
  }

  static async VolunteerRegistration(
    email: string,
    username: string,
    description: string,
    password: string,
    firstName: string,
    lastName: string,
    startVolunteeringDate: Dayjs | null,
    phoneNumbers: string[],
    socialNetworks: string[],
    requisitesesDto: requisite[]
  ) {
    const method = "registration";
    return await api.post(method, {
      email,
      username,
      description,
      password,
      firstName,
      lastName,
      startVolunteeringDate,
      phoneNumbers,
      socialNetworks,
      requisitesesDto,
    });
  }
}
