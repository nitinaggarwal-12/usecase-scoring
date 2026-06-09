import { useState } from 'react';
import { FileText, LayoutDashboard, FolderHeart, Settings2, Sparkles, Home, Users, History, Activity, Compass, ChevronRight } from 'lucide-react';

export default function Sidebar({ 
  viewMode, 
  reportData, 
  onGoHome, 
  onNewIntake, 
  onViewSummary, 
  onOpenSessions, 
  onOpenPermissions, 
  onOpenChatHistory, 
  onOpenSettings, 
  onOpenLogs,
  activeFramework = 'option1',
  onFrameworkChange = () => {}
}) {
  const [isAssessHovered, setIsAssessHovered] = useState(false);

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', position: 'relative', zIndex: 10000, overflowY: 'auto' }}>
      
      {/* Brand Section */}
      <div className="sidebar-brand" onClick={onGoHome} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
        <div style={{ background: 'var(--google-blue)', color: 'white', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={20} />
        </div>
        <div>
          <span style={{ fontWeight: 850, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'block' }}>Gemini Enterprise</span>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.05rem' }}>Use Case Suite</div>
        </div>
      </div>

      {/* Category: Core Workspace */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>
          Core Workspace
        </span>
        
        <button
          onClick={onGoHome}
          className={`sidebar-btn ${viewMode === 'home' && activeFramework === 'option1' ? 'active' : ''}`}
        >
          <Home size={17} />
          <span>Overview Home</span>
        </button>

        <button
          onClick={onViewSummary}
          className={`sidebar-btn ${viewMode === 'summary' ? 'active' : ''}`}
        >
          <LayoutDashboard size={17} />
          <span>Portfolio Summary</span>
        </button>

        <button
          onClick={() => onFrameworkChange('intake')}
          className={`sidebar-btn ${viewMode === 'landing' && activeFramework === 'intake' ? 'active' : ''}`}
        >
          <FileText size={17} />
          <span>New Discovery Intake</span>
        </button>

      </div>

      {/* Category: Assessment Modules (Direct Standalone Links Organized Logically) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }} className="no-print">
        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>
          Assessment Modules
        </span>

        <button
          onClick={() => onFrameworkChange('option5')}
          className={`sidebar-btn ${activeFramework === 'option5' ? 'active' : ''}`}
        >
          <Compass size={17} style={{ color: 'var(--google-blue)' }} />
          <span style={{ fontWeight: activeFramework === 'option5' ? 800 : 600 }}>ML Maturity Assessor (v5)</span>
        </button>

        <button
          onClick={() => onFrameworkChange('option6')}
          className={`sidebar-btn ${activeFramework === 'option6' ? 'active' : ''}`}
        >
          <Activity size={17} style={{ color: 'var(--google-green)' }} />
          <span style={{ fontWeight: activeFramework === 'option6' ? 800 : 600 }}>Financial ROI Assessor (v6)</span>
        </button>

        <button
          onClick={() => onFrameworkChange('option7')}
          className={`sidebar-btn ${activeFramework === 'option7' ? 'active' : ''}`}
        >
          <Sparkles size={17} style={{ color: 'var(--google-purple)' }} />
          <span style={{ fontWeight: activeFramework === 'option7' ? 800 : 600 }}>Agentic AI Discovery (v7)</span>
        </button>

        <button
          onClick={() => onFrameworkChange('option8')}
          className={`sidebar-btn ${activeFramework === 'option8' ? 'active' : ''}`}
        >
          <Sparkles size={17} style={{ color: 'var(--google-amber)' }} />
          <span style={{ fontWeight: activeFramework === 'option8' ? 800 : 600 }}>Feasibility Assessor (v8)</span>
        </button>

        <button
          onClick={() => onFrameworkChange('option9')}
          className={`sidebar-btn ${activeFramework === 'option9' ? 'active' : ''}`}
        >
          <Sparkles size={17} style={{ color: 'var(--google-blue)' }} />
          <span style={{ fontWeight: activeFramework === 'option9' ? 800 : 600 }}>Premium Executive Assessor (v9)</span>
        </button>

        <button
          onClick={() => onFrameworkChange('option10')}
          className={`sidebar-btn ${activeFramework === 'option10' ? 'active' : ''}`}
          style={{
            background: activeFramework === 'option10' ? 'linear-gradient(90deg, rgba(16,185,129,0.22), rgba(6,182,212,0.22))' : 'transparent',
            borderLeft: activeFramework === 'option10' ? '3px solid #10b981' : 'none'
          }}
        >
          <Sparkles size={17} style={{ color: '#10b981', animation: activeFramework === 'option10' ? 'pulse 1.5s infinite' : 'none' }} />
          <span style={{ fontWeight: activeFramework === 'option10' ? 850 : 700, color: activeFramework === 'option10' ? '#10b981' : 'inherit' }}>
            Portfolio Intelligence (v10)
          </span>
        </button>
      </div>

      {/* Category: Governance & Collaboration */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>
          Governance & IAM
        </span>

        <button
          onClick={onOpenSessions}
          className="sidebar-btn"
        >
          <FolderHeart size={17} />
          <span>Saved Blueprints</span>
        </button>

        <button
          onClick={onOpenPermissions}
          className={`sidebar-btn ${viewMode === 'permissions' ? 'active' : ''}`}
        >
          <Users size={17} />
          <span>Access Control (IAM)</span>
        </button>

        <button
          onClick={onOpenChatHistory}
          className={`sidebar-btn ${viewMode === 'chat_history' ? 'active' : ''}`}
        >
          <History size={17} />
          <span>Executive Briefing Chat</span>
        </button>
      </div>

      {/* Category: System Administration */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: 'auto' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>
          Administration
        </span>

        <button
          onClick={onOpenLogs}
          className={`sidebar-btn ${viewMode === 'logs' ? 'active' : ''}`}
        >
          <Activity size={17} />
          <span>Diagnostics & Telemetry</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="sidebar-btn"
        >
          <Settings2 size={17} />
          <span>Portal Configuration</span>
        </button>
      </div>

      {/* Versioning footer */}
      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', marginTop: '0.5rem' }}>
        v1.2.0 • Live HITL Active
      </div>
    </aside>
  );
}
