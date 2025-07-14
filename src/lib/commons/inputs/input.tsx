"use client";
import React from "react";

export default function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-sm">{label}</label>
      <input {...props} className="border px-3 py-2 rounded" />
    </div>
  );
}
