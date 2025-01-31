import { Error } from "./Error";

export type Envelope<T> = {
  errors: Error[];
  result: T;
  timegenerated: Date;
};
