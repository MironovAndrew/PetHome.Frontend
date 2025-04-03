import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/react";

export type Species = {
    id:string
    name:string
    breeds:string[]
    // photoPath:string
    // desc:string
    // age:number
    // gender:string
    // isVaccinated:boolean
};
  
export type SpeciesState = {
    species: Species[];
    speciesState: "idle" | "pending" | "succeeded" | "failed";
};

export const getSpecies = createAsyncThunk<Species[]>(
    "species/fetchSpecies",
    async(_, {rejectWithValue})=>{
        const response = await fetch("http://localhost:5553/api/Species/breeds/paged?PageNum=1&PageSize=11")
        const data = await response.json()
        if(response.status <200 || response.status >= 300){
            return rejectWithValue(data)
        }
        return data.result;
});

const initialState: SpeciesState = {
    species: [],
    speciesState: "idle"
};

export const speciesSlice = createSlice({
    name: "pets",
    initialState,
    reducers:{
        // setSpecies:(state,{payload}: PayloadAction<Species[]>)=>{
        //     state.species = payload
        // }
    },
    extraReducers:(builder) =>{
        builder.addCase(getSpecies.pending, (state) => {
            state.speciesState = "pending";
        });
        builder.addCase(getSpecies.fulfilled, (state, action) => {
            state.species = action.payload;
            state.speciesState = "succeeded";
        });
        builder.addCase(getSpecies.rejected, (state) => {
            state.speciesState = "failed";
        });
    }
});

export default speciesSlice.reducer;
// export const {setSpecies} = speciesSlice.actions;