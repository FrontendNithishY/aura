export default function BookmarksPage() {
  return (
    <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{marginBottom: '2rem', fontSize: '2rem'}}>Bookmarks</h1>
      <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
        <p style={{color: 'var(--color-text-muted)'}}>You haven't saved any posts yet.</p>
        <button className="btn-primary" style={{marginTop: '1rem'}}>Explore Posts</button>
      </div>
    </div>
  );
}
