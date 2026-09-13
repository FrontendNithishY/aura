'use client';

import { useState } from 'react';
import { Image, Type, HelpCircle, BarChart2, Smile } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import styles from './CreatePost.module.css';

export default function CreatePost({ communityId }: { communityId?: string }) {
  const [postType, setPostType] = useState('standard');
  const [mood, setMood] = useState('Random');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const supabase = createClient();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('Must be logged in');

    const { error } = await supabase.from('posts').insert({
      author_id: user.id,
      community_id: communityId || null,
      title: title || null,
      content,
      post_type: postType,
      mood,
      is_anonymous: isAnonymous
    });

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      setContent('');
      setTitle('');
      // In a real app we'd refresh the feed here using router.refresh() or updating local state
    }
  };

  return (
    <div className={`${styles.createBox} glass-panel`}>
      <div className={styles.typeSelector}>
        <button 
          className={`${styles.typeBtn} ${postType === 'standard' ? styles.active : ''}`}
          onClick={() => setPostType('standard')}
          type="button"
        >
          <Type size={18} /> Post
        </button>
        <button 
          className={`${styles.typeBtn} ${postType === 'meme' ? styles.active : ''}`}
          onClick={() => setPostType('meme')}
          type="button"
        >
          <Image size={18} /> Meme/Media
        </button>
        <button 
          className={`${styles.typeBtn} ${postType === 'poll' ? styles.active : ''}`}
          onClick={() => setPostType('poll')}
          type="button"
        >
          <BarChart2 size={18} /> Poll
        </button>
        <button 
          className={`${styles.typeBtn} ${postType === 'question' ? styles.active : ''}`}
          onClick={() => setPostType('question')}
          type="button"
        >
          <HelpCircle size={18} /> Ask
        </button>
      </div>

      <form className={styles.form} onSubmit={handleCreatePost}>
        {postType !== 'short' && (
          <input
            type="text"
            className={styles.titleInput}
            placeholder="An interesting title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
        
        <textarea
          className={styles.contentInput}
          placeholder="What are your thoughts?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
        />

        <div className={styles.toolbar}>
          <div className={styles.moodSelector}>
            <Smile size={18} className={styles.moodIcon} />
            <select 
              value={mood} 
              onChange={(e) => setMood(e.target.value)}
              className={styles.select}
            >
              <option value="Random">Random</option>
              <option value="Chill">Chill</option>
              <option value="Funny">Funny</option>
              <option value="Curious">Curious</option>
              <option value="Serious">Serious</option>
              <option value="Creative">Creative</option>
              <option value="Motivation">Motivation</option>
            </select>
          </div>
          
          <div className={styles.rightActions}>
            <label className={styles.anonymousToggle}>
              <input 
                type="checkbox" 
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)} 
              />
              <span className={styles.anonLabel}>Post Anonymously</span>
            </label>
            <button type="submit" className="btn-primary" disabled={!content.trim()}>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
