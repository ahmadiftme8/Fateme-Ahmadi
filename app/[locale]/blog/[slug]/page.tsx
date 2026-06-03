import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import Markdown from 'react-markdown';

export const dynamic = 'force-static';
export const revalidate = 3600;

// Slugs are combined with [locale] from app/[locale]/layout.tsx generateStaticParams
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Page component
export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  try {
    const post = getPostBySlug(slug);
    
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500">{post.date}</p>
          </header>
          
          <div className="prose prose-lg">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </main>
    );
  } catch (error) {
    notFound();
  }
}