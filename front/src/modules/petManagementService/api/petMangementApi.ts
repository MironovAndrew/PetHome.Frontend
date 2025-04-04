import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5553/api";

export const petMangementApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        //Для передачи вложенных объектов
    }),
    //Инвалидация кэша
    tagTypes: ["PetMangement"],
    endpoints: ()=>({})
});