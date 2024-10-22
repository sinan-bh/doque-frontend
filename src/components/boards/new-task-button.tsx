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
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useParams } from "next/navigation";
import * as Yup from "yup";
import { FaPlus } from "react-icons/fa6";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createTask } from "@/lib/store/thunks/tasks-thunks";

// Validation schema using Yup
const TaskCreateSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  assignedTo: Yup.array().of(Yup.string()).default([]),
  dueDate: Yup.date(),
  priority: Yup.string().nullable(),
});

export function NewTaskButton({ listId }: { listId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { spaceId }: { spaceId: string } = useParams();
  const { toast } = useToast();

  const { loading, error } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      assignedTo: undefined,
      dueDate: undefined,
      priority: undefined,
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
          spaceId,
          listId,
          taskData: values,
          onSuccess() {
            formik.resetForm();
            toast({
              description: "Task created",
            });
          },
        })
      );

      setIsOpen(false);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (error.createTask) {
      toast({
        title: "Error creating task",
        description: error.createTask,
        action: (
          <ToastAction onClick={() => setIsOpen(true)} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }

    if (loading.createTask) {
      toast({
        title: "Creating Task...",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading.createTask, error.createTask]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex gap-2 items-center my-2">
          Create new task <FaPlus size={10} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Create new Task</DialogTitle>
          <DialogDescription>
            Create a new Task in the selected list
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="grid gap-4 py-4"
          id="create_task_form">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Task title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="col-span-3"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 col-start-2 col-span-3 text-xs">
                {formik.errors.title}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Task description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="col-span-3"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 col-start-2 col-span-3 text-xs">
                {formik.errors.description}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dueDate ? formik.values.dueDate : ""}
              className="col-span-3"
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <div className="text-red-500 col-start-2 col-span-3 text-xs">
                {formik.errors.dueDate}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <select
              id="priority"
              name="priority"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priority}
              className="col-span-3">
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {formik.touched.priority && formik.errors.priority && (
              <div className="text-red-500 col-start-2 col-span-3 text-xs">
                {formik.errors.priority}
              </div>
            )}
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={loading.createTask}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            form="create_task_form"
            type="submit"
            disabled={loading.createTask}>
            {loading.createTask ? "Creating..." : "Create Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
