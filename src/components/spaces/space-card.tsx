import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Space } from "@/types/spaces";
import Link from "next/link";

export default function SpaceCard({ space }: { space: Space }) {
  return (
    <Link href={`spaces/${space._id}`}>
      <Card className="h-full hover:bg-zinc-50">
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
      </Card>
    </Link>
  );
}
