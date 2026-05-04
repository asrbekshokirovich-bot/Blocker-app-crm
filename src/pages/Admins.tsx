import React, { useState } from 'react';
import { Search, Shield, Trash2, Edit2, X, Check, Eye, EyeOff, User, Lock, AtSign, Settings, Plus, Crown } from 'lucide-react';
import { theme, commonStyles } from '../styles/theme';

const INITIAL_ADMINS = [
  { id: 1, name: 'Alisher Rustamov', login: 'admin_super', role: 'Super Admin', joinDate: '2024-05-01', status: 'Faol' },
  { id: 2, name: 'Javohir Vahobov', login: 'admin_javohir', role: 'Admin', joinDate: '2024-05-01', status: 'Faol' },
  { id: 3, name: 'Rustam Alimov', login: 'admin_rustam', role: 'Admin', joinDate: '2024-04-15', status: 'Faol' },
  { id: 4, name: 'Dilshod Karimov', login: 'admin_dilshod', role: 'Admin', joinDate: '2024-03-20', status: 'Faol emas' },
];

interface AdminsProps {
  onBack: () => void;
}

const Admins = ({ onBack }: AdminsProps) => {
  const [admins, setAdmins] = useState(INITIAL_ADMINS);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [editAdmin, setEditAdmin] = useState<any | null>(null);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [confirmEditSave, setConfirmEditSave] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminLogin, setNewAdminLogin] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmAddAdmin, setConfirmAddAdmin] = useState(false);
  const isNewAdminValid = newAdminName.trim() !== '' && newAdminLogin.trim() !== '' && newAdminPassword.trim() !== '';

  const handleAddAdmin = () => {
    const newAdmin = {
      id: Date.now(),
      name: newAdminName,
      login: newAdminLogin,
      role: 'Admin',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Faol'
    };
    setAdmins([...admins, newAdmin]);
    setShowAddAdmin(false);
    setConfirmAddAdmin(false);
    setNewAdminName('');
    setNewAdminLogin('');
    setNewAdminPassword('');
    setShowNewPassword(false);
  };

  const handleDelete = (id: number) => {
    setAdmins(admins.filter(a => a.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSaveEdit = () => {
    if (editAdmin) {
      setAdmins(admins.map(a => a.id === editAdmin.id ? editAdmin : a));
      setEditAdmin(null);
      setShowEditPassword(false);
      setConfirmEditSave(false);
    }
  };

  const originalAdmin = editAdmin ? admins.find(a => a.id === editAdmin.id) : null;
  const hasEditChanges = originalAdmin && editAdmin && (
    editAdmin.name !== originalAdmin.name ||
    editAdmin.login !== originalAdmin.login ||
    editAdmin.status !== originalAdmin.status ||
    (editAdmin.password || '') !== ''
  );
  const isEditValid = editAdmin && editAdmin.name.trim() !== '' && editAdmin.login.trim() !== '';
  const canSaveEdit = hasEditChanges && isEditValid;

  return (
    <>
      <div style={commonStyles.card} className="page-transition">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={onBack} style={{ ...commonStyles.button('secondary'), padding: '8px 12px' }}>← Orqaga</button>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} color={theme.colors.primary} />
              Barcha Adminlar
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 12, top: 12, color: '#555' }} />
              <input placeholder="Admin qidirish..." style={{ ...commonStyles.input, paddingLeft: '40px', width: '240px' }} />
            </div>
            <button 
              onClick={() => setShowAddAdmin(true)}
              style={{ ...commonStyles.button('primary'), padding: '8px 16px' }}
            >
              <Plus size={18} /> Yangi admin
            </button>
          </div>
        </div>

        <table style={commonStyles.table}>
          <thead>
            <tr>
              <th style={commonStyles.th}>Admin</th>
              <th style={commonStyles.th}>Holat</th>
              <th style={commonStyles.th}>Rol</th>
              <th style={commonStyles.th}>Qo'shilgan</th>
              <th style={commonStyles.th}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td style={commonStyles.td}>
                  <div style={{ fontWeight: '600' }}>{admin.name}</div>
                  <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>@{admin.login}</div>
                </td>
                <td style={commonStyles.td}>
                  <span style={commonStyles.badge(admin.status === 'Faol' ? 'Active' : 'Inactive')}>{admin.status}</span>
                </td>
                <td style={commonStyles.td}>
                  <span style={{ 
                    ...commonStyles.badge('Yearly'), 
                    backgroundColor: admin.role === 'Super Admin' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(99, 102, 241, 0.1)', 
                    color: admin.role === 'Super Admin' ? '#ffc107' : theme.colors.primary,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {admin.role === 'Super Admin' && <Crown size={14} />}
                    {admin.role}
                  </span>
                </td>
                <td style={commonStyles.td}>{admin.joinDate}</td>
                <td style={commonStyles.td}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button 
                      title="Tahrirlash" 
                      onClick={() => {
                        setEditAdmin({ ...admin, password: '' });
                        setShowEditPassword(false);
                        setConfirmEditSave(false);
                      }}
                      style={{ background: 'none', border: 'none', color: theme.colors.primary, cursor: 'pointer', padding: 0, display: 'flex', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      title="O'chirish" 
                      onClick={() => setDeleteConfirmId(admin.id)}
                      style={{ background: 'none', border: 'none', color: theme.colors.danger, cursor: 'pointer', padding: 0, display: 'flex', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, animation: 'fadeIn 0.2s', backdropFilter: 'blur(8px)' }}>
          <div style={{ 
            backgroundColor: theme.colors.card, 
            padding: '32px', 
            borderRadius: '24px', 
            border: `1px solid ${theme.colors.border}`, 
            width: '380px', 
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ 
              width: '72px', 
              height: '72px', 
              borderRadius: '36px', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 24px auto',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <Trash2 size={32} color={theme.colors.danger} />
            </div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700', color: '#fff' }}>Haqiqatan ham o'chirasizmi?</h3>
            <p style={{ color: theme.colors.textMuted, fontSize: '14px', marginBottom: '32px', lineHeight: '1.5' }}>
              Ushbu admin tizimdan butunlay o'chirib tashlanadi va bu amalni ortga qaytarib bo'lmaydi.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={() => setDeleteConfirmId(null)} 
                style={{ 
                  ...commonStyles.button('secondary'), 
                  flex: 1, 
                  justifyContent: 'center', 
                  padding: '12px', 
                  fontSize: '14px', 
                  whiteSpace: 'nowrap' 
                }}
              >
                Bekor qilish
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirmId)} 
                style={{ 
                  ...commonStyles.button('primary'), 
                  backgroundColor: theme.colors.danger, 
                  border: 'none', 
                  flex: 1, 
                  justifyContent: 'center', 
                  padding: '12px', 
                  fontSize: '14px', 
                  whiteSpace: 'nowrap', 
                  boxShadow: '0 8px 16px rgba(239, 68, 68, 0.25)' 
                }}
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editAdmin && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, animation: 'fadeIn 0.2s', backdropFilter: 'blur(8px)' }}>
          <div style={{ backgroundColor: theme.colors.card, padding: '24px', borderRadius: '16px', border: `1px solid ${theme.colors.border}`, width: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Adminni tahrirlash</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px' }}>Ism Familiya</label>
                <input 
                  title="Ism Familiya"
                  placeholder="Ism Familiya"
                  value={editAdmin.name} 
                  onChange={e => setEditAdmin({...editAdmin, name: e.target.value})}
                  style={{ ...commonStyles.input, width: '100%', backgroundColor: '#1a1a1e' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px' }}>Login</label>
                <input 
                  title="Login"
                  placeholder="Login"
                  value={editAdmin.login} 
                  onChange={e => setEditAdmin({...editAdmin, login: e.target.value})}
                  style={{ ...commonStyles.input, width: '100%', backgroundColor: '#1a1a1e' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px' }}>Yangi parol (ixtiyoriy)</label>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1a1a1e', borderRadius: '10px', border: `1px solid ${theme.colors.border}`, paddingRight: '10px' }}>
                  <input 
                    type={showEditPassword ? "text" : "password"}
                    placeholder="Yangi parol kiritish"
                    value={editAdmin.password || ''} 
                    onChange={e => setEditAdmin({...editAdmin, password: e.target.value})}
                    style={{ ...commonStyles.input, flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none' }} 
                  />
                  <div 
                    onClick={() => setShowEditPassword(!showEditPassword)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: theme.colors.textMuted }}
                  >
                    {showEditPassword ? <EyeOff size={16} /> : <Eye size={16} />} 
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px' }}>Holat</label>
                <div 
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  style={{ 
                    ...commonStyles.input, 
                    width: '100%', 
                    backgroundColor: '#1a1a1e', 
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{editAdmin.status}</span>
                  <div style={{ transition: 'transform 0.2s', transform: showStatusDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                
                {showStatusDropdown && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 'calc(100% + 4px)', 
                    left: 0, 
                    right: 0, 
                    backgroundColor: '#1a1a1e', 
                    border: `1px solid ${theme.colors.border}`, 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    zIndex: 10,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                    animation: 'fadeIn 0.15s ease-out'
                  }}>
                    {['Faol', 'Faol emas'].map(statusOption => (
                      <div 
                        key={statusOption}
                        onClick={() => {
                          setEditAdmin({...editAdmin, status: statusOption});
                          setShowStatusDropdown(false);
                        }}
                        style={{ 
                          padding: '12px 16px', 
                          cursor: 'pointer',
                          color: editAdmin.status === statusOption ? theme.colors.primary : '#fff',
                          backgroundColor: editAdmin.status === statusOption ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                          transition: 'background-color 0.2s',
                          fontSize: '14px'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = editAdmin.status === statusOption ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.05)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = editAdmin.status === statusOption ? 'rgba(99, 102, 241, 0.1)' : 'transparent'}
                      >
                        {statusOption}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '8px' }}>
                {confirmEditSave ? (
                  <div style={{ padding: '12px', backgroundColor: '#1a1a1e', borderRadius: '12px', border: `1px solid ${theme.colors.border}`, textAlign: 'center', animation: 'fadeIn 0.2s ease' }}>
                    <div style={{ fontSize: '13px', marginBottom: '10px', color: '#fff', fontWeight: '500' }}>O'zgarishlarni saqlaysizmi?</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={handleSaveEdit} style={{ ...commonStyles.button('primary'), flex: 1, padding: '8px', fontSize: '13px', justifyContent: 'center' }}>Ha, saqlash</button>
                      <button onClick={() => setConfirmEditSave(false)} style={{ ...commonStyles.button('secondary'), flex: 1, padding: '8px', fontSize: '13px', backgroundColor: 'transparent', color: '#fff', border: `1px solid ${theme.colors.border}`, justifyContent: 'center' }}>Yo'q</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      onClick={() => { setEditAdmin(null); setConfirmEditSave(false); }} 
                      style={{ ...commonStyles.button('secondary'), flex: 1, justifyContent: 'center' }}
                    >
                      Bekor qilish
                    </button>
                    <button 
                      disabled={!canSaveEdit}
                      onClick={() => { if(canSaveEdit) setConfirmEditSave(true); }} 
                      style={{ 
                        ...commonStyles.button('primary'), 
                        flex: 1, 
                        justifyContent: 'center',
                        opacity: canSaveEdit ? 1 : 0.5,
                        cursor: canSaveEdit ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <Check size={16} /> Saqlash
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddAdmin && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, animation: 'fadeIn 0.2s', backdropFilter: 'blur(8px)' }}>
          <div style={{ backgroundColor: theme.colors.card, padding: '24px', borderRadius: '16px', border: `1px solid ${theme.colors.border}`, width: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Yangi admin qo'shish</h3>
              <button 
                title="Yopish"
                aria-label="Yopish"
                onClick={() => {
                  setShowAddAdmin(false);
                  setConfirmAddAdmin(false);
                  setNewAdminName('');
                  setNewAdminLogin('');
                  setNewAdminPassword('');
                }} 
                style={{ background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: 0 }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px' }}>Ism Familiya</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#1a1a1e', padding: '10px', borderRadius: '10px', border: `1px solid ${theme.colors.border}` }}>
                  <User size={16} color={theme.colors.textMuted} />
                  <input 
                    aria-label="Yangi ism" 
                    title="Yangi ism"
                    placeholder="Javohir Vahobov" 
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', width: '100%' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px' }}>Login</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#1a1a1e', padding: '10px', borderRadius: '10px', border: `1px solid ${theme.colors.border}` }}>
                  <AtSign size={16} color={theme.colors.textMuted} />
                  <input 
                    aria-label="Yangi login" 
                    title="Yangi login"
                    placeholder="admin_javohir" 
                    value={newAdminLogin}
                    onChange={(e) => setNewAdminLogin(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', width: '100%' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px' }}>Parol</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#1a1a1e', padding: '10px', borderRadius: '10px', border: `1px solid ${theme.colors.border}` }}>
                  <Lock size={16} color={theme.colors.textMuted} />
                  <div style={{ flex: 1 }}>
                    <input 
                      aria-label="Yangi parol" 
                      title="Yangi parol"
                      type={showNewPassword ? "text" : "password"} 
                      placeholder="Parol o'rnating" 
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', width: '100%', padding: 0, margin: 0 }} 
                    />
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setShowNewPassword(!showNewPassword); }} 
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                  >
                    {showNewPassword ? <EyeOff size={16} color={theme.colors.textMuted} /> : <Eye size={16} color={theme.colors.textMuted} />}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px' }}>Rol</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#1a1a1e', padding: '10px', borderRadius: '10px', border: `1px solid ${theme.colors.border}` }}>
                  <Settings size={16} color={theme.colors.primary} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: theme.colors.primary, fontWeight: '600' }}>Admin</div>
                    <div style={{ fontSize: '11px', color: theme.colors.textMuted, marginTop: '2px' }}>Admin qo'shish va o'chirishdan tashqari barcha huquqlarga ega</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              {confirmAddAdmin ? (
                <div style={{ padding: '12px', backgroundColor: '#1a1a1e', borderRadius: '12px', border: `1px solid ${theme.colors.border}`, textAlign: 'center', animation: 'fadeIn 0.2s ease' }}>
                  <div style={{ fontSize: '13px', marginBottom: '10px', color: '#fff', fontWeight: '500' }}>Yangi adminni qo'shasizmi?</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={handleAddAdmin}
                      style={{ ...commonStyles.button('primary'), flex: 1, padding: '8px', fontSize: '13px', justifyContent: 'center' }}
                    >
                      Ha, qo'shish
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setConfirmAddAdmin(false); }}
                      style={{ ...commonStyles.button('secondary'), flex: 1, padding: '8px', fontSize: '13px', backgroundColor: 'transparent', color: '#fff', border: `1px solid ${theme.colors.border}`, justifyContent: 'center' }}
                    >
                      Yo'q
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  disabled={!isNewAdminValid}
                  onClick={(e) => { e.stopPropagation(); if (isNewAdminValid) setConfirmAddAdmin(true); }}
                  style={{ 
                    ...commonStyles.button('primary'), 
                    width: '100%', 
                    padding: '10px', 
                    justifyContent: 'center',
                    opacity: isNewAdminValid ? 1 : 0.5,
                    cursor: isNewAdminValid ? 'pointer' : 'not-allowed'
                  }}
                >
                  <Plus size={16} /> Qo'shish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admins;
