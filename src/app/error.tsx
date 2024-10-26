"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  const handleReload = () => {
    reset();
    window.location.reload();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#99B6DF] dark:bg-gray-800">
      <h1 className="text-4xl text-gray-700 dark:text-gray-500">
        Something Went <span className="text-5xl text-red-400">Wrong!</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-500 my-10">
        {error.message || "An unexpected error has occurred."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className=" text-black border border-gray-600 hover:border-white hover:text-white py-2 px-4 rounded transition dark:text-gray-400 dark:hover:text-white"
        >
          Try Again
        </button>
        <button
          onClick={handleReload}
          className="text-black border border-gray-600 hover:text-white hover:border-white py-2 px-4 rounded transition dark:text-gray-400 dark:hover:text-white"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
