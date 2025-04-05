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
import { useState } from "react";

export type PetFilterProps = {
  name?: string;
  species?: string;
  breed?: string;
  color?: string;
  address?: string;
  weight?: number;
  isVaccinated?: boolean;
  isCastrated?: boolean;
  gender?: string;
  age?: number;
  status?: string;
};

export function PetFilter({
  onSave,
}: {
  onSave: (filters: PetFilterProps) => void;
}) {
  const [name, setName] = useState<string>();
  const [species, setSpecies] = useState<string>();
  const [breed, setBreed] = useState<string>();
  const [color, setColor] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [weight, setWeight] = useState<number>();
  const [age, setAge] = useState<number>();
  const [isVaccinated, setIsVaccinated] = useState<boolean>();
  const [gender, setGender] = useState<string>();
  const [status, setStatus] = useState<string>();

  const handleSave = () => {
    onSave({
      name,
      species,
      breed,
      color,
      address,
      weight,
      isVaccinated,
      gender,
      age,
      status,
    });
    return name;
  };

  return (
    <Typography padding={3}>
      <FormControl>
        <InputLabel htmlFor="name">Имя</InputLabel>
        <Input
          id="name"
          onChange={(e) => setName(e.target.value)}
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="species">Вид</InputLabel>
        <Input
          id="species"
          onChange={(e) => setSpecies(e.target.value)}
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="breed">Порода</InputLabel>
        <Input
          id="breed"
          onChange={(e) => setBreed(e.target.value)}
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="color">Окрас</InputLabel>
        <Input
          id="color"
          onChange={(e) => setColor(e.target.value)}
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="address">Адрес</InputLabel>
        <Input
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Вакцинация"
          onChange={(_, newValue) => setIsVaccinated(newValue as boolean)}
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
      <Slider
        defaultValue={1}
        valueLabelDisplay="auto"
        onChange={(_, newValue) => setAge(newValue as number)}
        max={30}
      >
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
          onClick={handleSave}
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
