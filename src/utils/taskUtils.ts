import { List, Space, Task, TaskFormValues, TaskRow } from "@/types/spaces";
import axios from "./axios";
import { axiosErrorCatch } from "./axiosErrorCatch";
import debounce from "lodash.debounce";

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

// spaces
const createNewSpace = async (
  name: string,
  description: string = "",
  workSpaceId: string
) => {
  const response = { data: null, error: null } as ApiResponse<Space>;
  try {
    const { data } = await axios.post(`/space?workspaceId=${workSpaceId}`, {
      name,
      description,
    });
    response.data = data.data;
  } catch (error) {
    response.error = axiosErrorCatch(error);
  }
  return response;
};

const getAllSpaces = async (workSpaceId: string) => {
  const result = { data: null, error: null } as ApiResponse<Space[]>;
  try {
    const { data } = await axios.get(`/space?workspaceId=${workSpaceId}`);

    result.data = data.data;
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

const getSpaceDetails = async (spaceId: string, cookie?: string) => {
  const result = { data: null, error: null } as {
    data: Space | null;
    error: string | null;
  };

  const token = cookie ? JSON.parse(cookie).token : null;
  try {
    const { data } = await axios.get(`/space/${spaceId}`, {
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

// lists (columns)

const apiCreateList = async (
  spaceId: string,
  payload: {
    name: string;
    color?: string;
  }
) => {
  const result = { data: null, error: null } as ApiResponse<List>;
  try {
    const { data } = await axios.post(`/space/${spaceId}/lists`, payload);
    result.data = data.data;
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

const apiListDelete = async (spaceId: string, listId: string) => {
  const result = { data: null, error: null } as ApiResponse<null>;
  try {
    const { data } = await axios.delete(`/space/${spaceId}/lists/${listId}`);
    result.data = data.data;
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

const apiUpdateList = async (
  spaceId: string,
  listId: string,
  payload: { name: string; color?: string }
) => {
  const result = { data: null, error: null } as ApiResponse<List>;
  try {
    const { data } = await axios.put(
      `/space/${spaceId}/lists/${listId}`,
      payload
    );
    result.data = data.data;
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

//task

const apiCreateTask = async (
  spaceId: string,
  listId: string,
  taskDetails: TaskFormValues
) => {
  const result = { data: null, error: null } as ApiResponse<Task>;
  try {
    const { data } = await axios.post(
      `/space/${spaceId}/lists/${listId}/tasks`,
      taskDetails
    );
    result.data = data.data;
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

const apiMoveTask = async (
  spaceId: string,
  oldListId: string,
  taskId: string,
  newListId: string
) => {
  const result = { data: null, error: null } as ApiResponse<string>;
  try {
    await axios.patch(`/space/${spaceId}/lists/${oldListId}/tasks/${taskId}`, {
      targetListId: newListId,
    });
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

const debouncedApiMoveTask = debounce(
  async (
    spaceId: string,
    currentListId: string,
    activeId: string,
    newListId: string,
    setTasks: (value: React.SetStateAction<TaskRow[]>) => void,
    previousState: string,
    setLoading: (value: React.SetStateAction<boolean>) => void,
    onError: (msg: string) => void
  ) => {
    setLoading(true);
    const { error } = await apiMoveTask(
      spaceId,
      currentListId,
      activeId.toString(),
      newListId
    );
    setLoading(false);
    if (error) {
      // Revert the state if API call fails
      setTasks(JSON.parse(previousState));
      onError(error);
    }
  },
  500
);

const apiDeleteTask = async (
  spaceId: string,
  listId: string,
  taskId: string
) => {
  const result = { data: null, error: null } as ApiResponse<null>;
  try {
    await axios.delete(`/space/${spaceId}/lists/${listId}/tasks/${taskId}`);
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

const apiGetTaskDetails = async (
  spaceId: string,
  listId: string,
  taskId: string
) => {
  const result = { data: null, error: null } as ApiResponse<Task>;
  try {
    const { data } = await axios.get(
      `/space/${spaceId}/lists/${listId}/tasks/${taskId}`
    );
    result.data = data.data;
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

const apiUpdateTask = async (
  spaceId: string,
  listId: string,
  taskId: string,
  taskDetails: TaskFormValues
) => {
  const result = { data: null, error: null } as ApiResponse<Task>;
  try {
    const { data } = await axios.put(
      `/space/${spaceId}/lists/${listId}/tasks/${taskId}`,
      taskDetails
    );
    result.data = data.data;
  } catch (error) {
    result.error = axiosErrorCatch(error);
  }
  return result;
};

export {
  createNewSpace,
  getAllSpaces,
  getSpaceDetails,
  apiCreateList,
  apiListDelete,
  apiUpdateList,
  apiCreateTask,
  apiMoveTask,
  debouncedApiMoveTask,
  apiDeleteTask,
  apiGetTaskDetails,
  apiUpdateTask,
};
