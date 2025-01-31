import { requisite } from "../../dtos/Requisite";

export type VolunteerRegistrationFields = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  startVolunteeringDate: Date;
  phoneNumbers: string[];
  socialNetworks: string[];
  requisitesesDto: requisite[];
};
