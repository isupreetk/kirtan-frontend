import { configureStore } from "@reduxjs/toolkit";
import kirtansReducer from "./kirtansSlice";
import searchReducer from "./searchSlice";
import filterReducer from "./filterSlice";

const appStore = configureStore({
    reducer: {
        kirtans: kirtansReducer,
        search: searchReducer,
        filters: filterReducer,
    }
})

export default appStore;