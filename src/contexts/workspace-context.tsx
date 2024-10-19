"use client";
import axios, { AxiosError } from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useUser } from "./user-context";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axios";

interface Project {
  _id: string;
  name: string;
  description: string;
  workspace: string;
}

interface Member {
  user: string;
}

interface Workspace {
  WorkspaceId: string;
  name: string;

}

export type Users = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  isActive: boolean;
}

interface CalendarContextType {
  chosenDate: Date | string | number;
  projects: Project[] | null;
  workSpacesId: string;
  workSpaceId: string | string[];
  users: Users[];
  workSpace: Workspace[];
  setWorkSpacesId: React.Dispatch<React.SetStateAction<string>>;
  setChosenDate: React.Dispatch<React.SetStateAction<Date | string | number>>;
  handleNext: (previousSpaceName: string) => Promise<void>;
}

const WorkSpaceContext = createContext<CalendarContextType | undefined>(
  undefined
);

type ContextProps = {
  children: ReactNode;
};

const WorkSpaceContextProvider = ({ children }: ContextProps) => {
  const [chosenDate, setChosenDate] = useState<Date | string | number>("");
  const [workSpace, setWorkspace] = useState<Workspace[]>([]);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [workSpacesId, setWorkSpacesId] = useState<string>("");
  const { loggedUser } = useUser();
  const { workSpaceId } = useParams();

  const handleNext = async (previousSpaceName: string) => {
    try {
      const res = await axios.post(
        "https://daily-grid-rest-api.onrender.com/api/workspace",
        { name: previousSpaceName },
        {
          headers: {
            Authorization: `Bearer ${loggedUser?.token}`,
          },
        }
      );
      setWorkSpacesId(res.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          `https://daily-grid-rest-api.onrender.com/api/space?workspaceId=${workSpaceId}`
        );

        setProjects(data.data);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 404) {
          console.error("Projects not found");
        } else {
          console.error(err);
        }
      }
    };
    fetchData();
    if (loggedUser?.token) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `https://daily-grid-rest-api.onrender.com/api/space?workspaceId=${workSpaceId}`,
            {
              headers: {
                Authorization: `Bearer ${loggedUser?.token}`,
              },
            }
          );
          setProjects(data.data);
        } catch (err) {
          if (err instanceof AxiosError && err.response?.status === 404) {
            console.error("Projects not found");
          } else {
            console.error(err);
          }
        }
      };
      fetchData();
    }
  }, [loggedUser?.token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "https://daily-grid-rest-api.onrender.com/api/workspace"
        );

        setWorkspace(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    if (loggedUser?.token) {
      const fetchData = async () => {
        try {
          const {data} = await axios.get(
            "https://daily-grid-rest-api.onrender.com/api/workspace",
            {
              headers: { Authorization: `Bearer ${loggedUser?.token}` },
            }
          );          
          setWorkspace(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [loggedUser?.token]);

  useEffect(() => {
    const fetchWorkspaceMembers = async () => {
      if (!workSpaceId) return;

      try {
        const resp = await axiosInstance.get(
          `https://daily-grid-rest-api.onrender.com/api/workspace/${workSpaceId}`
        );

        const activeMembers = resp.data.data.members.filter(
          (member: { status: string }) => member.status !== "pending"
        );
        setMembers(activeMembers);
      } catch (error) {
        console.log(error);
      }
    };
      fetchWorkspaceMembers();
  }, [workSpaceId,loggedUser?.token]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      if (members.length === 0) return;
      try {
        const userPromises = members.map((member) => {
          return axiosInstance.get(
            `https://daily-grid-rest-api.onrender.com/api/userprofile/${member.user}`
          );
        });

          const userResponses = await Promise.all(userPromises);
          const fetchedUsers = userResponses.map((resp) => resp.data);
          const users = fetchedUsers.map(u=> u.data)          
          setUsers(users);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserProfiles();

  }, [members]);

  return (
    <WorkSpaceContext.Provider
      value={{
        workSpace,
        users,
        chosenDate,
        workSpacesId,
        workSpaceId,
        projects,
        setChosenDate,
        handleNext,
        setWorkSpacesId,
      }}
    >
      {children}
    </WorkSpaceContext.Provider>
  );
};

const useWorkSpaceContext = () => {
  const context = useContext(WorkSpaceContext);
  if (context === undefined) {
    throw new Error("WorkSpaceContext must be used within a MyProvider");
  }
  return context;
};

export { useWorkSpaceContext, WorkSpaceContextProvider };
