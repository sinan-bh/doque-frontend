"use client";

import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import HandleLoading from "../ui/handle-loading";
import Link from "next/link";

export default function ProjectCard({ workSpaceId }: { workSpaceId: string }) {
  const [workSpace, setWorkSpace] = useState<{
    name: string;
    createdAt: string;
    members: string[];
    space: string[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      try {
        const { data } = await axiosInstance.get(`/workspace/${workSpaceId}`);
        setWorkSpace(data.data);
      } catch (error) {
        setError(axiosErrorCatch(error));
      } finally {
        setLoading(false);
      }
    };
    fetchWorkSpace();
  }, [workSpaceId]);

  return (
    <Link
    href={`/w/${workSpaceId}/dashboard`}
    className="shrink-0 basis-[120px] sm:basis-[200px] md:basis-[250px] mr-4 mb-4">
    <Card className="w-[160px] sm:w-[200px] md:w-[250px] h-full shadow-md hover:bg-purple-50 hover:scale-105 transition-transform">
      <HandleLoading
        error={error}
        loading={loading}
        loadingComponent={
          <div className="flex items-center h-full justify-center">
            <p>Loading space details..</p>
          </div>
        }
      >
        {workSpace && (
          <CardHeader>
            <CardTitle className="text-sm">{workSpace.name}</CardTitle>
            <CardDescription className="text-xs">
              Created At {new Date(workSpace?.createdAt).toLocaleDateString()}
            </CardDescription>
            <CardContent className="text-sm p-0">
              <p>
                Spaces: <span>{workSpace.space?.length}</span>
              </p>
              <p>
                Members: <span>{workSpace.members?.length}</span>
              </p>
            </CardContent>
          </CardHeader>
        )}
      </HandleLoading>
    </Card>
  </Link>
  
  );
}
