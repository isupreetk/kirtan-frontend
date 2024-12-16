import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: "",
    reducers: {
        getSearchInput : (state, action) => {
            return action.payload;
        }
    }
});

export const {getSearchInput} = searchSlice.actions;
export default searchSlice.reducer;