import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Column, TaskRow } from "@/types/spaces";
import TaskCard from "./task-card";
import { MdOutlineFormatColorFill } from "react-icons/md";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { NewTaskButton } from "./new-task-button";
import { AlertConfirm } from "../ui/alert-confirm";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { deleteList, updateList } from "@/lib/store/thunks/tasks-thunks";
import { ToastAction } from "../ui/toast";

export default function SectionContainer({
  section,
  tasks,
  isOverLay = false,
}: {
  section: Column;
  isOverLay?: boolean;
  tasks: TaskRow[];
}) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(section.title);

  const { error, loading } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { spaceId }: { spaceId: string } = useParams();

  const { toast } = useToast();

  const {
    setNodeRef,
    isDragging,
    listeners,
    transform,
    transition,
    attributes,
  } = useSortable({
    id: section.id,
    data: {
      type: "section",
      section,
    },
    disabled: editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    scrollbarGutter: "stable",
    border: `1px solid ${section.color || "#FEE485"}`,
  };

  useEffect(() => {
    if (error.deleteList) {
      toast({
        title: "Couldn't delete list",
        description: error.deleteList + "!!",
        action: (
          <ToastAction onClick={handleDeleteList} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }

    if (error.updateList) {
      toast({
        title: "Couldn't update list",
        description: error.updateList + "!!",
        action: (
          <ToastAction onClick={handleUpdateTitle} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.deleteList, error.updateList]);

  const handleUpdateTitle = async () => {
    dispatch(
      updateList({
        spaceId,
        listId: section.id,
        listData: { name: value },
        onSuccess() {
          setEditMode(false);
          toast({ description: "List updated" });
        },
      })
    );
  };

  const handleDeleteList = () => {
    dispatch(
      deleteList({
        spaceId,
        listId: section.id,
        onSuccess: () => toast({ description: "List deleted" }),
      })
    );
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={` w-64 h-[600px] flex-shrink-0 p-2 rounded-md cursor-default shadow-sm border overflow-y-auto bg-white dark:bg-zinc-900
       ${isDragging && !isOverLay && "opacity-50"} `}
      {...attributes}>
      <div
        className="flex justify-between gap-2 p-2 cursor-pointer"
        {...listeners}>
        <h2
          onClick={() => setEditMode(true)}
          className="font-semibold rounded-md text-center">
          {!editMode && section.title}
          {editMode && (
            <Input
              disabled={loading.updateList}
              className="bg-white"
              type="text"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdateTitle();
              }}
              onBlur={() => handleUpdateTitle()}
            />
          )}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-6 w-6">
            <MdOutlineFormatColorFill size={16} />
          </Button>
          <AlertConfirm
            message="Are you sure you want to delete this section?"
            description="All tasks in this section will be deleted!!"
            confirmText="Delete"
            onConfirm={handleDeleteList}>
            <Button
              variant="outline"
              size="icon"
              className="hover:text-red-700 h-6 w-6">
              <FaTrash />
            </Button>
          </AlertConfirm>
        </div>
      </div>

      <NewTaskButton listId={section.id} />

      <div className="flex flex-col gap-2 ">
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
