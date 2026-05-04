import React from 'react';
import { Zap, RotateCcw, TrendingUp, TrendingDown, Clock, X } from 'lucide-react';
import { theme, commonStyles } from '../styles/theme';

interface PricingProps {
  onBack?: () => void;
}

const stepBtnStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  border: `1px solid ${theme.colors.border}`,
  backgroundColor: theme.colors.inputBg,
  color: '#fff',
  fontSize: '18px',
  fontWeight: '700',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  flexShrink: 0,
};

const PriceField = ({
  id, label, value, onChange
}: { id: string; label: string; value: string; onChange: (v: string) => void }) => {
  const adjust = (delta: number) => {
    const current = parseFloat(value) || 0;
    onChange((Math.max(0, current + delta)).toFixed(2));
  };

  return (
    <div style={{ flex: 1 }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: theme.colors.textMuted }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => adjust(-1)}
          style={stepBtnStyle as React.CSSProperties}
          title="-1"
          aria-label="Kamaytirish"
        >−</button>
        <input
          id={id}
          type="number"
          value={value}
          style={{ ...commonStyles.input, textAlign: 'center', flex: 1 }}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          onClick={() => adjust(1)}
          style={{ ...stepBtnStyle, backgroundColor: `${theme.colors.primary}22`, borderColor: `${theme.colors.primary}55`, color: theme.colors.primary } as React.CSSProperties}
          title="+1"
          aria-label="Oshirish"
        >+</button>
      </div>
    </div>
  );
};

interface PriceHistory {
  id: string;
  date: string;
  type: 'Oylik' | 'Yillik';
  oldPrice: string;
  newPrice: string;
  trend: 'up' | 'down';
}

const Pricing = ({ onBack }: PricingProps) => {
  const [savedMonthly, setSavedMonthly] = React.useState('4.99');
  const [savedYearly, setSavedYearly] = React.useState('39.99');

  const [monthly, setMonthly] = React.useState('4.99');
  const [yearly, setYearly] = React.useState('39.99');

  const [showHistoryModal, setShowHistoryModal] = React.useState(false);

  const [history, setHistory] = React.useState<PriceHistory[]>([
    { id: '1', date: '02.05.2026, 14:30', type: 'Oylik', oldPrice: '3.99', newPrice: '4.99', trend: 'up' },
    { id: '2', date: '15.04.2026, 09:15', type: 'Yillik', oldPrice: '45.99', newPrice: '39.99', trend: 'down' },
  ]);

  const handleReset = () => {
    setMonthly(savedMonthly);
    setYearly(savedYearly);
  };

  const handleUpdate = () => {
    const newHistory = [...history];
    const now = new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    let changed = false;

    if (parseFloat(monthly) !== parseFloat(savedMonthly)) {
      const isUp = parseFloat(monthly) > parseFloat(savedMonthly);
      newHistory.unshift({
        id: Date.now().toString() + 'm',
        date: now,
        type: 'Oylik',
        oldPrice: savedMonthly,
        newPrice: monthly,
        trend: isUp ? 'up' : 'down'
      });
      setSavedMonthly(monthly);
      changed = true;
    }

    if (parseFloat(yearly) !== parseFloat(savedYearly)) {
      const isUp = parseFloat(yearly) > parseFloat(savedYearly);
      newHistory.unshift({
        id: Date.now().toString() + 'y',
        date: now,
        type: 'Yillik',
        oldPrice: savedYearly,
        newPrice: yearly,
        trend: isUp ? 'up' : 'down'
      });
      setSavedYearly(yearly);
      changed = true;
    }

    if (changed) {
      setHistory(newHistory);
    }
  };

  const hasChanges = parseFloat(monthly) !== parseFloat(savedMonthly) || parseFloat(yearly) !== parseFloat(savedYearly);

  return (
    <div style={{ padding: '32px' }} className="page-transition">
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Premium obuna narxlari</h3>
        <button 
          onClick={() => setShowHistoryModal(true)}
          style={{ background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', padding: '8px 12px', borderRadius: '8px', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.colors.textMuted; }}
        >
          <Clock size={16} /> Tarixni ko'rish
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <PriceField id="monthly-price" label="Oylik narx ($)" value={monthly} onChange={setMonthly} />
          <PriceField id="yearly-price" label="Yillik narx ($)" value={yearly} onChange={setYearly} />
        </div>
        <div style={{ padding: '16px', backgroundColor: '#1a1a1e', borderRadius: '12px', border: '1px dashed #333' }}>
          <div style={{ fontSize: '13px', color: theme.colors.textMuted, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color={theme.colors.primary} /> O'zgarishlar ilovada darhol aks etadi.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            onClick={handleUpdate}
            disabled={!hasChanges}
            style={{ 
              ...commonStyles.button('primary'), 
              flex: 2,
              opacity: hasChanges ? 1 : 0.5,
              cursor: hasChanges ? 'pointer' : 'not-allowed'
            }}
          >
            Narxlarni yangilash
          </button>
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            style={{ 
              ...commonStyles.button('secondary'), 
              flex: 1, 
              backgroundColor: 'rgba(244, 63, 94, 0.1)', 
              color: theme.colors.danger, 
              borderColor: 'rgba(244, 63, 94, 0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              opacity: hasChanges ? 1 : 0.5,
              cursor: hasChanges ? 'pointer' : 'not-allowed'
            }}
          >
            <RotateCcw size={18} /> Asliga qaytar
          </button>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          animation: 'fadeIn 0.2s ease',
        }} onClick={() => setShowHistoryModal(false)}>
          <div style={{
            ...commonStyles.card,
            width: '550px',
            maxWidth: '90%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transform: 'scale(1)',
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={22} color={theme.colors.text} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>O'zgarishlar tarixi</h3>
                  <div style={{ fontSize: '13px', color: theme.colors.textMuted }}>Narxlarning o'zgartirilish sanalari</div>
                </div>
              </div>
              <button 
                onClick={() => setShowHistoryModal(false)} 
                title="Yopish"
                aria-label="Yopish"
                style={{ background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#222226'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '240px', overflowY: 'auto', paddingRight: '8px' }}>
              {history.map((item, index) => (
                <div key={item.id} style={{ padding: '16px 0', borderBottom: index < history.length - 1 ? `1px solid ${theme.colors.border}` : 'none' }}>
                  <div style={{ fontSize: '15px', color: '#fff', fontWeight: '600', marginBottom: '8px' }}>
                    {item.type} obuna narxi o'zgartirildi
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: theme.colors.textMuted }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} /> {item.date}
                    </div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.colors.border }}></div>
                    <div>
                      Eski narx: <span style={{ textDecoration: 'line-through' }}>${item.oldPrice}</span>
                    </div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.colors.border }}></div>
                    <div>
                      Yangi narx: <strong style={{ color: '#fff' }}>${item.newPrice}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
