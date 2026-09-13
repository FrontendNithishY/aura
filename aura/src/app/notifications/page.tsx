export default function NotificationsPage() {
  return (
    <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{marginBottom: '2rem', fontSize: '2rem'}}>Notifications</h1>
      <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
        <p style={{color: 'var(--color-text-muted)'}}>You have no new notifications.</p>
      </div>
    </div>
  );
}
