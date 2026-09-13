export default function SettingsPage() {
  return (
    <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{marginBottom: '2rem', fontSize: '2rem'}}>Account Settings</h1>
      
      <div className="glass-panel" style={{padding: '2rem', marginBottom: '1.5rem'}}>
        <h2 style={{marginBottom: '1rem'}}>Profile Information</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Display Name</label>
            <input type="text" className="glass-panel" style={{width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)'}} />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Bio</label>
            <textarea className="glass-panel" style={{width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)'}} rows={3}></textarea>
          </div>
          <button className="btn-primary" style={{alignSelf: 'flex-start', marginTop: '1rem'}}>Save Changes</button>
        </div>
      </div>

      <div className="glass-panel" style={{padding: '2rem'}}>
        <h2 style={{marginBottom: '1rem', color: 'var(--color-error)'}}>Danger Zone</h2>
        <button className="btn-primary" style={{backgroundColor: 'var(--color-error)'}}>Delete Account</button>
      </div>
    </div>
  );
}
