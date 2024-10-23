import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";

interface AdminState {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AdminState = {
  token: localStorage.getItem("adminToken"),
  isAuthenticated: !!localStorage.getItem("adminToken"),
  error: null,
};

export const login = createAsyncThunk(
  "admin/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        "https://daily-grid-rest-api.onrender.com/api/admin/adminlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.data);
        return data.data;
      } else {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Invalid email or password"
        );
      }
    } catch (error) {
      return rejectWithValue(`An error occurred during login ${error}`);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = adminAuthSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.adminAuth.isAuthenticated;
export const selectError = (state: RootState) => state.adminAuth.error;

export default adminAuthSlice.reducer;
