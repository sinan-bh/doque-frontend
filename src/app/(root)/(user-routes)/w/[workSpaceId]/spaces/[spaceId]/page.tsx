import BoardsContainer from "@/components/boards/boards-container";
import TaskDetails from "@/components/boards/task-details";

export default async function Page({
  searchParams,
}: {
  params: { workSpaceId: string; spaceId: string };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="mt-4 overflow-hidden">
      <BoardsContainer />
      {searchParams["task"] && searchParams["list"] && (
        <TaskDetails
          listId={searchParams["list"]}
          taskId={searchParams["task"]}
        />
      )}
    </div>
  );
}
