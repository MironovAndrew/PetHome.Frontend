import { Error } from "./Error";

export type Envelope<T> = {
  Errors: Error[];
  Result: T;
  TimeGenerated: Date;
};
