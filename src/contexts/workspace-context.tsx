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

interface Project {

    
      _id: string;
      name: string;
      description: string;
    
  
}


interface CalendarContextType {
  chosenDate: Date | string | number;
  workSpaceId: string;
  projects: Project[] | null;
  setChosenDate: React.Dispatch<React.SetStateAction<Date | string | number>>;
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
  const [workSpaceId, setWorkSpaceId] = useState<string>("");
  const { loggedUser } = useUser();

  console.log(projects);

  useEffect(() => {
    const workSpace = localStorage.getItem("workSpace");
    if (workSpace) {
      setWorkSpaceId(JSON.parse(workSpace));
    }
  }, [loggedUser?.id]);

  useEffect(() => {
    if (loggedUser?.token) {
      const fetchData = async () => {
        try {
          const {data} = await axios.get(
            `https://daily-grid-rest-api.onrender.com/api/space`,
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
      value={{ chosenDate, workSpaceId, projects, setChosenDate }}
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
