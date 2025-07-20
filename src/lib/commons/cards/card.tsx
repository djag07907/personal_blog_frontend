import Image from "next/image";
import Link from "next/link";
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
  return (
    <div className="mb-12 flex items-center gap-12" key={item.id}>
      {item.img && (
        <div className="relative h-[350px] flex-1 hidden xl:block">
          {" "}
          {/* Hide on smaller screens */}
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col gap-8">
        <div className="text-sm text-gray-500 font-medium">
          <span>{item.createdAt.substring(0, 10)} - </span>
          <span className="text-crimson">{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1 className="text-2xl font-bold leading-tight">{item.title}</h1>
        </Link>
        <div
          className="text-base font-light text-muted"
          dangerouslySetInnerHTML={{ __html: item.desc.substring(0, 60) }}
        />
        <Link
          href={`/posts/${item.slug}`}
          className="border-b border-crimson w-max py-0.5 text-crimson"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
export default Card;
