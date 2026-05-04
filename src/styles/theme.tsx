export const theme = {
  colors: {
    background: '#0a0a0c',
    sidebar: '#111114',
    card: '#111114',
    border: '#222226',
    text: '#e2e2e6',
    textMuted: '#88888e',
    primary: '#6366f1',
    success: '#4ade80',
    danger: '#f43f5e',
    accent: '#6366f1',
    inputBg: '#1a1a1e',
  },
  spacing: {
    padding: '24px',
    borderRadius: '16px',
    cardBorderRadius: '16px',
    inputBorderRadius: '10px',
  },
  shadows: {
    card: '0 4px 20px rgba(0,0,0,0.2)',
  }
};

export const commonStyles = {
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.cardBorderRadius,
    padding: theme.spacing.padding,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.card,
  },
  input: {
    backgroundColor: theme.colors.inputBg,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.spacing.inputBorderRadius,
    padding: '12px 16px',
    color: '#fff',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  },
  button: (variant = 'primary') => ({
    backgroundColor: variant === 'primary' ? theme.colors.primary : 'transparent',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: theme.spacing.inputBorderRadius,
    border: variant === 'primary' ? 'none' : `1px solid ${theme.colors.border}`,
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),
  badge: (type: string) => {
    let bg = '#222226';
    let color = '#88888e';
    if (type === 'Yearly') { bg = '#3b2266'; color = '#d8b4fe'; }
    if (type === 'Monthly') { bg = '#1e3a3a'; color = '#99f6e4'; }
    if (type === 'Active') { color = '#4ade80'; }
    return {
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: bg,
      color: color,
    };
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '16px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '16px',
    color: theme.colors.textMuted,
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #1a1a1e',
    fontSize: '14px',
  },
};
