import { Dayjs } from "dayjs";
import { Requisite } from "../../dto/Requisite";

export type VolunteerRegistrationFields = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  description: string;
  firstName: string;
  lastName: string;
  startVolunteeringDate: Dayjs | null;
  phoneNumbers: string[];
  socialNetworks: string[];
  requisitesesDto: Requisite[];
};
