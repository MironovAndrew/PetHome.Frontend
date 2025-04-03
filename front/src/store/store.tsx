import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import speciesReducer from "../modules/petManagement/species.slice";

export const store = configureStore({
    reducer:{
         species: speciesReducer
    }
});
  
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppStore = useStore.withTypes<typeof store>()
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 