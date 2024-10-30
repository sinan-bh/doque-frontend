import { useState } from "react";
import { BsCardText } from "react-icons/bs";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

export default function TaskDescription({
  description,
  setDescription,
}: {
  description?: string;
  setDescription: (description: string) => void;
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
      {editOpen || !description ? (
        <Textarea
          autoFocus
          // setValues((prev) => ({ ...prev!, description: e.target.value }
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => {
            setEditOpen(false);
          }}
          disabled={!editOpen}
          className="my-2 disabled:cursor-default"
          placeholder="Add description here"
          value={description}
        />
      ) : (
        <pre className="border bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-400 px-4 py-2 min-h-16 rounded-md my-2 font-normal font-sans">
          {description}
        </pre>
      )}
    </div>
  );
}
