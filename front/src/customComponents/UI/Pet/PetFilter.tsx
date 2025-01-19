import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router";

export function PetFilter() {
  const navigate = useNavigate();
  const getPage = (path: string) => {
    if (path) navigate(path);
  };
  return (
    <Typography padding={3}>
      <FormControl>
        <InputLabel htmlFor="species">Вид</InputLabel>
        <Input id="species" aria-describedby="my-helper-text" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="breed">Порода</InputLabel>
        <Input id="breed" aria-describedby="my-helper-text" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="color">Окрас</InputLabel>
        <Input id="color" aria-describedby="my-helper-text" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="address">Адрес</InputLabel>
        <Input id="address" aria-describedby="my-helper-text" />
      </FormControl>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Вакцинация"
        />
      </FormGroup>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Пол</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          row
        >
          <FormControlLabel value="male" control={<Radio />} label="Мальчик" />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Девочка"
          />
        </RadioGroup>
      </FormControl>

      <Typography gutterBottom>Возраст</Typography>
      <Slider defaultValue={1} valueLabelDisplay="auto" max={30}>
        Возраст
      </Slider>

      <FormControl fullWidth>
        <InputLabel id="status-label">Статус</InputLabel>
        <Select labelId="status-label" id="status">
          <MenuItem value={"isHealth"}>Здоров</MenuItem>
          <MenuItem value={"needsHelp"}>Нуждается в помощи</MenuItem>
          <MenuItem value={"havingHelp"}>На лечении</MenuItem>
        </Select>
      </FormControl>

      <Typography paddingTop={2}>
        <Button
          //Заглушка
          onClick={() => getPage("/")}
          color="inherit"
          size="medium"
          variant="contained"
        >
          Применить
        </Button>
      </Typography>
    </Typography>
  );
}
