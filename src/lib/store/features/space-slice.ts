import { Column, Space, TaskRow } from "@/types/spaces";
import { createSlice } from "@reduxjs/toolkit";
import {
  createSpace,
  deleteSpaceData,
  fetchSpacesData,
  updateSpaceData,
} from "../api/space-api";

interface SpaceState {
  spaces: Space[];
  currentSpace: Space | null;
  tasks: TaskRow[];
  lists: Column[];
  loadingSpaces: {
    getSpaces: boolean;
    updateSpace: boolean;
    deleteSpace: boolean;
    createSpace: boolean;
  };

  loadingTasks: {
    getSpace: boolean;
    updateList: boolean;
    createList: boolean;
    removeList: boolean;
    createTask: boolean;
    moveTask: boolean;
    removeTask: boolean;
    updateTask: boolean;
  };

  error: {
    getSpaces: string | null;
    updateSpace: string | null;
    deleteSpace: string | null;
    createSpace: string | null;
    getSpace: string | null;
    updateList: string | null;
    createList: string | null;
    removeList: string | null;
    createTask: string | null;
    moveTask: string | null;
    removeTask: string | null;
    updateTask: string | null;
  };
}

const initialState: SpaceState = {
  spaces: [],
  currentSpace: null,
  tasks: [],
  lists: [],
  loadingSpaces: {
    getSpaces: false,
    updateSpace: false,
    deleteSpace: false,
    createSpace: false,
  },
  loadingTasks: {
    getSpace: false,
    updateList: false,
    createList: false,
    removeList: false,
    createTask: false,
    moveTask: false,
    removeTask: false,
    updateTask: false,
  },
  error: {
    getSpaces: null,
    updateSpace: null,
    deleteSpace: null,
    createSpace: null,
    getSpace: null,
    updateList: null,
    createList: null,
    removeList: null,
    createTask: null,
    moveTask: null,
    removeTask: null,
    updateTask: null,
  },
};

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get space
      .addCase(fetchSpacesData.pending, (state) => {
        state.loadingSpaces.getSpaces = true;
        state.error.getSpaces = null;
      })
      .addCase(fetchSpacesData.fulfilled, (state, action) => {
        state.spaces = action.payload;
        state.loadingSpaces.getSpaces = false;
      })
      .addCase(fetchSpacesData.rejected, (state, action) => {
        state.loadingSpaces.getSpaces = false;
        state.error.getSpaces = action.payload as string;
      })

      // Update space
      .addCase(updateSpaceData.pending, (state) => {
        state.loadingSpaces.updateSpace = true;
        state.error.updateSpace = null;
      })
      .addCase(updateSpaceData.fulfilled, (state, action) => {
        state.loadingSpaces.updateSpace = false;
        state.spaces = state.spaces.map((space) =>
          space._id === action.payload._id
            ? {
                ...space,
                name: action.payload.spaceData.name,
                description: action.payload.spaceData.description,
              }
            : space
        );
      })
      .addCase(updateSpaceData.rejected, (state, action) => {
        state.loadingSpaces.updateSpace = false;
        state.error.updateSpace = action.payload as string;
      })

      // Delete space
      .addCase(deleteSpaceData.pending, (state) => {
        state.loadingSpaces.deleteSpace = true;
        state.error.deleteSpace = null;
      })
      .addCase(deleteSpaceData.fulfilled, (state, action) => {
        state.loadingSpaces.deleteSpace = false;
        state.spaces = state.spaces.filter(
          (space) => space._id !== action.payload
        );
      })
      .addCase(deleteSpaceData.rejected, (state, action) => {
        state.loadingSpaces.deleteSpace = false;
        state.error.deleteSpace = action.payload as string;
      })

      // create space
      .addCase(createSpace.pending, (state) => {
        state.loadingSpaces.createSpace = true;
        state.error.createSpace = null;
      })
      .addCase(createSpace.fulfilled, (state, action) => {
        state.spaces.push(action.payload);
        state.loadingSpaces.createSpace = false;
      })
      .addCase(createSpace.rejected, (state, action) => {
        state.loadingSpaces.createSpace = false;
        state.error.createSpace = action.payload as string;
      });
  },
});

export default spaceSlice.reducer;
