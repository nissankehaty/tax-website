import React from "react";
import { TextInput } from "./TextInput";

// Helper to format a number string into currency
export const formatCurrency = (value: string | number | undefined | null) => {
  const numericString = String(value ?? "").replace(/[^\d.]/g, "");
  if (!numericString) return "";
  const number = parseFloat(numericString);
  if (isNaN(number)) return "";
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

interface DollarInputProps {
  label: string;
  name: string;
  value: string | number | undefined | null;
  onChange: (value: string) => void;
  error?: string;
}

export const DollarInput: React.FC<DollarInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
}) => {
  const handleChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d.]/g, ""); // strip non-numeric
    onChange(cleaned);
  };

  return (
    <TextInput
      label={label}
      name={name}
      value={formatCurrency(value)}
      onChange={handleChange}
      error={error}
    />
  );
};