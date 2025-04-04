 
import { Pet } from "../../../domain/petManagementEntity/petEntity/Pet";
import { PagedList } from "../../../shared/models/dto/PagedList";
import { petMangementApi } from "../api/petMangementApi";

export const petsApi = petMangementApi.injectEndpoints({

   endpoints:(build)=>({
        getPets: build.query<
        Pet[],  
        {  
            speciesId: string | undefined,
            name: string | undefined,
            age: number | undefined,
            breedId: string | undefined,
            color: string | undefined,
            shelterId: string | undefined,
            weight: number | undefined,
            isVaccinated: boolean | undefined,
            isCastrated: boolean | undefined,
            status: string | undefined,
            pagedListDto: PagedList 
        }>({
            query: ({speciesId,  name, age,breedId, color, shelterId, weight, isVaccinated, isCastrated, status, pagedListDto})=>({
                url:"Pet/sorted-filtred-paged",
                params: { speciesId, name, age, breedId, color, shelterId, weight, isVaccinated, isCastrated, status, 
                pageSize: pagedListDto.pageSize, pageNum: pagedListDto.pageNum
                }}),
                providesTags: ["PetMangement"],
                transformResponse:(data : { result: Pet[] }) => data.result
            }), 
   })
});

export const {useGetPetsQuery} = petsApi;