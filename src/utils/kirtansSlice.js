import { createSlice } from "@reduxjs/toolkit";

const kirtansSlice = createSlice({
    name: "kirtans",
    initialState: {
        allKirtans: null,
        displayKirtans: null,
    },
    reducers: {
        getAllKirtans : (state, action) => {
            state.allKirtans = action.payload;
        }
    }})

    export const {getAllKirtans} = kirtansSlice.actions;
    export default kirtansSlice.reducer;