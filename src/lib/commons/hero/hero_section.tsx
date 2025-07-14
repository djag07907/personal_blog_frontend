export default function HeroSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="text-center py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <h1 className="text-5xl font-extrabold mb-4 tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </section>
  );
}
