import * as React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../../../contexts/auth/useAuth";
import { UserRegistrationFields } from "../../../../models/DataRequests/Registration/RegistrationFields";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Typography, TextField, IconButton, Button } from "@mui/material";
import { useForm } from "react-hook-form";

export function ParticipantRegistrationPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserRegistrationFields>();

  const navigate = useNavigate();
  const { participantRegistration, user } = useAuth();
  const onSubmit = async (fields: UserRegistrationFields) => {
    await participantRegistration(fields.email, fields.password);
    if (user) navigate("/login");
  };

  const [isShowPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const password = watch("password");

  return (
    <div className="flex flex-col flex-1 min-w-8 mx-auto items-center justify-center gap-9">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full items-center gap-4"
      >
        <TextField
          variant="outlined"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          {...register("email", {
            required: "Это поле обязательно",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Введите корректную почту",
            },
          })}
        />

        <TextField
          variant="outlined"
          label="Имя"
          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
          {...register("username", {
            required: "Это поле обязательно",
            minLength: {
              value: 2,
              message: "Введите корректное имя",
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
            minLength: {
              value: 10,
              message: "Пароль должен быть длиннее 10 символов",
            },
          })}
        />

        <TextField
          variant="outlined"
          label="Повторите пароль"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
          {...register("confirmPassword", {
            required: "Это поле обязательно",
            validate: (value) => {
              if (value !== password) return "Пароли не совпадают!";
            },
          })}
        />

        <Button variant="contained" type="submit">
          Зарегистрироваться
        </Button>

        <Typography className="pt-8">Уже зарегистрированы?</Typography>

        <NavLink to="/login" className="text-l text-blue-500">
          Войти
        </NavLink>
      </form>
    </div>
  );
}
