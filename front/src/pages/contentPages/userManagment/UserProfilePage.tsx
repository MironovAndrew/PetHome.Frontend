import { useEffect } from "react";
import { AccountService } from "../../../api/AccountService";
import { useAuth } from "../../../contexts/auth/useAuth";
import { Typography } from "@mui/material";

export function UserProfilePage() {
  const { user, accessToken } = useAuth();
  console.log(accessToken);
  console.log(user);

  return (
    <div className="flex flex-col flex-1 min-w-8 pt-60 mx-auto items-center justify-center gap-5">
      <Typography variant="h5">Аккаунт</Typography>
      <ul>Id: {user?.id ?? "..."}</ul>
      <ul>Name: {user?.username ?? "..."}</ul>
      <ul>Email: {user?.email ?? "..."}</ul>
    </div>
  );
}
