// import Link from "next/link";
// import Image from "next/image";

// interface Props {
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

// export default function ArticleCard({
//   id,
//   title,
//   description,
//   slug,
//   image,
//   publishedAt,
//   category,
// }: Props) {
//   return (
//     <div key={id} className="mb-12 flex items-center gap-12">
//       {/* Image - Hidden on smaller screens */}
//       {image?.url && (
//         <div className="relative flex-1 h-[350px] hidden xl:block">
//           <Image
//             src={image.url.startsWith("/") ? image.url : "/" + image.url}
//             alt={title}
//             fill
//             className="object-cover rounded-md"
//           />
//         </div>
//       )}

//       {/* Text Content */}
//       <div className="flex-1 flex flex-col gap-6">
//         <div className="text-gray-500 text-sm">
//           <span>
//             {publishedAt ? publishedAt.substring(0, 10) : "Unknown date"}
//           </span>{" "}
//           —{" "}
//           <span className="text-red-600 font-medium">
//             {category || "Uncategorized"}
//           </span>
//         </div>

//         <Link href={`/posts/${slug}`}>
//           <h1 className="text-2xl font-bold hover:underline">{title}</h1>
//         </Link>

//         <div
//           className="text-base font-light text-[18px] text-gray-600 dark:text-gray-400"
//           dangerouslySetInnerHTML={{
//             __html: description.substring(0, 60),
//           }}
//         />

//         <Link
//           href={`/posts/${slug}`}
//           className="border-b border-red-600 text-red-600 w-max pb-[2px] hover:opacity-80 transition"
//         >
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// }
