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

interface ChildCompProps {
  isRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddSpaceBtn: React.FC<ChildCompProps> = ({ isRender }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc3MjZmM2IyNmQzZDAwYzliMWRkZSIsImlhdCI6MTcyODYzMDM0NiwiZXhwIjoxNzMxMjIyMzQ2fQ.WwZ5Qi7gmuJirc-jNMR-YAxi6zHNTMSHSkWCUYMqC04";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    isRender(true)
    e.preventDefault();

    try {
      await axios.post(
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent"
        >
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
