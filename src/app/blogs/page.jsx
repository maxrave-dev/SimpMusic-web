import React from 'react';
import Link from 'next/link';
import BlogCard from '@/components/custom/BlogCard';
import { databases, COLLECTION_ID, DATABASE_ID, Query } from '@/lib/appwrite';
import BlogsFilter from '@/components/custom/BlogsFilter';

const DEFAULT_IMAGE = '/images/blog/placeholder.png'; // Placeholder image

async function getBlogPosts() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.orderDesc('createdAt')]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8 lg:px-16 md:px-16 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
          Blog
        </h1>
        
        <BlogsFilter blogs={blogs} defaultImage={DEFAULT_IMAGE} />
      </div>
    </div>
  );
} 