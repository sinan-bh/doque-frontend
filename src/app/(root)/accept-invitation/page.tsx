import Acceptinvitation from "@/components/navbar/accept-invitation";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense>
        <Acceptinvitation />
      </Suspense>
    </div>
  );
}
