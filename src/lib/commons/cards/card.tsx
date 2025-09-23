"use client";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes/routes";
import { useState } from "react";

interface CardItem {
  id: string;
  title: string;
  desc: string;
  slug: string;
  createdAt: string;
  catSlug: string;
  img?: string;
}

const Card = ({ item }: { item: CardItem }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div
      className="mb-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
      key={item.id}
    >
      {item.img && !imageError && (
        <div className="relative h-[250px] md:h-[300px] lg:h-[350px] w-full md:flex-1">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
          )}
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-cover rounded"
            onError={handleImageError}
            onLoad={handleImageLoad}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvND6v8A/9k="
          />
        </div>
      )}
      {item.img && imageError && (
        <div className="relative h-[250px] md:h-[300px] lg:h-[350px] w-full md:flex-1">
          <div className="flex items-center justify-center h-full bg-gray-100 rounded">
            <span className="text-gray-400 text-sm">Image not available</span>
          </div>
        </div>
      )}
      <div className="w-full md:flex-1 flex flex-col gap-4 md:gap-8">
        <div className="text-sm text-gray-500 font-medium">
          <span>{item.createdAt.substring(0, 10)} - </span>
          <span className="text-crimson">{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1 className="text-xl md:text-2xl font-bold leading-tight">
            {item.title}
          </h1>
        </Link>
        <div
          className="text-sm md:text-base font-light text-muted"
          dangerouslySetInnerHTML={{ __html: item.desc.substring(0, 60) }}
        />
        <Link
          href={routes.post(item.slug)}
          className="border-b border-crimson w-max py-0.5 text-crimson"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
export default Card;
