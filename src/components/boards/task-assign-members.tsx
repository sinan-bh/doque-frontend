"use client";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TaskFormValues } from "@/types/spaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axiosInstance from "@/utils/axios";
import { useParams } from "next/navigation";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

type Member = {
  status: string;
  user: { firstName: string; _id: string };
};

export default function AssignTaskToMembers({
  existingMembers,
  setValues,
}: {
  existingMembers: string[];
  setValues: Dispatch<SetStateAction<TaskFormValues | null>>;
}) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { workSpaceId } = useParams();

  useEffect(() => {
    setLoading(true);
    async function fetchMembers() {
      try {
        const { data } = await axiosInstance.get(
          `/workspaces/${workSpaceId}/invited-members`
        );
        setMembers(data.data);
      } catch (error) {
        setError(axiosErrorCatch(error));
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, [workSpaceId]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <p>Members</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex gap-2 items-center">
              Add members
              <CiCirclePlus size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command className="task-details-section">
              <CommandInput placeholder="Search member..." className="h-9" />
              <CommandList>
                <CommandEmpty>No members found..</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {loading && <CommandEmpty>Loading...</CommandEmpty>}
                  {error && (
                    <CommandEmpty className="text-red-600">
                      {error}
                    </CommandEmpty>
                  )}
                  {members.map((member) => {
                    const isAssigned = existingMembers.includes(
                      member.user?._id
                    );
                    return (
                      <CommandItem
                        value={member.user?._id}
                        key={member.user?._id}
                        className="flex justify-between">
                        <div className="flex flex-col items-start">
                          <span>{member.user?.firstName}</span>
                        </div>
                        <Button
                          variant="outline"
                          className="flex gap-2"
                          title="Add member"
                          onClick={() => {
                            if (isAssigned) {
                              setValues((prev) => ({
                                ...prev!,
                                assignedTo: prev?.assignedTo?.filter(
                                  (m) => m !== member.user?._id
                                ),
                              }));
                              return;
                            }
                            setValues((prev) => ({
                              ...prev!,
                              assignedTo: [
                                ...(prev?.assignedTo || []),
                                member.user?._id,
                              ],
                            }));
                          }}>
                          {isAssigned ? (
                            "Remove"
                          ) : (
                            <>
                              Add <CiCirclePlus size={20} />
                            </>
                          )}
                        </Button>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-2 flex-wrap ">
        {existingMembers.map((member) => (
          <div
            key={member}
            className="flex flex-col justify-center items-center">
            <Avatar className="border-2 border-white w-12 h-12">
              <AvatarImage src={"/images/avatarFallback.png"} alt={"Avatar"} />
              <AvatarFallback />
            </Avatar>
            <p className="text-xs text-zinc-700">
              {members.find((m) => member === m.user?._id)?.user?.firstName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
