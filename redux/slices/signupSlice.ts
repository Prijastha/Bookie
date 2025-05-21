import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
};
type SignUpState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean | null;
  error: string | null;
};
const initialState: SignUpState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
const signupSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const { signupStart, signupSuccess, signupFailure, logout } =
  signupSlice.actions;
export default signupSlice.reducer;
