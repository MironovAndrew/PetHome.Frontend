import {
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { register } from "module";
import { useForm } from "react-hook-form";
import { VolunteerRegistrationFields } from "../DataRequests/Registration/VolunteerRegistrationFields";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export function requisiteForm({ register, errors }) {
  const [paymantMethod, setPaymantMethod] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPaymantMethod(event.target.value as string);
  };

  return (
    <div className="flex flex-col flex-1  mx-auto items-center justify-center gap-5">
      <Typography>Реквезиты</Typography>
      <TextField
        variant="outlined"
        label="Название"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        // {...register("requisitesesDto", {
        //   required: "Это поле обязательно",
        //   validate: (value) => {
        //     if (!value.includes("@")) return "Email должен содержать '@'";
        //   },
        // })}
      />
      <TextField
        variant="outlined"
        label="Описание"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        // {...register("requisitesesDto", {
        //   required: "Это поле обязательно",
        //   validate: (value) => {
        //     if (!value.includes("@")) return "Email должен содержать '@'";
        //   },
        // })}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Тип платежа</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paymantMethod}
          label="Тип платежа"
          onChange={handleChange}
        >
          <MenuItem value="cash">Наличные</MenuItem>
          <MenuItem value="card">Карта</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
