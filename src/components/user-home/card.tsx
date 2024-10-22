import React from "react";

interface CardProps {
  title: string;
  description?: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-36">
        <div className="absolute inset-0 flex items-center justify-center border-2">
          <h2 className="text-gray-800 font-bold text-xl">{title}</h2>
        </div>
      </div>
      {description && (
        <p className="text-gray-600 text-sm text-center mt-2">{description}</p>
      )}
    </div>
  );
}
