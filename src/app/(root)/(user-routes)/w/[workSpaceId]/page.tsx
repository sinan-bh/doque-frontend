import { redirect } from "next/navigation";

export default function Page({ params }: { params: { workSpaceId: string } }) {
  redirect(`${params.workSpaceId}/dashboard`); // redirect to dashboard page as default
  return null;
}
