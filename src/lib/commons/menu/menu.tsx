import React from "react";
import MenuPosts from "@/lib/commons/menu/menu_posts";
import MenuCategories from "@/lib/commons/menu/menu_categories";
import EditorPickPosts from "@/lib/commons/menu/editor_pick_posts";

const Menu = () => {
  return (
    <div className="flex-1 p-6">
      {/* What's hot */}
      <h2 className="text-lg font-semibold text-gray-600 mb-1">
        {"What's hot"}
      </h2>
      <h1 className="text-3xl font-bold mb-6">Most Popular</h1>
      <MenuPosts withImage={false} />

      {/* Discover by topic */}
      <h2 className="text-lg font-semibold text-gray-600 mt-12 mb-1">
        Discover by topic
      </h2>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <MenuCategories />

      {/* Chosen by the editor */}
      <h2 className="text-lg font-semibold text-gray-600 mt-12 mb-1">
        Chosen by the editor
      </h2>
      <h1 className="text-3xl font-bold mb-6">Editors Pick</h1>
      <EditorPickPosts withImage={true} />
    </div>
  );
};

export default Menu;
