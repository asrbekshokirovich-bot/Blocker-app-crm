import React from 'react';
import { theme } from '../styles/theme';

const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: theme.colors.sidebar,
    borderRight: `1px solid ${theme.colors.border}`,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '40px',
    color: '#fff',
    padding: '0 8px',
  } as React.CSSProperties,
};

const Sidebar = () => (
  <div style={styles.sidebar}>
    <div style={styles.logo}>
      <img src="/sidebar-logo.png" alt="Focus Guard" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
      Focus Guard
    </div>
    <nav style={{ flex: 1 }}>
      {/* Navigation moved to Dashboard */}
    </nav>
  </div>
);

export default Sidebar;
