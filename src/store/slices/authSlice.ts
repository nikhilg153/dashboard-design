import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface AuthState {
  email: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: "",
  loading: false,
  error: null,
};

interface LoginResponse {
  success: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk<LoginResponse, LoginCredentials>(
  "auth/login",
  async (credentials: LoginCredentials) => {
    // Mock API call
    const { email, password } = credentials;
    if (email === "test@gmail.com" && password === "password123") {
      return { success: true };
    } else {
      throw new Error("Invalid credentials");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action.meta.arg.email;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default authSlice.reducer;
