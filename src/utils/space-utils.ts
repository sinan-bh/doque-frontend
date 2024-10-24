import { Template } from "@/consts/templates";
import axiosInstance from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { Space } from "@/types/spaces";

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
