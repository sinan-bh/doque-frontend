"use client";

import { fetchCalendarData } from "@/lib/store/features/calendar-slice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function FetchData() {
  const dispatch = useAppDispatch();
  const { workSpaceId }: { workSpaceId: string } = useParams();
  useEffect(() => {
    dispatch(fetchCalendarData({ workSpaceId }));
  }, [dispatch, workSpaceId]);
  return null;
}
