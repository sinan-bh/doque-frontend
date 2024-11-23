"use client";

import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import axiosInstance from '@/utils/axios';

const stripePromise = loadStripe('pk_test_51QNSGa07IAufddS57aCaBozzl6TaUiu20PVGln0tNiOiieK8npC84tn5VckmsT7D2MGcjQLEo60mhPcshOUEqDqD00UmwkmR7n');


export default function StripePayment({ plan }: {
  plan: {
    amount: number,
    name: string
  }
}) {
  const fetchClientSecret = async () => {
    const { data } = await axiosInstance.post("/payment/create-payment-intent", {
      amount: plan.amount,
      subscription: plan.name,
      currency: "inr",
    });
    return data?.data?.clientSecret;
  };

  const options = { fetchClientSecret };


  return (
    <div className='min-h-screen w-screen absolute top-0 left-0 bg-white  z-10 '>
      <div className="m-auto max-w-md p-5 bg-white my-2 rounded-md overflow-auto" >
        <h1 className="text-2xl py-3 text-center ">Payment</h1>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

