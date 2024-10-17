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
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

interface ChildCompProps {
  isRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddSpaceBtn: React.FC<ChildCompProps> = ({ isRender }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { toast } = useToast();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGNjNDQ3OGNmZDdjNzI5MWFmNThhNSIsImlhdCI6MTcyOTE0MDc2MiwiZXhwIjoxNzMxNzMyNzYyfQ.tcXc7sUP-8nan0LDqbfUfW_lKq_5N5idKQ-1VDFnqmw";
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    isRender(true);
    setIsOpen(false)
    e.preventDefault();

    try {
      const resp = await axios.post(
        "https://daily-grid-rest-api.onrender.com/api/workspace",
        {
          name: formData.name,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (resp.status == 201) {
        toast({
          title: "Created",
          description: "Workspace Created Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: axiosErrorCatch(error),
      });
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-transparent">
          Add space
        </Button>
      </DialogTrigger>
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
