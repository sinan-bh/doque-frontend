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
      <div className="py-3 w-full flex justify-between">
        <div>
          <h1 className="font-semibold text-3xl">Calendar</h1>
          <span>
            Today: <i>{today.format("MMMM Do YYYY, dddd")}</i>
          </span>
        </div>
        <div className="p-3">
          <div className="inline-flex bg-zinc-100 dark:bg-zinc-800  dark:text-zinc-200  rounded-full">
            {["Day", "Week", "Month"].map((tab) => (
              <Link href={`calendar?tab=${tab}`} key={tab}>
                <button
                  className={`px-4 py-2 rounded-full focus:outline-none  ${
                    activeTab === tab
                      ? "bg-zinc-700 dark:bg-zinc-200 dark:text-gray-900 text-gray-200"
                      : " hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}>
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
