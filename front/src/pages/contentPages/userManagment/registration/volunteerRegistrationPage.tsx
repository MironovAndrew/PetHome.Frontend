import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../../../contexts/auth/useAuth";
import { VolunteerRegistrationFields } from "../../../../models/DataRequests/Registration/VolunteerRegistrationFields";
import { requisite } from "../../../../models/dtos/Requisite";
import { AddPhoneNumbersForm } from "../../../forms/registrationForms/AddPhoneNumbersForm";
import { AddRequisitesForm } from "../../../forms/registrationForms/AddRequisitesForm";
import { AddSocialNetworksForm } from "../../../forms/registrationForms/AddSocialNetworksForm";

export function VolunteerRegistrationPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VolunteerRegistrationFields>();

  const navigate = useNavigate();
  const { volunteerRegistration, user } = useAuth();
  const onSubmit = async (fields: VolunteerRegistrationFields) => {
    await volunteerRegistration(
      fields.email,
      fields.username,
      fields.description,
      fields.password,
      fields.firstName,
      fields.lastName,
      startVolunteeringDate,
      phoneNumbers.map((item) => item.phone),
      socialNetworks.map((item) => item.link),
      requisites
    );

    console.log(user);
    if (user) navigate("/login");
  };

  const [isShowPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [startVolunteeringDate, setStartVolunteeringDate] =
    React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const [phoneNumbers, setPhoneNumbers] = useState([{ phone: "" }]);
  const [socialNetworks, setSocialNetworks] = useState([{ link: "" }]);
  const [requisites, setRequisites] = useState<requisite[]>([]);
  const password = watch("password");

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
              required: "Введите email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Введите корректную почту",
              },
            })}
          />
          <TextField
            variant="outlined"
            label="Username"
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
            {...register("username", {
              required: "Введите username",
              minLength: {
                value: 2,
                message: "Введите корректный username",
              },
            })}
          />

          <TextField
            variant="outlined"
            label="Описание"
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            {...register("description", {
              required: "Введите описание",
              minLength: {
                value: 2,
                message: "Введите корректное описание",
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
              required: "Введите пароль",

              minLength: {
                value: 10,
                message: "Введите корректный пароль",
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
              required: "Введите пароль",
              validate: (value) => {
                if (value !== password) return "Пароли не совпадают!";
              },
            })}
          />
          <TextField
            variant="outlined"
            label="Фамилия"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
            {...register("lastName", {
              required: "Введите фамилию",
              minLength: {
                value: 2,
                message: "Введите корректную фамилию",
              },
            })}
          />
          <TextField
            variant="outlined"
            label="Имя"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
            {...register("firstName", {
              required: "Введите имя",
              minLength: {
                value: 2,
                message: "Введите корректное имя",
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
            {AddPhoneNumbersForm({ onSave: setPhoneNumbers })}
            {AddSocialNetworksForm({ onSave: setSocialNetworks })}
            {AddRequisitesForm({ onSave: setRequisites })}
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
