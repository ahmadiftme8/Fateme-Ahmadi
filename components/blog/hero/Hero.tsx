//import { div } from "framer-motion/client";
import styles from "./Hero.module.css"

export default function BlogHero(){
    return(
        <div className={styles['herocontainer']}>
           
            <div className={styles['textsContainer']}>
                <h1 className={styles['herotitle']}>Blogate</h1>
                <p className={styles['herosubtitle']}>A Place To Write My Thoughts</p>
                
            </div>
            
        </div>
    )
}