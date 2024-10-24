import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkSpace,
  fetchWorkspaceData,
} from "@/lib/store/features/workspace-slice";

export const AddWorkSpaceBtn = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { workSpaceId } = useSelector((state: RootState) => state.workspace);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsOpen(false);
    e.preventDefault();
    try {
      await dispatch(
        createWorkSpace({
          name: formData.name,
          description: formData.description,
        })
      );
      if (workSpaceId) {
        toast({
          title: "Created",
          description: "Workspace Created Successfully",
        });
      }
      dispatch(fetchWorkspaceData());
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: axiosErrorCatch(error),
      });
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Space Name</DialogTitle>
          <DialogDescription>Add your new workspace here...</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
              id="name"
              className="col-span-3"
              autoComplete="off"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              name="description"
              id="description"
              autoComplete="off"
              className="col-span-3"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
