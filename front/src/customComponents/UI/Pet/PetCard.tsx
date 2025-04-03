import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

export default function PetCard(
  photoPath: string,
  name: string,
  desc: string,
  age: number,
  gender: string,
  isVaccinated: boolean
) {
  const isVaccinatedString = isVaccinated == true ? "Да" : "Нет";

  const navigate = useNavigate();
  const getPage = (path: string) => {
    if (path) navigate(path);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={photoPath}
          // alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <b>Пол:</b> {gender}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <b>Возраст:</b> {age}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <b>Вакцинация:</b> {isVaccinatedString}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <b>Общее описание:</b> {desc}
          </Typography>

          <Typography paddingTop={2} gridRow={"revert"}>
            <Button
              //Заглушка
              onClick={() => getPage("/")}
              size="medium"
              variant="outlined"
            >
              Подробнее
            </Button>

            <Button
              //Заглушка
              onClick={() => getPage("/")}
              color="info"
              size="medium"
              variant="contained"
            >
              ♥
            </Button>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
