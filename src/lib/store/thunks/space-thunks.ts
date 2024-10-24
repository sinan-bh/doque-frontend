import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

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

export const createSpace = createAsyncThunk(
  "space/createSpace",
  async (
    {
      workspaceId,
      spaceData,
      onSuccess,
    }: {
      workspaceId: string;
      spaceData: { name: string; description: string };
      onSuccess: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `/space?workspaceId=${workspaceId}`,
        spaceData
      );
      onSuccess();
      return data.data;
    } catch (error) {
      const errorMsg = axiosErrorCatch(error);
      return rejectWithValue(errorMsg);
    }
  }
);

export const updateSpaceData = createAsyncThunk(
  "space/updateSpaceData",
  async (
    {
      spaceId,
      spaceData,
      onSuccess,
    }: {
      spaceId: string;
      spaceData: { name: string; description: string };
      onSuccess: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.put(`/space/${spaceId}`, spaceData);
      onSuccess();
      return { _id: spaceId, spaceData };
    } catch (error) {
      const errorMsg = axiosErrorCatch(error);
      return rejectWithValue(errorMsg);
    }
  }
);

export const deleteSpaceData = createAsyncThunk(
  "space/deleteSpaceData",
  async (
    {
      spaceId,
      onSuccess,
    }: {
      spaceId: string;
      onSuccess: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.delete(`/space/${spaceId}`);
      onSuccess();
      return spaceId;
    } catch (error) {
      const errorMsg = axiosErrorCatch(error);
      return rejectWithValue(errorMsg);
    }
  }
);
