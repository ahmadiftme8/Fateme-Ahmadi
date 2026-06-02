// import { getTranslations } from "next-intl/server";
import BlogHero from "@/components/blog/hero/Hero";
import { getAllPosts } from '@/lib/posts';
import BlogPostList from "@/components/blog/list/BlogPostList";
import { PageTheme } from "@/components/utility/PageTheme";



export async function generateMetadata() {
    // const { locale } = await params;
    // const t = await getTranslations({ locale, namespace: "blog" });
    

    return {
        title: "Blog - Fateme Ahmadi",
    };
}

export default function BlogPage() {
    const posts = getAllPosts();  // Get ALL posts
    return (
        <>
        <PageTheme defaultTheme="dark" storageKey="fateme-theme-blog" />
        <main data-theme="dark" className="fullPageMain">
            <BlogHero/>
            <BlogPostList posts={posts}/>
        </main>
        
        
        </>
        
        
    );
}
