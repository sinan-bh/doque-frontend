import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

// Fetch Spaces Data Thunk
export const fetchSpacesData = createAsyncThunk(
  "space/fetchSpacesData",
  async (workSpaceId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/space?workspaceId=${workSpaceId}`
      );
      return data.data;
    } catch (error) {
      const errorMsg = axiosErrorCatch(error);
      return rejectWithValue(errorMsg);
    }
  }
);
