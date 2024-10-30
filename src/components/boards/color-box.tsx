"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateList } from "@/lib/store/thunks/tasks-thunks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdOutlineFormatColorFill } from "react-icons/md";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
];

export default function ColorSelector({
  listId,
  currentColor,
  name,
}: {
  listId: string;
  currentColor: string | undefined;
  name: string;
}) {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { spaceId }: { spaceId: string } = useParams();

  const { toast } = useToast();

  const handleUpdateColor = async (color: string) => {
    if (color === currentColor) return;
    await dispatch(
      updateList({
        spaceId,
        listId,
        listData: { name, color },
        onSuccess() {},
        onError(error) {
          toast({
            title: "Couldn't update color",
            description: error,
            action: (
              <ToastAction
                onClick={() => handleUpdateColor(color)}
                altText="Try again">
                Try again
              </ToastAction>
            ),
          });
        },
      })
    );
    setLoading(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-6 w-6">
          <MdOutlineFormatColorFill size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-40">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {colors.map((color) => (
            <button
              key={color}
              disabled={loading}
              onClick={() => handleUpdateColor(color)}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 rounded-full cursor-pointer border border-gray-300  hover:scale-110 transition-transform ${
                color === currentColor && "border-2 scale-110"
              }`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
