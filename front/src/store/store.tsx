import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { petMangementApi } from "../modules/petManagementService/api/petMangementApi";
import speciesReducer from "../modules/petManagementService/speciesEntity/species.slice";

export const store = configureStore({
    reducer:{
        [petMangementApi.reducerPath]: petMangementApi.reducer,
         species: speciesReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petMangementApi.middleware)
});
  
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppStore = useStore.withTypes<typeof store>()
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 