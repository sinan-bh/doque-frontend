import { Input } from "@/components/ui/input";
import { getRemainingTime } from "@/utils/space-utils";
import moment from "moment";

export default function DueDatePicker({
  dueDate,
  setDueDate,
}: {
  dueDate: string | undefined;
  setDueDate: (date: string) => void;
}) {
  const remainingTime = getRemainingTime(dueDate);

  return (
    <div>
      <p>
        Due Date
        <span className="text-xs text-gray-600">
          {!dueDate && " (Not set)"}
        </span>
        {dueDate && (
          <span className={`text-sm ml-2 ${remainingTime?.color}`}>
            {remainingTime?.text}
          </span>
        )}
      </p>

      <Input
        className={`task-details-section ${remainingTime?.border} dark:${remainingTime?.border}`}
        type="datetime-local"
        value={dueDate ? moment(dueDate).format("YYYY-MM-DDTHH:mm") : ""}
        onChange={(e) => {
          const localDate = e.target.value;
          const isoDate = moment(localDate).toISOString();
          setDueDate(isoDate);
        }}
      />
    </div>
  );
}
