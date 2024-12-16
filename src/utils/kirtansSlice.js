import { createSlice } from "@reduxjs/toolkit";

const kirtansSlice = createSlice({
    name: "kirtans",
    initialState: [],
    reducers: {
        getAllKirtans : (state, action) => {
            return action.payload
        }
    }})

    export const {getAllKirtans} = kirtansSlice.actions;
    export default kirtansSlice.reducer;