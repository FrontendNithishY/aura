import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export default async function CommunityPage({ params }: { params: { community: string } }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
      },
    }
  );

  const { data: community } = await supabase
    .from('communities')
    .select('*')
    .eq('name', params.community)
    .single();

  if (!community) {
    notFound();
  }

  // Get members count (approx)
  const { count } = await supabase
    .from('community_members')
    .select('*', { count: 'exact', head: true })
    .eq('community_id', community.id);

  return (
    <div className={styles.container}>
      <header className={`${styles.header} glass-panel`}>
        <div className={styles.banner} style={{ backgroundImage: `url(${community.banner_url || ''})` }}>
          {!community.banner_url && <div className={styles.bannerPlaceholder}></div>}
        </div>
        
        <div className={styles.headerContent}>
          <div className={styles.avatarWrapper}>
            {community.avatar_url ? (
              <img src={community.avatar_url} alt={community.display_name} className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>{community.display_name.charAt(0)}</div>
            )}
          </div>
          
          <div className={styles.info}>
            <h1 className={styles.title}>{community.display_name}</h1>
            <p className={styles.handle}>a/{community.name}</p>
          </div>
          
          <div className={styles.actions}>
            <button className="btn-primary">Join Community</button>
          </div>
        </div>
      </header>

      <div className={styles.mainGrid}>
        <div className={styles.feed}>
          {/* Feed logic goes here */}
          <div className={`${styles.emptyState} glass-panel`}>
            <h2>Welcome to {community.display_name}</h2>
            <p>Be the first to share something with the community!</p>
            <button className="btn-primary" style={{marginTop: '1rem'}}>Create Post</button>
          </div>
        </div>
        
        <aside className={styles.sidebar}>
          <div className={`${styles.widget} glass-panel`}>
            <h3 className={styles.widgetTitle}>About Community</h3>
            <p className={styles.description}>{community.description || 'No description provided.'}</p>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{count || 0}</span>
                <span className={styles.statLabel}>Members</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>
                  {community.pulse_score > 0 ? (
                    <span className={styles.pulseActive}>● Live</span>
                  ) : 'Quiet'}
                </span>
                <span className={styles.statLabel}>Pulse</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
