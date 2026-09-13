import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function CreateCommunityPage() {
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

  async function createCommunity(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const displayName = formData.get('displayName') as string;
    const description = formData.get('description') as string;
    
    const cookieStore = cookies();
    const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; }
        },
      }
    );

    const { data: { user } } = await supabaseServer.auth.getUser();
    
    if (!user) return;

    // Insert community
    const { data: community, error: communityError } = await supabaseServer
      .from('communities')
      .insert({
        name: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        display_name: displayName,
        description
      })
      .select()
      .single();

    if (communityError) {
      redirect(`/c/create?error=${communityError.message}`);
    }

    // Add user as admin
    if (community) {
      await supabaseServer
        .from('community_members')
        .insert({
          community_id: community.id,
          user_id: user.id,
          role: 'admin'
        });
        
      redirect(`/c/${community.name}`);
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.createCard} glass-panel`}>
        <h1 className={styles.title}>Create a Community</h1>
        <p className={styles.subtitle}>Build a space for your interests and connect with others.</p>
        
        <form className={styles.form} action={createCommunity}>
          <div className={styles.inputGroup}>
            <label htmlFor="displayName" className={styles.label}>Community Name</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              className={styles.input}
              placeholder="e.g. Creative Photography"
              required
              maxLength={50}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>URL Identifier</label>
            <div className={styles.urlPrefixWrapper}>
              <span className={styles.urlPrefix}>a/</span>
              <input
                id="name"
                name="name"
                type="text"
                className={`${styles.input} ${styles.inputWithPrefix}`}
                placeholder="creativephotography"
                required
                maxLength={20}
                pattern="[a-zA-Z0-9]+"
                title="Only letters and numbers allowed"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea
              id="description"
              name="description"
              className={styles.textarea}
              placeholder="What is this community about?"
              rows={4}
              maxLength={500}
            ></textarea>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
              Create Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
