import { createSlice } from "@reduxjs/toolkit";
import { APIManager } from "../../config";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    user_data: JSON.parse(localStorage.getItem("user_data")),
  },
  reducers: {
    logout: (state) => {
      new APIManager().logout();
      localStorage.removeItem("user_data");
      localStorage.removeItem("session");
      state.user_data = null;
    },
    login: (state, action) => {
      if (!!action.payload) {
        console.log('action.payload', action.payload)
        localStorage.setItem("user_data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("session", JSON.stringify(action?.payload?.session));
        state.user_data = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, login } = counterSlice.actions;
export const authReducer = counterSlice.reducer;
export default authReducer;
