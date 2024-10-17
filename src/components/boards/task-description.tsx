import { TaskFormValues } from "@/types/spaces";
import { Dispatch, SetStateAction, useState } from "react";
import { BsCardText } from "react-icons/bs";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function TaskDescription({
  values,
  setValues,
}: {
  values: TaskFormValues | null;
  setValues: Dispatch<SetStateAction<TaskFormValues | null>>;
}) {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div>
      <span className="flex items-center text-lg gap-2">
        <BsCardText className="mt-1" /> <h2>Description</h2>
        <Button
          onClick={() => {
            setEditOpen(true);
          }}
          size="xs"
          variant="secondary"
          className="w-16 border text-zinc-600 rounded-sm">
          Edit
        </Button>
      </span>
      {editOpen || !values?.description ? (
        <Textarea
          autoFocus
          onChange={(e) =>
            setValues((prev) => ({ ...prev!, description: e.target.value }))
          }
          onBlur={() => {
            setEditOpen(false);
          }}
          disabled={!editOpen}
          className="my-2 disabled:cursor-default"
          placeholder="Add description here"
          value={values?.description}
        />
      ) : (
        <pre className="border bg-zinc-100 text-zinc-800 px-4 py-2 min-h-16 rounded-md my-2 font-normal font-sans text-sm">
          {values?.description}
        </pre>
      )}
    </div>
  );
}
