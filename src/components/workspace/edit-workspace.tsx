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
import { AlertConfirm } from "../ui/alert-confirm";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  deleteWorkspace,
  updateWorkspace,
} from "@/lib/store/features/workspace-slice";
import { useParams, useRouter } from "next/navigation";
import { ToastAction } from "../ui/toast";

export function EditWorkSpace({
  initialData,
  children,
}: {
  children?: React.ReactNode;
  initialData: { name: string; visibility: boolean };
}) {
  const [name, setName] = useState(initialData.name);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { workSpaceId }: { workSpaceId: string } = useParams();

  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateSpace = async (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: "Updating space",
      description: "Updating the space details",
    });
    setLoading(true);
    dispatch(
      updateWorkspace({
        workSpaceId,
        name,
        onSuccess: () => {
          setLoading(false);
          toast({
            title: "Work space updated",
            description: "Workspace has been updated successfully",
          });
          setIsOpen(false);
        },
        onError(msg) {
          setLoading(false);
          toast({
            title: "Could not update space",
            description: msg,
            action: (
              <ToastAction
                onClick={() => handleUpdateSpace}
                altText="Try again">
                Try again
              </ToastAction>
            ),
          });
        },
      })
    );
  };

  const handleDeleteSpace = async () => {
    toast({
      title: "Deleting space",
      description: "Deleting the space and all its contents",
    });
    setLoading(true);
    dispatch(
      deleteWorkspace({
        workSpaceId,
        onSuccess: () => {
          setLoading(false);
          toast({
            title: "Work space Deleted",
            description: "Workspace has been deleted successfully",
          });
          setIsOpen(false);
          router.push("/u/home");
        },
        onError(msg) {
          setLoading(false);
          toast({
            title: "Could not delete space",
            description: msg,
          });
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
          onSubmit={handleUpdateSpace}
          id="edit_space_form"
          className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="space_name" className="text-right">
              Space Name
            </Label>
            <Input
              placeholder="Enter new space name"
              id="space_name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter className="grid grid-cols-4">
          <AlertConfirm
            message="Are you sure you want to delete this Work space?"
            description="All the data in this space will be deleted!!"
            confirmText="Delete Workspace"
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
