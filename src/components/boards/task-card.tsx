import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import StackedAvatars from "../ui/stacked-avatars";
import { TaskRow } from "@/types/spaces";
import { usePathname } from "next/navigation";
import { FaRegClock } from "react-icons/fa6";

import Link from "next/link";
import clsx from "clsx";
import { getRemainingTime } from "@/utils/space-utils";

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

  const { color: dueDateColor } = getRemainingTime(task.dueDate);

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className={`overflow-hidden  ${isDragging && "opacity-50"}`}>
        <div
          className={clsx("h-5", {
            "bg-red-300": task?.priority === "high",
            "bg-yellow-300": task?.priority === "medium",
            "bg-green-300": task?.priority === "low",
          })}></div>
        <Link href={`${pathName}?task=${task.id}&list=${task.column}`}>
          <CardHeader className="py-4">
            <CardTitle className="text-ellipsis h-fit overflow-hidden whitespace-nowrap leading-normal">
              {task.title}
            </CardTitle>

            <CardDescription className="text-xs m-0 text-ellipsis overflow-hidden whitespace-nowrap">
              {task.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 items-center">
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
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </p>
              )}

              {task.assignedTo?.length ? (
                <StackedAvatars
                  members={task.assignedTo.map((member) => ({ _id: member }))}
                  size="sm"
                  max={3}
                />
              ) : null}
            </div>
            <p className={`flex items-center gap-2 ${dueDateColor}`}>
              <FaRegClock className={`${!dueDateColor && "text-gray-500 "}`} />
              {task.dueDate ? (
                <span className="text-xs">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-xs text-gray-500 ">Not set</span>
              )}
            </p>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
