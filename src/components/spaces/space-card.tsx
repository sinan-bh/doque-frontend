import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Space } from "@/types/spaces";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { EditSpace } from "./edit-space";

export default function SpaceCard({ space }: { space: Space }) {
  return (
    <Card className="h-full relative overflow-hidden">
      <EditSpace
        initialData={{
          name: space.name,
          description: space.description,
        }}
        spaceId={space._id}>
        <Button
          title="Edit space"
          size="icon"
          variant="ghost"
          className="absolute right-2 top-4 ">
          <FaEdit />
        </Button>
      </EditSpace>

      <div className="hover:bg-gray-100 h-full">
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
      </div>
    </Card>
  );
}
