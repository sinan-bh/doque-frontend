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
import { Dispatch, SetStateAction, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const members = [
  {
    value: "6376722425",
    email: "anaspappadan@gmail.com,ksngj ngijsn",
    label: "Anas",
  },
  {
    value: "363463475786",
    label: "Sahad",
    email: "sahad@gmail.com",
  },
  {
    value: "363463475755",
    label: "Abhijith",
    email: "abhijith@gmail.com",
  },
  {
    value: "5687252875",
    label: "Arun",
    email: "arun@gmail.com",
  },
  {
    value: "646758658",
    label: "Sreejith",
    email: "sreejith@gmail.com",
  },
];

export default function AssignTaskToMembers({
  existingMembers,
  setValues,
}: {
  existingMembers: string[];
  setValues: Dispatch<SetStateAction<TaskFormValues | null>>;
}) {
  const [open, setOpen] = useState(false);

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
                  {members.map((member) => {
                    const isAssigned = existingMembers.includes(member.value);
                    return (
                      <CommandItem
                        value={member.label}
                        style={{ backgroundColor: "white" }}
                        key={member.value}
                        className="flex justify-between">
                        <div className="flex flex-col items-start">
                          <span>{member.label}</span>
                          <span className="text-zinc-600 text-xs overflow-hidden max-w-40 whitespace-nowrap text-ellipsis">
                            {member.email}
                          </span>
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
                                  (m) => m !== member.value
                                ),
                              }));
                              return;
                            }
                            setValues((prev) => ({
                              ...prev!,
                              assignedTo: [
                                ...(prev?.assignedTo || []),
                                member.value,
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
              {members.find((m) => member === m.value)?.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
