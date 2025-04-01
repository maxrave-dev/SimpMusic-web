"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/custom/BlogCard';
import { Input, Select, SelectItem } from "@nextui-org/react";
import { FaSearch } from 'react-icons/fa';

const categories = ['All', 'Guides', 'Updates', 'Tips & Tricks'];

export default function BlogsFilter({ blogs, defaultImage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<FaSearch className="text-gray-400" />}
          className="max-w-sm"
        />
        <Select
          placeholder="Select category"
          selectedKeys={[selectedCategory]}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="max-w-xs"
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.$id}>
            <BlogCard
              key={blog.$id}
              title={blog.title}
              excerpt={blog.excerpt}
              imageUrl={blog.imageUrl || defaultImage}
              date={new Date(blog.$createdAt).toLocaleDateString('en-US')}
              slug={blog.slug}
              category={blog.category}
            />
          </Link>
        ))}
      </div>
      
      {filteredBlogs.length === 0 && (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">No posts found</h2>
          <p>Please try a different search term or category.</p>
        </div>
      )}
    </>
  );
} 