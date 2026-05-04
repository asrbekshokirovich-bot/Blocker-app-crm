import React, { useState } from 'react';
import { Users, Zap, DollarSign, UserCheck, Activity, Globe, ShieldCheck, X, TrendingUp, Clock, Smartphone, WifiOff, RefreshCw, Send } from 'lucide-react';
import { theme, commonStyles } from '../styles/theme';

const styles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  statCard: {
    backgroundColor: theme.colors.card,
    borderRadius: '20px',
    padding: '24px',
    border: `1px solid ${theme.colors.border}`,
    position: 'relative' as const,
    overflow: 'hidden',
  },
  statIcon: (color: string) => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: `${color}15`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  }),
  quickActionButton: {
    padding: '12px 20px',
    borderRadius: '12px',
    backgroundColor: theme.colors.inputBg,
    border: `1px solid ${theme.colors.border}`,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }
};

interface DashboardProps {
  setActiveTab: (t: string) => void;
}

const Dashboard = ({ setActiveTab }: DashboardProps) => {
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showBlockedAppsModal, setShowBlockedAppsModal] = useState(false);
  const [showPremiumMembersModal, setShowPremiumMembersModal] = useState(false);
  // Joriy foydalanuvchi roli. Buni 'Admin' ga o'zgartirsangiz bo'limlar yashiriladi.
  const CURRENT_USER_ROLE = 'Super Admin';

  const REVENUE_DATA = [
    { id: 1, name: 'Sardor Qodirov', email: 'sardor@gmail.com', userId: '#1289', amount: '$120', date: 'Bugun 14:30' },
    { id: 2, name: 'Maftuna Aliyeva', email: 'maftuna.a@mail.ru', userId: '#2910', amount: '$120', date: 'Bugun 11:15' },
    { id: 3, name: 'Jasur Bekmurodov', email: 'j.bek@gmail.com', userId: '#3401', amount: '$120', date: 'Kecha 18:45' },
    { id: 4, name: 'Dilnoza Karimova', email: 'dilnoza99@gmail.com', userId: '#1022', amount: '$60', date: 'Kecha 09:20' },
    { id: 5, name: 'Bekzod Rahimov', email: 'bek.dev@yahoo.com', userId: '#8891', amount: '$120', date: '2 kun oldin' },
    { id: 6, name: 'Aziz Toshmatov', email: 'aziz.tosh@gmail.com', userId: '#9012', amount: '$60', date: '3 kun oldin' },
  ];

  const BLOCKED_APPS_DATA = [
    { rank: 1, name: 'Instagram', category: 'Ijtimoiy tarmoq', blocks: '12.4 mln', icon: 'IG', color: '#E1306C' },
    { rank: 2, name: 'TikTok', category: 'O\'yin-kulgi', blocks: '9.8 mln', icon: 'TT', color: '#666' },
    { rank: 3, name: 'YouTube', category: 'Video streaming', blocks: '8.2 mln', icon: 'YT', color: '#FF0000' },
    { rank: 4, name: 'Telegram', category: 'Muloqot', blocks: '5.1 mln', icon: 'TG', color: '#0088cc' },
    { rank: 5, name: 'PUBG Mobile', category: 'O\'yin', blocks: '3.9 mln', icon: 'PG', color: '#F59E0B' },
  ];

  return (
    <div className="page-transition" style={{
      display: 'flex',
      gap: '40px',
      alignItems: 'start',
      width: '100%'
    }}>
      {/* Left Column (Dashboard) */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '16px 0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>Dashboard tahlili</h1>
            <p style={{ margin: '4px 0 0 0', color: theme.colors.textMuted, fontSize: '14px' }}>
              Ilova ekotizimi va foydalanuvchilarni boshqaring.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div style={styles.statCard}>
            <div style={styles.statIcon(theme.colors.primary)}><Users size={24} /></div>
            <div style={{ color: theme.colors.textMuted, fontSize: '14px' }}>Jami foydalanuvchilar</div>
            <div style={{ fontSize: '28px', fontWeight: '700', marginTop: '4px' }}>12,842</div>
            <div style={{ fontSize: '12px', color: theme.colors.success, marginTop: '8px' }}>shu oyda +12%</div>
          </div>

          <div 
            style={{...styles.statCard, cursor: 'pointer', transition: 'all 0.2s ease'}}
            onClick={() => setShowPremiumMembersModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = theme.colors.danger;
              e.currentTarget.style.boxShadow = `0 10px 20px ${theme.colors.danger}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = theme.colors.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.statIcon(theme.colors.danger)}><Zap size={24} /></div>
            <div style={{ color: theme.colors.textMuted, fontSize: '14px' }}>Premium a'zolar</div>
            <div style={{ fontSize: '28px', fontWeight: '700', marginTop: '4px' }}>2,451</div>
            <div style={{ fontSize: '12px', color: theme.colors.success, marginTop: '8px' }}>shu haftada +5%</div>
          </div>

          <div 
            style={{...styles.statCard, cursor: 'pointer', transition: 'all 0.2s ease'}}
            onClick={() => setShowRevenueModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = theme.colors.success;
              e.currentTarget.style.boxShadow = `0 10px 20px ${theme.colors.success}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = theme.colors.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.statIcon(theme.colors.success)}><DollarSign size={24} /></div>
            <div style={{ color: theme.colors.textMuted, fontSize: '14px' }}>Jami daromad</div>
            <div style={{ fontSize: '28px', fontWeight: '700', marginTop: '4px' }}>$48,620</div>
            <div style={{ fontSize: '12px', color: theme.colors.success, marginTop: '8px' }}>shu oyda +18%</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
          <div style={commonStyles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Tasdiqlangan premium obunachilar</h3>
              <span 
                style={{ fontSize: '13px', color: theme.colors.primary, cursor: 'pointer', transition: '0.2s', padding: '4px 8px', borderRadius: '6px' }}
                onClick={() => setShowPremiumMembersModal(true)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Hammasini ko'rish
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', backgroundColor: theme.colors.inputBg, borderRadius: '12px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '20px', backgroundColor: '#222226', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={20} color={theme.colors.primary} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>Yangi Premium obuna</div>
                    <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>Foydalanuvchi #{9420 + i} yillik reja sotib oldi</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#555' }}>{i * 2} daqiqa oldin</div>
                </div>
              ))}
            </div>
          </div>

          <div style={commonStyles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Foydalanuvchilar o'sishi</h3>
              <div style={{ display: 'flex', backgroundColor: '#1a1a1e', padding: '4px', borderRadius: '8px', border: `1px solid ${theme.colors.border}` }}>
                <button style={{
                  padding: '4px 12px',
                  fontSize: '11px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: theme.colors.primary,
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>Haftalik</button>
                <button style={{
                  padding: '4px 12px',
                  fontSize: '11px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: theme.colors.textMuted,
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>Oylik</button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '160px', padding: '20px 0', gap: '12px' }}>
              {[35, 45, 30, 60, 75, 50, 90].map((h, i) => (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  flex: 1,
                  height: '100%',
                  justifyContent: 'flex-end',
                  position: 'relative'
                }} className="chart-item">
                  <div
                    className="bar-tooltip"
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      backgroundColor: theme.colors.card,
                      border: `1px solid ${theme.colors.border}`,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: '#fff',
                      opacity: 0,
                      transition: 'all 0.2s ease',
                      pointerEvents: 'none',
                      transform: 'translateY(10px)',
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }}
                  >
                    {Math.round(h * 4.2)}
                  </div>
                  <div style={{
                    width: '12px',
                    height: `${h}%`,
                    backgroundColor: i === 6 ? theme.colors.primary : '#33333a',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: i === 6 ? `0 0 15px ${theme.colors.primary}40` : 'none'
                  }} className="growth-bar"></div>
                  <span style={{ fontSize: '10px', color: theme.colors.textMuted, fontWeight: '600' }}>{['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'][i]}</span>
                </div>
              ))}
            </div>
            <style>{`
            .chart-item:hover .bar-tooltip {
              opacity: 1 !important;
              transform: translateY(0) !important;
            }
            .chart-item:hover .growth-bar {
              background-color: ${theme.colors.primary} !important;
              box-shadow: 0 0 15px ${theme.colors.primary}60 !important;
            }
          `}</style>
            <div style={{ marginTop: '20px', display: 'flex', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>Yangi foydalanuvchilar</div>
                <div style={{ fontSize: '16px', fontWeight: '700' }}>+1,204</div>
              </div>
              <div style={{ borderLeft: `1px solid ${theme.colors.border}`, paddingLeft: '16px' }}>
                <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>Tutib qolish (Retention)</div>
                <div style={{ fontSize: '16px', fontWeight: '700' }}>88%</div>
              </div>
            </div>
          </div>
        </div>

        <div 
          style={{ ...commonStyles.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => setShowBlockedAppsModal(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = theme.colors.danger;
            e.currentTarget.style.boxShadow = `0 10px 20px ${theme.colors.danger}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = theme.colors.border;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: `${theme.colors.danger}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={28} color={theme.colors.danger} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: theme.colors.textMuted, display: 'flex', alignItems: 'center', gap: '10px' }}>
                Eng ko'p bloklangan ilova
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', fontSize: '11px', color: theme.colors.textMuted }} title="Foydalanuvchilar internetga ulanganda ma'lumotlar avtomatik yangilanadi">
                  <RefreshCw size={10} />
                  Sinxronizatsiya orqali
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginTop: '4px' }}>Instagram</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>Bugungi bloklashlar</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: theme.colors.danger, marginTop: '4px' }}>245,120 ta</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>Jami bloklashlar</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginTop: '4px' }}>12.4 mln</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>O'sish tendensiyasi</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: theme.colors.danger, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={16} /> +12%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Actions) - Separated */}
      <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '80px' }}>
        <div>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '700', color: '#fff' }}>Qo'shimcha sozlamalar</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ ...commonStyles.card, cursor: 'pointer', padding: '20px' }} onClick={() => setActiveTab('push')} className="nav-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Zap size={20} color={theme.colors.primary} />
                <h4 style={{ margin: 0 }}>Push-xabarnomalar</h4>
              </div>
              <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: '13px' }}>Foydalanuvchilarga xabar yuboring.</p>
            </div>

            <div style={{ ...commonStyles.card, cursor: 'pointer', padding: '20px' }} onClick={() => setActiveTab('premium')} className="nav-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <DollarSign size={20} color={theme.colors.success} />
                <h4 style={{ margin: 0 }}>Premium narxlari</h4>
              </div>
              <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: '13px' }}>Obuna rejalarini boshqaring.</p>
            </div>
          </div>
        </div>

        {CURRENT_USER_ROLE === 'Super Admin' && (
          <div>
            <h2 style={{ margin: '32px 0 20px 0', fontSize: '24px', fontWeight: '700', color: '#fff' }}>Tizim boshqaruvi</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ ...styles.statCard, cursor: 'pointer', transition: 'transform 0.2s', padding: '20px' }} onClick={() => setActiveTab('users')} className="nav-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <UserCheck size={20} color={theme.colors.success} />
                  <h4 style={{ margin: 0 }}>Tizim boshqaruvi</h4>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: theme.colors.primary, marginTop: '8px' }}>Foydalanuvchilar ro'yxati →</div>
              </div>

              <div style={{ ...styles.statCard, cursor: 'pointer', transition: 'transform 0.2s', padding: '20px' }} onClick={() => setActiveTab('admins')} className="nav-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <ShieldCheck size={20} color={theme.colors.primary} />
                  <h4 style={{ margin: 0 }}>Xavfsizlik va Boshqaruv</h4>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: theme.colors.primary, marginTop: '8px' }}>Adminlar ro'yxati →</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Revenue Modal */}
      {showRevenueModal && (
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
        }} onClick={() => setShowRevenueModal(false)}>
          <div style={{
            ...commonStyles.card,
            width: '600px',
            maxWidth: '90%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transform: 'scale(1)',
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: `${theme.colors.success}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={22} color={theme.colors.success} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>Daromadlar tarixi</h3>
                  <div style={{ fontSize: '13px', color: theme.colors.textMuted }}>Oxirgi Premium xaridlar ro'yxati</div>
                </div>
              </div>
              <button 
                onClick={() => setShowRevenueModal(false)} 
                title="Yopish"
                aria-label="Yopish"
                style={{ background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#222226'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '450px', overflowY: 'auto', paddingRight: '8px' }}>
              {REVENUE_DATA.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: theme.colors.inputBg, borderRadius: '16px', border: `1px solid ${theme.colors.border}`, transition: 'transform 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 46, height: 46, borderRadius: '23px', backgroundColor: '#222226', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '600', fontSize: '16px', border: `1px solid ${theme.colors.border}` }}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>{item.name}</div>
                      <div style={{ fontSize: '13px', color: theme.colors.textMuted, display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span>{item.email}</span>
                        <span style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#444' }} />
                        <span>{item.userId}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: theme.colors.success, fontWeight: '700', fontSize: '16px' }}>
                      <TrendingUp size={16} />
                      +{item.amount}
                    </div>
                    <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blocked Apps Modal */}
      {showBlockedAppsModal && (
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
        }} onClick={() => setShowBlockedAppsModal(false)}>
          <div style={{
            ...commonStyles.card,
            width: '600px',
            maxWidth: '90%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transform: 'scale(1)',
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: `${theme.colors.danger}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} color={theme.colors.danger} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>Eng ko'p bloklangan ilovalar</h3>
                  <div style={{ fontSize: '13px', color: theme.colors.textMuted }}>Oflayn qurilmalardan olingan reyting</div>
                </div>
              </div>
              <button 
                onClick={() => setShowBlockedAppsModal(false)} 
                title="Yopish"
                aria-label="Yopish"
                style={{ background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#222226'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '450px', overflowY: 'auto', paddingRight: '8px' }}>
              {BLOCKED_APPS_DATA.map(app => (
                <div key={app.rank} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: theme.colors.inputBg, borderRadius: '16px', border: `1px solid ${theme.colors.border}`, transition: 'transform 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: app.rank === 1 ? 'rgba(239, 68, 68, 0.1)' : '#222226', display: 'flex', alignItems: 'center', justifyContent: 'center', color: app.rank === 1 ? theme.colors.danger : theme.colors.textMuted, fontWeight: '700', fontSize: '14px' }}>
                      #{app.rank}
                    </div>
                    <div style={{ width: 46, height: 46, borderRadius: '14px', backgroundColor: app.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '16px', boxShadow: `0 4px 10px ${app.color}40` }}>
                      {app.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{app.name}</div>
                      <div style={{ fontSize: '13px', color: theme.colors.textMuted, marginTop: '2px' }}>{app.category}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: theme.colors.danger }}>{app.blocks}</div>
                    <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>marta bloklangan</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Premium Members Modal */}
      {showPremiumMembersModal && (
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
        }} onClick={() => setShowPremiumMembersModal(false)}>
          <div style={{
            ...commonStyles.card,
            width: '700px',
            maxWidth: '90%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transform: 'scale(1)',
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: `${theme.colors.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={22} color={theme.colors.primary} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>Premium a'zolar</h3>
                  <div style={{ fontSize: '13px', color: theme.colors.textMuted }}>Barcha tasdiqlangan premium obunachilar ro'yxati</div>
                </div>
              </div>
              <button 
                onClick={() => setShowPremiumMembersModal(false)} 
                title="Yopish"
                aria-label="Yopish"
                style={{ background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#222226'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
              {REVENUE_DATA.map(user => (
                <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: theme.colors.inputBg, borderRadius: '16px', border: `1px solid ${theme.colors.border}`, transition: 'transform 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 46, height: 46, borderRadius: '23px', backgroundColor: '#222226', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '600', fontSize: '16px', border: `1px solid ${theme.colors.border}` }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>
                        {user.name} <span style={{ fontSize: '11px', color: theme.colors.primary, backgroundColor: 'rgba(59, 130, 246, 0.15)', padding: '2px 6px', borderRadius: '6px', marginLeft: '8px', fontWeight: '800' }}>PRO</span>
                      </div>
                      <div style={{ fontSize: '13px', color: theme.colors.textMuted, marginTop: '4px' }}>{user.email} &bull; ID: {user.userId}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: theme.colors.success, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.colors.success, boxShadow: `0 0 6px ${theme.colors.success}` }}></div>
                      Faol
                    </div>
                    <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>{user.date}</div>
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

export default Dashboard;
