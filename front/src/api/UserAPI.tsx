import axios from "axios";

const API_URL: string = "http://localhost:5258/";

export async function GetUsersAPI() {
  const method = "strings-array";
  const response = await axios.get(API_URL + method);
  return response.data;
}
