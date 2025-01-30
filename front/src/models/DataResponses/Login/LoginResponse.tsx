export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  UserId: string | undefined;
  Email: string | undefined;
  UserName: string | undefined;
};
