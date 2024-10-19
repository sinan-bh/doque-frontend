import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import AxiosInstance from "@/utils/axios";

interface Project {
  _id: string;
  name: string;
  description: string;
  workspace: string;
}

interface Member {
  user: string;
}

interface Workspace {
  WorkspaceId: string;
  name: string;
}

export type Users = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  isActive: boolean;
};

interface WorkspaceState {
  chosenDate: Date | string | number;
  projects: Project[] | null;
  workSpaceId: string;
  spaceId: string;
  users: Users[];
  workSpace: Workspace[];
  members: Member[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  chosenDate: "",
  projects: null,
  workSpaceId: "",
  spaceId: "",
  users: [],
  workSpace: [],
  members: [],
  loading: false,
  error: null,
};

type readyPage = {
  workSpaceId: string;
  spaceName: string;
  listName: {
    todo: string;
    doing: string;
    completed: string;
  };
};

export const fetchWorkspaceData = createAsyncThunk(
  "workspace/fetchWorkspaceData",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.get(
        "https://daily-grid-rest-api.onrender.com/api/workspace",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch workspaces");
    }
  }
);

export const createWorkSpace = createAsyncThunk<
  string,
  { previousSpaceName: string },
  { rejectValue: string }
>(
  "workspace/createWorkSpace",
  async (
    { previousSpaceName }: { previousSpaceName: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await AxiosInstance.post(
        "https://daily-grid-rest-api.onrender.com/api/workspace",
        { name: previousSpaceName }
      );
      return data.data._id;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        return rejectWithValue("createWorkSpace not found");
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const onReadyPage = createAsyncThunk(
  "workspace/onReadyPage",
  async (
    { workSpaceId, spaceName, listName }: readyPage,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await AxiosInstance.post(
        `https://daily-grid-rest-api.onrender.com/api/space?workspaceId=${workSpaceId}`,
        { name: spaceName }
      );
      const spaceId = data.data._id;
      await AxiosInstance.post(
        `https://daily-grid-rest-api.onrender.com/api/space/${spaceId}/lists`,
        { name: listName.todo }
      );
      await AxiosInstance.post(
        `https://daily-grid-rest-api.onrender.com/api/space/${spaceId}/lists`,
        { name: listName.doing }
      );
      await AxiosInstance.post(
        `https://daily-grid-rest-api.onrender.com/api/space/${spaceId}/lists`,
        { name: listName.completed }
      );
      return spaceId;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        return rejectWithValue("onReadyPage not found");
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "workspace/fetchProjects",
  async (
    { token, workSpaceId }: { token: string; workSpaceId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await AxiosInstance.get(
        `https://daily-grid-rest-api.onrender.com/api/space?workspaceId=${workSpaceId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.data;
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError && error.response?.status === 404) {
        return rejectWithValue("Projects not found");
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const fetchWorkspaceMembers = createAsyncThunk(
  "workspace/fetchMembers",
  async (
    { token, workSpaceId }: { token: string; workSpaceId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await AxiosInstance.get(
        `https://daily-grid-rest-api.onrender.com/api/workspace/${workSpaceId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.data.members;
    } catch (error) {
      console.log(error);

      return rejectWithValue("Failed to fetch members");
    }
  }
);

export const fetchUserProfiles = createAsyncThunk(
  "workspace/fetchUserProfiles",
  async (
    { token, members }: { token: string; members: Member[] },
    { rejectWithValue }
  ) => {
    try {
      const userPromises = members.map((member) => {
        return AxiosInstance.get(
          `https://daily-grid-rest-api.onrender.com/api/userprofile/${member.user}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      });
      const userResponses = await Promise.all(userPromises);
      const fetchedUsers = userResponses.map((resp) => resp.data.data);
      return fetchedUsers;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch user profiles");
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceData.fulfilled, (state, action) => {
        state.workSpace = action.payload;
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
      .addCase(onReadyPage.fulfilled, (state, action) => {
        state.spaceId = action.payload;
      });
  },
});

export const { setChosenDate, setWorkSpaceId } = workspaceSlice.actions;
export default workspaceSlice.reducer;
