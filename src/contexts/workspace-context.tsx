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

interface Project {
  _id: string;
  name: string;
  description: string;
}

interface Member {
  user: string;
}

interface Workspace {
  WorkspaceId: string;
  name: string;

}

interface CalendarContextType {
  chosenDate: Date | string | number;
  projects: Project[] | null;
  workSpacesId: string;
  workSpaceId: string | string[];
  users: any[];
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

const WorkSpactContextProvider = ({ children }: ContextProps) => {
  const [chosenDate, setChosenDate] = useState<Date | string | number>("");
  const [workSpace, setWorkspace] = useState<Workspace[]>([]);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [users, setUsers] = useState<any[]>([]);
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
    if (loggedUser?.token) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `https://daily-grid-rest-api.onrender.com/api/space`,
            {
              headers: {
                Authorization: `Bearer ${loggedUser?.token}`,
              },
            }
          );
          console.log(data);

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
    if (loggedUser?.token) {
      const fetchData = async () => {
        try {
          const {data} = await axios.get(
            "https://daily-grid-rest-api.onrender.com/api/workspace",
            {
              headers: { Authorization: `Bearer ${loggedUser?.token}` },
            }
          );
          console.log(data.data);
          
          setWorkspace(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [loggedUser?.token]);

  // useEffect(() => {
  //   if (loggedUser?.token && workSpaceId) {
  //     const fetchData = async () => {
  //       try {
  //         const {data} = await axios.get(
  //           `https://daily-grid-rest-api.onrender.com/api/workspace/${workSpaceId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${loggedUser?.token}`,
  //             },
  //           }
  //         );

  //         console.log(data.data);

  //       } catch (err) {
  //         if (err instanceof AxiosError && err.response?.status === 404) {
  //           console.error("Projects not found");
  //         } else {
  //           console.error(err);
  //         }
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [loggedUser?.token, workSpaceId]);

  useEffect(() => {
    if (loggedUser?.token) {
      const fetchWorkspaceMembers = async () => {
        if (!workSpaceId) return;

        try {
          const resp = await axios.get(
            `https://daily-grid-rest-api.onrender.com/api/workspace/${workSpaceId}`,
            {
              headers: { Authorization: `Bearer ${loggedUser?.token}` },
            }
          );
          setMembers(resp.data.data.members);
        } catch (error) {
          console.log(error);
        }
      };

      fetchWorkspaceMembers();
    }
  }, [workSpaceId]);

  useEffect(() => {
    if (loggedUser?.token) {
      const fetchUserProfiles = async () => {
        if (members.length === 0) return;
        try {
          const userPromises = members.map((member) => {
            return axios.get(
              `https://daily-grid-rest-api.onrender.com/api/userprofile/${member.user}`,
              {
                headers: { Authorization: `Bearer ${loggedUser?.token}` },
              }
            );
          });

          const userResponses = await Promise.all(userPromises);
          const fetchedUsers = userResponses.map((resp) => resp.data);
          setUsers(fetchedUsers);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserProfiles();
    }
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

export { useWorkSpaceContext, WorkSpactContextProvider };
