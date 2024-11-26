import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import axiosInstance from "@/utils/admin/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

export interface AdminSubscription {
  _id: string;
  amount: number;
  currency: string;
  status: string;
  userId: string;
  subscription: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionState {
  subscriptions: AdminSubscription[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  loading: false,
  error: null,
};

export const fetchSubscriptions = createAsyncThunk<AdminSubscription[]>(
  "subscriptions/fetchSubscriptions",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.adminAuth.token;

    try {
      const response = await axiosInstance.get("/admin/subscription", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res:", response.data.data);
      return response.data.data;
    } catch (error) {
      const errMesg = axiosErrorCatch(error);
      return rejectWithValue(errMesg);
    }
  }
);

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch subscriptions";
      });
  },
});

export const selectSubscriptions = (state: RootState) =>
  state.adminSubscriptions.subscriptions;
export const selectSubscriptionLoading = (state: RootState) =>
  state.adminSubscriptions.loading;
export const selectSubscriptionError = (state: RootState) =>
  state.adminSubscriptions.error;

export default subscriptionsSlice.reducer;
