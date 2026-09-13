export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  
  return (
    <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
      <div className="glass-panel" style={{padding: '1rem', marginBottom: '2rem'}}>
        <input 
          type="text" 
          placeholder="Search Aura..." 
          defaultValue={query}
          style={{width: '100%', padding: '1rem', border: 'none', background: 'transparent', outline: 'none', fontSize: '1.25rem', color: 'var(--color-text-main)'}}
        />
      </div>

      {query ? (
        <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
          <p style={{color: 'var(--color-text-muted)'}}>No results found for "{query}".</p>
        </div>
      ) : (
        <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
          <p style={{color: 'var(--color-text-muted)'}}>Type above to search communities, users, and posts.</p>
        </div>
      )}
    </div>
  );
}
