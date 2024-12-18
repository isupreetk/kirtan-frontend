import { createSlice } from "@reduxjs/toolkit";

const displaySlice = createSlice({
    name: "display",
    initialState: {
        inputSearchString: "",
        displayKirtans: [],
    },
    reducers: {
        setSearchString: (state, action) => {
            state.inputSearchString = action.payload;
        },

        handleInputSearch: (state, action) => {
            if (action.payload.inputSearchString !== "") {
                let searchMatchKirtans = action.payload.allKirtans.filter((kirtan) => kirtan.Title.includes(action.payload.inputSearchString))
                state.displayKirtans = searchMatchKirtans;
            }
            else {
                 state.displayKirtans = action.payload.allKirtans.slice(0,500);
            }

        }
    }
})

export const { setSearchString, handleInputSearch } = displaySlice.actions;
export default displaySlice.reducer;