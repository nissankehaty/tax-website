import React from "react";

interface DateInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="date"
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);