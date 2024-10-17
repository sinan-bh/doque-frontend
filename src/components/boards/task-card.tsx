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
import { TaskRow } from "@/types/spaces";
import { usePathname } from "next/navigation";
import { FaRegClock } from "react-icons/fa6";

import Link from "next/link";
import clsx from "clsx";

export default function TaskCard({ task }: { task: TaskRow }) {
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

  const pathName = usePathname();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className={`overflow-hidden ${isDragging && "opacity-50"}`}>
        <div
          className={clsx("h-5", {
            "bg-red-300": task?.priority === "high",
            "bg-yellow-300": task?.priority === "medium",
            "bg-green-300": task?.priority === "low",
          })}></div>
        <Link href={`${pathName}?task=${task.id}&list=${task.column}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="py-2 rounded-md">{task.title}</CardTitle>
            </div>
            <CardDescription className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
              <p>{task.description}</p>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            {task?.priority && (
              <p
                className={clsx(
                  "text-sm flex items-center gap-2 cursor-pointer border-yellow-800 w-[120px]",
                  {
                    "text-red-700": task?.priority === "high",
                    "text-yellow-700": task?.priority === "medium",
                    "text-green-700": task?.priority === "low",
                  }
                )}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </p>
            )}
            {task.dueDate && (
              <p className="flex items-center gap-2">
                <FaRegClock className="text-zinc-500" />
                <span className="text-xs">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </p>
            )}

            {task.assignedTo?.length ? (
              <StackedAvatars
                members={task.assignedTo.map(() => ({}))}
                size="sm"
                max={3}
              />
            ) : null}
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}
