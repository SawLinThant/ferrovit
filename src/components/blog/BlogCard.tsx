import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  slug: string;
}

const BlogCard = ({ image, title, excerpt, slug }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          href={`/blogs/${slug}`}
          className="text-red-600 font-semibold text-sm hover:text-red-700"
        >
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 