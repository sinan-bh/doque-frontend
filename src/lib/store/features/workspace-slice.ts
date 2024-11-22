import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

export interface Project {
  _id: string;
  name: string;
  description: string;
  workspace: string;
}

export interface Member {
  user: string;
}

export interface Workspace {
  _id: string;
  spaces: [];
  createdAt: string;
  createdBy: string;
  name: string;
  members: {
    user: {
      _id: string;
    };
    status: string;
  }[];
}

export type Users = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  isActive: boolean;
};

interface WorkspaceState {
  workspaces: Workspace[];
  pendingWorkspaces: Workspace[];
  chosenDate: Date | string | number;
  projects: Project[] | null;
  workSpaceId: string;
  spaceId: string;
  users: Users[];
  user: "";
  allUsers: Users[];
  selectedProjectId: string | null;
  members: Member[];
  invitedMembers: Users[]
  loading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  workspaces: [],
  pendingWorkspaces: [],
  chosenDate: "",
  projects: null,
  workSpaceId: "",
  spaceId: "",
  user: "",
  selectedProjectId: null,
  users: [],
  allUsers: [],
  members: [],
  invitedMembers: [],
  loading: true,
  error: null,
};

type readyPage = {
  workSpaceId?: string;
  spaceId?: string;
  spaceName?: string;
  listName: {
    todo: string;
    doing: string;
    completed: string;
  };
};

export const fetchWorkspaceData = createAsyncThunk(
  "workspace/fetchWorkspaceData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/workspace");
      return data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch workspaces");
    }
  }
);

export const createWorkSpace = createAsyncThunk<
  string,
  { name: string; description?: string },
  { rejectValue: string }
>(
  "workspace/createWorkSpace",
  async (
    { name, description }: { name: string; description?: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/workspace", {
        name,
        description,
      });
      return data.data._id;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        return rejectWithValue("createWorkSpace not found");
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const createSpace = createAsyncThunk(
  "workspace/createSpace",
  async (
    { workSpaceId, spaceName }: { workSpaceId: string; spaceName: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `/space?workspaceId=${workSpaceId}`,
        { name: spaceName }
      );
      return data.data._id;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        return rejectWithValue("createSpace not found");
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const createList = createAsyncThunk(
  "workspace/createSpace",
  async ({ spaceId, listName }: readyPage, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/space/${spaceId}/lists`, {
        name: listName.todo,
        color: "#808080",
      });
      await axiosInstance.post(`/space/${spaceId}/lists`, {
        name: listName.doing,
        color: "#1591ea",
      });
      await axiosInstance.post(`/space/${spaceId}/lists`, {
        name: listName.completed,
        color: "#5ce65c",
      });
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        return rejectWithValue("createSpace not found");
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "workspace/fetchProjects",
  async ({ workSpaceId }: { workSpaceId: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/space?workspaceId=${workSpaceId}`
      );
      return data.data;
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError && error.response?.status === 404) {
        return rejectWithValue("Projects not found");
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const fetchWorkspaceMembers = createAsyncThunk(
  "workspace/fetchMembers",
  async ({ workSpaceId }: { workSpaceId: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/workspace/${workSpaceId}`);

      return data.data.members;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Failed to fetch members");
    }
  }
);

export const fetchUserProfiles = createAsyncThunk(
  "workspace/fetchUserProfiles",
  async ({ members }: { members: Member[] }, { rejectWithValue }) => {
    try {
      if (!Array.isArray(members) || members.length === 0) {
        return rejectWithValue("No members provided");
      }
      const userPromises = members.map((member) => {
        return axiosInstance.get(`/userprofile/${member.user}`);
      });
      const userResponses = await Promise.allSettled(userPromises);
      const fetchedUsers = userResponses
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value.data.data);
      const rejectedResponses = userResponses.filter(
        (result) => result.status === "rejected"
      );
      if (rejectedResponses.length > 0) {
        console.error("Some requests failed:", rejectedResponses);
      }
      return fetchedUsers;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch user profiles");
    }
  }
);

export const fetchInvitedMembers = createAsyncThunk(
  "workspace/fetchInvitedMembers",
  async ({workSpaceId}: {workSpaceId: string}, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`workspace/${workSpaceId}/invited-members`)      
      return data.data.members
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch invited members");
    }
  }
)

export const fetchAllUsers = createAsyncThunk(
  "workspace/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      // to fetch all users for invite suggestion
      const { data } = await axiosInstance.get("/userprofile");
      return data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch workspaces");
    }
  }
);

export const updateWorkspace = createAsyncThunk(
  "workspace/updateWorkspace",
  async (
    {
      workSpaceId,
      name,
      visibility,
      onError,
      onSuccess,
    }: {
      workSpaceId: string;
      name: string;
      visibility?: boolean;
      onError: (msg: string) => void;
      onSuccess: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.put(`/workspace/${workSpaceId}`, {
        name,
        visibility,
      });
      onSuccess();
      return { workSpaceId, name };
    } catch (error) {
      onError(axiosErrorCatch(error));
      return rejectWithValue("Failed to update workspace");
    }
  }
);

export const deleteWorkspace = createAsyncThunk(
  "workspace/deleteWorkspace",
  async (
    {
      workSpaceId,
      onError,
      onSuccess,
    }: {
      workSpaceId: string;
      onError: (msg: string) => void;
      onSuccess: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.delete(`/workspace/${workSpaceId}`);
      onSuccess();
      return workSpaceId;
    } catch (error) {
      onError(axiosErrorCatch(error));
      return rejectWithValue("Failed to delete workspace");
    }
  }
);

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setChosenDate: (state, action: PayloadAction<Date | string | number>) => {
      state.chosenDate = action.payload;
    },
    setWorkSpaceId: (state, action: PayloadAction<string>) => {
      state.workSpaceId = action.payload;
    },
    setSelectedProjectId: (state, action: PayloadAction<string | null>) => {
      state.selectedProjectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceData.fulfilled, (state, action) => {
        state.workspaces = action.payload?.activeWorkspaces || [];
        state.pendingWorkspaces = action.payload?.pendingWorkspaces || [];
        state.loading = false;
      })
      .addCase(fetchWorkspaceData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(fetchWorkspaceMembers.fulfilled, (state, action) => {
        state.members = action.payload;
      })
      .addCase(fetchUserProfiles.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(createWorkSpace.fulfilled, (state, action) => {
        state.workSpaceId = action.payload;
      })
      .addCase(createSpace.fulfilled, (state, action) => {
        state.spaceId = action.payload;
      })
      .addCase(fetchInvitedMembers.fulfilled, (state, action) => {
        state.invitedMembers = action.payload
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        state.workspaces =
          state.workspaces?.filter(
            (workspace) => workspace._id !== action.payload
          ) || null;
      })
      .addCase(updateWorkspace.fulfilled, (state, action) => {
        state.workspaces =
          state.workspaces?.map((workspace) => {
            if (workspace._id === action.payload.workSpaceId) {
              return { ...workspace, name: action.payload.name };
            }
            return workspace;
          }) || null;
      });
  },
});

export const { setChosenDate, setWorkSpaceId, setSelectedProjectId } =
  workspaceSlice.actions;
export default workspaceSlice.reducer;
