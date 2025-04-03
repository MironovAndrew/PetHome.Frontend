import { baseApi } from "../../shared/api";
import { Species } from "./species.slice";

export const speciesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSpecies: build.query<Species[], { pageNum: number, pageSize: number }>({
            query: ({pageNum, pageSize}) => ({
                url:"Species/breeds/paged",
                params: {pageNum, pageSize}}),
                providesTags: ["Species"],
                transformResponse: (data: { result: Species[] }) => data.result,
        }),
        createSpecies: build.mutation<void, {speciesName: string}>({
            query: (species) => ({
                url: "Species",
                method: "POST",
                body: species,
            })
        })
    }) 
});

export const {useGetSpeciesQuery, useCreateSpeciesMutation} = speciesApi;