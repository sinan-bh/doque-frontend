import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col items-center"
        >
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function WorkspaceStatisticsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
        <Skeleton className="h-6 w-1/4 mb-4" />

        <div className="mb-4 flex justify-end items-center">
          <Skeleton className="h-5 w-32 mr-2" />
          <Skeleton className="h-10 w-14 rounded-md" />
        </div>

        <div className="overflow-x-auto">
          <Skeleton className="min-w-[300px] md:min-w-[600px] h-40" />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col">
        <div className="mb-4">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-40 w-full mx-auto" />
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-5 w-12 mb-2" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActivityChartSkeleton() {
  return (
    <div className="mt-6 p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <Skeleton className="h-6 w-1/4 mb-2 sm:mb-0" />
        <div className="flex space-x-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-8 w-20 rounded" />
          ))}
        </div>
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
