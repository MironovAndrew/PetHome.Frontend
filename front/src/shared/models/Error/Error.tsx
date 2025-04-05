import { ErrorType } from "./ErrorType";

export type Error = {
  code: string;
  invalidField: string;
  message: string;
  type: ErrorType;
};
