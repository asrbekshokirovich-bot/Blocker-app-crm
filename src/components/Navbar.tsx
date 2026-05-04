import { useState } from 'react';
import { Bell, ChevronDown, User, Lock, Settings, AtSign, Eye, EyeOff, Edit2, Check, LogOut } from 'lucide-react';
import { theme, commonStyles } from '../styles/theme';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);

  const [originalName, setOriginalName] = useState('Alisher Rustamov');
  const [originalLogin, setOriginalLogin] = useState('admin_super');
  const [originalPassword, setOriginalPassword] = useState('admin_secret123');

  const [name, setName] = useState(originalName);
  const [login, setLogin] = useState(originalLogin);
  const [password, setPassword] = useState(originalPassword);

  const hasChanges = name !== originalName || login !== originalLogin || password !== originalPassword;

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      backgroundColor: theme.colors.sidebar,
      borderBottom: `1px solid ${theme.colors.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => window.location.reload()}>
        <img src="/sidebar-logo.png" alt="Focus Guard" style={{ width: 48, height: 48, borderRadius: 12 }} />
        <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>Focus Guard</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ position: 'relative' }}>
          <Bell size={22} style={{ color: theme.colors.textMuted, cursor: 'pointer' }} />
          <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, backgroundColor: theme.colors.danger, borderRadius: '50%', border: '2px solid #0a0a0c' }}></div>
        </div>
        
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '6px 12px', 
              backgroundColor: isDropdownOpen ? '#1a1a1e' : theme.colors.card, 
              borderRadius: '30px', 
              border: `1px solid ${isDropdownOpen ? theme.colors.primary : theme.colors.border}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>SA</div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Super Admin</span>
            <ChevronDown size={16} style={{ color: theme.colors.textMuted, transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </div>

          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '12px',
              width: '300px',
              backgroundColor: theme.colors.card,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              animation: 'fadeIn 0.2s ease forwards',
              zIndex: 1100
            }}>
              <div style={{ animation: 'fadeIn 0.2s ease forwards' }}>
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: '16px', marginBottom: '16px' }}>
                    <Settings size={20} color={theme.colors.primary} />
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Sozlamalar</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: theme.colors.textMuted, marginBottom: '4px' }}>Rol</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: theme.colors.primary }}>Super Admin</div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>Shaxsiy ma'lumotlar</div>
                        {!isEditing && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                            style={{ background: 'none', border: 'none', color: theme.colors.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: 0 }}
                          >
                            <Edit2 size={12} /> Tahrirlash
                          </button>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#1a1a1e', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${isEditing ? theme.colors.primary : theme.colors.border}` }}>
                        <User size={16} color={isEditing ? theme.colors.primary : theme.colors.textMuted} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: theme.colors.textMuted }}>Ism Familiya</div>
                          {isEditing ? (
                            <input 
                              aria-label="Ism Familiya"
                              title="Ism Familiya"
                              placeholder="Ismingizni kiriting"
                              value={name} 
                              onChange={(e) => setName(e.target.value)} 
                              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', fontWeight: '500', outline: 'none', width: '100%', padding: 0, margin: 0 }} 
                              autoFocus
                            />
                          ) : (
                            <div style={{ fontSize: '13px', color: '#fff', fontWeight: '500' }}>{name}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#1a1a1e', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${isEditing ? theme.colors.primary : theme.colors.border}`, marginBottom: '8px' }}>
                        <AtSign size={16} color={isEditing ? theme.colors.primary : theme.colors.textMuted} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: theme.colors.textMuted }}>Login</div>
                          {isEditing ? (
                            <input 
                              aria-label="Login"
                              title="Login"
                              placeholder="Loginingizni kiriting"
                              value={login} 
                              onChange={(e) => setLogin(e.target.value)} 
                              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', fontWeight: '500', outline: 'none', width: '100%', padding: 0, margin: 0 }} 
                            />
                          ) : (
                            <div style={{ fontSize: '13px', color: '#fff', fontWeight: '500' }}>{login}</div>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#1a1a1e', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${isEditing ? theme.colors.primary : theme.colors.border}` }}>
                        <Lock size={16} color={isEditing ? theme.colors.primary : theme.colors.textMuted} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: theme.colors.textMuted }}>Parol</div>
                          {isEditing ? (
                            <input 
                              aria-label="Parol"
                              title="Parol"
                              placeholder="Parolingizni kiriting"
                              type={showPassword ? "text" : "password"}
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', fontWeight: '500', outline: 'none', width: '100%', padding: 0, margin: 0 }} 
                            />
                          ) : (
                            <div style={{ fontSize: '13px', color: '#fff', fontWeight: '500' }}>{showPassword ? password : '••••••••'}</div>
                          )}
                        </div>
                        <div 
                          onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword); }} 
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                        >
                          {showPassword ? <EyeOff size={16} color={theme.colors.textMuted} /> : <Eye size={16} color={theme.colors.textMuted} />}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '8px' }}>
                      {isEditing && (
                        confirmSave ? (
                          <div style={{ padding: '12px', backgroundColor: '#1a1a1e', borderRadius: '12px', border: `1px solid ${theme.colors.border}`, textAlign: 'center', animation: 'fadeIn 0.2s ease' }}>
                            <div style={{ fontSize: '13px', marginBottom: '10px', color: '#fff', fontWeight: '500' }}>O'zgarishlarni saqlaysizmi?</div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  setOriginalName(name);
                                  setOriginalLogin(login);
                                  setOriginalPassword(password);
                                  setIsEditing(false); 
                                  setConfirmSave(false); 
                                }}
                                style={{ ...commonStyles.button('primary'), flex: 1, padding: '8px', fontSize: '13px', justifyContent: 'center' }}
                              >
                                Ha, saqlash
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setConfirmSave(false); }}
                                style={{ ...commonStyles.button('secondary'), flex: 1, padding: '8px', fontSize: '13px', backgroundColor: 'transparent', color: '#fff', border: `1px solid ${theme.colors.border}`, justifyContent: 'center' }}
                              >
                                Bekor qilish
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              disabled={!hasChanges}
                              onClick={(e) => { e.stopPropagation(); if (hasChanges) setConfirmSave(true); }}
                              style={{
                                ...commonStyles.button('primary'),
                                flex: 1,
                                justifyContent: 'center',
                                padding: '10px',
                                opacity: hasChanges ? 1 : 0.5,
                                cursor: hasChanges ? 'pointer' : 'not-allowed',
                              }}
                            >
                              <Check size={16} /> Saqlash
                            </button>
                            <button 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setName(originalName);
                                setLogin(originalLogin);
                                setPassword(originalPassword);
                                setIsEditing(false); 
                              }}
                              style={{
                                ...commonStyles.button('secondary'),
                                padding: '10px',
                                backgroundColor: 'transparent',
                                color: theme.colors.textMuted,
                                border: `1px solid ${theme.colors.border}`
                              }}
                              title="Bekor qilish"
                            >
                              Bekor qilish
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${theme.colors.border}` }}>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      style={{
                        ...commonStyles.button('secondary'),
                        width: '100%',
                        justifyContent: 'center',
                        color: theme.colors.danger,
                        borderColor: 'transparent',
                        backgroundColor: 'rgba(244, 63, 94, 0.1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
                      }}
                    >
                      <LogOut size={16} />
                      Tizimdan chiqish
                    </button>
                  </div>
                </>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
