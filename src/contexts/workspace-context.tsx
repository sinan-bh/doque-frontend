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

interface CalendarContextType {
  chosenDate: Date | string | number;
  projects: Project[] | null;
  workSpacesId: string;
  workSpaceId: string | string[];
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
  const [projects, setProjects] = useState<Project[] | null>(null);
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

  return (
    <WorkSpaceContext.Provider
      value={{
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
