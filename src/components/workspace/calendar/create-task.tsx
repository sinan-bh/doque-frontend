import { NewTaskButton } from "@/components/boards/new-task-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";

export default function CreateTask({
  dueTime,
  children,
  onSuccess,
}: {
  dueTime?: { chosenDate: Date; hour?: number };
  children: React.ReactNode;
  onSuccess?: ()=> void;
}) {
  const { allSpaces } = useAppSelector((state) => state.calendar);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Select onValueChange={(value) => setSelectedSpace(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Space" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {allSpaces.map((space) => (
                    <SelectItem key={space._id} value={space._id}>
                      {space.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <NewTaskButton
            onSuccess={onSuccess}
              dueTime={dueTime}
              spaceId={selectedSpace || undefined}>
              <Button disabled={!selectedSpace}>Create</Button>
            </NewTaskButton>
          </div>

          <p className="text-sm text-muted-foreground">
            Select the space where you want to create the new Task
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
