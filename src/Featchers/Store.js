import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import Active, { activeUser } from "./slice/Active";

const store = configureStore({
    reducer:{
        login: userSlice,
        Active: Active,
    }
})

export default store