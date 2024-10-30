import { Template } from "@/consts/templates";
import axiosInstance from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { Space } from "@/types/spaces";
import moment from "moment";

export const createWorkSpaceTemplate = async (
  workSpaceName: string,
  template: Template,
  onLoadingChange: () => void,
  onSuccess: (id: string) => void,
  onError: (msg: string) => void
) => {
  try {
    const { data: workSpaceData } = await axiosInstance.post("/workspace", {
      name: workSpaceName,
      description: template.description,
    });

    const workspaceId = workSpaceData.data._id;

    // create Spaces from template data
    onLoadingChange();
    const spaceCreationPromises = template.spaces.map(async (space) => {
      const { data: spaceData } = await axiosInstance.post(
        `/space?workspaceId=${workspaceId}`,
        { name: space.name, description: space.description }
      );

      const spaceId = spaceData.data._id;

      // create Lists for each Space
      const listCreationPromises = space.lists.map((list) =>
        axiosInstance.post(`/space/${spaceId}/lists`, {
          name: list.name,
          color: list.color || null,
        })
      );
      await Promise.all(listCreationPromises);
      return spaceData;
    });

    await Promise.all(spaceCreationPromises);

    onSuccess(workSpaceData.data._id);
    return workSpaceData.data;
  } catch (error) {
    const errorMsg = axiosErrorCatch(error);
    onError(errorMsg);
  }
};

export const getSpaceDetails = async (spaceId: string, cookie?: string) => {
  const result = { data: null, error: null } as {
    data: Space | null;
    error: string | null;
  };

  const token = cookie ? JSON.parse(cookie).token : null;
  try {
    const { data } = await axiosInstance.get(`/space/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    result.data = data.data;
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

export const getRemainingTime = (dueDate?: string) => {
  if (!dueDate) return { text: null, color: null, border: null };

  const now = moment();
  const due = moment(dueDate);
  const diff = due.diff(now);

  if (diff < 0) {
    // if past due
    const absDiff = Math.abs(diff);
    if (absDiff < 60 * 1000) {
      // less than 1 minute
      return {
        text: "Just now",
        color: "text-red-500",
        border: "border-red-500",
      };
    } else if (absDiff < 60 * 60 * 1000) {
      // less than 1 hour
      const minutes = Math.floor(absDiff / (60 * 1000));
      return {
        text: `Past due (${minutes} minutes)`,
        color: "text-red-500",
        border: "border-red-500",
      };
    } else if (absDiff < 24 * 60 * 60 * 1000) {
      // less than 1 day
      const hours = Math.floor(absDiff / (60 * 60 * 1000));
      return {
        text: `Past due (${hours} hours)`,
        color: "text-red-500",
        border: "border-red-500",
      };
    } else {
      // more than 1 day
      const days = Math.floor(absDiff / (24 * 60 * 60 * 1000));
      return {
        text: `Past due (${days} days)`,
        color: "text-red-500",
        border: "border-red-500",
      };
    }
  } else if (diff < 60 * 1000) {
    // less than 1 minute
    const seconds = Math.floor(diff / 1000);
    return {
      text: `${seconds} seconds remaining`,
      color: "text-orange-500",
      border: "border-orange-500",
    };
  } else if (diff < 60 * 60 * 1000) {
    // less than 1 hour
    const minutes = Math.floor(diff / (60 * 1000));
    return {
      text: `${minutes} minutes remaining`,
      color: "text-orange-500",
      border: "border-orange-500",
    };
  } else if (diff < 24 * 60 * 60 * 1000) {
    // less than 1 day
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return {
      text: `${hours} hours remaining`,
      color: "text-orange-500",
      border: "border-orange-500",
    };
  } else {
    // more than 1 day
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    if (days < 4) {
      return {
        text: `${days} ${days === 1 ? "day" : "days"} remaining`,
        color: "text-orange-500",
        border: "border-orange-500",
      };
    } else if (days < 7) {
      return {
        text: `${days} days remaining`,
        color: "text-green-500",
        border: "border-green-500",
      };
    } else {
      return {
        text: `${Math.floor(days / 7)} weeks remaining`,
        color: "text-green-500",
        border: "border-green-500",
      };
    }
  }
};
