import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

export default function PrioritySelector({
  priority,
  setPriority,
}: {
  priority: string;
  setPriority: (priority: string) => void;
}) {
  return (
    <Select
      value={priority}
      onValueChange={(value) => {
        setPriority(value);
      }}>
      <SelectTrigger
        className={clsx(
          "text-sm flex items-center gap-2 cursor-pointer w-[120px]",
          {
            "text-red-800 dark:text-red-200 border-red-500 dark:border-red-500 ":
              priority === "high",
            "text-orange-800 dark:text-orange-200 border-orange-500 dark:border-orange-500":
              priority === "medium",
            "text-green-800 dark:text-green-200 border-green-500 dark:border-green-500":
              priority === "low",
          }
        )}>
        <SelectValue>
          {priority && (
            <>{priority.charAt(0).toUpperCase() + priority.slice(1)}</>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="task-details-section">
        <SelectGroup>
          <SelectItem className="text-green-800" value="low">
            Low
          </SelectItem>
          <SelectItem className="text-yellow-700" value="medium">
            Medium
          </SelectItem>
          <SelectItem className="text-red-700" value="high">
            High
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
