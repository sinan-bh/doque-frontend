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
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { AlertConfirm } from "../ui/alert-confirm";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  deleteSpaceData,
  updateSpaceData,
} from "@/lib/store/thunks/space-thunks";

export function EditSpace({
  spaceId,
  children,
  initialData,
}: {
  spaceId: string;
  children?: React.ReactNode;
  initialData: { name: string; description: string };
}) {
  const [spaceName, setSpaceName] = useState(initialData.name);
  const [spaceDesc, setSpaceDesc] = useState(initialData.description);
  const [isOpen, setIsOpen] = useState(false);
  const { error, loadingSpaces } = useAppSelector((state) => state.space);

  const dispatch = useAppDispatch();

  const { toast } = useToast();

  useEffect(() => {
    if (error.updateSpace) {
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
    }
    if (loadingSpaces.updateSpace) {
      toast({
        title: "Updating..",
        description: "Please wait..",
        open: loadingSpaces.updateSpace,
      });
    }
    if (loadingSpaces.deleteSpace) {
      toast({
        title: "Deleting..",
        description: "Please wait..",
        open: loadingSpaces.deleteSpace,
      });
    }
    if (error.deleteSpace) {
      toast({
        title: "Could not delete space",
        description: error.deleteSpace,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loadingSpaces]);

  const handleEditSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateSpaceData({
        spaceId,
        spaceData: {
          name: spaceName,
          description: spaceDesc,
        },
        onSuccess: () => {
          toast({
            title: "Space updated",
            description: "Space has been updated successfully",
          });
          setIsOpen(false);
        },
      })
    );
  };

  const handleDeleteSpace = async () => {
    dispatch(
      deleteSpaceData({
        spaceId,
        onSuccess: () => {
          toast({
            title: "Space Deleted",
            description: "Space has been deleted successfully",
          });
          setIsOpen(false);
        },
      })
    );
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
          {!loadingSpaces.updateSpace && (
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
            disabled={loadingSpaces.updateSpace}
            type="submit">
            {loadingSpaces.updateSpace ? "Updating..." : "Update space"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
