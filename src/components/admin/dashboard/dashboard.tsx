import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import {
  fetchMembers,
  selectMembers,
  selectLoading as selectMembersLoading,
} from "../../../lib/store/features/admin/admin-member-slice";
import {
  fetchWorkspaces,
  selectWorkspaces,
  selectWorkspaceLoading,
} from "../../../lib/store/features/admin/admin-workspace-slice";
import {
  fetchSubscriptions,
  selectSubscriptions,
  selectSubscriptionLoading,
} from "../../../lib/store/features/admin/admin-subscription-slice";
import DashboardStats from "./dashboard-status/dashboard-status";
import WorkspaceStatistics from "./dashboard-status/workspace-statics";
import ActivityChart from "./dashboard-status/activity-chart";
import {
  DashboardStatsSkeleton,
  WorkspaceStatisticsSkeleton,
  ActivityChartSkeleton,
} from "../../ui/admin/dashboard-skelton";
import SubscriptionStatistics from "./dashboard-status/subscription-data";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectMembers);

  const workspaces = useAppSelector(selectWorkspaces);
  const memberLoading = useAppSelector(selectMembersLoading);
  const workspaceLoading = useAppSelector(selectWorkspaceLoading);

  const Subscription = useAppSelector(selectSubscriptions);
  console.log("subscription:", Subscription);
  const subscriptionLoading = useAppSelector(selectSubscriptionLoading);

  const [view, setView] = useState("all");
  const [lineChartView, setLineChartView] = useState("week");

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchWorkspaces({ page: 1, limit: 100 }));
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const totalMembers = members.length;
  const totalWorkspaces = workspaces.length;
  const totalSpaces = workspaces.reduce(
    (acc, workspace) => acc + workspace.spaces.length,
    0
  );
  const totalSubscriptions = Subscription.length;
  const totalRevenue = Subscription.reduce(
    (acc, subscription) => acc + subscription.amount,
    0
  );

  const isLoading = memberLoading || workspaceLoading || subscriptionLoading;

  return (
    <div className="min-h-screen ml-10 bg-gray-100 dark:bg-gray-900">
      {isLoading ? (
        <div className="overflow-auto max-h-[90vh]">
          <DashboardStatsSkeleton />
          <WorkspaceStatisticsSkeleton />
          <ActivityChartSkeleton />
        </div>
      ) : (
        <div className="overflow-auto max-h-[90vh]">
          <DashboardStats
            totalMembers={totalMembers}
            totalWorkspaces={totalWorkspaces}
            totalSpaces={totalSpaces}
            totalSubscriptions={totalSubscriptions}
            totalRevenue={totalRevenue}
          />
          <WorkspaceStatistics
            workspaces={workspaces}
            view={view}
            setView={setView}
            members={members}
          />
          <div className="flex flex-col md:flex-row gap-6">
            <SubscriptionStatistics subscriptions={Subscription} />
            <ActivityChart
              workspaces={workspaces}
              lineChartView={lineChartView}
              setLineChartView={setLineChartView}
            />
          </div>
        </div>
      )}
    </div>
  );
}
