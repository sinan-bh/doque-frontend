import CalendarsContainer from "@/components/workspace/calendar/calendar-container";
import moment from "moment";
import Link from "next/link";

type Toggle = "Day" | "Week" | "Month";

function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const activeTab = searchParams["tab"] || ("Day" as Toggle);
  const today = moment();

  return (
    <div className="p-4 w-full">
      <div className="py-3 w-full flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col ">
          <h1 className="font-medium text-xl sm:text-3xl sm:mr-4">Calendar</h1>
          <span className="text-xs sm:text-sm">
            Today: <i>{today.format("MMMM Do YYYY, dddd")}</i>
          </span>
        </div>
        <div className="p-3">
          <div className="inline-flex border-2 border-gray-500 dark:text-zinc-200 rounded-md">
            {["Day", "Week", "Month"].map((tab) => (
              <Link href={`calendar?tab=${tab}`} key={tab}>
                <button
                  className={`${
                    activeTab === tab
                      ? "bg-zinc-700 dark:bg-zinc-200 dark:text-gray-900 text-gray-200"
                      : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  } px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-base rounded focus:outline-none`}
                >
                  {tab}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <CalendarsContainer activeTab={activeTab} />
    </div>
  );
}

export default Page;
