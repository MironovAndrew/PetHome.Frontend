import { Grid2 } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
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

  const [filters, setFilters] = useState<any>({
    name: undefined,
    species: undefined,
    breed: undefined,
    color: undefined,
    address: undefined,
    weight: undefined,
    isVaccinated: undefined,
    isCastrated: undefined,
    gender: undefined,
    age: undefined,
    status: undefined,
  });

  const {
    data: pets,
    isLoading,
    isError,
  } = useGetPetsQuery({
    speciesId: filters?.species,
    name: filters?.name,
    age: filters?.age,
    breedId: filters?.breed,
    color: filters?.color,
    shelterId: filters?.address,
    weight: filters?.weight,
    isVaccinated: filters?.isVaccinated,
    isCastrated: filters?.isCastrated,
    status: filters?.status,
    pagedListDto: { pageSize: 10, pageNum: 1 },
  });

  console.log(pets);
  console.log(filters);

  if (isError) return <div>Произошла ошибка</div>;
  if (isLoading) return <div>Загрузка...</div>;

  return (
    <Grid container spacing={1} padding={2}>
      <Grid2 size={2}>
        <Item>
          <PetFilter onSave={(newFilters) => setFilters(newFilters)} />
        </Item>
      </Grid2>

      <Grid2 size={10} container spacing={5} padding={2}>
        {pets?.map((pet) => (
          <Grid item key={pet.id}>
            <Item>
              <PetCard
                photoPath={photoPath}
                name={pet.name}
                desc={pet.description}
                age={22}
                gender={"male"}
                isVaccinated={pet.isVaccinated}
              />
            </Item>
          </Grid>
        ))}
      </Grid2>

      <Grid2 size={15} paddingBottom={10} paddingTop={10}>
        <ContentPagination contentCount={10} pageContentCount={2} />
      </Grid2>
    </Grid>
  );
}
