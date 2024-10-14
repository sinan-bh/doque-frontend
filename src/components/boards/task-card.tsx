import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import StackedAvatars from "../ui/stacked-avatars";
import { TbCheckbox } from "react-icons/tb";
import { TaskRow } from "@/types/spaces";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FaRegClock } from "react-icons/fa6";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa";
import { useBoards } from "@/contexts/boards-context";
import { useState } from "react";

const members = [{}, {}, {}];

export default function TaskCard({ task }: { task: TaskRow }) {
  const [error, setError] = useState<string | null>(null);

  const {
    setNodeRef,
    isDragging,
    listeners,
    transform,
    transition,
    attributes,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const { deleteTask } = useBoards();

  const pathName = usePathname();
  const { spaceId } = useParams();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className={`overflow-hidden ${isDragging && "opacity-50"}`}>
        <div
          className="h-5"
          style={{ backgroundColor: task.color || "#FEE485" }}></div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Link href={`${pathName}/${task.id}`}>
              <CardTitle className="hover:bg-zinc-200 px-4 py-2 rounded-md">
                {task.title}
              </CardTitle>
            </Link>
            {/* Delete button */}
            <Button
              title="Delete task"
              variant="outline"
              size="icon"
              className="hover:text-red-700 h-6 w-6 z-50"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the Link
                setError(null);
                deleteTask(spaceId[0], task.column, task.id, () => {
                  setError(error);
                });
              }}>
              <FaTrash size={10} />
            </Button>
          </div>
          <CardDescription className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
            {task.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <p className="flex items-center gap-2">
            <FaRegClock className="text-zinc-500 hover:opacity-0 transition-opacity duration-300" />
            <span className="text-xs">14 oct</span>
          </p>
          <p className="flex gap-2 items-center">
            <TbCheckbox className="text-zinc-500" />{" "}
            <span className="text-xs">0/3</span>
          </p>
          <StackedAvatars members={members} size="sm" max={3} />
        </CardFooter>
      </Card>
    </div>
  );
}
