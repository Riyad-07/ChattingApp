import { createSlice } from "@reduxjs/toolkit";

export const Active = createSlice({
    name: 'single',
    initialState: {
        active: JSON.parse(localStorage.getItem('active'))
    },
    reducers:{
        activeUser : (state, action) => {
            state.active = action.payload
        }
    }
})


export const {activeUser} = Active.actions
export default Active.reducer