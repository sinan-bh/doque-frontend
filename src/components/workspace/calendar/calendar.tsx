"use client";
import React from "react";
import CalendarSmall from "./calendar-small";
import DayCalendar from "./day-calendar";

export default function Calendar() {

  return (
    <div>
      <div className="w-[855px] h-[450px] py-1 mb-5 rounded-lg  bg-white ">
        <main className="flex justify-center items-center w-2/3 rounded-lg  bg-white">
          <div className="flex justify-between ml-[300px]">
            <DayCalendar />
            <CalendarSmall className="w-80 h-[300px] bg-white p-5 rounded-lg" />
          </div>
        </main>
      </div>
    </div>
  );
}

