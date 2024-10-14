"use client";

import { Space, TaskRow, Column } from "@/types/spaces";
import {
  apiCreateList,
  apiCreateTask,
  apiDeleteTask,
  apiListDelete,
  apiUpdateList,
} from "@/utils/taskUtils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { createContext, useContext, useState } from "react";

type LoadingStates =
  | "createCol"
  | "createTask"
  | "moveTask"
  | "deleteTask"
  | "deleteCol"
  | "updateCol";

type ContextType = {
  loading: LoadingStates | null;
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  tasks: TaskRow[];
  setTasks: React.Dispatch<React.SetStateAction<TaskRow[]>>;
  spaces: Space[];
  populateSpacesData: (spaces: Space[]) => void;
  populateBoardData: (spaceData: Space) => {
    cols: Column[];
    taskRows: TaskRow[];
  };
  createColumn: (
    workspaceId: string,
    onError: (error: string) => void
  ) => Promise<void>;
  deleteColumn: (
    spaceId: string,
    listId: string,
    onError: (error: string) => void
  ) => Promise<void>;
  createTask: (
    spaceId: string,
    listId: string,
    onError: (msg: string) => void
  ) => Promise<void>;
  updateList: (
    spaceId: string,
    listId: string,
    payload: {
      name: string;
      color?: string;
    },
    onError: (msg: string) => void
  ) => Promise<void>;
  moveColumn: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
  swapTasksInSameColumn: (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier
  ) => void;
  moveTaskToColumn: (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier
  ) => void;
  deleteTask: (
    spaceId: string,
    listId: string,
    taskId: string,
    onError: (msg: string) => void
  ) => Promise<void>;
};

const BoardsContext = createContext<ContextType | null>(null);

export const useBoards = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error("useBoards must be used within a BoardsProvider");
  }
  return context;
};

export default function BoardsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [columns, setColumns] = useState<Column[]>([]); // contains the lists of the current space
  const [tasks, setTasks] = useState<TaskRow[]>([]); // contains the tasks of the current space
  const [spaces, setSpaces] = useState<Space[]>([]); // contains every spaces in the work space
  const [loading, setLoading] = useState<LoadingStates | null>(null);

  const createColumn = async (
    spaceId: string,
    onError: (msg: string) => void
  ) => {
    setLoading("createCol");
    const res = await apiCreateList(spaceId, { name: "New List" });
    if (res.data) {
      setColumns((prevColumns) => [
        {
          id: res.data!._id,
          title: res.data!.name,
          color: res.data!.color,
        },
        ...prevColumns,
      ]);
    } else if (res.error) {
      onError(res.error);
    }
    setLoading(null);
  };

  const deleteColumn = async (
    spaceId: string,
    listId: string,
    onError: (msg: string) => void
  ) => {
    setLoading("deleteCol");
    const res = await apiListDelete(spaceId, listId);
    if (res.error) {
      onError(res.error);
      setLoading(null);
      return;
    }
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== listId)
    );
    setLoading(null);
  };

  const createTask = async (
    spaceId: string,
    listId: string,
    onError: (msg: string) => void
  ) => {
    setLoading("createTask");
    const res = await apiCreateTask(spaceId, listId, {
      title: "New",
      description: "hello this is a new task",
    });
    if (res.data) {
      setTasks([
        ...tasks,
        {
          title: res.data.title,
          description: res.data.description,
          id: res.data._id,
          column: listId,
        },
      ]);
    }
    if (res.error) {
      onError(res.error);
    }
    setLoading(null);
  };

  const updateList = async (
    spaceId: string,
    listId: string,
    payload: {
      name: string;
      color?: string;
    },
    onError: (msg: string) => void
  ) => {
    setLoading("updateCol");
    const res = await apiUpdateList(spaceId, listId, payload);
    setLoading(null);
    if (res.data) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.id === listId) {
            return {
              ...column,
              title: res.data!.name,
              color: res.data!.color,
            };
          }
          return column;
        })
      );
    }
    if (res.error) {
      onError(res.error);
    }
  };

  const moveColumn = (activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
    setColumns((prevColumns) => {
      // Find the index of the active and over columns and move the active column to the over column's position
      const activeColumnIndex = prevColumns.findIndex(
        (column) => column.id === activeId
      );
      const overColumnIndex = prevColumns.findIndex(
        (column) => column.id === overId
      );
      return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
    });
  };

  const swapTasksInSameColumn = (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier
  ) => {
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((task) => task.id === activeId);
      const overIndex = tasks.findIndex((task) => task.id === overId);
      if (tasks[activeIndex].column !== tasks[overIndex].column) {
        tasks[activeIndex].column = tasks[overIndex].column;
      }

      return arrayMove(tasks, activeIndex, overIndex);
    });
  };

  const moveTaskToColumn = (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier
  ) => {
    // Update the state first
    setTasks((tasks) => {
      // Save the previous state to revert later if needed
      const activeIndex = tasks.findIndex((task) => task.id === activeId);
      if (activeIndex === -1) {
        return tasks;
      }
      // Update the task's column

      tasks[activeIndex].column = overId.toString();

      return arrayMove(tasks, activeIndex, activeIndex);
    });
  };

  const deleteTask = async (
    spaceId: string,
    listId: string,
    taskId: string,
    onError: (msg: string) => void
  ) => {
    setLoading("deleteTask");
    const res = await apiDeleteTask(spaceId, listId, taskId);
    if (res.error) {
      onError(res.error);
      setLoading(null);
      return;
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setLoading(null);
  };

  const populateSpacesData = (spaces: Space[]) => {
    setSpaces(spaces);
  };

  const populateBoardData = (spaceData: Space) => {
    // Populate columns
    const cols: Column[] = spaceData.lists.map((list) => {
      return {
        id: list._id,
        title: list.name,
        color: list.color,
      };
    });

    // Extract tasks from all lists and populate taskRows
    const taskRows: TaskRow[] = spaceData.lists.flatMap((list) =>
      list.tasks.map((task) => ({
        ...task,
        id: task._id,
        column: list._id,
      }))
    );

    setColumns(cols);
    setTasks(taskRows);

    return { cols, taskRows };
  };

  const values = {
    columns,
    setColumns,
    tasks,
    setTasks,
    createColumn,
    deleteColumn,
    createTask,
    updateList,
    moveColumn,
    swapTasksInSameColumn,
    moveTaskToColumn,
    deleteTask,
    populateSpacesData,
    spaces,
    populateBoardData,
    loading,
  };
  return (
    <BoardsContext.Provider value={values}>{children}</BoardsContext.Provider>
  );
}
