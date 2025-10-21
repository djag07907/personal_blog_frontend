"use client";

import { useContext } from "react";
import { ThemeContext } from "@/lib/commons/context/theme_context";

const ProfessionalHero = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  return (
    <section className="relative py-16 lg:py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -z-10" />
      <div className="absolute inset-0 opacity-20 dark:opacity-10 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-6 mt-12 lg:mt-16">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              <span
                className="block"
                style={{ color: isDark ? "white" : "#0f172a" }}
              >
                Web & Mobile Software Engineer
              </span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                and Tech Writer
              </span>
            </h1>
          </div>

          <p
            className="text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: isDark ? "#d1d5db" : "#334155" }}
          >
            I share practical insights on <strong>web</strong> and{" "}
            <strong>mobile development</strong> using modern technologies like{" "}
            <strong>Next.js</strong>, <strong>Flutter</strong>, and{" "}
            <strong>Strapi</strong>. From cross-platform mobile apps to scalable
            web applications and agile project management.
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {[
              "Flutter",
              "React",
              "React Native",
              "TypeScript",
              "Next.js",
              "Angular",
              "Strapi",
              "Node.js",
              "PostgreSQL",
              "Git",
              "Agile/Scrum",
              "Project Management",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHero;
