import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa6";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Column, TaskRow } from "@/types/spaces";
import TaskCard from "./task-card";
import { useBoards } from "@/contexts/boards-context";
import { MdOutlineFormatColorFill } from "react-icons/md";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { NewTaskButton } from "./new-task-button";
import { AlertConfirm } from "../ui/alert-confirm";

export default function SectionContainer({
  section,
  deleteSection = () => {},
  tasks,
  isOverLay = false,
}: {
  section: Column;
  deleteSection?: (id: string) => void;
  isOverLay?: boolean;
  tasks: TaskRow[];
}) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(section.title);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { spaceId }: { spaceId: string } = useParams();

  const { loading, updateList } = useBoards();

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

  const handleUpdateTitle = async () => {
    await updateList(spaceId, section.id, { name: value }, () => {
      toast({ value: "Failed to update section title" });
    });
    setEditMode(false);
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={` w-64 h-[600px] flex-shrink-0 p-2 rounded-md cursor-default shadow-sm border overflow-y-auto bg-white
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
              disabled={loading === "updateCol"}
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
            onConfirm={() => {
              deleteSection(section.id);
            }}>
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
