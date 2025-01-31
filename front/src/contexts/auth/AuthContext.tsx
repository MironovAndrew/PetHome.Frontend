import { createContext } from "react";
import { User } from "../../models/dtos/User";
import { requisite } from "../../models/dtos/Requisite";

export type AuthContextType = {
  accessToken: string | undefined;
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  participantRegistration: (email: string, password: string) => Promise<void>;
  volunteerRegistration: (
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    startVolunteeringDate: Date,
    phoneNumbers: string[],
    socialNetworks: string[],
    requisitesesDto: requisite[]
  ) => Promise<void>;
  authChecker: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
