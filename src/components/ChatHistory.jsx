import { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Calendar, Trash2, AlertTriangle } from 'lucide-react';

export default function ChatHistory() {
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      const stored = localStorage.getItem('gemini_chat_feedback');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed loading chat feedback:", e);
      return [];
    }
  });

  const handleDeleteFeedback = (id) => {
    if (confirm("Are you sure you want to delete this chat feedback log?")) {
      const updated = feedbackList.filter(item => item.id !== id);
      setFeedbackList(updated);
      try {
        localStorage.setItem('gemini_chat_feedback', JSON.stringify(updated));
      } catch (e) {
        console.error("Error deleting feedback:", e);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm("🚨 Warning: This will completely wipe all conversational feedback logs and reset the Reinforcement Alignment context! Proceed?")) {
      setFeedbackList([]);
      try {
        localStorage.removeItem('gemini_chat_feedback');
      } catch (e) {
        console.error("Error clearing feedback:", e);
      }
    }
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        maxWidth: '100%', 
        margin: '0', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.15rem', 
        padding: '0 0.5rem',
        height: 'calc(100vh - 110px)', // Viewport Height Locked!
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(0, 98, 86, 0.06) 0%, rgba(132, 48, 206, 0.06) 100%)', borderColor: 'var(--border-color)', padding: '1.15rem 1.5rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--google-blue-light)', color: 'var(--google-blue)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Conversational History & Alignment</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Inspect logged user interactions and reinforce Gemini's responses via HITL reinforcement learning</p>
            </div>
          </div>
          <button onClick={handleClearAll} className="btn btn-secondary" style={{ color: 'var(--google-red)', borderColor: 'rgba(197, 34, 31, 0.2)', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 700 }}>
            <Trash2 size={13} />
            <span>Reset Alignment Logs</span>
          </button>
        </div>
      </div>

      {/* Main Feedback logs card (Widescreen & Stretched!) */}
      <div 
        className="card" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem', 
          padding: '1.25rem', 
          borderRadius: '16px', 
          boxShadow: 'var(--shadow-sm)', 
          background: 'var(--bg-card)', 
          borderColor: 'var(--border-color)',
          flex: 1,
          minHeight: 0
        }}
      >
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, flexShrink: 0 }}>
          <span>Reinforcement Learning logs (HITL Feedback)</span>
        </h3>

        {feedbackList.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-secondary)', padding: '2rem 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>No conversational feedback logged yet</h4>
            <p style={{ fontSize: '0.78rem', maxWidth: '420px', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
              Ask the interactive chat assistant questions and click the thumbs-up/down buttons inside the chat bubbles to train the model dynamically in real-time.
            </p>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '750px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 5 }}>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', width: '100px' }}>Date</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', width: '200px' }}>User Question</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', width: '220px' }}>Gemini Response</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', width: '100px', textAlign: 'center' }}>Rating</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', width: '180px' }}>User Comment</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', width: '60px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={11} />
                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.question}>
                      {item.question}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.answer}>
                      {item.answer}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                      {item.isPositive ? (
                        <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.15rem 0.5rem', fontSize: '0.62rem', fontWeight: 700 }}>
                          <ThumbsUp size={9} />
                          <span>Helpful</span>
                        </span>
                      ) : (
                        <span className="badge badge-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.15rem 0.5rem', fontSize: '0.62rem', fontWeight: 700 }}>
                          <ThumbsDown size={9} />
                          <span>Needs Work</span>
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontStyle: 'italic', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.comment}>
                      {item.comment || '—'}
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDeleteFeedback(item.id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--google-red)', padding: '0.25rem' }}
                        title="Delete log entry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Security alignment notice at card bottom */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '1rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)', flexShrink: 0 }}>
        <AlertTriangle size={18} style={{ color: 'var(--google-blue)', flexShrink: 0, marginTop: '0.08rem' }} />
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem', margin: 0 }}>In-Context Reinforcement Learning Loop Active</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
            Logged positive and negative comments are aggregated and securely injected as reference guidelines inside the model's context payload. This enables your customized Gemini cloud engine to dynamically self-improve without any risk of model degradation or performance regression.
          </p>
        </div>
      </div>
    </div>
  );
}
