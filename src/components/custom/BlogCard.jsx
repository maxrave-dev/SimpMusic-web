import React from 'react';
import Image from 'next/image';
import { Badge } from "@nextui-org/react";

const DEFAULT_IMAGE = '/images/blog/placeholder.jpg'; // Placeholder image

const BlogCard = ({ title, excerpt, imageUrl, date, category }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-48 md:h-52 lg:h-56 flex-shrink-0">
        <Image
          src={imageUrl || DEFAULT_IMAGE}
          alt={title}
          fill
          className="object-cover"
        />
        {category && (
          <div className="absolute top-4 left-4 bg-gradientend/80 text-white text-xs font-bold px-3 py-1 rounded-full">
            {category}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      </div>
    </div>
  );
};

export default BlogCard; 