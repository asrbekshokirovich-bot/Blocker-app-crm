import React, { useState } from 'react';
import { Search, Eye, EyeOff, AlertTriangle, ShieldAlert, X } from 'lucide-react';
import { theme, commonStyles } from '../styles/theme';

const MOCK_USERS = [
  { id: 1, name: 'Aziz Rahimov', email: 'aziz@example.com', password: 'password123', premium: 'Yillik', joinDate: '15.01.2024, 14:30', status: 'Faol' },
  { id: 2, name: 'Malika Karimova', email: 'malika@example.com', password: 'malika_secure', premium: 'Oylik', joinDate: '10.02.2024, 09:15', status: 'Faol' },
  { id: 3, name: 'Jasur Umarov', email: 'jasur@example.com', password: 'jasur_pass', premium: 'Bepul', joinDate: '05.03.2024, 11:45', status: 'Faol emas' },
  { id: 4, name: 'Nigora Alieva', email: 'nigora@example.com', password: 'nigora_1234', premium: 'Yillik', joinDate: '12.04.2024, 16:20', status: 'Faol' },
  { id: 5, name: 'Otabek Toshov', email: 'otabek@example.com', password: 'otabek_test', premium: 'Bepul', joinDate: '20.04.2024, 10:05', status: 'Faol' },
];

interface UsersProps {
  onBack: () => void;
}

const Users = ({ onBack }: UsersProps) => {
  const CURRENT_USER_ROLE = 'Super Admin'; // Buni 'Admin' qilib o'zgartirib huquq cheklovini sinab ko'rishingiz mumkin
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});
  const [showPermissionWarning, setShowPermissionWarning] = useState(false);
  const [showPrivacyConfirm, setShowPrivacyConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEyeClick = (id: number) => {
    // Agar parol ochiq bo'lsa, ogohlantirishsiz yopamiz
    if (visiblePasswords[id]) {
      setVisiblePasswords(prev => ({ ...prev, [id]: false }));
      return;
    }

    // Agar parol yopiq bo'lsa va ochmoqchi bo'lsa, rolni tekshiramiz
    if (CURRENT_USER_ROLE !== 'Super Admin') {
      setShowPermissionWarning(true);
      return;
    }

    // Agar u Super Admin bo'lsa, maxfiylik haqida ogohlantirish oynasini ochamiz
    setShowPrivacyConfirm(id);
  };

  const confirmShowPassword = () => {
    if (showPrivacyConfirm !== null) {
      setVisiblePasswords(prev => ({ ...prev, [showPrivacyConfirm]: true }));
      setShowPrivacyConfirm(null);
    }
  };

  return (
    <>
      <div style={commonStyles.card} className="page-transition">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onBack} style={{ ...commonStyles.button('secondary'), padding: '8px 12px' }}>← Orqaga</button>
          <h3 style={{ margin: 0 }}>Barcha foydalanuvchilar</h3>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 12, top: 12, color: '#555' }} />
            <input 
              placeholder="Foydalanuvchilarni qidirish..." 
              style={{ ...commonStyles.input, paddingLeft: '40px', width: '240px' }} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table style={commonStyles.table}>
        <thead>
          <tr>
            <th style={commonStyles.th}>Foydalanuvchi</th>
            <th style={commonStyles.th}>Parol</th>
            <th style={commonStyles.th}>Holat</th>
            <th style={commonStyles.th}>Tarif</th>
            <th style={commonStyles.th}>Qo'shilgan</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td style={commonStyles.td}>
                <div style={{ fontWeight: '600' }}>{user.name}</div>
                <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>{user.email}</div>
              </td>
              <td style={commonStyles.td}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '13px', color: theme.colors.textMuted, width: '100px' }}>
                    {visiblePasswords[user.id] ? user.password : '••••••••'}
                  </span>
                  <button 
                    onClick={() => handleEyeClick(user.id)}
                    style={{ background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', display: 'flex', padding: '4px' }}
                    title={visiblePasswords[user.id] ? "Parolni yashirish" : "Parolni ko'rish"}
                  >
                    {visiblePasswords[user.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </td>
              <td style={commonStyles.td}>
                <span style={commonStyles.badge(user.status === 'Faol' ? 'Active' : 'Inactive')}>{user.status}</span>
              </td>
              <td style={commonStyles.td}>
                <span style={commonStyles.badge(user.premium === 'Yillik' ? 'Yearly' : user.premium === 'Oylik' ? 'Monthly' : 'Free')}>{user.premium}</span>
              </td>
              <td style={commonStyles.td}>{user.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Ruxsat yo'qligi haqida ogohlantirish (Permission Warning Modal) */}
      {showPermissionWarning && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ ...commonStyles.card, width: '400px', maxWidth: '90%', textAlign: 'center', padding: '32px 24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '32px', backgroundColor: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <AlertTriangle size={32} color={theme.colors.danger} />
            </div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px' }}>Ruxsat etilmagan harakat</h3>
            <p style={{ margin: '0 0 24px 0', color: theme.colors.textMuted, fontSize: '14px', lineHeight: '1.5' }}>
              Kechirasiz, sizda foydalanuvchilarning parolini ko'rish huquqi yo'q. Bu ma'lumotni faqatgina <strong>Super Admin</strong> ko'ra oladi.
            </p>
            <button 
              onClick={() => setShowPermissionWarning(false)}
              style={{ ...commonStyles.button('secondary'), width: '100%', justifyContent: 'center' }}
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}

      {/* Maxfiylik va qoidalar ogohlantirishi (Privacy Confirmation Modal) */}
      {showPrivacyConfirm !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ ...commonStyles.card, width: '480px', maxWidth: '90%', position: 'relative' }}>
            <button 
              onClick={() => setShowPrivacyConfirm(null)}
              title="Yopish"
              aria-label="Yopish"
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={28} color="#ef4444" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#ef4444' }}>Diqqat! Maxfiy ma'lumot</h3>
              </div>
            </div>
            
            <div style={{ padding: '16px', backgroundColor: theme.colors.inputBg, borderRadius: '12px', border: `1px solid ${theme.colors.border}`, marginBottom: '24px' }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.6', color: '#e2e8f0' }}>
                Siz ushbu foydalanuvchining parolini ochmoqchisiz. 
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: theme.colors.textMuted, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '6px' }}>Iltimos, foydalanuvchi ma'lumotlari maxfiyligini saqlang va uni uchinchi shaxslarga bermang.</li>
                <li>Bu harakat tizim xavfsizlik jurnalida qayd etiladi.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowPrivacyConfirm(null)}
                style={{ ...commonStyles.button('secondary'), flex: 1, justifyContent: 'center' }}
              >
                Bekor qilish
              </button>
              <button 
                onClick={confirmShowPassword}
                style={{ ...commonStyles.button('primary'), flex: 1, justifyContent: 'center', backgroundColor: '#ef4444', borderColor: '#dc2626', color: '#fff' }}
              >
                Davom etish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
