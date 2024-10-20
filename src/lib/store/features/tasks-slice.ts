import { Column, Space, TaskRow } from "@/types/spaces";
import { createSlice } from "@reduxjs/toolkit";
import {
  createList,
  createTask,
  deleteList,
  deleteTask,
  getSpace,
  updateList,
  updateTask,
} from "../thunks/tasks-thunks";

interface TasksState {
  tasks: TaskRow[];
  currentSpace: Space | null;
  lists: Column[];
  loading: {
    getSpaceDetails: boolean;
    createList: boolean;
    updateList: boolean;
    deleteList: boolean;
    getTasks: boolean;
    updateTask: boolean;
    deleteTask: boolean;
    createTask: boolean;
  };
  error: {
    getSpaceDetails: string | null;
    createList: string | null;
    updateList: string | null;
    deleteList: string | null;
    getTasks: string | null;
    updateTask: string | null;
    deleteTask: string | null;
    createTask: string | null;
  };
}

const initialState: TasksState = {
  tasks: [],
  currentSpace: null,
  lists: [],
  loading: {
    getSpaceDetails: false,
    createList: false,
    updateList: false,
    deleteList: false,
    getTasks: false,
    updateTask: false,
    deleteTask: false,
    createTask: false,
  },
  error: {
    getSpaceDetails: null,
    createList: null,
    updateList: null,
    deleteList: null,
    getTasks: null,
    updateTask: null,
    deleteTask: null,
    createTask: null,
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Get space
      .addCase(getSpace.pending, (state) => {
        state.loading.getSpaceDetails = true;
        state.error.getSpaceDetails = null;
      })
      .addCase(getSpace.fulfilled, (state, action) => {
        state.lists = action.payload.lists;
        state.tasks = action.payload.tasks;
        state.loading.getSpaceDetails = false;
      })
      .addCase(getSpace.rejected, (state, action) => {
        state.loading.getSpaceDetails = false;
        state.error.getSpaceDetails = action.payload as string;
      })

      // Create list
      .addCase(createList.pending, (state) => {
        state.loading.createList = true;
        state.error.createList = null;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.lists.push(action.payload.newList);
        state.loading.createList = false;
      })
      .addCase(createList.rejected, (state, action) => {
        state.loading.createList = false;
        state.error.createList = action.payload as string;
      })

      // delete list
      .addCase(deleteList.pending, (state) => {
        state.loading.deleteList = true;
        state.error.deleteList = null;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(
          (list) => list.id !== action.payload.listId
        );
        state.loading.deleteList = false;
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.loading.deleteList = false;
        state.error.deleteList = action.payload as string;
      })

      // update list
      .addCase(updateList.pending, (state) => {
        state.loading.updateList = true;
        state.error.updateList = null;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.lists.findIndex(
          (list) => list.id === action.payload.listId
        );
        state.lists[index] = {
          ...state.lists[index],
          title: action.payload.listData.name || state.lists[index].title,
          color: action.payload.listData.color || state.lists[index].color,
        };
        state.loading.updateList = false;
      })
      .addCase(updateList.rejected, (state, action) => {
        state.loading.updateList = false;
        state.error.updateList = action.payload as string;
      })

      // create task
      .addCase(createTask.pending, (state) => {
        state.loading.createTask = true;
        state.error.createTask = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.task);
        state.loading.createTask = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading.createTask = false;
        state.error.createTask = action.payload as string;
      })

      // update task
      .addCase(updateTask.pending, (state) => {
        state.loading.updateTask = true;
        state.error.updateTask = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.taskId
        );
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.taskData,
        };
        state.loading.updateTask = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading.updateTask = false;
        state.error.updateTask = action.payload as string;
      })

      // delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading.deleteTask = true;
        state.error.deleteTask = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.taskId
        );
        state.loading.deleteTask = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading.deleteTask = false;
        state.error.deleteTask = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
