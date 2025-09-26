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
      <h2 className="text-lg font-semibold text-muted mb-1 drop-shadow-sm">
        What's hot
      </h2>
      <h1
        className={
          layout === "article"
            ? "text-3xl font-bold mb-6 drop-shadow-sm"
            : "text-2xl lg:text-3xl font-bold mb-6 drop-shadow-sm"
        }
      >
        Most Popular
      </h1>
      <MostPopularPosts withImage={true} layout={layout} />

      <h2 className="text-lg font-semibold text-muted mt-12 mb-1 drop-shadow-sm">
        Chosen by the editor
      </h2>
      <h1
        className={
          layout === "article"
            ? "text-3xl font-bold mb-6 drop-shadow-sm"
            : "text-2xl lg:text-3xl font-bold mb-6 drop-shadow-sm"
        }
      >
        Editor's Pick
      </h1>
      <MenuCategories />

      <h2 className="text-lg font-semibold text-muted mt-12 mb-1 drop-shadow-sm">
        Categories
      </h2>
      <h1
        className={
          layout === "article"
            ? "text-3xl font-bold mb-6 drop-shadow-sm"
            : "text-2xl lg:text-3xl font-bold mb-6 drop-shadow-sm"
        }
      >
        Discover by topic
      </h1>
      <EditorPickPosts withImage={true} layout={layout} />
    </div>
  );
};

export default Menu;
