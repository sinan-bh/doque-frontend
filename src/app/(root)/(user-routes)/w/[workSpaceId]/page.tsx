import Spinner from "@/components/ui/spinner/spinner";
import { redirect } from "next/navigation";

export default function Page({
  params,
}: {
  params: {
    workSpaceId: string;
  };
}) {
  redirect(`/w/${params.workSpaceId}/dashboard`); // Redirect to the dashboard page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Spinner />
    </div>
  );
}
