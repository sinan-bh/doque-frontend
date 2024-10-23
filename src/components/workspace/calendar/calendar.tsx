"use client";
import React from "react";
import CalendarSmall from "./calendar-small";
import DayCalendar from "./day-calendar";

export default function Calendar() {

  return (
    <div>
      <div className="flex rounded-lg bg-white">
          <div className="flex justify-around bg-white dark:bg-black">
            <DayCalendar />
            <CalendarSmall className="w-full h-[300px]py-5" />
          </div>
      </div>
    </div>
  );
}

