import { Species } from "../../../domain/petManagementEntity/speciesEntity/species";
import { petMangementApi } from "../api/petMangementApi";

export const speciesApi = petMangementApi.injectEndpoints({
  endpoints: (build) => ({
    getSpecies: build.query<Species[], { pageNum: number; pageSize: number }>({
      query: ({ pageNum, pageSize }) => ({
        url: "Species/breeds/paged",
        params: { pageNum, pageSize },
      }),
      providesTags: ["PetMangement"],
      transformResponse: (data: { result: Species[] }) => data.result,
    }),
    createSpecies: build.mutation<void, { speciesName: string }>({
      query: (species) => ({
        url: "Species",
        method: "POST",
        body: species,
      }),
    }),
  }),
});

export const { useGetSpeciesQuery, useCreateSpeciesMutation } = speciesApi;
