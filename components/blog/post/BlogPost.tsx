import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Markdown from 'react-markdown';
import { Post } from '@/types/post';

interface BlogPostProps {
  post: Post;  // Receives ONE complete post
}

export default function BlogPost({ post }: BlogPostProps){
     const posts = getAllPosts();
    return(
       <article>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
      </header>
      
      <div className="prose prose-lg">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
    )
}