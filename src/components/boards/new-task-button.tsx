"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createTask } from "@/lib/store/thunks/tasks-thunks";
import { Textarea } from "../ui/textarea";
import DueDatePicker from "./task-form/due-date-picker";
import PrioritySelector from "./task-form/priority-selector";
import StatusSelector from "./task-form/status-selector";
import AssignTaskToMembers from "./task-form/task-assign-members";
import { fetchCalendarData } from "@/lib/store/features/calendar-slice";

// Validation schema using Yup
const TaskCreateSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  assignedTo: Yup.array().of(Yup.string()).default([]),
  dueDate: Yup.string(),
  status: Yup.string().required("Please select a status"),
  priority: Yup.string().nullable(),
  members: Yup.array().of(Yup.string()).default([]),
});

export function NewTaskButton({
  listId,
  spaceId,
  dueTime,
  children,
}: {
  listId?: string;
  spaceId?: string;
  dueTime?: { chosenDate: Date; hour?: number };
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    spaceId: spaceIdFromParams,
    workSpaceId,
  }: { spaceId: string; workSpaceId: string } = useParams();
  const { toast } = useToast();
  const { loading } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const {
    values,
    handleSubmit,
    touched,
    errors,
    resetForm,
    handleChange,
    setValues,
    handleBlur,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      assignedTo: [] as string[],
      dueDate: dueTime
        ? new Date(
            dueTime.chosenDate.setHours(dueTime.hour || 9, 0, 0, 0)
          ).toISOString()
        : undefined,
      status: listId,
      priority: "medium",
    },
    validationSchema: TaskCreateSchema,
    onSubmit: async (values, { setSubmitting }) => {
      toast({
        draggable: true,
        title: "Creating Task...",
        description: "Please wait...",
        open: isOpen,
      });

      dispatch(
        createTask({
          spaceId: spaceId || spaceIdFromParams,
          listId: values.status!,
          taskData: values,
          onSuccess() {
            resetForm();
            toast({
              description: "Task created",
            });
            if (dueTime) {
              // means it's from the calendar
              dispatch(fetchCalendarData({ workSpaceId: workSpaceId }));
            }
          },
        })
      );

      setIsOpen(false);
      setSubmitting(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:w-[600px] w-[calc(100vw-2rem)]  overflow-auto">
        <DialogHeader>
          <DialogTitle>Create new Task</DialogTitle>
          <DialogDescription>
            Create a new Task in the selected space and list
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 py-4 overflow-x-auto"
          id="create_task_form">
          <div className="grid grid-cols-5 items-center gap-2">
            <Label htmlFor="title" className="text-right">
              Task Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Task title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              className="col-span-4"
            />
            {touched.title && errors.title && (
              <div className="text-red-500 col-start-2 col-span-3 text-xs">
                {errors.title}
              </div>
            )}
          </div>

          <div className="grid grid-cols-5 items-center gap-2">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Task description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className="col-span-4"
            />
            {touched.description && errors.description && (
              <div className="text-red-500 col-start-2 col-span-3 text-xs">
                {errors.description}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <DueDatePicker
                dueDate={values.dueDate}
                setDueDate={(date: string) =>
                  handleChange({ target: { name: "dueDate", value: date } })
                }
              />
              {touched.dueDate && errors.dueDate && (
                <div className="text-red-500 col-start-2 col-span-3 text-xs">
                  {errors.dueDate}
                </div>
              )}
            </div>
            <div>
              <p>Priority</p>
              <PrioritySelector
                priority={values.priority}
                setPriority={(priority) =>
                  handleChange({
                    target: { name: "priority", value: priority },
                  })
                }
              />
            </div>
            <div>
              <p>Status</p>
              <StatusSelector
                spaceId={spaceId}
                status={values.status}
                setStatus={(status) =>
                  handleChange({ target: { name: "status", value: status } })
                }
              />
            </div>
          </div>
          <AssignTaskToMembers
            existingMembers={values.assignedTo}
            assignMember={(member) =>
              setValues((prev) => ({
                ...prev,
                assignedTo: [...prev.assignedTo, member],
              }))
            }
            removeMember={(member) =>
              setValues((prev) => ({
                ...prev,
                assignedTo: prev.assignedTo.filter((m) => m !== member),
              }))
            }
          />
        </form>

        <DialogFooter className="items-center">
          {touched.status && errors.status && (
            <p className="text-sm text-left text-red-500">{errors.status}</p>
          )}
          <DialogClose asChild>
            <Button variant="ghost" disabled={loading.createTask}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            form="create_task_form"
            type="submit"
            disabled={!values.title.length || loading.createTask}>
            {loading.createTask ? "Creating..." : "Create Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
