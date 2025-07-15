import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="mt-8">
      <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[72px] xl:text-[96px] font-light">
        <b className="font-bold">Hey, Daniel here!</b> Discover my stories and
        creative ideas.
      </h1>

      <div className="mt-16 flex items-center gap-12 max-[1024px]:flex-col">
        {/* Image Container */}
        <div className="relative h-[500px] flex-1 max-[1024px]:hidden">
          <Image
            src="/instagram.png"
            alt="Featured"
            fill
            className="object-cover rounded-md"
          />
        </div>

        {/* Text Container */}
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl md:text-4xl font-bold">
            Lorem ipsum dolor sit amet alim consectetur adipisicing elit.
          </h1>
          <p className="text-lg font-light text-[color:var(--softTextColor)]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <button className="px-5 py-4 rounded bg-gray-200 text-sm font-medium hover:opacity-90 transition">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
