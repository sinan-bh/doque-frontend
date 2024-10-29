"use client";

import Image from "next/image";
import { FaTasks } from "react-icons/fa";

interface Option {
  label: string;
}

interface OnboardingProps {
  onContinue: (option: string) => void;
}

const options: Option[] = [
  { label: "Personal Tasks" },
  { label: "Work Projects" },
  { label: "Team Collaboration" },
  { label: "Other" },
];

export default function Onboarding({ onContinue }: OnboardingProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="absolute top-0 left-0 w-full py-6 flex justify-between items-center px-4 md:px-10">
        <div className="flex items-center space-x-2">
          <FaTasks className="text-2xl text-black" />
          <h1 className="font-megrim text-black font-bold text-2xl">DOQUE</h1>
        </div>
      </header>

      <div className="flex-grow flex flex-col justify-center items-center md:flex-row md:justify-between mt-16 px-4 md:px-24">
        <div className="w-full md:w-1/3 p-6 md:p-8 bg-transparent space-y-6 md:space-y-8 text-center md:text-left">
          <h2 className="text-xl text-black">
            What type of tasks are you managing?
          </h2>

          <div className="space-y-4">
            {options.map((option) => (
              <button
                key={option.label}
                onClick={() => onContinue(option.label)}
                className="w-full py-3 px-6 text-center bg-transparent text-black rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                {option.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onContinue("Skipped")}
            className="mt-6 text-gray-500 hover:text-gray-800 underline">
            Skip
          </button>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center mt-8 md:mt-0">
          <Image
            width={1024}
            height={768}
            src="/images/onboarding1.jpg"
            alt="Onboarding Illustration"
            className="rounded-full shadow-lg w-72 h-72 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
