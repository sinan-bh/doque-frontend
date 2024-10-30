import axiosInstance from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Task = {
  _id: string;
  title: string;
  listId: string;
  spaceId: string;
  dueDate: string;
  priority: string;
};

type Space = {
  _id: string;
  name: string;
  lists: string[];
};

type List = {
  _id: string;
  title: string;
};

type CalendarState = {
  allTasks: Task[];
  allSpaces: Space[];
  allLists: List[];
  loading: boolean;
  error: string | null;
};

const initialState: CalendarState = {
  allTasks: [],
  allSpaces: [],
  allLists: [],
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCalendarData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCalendarData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allTasks = payload.tasks;
      state.allLists = payload.lists;
      state.allSpaces = payload.spaces;
    });
    builder.addCase(fetchCalendarData.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export const fetchCalendarData = createAsyncThunk(
  "calendar/fetchCalendarData",
  async ({ workSpaceId }: { workSpaceId: string }, { rejectWithValue }) => {
    try {
      const lists = [];
      const tasks = [];
      const { data } = await axiosInstance(`/space?workspaceId=${workSpaceId}`);
      for (const space of data.data) {
        for (const list of space.lists) {
          lists.push({
            _id: list._id,
            title: list.name,
          });
          for (const task of list.tasks) {
            tasks.push({
              _id: task._id,
              title: task.title,
              listId: list._id,
              spaceId: space._id,
              dueDate: task.dueDate,
              priority: task.priority,
            });
          }
        }
      }
      return { lists, tasks, spaces: data.data };
    } catch (error) {
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);

export default calendarSlice.reducer;
