import PaymentSuccess from "@/components/subscription/PaymentSuccess";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
