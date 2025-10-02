import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="mt-8">
      <h1 className="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] xl:text-[70px] font-light">
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
            Welcome to my digital space where ideas come to life
          </h1>
          <p className="text-lg font-light text-muted leading-relaxed">
            Join me on this journey of discovery as I share insights about web
            development, technology trends, and creative problem-solving. From
            frontend frameworks to backend architecture, let's explore the world
            of modern development together.
          </p>
          <button className="px-5 py-4 rounded bg-blue-800 text-sm font-medium hover:opacity-90 transition w-fit">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
