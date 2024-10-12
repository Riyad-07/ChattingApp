// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//   name: "login",
//   initialState: {
//     login: JSON.parse(localStorage.getItem('user')) || null,
//   },
//   reducers: {
//     logInUser: (state, action) => {
//       state.login = action.payload;
//     },
//     logOutUser: (state) => {
//       state.login = null
//     }
//   },
// });

// export const { logInUser, logOutUser } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name:'login',
  initialState:{
    logIn: JSON.parse(localStorage.getItem('user')) || null
  },
  reducers:{
    logInUsers: (state, action)=> {
      state.logIn = action.payload
    },
    logOutUsers: (state) => {
      state.logIn = null
    }
  }
})

export const {logInUsers, logOutUsers} = loginSlice.actions

export default loginSlice.reducer
