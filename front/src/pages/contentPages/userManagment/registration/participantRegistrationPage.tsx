import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../../../contexts/auth/useAuth";
import { LoginFields } from "../../../../models/DataRequests/Login/LoginFields";
import { UserRegistrationFields } from "../../../../models/DataRequests/Registration/RegistrationFields";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Typography, TextField, IconButton, Button } from "@mui/material";

export function ParticipantRegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationFields>();

  const navigate = useNavigate();
  const { participantRegistration, volunteerRegistration, user } = useAuth();
  const onSubmit = async (fields: UserRegistrationFields) => {
    await participantRegistration(fields.email, fields.password);
    if (user) navigate("/profile");
  };

  const [isShowPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
            validate: (value) => {
              if (!value.includes("@")) return "Email должен содержать '@'";
            },
          })}
        />

        <TextField
          variant="outlined"
          label="Имя"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          {...register("username", {
            required: "Это поле обязательно",
            validate: (value) => {
              if (!value.includes("@")) return "username должен содержать '@'";
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

        <TextField
          variant="outlined"
          label="Повторите пароль"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          {...register("password", {
            required: "Это поле обязательно",
            validate: (value) => {
              if (value) return "Пароль должен быть длиннее 10 символов";
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
