import React from 'react';
import { Send, History, Smile, ChevronDown } from 'lucide-react';
import { theme, commonStyles } from '../styles/theme';

interface NotificationsProps {
  onBack: () => void;
  showHistory: boolean;
  setShowHistory: (v: boolean) => void;
}

const Emojis = ['😊', '🚀', '🔥', '🎉', '📢', '💡', '✅', '🎁', '⚡', '🌟', '📱', '🔔', '🤔', '😎', '💎', '📈'];

const Notifications = ({ onBack, showHistory, setShowHistory }: NotificationsProps) => {
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [audience, setAudience] = React.useState('Barcha foydalanuvchilar');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<number | null>(null);
  const [activePicker, setActivePicker] = React.useState<'title' | 'message' | null>(null);

  const audiences = ['Barcha foydalanuvchilar', 'Faqat Premium', 'Faqat Bepul', "Faol bo'lmaganlar"];

  const addEmoji = (emoji: string, field: 'title' | 'message') => {
    if (field === 'title') setTitle(prev => prev + emoji);
    else setMessage(prev => prev + emoji);
    setActivePicker(null);
  };

  const EmojiPicker = ({ field }: { field: 'title' | 'message' }) => (
    <div style={{
      position: 'absolute',
      right: '0',
      bottom: '100%',
      backgroundColor: '#1a1a1e',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '12px',
      padding: '12px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      zIndex: 100,
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
      animation: 'fadeIn 0.2s ease',
      marginBottom: '8px'
    }}>
      {Emojis.map(e => (
        <span 
          key={e} 
          style={{ cursor: 'pointer', fontSize: '20px', padding: '4px', transition: 'transform 0.2s' }}
          onClick={() => addEmoji(e, field)}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {e}
        </span>
      ))}
    </div>
  );

  const mockHistory = [
    { id: 1, title: 'Yangi aksiya!', date: '2024-05-01', audience: 'Barcha foydalanuvchilar', message: 'Barcha foydalanuvchilar uchun yozgi chegirmalar boshlandi. Shoshiling!' },
    { id: 2, title: 'Tizim yangilanishi', date: '2024-04-28', audience: 'Faqat Premium', message: 'Premium foydalanuvchilar uchun yangi tezkor serverlar ishga tushirildi. Endi tizim 2 baravar tezroq ishlaydi.' },
    { id: 3, title: 'Xush kelibsiz!', date: '2024-04-25', audience: 'Barcha foydalanuvchilar', message: 'Ilovamizga xush kelibsiz. Eng kerakli funksiyalardan bemalol foydalanishingiz mumkin.' },
  ];

  if (showHistory) {
    return (
      <div style={{ padding: '32px' }} className="page-transition">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>Yuborilgan xabarlar</h3>
          <button 
            onClick={() => setShowHistory(false)}
            style={{ ...commonStyles.button('secondary'), padding: '8px 16px' }}
          >
            Yangi xabar yozish
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}>
          {mockHistory.map(item => (
            <div 
              key={item.id} 
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              style={{ 
                padding: '16px', 
                backgroundColor: '#1a1a1e', 
                borderRadius: '12px', 
                border: `1px solid ${expandedId === item.id ? theme.colors.primary : theme.colors.border}`, 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: expandedId === item.id ? theme.colors.primary : '#fff', transition: 'color 0.2s' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: theme.colors.textMuted, marginTop: '2px' }}>Auditoriya: {item.audience}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>{item.date}</div>
                  <ChevronDown size={18} style={{ color: theme.colors.textMuted, transform: expandedId === item.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
                </div>
              </div>
              
              {expandedId === item.id && (
                <div style={{ 
                  marginTop: '12px', 
                  paddingTop: '12px', 
                  borderTop: `1px dashed ${theme.colors.border}`, 
                  fontSize: '14px', 
                  color: '#ccc',
                  lineHeight: '1.5',
                  animation: 'fadeIn 0.3s ease forwards'
                }}>
                  {item.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }} className="page-transition">
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: 0 }}>Push-xabar yuborish</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: theme.colors.textMuted }}>Kimlarga ko'radi</label>
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ ...commonStyles.input, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>{audience}</span>
              <ChevronDown size={18} style={{ color: theme.colors.textMuted, transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
            
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                backgroundColor: '#1a1a1e',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '12px',
                padding: '8px',
                zIndex: 100,
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                animation: 'fadeIn 0.2s ease',
              }}>
                {audiences.map(opt => (
                  <div 
                    key={opt}
                    onClick={() => { setAudience(opt); setIsDropdownOpen(false); }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: audience === opt ? `${theme.colors.primary}22` : 'transparent',
                      color: audience === opt ? theme.colors.primary : '#fff',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (audience !== opt) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (audience !== opt) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="notif-title" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: theme.colors.textMuted }}>Sarlavha</label>
          <div style={{ position: 'relative' }}>
            <input 
              id="notif-title" 
              style={{ ...commonStyles.input, paddingRight: '45px' }} 
              placeholder="Masalan: Yangi chegirma!" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button 
              onClick={() => setActivePicker(activePicker === 'title' ? null : 'title')}
              style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: '4px' }}
              aria-label="Emoji qo'shish"
              title="Emoji qo'shish"
            >
              <Smile size={20} />
            </button>
            {activePicker === 'title' && <EmojiPicker field="title" />}
          </div>
        </div>
        <div>
          <label htmlFor="notif-message" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: theme.colors.textMuted }}>Xabar matni</label>
          <div style={{ position: 'relative' }}>
            <textarea 
              id="notif-message" 
              style={{ ...commonStyles.input, height: '120px', resize: 'none', paddingRight: '45px' }} 
              placeholder="Xabarni bu yerga yozing..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button 
              onClick={() => setActivePicker(activePicker === 'message' ? null : 'message')}
              style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: '4px' }}
              aria-label="Emoji qo'shish"
              title="Emoji qo'shish"
            >
              <Smile size={20} />
            </button>
            {activePicker === 'message' && <EmojiPicker field="message" />}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
          <button style={{ ...commonStyles.button('primary'), flex: 2 }}><Send size={18} /> Xabarni hozir yuborish</button>
          <button 
            onClick={() => setShowHistory(true)}
            style={{ ...commonStyles.button('secondary'), flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <History size={18} /> Yuborilgan xabarlar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
