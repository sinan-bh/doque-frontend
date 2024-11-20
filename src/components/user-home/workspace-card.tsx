"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Workspace } from "@/lib/store/features/workspace-slice";

export default function WorkspaceCard({ workSpace }: { workSpace: Workspace }) {
  return (
    <Link
      href={`/w/${workSpace._id}/dashboard`}
      className="shrink-0 basis-[120px] sm:basis-[200px] md:basis-[250px] mr-4 mb-4">
      <Card
        className="w-[160px] sm:w-[200px] md:w-[250px]  h-full min-h-40 shadow-lg hover:shadow-xl
       bg-gradient-to-br from-[#349ca25f] via-white to-[#C4DBF6] hover:scale-105 transition-transform rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
            {workSpace.name}
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Created At: {new Date(workSpace?.createdAt).toLocaleDateString()}
          </CardDescription>
          <CardContent className="text-sm p-0">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium text-blue-600 dark:text-blue-400">
                Spaces:
              </span>{" "}
              {workSpace.spaces?.length}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium text-green-600 dark:text-green-400">
                Members:
              </span>{" "}
              {workSpace.members?.length}
            </p>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}
