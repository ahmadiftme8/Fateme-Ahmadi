import styles from './BlogPostList.module.css'
import { Post } from '@/types/post';
import BlogCard from '../card/BlogCard'

interface BlogPostListProps {
  posts: Post[];  // Receives ARRAY of posts
}

export default function PostList({ posts }: BlogPostListProps){
    
    return(
        <div className={styles['postsWrapper']}>

                {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />  // Each post goes to ONE card
                ))}
            
        </div>
    )
}