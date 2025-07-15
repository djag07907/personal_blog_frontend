import Link from "next/link";
import React from "react";

const categories = [
  { name: "Style", href: "/blog?cat=style", bgColor: "bg-[#57c4ff31]" },
  { name: "Fashion", href: "/blog", bgColor: "bg-[#da85c731]" },
  { name: "Food", href: "/blog", bgColor: "bg-[#7fb88133]" },
  { name: "Travel", href: "/blog", bgColor: "bg-[#ff795736]" },
  { name: "Culture", href: "/blog", bgColor: "bg-[#ffb04f45]" },
  { name: "Coding", href: "/blog", bgColor: "bg-[#5e4fff31]" },
];

const MenuCategories = () => {
  return (
    <div className="mt-9 mb-15 flex flex-wrap gap-5">
      {categories.map(({ name, href, bgColor }) => (
        <Link
          key={name}
          href={href}
          className={`px-6 py-2 rounded-lg text-sm ${bgColor}`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
