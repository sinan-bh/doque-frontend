import { useParams } from "next/navigation";
import React from "react";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function SubscriptionBtn() {
  const { workSpaceId }: { workSpaceId: string } = useParams();
  const router = useRouter();

  const handlePlans = () => {
    router.push("/pricing");
  };

  if (workSpaceId) return null;

  return (
    <button onClick={handlePlans}>
      <h1 className="bg-violet-900 p-2 text-violet-300 rounded-3xl flex items-center gap-2 hover:bg-violet-800">
        <BsStars />
        <span className="text-sm hidden md:inline px-1"> Upgrade </span>
      </h1>
    </button>
  );
}
