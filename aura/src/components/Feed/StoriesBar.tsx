'use client';

import { Plus } from 'lucide-react';
import styles from './StoriesBar.module.css';

// Mock data for UI demonstration
const MOCK_STORIES = [
  { id: 1, user: 'alex_dev', avatar: 'A', hasViewed: false },
  { id: 2, user: 'sarah_creative', avatar: 'S', hasViewed: false },
  { id: 3, user: 'tech_guru', avatar: 'T', hasViewed: true },
  { id: 4, user: 'meme_lord', avatar: 'M', hasViewed: true },
];

export default function StoriesBar() {
  return (
    <div className={`${styles.container} glass-panel`}>
      <div className={styles.scrollArea}>
        
        {/* Create Story Button */}
        <div className={styles.storyItem}>
          <div className={`${styles.avatarRing} ${styles.createRing}`}>
            <div className={styles.avatar}>
              <Plus className={styles.plusIcon} />
            </div>
          </div>
          <span className={styles.username}>Add Story</span>
        </div>

        {/* Existing Stories */}
        {MOCK_STORIES.map(story => (
          <div key={story.id} className={styles.storyItem}>
            <div className={`${styles.avatarRing} ${story.hasViewed ? styles.viewedRing : styles.unviewedRing}`}>
              <div className={styles.avatar}>
                {story.avatar}
              </div>
            </div>
            <span className={styles.username}>{story.user}</span>
          </div>
        ))}
        
      </div>
    </div>
  );
}
