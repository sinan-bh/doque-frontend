"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchSpacesData } from "@/lib/store/thunks/space-thunks";
import { createList, getSpace } from "@/lib/store/thunks/tasks-thunks";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import StatusColumn from "@/components/task-list/status-column";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";


export default function TaskListContainer() {
  const dispatch = useAppDispatch();
  const { tasks, lists, loading, error } = useAppSelector((state) => state.tasks);
  const { workSpaceId, spaceId }: { workSpaceId: string; spaceId: string } = useParams();

  useEffect(() => {
    if (spaceId) dispatch(getSpace(spaceId));
    if (workSpaceId) dispatch(fetchSpacesData(workSpaceId));
  }, [workSpaceId, spaceId, dispatch]);

  useEffect(() => {
    if (error?.createList) {
      toast({
        title: "Couldn't create list",
        description: `${error.createList}!!`,
        action: (
          <ToastAction onClick={handleCreateList} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  }, [error?.createList]);

  const handleCreateList = () => {
    dispatch(
      createList({
        listData: { name: "New List",color: "#808080" },
        spaceId,
        onSuccess: () => toast({ description: "List created" }),
      })
    );
  };

  return (
    <div>
      <Button
        title="Create new List"
        disabled={loading.createList || loading.getSpaceDetails}
        onClick={handleCreateList}
        size="sm"
        variant="outline"
        className="flex gap-2 items-center my-2"
      >
        Add List <FaPlus size={10} />
      </Button>
      <div className="w-fit">
        {lists?.map((list) => (
          <StatusColumn
            key={list.id}
            workSpaceId={workSpaceId}
            spaceId={spaceId}
            label={list.title}
            id={list.id}
            color={list.color}
            tasks={tasks}
          />
        ))}
      </div>
    </div>
  );
}
