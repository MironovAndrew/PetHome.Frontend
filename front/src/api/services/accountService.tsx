import { AxiosResponse } from "axios";
import { Dayjs } from "dayjs";
import { LoginResponse } from "../../shared/models/DataResponses/Login/LoginResponse";
import { Requisite } from "../../shared/models/dto/Requisite";
import { Envelope } from "../../shared/models/Error/Envelope";
import { api } from "../api";

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
    const method = "participant/registration";
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
    requisitesesDto: Requisite[]
  ) {
    const method = "volunteer/registration";
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
