import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import {
  fetchMembers,
  selectMembers,
} from "../../../lib/store/features/admin/admin-member-slice";
import {
  fetchWorkspaces,
  selectWorkspaces,
} from "../../../lib/store/features/admin/admin-workspace-slice";
import DashboardStats from "./dashboard-status/dashboard-status";
import WorkspaceStatistics from "./dashboard-status/workspace-statics";
import ActivityChart from "./dashboard-status/activity-chart";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectMembers);
  const workspaces = useAppSelector(selectWorkspaces);

  const [view, setView] = useState("all");
  const [lineChartView, setLineChartView] = useState("week");

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchWorkspaces({ page: 1, limit: 100 }));
  }, [dispatch]);

  const totalMembers = members.length;
  const totalWorkspaces = workspaces.length;
  const totalSpaces = workspaces.reduce(
    (acc, workspace) => acc + workspace.space.length,
    0
  );

  return (
    <div className=" min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className=" overflow-auto max-h-[90vh]">
        <DashboardStats
          totalMembers={totalMembers}
          totalWorkspaces={totalWorkspaces}
          totalSpaces={totalSpaces}
        />
        <WorkspaceStatistics
          workspaces={workspaces}
          view={view}
          setView={setView}
          members={members}
        />
        <ActivityChart
          workspaces={workspaces}
          lineChartView={lineChartView}
          setLineChartView={setLineChartView}
        />
      </div>
    </div>
  );
}
