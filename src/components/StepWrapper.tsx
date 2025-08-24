import React from "react";

interface StepWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({
  title,
  description,
  children,
}) => (
  <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md">
    <h2 className="text-2xl font-bold text-blue-700 mb-1">{title}</h2>
    {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
    {children}
  </div>
);