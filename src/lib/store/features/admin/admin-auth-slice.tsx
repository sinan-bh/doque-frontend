import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface AdminState {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AdminState = {
  token: Cookies.get("adminToken")
    ? JSON.parse(Cookies.get("adminToken")!).token
    : null,
  isAuthenticated: !!Cookies.get("adminToken"),
  error: null,
};

const axiosInstance = axios.create({
  baseURL: "https://daily-grid-rest-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenData = Cookies.get("adminToken");
    const token = tokenData ? JSON.parse(tokenData).token : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = createAsyncThunk(
  "admin/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/admin/adminlogin", {
        email,
        password,
      });

      const { data } = response;
      Cookies.set(
        "adminToken",
        JSON.stringify({
          token: data.data,
        }),
        { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
      );

      return data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data) {
        return rejectWithValue(
          axiosError.response.data.message || "Invalid email or password"
        );
      }
      return rejectWithValue(
        `An error occurred during login: ${axiosError.message}`
      );
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
      Cookies.remove("adminToken");
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
