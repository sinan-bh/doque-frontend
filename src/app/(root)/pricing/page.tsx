"use client";

import StripePayment from '@/components/subscription/StripePayment';
import React, { useState } from 'react';
import { BsStars } from "react-icons/bs";
import { useRouter } from 'next/navigation';

const plans = {
  basic: 199,
  standard: 499,
  premium: 799
}

export default function Page() {
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof plans | null>(null);
  const router = useRouter();

  const openModal = (plan: keyof typeof plans) => {
    setSelectedPlan(plan);
  };


  const navigateToHome = () => {
    router.push('/u/home');
  };
  return (
    <div className="h-screen flex justify-center items-center p-6 bg-gradient-to-b from-gray-100 via-pink-100 to-blue-200">
      <div className="w-full max-w-5xl p-12 rounded-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-medium text-gray-800">Plan & Pricing</h1>
        </div>
        <div className="flex justify-end items-center relative top-5 right-16">
          <h1 className="bg-violet-900 p-2 text-violet-300 rounded-3xl flex items-center gap-2">
            <BsStars /> Most Popular
          </h1>
        </div>

        <div className="flex bg-gray-50 bg-opacity-50 rounded-3xl gap-6">
          <div className="p-8 rounded-xl flex-1 text-start">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              ₹0<span className="text-lg text-gray-500">/month</span>
            </div>
            <h2 className="font-extrabold text-xl mb-4">Free Plan</h2>
            <p className="text-gray-600 mb-4">Perfect for individuals or small teams just starting out.</p>
            <ul className="text-left mb-6 space-y-2">
              <li>- 5 Projects</li>
              <li>- 10 Spaces per Project</li>
            </ul>

            <button onClick={navigateToHome} className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600">
              Get started
            </button>
          </div>

          <div className="p-8 rounded-xl flex-1 text-start">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              ₹{plans.basic}<span className="text-lg text-gray-500">/month</span>
            </div>
            <h2 className="font-extrabold text-xl mb-4">Basic Plan</h2>
            <p className="text-gray-600 mb-4">Great for small teams or personal projects with a bit more complexity.</p>
            <ul className="text-left mb-6 space-y-2">
              <li>- 10 Projects</li>
              <li>- 25 Spaces per Project</li>
            </ul>

            <button onClick={() => openModal('basic')} className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600">
              Pay Now
            </button>
          </div>

          <div className="p-8 rounded-xl flex-1 text-start">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              ₹{plans.standard}<span className="text-lg text-gray-500">/month</span>
            </div>
            <h2 className="font-extrabold text-xl mb-4">Standard Plan</h2>
            <p className="text-gray-600 mb-4">Best for teams and small companies looking for enhanced features.</p>
            <ul className="text-left mb-6 space-y-2">
              <li>- 50 Projects</li>
              <li>- Unlimited Spaces</li>
            </ul>

            <button onClick={() => openModal('standard')} className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600">
              Pay Now
            </button>
          </div>

          <div className="p-8 rounded-xl flex-1 text-start">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              ₹{plans.premium}<span className="text-lg text-gray-500">/month</span>
            </div>
            <h2 className="font-extrabold text-xl mb-4">Premium Plan</h2>
            <p className="text-gray-600 mb-4">Ideal for enterprises that require full-featured task management.</p>
            <ul className="text-left mb-6 space-y-2">
              <li>- Unlimited Projects</li>
              <li>- Unlimited Spaces</li>
            </ul>

            <button onClick={() => openModal('premium')} className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600">
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {selectedPlan && <StripePayment plan={
        {
          amount: plans[selectedPlan],
          name: selectedPlan
        }
      } />}

    </div>
  );
}
