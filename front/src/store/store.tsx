import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import speciesReducer from "../modules/petManagement/species.slice";
import { baseApi } from "../shared/api";

export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]: baseApi.reducer,
         species: speciesReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
});
  
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppStore = useStore.withTypes<typeof store>()
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 