import Image from "next/image";
import Link from "next/link";
import React from "react";

const categoryColors: Record<string, string> = {
  travel: "bg-[#ff7857]",
  culture: "bg-[#ffb14f]",
  food: "bg-[#7fb881]",
  fashion: "bg-[#ff7887]",
  coding: "bg-[#775aec]",
  style: "bg-[#789cff]",
};

const posts = [
  {
    category: "travel",
    title: "Lorem ipsum dolor sit amet consecteatur adipisicing elit.",
    username: "John Doe",
    date: "10.03.2023",
  },
  {
    category: "culture",
    title: "Lorem ipsum dolor sit amet consectetsur adipisicing elit.",
    username: "John Doe",
    date: "10.03.2023",
  },
  {
    category: "food",
    title: "Lorem ipsum dolor sit amet consectdfetur adipisicing elit.",
    username: "John Doe",
    date: "10.03.2023",
  },
  {
    category: "fashion",
    title: "Lorem ipsum dolor sit amet confsectetur adipisicing elit.",
    username: "John Doe",
    date: "10.03.2023",
  },
];

const MenuPosts = ({ withImage }: { withImage: boolean }) => {
  return (
    <div className="mt-9 mb-15 flex flex-col gap-9">
      {posts.map(({ category, title, username, date }) => (
        <Link href="/" key={title} className="flex items-center gap-5">
          {withImage && (
            <div className="flex-1 aspect-square relative">
              <Image
                src="/instagram.png"
                alt=""
                fill
                className="rounded-full border-3 border-gray-300 object-cover"
              />
            </div>
          )}

          <div className="flex-4 flex flex-col gap-1">
            <span
              className={`inline-block px-2 py-[2px] rounded-[10px] text-xs text-white w-max ${
                categoryColors[category] || "bg-gray-400"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <h3 className="text-lg font-medium text-gray-600">{title}</h3>
            <div className="text-xs text-gray-400">
              <span>{username}</span>
              <span> - {date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
