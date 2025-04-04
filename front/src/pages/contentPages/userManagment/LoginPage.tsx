import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../../contexts/auth/useAuth";
import { LoginFields } from "../../../shared/models/DataRequests/Login/LoginFields";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const navigate = useNavigate();

  const { login, user } = useAuth();
  const onSubmit = async (fields: LoginFields) => {
    await login(fields.email, fields.password);
    if (user) navigate("/profile");
  };

  const [isShowPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
              variant="outlined"
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
              variant="outlined"
              label="Пароль"
              type={isShowPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
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

            <Typography className="pt-8">Ещё не зарагистрированы?</Typography>

            <NavLink to="/registration" className="text-l text-blue-500">
              Зарегистрироваться
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
