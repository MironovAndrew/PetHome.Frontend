export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string | undefined;
  email: string | undefined;
  userName: string | undefined;
};
