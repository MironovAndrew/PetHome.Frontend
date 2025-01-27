import axios from "axios";

export const API_URL: string = "http://localhost:5258/";
export class AccountService {
  static async Login() {
    const method = "login";
    const response = await axios.get(API_URL + method);
    return response.data;
  }
  static async Registration() {
    const method = "registration";
    const response = await axios.get(API_URL + method);
    return response.data;
  }
}
