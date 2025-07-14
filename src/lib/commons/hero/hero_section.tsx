import React from "react";

export default function HeroSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
    </section>
  );
}
