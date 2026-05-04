import React, { useState } from 'react';
import { Bell, ArrowLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Notifications from './pages/Notifications';
import Pricing from './pages/Pricing';
import Admins from './pages/Admins';
import Login from './pages/Login';
import { theme } from './styles/theme';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  main: {
    flex: 1,
    padding: '40px',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  pageHeader: {
    marginBottom: '32px',
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.card,
  },
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showHistory, setShowHistory] = useState(false);

  const handleBack = () => {
    if (showHistory) {
      setShowHistory(false);
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <>
      <style>{`
        body { margin: 0; background-color: ${theme.colors.background}; }
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0c; }
        ::-webkit-scrollbar-thumb { background: #222226; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #333; }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #1a1a1e inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .page-transition {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .nav-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-card:hover {
          transform: translateY(-4px);
          border-color: ${theme.colors.primary}50;
          box-shadow: 0 12px 24px -10px rgba(0,0,0,0.5);
        }
        button:hover {
          filter: brightness(1.2);
          transform: translateY(-1px);
        }
        button:active {
          transform: translateY(0);
        }
      `}</style>
      
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <div style={styles.container}>
          <Navbar onLogout={() => setIsAuthenticated(false)} />
          
          <main style={styles.main}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Main Content Area */}
          <div style={{ 
            filter: (activeTab === 'push' || activeTab === 'premium') ? 'blur(12px)' : 'none',
            transition: 'filter 0.4s ease',
            pointerEvents: (activeTab === 'push' || activeTab === 'premium') ? 'none' : 'auto'
          }}>
            {(activeTab === 'dashboard' || activeTab === 'push' || activeTab === 'premium') && <Dashboard setActiveTab={(tab) => {
              setActiveTab(tab);
              setShowHistory(false);
            }} />}
            {activeTab === 'users' && <Users onBack={() => setActiveTab('dashboard')} />}
            {activeTab === 'admins' && <Admins onBack={() => setActiveTab('dashboard')} />}
            {activeTab === 'settings' && <div style={styles.card}>Sozlamalar sahifasi tez kunda...</div>}
          </div>

          {/* Modal Overlay */}
          {(activeTab === 'push' || activeTab === 'premium') && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(4px)',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div 
                style={{ 
                  width: '800px', 
                  maxWidth: '90%', 
                  position: 'relative',
                  paddingTop: '40px'
                }} 
              >
                <button 
                  onClick={handleBack}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 1100,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = theme.colors.primary;
                    e.currentTarget.style.transform = 'translateX(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <ArrowLeft size={18} /> Orqaga
                </button>
                <div style={{ 
                  backgroundColor: theme.colors.card,
                  borderRadius: '20px',
                  border: `1px solid ${theme.colors.border}`,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }} onClick={e => e.stopPropagation()}>
                  {activeTab === 'push' && <Notifications onBack={handleBack} showHistory={showHistory} setShowHistory={setShowHistory} />}
                  {activeTab === 'premium' && <Pricing onBack={handleBack} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
    )}
    </>
  );
};

export default App;
