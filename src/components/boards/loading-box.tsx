import { ClipLoader } from "react-spinners";

export default function LoadingBox({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) {
  if (!loading) return null;

  return (
    <div className="flex text-xs gap-2 justify-between items-center bg-gray-100 dark:border-zinc-700 dark:bg-zinc-950 py-2 px-4 border rounded-sm shadow-sm">
      <p className="text-gray-700 dark:text-gray-300 ">{text}</p>
      <ClipLoader size={15} color="#888" speedMultiplier={0.5} />
    </div>
  );
}
