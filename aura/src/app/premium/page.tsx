import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function PremiumPage() {
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

  // Check if user is already premium
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_premium')
    .eq('id', user.id)
    .single();

  const isPremium = profile?.is_premium;

  async function upgradeToPremium(formData: FormData) {
    'use server';
    
    const key = formData.get('accessKey') as string;
    
    if (key === 'ADMIN26') {
      const cookieStore = cookies();
      const supabaseServer = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) { return cookieStore.get(name)?.value; },
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.delete({ name, ...options });
            }
          },
        }
      );

      const { data: { user } } = await supabaseServer.auth.getUser();
      
      if (user) {
        await supabaseServer
          .from('profiles')
          .update({ is_premium: true })
          .eq('id', user.id);
      }
      
      redirect('/premium?success=true');
    } else {
      redirect('/premium?error=Invalid access key');
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.premiumCard} glass-panel`}>
        <div className={styles.header}>
          <span className={styles.badge}>Aura Premium</span>
          <h1 className={styles.title}>Unlock the Full Experience</h1>
          <p className={styles.subtitle}>
            Get exclusive badges, custom anonymous aliases, ad-free browsing, and advanced analytics.
          </p>
        </div>

        {isPremium ? (
          <div className={styles.activeState}>
            <div className={styles.successIcon}>✓</div>
            <h2>You are Premium!</h2>
            <p>Enjoy your exclusive features across the platform.</p>
          </div>
        ) : (
          <form className={styles.form} action={upgradeToPremium}>
            <div className={styles.inputGroup}>
              <label htmlFor="accessKey" className={styles.label}>Have an Access Key?</label>
              <input
                id="accessKey"
                name="accessKey"
                type="text"
                className={styles.input}
                placeholder="Enter access key"
                required
              />
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
              Activate Premium
            </button>
            <p className={styles.hint}>Hint: Use ADMIN26</p>
          </form>
        )}
      </div>
    </div>
  );
}
