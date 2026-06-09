import { useState, useEffect, useRef } from 'react';
import { Sparkles, Shield, ArrowRight, CheckCircle2, Zap, Database, Server, Layers, Activity, Users, Lock, ShieldCheck, MessageSquare, Terminal, Cpu, Headphones, HelpCircle, Shuffle, BarChart3, Key, Settings, Folder, GitBranch, Gauge, Info, Star, LayoutGrid } from 'lucide-react';

export default function ExecutiveLandingPage({ sessions = [], onStartDiscovery, onOpenSessions, onViewSummary }) {
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  
  // macOS Window Title Header Dots States
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);

  // Monospace Live Telemetry Audit Logs
  const [logs, setLogs] = useState([
    { subsystem: 'SSO', msg: 'principal admin@nitinagga.altostrat.com provisioned (Super Admin)', time: '10:02:31' },
    { subsystem: 'neutrality', msg: 'Proving baseline scoring neutrality parameters... Checked', time: '10:02:33' },
    { subsystem: 'security', msg: 'Redacting prompt PII/PHI vectors via inline DLP API... Done', time: '10:02:35' },
    { subsystem: 'VPC-SC', msg: 'Mount secure Private Service Connect (PSC) tunnel... Active (europe-west3)', time: '10:02:38' }
  ]);

  const terminalScrollRef = useRef(null);

  // Interactive Gemini Enterprise Stack states (Fully context-isolated by tier!)
  const [activeCard, setActiveCard] = useState('app'); // Upper Tier App: defaults to 'app' (always visible!)
  const [activeIcon, setActiveIcon] = useState(0); // Middle Tier Infrastructure Icons: defaults to 0 (always visible!)
  const [activeCapability, setActiveCapability] = useState('govern'); // Middle Tier Capability Cards: defaults to 'govern'
  const [activeBottomCard, setActiveBottomCard] = useState('hyper'); // Lower Tier Infrastructure: defaults to 'hyper'

  // Pixar-style Hover States
  const [hoveredStep, setHoveredStep] = useState(null); // null | 1 | 2 | 3 | 4 | 5
  const [hoveredKpi, setHoveredKpi] = useState(null); // null | 'active' | 'pending' | 'approved' | 'avg'

  // Live Portfolio Telemetry Calculations
  const totalActive = sessions.length;
  const totalPending = sessions.filter(s => s.status === 'Pending Approval' || s.formData?.status === 'Pending Approval').length;
  const totalApproved = sessions.filter(s => s.status === 'Approved' || s.formData?.status === 'Approved').length;
  const avgSuitability = totalActive > 0
    ? Math.round(sessions.reduce((acc, s) => acc + (s.scoring?.overallFit || s.rawResponse?.scoring?.overallFit || 0), 0) / totalActive)
    : 0;

  useEffect(() => {
    const candidates = [
      { subsystem: 'governance', msg: 'Syncing Active Directory IAM principal bindings... Provisioned', time: '10:02:41' },
      { subsystem: 'dossier', msg: 'Locking approved master blueprint GE-88738-A... Committed (Read-Only)', time: '10:02:44' },
      { subsystem: 'compliance', msg: 'Calibrating HIPAA & SOC2 baseline isolation perimeters... Verified', time: '10:02:48' },
      { subsystem: 'neutrality', msg: 'Multi-agent suitability assessor rating neutral... Asserted', time: '10:02:52' },
      { subsystem: 'analytics', msg: 'Porting aggregate projected TCO savings to Looker Summary... Synced', time: '10:02:59' }
    ];
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < candidates.length) {
        setLogs(prev => [...prev, candidates[idx]]);
        idx++;
      } else {
        setLogs([
          { subsystem: 'SSO', msg: 'principal admin@nitinagga.altostrat.com provisioned (Super Admin)', time: '10:02:31' },
          { subsystem: 'neutrality', msg: 'Proving baseline scoring neutrality parameters... Checked', time: '10:02:33' },
          { subsystem: 'security', msg: 'Redacting prompt PII/PHI vectors via inline DLP API... Done', time: '10:02:35' },
          { subsystem: 'VPC-SC', msg: 'Mount secure Private Service Connect (PSC) tunnel... Active (europe-west3)', time: '10:02:38' }
        ]);
        idx = 0;
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Helper to render dynamically color-coded logs
  const renderColorCodedLog = (log) => {
    if (!log || !log.subsystem) return null;
    let color = '#38bdf8'; // default cyan
    if (log.subsystem === 'SSO') color = 'var(--google-blue)';
    else if (log.subsystem === 'security') color = 'var(--google-green)';
    else if (log.subsystem === 'VPC-SC') color = '#0284c7';
    else if (log.subsystem === 'neutrality') color = 'var(--google-amber)';
    else if (log.subsystem === 'dossier') color = 'var(--google-purple)';
    else if (log.subsystem === 'compliance') color = 'var(--google-green)';

    return (
      <div style={{ fontSize: '0.62rem', lineHeight: 1.35, fontFamily: 'monospace', display: 'flex', gap: '0.35rem' }}>
        <span style={{ color: '#64748b' }}>[{log.time}]</span>
        <strong style={{ color }}>[{log.subsystem}]</strong>
        <span style={{ color: 'var(--text-primary)' }}>{log.msg}</span>
      </div>
    );
  };

  // Dynamic Details Mappings based on Platform Capabilities
  const capabilityDescriptions = {
    build: {
      desc: "Create sophisticated, long-running agents utilizing Vertex AI Agent Builder, LangChain dependencies, and custom ADK runtimes.",
      badge: "Vertex AI Agent Builder",
      color: "var(--google-blue)"
    },
    scale: {
      desc: "Connect core enterprise systems and relational lakes securely using Google Cloud Private Service Connect (PSC) gateways.",
      badge: "Private Service Connect",
      color: "var(--google-purple)"
    },
    govern: {
      desc: "Enforce privacy, SOC2 compliance, data protection perimeters, and restrict egress metrics dynamically using automated DLP rules.",
      badge: "DLP API & VPC-SC isolation",
      color: "var(--google-green)"
    },
    optimize: {
      desc: "Observe, rate, and improve model outputs dynamically using Vertex AI Evaluation services and automatic golden benchmarking.",
      badge: "Vertex AI Evaluation Suite",
      color: "#0284c7"
    }
  };

  // Dynamic Details Mappings for App Cards
  const appCardDescriptions = {
    app: {
      desc: "🚀 App Integration: Deploys pre-built Vertex AI templates to host contextual chat interfaces across Slack, Teams, and Google Workspace.",
      badge: "Gemini Workspace Core",
      color: "var(--google-blue)"
    },
    custom: {
      desc: "🛠️ Custom Integration: Securely binds your OAuth Access Tokens to provision custom Python agent environments inside Google Cloud Run.",
      badge: "Vertex AI Reasoning Engine",
      color: "var(--google-purple)"
    },
    cx: {
      desc: "🎧 CX Integration: Channels contact-center streams directly into high-velocity Gemini 1.5 Flash latency pools with PHI redaction.",
      badge: "GCP Contact Center AI (CCAI)",
      color: "var(--google-green)"
    }
  };

  // Dynamic Details Mappings for the 6 foundation icons
  const iconDescriptions = [
    {
      desc: "🌐 Model Garden: Host, leverage Gemini 1.5 Pro, Gemini 1.5 Flash, and Gemma open weights inside your VPC security boundary.",
      badge: "1P, 3P, Open Models Integration",
      color: "var(--google-purple)"
    },
    {
      desc: "⚙️ Agentic Runtime: Powers in-context memory loops, LangChain integrations, and secure execution threads for active drafts.",
      badge: "ADK, Agent Runtime",
      color: "var(--google-blue)"
    },
    {
      desc: "📂 Extension Registry: Centralizes corporate extension API schemas, authentication keys, and secure web tools bindings.",
      badge: "Agent & Tool Registry",
      color: "var(--google-blue)"
    },
    {
      desc: "🔀 Agent Gateway: Directs secure API routing, allocates PSC bandwidth tunnels, and scales concurrency across multiple regions.",
      badge: "Agent Gateway",
      color: "var(--google-blue)"
    },
    {
      desc: "🛡️ IAM Secure Identity: Encrypts context assert validations and binds Workspace user profiles directly to cloud resource boundaries.",
      badge: "Agent Identity, Agent Security",
      color: "var(--google-green)"
    },
    {
      desc: "📈 Telemetry Monitor: Tracks prompt latency, API billing costs, accuracy ratios, and stores evaluations in BigQuery diagnostic datasets.",
      badge: "Agent Observability, Agent Evaluation",
      color: "#0284c7"
    }
  ];

  // Dynamic Details Mappings for Bottom Cards
  const bottomCardDescriptions = {
    hyper: {
      desc: "🖥️ AI Hypercomputer: Direct integration with Google Cloud TPU v5e clusters and NVIDIA H100 workloads to accelerate distributed model fine-tuning.",
      badge: "AI Hypercomputer",
      color: "var(--google-blue)"
    },
    data: {
      desc: "💾 Agentic Data Cloud: Mounts secure retrieval vectors against AlloyDB Omni (PostgreSQL) and BigQuery serverless data meshes.",
      badge: "Agentic Data Cloud",
      color: "var(--google-amber)"
    },
    defense: {
      desc: "🔒 Agent Defense: Standardizes authentication against Active Directory SSO and secures prompt parameters via GCP VPC Service Controls.",
      badge: "Agent Defense",
      color: "var(--google-green)"
    }
  };

  // Active Description computation for Middle Tier Platform card
  let activeTitle = `Platform Integration: ${capabilityDescriptions[activeCapability].badge}`;
  let activeDescText = capabilityDescriptions[activeCapability].desc;
  let activeColor = capabilityDescriptions[activeCapability].color;

  if (activeIcon !== null) {
    activeTitle = `Core Infrastructure: ${iconDescriptions[activeIcon].badge}`;
    activeDescText = iconDescriptions[activeIcon].desc;
    activeColor = iconDescriptions[activeIcon].color;
  }

  // Mappings for interactive Top KPI cards
  const kpis = [
    { key: 'active', label: 'Active Runs', val: totalActive, color: 'var(--google-blue)', bg: 'rgba(26,115,232,0.04)', action: () => onOpenSessions('all'), icon: <Folder size={16} /> },
    { key: 'pending', label: 'Pending Review', val: totalPending, color: 'var(--google-amber)', bg: 'rgba(180,83,9,0.04)', action: () => onOpenSessions('pending'), icon: <Activity size={16} /> },
    { key: 'approved', label: 'Locked Master', val: totalApproved, color: 'var(--google-green)', bg: 'rgba(21,128,61,0.04)', action: () => onOpenSessions('approved'), icon: <Lock size={16} /> },
    { key: 'avg', label: 'Avg Suitability', val: avgSuitability > 0 ? `${avgSuitability}%` : '—', color: '#0284c7', bg: 'rgba(2,132,199,0.04)', action: onViewSummary, icon: <Star size={16} /> }
  ];

  // Mappings for Prioritization Engine
  const steps = [
    {
      id: 1,
      title: "Workload Intake & Discovery",
      desc: "Gathers key company context, division budgets, and target GenAI parameters.",
      badge: "Intake Wizard",
      badgeBg: "var(--google-blue-light)",
      badgeColor: "var(--google-blue)",
      nodeColor: "var(--google-blue)"
    },
    {
      id: 2,
      title: "Compliance & Sovereignty Scoping",
      desc: "Enforces HIPAA data residencies, and inline DLP prompt PHI sanitization.",
      badge: "DLP Shield Active",
      badgeBg: "var(--google-purple-light)",
      badgeColor: "var(--google-purple)",
      nodeColor: "var(--google-purple)"
    },
    {
      id: 3,
      title: "Objective Scored Calibration",
      desc: "Scores feasibility neutrally across 5 parameters (Tech, Value, Risk, Speed, Cost).",
      badge: "Feasibility Scored",
      badgeBg: "rgba(2,132,199,0.08)",
      badgeColor: "#0284c7",
      nodeColor: "#0284c7"
    },
    {
      id: 4,
      title: "TCO Financial & ROI Projection",
      desc: "Projects cloud TPU token savings compared to legacy setups.",
      badge: "ROI Synced",
      badgeBg: "var(--google-amber-light)",
      badgeColor: "var(--google-amber)",
      nodeColor: "var(--google-amber)"
    },
    {
      id: 5,
      title: "Leadership Sign-Off & Lock",
      desc: "Approved blueprints are committed as read-only master dossiers.",
      badge: "Locked Master",
      badgeBg: "var(--google-green-light)",
      badgeColor: "var(--google-green)",
      nodeColor: "var(--google-green)"
    }
  ];

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '0.65rem', // Snug visual gap
        width: '100%', 
        maxWidth: '100%', 
        margin: '0', 
        height: 'calc(100vh - 110px)', 
        position: 'relative', 
        padding: '0 0.5rem',
        overflow: 'hidden'
      }}
    >
      
      {/* 🚀 Premium 2-Column Executive Grid Layout */}
      <div style={{ display: 'flex', gap: '1.15rem', flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        
        {/* Left Column: Executive Suitability Strategic Briefing & Audit Console */}
        <div 
          className="glass-card" 
          style={{ 
            flex: '0.95', 
            display: 'flex', 
            flexDirection: 'column', 
            padding: '0.85rem', // Snug, balanced padding!
            borderRadius: '16px', 
            position: 'relative', 
            overflow: 'hidden',
            zIndex: 1,
            height: '100%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            justifyContent: 'flex-start', 
            gap: '0.55rem' // Compact margin gaps balance the vertical budget!
          }}
        >
          {/* 1. TRACTION STATISTICS */}
          <div 
            style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '0.45rem',
              width: '100%',
              boxSizing: 'border-box',
              flexShrink: 0
            }}
          >
            {kpis.map(kpi => {
              const isHovered = hoveredKpi === kpi.key;
              return (
                <div
                  key={kpi.key}
                  onClick={kpi.action}
                  onMouseEnter={() => setHoveredKpi(kpi.key)}
                  onMouseLeave={() => setHoveredKpi(null)}
                  style={{
                    background: isHovered ? kpi.bg : 'var(--bg-surface)',
                    border: `1.5px solid ${isHovered ? kpi.color : 'var(--border-color)'}`,
                    borderRadius: '10px',
                    padding: '0.65rem 0.35rem', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-2px)' : 'none',
                    boxShadow: isHovered ? `0 4px 12px ${kpi.color}10` : 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    aspectRatio: '1.05 / 1', 
                    minWidth: 0,
                    boxSizing: 'border-box'
                  }}
                  title={`Click to open the active ${kpi.label} registry`}
                >
                  <div style={{ color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
                    {kpi.icon}
                  </div>

                  <strong style={{ fontSize: '1.35rem', fontWeight: 950, color: 'var(--text-primary)', display: 'block', lineHeight: 1.1, margin: '0.15rem 0' }}>
                    {kpi.val}
                  </strong>

                  <span style={{ fontSize: '0.54rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                    {kpi.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 2. Production Prioritization Engine */}
          <div 
            className="card" 
            style={{ 
              background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-surface) 100%)', 
              borderColor: 'var(--border-color)',
              padding: '0.75rem 0.85rem', // Compacted padding fits steps budget perfectly!
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem', // Perfect vertical gap prevents overlapping!
              boxShadow: 'var(--shadow-sm)',
              flex: 1.2, 
              minHeight: 0,
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', flexShrink: 0 }}>
              <BarChart3 size={13} style={{ color: 'var(--google-blue)' }} />
              <span>Production Prioritization Engine</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.52rem', background: 'var(--google-blue-light)', color: 'var(--google-blue)', padding: '0.1rem 0.4rem', borderRadius: '100px', fontWeight: 700 }}>5-Step Lifecycle</span>
            </h4>

            {/* Steps Roadmap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minHeight: 0, justifyContent: 'center', position: 'relative', paddingLeft: '0.2rem' }}>
              
              {/* Vertical Connector */}
              <div style={{ position: 'absolute', left: '13px', top: '6px', bottom: '6px', width: '2px', borderLeft: '2px dashed var(--google-grey-300)', zIndex: 0 }} />

              {steps.map(step => {
                const isHovered = hoveredStep === step.id;
                return (
                  <div 
                    key={step.id}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      alignItems: 'flex-start', 
                      position: 'relative', 
                      zIndex: 2,
                      background: isHovered ? step.badgeBg + '35' : 'transparent',
                      border: `1.2px solid ${isHovered ? step.badgeColor + '40' : 'transparent'}`,
                      borderRadius: '6px',
                      padding: '0.25rem 0.45rem', // Snug PM-optimized padding!
                      transition: 'all 0.2s ease',
                      transform: isHovered ? 'translateY(-1px) scale(1.01)' : 'none',
                      boxShadow: isHovered ? `0 4px 12px ${step.badgeColor}08` : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ 
                      background: isHovered ? step.nodeColor : '#ffffff', 
                      border: `2px solid ${isHovered ? step.nodeColor : 'var(--google-grey-300)'}`,
                      color: isHovered ? '#ffffff' : step.nodeColor, 
                      fontSize: '0.62rem', // Crisp, readable step font size!
                      fontWeight: 900, 
                      width: '20px', // Sized step circles!
                      height: '20px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      flexShrink: 0, 
                      marginTop: '0.05rem',
                      transition: 'all 0.2s'
                    }}>
                      {step.id}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isHovered ? step.nodeColor : 'var(--text-primary)' }}>{step.title}</span>
                        <span className="badge" style={{ fontSize: '0.5rem', padding: '0.08rem 0.35rem', fontWeight: 700, background: step.badgeBg, color: step.badgeColor }}>{step.badge}</span>
                      </div>
                      <p style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', margin: '0.02rem 0 0 0', lineHeight: 1.25 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              background: 'var(--bg-primary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '10px', 
              padding: '0.45rem 0.65rem', 
              flex: isTerminalExpanded ? 1.8 : 0.9, 
              minHeight: isTerminalMinimized ? '24px' : '55px', 
              maxHeight: isTerminalMinimized ? '24px' : (isTerminalExpanded ? '120px' : '80px'), // Snug console height prevents overflow!
              marginBottom: '0.15rem', 
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isTerminalMinimized ? 0 : '0.25rem', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span 
                  onClick={() => setIsTerminalMinimized(!isTerminalMinimized)} 
                  style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', cursor: 'pointer' }} 
                  title="Minimize Console"
                />
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
                <span 
                  onClick={() => { setIsTerminalMinimized(false); setIsTerminalExpanded(!isTerminalExpanded); }} 
                  style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', cursor: 'pointer' }} 
                  title="Expand Console View"
                />
                <span style={{ fontSize: '0.52rem', color: '#94a3b8', fontFamily: 'monospace', marginLeft: '0.4rem' }}>
                  {isTerminalMinimized ? '● Live Telemetry Active' : 'nitinagga-discovery-audit-trail.log'}
                </span>
              </div>
            </div>
            
            {!isTerminalMinimized && (
              <div ref={terminalScrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                {logs.map((log, idx) => (
                  <div key={idx} style={{ opacity: idx === logs.length - 1 ? 1 : 0.65 }}>
                    {renderColorCodedLog(log)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. ACTION: Launch CTA */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <button 
              onClick={onStartDiscovery} 
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              className="btn" 
              style={{ 
                padding: '0.55rem 1.25rem', 
                fontSize: '0.82rem', 
                fontWeight: 700,
                borderRadius: '8px', 
                background: 'linear-gradient(90deg, #1a73e8 0%, #3b82f6 100%)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 3px 10px rgba(26, 115, 232, 0.25)', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.45rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isCtaHovered ? 'translateY(-1.5px)' : 'none',
                width: '100%',
                maxWidth: '260px', 
                justifyContent: 'center'
              }}
            >
              <span>Start Discovery Workshop</span>
              <ArrowRight 
                size={12} 
                style={{ 
                  transition: 'transform 0.25s ease', 
                  transform: isCtaHovered ? 'translateX(3px)' : 'translateX(0)' 
                }} 
              />
            </button>
          </div>
        </div>

        {/* Right Column: Expanded Gemini Enterprise Stack */}
        <div style={{ flex: '1.38', display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, zIndex: 2, gap: '0.65rem', overflowY: 'auto', paddingRight: '0.25rem' }}>
          
          {/* Dynamic, 100% Height Gemini Enterprise Stack Card */}
          <div 
            className="card" 
            style={{ 
              flex: 'none', 
              padding: '0.6rem', 
              display: 'flex', 
              flexDirection: 'column', 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-color)', 
              borderRadius: '16px', 
              boxSizing: 'border-box',
              justifyContent: 'flex-start',
              gap: '0.65rem',
              marginBottom: '0.5rem' 
            }}
          >
            
            {/* Solid Indigo Blue Frame Container */}
            <div 
              style={{ 
                background: 'linear-gradient(180deg, #3367d6 0%, #1e40af 100%)', 
                padding: '0.75rem 0.75rem 1.15rem 0.75rem', 
                borderRadius: '12px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.85rem', 
                color: '#ffffff',
                flex: 1,
                minHeight: 0,
                boxSizing: 'border-box',
                justifyContent: 'flex-start'
              }}
            >
              {/* Frame Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.3rem', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontWeight: 900, fontSize: '0.8rem', color: '#ffffff' }}>Gemini Enterprise</span>
                  <span style={{ fontSize: '0.7rem', color: '#93c5fd', fontWeight: 500 }}>Agent Platform + Apps & Solutions</span>
                </div>
                <span style={{ fontSize: '0.58rem', color: '#93c5fd', fontWeight: 700 }} className="no-print">
                  🖱️ Hover segments to highlight capabilities
                </span>
              </div>

              {/* Nested Tier 1 Card: Apps & Solutions */}
              <div 
                style={{ 
                  background: 'var(--bg-surface)', 
                  borderRadius: '8px', 
                  padding: '0.65rem 0.85rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.45rem', 
                  color: 'var(--text-primary)', 
                  flexShrink: 0, 
                  boxSizing: 'border-box', 
                  width: '100%', 
                  overflow: 'hidden',
                  justifyContent: 'flex-start'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
                  <strong style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)' }}>App & Solutions</strong>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                    Built on Gemini Enterprise Agent Platform, front door for AI with centralized oversight and scaled governance
                  </span>
                </div>

                {/* Soft light blue background cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.45rem', width: '100%' }}>
                  {/* App 1 */}
                  <div 
                    onMouseEnter={() => setActiveCard('app')}
                    style={{ 
                      background: activeCard === 'app' ? 'var(--google-blue-light)' : 'rgba(255,255,255,0.03)', 
                      border: `1.5px solid ${activeCard === 'app' ? 'var(--google-blue)' : 'transparent'}`, 
                      borderRadius: '6px', 
                      padding: '0.65rem 0.75rem', 
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: activeCard === 'app' ? 'translateY(-3px)' : 'none',
                      boxShadow: activeCard === 'app' ? '0 8px 20px rgba(26,115,232,0.12)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                      <MessageSquare size={12} style={{ color: '#1a73e8', transform: activeCard === 'app' ? 'scale(1.1) rotate(-5deg)' : 'none', transition: 'all 0.2s' }} />
                      <strong style={{ fontSize: '0.7rem', color: '#1a73e8', fontWeight: 800 }}>Gemini Enterprise app</strong>
                    </div>
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>
                      Your <strong>employees</strong> can expand productivity with an embedded agentic taskforce.
                    </p>
                  </div>

                  {/* App 2 */}
                  <div 
                    onMouseEnter={() => setActiveCard('custom')}
                    style={{ 
                      background: activeCard === 'custom' ? 'var(--google-purple-light)' : 'rgba(255,255,255,0.03)', 
                      border: `1.5px solid ${activeCard === 'custom' ? 'var(--google-purple)' : 'transparent'}`, 
                      borderRadius: '6px', 
                      padding: '0.65rem 0.75rem', 
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: activeCard === 'custom' ? 'translateY(-3px)' : 'none',
                      boxShadow: activeCard === 'custom' ? '0 8px 20px rgba(168,85,247,0.12)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                      <Terminal size={12} style={{ color: '#1a73e8', transform: activeCard === 'custom' ? 'scale(1.1) rotate(5deg)' : 'none', transition: 'all 0.2s' }} />
                      <strong style={{ fontSize: '0.7rem', color: '#1a73e8', fontWeight: 800 }}>Custom apps built by partners</strong>
                    </div>
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>
                      Your <strong>developers</strong> can build production-ready AI agents and scale across the org.
                    </p>
                  </div>

                  {/* App 3 */}
                  <div 
                    onMouseEnter={() => setActiveCard('cx')}
                    style={{ 
                      background: activeCard === 'cx' ? 'var(--google-green-light)' : 'rgba(255,255,255,0.03)', 
                      border: `1.5px solid ${activeCard === 'cx' ? 'var(--google-green)' : 'transparent'}`, 
                      borderRadius: '6px', 
                      padding: '0.65rem 0.75rem', 
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: activeCard === 'cx' ? 'translateY(-3px)' : 'none',
                      boxShadow: activeCard === 'cx' ? '0 8px 20px rgba(52,168,83,0.12)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                      <LayoutGrid size={12} style={{ color: '#1a73e8', transform: activeCard === 'cx' ? 'scale(1.1) translateY(-1px)' : 'none', transition: 'all 0.2s' }} />
                      <strong style={{ fontSize: '0.7rem', color: '#1a73e8', fontWeight: 800 }}>Gemini Enterprise for CX</strong>
                    </div>
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>
                      Your <strong>customers</strong> can discover, purchase, and get help across every touchpoint.
                    </p>
                  </div>
                </div>

                {/* Tier 1 Description Drawer */}
                <div 
                  style={{ 
                    background: appCardDescriptions[activeCard].color + '08', 
                    border: `1px dashed ${appCardDescriptions[activeCard].color}30`, 
                    borderRadius: '6px', 
                    padding: '0.35rem 0.65rem', 
                    display: 'flex', 
                    gap: '0.35rem', 
                    alignItems: 'flex-start', 
                    marginTop: '0.45rem',
                    minHeight: '30px', 
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    width: '100%',
                    flexShrink: 0
                  }}
                >
                  <HelpCircle size={11} style={{ color: appCardDescriptions[activeCard].color, marginTop: '0.12rem', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, color: appCardDescriptions[activeCard].color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      App Integration Target: {appCardDescriptions[activeCard].badge}
                    </span>
                    <p style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.25 }}>
                      {appCardDescriptions[activeCard].desc}
                    </p>
                  </div>
                </div>

              </div>

              {/* Nested Tier 2 Card: Platform Foundation */}
              <div 
                style={{ 
                  background: 'var(--bg-surface)', 
                  borderRadius: '8px', 
                  padding: '0.55rem 0.75rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.45rem', 
                  color: 'var(--text-primary)', 
                  flex: 1.1, 
                  boxSizing: 'border-box', 
                  width: '100%', 
                  overflow: 'visible',
                  justifyContent: 'flex-start'
                }}
              >
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
                  <strong style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)' }}>Gemini Enterprise Agent Platform</strong>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                    The foundation with world-class models, tools, and infrastructure to build, scale, govern, and optimize agents
                  </span>
                </div>

                {/* Dynamic horizontal ribbon matching blueprint layout */}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.25rem', padding: '0.15rem 0', flexShrink: 0 }}>
                  
                  {/* Col 1: Models */}
                  <div 
                    onMouseEnter={() => setActiveIcon(0)}
                    style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '80px', cursor: 'help', transition: 'transform 0.2s', transform: activeIcon === 0 ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', marginBottom: '0.15rem' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" fill="url(#geminiGardenStar8)" />
                        <defs>
                          <linearGradient id="geminiGardenStar8" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#4285f4" />
                            <stop offset="0.5" stopColor="#a855f7" />
                            <stop offset="1" stopColor="#ef4444" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L13.8 5.5L19.5 3.7L16.3 9L21.8 9L17 13L20.7 18.7L14.8 17L14.8 23L12 18.5L9.2 23L9.2 17L3.3 18.7L7 13L2.2 9L7.7 9L4.5 3.7L10.2 5.5L12 0Z" fill="#ea580c" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '0.56rem', fontWeight: 700, color: activeIcon === 0 ? 'var(--google-blue)' : 'var(--text-secondary)', lineHeight: 1.15 }}>1P, 3P, Open Models</span>
                  </div>

                  {/* Col 2: Runtimes */}
                  <div 
                    onMouseEnter={() => setActiveIcon(1)}
                    style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '80px', cursor: 'help', transition: 'transform 0.2s', transform: activeIcon === 1 ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    <Settings size={13} style={{ color: activeIcon === 1 ? 'var(--google-blue)' : '#1a73e8', marginBottom: '0.15rem' }} />
                    <span style={{ fontSize: '0.56rem', fontWeight: 700, color: activeIcon === 1 ? 'var(--google-blue)' : 'var(--text-secondary)', lineHeight: 1.15 }}>ADK, Agent Runtime</span>
                  </div>

                  {/* Col 3: Registry */}
                  <div 
                    onMouseEnter={() => setActiveIcon(2)}
                    style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '80px', cursor: 'help', transition: 'transform 0.2s', transform: activeIcon === 2 ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    <Folder size={13} style={{ color: activeIcon === 2 ? 'var(--google-blue)' : '#1a73e8', marginBottom: '0.15rem' }} />
                    <span style={{ fontSize: '0.56rem', fontWeight: 700, color: activeIcon === 2 ? 'var(--google-blue)' : 'var(--text-secondary)', lineHeight: 1.15 }}>Agent & Tool Registry</span>
                  </div>

                  {/* Col 4: Gateway */}
                  <div 
                    onMouseEnter={() => setActiveIcon(3)}
                    style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '80px', cursor: 'help', transition: 'transform 0.2s', transform: activeIcon === 3 ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    <GitBranch size={13} style={{ color: activeIcon === 3 ? 'var(--google-blue)' : '#1a73e8', marginBottom: '0.15rem' }} />
                    <span style={{ fontSize: '0.56rem', fontWeight: 700, color: activeIcon === 3 ? 'var(--google-blue)' : 'var(--text-secondary)', lineHeight: 1.15 }}>Agent Gateway</span>
                  </div>

                  {/* Col 5: Security */}
                  <div 
                    onMouseEnter={() => setActiveIcon(4)}
                    style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '80px', cursor: 'help', transition: 'transform 0.2s', transform: activeIcon === 4 ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    <Shield size={13} style={{ color: activeIcon === 4 ? 'var(--google-blue)' : '#1a73e8', marginBottom: '0.15rem' }} />
                    <span style={{ fontSize: '0.56rem', fontWeight: 700, color: activeIcon === 4 ? 'var(--google-blue)' : 'var(--text-secondary)', lineHeight: 1.15 }}>Agent Identity, Agent Security</span>
                  </div>

                  {/* Col 6: Observability */}
                  <div 
                    onMouseEnter={() => setActiveIcon(5)}
                    style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '80px', cursor: 'help', transition: 'transform 0.2s', transform: activeIcon === 5 ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    <Gauge size={13} style={{ color: activeIcon === 5 ? 'var(--google-blue)' : '#1a73e8', marginBottom: '0.15rem' }} />
                    <span style={{ fontSize: '0.56rem', fontWeight: 700, color: activeIcon === 5 ? 'var(--google-blue)' : 'var(--text-secondary)', lineHeight: 1.15 }}>Agent Observability, Agent Evaluation</span>
                  </div>
                </div>

                {/* Dedicated Platform Icons Drawer */}
                <div 
                  style={{ 
                    background: iconDescriptions[activeIcon].color + '08', 
                    border: `1px dashed ${iconDescriptions[activeIcon].color}30`, 
                    borderRadius: '6px', 
                    padding: '0.35rem 0.65rem', 
                    display: 'flex', 
                    gap: '0.35rem', 
                    alignItems: 'flex-start', 
                    minHeight: '32px', 
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    width: '100%',
                    flexShrink: 0,
                    marginTop: '0.15rem'
                  }}
                >
                  <Info size={11} style={{ color: iconDescriptions[activeIcon].color, marginTop: '0.12rem', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, color: iconDescriptions[activeIcon].color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Core Infrastructure: {iconDescriptions[activeIcon].badge}
                    </span>
                    <p style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.25 }}>
                      {iconDescriptions[activeIcon].desc}
                    </p>
                  </div>
                </div>

                {/* Double-Headed Symmetrical Arrow Line */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', margin: '0.1rem 0', width: '100%', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <div style={{ border: 'solid #475569', borderWidth: '0 0 2px 2px', padding: '2px', transform: 'rotate(45deg)', marginRight: '-1px' }} />
                    <div style={{ height: '2px', background: '#cbd5e1', flex: 1 }} />
                  </div>
                  <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#475569', textTransform: 'lowercase', whiteSpace: 'nowrap', letterSpacing: '0.5px' }}>
                    Agentic capabilities across
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <div style={{ height: '2px', background: '#cbd5e1', flex: 1 }} />
                    <div style={{ border: 'solid #475569', borderWidth: '2px 2px 0 0', padding: '2px', transform: 'rotate(45deg)', marginLeft: '-1px' }} />
                  </div>
                </div>

                {/* 4 Capabilities Horizontal cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', width: '100%', boxSizing: 'border-box', flexShrink: 0 }}>
                  {[
                    { key: 'build', label: 'Build', desc: 'Create sophisticated, long-running agents', color: 'var(--google-blue)', bg: 'rgba(255,255,255,0.03)' },
                    { key: 'scale', label: 'Scale', desc: 'Connect systems, take real-world action', color: 'var(--google-purple)', bg: 'rgba(255,255,255,0.03)' },
                    { key: 'govern', label: 'Govern', desc: 'Ensure privacy, compliance, protection', color: 'var(--google-green)', bg: 'rgba(255,255,255,0.03)' },
                    { key: 'optimize', label: 'Optimize', desc: 'Observe & improve agent performance', color: '#0284c7', bg: 'rgba(255,255,255,0.03)' }
                  ].map(cap => {
                    const isActive = activeCapability === cap.key;
                    
                    return (
                      <div
                        key={cap.key}
                        onMouseEnter={() => setActiveCapability(cap.key)}
                        style={{
                          background: isActive ? 'var(--google-blue-light)' : 'rgba(255,255,255,0.03)', 
                          border: `1.5px solid ${isActive ? 'var(--google-blue)' : 'transparent'}`,
                          borderRadius: '6px',
                          padding: '0.45rem 0.35rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          transform: isActive ? 'translateY(-1px)' : 'none',
                          boxSizing: 'border-box',
                          minWidth: 0
                        }}
                      >
                        <strong style={{ fontSize: '0.72rem', color: isActive ? 'var(--google-blue)' : 'var(--text-primary)', display: 'block' }}>{cap.label}</strong>
                        <span style={{ fontSize: '0.52rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.15rem', whiteSpace: 'normal', lineHeight: 1.25, wordBreak: 'break-word' }}>{cap.desc}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Dedicated Platform Capabilities Drawer */}
                <div style={{ background: capabilityDescriptions[activeCapability].color + '08', border: `1px dashed ${capabilityDescriptions[activeCapability].color}25`, borderRadius: '6px', padding: '0.25rem 0.55rem', display: 'flex', gap: '0.35rem', alignItems: 'flex-start', minHeight: '32px', flexShrink: 0, transition: 'all 0.2s', boxSizing: 'border-box', width: '100%', marginTop: '0.15rem' }}>
                  <HelpCircle size={10} style={{ color: capabilityDescriptions[activeCapability].color, marginTop: '0.1rem', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, color: capabilityDescriptions[activeCapability].color, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                      Platform Integration: {capabilityDescriptions[activeCapability].badge}
                    </span>
                    <p style={{ fontSize: '0.56rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.25, wordBreak: 'break-word' }}>
                      {capabilityDescriptions[activeCapability].desc}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* 3. BOTTOM CARD */}
          <div className="card" style={{ padding: '0.65rem 0.85rem', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '14px', flexShrink: 0, boxShadow: 'var(--shadow-sm)', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexShrink: 0 }}>
              <strong style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 800 }}>Powered by the integrated stack for agentic AI</strong>
              <span className="badge badge-blue" style={{ fontSize: '0.52rem', padding: '0.1rem 0.35rem', fontWeight: 700 }}>ACTIVE DIRECTORY BINDINGS</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.45rem', width: '100%' }}>
                {/* Box 1 */}
                <div 
                  onMouseEnter={() => setActiveBottomCard('hyper')}
                  style={{ 
                    background: activeBottomCard === 'hyper' ? 'rgba(26,115,232,0.04)' : 'rgba(255,255,255,0.03)', 
                    padding: '0.4rem 0.55rem', 
                    borderRadius: '5px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    border: `1.2px solid ${activeBottomCard === 'hyper' ? 'var(--google-blue)' : 'transparent'}`,
                    transition: 'all 0.2s ease',
                    transform: activeBottomCard === 'hyper' ? 'translateY(-3px)' : 'none',
                    boxShadow: activeBottomCard === 'hyper' ? '0 6px 16px rgba(26,115,232,0.12)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <strong style={{ fontSize: '0.68rem', color: 'var(--text-primary)' }}>AI Hypercomputer</strong>
                    {activeBottomCard === 'hyper' && <span style={{ fontSize: '0.48rem', color: 'var(--google-blue)', fontWeight: 700 }}>TPU & GPU H100</span>}
                  </div>
                  <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', marginTop: '0.05rem', lineHeight: 1.2 }}>Scale inference and training</span>
                </div>

                {/* Box 2 */}
                <div 
                  onMouseEnter={() => setActiveBottomCard('data')}
                  style={{ 
                    background: activeBottomCard === 'data' ? 'rgba(244,180,0,0.04)' : 'rgba(255,255,255,0.03)', 
                    padding: '0.4rem 0.55rem', 
                    borderRadius: '5px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    border: `1.2px solid ${activeBottomCard === 'data' ? 'var(--google-amber)' : 'transparent'}`,
                    transition: 'all 0.2s ease',
                    transform: activeBottomCard === 'data' ? 'translateY(-3px)' : 'none',
                    boxShadow: activeBottomCard === 'data' ? '0 6px 16px rgba(244,180,0,0.12)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <strong style={{ fontSize: '0.68rem', color: 'var(--text-primary)' }}>Agentic Data Cloud</strong>
                    {activeBottomCard === 'data' && <span style={{ fontSize: '0.48rem', color: 'var(--google-amber)', fontWeight: 700 }}>AlloyDB / Spanner</span>}
                  </div>
                  <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', marginTop: '0.05rem', lineHeight: 1.2 }}>Fuel a system of action</span>
                </div>

                {/* Box 3 */}
                <div 
                  onMouseEnter={() => setActiveBottomCard('defense')}
                  style={{ 
                    background: activeBottomCard === 'defense' ? 'rgba(52,168,83,0.04)' : 'rgba(255,255,255,0.03)', 
                    padding: '0.4rem 0.55rem', 
                    borderRadius: '5px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    border: `1.2px solid ${activeBottomCard === 'defense' ? 'var(--google-green)' : 'transparent'}`,
                    transition: 'all 0.2s ease',
                    transform: activeBottomCard === 'defense' ? 'translateY(-3px)' : 'none',
                    boxShadow: activeBottomCard === 'defense' ? '0 6px 16px rgba(52,168,83,0.12)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <strong style={{ fontSize: '0.68rem', color: 'var(--text-primary)' }}>Agent Defense</strong>
                    {activeBottomCard === 'defense' && <span style={{ fontSize: '0.48rem', color: 'var(--google-green)', fontWeight: 700 }}>GCP IAM / VPC-SC</span>}
                  </div>
                  <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', marginTop: '0.05rem', lineHeight: 1.2 }}>Secure the AI lifecycle</span>
                </div>
              </div>

              {/* Localized Bottom Description Drawer */}
              <div 
                style={{ 
                  opacity: 1, 
                  visibility: 'visible',
                  height: '48px', 
                  background: bottomCardDescriptions[activeBottomCard].color + '08', 
                  border: `1px dashed ${bottomCardDescriptions[activeBottomCard].color}35`, 
                  borderRadius: '6px', 
                  padding: '0.35rem 0.65rem', 
                  display: 'flex', 
                  gap: '0.35rem', 
                  alignItems: 'flex-start', 
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxSizing: 'border-box',
                  width: '100%'
                }}
              >
                <Info size={11} style={{ color: bottomCardDescriptions[activeBottomCard].color, marginTop: '0.12rem', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '0.55rem', fontWeight: 700, color: bottomCardDescriptions[activeBottomCard].color, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                    Infrastructure Blueprint: {bottomCardDescriptions[activeBottomCard].badge}
                  </span>
                  <p style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.25, wordBreak: 'break-word' }}>
                    {bottomCardDescriptions[activeBottomCard].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Status Bar */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '0.85rem', 
          marginTop: 'auto', 
          flexShrink: 0,
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Trusted Governance Assessor
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0.55, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            <span>Merck</span>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <span>Pfizer</span>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <span>Roche</span>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <span>Novartis</span>
          </div>
        </div>

        {/* Availability index status metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Server size={11} style={{ color: 'var(--google-green)' }} />
            <span>Active Assessor: <b style={{ color: 'var(--text-primary)' }}>Gemini 1.5 Pro</b></span>
          </div>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Activity size={11} style={{ color: 'var(--google-blue)' }} />
            <span>Response Latency: <b style={{ color: 'var(--text-primary)' }}>1.8s (avg)</b></span>
          </div>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span>us-central1 Region • HIPAA / SOC2 Secure tenancy • 99.99% Uptime SLA</span>
        </div>
      </div>
    </div>
  );
}
