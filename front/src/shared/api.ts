import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5553/api";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    //Инвалидация кэша
    tagTypes: ["Species"],
    endpoints: ()=>({})
});