import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { AdminMember } from "./admin-member-slice";
import axiosInstance from "@/utils/admin/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

export interface Space {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminWorkspace {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  members: AdminMember[];
  spaces: Space[];
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

const initialState: WorkspaceState = {
  workspaces: [],
  loading: false,
  error: null,
};

export const selectWorkspaceById = (state: RootState, id: string) =>
  state.adminWorkspace.workspaces.find((workspace) => workspace._id === id);

export const fetchWorkspaces = createAsyncThunk<
  AdminWorkspace[],
  { page: number; limit: number },
  { state: RootState }
>(
  "workspaces/fetchWorkspaces",
  async ({ page, limit }, { getState, rejectWithValue }) => {
    const token = getState().adminAuth.token;

    try {
      const response = await axiosInstance.get(
        `/admin/workspaces?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.data;
    } catch (error) {
      const errMesg = axiosErrorCatch(error);
      return rejectWithValue(errMesg);
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
      const response = await axiosInstance.get(`/admin/workspace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      const errMes = axiosErrorCatch(error);
      return rejectWithValue(errMes);
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
export const selectWorkspaceError = (state: RootState) =>
  state.adminWorkspace.error;

export default workspaceSlice.reducer;
