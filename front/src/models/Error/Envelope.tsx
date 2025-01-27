import { Error } from "./Error";

export type Envelope = {
  Errors: Error[];
  Result: string;
  TimeGenerated: Date;
};
