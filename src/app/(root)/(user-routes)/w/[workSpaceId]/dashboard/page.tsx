import CalendarSmall from "@/components/workspace/calendar/calendar-small";
import DashboardProject from "@/components/workspace/dashboard/dashboard-project";
import GroupChat from "@/components/workspace/dashboard/group-chat";

export default function DashboardPage() {
  return (
    <div className="flex gap-4 m-4">
      <div className="basis-3/5">
        <DashboardProject />
      </div>
      <div className="flex flex-col basis-2/5">
        <CalendarSmall className=" bg-white rounded-lg shadow-md dark:bg-gray-950 " />
        <GroupChat />
      </div>
    </div>
  );
}
