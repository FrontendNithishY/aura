import Link from 'next/link';
import { Home, Compass, PlusSquare, Bell, User } from 'lucide-react';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`${styles.sidebar} glass-panel`}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.brandName}>Aura</span>
          </Link>
        </div>

        <nav className={styles.navLinks}>
          <Link href="/" className={styles.navItem}>
            <Home className={styles.icon} />
            <span className={styles.label}>Home</span>
          </Link>
          <Link href="/discover" className={styles.navItem}>
            <Compass className={styles.icon} />
            <span className={styles.label}>Discover</span>
          </Link>
          <Link href="/notifications" className={styles.navItem}>
            <Bell className={styles.icon} />
            <span className={styles.label}>Notifications</span>
          </Link>
          <Link href="/profile" className={styles.navItem}>
            <User className={styles.icon} />
            <span className={styles.label}>Profile</span>
          </Link>
        </nav>

        <div className={styles.createBtnWrapper}>
          <Link href="/create">
            <button className={`${styles.createBtn} btn-primary`}>
              <PlusSquare className={styles.icon} />
              <span className={styles.label}>Create</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className={`${styles.mobileNav} glass-panel`}>
        <Link href="/" className={styles.mobileNavItem}>
          <Home className={styles.icon} />
        </Link>
        <Link href="/discover" className={styles.mobileNavItem}>
          <Compass className={styles.icon} />
        </Link>
        <Link href="/create" className={styles.mobileNavItemCreate}>
          <div className={styles.createCircle}>
            <PlusSquare className={styles.createIcon} />
          </div>
        </Link>
        <Link href="/notifications" className={styles.mobileNavItem}>
          <Bell className={styles.icon} />
        </Link>
        <Link href="/profile" className={styles.mobileNavItem}>
          <User className={styles.icon} />
        </Link>
      </nav>
    </>
  );
}
