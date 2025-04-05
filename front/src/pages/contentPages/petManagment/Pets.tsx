import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { ContentPagination } from "../../../customComponents/ContentPagination";
import PetCard from "../../../customComponents/UI/Pet/PetCard";
import {
  PetFilter,
  PetFilterProps,
} from "../../../customComponents/UI/Pet/PetFilter";
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

  const [pageNum, setPageNum] = useState<number>(1);

  const [filters, setFilters] = useState<PetFilterProps>({
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
    pagedListDto: { pageSize: 5, pageNum: pageNum },
  });

  console.log(pets);
  console.log(filters);
  console.log("pageNum ", pageNum);

  if (isError) return <div>Произошла ошибка</div>;
  if (isLoading) return <div>Загрузка...</div>;

  return (
    <Grid container spacing={10} padding={2}>
      <Grid item xs={12} md={2}>
        <Item>
          <PetFilter
            onSave={(newFilters: PetFilterProps) => setFilters(newFilters)}
          />
        </Item>
      </Grid>

      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          {pets?.map((pet) => (
            <Grid item key={pet.id}>
              <Item>
                <PetCard
                  photoPath={photoPath}
                  name={pet.name}
                  desc={pet.description}
                  birthDate={pet.birthDate}
                  gender={"male"}
                  isVaccinated={pet.isVaccinated}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" marginTop={10} marginBottom={5}>
        <ContentPagination onSave={setPageNum} />
      </Grid>
    </Grid>
  );
}
