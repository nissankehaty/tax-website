import React from "react";
import { TextInput } from "./TextInput";

export const formatCurrency = (value: string) => {
  const numeric = value.replace(/[^\\d.]/g, "");
  if (!numeric) return "";
  const number = parseFloat(numeric);
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

interface DollarInputProps {
  label: string;
  name: string;
  value: string;
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
    const stripped = raw.replace(/[^\\d.]/g, "");
    onChange(stripped);
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