import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { theme, commonStyles } from '../styles/theme';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login.trim() !== '' && password.trim() !== '') {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); // Remove animation class after it plays
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      backgroundImage: `radial-gradient(circle at 50% -20%, ${theme.colors.primary}20, transparent 50%)`,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .shake-animation {
          animation: shake 0.4s ease-in-out;
        }
        .login-input-container:focus-within {
          border-color: ${theme.colors.primary} !important;
          box-shadow: 0 0 0 3px ${theme.colors.primary}30;
        }
        .login-input {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          background-color: transparent !important;
        }
        .login-input:-webkit-autofill,
        .login-input:-webkit-autofill:hover, 
        .login-input:-webkit-autofill:focus, 
        .login-input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #0a0a0c inset !important;
          -webkit-text-fill-color: white !important;
          background-image: none !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        .login-input::-ms-reveal,
        .login-input::-ms-clear {
          display: none !important;
        }
        .login-input::-webkit-contacts-auto-fill-button,
        .login-input::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
      `}</style>

      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '300px',
        height: '300px',
        background: `radial-gradient(circle, ${theme.colors.primary}10, transparent 70%)`,
        filter: 'blur(40px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${theme.colors.accent}10, transparent 70%)`,
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <div 
        className={isAnimating ? 'shake-animation' : ''}
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '40px',
          backgroundColor: 'rgba(26, 26, 30, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: `1px solid ${theme.colors.border}`,
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          zIndex: 1,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          animation: 'fadeIn 0.6s ease-out forwards'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <img src="/sidebar-logo.png" alt="Focus Guard" style={{ width: 64, height: 64, borderRadius: 16, boxShadow: `0 8px 16px ${theme.colors.primary}40` }} />
          </div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', color: '#fff', fontWeight: '700' }}>Focus Guard</h1>
          <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: '15px' }}>Tizimga kirish uchun ma'lumotlarni kiriting</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: theme.colors.danger, 
              padding: '12px 16px', 
              borderRadius: '12px',
              border: `1px solid rgba(239, 68, 68, 0.2)`,
              fontSize: '13px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <ShieldAlert size={18} />
              <span>Login yoki parol xato! Qaytadan urinib ko'ring.</span>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: theme.colors.textMuted, marginBottom: '8px', fontWeight: '500' }}>Login</label>
            <div className="login-input-container" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              backgroundColor: '#0a0a0c', 
              padding: '14px 16px', 
              borderRadius: '14px', 
              border: `1px solid ${theme.colors.border}`,
              transition: 'all 0.2s ease'
            }}>
              <User size={18} color={theme.colors.textMuted} />
              <input 
                className="login-input"
                type="text"
                placeholder="admin_super"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={{ flex: 1, color: '#fff', padding: 0, margin: 0, border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '15px' }}
                aria-label="Login"
                title="Login kiritish"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: theme.colors.textMuted, marginBottom: '8px', fontWeight: '500' }}>Parol</label>
            <div className="login-input-container" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              backgroundColor: '#0a0a0c', 
              padding: '14px 16px', 
              borderRadius: '14px', 
              border: `1px solid ${theme.colors.border}`,
              transition: 'all 0.2s ease'
            }}>
              <Lock size={18} color={theme.colors.textMuted} />
              <input 
                className="login-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ flex: 1, color: '#fff', padding: 0, margin: 0, border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '15px', letterSpacing: showPassword ? 'normal' : '2px' }}
                aria-label="Parol"
                title="Parol kiritish"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: 0, display: 'flex' }}
                title={showPassword ? "Yashirish" : "Ko'rsatish"}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            style={{
              ...commonStyles.button('primary'),
              padding: '16px',
              fontSize: '15px',
              fontWeight: '600',
              marginTop: '8px',
              justifyContent: 'center',
              borderRadius: '14px',
              boxShadow: `0 8px 24px ${theme.colors.primary}40`,
            }}
          >
            Tizimga kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
