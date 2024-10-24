import MyWorkSpace from "@/components/user-home/my-workspace";
import GuestWorkSpaces from "@/components/user-home/guest-workspace";
import Carousel from "@/components/user-home/carousel";
import { cards } from "@/consts/user-home-cards";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Workspace() {
  try {
    
    const userCookie = cookies().get("user")?.value;

    
    if (!userCookie) {
      redirect("/onboarding");
    }

    const parsedUserCookie: { token: string } = JSON.parse(userCookie);

    
    const res = await fetch("https://daily-grid-rest-api.onrender.com/api/workspace", {
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
      <div className="w-full p-4 flex-grow bg-[#EDF1F4] overflow-auto hide-scrollbar dark:bg-gray-950">
        <h1 className="text-3xl text-[#3B3C3D] font-bold ml-5 mb-4">
          My Workspaces
        </h1>

        <MyWorkSpace />

        <GuestWorkSpaces />

        <h1 className="text-3xl text-[#3B3C3D] font-bold ml-5 mb-4">Templates</h1>
        <Carousel cards={cards} />
      </div>
    );
  } catch (error) {
    console.error("Error loading workspaces:", error);
    redirect("/onboarding"); 
  }
}
