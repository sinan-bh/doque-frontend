
import Spinner from "@/components/ui/spinner/spinner";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RootPage() {
  const userToken = JSON.parse(cookies().get("user")?.value || "{}").token;
  if (userToken) {
    redirect("/u/home")
  } else {
    redirect('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Spinner />
    </div>
  );
}
