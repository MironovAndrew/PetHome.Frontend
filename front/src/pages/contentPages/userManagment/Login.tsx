import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { AccountService } from "../../../api/AccountService";
import { LoginFields } from "../../../models/DataRequests/Login/LoginFields";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const onSubmit = (fields: LoginFields) => {
    try {
      const loginResponse = AccountService.Login(fields.email, fields.password);
      console.log(loginResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-10">
        <NavLink to="/" className="text-lg text-blue-500 self-start">
          На главную
        </NavLink>
      </div>
      <div className="flex flex-col h-full w-full py-40 px-10 justify-center items-start gap-5">
        <div className="flex flex-col flex-1 min-w-8 mx-auto items-center justify-center gap-9">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full items-center gap-4"
          >
            <Typography variant="h6">Login</Typography>

            <TextField
              variant="standard"
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              {...register("email", {
                required: "Это поле обязательно",
                validate: (value) => {
                  if (!value.includes("@")) return "Email должен содержать '@'";
                },
              })}
            />

            <TextField
              variant="standard"
              label="Пароль"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              {...register("password", {
                required: "Это поле обязательно",
                validate: (value) => {
                  if (value.length < 10)
                    return "Пароль должен быть длиннее 10 символов";
                },
              })}
            />
            <Button variant="contained" type="submit">
              Войти
            </Button>

            <NavLink to="/registration" className="text-l text-blue-500">
              Зарегистрироваться
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

function TestGetAPI() {
  const [users, setUsers] = useState<string[]>([]);
  useEffect(() => {
    const result = async () => {
      await AccountService.Login()
        .then((data) => setUsers(data))
        .catch((error) => console.log(error));
    };
    result();
  }, []);
  return users;
}
