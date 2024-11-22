"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createList, getSpace } from "@/lib/store/thunks/tasks-thunks";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { toast } from "@/hooks/use-toast";
import StatusColumn from "@/components/task-list/status-column";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskListContainer() {
  const dispatch = useAppDispatch();
  const { tasks, lists, loading } = useAppSelector((state) => state.tasks);
  const { workSpaceId, spaceId }: { workSpaceId: string; spaceId: string } =
    useParams();
  const [orderedLists, setOrderedLists] = useState(lists || []);

  
  useEffect(() => {
    if (spaceId) dispatch(getSpace(spaceId));
  }, [workSpaceId, spaceId, dispatch]);

  useEffect(() => {
    if (lists) {
      setOrderedLists(lists);
    }
  }, [lists]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      if (active.id !== over.id) {
        const oldIndex = orderedLists.findIndex(
          (list) => list.id === active.id
        );
        const newIndex = orderedLists.findIndex((list) => list.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newOrder = arrayMove(orderedLists, oldIndex, newIndex);
          setOrderedLists(newOrder);
        }
      }
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleCreateList = () => {
    dispatch(
      createList({
        listData: { name: "New List", color: "#808080" },
        spaceId,
        onSuccess: () => toast({ description: "List created" }),
      })
    );
  };

  return (
    <div className="sm:ml-2 ml-4">
      <Button
        title="Create new List"
        disabled={loading.createList || loading.getSpaceDetails}
        onClick={handleCreateList}
        size="sm"
        variant="outline"
        className="flex gap-2 items-center my-2">
        Add List <FaPlus size={10} />
      </Button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext
          items={orderedLists.map((list) => list.id)}
          strategy={verticalListSortingStrategy}>
          {orderedLists?.map((list) => (
            <div key={list.id} id={list.id}>
              <StatusColumn
                workSpaceId={workSpaceId}
                spaceId={spaceId}
                label={list.title}
                id={list.id}
                color={list.color}
                tasks={tasks}
              />
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
