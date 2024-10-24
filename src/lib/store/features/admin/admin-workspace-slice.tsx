import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../index";
import { AdminMember } from "./admin-member-slice";

export interface AdminWorkspace {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  members: AdminMember[];
  space: string[];
  visibility: string;
  isActive: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
}

interface WorkspaceState {
  workspaces: AdminWorkspace[];
  loading: boolean;
  error: string | null;
}

interface ErrorResponse {
  message: string;
}

const initialState: WorkspaceState = {
  workspaces: [],
  loading: false,
  error: null,
};

export const fetchWorkspaces = createAsyncThunk<
  AdminWorkspace[],
  { page: number; limit: number },
  { state: RootState }
>(
  "workspaces/fetchWorkspaces",
  async ({ page, limit }, { getState, rejectWithValue }) => {
    const token = getState().adminAuth.token;

    try {
      const response = await axios.get(
        `https://daily-grid-rest-api.onrender.com/api/admin/workspace?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Failed to fetch workspaces"
      );
    }
  }
);

export const fetchWorkspaceDetails = createAsyncThunk<
  AdminWorkspace,
  string,
  { state: RootState }
>(
  "workspaces/fetchWorkspaceDetails",
  async (id, { getState, rejectWithValue }) => {
    const token = getState().adminAuth.token;

    try {
      const response = await axios.get(
        `https://daily-grid-rest-api.onrender.com/api/admin/workspace/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Failed to fetch workspace details"
      );
    }
  }
);

const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        console.log("action.payload");
        
        state.loading = false;
        state.workspaces = action.payload;
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      .addCase(fetchWorkspaceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceDetails.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.workspaces.findIndex(
          (w) => w._id === action.payload._id
        );
        if (existingIndex >= 0) {
          state.workspaces[existingIndex] = action.payload;
        } else {
          state.workspaces.push(action.payload);
        }
      })
      .addCase(fetchWorkspaceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectWorkspaces = (state: RootState) =>
  state.adminWorkspace.workspaces;
export const selectWorkspaceLoading = (state: RootState) =>
  state.adminWorkspace.loading;
export const selectWorkspaceError = (state: RootState) => state.adminWorkspace.error;

export default workspaceSlice.reducer;
