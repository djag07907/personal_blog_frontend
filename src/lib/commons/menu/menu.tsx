import React from "react";
import MenuCategories from "@/lib/commons/menu/menu_categories";
import EditorPickPosts from "@/lib/commons/menu/editor_pick_posts";
import MostPopularPosts from "@/lib/commons/menu/most_popular_posts";

type MenuLayout = "homepage" | "article";

interface MenuProps {
  layout?: MenuLayout;
}

const Menu = ({ layout = "homepage" }: MenuProps) => {
  return (
    <div className={layout === "homepage" ? "flex-1 p-6" : "w-full p-4 lg:p-6"}>
      <h2 className="text-lg font-semibold text-gray-600 mb-1">
        {"What's hot"}
      </h2>
      <h1
        className={
          layout === "homepage"
            ? "text-3xl font-bold mb-6"
            : "text-2xl lg:text-3xl font-bold mb-6"
        }
      >
        Most Popular
      </h1>
      <MostPopularPosts withImage={true} layout={layout} />

      <h2 className="text-lg font-semibold text-gray-600 mt-12 mb-1">
        Discover by topic
      </h2>
      <h1
        className={
          layout === "homepage"
            ? "text-3xl font-bold mb-6"
            : "text-2xl lg:text-3xl font-bold mb-6"
        }
      >
        Categories
      </h1>
      <MenuCategories />

      <h2 className="text-lg font-semibold text-gray-600 mt-12 mb-1">
        Chosen by the editor
      </h2>
      <h1
        className={
          layout === "homepage"
            ? "text-3xl font-bold mb-6"
            : "text-2xl lg:text-3xl font-bold mb-6"
        }
      >
        Editors Pick
      </h1>
      <EditorPickPosts withImage={true} layout={layout} />
    </div>
  );
};

export default Menu;
