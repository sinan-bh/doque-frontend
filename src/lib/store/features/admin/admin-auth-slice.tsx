import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import type { AxiosError } from "axios";
import axiosInstance from "@/utils/admin/axios";
import Cookies from "js-cookie";

interface AdminState {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AdminState = {
  token: Cookies.get("adminToken")
    ? // biome-ignore lint/style/noNonNullAssertion: <explanation>
      JSON.parse(Cookies.get("adminToken")!).token
    : null,
  isAuthenticated: !!Cookies.get("adminToken"),
  error: null,
};

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
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      Cookies.set(
        "adminToken",
        JSON.stringify({ token: response.data.message }),
        {
          expires: expirationDate,
        }
      );

      return response.data;
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
