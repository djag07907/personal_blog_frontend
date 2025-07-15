// import React from "react";
// import ArticleCard from "../cards/article_card";
// import { emptyString } from "@/lib/constants/constants";
// import Pagination from "../pagination/pagination";

// interface Article {
//   id: number;
//   title: string;
//   description: string;
//   content: string;
//   slug: string;
//   image: {
//     url: string;
//   };
//   publishedAt: string;
//   category: string;
// }

// export default function ArticlesGrid({
//   articles,
// }: {
//   articles: Pick<Article, "title" | "description" | "image">[];
// }) {
//   return (
//     <div className="flex-1 pt-10">
//       <h1 className="text-[28px] font-bold text-[var(--textColor)] mb-[50px] sm:text-[24px]">
//         Recent Posts
//       </h1>
//       <div className="flex flex-col gap-[50px]">
//         {articles.map((article, index) => (
//           <ArticleCard
//             key={index}
//             id={0}
//             content={emptyString}
//             slug={emptyString}
//             publishedAt={emptyString}
//             category={emptyString}
//             {...article}
//             image={article.image}
//           />
//         ))}
//       </div>
//       {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
//     </div>
//   );
// }
