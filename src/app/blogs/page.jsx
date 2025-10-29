import React from 'react';
import { databases, COLLECTION_ID, DATABASE_ID, Query } from '@/lib/appwrite';
import BlogsFilter from '@/components/custom/BlogsFilter';

export const metadata = {
  title: "Blog - SimpMusic",
  description: "Read the latest news and updates about SimpMusic - A simple music app using YouTube Music for backend",
  openGraph: {
    title: "Blog - SimpMusic",
    description: "Read the latest news and updates about SimpMusic - A simple music app using YouTube Music for backend",
    images: [
      {
        url: "/images/blog/feature.jpg",
        width: 1200,
        height: 630,
        alt: "SimpMusic - Feel free when playing music",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - SimpMusic",
    description: "Read the latest news and updates about SimpMusic - A simple music app using YouTube Music for backend",
    images: ["/images/blog/feature.jpg"],
  },
};

const DEFAULT_IMAGE = '/images/blog/placeholder.png'; // Placeholder image

async function getBlogPosts() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.orderDesc('createdAt')]
    );
    console.log('getBlogPosts', response.documents);
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