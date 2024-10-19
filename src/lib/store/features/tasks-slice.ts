import { Column, Space, TaskRow } from "@/types/spaces";
import { createSlice } from "@reduxjs/toolkit";

interface TasksState {
  tasks: TaskRow[];
  currentSpace: Space | null;
  lists: Column[];
  loading: {
    getSpaces: boolean;
    createSpace: boolean;
    updateSpace: boolean;
    deleteSpace: boolean;
    getTasks: boolean;
    updateTask: boolean;
    deleteTask: boolean;
    createTask: boolean;
  };
  error: {
    getSpaces: string | null;
    createSpace: string | null;
    updateSpace: string | null;
    deleteSpace: string | null;
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
    getSpaces: false,
    createSpace: false,
    updateSpace: false,
    deleteSpace: false,
    getTasks: false,
    updateTask: false,
    deleteTask: false,
    createTask: false,
  },
  error: {
    getSpaces: null,
    createSpace: null,
    updateSpace: null,
    deleteSpace: null,
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
  extraReducers(builder) {},
});

export default tasksSlice.reducer;
