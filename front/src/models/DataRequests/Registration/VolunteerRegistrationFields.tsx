import { requisite } from "../../dtos/Requisite";
import dayjs, { Dayjs } from "dayjs";

export type VolunteerRegistrationFields = {
  email: string;
  username: string;
  password: string;
  description: string;
  firstName: string;
  lastName: string;
  startVolunteeringDate: Dayjs | null;
  phoneNumbers: string[];
  socialNetworks: string[];
  requisitesesDto: requisite[];
};
