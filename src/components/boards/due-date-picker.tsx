import React from "react";
import { TaskFormValues } from "@/types/spaces";

export default function DueDatePicker({
  dueDate,
  setValues,
}: {
  dueDate: string | undefined;
  setValues: React.Dispatch<React.SetStateAction<TaskFormValues | null>>;
}) {
  const setDate = (date: Date) => {
    setValues((prev) => ({ ...prev!, dueDate: date.toISOString() }));
  };

  return (
    <div>
      <p>Due Date</p>

      <input
        className="task-details-section"
        type="date"
        value={
          new Date(dueDate || new Date().toISOString())
            .toISOString()
            .split("T")[0]
        }
        onChange={(e) => {
          setDate(new Date(e.target.value));
        }}
      />
    </div>
  );
}
