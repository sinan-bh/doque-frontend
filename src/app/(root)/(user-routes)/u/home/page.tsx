import MyWorkSpace from "@/components/user-home/my-workspace";
import GuestWorkSpaces from "@/components/user-home/guest-workspace";
import TemplateCarousel from "@/components/user-home/template-carousel";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Workspace() {
  const userCookie = cookies().get("user")?.value;

  try {
    if (!userCookie) {
      redirect("/onboarding");
    }

    const parsedUserCookie: { token: string } = JSON.parse(userCookie);

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/workspaces", {
      headers: {
        Authorization: `Bearer ${parsedUserCookie.token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch workspace data.");
    }

    const data = await res.json();

    if (data.length === 0) {
      redirect("/onboarding");
    }

    return (
      <div className="w-full p-4 flex-grow bg-white overflow-auto hide-scrollbar dark:bg-gray-950">
        <h1 className="text-1xl sm:text-2xl md:text-2xl text-[#3B3C3D] font-bold ml-5 mb-4">
          My Workspaces
        </h1>

        <MyWorkSpace />

        <GuestWorkSpaces />

        <h1 className="text-1xl sm:text-2xl md:text-2xl text-[#3B3C3D] font-bold ml-5 mb-4">
          Templates
        </h1>
        <TemplateCarousel />
      </div>
    );
  } catch (error) {
    console.error("Error loading workspaces:", error);
    redirect("/onboarding");
  }
}
