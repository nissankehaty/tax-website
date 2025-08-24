import React from "react";

interface CheckboxInputProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  name,
  checked,
  onChange,
  error,
}) => (
  <div className="mb-4">
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);