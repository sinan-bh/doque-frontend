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
import { FormEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createSpace } from "@/lib/store/thunks/space-thunks";
import { useParams } from "next/navigation";

export function NewSpaceButton({ children }: { children: React.ReactNode }) {
  const [spaceName, setSpaceName] = useState("New space");
  const [spaceDesc, setSpaceDesc] = useState("Space description");
  const [isOpen, setIsOpen] = useState(false);
  const { loadingSpaces, error } = useAppSelector((state) => state.space);
  const dispatch = useAppDispatch();

  const { workSpaceId }: { workSpaceId: string } = useParams();

  const { toast } = useToast();

  const handleCreateSpace = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      createSpace({
        spaceData: { name: spaceName, description: spaceDesc },
        workspaceId: workSpaceId,
        onSuccess: () => {
          toast({
            title: "Space created",
            description: "Space has been created successfully",
          });

          setIsOpen(false);
        },
      })
    );
  };

  useEffect(() => {
    if (error.createSpace) {
      setIsOpen(false);
      toast({
        draggable: true,
        title: "Could not create space",
        description: error.createSpace,
        action: (
          <ToastAction onClick={() => setIsOpen(true)} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
    if (loadingSpaces.createSpace) {
      toast({
        title: "Creating..",
        description: "Please wait..",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.createSpace, loadingSpaces.createSpace]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Create new space</DialogTitle>
          <DialogDescription>
            Spaces are where you can organize your work. Create a space for a
            team, project, or anything you like!!
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleCreateSpace}
          id="create_space_form"
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
        <DialogFooter>
          {!loadingSpaces.createSpace && (
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          )}
          <Button
            form="create_space_form"
            disabled={loadingSpaces.createSpace}
            type="submit">
            {loadingSpaces.createSpace ? "Creating..." : "Create space"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
