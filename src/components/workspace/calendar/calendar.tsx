import CalendarSmall from "./calendar-small";
import DayCalendar from "./day-calendar";

export default function Calendar() {
  return (
    <div className="w-full">
      <div className="rounded-lg bg-white">
        <div className="flex bg-gray-200 rounded-md overflow-hidden border dark:border-zinc-700 dark:bg-black shadow-md">
          <DayCalendar />
          <CalendarSmall className="h-[300px] py-5" />
        </div>
      </div>
    </div>
  );
}
