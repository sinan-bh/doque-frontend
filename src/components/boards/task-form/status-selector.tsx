import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createList } from "@/lib/store/thunks/tasks-thunks";
import { Column } from "@/types/spaces";
import axiosInstance from "@/utils/axios";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StatusSelector({
  status,
  setStatus,
  spaceId,
}: {
  status?: string;
  setStatus: (status: string) => void;
  spaceId?: string;
}) {
  const { lists: storedLists } = useAppSelector((state) => state.tasks);
  const [lists, setLists] = useState<Column[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { spaceId: spaceIdFromParams }: { spaceId: string } = useParams();

  useEffect(() => {
    if (spaceId) {
      const fetchLists = async () => {
        try {
          const { data } = await axiosInstance.get(`/space/${spaceId}/lists`);
          setLists(
            data.data.map((list: { _id: string; name: string }) => ({
              ...list,
              id: list._id,
              title: list.name,
            }))
          );
        } catch (error) {
          setError(axiosErrorCatch(error));
        } finally {
          setLoading(false);
        }
      };
      setLoading(true);
      fetchLists();
    } else {
      setLists(storedLists);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceId]);

  const handleCreateList = async () => {
    const res = await dispatch(
      createList({
        listData: { name: "New List" },
        onSuccess() {
          toast({ description: "List created" });
        },
        spaceId: spaceId ? spaceId : spaceIdFromParams,
      })
    );
    if (createList.fulfilled.match(res)) {
      setLists((prev) => [...prev, res.payload.newList]);
    }
  };

  return (
    <Select value={status} onValueChange={(value) => setStatus(value)}>
      <SelectTrigger className="text-sm flex items-center gap-2 cursor-pointer w-[120px]">
        {status ? (
          <SelectValue>
            <span
              style={{
                color: lists.find((list) => list.id === status)?.color,
                borderColor: lists.find((list) => list.id === status)?.color,
              }}>
              {lists.find((list) => list.id === status)?.title}
            </span>
          </SelectValue>
        ) : (
          <SelectValue>Select Status</SelectValue>
        )}
      </SelectTrigger>
      <SelectContent className="task-details-section">
        {loading && <span className="text-sm">Loading...</span>}
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <SelectGroup>
          {lists.map((list) => (
            <SelectItem
              key={list.id}
              value={list.id}
              style={{
                color: list.color,
              }}>
              {list.title}
            </SelectItem>
          ))}
          <SelectSeparator />
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleCreateList}>
            New list +
          </Button>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
