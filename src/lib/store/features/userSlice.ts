import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axios";

interface UserProfile {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  activeWorkspace?: [];
  description?: string;
  name?: string;
  phoneNumber: string;
  subscription?: string;
}

interface UserState {
  loggedUser: { email: string; id: string; token: string } | null;
  loading: boolean;
  userProfile: UserProfile | null;
  workspaceUser: UserProfile | null;
  error: string | null;
  successMessage: string | null;
  forgetEmail: string | null;
  setForgetEmail: string | null;
  subscription: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignedTasks: { data: any[] };
}

const initialState: UserState = {
  loggedUser: null,
  loading: false,
  userProfile: null,
  workspaceUser: null,
  error: null,
  successMessage: null,
  forgetEmail: null,
  setForgetEmail: null,
  subscription: null,
  assignedTasks: { data: [] },
};

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.post("/auth/login", credentials);
      const { data } = response;
      const userData = data.data;

      Cookies.set(
        "user",
        JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          token: userData.token,
          id: userData.userId,
        }),
        { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Login failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const userDetails = Cookies.get("user");
    const user = JSON.parse(userDetails || "");
    try {
      const response = await Instance.get(`/userprofile/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message:
            error.response?.data.message || "Failed to fetch user profile",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Fetch Workspace User
export const fetchWorkspaceUser = createAsyncThunk(
  "user/fetchWorkspaceUser",
  async ({ userId }: { userId: string | undefined }, { rejectWithValue }) => {
    const userDetails = Cookies.get("user");
    const user = JSON.parse(userDetails || "");
    try {
      const response = await Instance.get(`/userprofile/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message:
            error.response?.data.message || "Failed to fetch user profile",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    { id, userData }: { id: string | undefined; userData: UserProfile },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/userprofile/${id}`, userData);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Update failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Signup User
export const signup = createAsyncThunk(
  "user/signup",
  async (
    userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      image: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Signup failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string | null, { rejectWithValue }) => {
    try {
      const response = await Instance.post("/auth/forgotpassword", { email });
      return {
        message:
          response.data.message ||
          "Password reset link has been sent to your email.",
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message:
            error.response?.data.message || "Forgot Password Request failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    { token, newPassword }: { token: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.patch(`/auth/resetpassword/${token}`, {
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Reset Password failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.post("/auth/verifyotp", { email, otp });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "OTP Verification failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

//resend otp
export const resendOtp = createAsyncThunk(
  "user/resendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await Instance.post("/auth/resendotp", { email });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "OTP Resend failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

export const assignedTask = createAsyncThunk(
  "user/assignedTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `userprofile/${id}/assigned-tasks`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.response?.data.message || "Task fetch failed",
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("user");
      state.loggedUser = null;
      state.userProfile = null;
      state.successMessage = null;
      state.forgetEmail = null;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
    setForgetEmail: (state, action) => {
      state.forgetEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedUser = {
          email: action.payload.email,
          id: action.payload._id,
          token: action.payload.token,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message || "Login failed";
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          "Fetch user profile failed";
      })
      .addCase(fetchWorkspaceUser.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaceUser = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkspaceUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          "Fetch user profile failed";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.error = null;
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message || "Update failed";
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.successMessage = action.payload.message || "Signup successful!";
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message || "Signup failed";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message ||
          "Forgot Password Request failed";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.successMessage = "Password reset successfully!";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message ||
          "Reset Password failed";
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.successMessage = "OTP verified successfully!";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message ||
          "OTP verification failed";
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.successMessage = "OTP resented successfully!";
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message ||
          "Resend OTP failed";
      })
      .addCase(assignedTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignedTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.assignedTasks = action.payload;
      })
      .addCase(assignedTask.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message ||
          "Failed to fetch assigned tasks";
      });
  },
});

export const {
  logout,
  setLoading,
  setUserProfile,
  clearMessages,
  setForgetEmail,
} = userSlice.actions;

export default userSlice.reducer;
