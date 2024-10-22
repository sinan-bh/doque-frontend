"use client";
import React from "react";
import CalendarSmall from "./calendar-small";
import DayCalendar from "./day-calendar";

export default function Calendar() {

  return (
    <div>
      <div className="flex rounded-lg  bg-white ">
          <div className="flex justify-around">
            <DayCalendar />
            <CalendarSmall className="w-full h-[300px] bg-white py-5 rounded-lg" />
          </div>
      </div>
    </div>
  );
}

