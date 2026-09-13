import { redirect } from 'next/navigation';
import { checkAdmin } from '@/lib/supabase/admin';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Shield, Users, AlertTriangle, Activity } from 'lucide-react';
import styles from './page.module.css';

export default async function AdminDashboard() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    redirect('/'); // Kick out non-admins
  }

  // Fetch some basic stats
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

  const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: communitiesCount } = await supabase.from('communities').select('*', { count: 'exact', head: true });

  // Get a list of recent users for the moderation table
  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('id, username, display_name, role, is_premium, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Shield size={32} className={styles.shieldIcon} />
        <div>
          <h1 className={styles.title}>Admin Control Center</h1>
          <p className={styles.subtitle}>Supervise users, communities, and content.</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass-panel`}>
          <Users className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Users</span>
            <span className={styles.statValue}>{usersCount || 0}</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} glass-panel`}>
          <Activity className={styles.statIcon} style={{color: 'var(--color-success)'}} />
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Communities</span>
            <span className={styles.statValue}>{communitiesCount || 0}</span>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel`}>
          <AlertTriangle className={styles.statIcon} style={{color: 'var(--color-warning)'}} />
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Pending Reports</span>
            <span className={styles.statValue}>0</span>
          </div>
        </div>
      </div>

      <div className={`${styles.tablePanel} glass-panel`}>
        <div className={styles.panelHeader}>
          <h2>Recent Users</h2>
          <button className="btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>View All</button>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Premium</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers?.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.userAvatar}>{user.display_name?.charAt(0) || 'U'}</div>
                      <div className={styles.userDetails}>
                        <span className={styles.userName}>{user.display_name}</span>
                        <span className={styles.userHandle}>@{user.username}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.roleBadge} ${user.role === 'admin' ? styles.roleAdmin : ''}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.is_premium ? 'Yes' : 'No'}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button className={styles.actionBtn}>Ban</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!recentUsers?.length && (
                <tr>
                  <td colSpan={5} className={styles.emptyCell}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
