"use client";

import { fetchCalendarData } from "@/lib/store/features/calendar-slice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Calendar from "./calendar";
import WeekCalendar from "./week-calendar";
import MonthCalendar from "./month-calendar";

export default function CalendarsContainer({
  activeTab,
}: {
  activeTab: string;
}) {
  const dispatch = useAppDispatch();
  const { workSpaceId }: { workSpaceId: string } = useParams();
  useEffect(() => {
    dispatch(fetchCalendarData({ workSpaceId }));
  }, [dispatch, workSpaceId]);

  return (
    <div>
      {activeTab === "Day" ? (
        <Calendar />
      ) : activeTab === "Week" ? (
        <WeekCalendar />
      ) : (
        <MonthCalendar />
      )}
    </div>
  );
}
