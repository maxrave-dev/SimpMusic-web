'use server'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { databases, COLLECTION_ID, DATABASE_ID, Query } from '@/lib/appwrite';
import LanguageToggle from '@/components/custom/LanguageToggle';
import AuthorInfo from '@/components/custom/AuthorInfo';

const DEFAULT_IMAGE = '/images/blog/placeholder.png'; // Placeholder image

async function getBlogPost(slug) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('slug', slug)]
    );
    
    if (response.documents.length === 0) {
      return null;
    }
    
    return response.documents[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPost({ params }) {
  console.log('params', params);
  console.log('lang', params.slug[0]);
  console.log('slug', params.slug[1]);
  
  const blog = await getBlogPost(params.slug[1]);

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 lg:px-16 md:px-16 sm:px-10">
        <h1 className="text-4xl font-bold mb-8">Post not found</h1>
        <Link href="/blogs" className="text-blue-500 hover:underline">
          Back to blog list
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-16 md:px-16 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={blog.imageUrl || DEFAULT_IMAGE}
            alt={params.slug[0] === 'vi' ? blog.titleVn : blog.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
            {params.slug[0] === 'vi' ? blog.titleVn : blog.title}
          </h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
              <span>{new Date(blog.$createdAt).toDateString()}</span>
              <span>•</span>
              <span>{blog.category}</span>
            </div>
          </div>
          <AuthorInfo 
            author={{
              name: "Nguyen Duc Tuan Minh",
              role: "SimpMusic Developer"
            }}
          />
        </div>
        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:bg-clip-text prose-headings:text-transparent prose-headings:bg-gradient-to-r prose-headings:from-gradientstart/60 prose-headings:to-gradientend/60 prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg prose-pre:p-4 prose-blockquote:border-l-4 prose-blockquote:border-gradientstart/60 prose-blockquote:pl-4 prose-blockquote:italic">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {params.slug[0] === 'vi' ? blog.contentVn : blog.content}
          </ReactMarkdown>
        </article>
        <div className="mt-8">
          <Link href="/blogs" className="text-blue-500 hover:underline inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to blog list
          </Link>
        </div>
      </div>
    </div>
  );
} 