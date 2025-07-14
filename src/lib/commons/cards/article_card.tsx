export default function ArticleCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 transition hover:shadow-lg cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
