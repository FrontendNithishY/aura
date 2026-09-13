import styles from './page.module.css';
import Link from 'next/link';
import StoriesBar from '@/components/Feed/StoriesBar';
import CreatePost from '@/components/Feed/CreatePost';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={`${styles.header} glass-panel`}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>For You</button>
          <button className={styles.tab}>Following</button>
          <button className={styles.tab}>Latest</button>
          <button className={styles.tab}>Trending</button>
        </div>
      </header>

      <div className={styles.feed}>
        <StoriesBar />
        <CreatePost />
        
        {/* Placeholder Post Card */}
        <article className={`${styles.postCard} glass-panel`}>
          <div className={styles.postHeader}>
            <div className={styles.avatar}></div>
            <div className={styles.meta}>
              <div className={styles.author}>
                <span className={styles.name}>System Admin</span>
                <span className={styles.badge}>Premium</span>
              </div>
              <span className={styles.time}>2 hours ago</span>
            </div>
            <button className={styles.moreBtn}>•••</button>
          </div>
          
          <div className={styles.postContent}>
            <p>Welcome to Aura! This is the beginning of a modern social community platform. Start creating communities, sharing your thoughts, and connecting with others.</p>
          </div>
          
          <div className={styles.postFooter}>
            <div className={styles.actionGroup}>
              <button className={styles.actionBtn}>▲</button>
              <span>42</span>
              <button className={styles.actionBtn}>▼</button>
            </div>
            <button className={styles.actionBtn}>💬 12 Comments</button>
            <button className={styles.actionBtn}>🔁 Repost</button>
            <button className={styles.actionBtn}>↗️ Share</button>
          </div>
        </article>
      </div>

      <aside className={styles.rightSidebar}>
        <div className={`${styles.widget} glass-panel`}>
          <h3 className={styles.widgetTitle}>Trending Communities</h3>
          <ul className={styles.communityList}>
            <li>
              <div className={styles.communityIcon}>T</div>
              <div className={styles.communityInfo}>
                <span className={styles.communityName}>a/Technology</span>
                <span className={styles.communityMembers}>1.2M members</span>
              </div>
              <button className="btn-accent" style={{padding: '0.25rem 0.75rem', fontSize: '0.875rem'}}>Join</button>
            </li>
            <li>
              <div className={styles.communityIcon} style={{backgroundColor: 'var(--color-coral)'}}>C</div>
              <div className={styles.communityInfo}>
                <span className={styles.communityName}>a/Creative</span>
                <span className={styles.communityMembers}>850k members</span>
              </div>
              <button className="btn-accent" style={{padding: '0.25rem 0.75rem', fontSize: '0.875rem'}}>Join</button>
            </li>
          </ul>
        </div>
        
        <div className={`${styles.widget} glass-panel`}>
          <h3 className={styles.widgetTitle}>Go Premium</h3>
          <p className={styles.widgetText}>Get custom themes, badges, and advanced analytics.</p>
          <Link href="/premium">
            <button className="btn-primary" style={{width: '100%', marginTop: '1rem'}}>
              Upgrade to Premium
            </button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
