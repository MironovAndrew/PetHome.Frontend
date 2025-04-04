import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/system";
import { useState } from "react";
import { ContentPagination } from "../../../customComponents/ContentPagination";
import PetCard from "../../../customComponents/UI/Pet/PetCard";
import { PetFilter } from "../../../customComponents/UI/Pet/PetFilter";
import { useGetPetsQuery } from "../../../modules/petManagementService/petEntity/petsApi";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export function Pets() {
  const photoPath =
    "https://img-webcalypt.ru/uploads/admin/images/meme-templates/VjZyOLNPWxvqT0FuPhpP33iHfhWdo0QP.jpg";

  const [name, setName] = useState<string | undefined>("");
  const [species, setSpecies] = useState<string | undefined>("");
  const [breed, setBreed] = useState<string | undefined>("");
  const [color, setColor] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const [weight, setWeight] = useState<number | undefined>(2);
  const [isVaccinated, setIsVaccinated] = useState<boolean | undefined>(true);
  const [isCastrated, setIsCastrated] = useState<boolean | undefined>(true);
  const [gender, setGender] = useState<string | undefined>("");
  const [status, setStatus] = useState<string | undefined>("");
  const [age, setAge] = useState<number | undefined>(22);

  const { data: pets } = useGetPetsQuery({
    speciesId: species,
    name: name,
    age: age,
    breedId: breed,
    color: color,
    shelterId: address,
    weight: weight,
    isVaccinated: isVaccinated,
    isCastrated: isCastrated,
    status: status,
    pagedListDto: { pageSize: 10, pageNum: 1 },
  });

  const cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(
      <Grid>
        <Item>
          {PetCard(photoPath, name, "description", age, gender, isVaccinated)}
        </Item>
      </Grid>
    );
  }

  console.log(isVaccinated);

  return (
    <Grid container spacing={1} padding={2}>
      <Grid size={2}>
        <Item>
          {PetFilter({
            onSave(
              name,
              species,
              breed,
              color,
              address,
              weight,
              isVaccinated,
              gender,
              age,
              status
            ) {
              setName(name);
              setSpecies(species);
              setBreed(breed);
              setColor(color);
              setAddress(address);
              setWeight(weight);
              setIsVaccinated(isVaccinated);
              setGender(gender);
              setAge(age);
              setStatus(status);
            },
          })}
        </Item>
      </Grid>

      <Grid size={10} container spacing={5} padding={2}>
        {cards}
      </Grid>

      <Grid size={15} paddingBottom={10} paddingTop={10}>
        <Item>{ContentPagination(10, 2)}</Item>
      </Grid>
    </Grid>
  );
}
