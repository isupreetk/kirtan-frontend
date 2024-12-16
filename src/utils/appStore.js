import { configureStore } from "@reduxjs/toolkit";
import kirtansReducer from "./kirtansSlice"

const appStore = configureStore({
    reducer: kirtansReducer
})

export default appStore;