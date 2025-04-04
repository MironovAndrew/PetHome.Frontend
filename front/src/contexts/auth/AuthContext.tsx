import { Dayjs } from "dayjs";
import { createContext } from "react";
import { User } from "../../domain/accountEntity/User";
import { Requisite } from "../../shared/models/dto/Requisite";

export type AuthContextType = {
  accessToken: string | undefined;
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  participantRegistration: (email: string, password: string) => Promise<void>;
  volunteerRegistration: (
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
  ) => Promise<void>;
  authChecker: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
