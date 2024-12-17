import { createSlice } from "@reduxjs/toolkit";

const kirtansSlice = createSlice({
    name: "kirtans",
    initialState: {
        allKirtans: [],
        displayKirtans: [],
    },
    reducers: {
        getAllKirtans : (state, action) => {
            state.allKirtans = action.payload;
        },
        editScore: (state,action) => {
            state.allKirtans[2].Score = "123" 
        }
    }})

    export const {getAllKirtans, editScore} = kirtansSlice.actions;
    export default kirtansSlice.reducer;