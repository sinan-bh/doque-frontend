import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

export type Message = {
  _id: string;
  messages: Array<{
    content: string;
    timestamp: string;
    _id: string;
    sender: {
      firstName: string;
      image: string;
      _id: string;
    };
  }>;
};

interface MessageState {
  messages: Message | null;
  error: boolean;
  isOnline: boolean;
}

const initialState: MessageState = {
  messages: null,
  error: false,
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
};

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async ({ workSpaceId }: { workSpaceId: string }, { rejectWithValue }) => {
    if (!workSpaceId) return rejectWithValue("Invalid data");

    try {
      const { data } = await axiosInstance.get(
        `/chat/workspaces/${workSpaceId}/messages`
      );
      return data.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        return null;
      }
      return rejectWithValue(err);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async ({ workSpaceId }: { workSpaceId: string }, { rejectWithValue }) => {
    if (!workSpaceId) return rejectWithValue("Invalid data");
    try {
      await axiosInstance.delete(`/chat/workspaces/${workSpaceId}/chat`);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    socketMessage(state, action) {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload || null;
        state.error = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { setOnlineStatus, socketMessage } = messageSlice.actions;
export default messageSlice.reducer;
