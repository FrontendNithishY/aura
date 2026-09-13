import styles from '../page.module.css';

export default function DiscoverPage() {
  return (
    <div className={styles.container}>
      <header className={`${styles.header} glass-panel`}>
        <h1 style={{padding: '1rem'}}>Discover</h1>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Trending</button>
          <button className={styles.tab}>Top Communities</button>
          <button className={styles.tab}>Users to Follow</button>
        </div>
      </header>

      <div className={styles.feed}>
        <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
          <h2>Explore the Aura Network</h2>
          <p style={{color: 'var(--color-text-muted)'}}>Find new communities and interesting posts tailored to your vibes.</p>
        </div>
      </div>
    </div>
  );
}
