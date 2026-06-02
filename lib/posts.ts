import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Get all post slugs
export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(postsDirectory);
  return files.map(file => file.replace(/\.md$/, ''));
}

// Get single post by slug
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content,
  };
}

// Get all posts (for listing page)
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map(slug => getPostBySlug(slug));
  
  // Sort by date (newest first)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}