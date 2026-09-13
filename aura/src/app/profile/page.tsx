import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Settings, Bookmark, Shield, Award } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default async function ProfilePage() {
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

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div className={styles.container}>
      <header className={`${styles.header} glass-panel`}>
        <div className={styles.banner}></div>
        <div className={styles.headerContent}>
          <div className={styles.avatarWrapper}>
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.display_name} className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>{profile.display_name?.charAt(0) || 'U'}</div>
            )}
          </div>
          
          <div className={styles.info}>
            <div className={styles.nameRow}>
              <h1 className={styles.title}>{profile.display_name}</h1>
              {profile.is_premium && <span className={styles.premiumBadge} title="Aura Premium">✦</span>}
            </div>
            <p className={styles.handle}>@{profile.username}</p>
            <p className={styles.bio}>{profile.bio || "No bio provided."}</p>
            
            {profile.anonymous_alias && (
              <p className={styles.aliasInfo}>
                <Shield size={14} /> Secret Alias: <strong>{profile.anonymous_alias}</strong>
              </p>
            )}
          </div>

          <div className={styles.actions}>
            <Link href="/settings">
              <button className={`btn-primary ${styles.editBtn}`}><Settings size={18} /> Edit Profile</button>
            </Link>
          </div>
        </div>
        
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Posts</button>
          <button className={styles.tab}>Comments</button>
          <button className={styles.tab}>Saved</button>
        </div>
      </header>

      <div className={styles.mainGrid}>
        <div className={styles.feed}>
          <div className={`${styles.emptyState} glass-panel`}>
            <h2>You haven't posted anything yet.</h2>
            <p>Share your thoughts with the community!</p>
          </div>
        </div>
        
        <aside className={styles.sidebar}>
          <div className={`${styles.widget} glass-panel`}>
            <h3 className={styles.widgetTitle}>Reputation <Award size={18} className={styles.icon} /></h3>
            
            <div className={styles.repList}>
              <div className={styles.repItem}>
                <span className={styles.repLabel}>Helpful</span>
                <span className={styles.repValue}>{profile.reputation_helpful}</span>
              </div>
              <div className={styles.repItem}>
                <span className={styles.repLabel}>Creative</span>
                <span className={styles.repValue}>{profile.reputation_creative}</span>
              </div>
              <div className={styles.repItem}>
                <span className={styles.repLabel}>Funny</span>
                <span className={styles.repValue}>{profile.reputation_funny}</span>
              </div>
              <div className={styles.repItem}>
                <span className={styles.repLabel}>Knowledgeable</span>
                <span className={styles.repValue}>{profile.reputation_knowledgeable}</span>
              </div>
              <div className={styles.repItem}>
                <span className={styles.repLabel}>Builder</span>
                <span className={styles.repValue}>{profile.reputation_builder}</span>
              </div>
            </div>
          </div>

          <div className={`${styles.widget} glass-panel`}>
            <Link href="/bookmarks" className={styles.widgetLink}>
              <Bookmark size={18} className={styles.icon} />
              <span>My Bookmarks</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
