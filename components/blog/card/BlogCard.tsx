import styles from "./BlogCard.module.css"
import Link from 'next/link';
import { Post } from '@/types/post';

interface BlogCardProps {
  post: Post;  // Receives ONE post as prop
}

export default function BlogCard({ post }: BlogCardProps){
    
    return(

       <article className={styles['postCard']}>
                    <div className={styles['postHeader']} >
                        <Link href={`/blog/${post.slug}`}>
                            <h2 className={styles['postTitle']}>
                            {post.title}
                            </h2>
                        </Link>

                        <p  className={styles['postDetails']}>{post.date}</p>
                    </div>
                   
                    <p className={styles['postMainContent']}>{post.excerpt}</p>
                    <Link 
                        href={`/blog/${post.slug}`}
                        className={styles['readMoreBtn']}
                    >
                        Read more →
                    </Link>
                </article>
    )
}
