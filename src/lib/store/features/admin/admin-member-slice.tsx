import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import axiosInstance from "@/utils/admin/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { AdminWorkspace } from "./admin-workspace-slice";

export interface AdminMember {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: string;
  verified: string;
  user: string;
  subscription: string;
  activeWorkspaces: AdminWorkspace[];
  createdAt: string;
  isActive: boolean;
  isBlocked: boolean;
}

interface MembersState {
  members: AdminMember[];
  loading: boolean;
  error: string | null;
}

const initialState: MembersState = {
  members: [],
  loading: false,
  error: null,
};

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.adminAuth.token;

    try {
      const response = await axiosInstance.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      const errMesg = axiosErrorCatch(error);
      return rejectWithValue(errMesg);
    }
  }
);

export const toggleBlockMember = createAsyncThunk(
  "members/toggleBlockMember",
  async (
    { memberId, isBlocked }: { memberId: string; isBlocked: boolean },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const token = state.adminAuth.token;

    const action = isBlocked ? "unblock" : "block";
    try {
      await axiosInstance.patch(
        `/admin/blockuser/${memberId}?action=${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { memberId, isBlocked: !isBlocked };
    } catch (error) {
      const errMesg = axiosErrorCatch(error);
      return rejectWithValue(errMesg);
    }
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch members";
      })
      .addCase(toggleBlockMember.fulfilled, (state, action) => {
        const { memberId, isBlocked } = action.payload;
        const memberIndex = state.members.findIndex(
          (member) => member._id === memberId
        );
        if (memberIndex !== -1) {
          state.members[memberIndex].isBlocked = isBlocked;
        }
      });
  },
});

export const selectMembers = (state: RootState) => state.adminMembers.members;
export const selectLoading = (state: RootState) => state.adminMembers.loading;
export const selectError = (state: RootState) => state.adminMembers.error;

export default membersSlice.reducer;
