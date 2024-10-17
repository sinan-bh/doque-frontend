import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Space } from "@/types/spaces";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../ui/button";
import { EditSpace } from "./edit-space";

export default function SpaceCard({
  space,
  setSpaces,
}: {
  space: Space;
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>;
}) {
  return (
    <Card className="h-full relative">
      <EditSpace
        initialData={{
          name: space.name,
          description: space.description,
        }}
        spaceId={space._id}
        setSpaces={setSpaces}>
        <Button
          title="Edit space"
          size="icon"
          variant="ghost"
          className="absolute right-2 top-4 ">
          <BsThreeDotsVertical />
        </Button>
      </EditSpace>

      <Link href={`spaces/${space._id}`}>
        <CardHeader>
          <CardTitle>{space.name}</CardTitle>
          <CardDescription>{space.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <p>Created By {space.createdBy}</p> */}
          <p className="text-sm">Lists: {space.lists.length}</p>
          {space.lists.map((section, i) => (
            <div
              className="flex gap-2 justify-between mb-2 p-2 bg-zinc-100 rounded-md"
              key={i}>
              <p>{section.name}</p>
              <p>Tasks: {section.tasks.length}</p>
            </div>
          ))}
        </CardContent>
      </Link>
    </Card>
  );
}
