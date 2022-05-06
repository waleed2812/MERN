import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    user_data: JSON.parse(localStorage.getItem("user_data")),
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user_data")
      state.user_data = null;
    },
    login: (state, action) => {
      localStorage.setItem("user_data", JSON.stringify(action.payload));
      state.user_data = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { logout, login } = counterSlice.actions
export const authReducer = counterSlice.reducer;
export default authReducer;