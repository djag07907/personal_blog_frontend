"use client";
import React from "react";

export default function TextArea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-sm">{label}</label>
      <textarea {...props} className="border px-3 py-2 rounded resize-none" />
    </div>
  );
}
