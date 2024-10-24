"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { Task, TaskFormValues } from "@/types/spaces";
import { useToast } from "@/hooks/use-toast";
import { IoTrashOutline } from "react-icons/io5";
import clsx from "clsx";
import { Input } from "../ui/input";
import AssignTaskToMembers from "./task-assign-members";
import TaskDescription from "./task-description";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DueDatePicker from "./due-date-picker";
import { AlertConfirm } from "../ui/alert-confirm";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { deleteTask, updateTask } from "@/lib/store/thunks/tasks-thunks";
import { ToastAction } from "../ui/toast";
import axiosInstance from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

export default function TaskDetails({
  taskId,
  listId,
}: {
  taskId: string;
  listId: string;
}) {
  const [data, setData] = useState<Task | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [titleEditOpen, setTitleEditOpen] = useState(false);
  const [values, setValues] = useState<TaskFormValues | null>(null);

  const { lists } = useAppSelector((state) => state.tasks);

  const changesMade = useMemo(() => {
    return (
      JSON.stringify({
        title: data?.title,
        description: data?.description,
        assignedTo: data?.assignedTo,
        dueDate: data?.dueDate,
        priority: data?.priority,
        status: data?.status,
      }) !== JSON.stringify(values)
    );
  }, [data, values]);

  const { toast } = useToast();

  const router = useRouter();
  const { spaceId }: { spaceId: string } = useParams();
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    setInitialLoading(true);

    const getTaskDetails = async () => {
      try {
        const { data: responseData } = await axiosInstance.get(
          `/space/${spaceId}/lists/${listId}/tasks/${taskId}`
        );
        const data = responseData.data;
        setData(data);
        setValues({
          title: data.title,
          description: data.description,
          assignedTo: data.assignedTo,
          priority: data.priority,
          dueDate: data.dueDate,
          status: data.status,
        });
      } catch (error) {
        toast({
          title: "Error fetching task details!!",
          description: axiosErrorCatch(error),
        });
        router.push(pathname);
      } finally {
        setInitialLoading(false);
      }
    };

    getTaskDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, listId]);

  useEffect(() => {
    // When the user clicks outside or press escape key
    // remove the taskId from the URL so the user can navigate back (close the popup)
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.push(pathname);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading.updateTask) {
      toast({ title: "Saving changes.." });
    }

    if (loading.deleteTask) {
      toast({ title: "Deleting task.." });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading.updateTask, loading.deleteTask]);

  const handleUpdateTask = async () => {
    const payload = {
      title: values?.title,
      description: values?.description,
      assignedTo: values?.assignedTo,
      dueDate: values?.dueDate,
      priority: values?.priority,
      status: values?.status === data?.status ? undefined : values?.status,
    };
    dispatch(
      updateTask({
        spaceId,
        listId,
        taskId,
        taskData: payload,
        onSuccess() {
          setData((prev) => ({ ...prev!, ...values }));
          toast({ title: "Task updated successfully" });
          if (values?.status !== data?.status) {
            router.push(`${pathname}?task=${taskId}&list=${values?.status}`);
          }
        },
        onError(error) {
          toast({
            title: "Error Updating task",
            description: error,
            action: (
              <ToastAction onClick={handleUpdateTask} altText="Try again">
                Try again
              </ToastAction>
            ),
          });
        },
      })
    );
  };

  const handleTaskDelete = async () => {
    dispatch(
      deleteTask({
        spaceId,
        listId,
        taskId,
        onSuccess() {
          toast({ title: "Task deleted successfully" });
          router.push(pathname);
        },
        onError(error) {
          toast({
            title: "Error deleting task",
            description: error,
            action: (
              <ToastAction onClick={handleTaskDelete} altText="Try again">
                Try again
              </ToastAction>
            ),
          });
        },
      })
    );
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!target.closest(".task-details-section")) {
      // Remove the taskId from the URL so the user can navigate back (close the popup
      router.push(pathname);
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed bg-black top-0 left-0 h-screen w-screen bg-opacity-50 z-40">
      <div className="absolute w-full h-full flex justify-center items-center">
        {initialLoading && <p className="text-white">Loading...</p>}
        {data && (
          <Card className="task-details-section overflow-hidden w-[600px]">
            <div
              className={clsx("h-10", {
                "bg-red-300": values?.priority === "high",
                "bg-yellow-200": values?.priority === "medium",
                "bg-green-300": values?.priority === "low",
              })}></div>

            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="flex gap-4 items-center text- xl">
                  <div onClick={() => setTitleEditOpen(true)}>
                    {!titleEditOpen && (
                      <h2 className="flex items-center cursor-text justify-between gap-2 min-w-40 h-9 hover:border rounded-md px-3 py-1 text-sm">
                        {values?.title}{" "}
                        <CiEdit className="text-zinc-800 dark:text-zinc-200" />
                      </h2>
                    )}
                    {titleEditOpen && (
                      <Input
                        type="text"
                        autoFocus
                        value={values?.title}
                        onChange={(e) => {
                          setValues((prev) => ({
                            ...prev!,
                            title: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setTitleEditOpen(false);
                        }}
                        onBlur={() => setTitleEditOpen(false)}
                      />
                    )}
                  </div>
                </CardTitle>
                <div>
                  <p className="text-zinc-700 text-xs">Created At</p>
                  <div className="flex items-center gap-2 text-sm">
                    <FaRegClock />
                    {data.createdAt && (
                      <span>
                        {new Date(data.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-0.5 bg-zinc-400 rounded-full"></div>
            </CardHeader>

            <CardContent className="max-h-[350px] overflow-y-auto">
              <TaskDescription values={values} setValues={setValues} />
              <div className="flex justify-between my-4">
                <DueDatePicker
                  dueDate={values?.dueDate}
                  setValues={setValues}
                />

                <div>
                  <p>Priority</p>

                  <Select
                    value={values?.priority}
                    onValueChange={(value) => {
                      setValues((prev) => ({
                        ...prev!,
                        priority: value,
                      }));
                    }}>
                    <SelectTrigger
                      className={clsx(
                        "text-sm flex items-center gap-2 cursor-pointer w-[120px]",
                        {
                          "text-red-700 border-red-700":
                            values?.priority === "high",
                          "text-yellow-700 border-yellow-700":
                            values?.priority === "medium",
                          "text-green-700 border-green-700":
                            values?.priority === "low",
                        }
                      )}>
                      <SelectValue>
                        {values?.priority && (
                          <>
                            {values.priority.charAt(0).toUpperCase() +
                              values.priority.slice(1)}
                          </>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="task-details-section">
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem className="text-green-800" value="low">
                          Low
                        </SelectItem>
                        <SelectItem className="text-yellow-700" value="medium">
                          Medium
                        </SelectItem>
                        <SelectItem className="text-red-700" value="high">
                          High
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p>Status</p>

                  <Select
                    value={values?.status}
                    onValueChange={(value) => {
                      setValues((prev) => ({
                        ...prev!,
                        status: value,
                      }));
                    }}>
                    <SelectTrigger className="text-sm flex items-center gap-2 cursor-pointer  w-[120px]">
                      <SelectValue
                        style={{
                          color: lists.find(
                            (list) => list.id === values?.status
                          )?.color,
                          borderColor: lists.find(
                            (list) => list.id === values?.status
                          )?.color,
                        }}>
                        {
                          lists.find((list) => list.id === values?.status)
                            ?.title
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="task-details-section">
                      <SelectGroup>
                        {lists.map((list) => (
                          <SelectItem
                            key={list.id}
                            value={list.id}
                            style={{
                              color: list.color,
                            }}>
                            {list.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <AssignTaskToMembers
                existingMembers={values?.assignedTo || []}
                setValues={setValues}
              />
            </CardContent>

            <div className="h-0.5 bg-zinc-300 my-2 rounded-full"></div>

            <CardFooter className="flex justify-between items-end mt-4">
              <AlertConfirm
                confirmText="Delete Task"
                onConfirm={handleTaskDelete}
                message="Are you sure you want to delete this task?"
                description="This action is permanent and cannot be undone">
                <Button variant="destructive">
                  Delete task <IoTrashOutline />
                </Button>
              </AlertConfirm>
              <Button
                onClick={handleUpdateTask}
                size="sm"
                disabled={!changesMade || loading.updateTask}
                className="col-start-4 self-end">
                {loading.updateTask ? "Saving.." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
