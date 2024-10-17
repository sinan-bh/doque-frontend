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
import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { Space } from "@/types/spaces";
import axios from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { AlertConfirm } from "../ui/alert-confirm";

export function EditSpace({
  spaceId,
  setSpaces = () => {},
  children,
  initialData,
}: {
  spaceId: string;
  setSpaces?: React.Dispatch<React.SetStateAction<Space[]>>;
  children?: React.ReactNode;
  initialData: { name: string; description: string };
}) {
  const [spaceName, setSpaceName] = useState(initialData.name);
  const [spaceDesc, setSpaceDesc] = useState(initialData.description);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleEditSpace = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast({
      draggable: true,
      title: "Updating..",
      description: "Please wait..",
      open: loading,
      onOpenChange: setLoading,
    });

    try {
      const { data } = await axios.put(`/space/${spaceId}`, {
        name: spaceName,
        description: spaceDesc,
      });

      if (data) {
        setSpaces((prev) =>
          prev.map((space) => {
            if (space._id === spaceId) {
              return { ...space, name: spaceName, description: spaceDesc };
            }
            return space;
          })
        );
        toast({
          draggable: true,
          title: "Space updated",
          description: "Space has been updated successfully",
        });
      }
    } catch (error) {
      setLoading(false);
      setIsOpen(false);
      toast({
        draggable: true,
        title: "Could not update space",
        description: axiosErrorCatch(error),
        action: (
          <ToastAction onClick={() => setIsOpen(true)} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const handleDeleteSpace = async () => {
    try {
      await axios.delete(`/space/${spaceId}`);
      setSpaces((prev) => prev.filter((space) => space._id !== spaceId));
      toast({
        draggable: true,
        title: "Space deleted",
        description: "Space has been deleted successfully",
      });
      setIsOpen(false);
    } catch (error) {
      setIsOpen(false);
      toast({
        draggable: true,
        title: "Could not delete space",
        description: axiosErrorCatch(error),
        action: (
          <ToastAction onClick={() => setIsOpen(true)} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit space</DialogTitle>
          <DialogDescription>
            Spaces are where you can organize your work. Create a space for a
            team, project, or anything you like!!
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleEditSpace}
          id="edit_space_form"
          className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="space_name" className="text-right">
              Space Name
            </Label>
            <Input
              id="space_name"
              onChange={(e) => setSpaceName(e.target.value)}
              value={spaceName}
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="space_desc" className="text-right">
              Description
            </Label>
            <Input
              id="space_desc"
              onChange={(e) => setSpaceDesc(e.target.value)}
              value={spaceDesc}
              required
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter className="grid grid-cols-4">
          <AlertConfirm
            message="Are you sure you want to delete this space?"
            description="All the tasks and lists in this space will be deleted!!"
            confirmText="Delete space"
            onConfirm={handleDeleteSpace}>
            <Button size={"sm"} className="self-start" variant="destructive">
              Delete space
            </Button>
          </AlertConfirm>
          {!loading && (
            <DialogClose className="col-start-3" asChild>
              <Button size={"sm"} variant="ghost">
                Cancel
              </Button>
            </DialogClose>
          )}
          <Button
            size={"sm"}
            className="col-start-4 px-4"
            form="edit_space_form"
            disabled={loading}
            type="submit">
            {loading ? "Updating..." : "Update space"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
