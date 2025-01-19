import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CustomCard from "../../../customComponents/UI/Pet/PetCard";
import { PetFilter } from "../../../customComponents/UI/Pet/PetFilter";
import { ContentPagination } from "../../../customComponents/ContentPagination";
import { Console } from "console";
import { Typography } from "@mui/material";

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

export function Main() {
  const photoPath =
    "https://img-webcalypt.ru/uploads/admin/images/meme-templates/VjZyOLNPWxvqT0FuPhpP33iHfhWdo0QP.jpg";
  const name = "Барсио";
  const desc = "Послушный кот хочет стать Вашим другом ";
  const age = 2.3;
  const gender = "Мальчик";
  const isVaccinated = true;

  let cards = [];

  for (let i = 0; i < 10; i++) {
    cards.push(
      <Grid>
        <Item>
          {CustomCard(photoPath, name, desc, age, gender, isVaccinated)}
        </Item>
      </Grid>
    );
  }

  return (
    <Grid container spacing={1} padding={2}>
      <Grid size={2}>
        <Item>
          <PetFilter />
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
