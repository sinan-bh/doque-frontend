import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";

export interface AdminMember {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: string;
  user: string;
  subscription: string;
  activeWorkspace: string;
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
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.adminAuth.token;
    

    const response = await fetch(
      "https://daily-grid-rest-api.onrender.com/api/admin/users",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }

    const data = await response.json();

    return data.data;
  }
);

export const toggleBlockMember = createAsyncThunk(
  "members/toggleBlockMember",
  async (
    { memberId, isBlocked }: { memberId: string; isBlocked: boolean },
    { getState }
  ) => {
    const state = getState() as RootState;
    const token = state.adminAuth.token;

    const action = isBlocked ? "unblock" : "block";

    const response = await fetch(
      `https://daily-grid-rest-api.onrender.com/api/admin/userblock/${memberId}?action=${action}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to block/unblock member");
    }

    return { memberId, isBlocked: !isBlocked };
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
