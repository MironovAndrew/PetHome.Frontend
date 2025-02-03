import * as React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../../../contexts/auth/useAuth";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Typography, TextField, IconButton, Button } from "@mui/material";
import { VolunteerRegistrationFields } from "../../../../models/DataRequests/Registration/VolunteerRegistrationFields";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addSocialNetworksForm } from "../../../forms/registrationForms/AddSocialNetworksForm";
import { addPhoneNumbersForm } from "../../../forms/registrationForms/AddPhoneNumbersForm";
import { useState } from "react";

export function VolunteerRegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerRegistrationFields>();

  const navigate = useNavigate();
  const { volunteerRegistration, user } = useAuth();
  const onSubmit = async (fields: VolunteerRegistrationFields) => {
    await volunteerRegistration(
      fields.email,
      fields.username,
      fields.password,
      fields.firstName,
      fields.lastName,
      startVolunteeringDate,
      phoneNumbers.map((item) => item.phone),
      socialNetworks.map((item) => item.link),
      fields.requisitesesDto
    );

    console.log(user);

    if (user) navigate("/profile");
  };

  const [isShowPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [startVolunteeringDate, setStartVolunteeringDate] =
    React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const [phoneNumbers, setPhoneNumbers] = useState([{ phone: "" }]);
  const [socialNetworks, setSocialNetworks] = useState([{ link: "" }]);

  return (
    <>
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
            label="Username"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            {...register("username", {
              required: "Это поле обязательно",
              validate: (value) => {
                if (!value.includes("@"))
                  return "username должен содержать '@'";
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
              // validate: (value) => {
              //   if (value.length < 10)
              //     return "Пароль должен быть длиннее 10 символов";
              // },
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
              // validate: (value) => {
              //   if (value) return "Пароль должен быть длиннее 10 символов";
              // },
            })}
          />
          <TextField
            variant="outlined"
            label="Фамилия"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            {...register("lastName", {
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
            {...register("firstName", {
              required: "Это поле обязательно",
              validate: (value) => {
                if (!value.includes("@")) return "Email должен содержать '@'";
              },
            })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Дата начала волонтёрства"
              value={startVolunteeringDate}
              className="w-full"
              onChange={(newValue) => setStartVolunteeringDate(newValue)}
            />
            {addPhoneNumbersForm({ onSave: setPhoneNumbers })}
            {addSocialNetworksForm({ onSave: setSocialNetworks })}
          </LocalizationProvider>
          <Button variant="contained" className="w-full" type="submit">
            Зарегистрироваться
          </Button>
          <Typography className="pt-6">Уже зарегистрированы?</Typography>
          <NavLink to="/login" className="text-l text-blue-500">
            Войти
          </NavLink>
        </form>
      </div>
    </>
  );
}
