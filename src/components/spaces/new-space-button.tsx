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
import { createNewSpace } from "@/utils/taskUtils";
import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

export function NewSpaceButton({ workSpaceId }: { workSpaceId: string }) {
  const [spaceName, setSpaceName] = useState("New space");
  const [spaceDesc, setSpaceDesc] = useState("Space description");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleCreateSpace = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast({
      draggable: true,
      title: "creating space..",
      description: "Please wait..",
      open: isOpen,
    });
    const res = await createNewSpace(spaceName, spaceDesc, workSpaceId);
    setLoading(false);
    setIsOpen(false);

    if (res.data) {
      toast({
        draggable: true,
        title: "Space created",
        description: "Space has been created successfully",
      });
    }

    if (res.error) {
      setLoading(false);
      setIsOpen(false);
      toast({
        draggable: true,
        title: "Could not create space",
        description: "Something went wrong",
        action: (
          <ToastAction onClick={() => setIsOpen(true)} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          New Space +
        </Button>
      </DialogTrigger>
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
          {!loading && (
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          )}
          <Button form="create_space_form" disabled={loading} type="submit">
            {loading ? "Creating..." : "Create space"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
