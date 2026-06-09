import { useState, useEffect, useRef } from 'react';
import { Sparkles, Shield, ArrowRight, CheckCircle, Zap, Database, Server, Layers, Activity } from 'lucide-react';

export default function LandingPage({ onStartDiscovery }) {
  const [isCtaHovered, setIsCtaHovered] = useState(false);


  // Live rolling terminal console logs state (Developer terminal container popping on light theme)
  const [logs, setLogs] = useState([
    '[10:02:31] Ingesting Snowflake analytical datasets...',
    '[10:02:33] Ingress PSC tunnel active (europe-west3)...',
    '[10:02:35] Calibrating base feasibility score models...',
    '[10:02:38] Executing Google Cloud DLP PHI redaction tests...'
  ]);

  const terminalScrollRef = useRef(null);

  useEffect(() => {
    const candidates = [
      '[10:02:41] Aggregating executive briefings & savings forecasts...',
      '[10:02:44] Vertex AI reasoning agent initialized successfully...',
      '[10:02:48] Standardizing VPC Service Controls VPC-SC isolation...',
      '[10:02:52] Scanning Snowflake warehouse table embeddings...',
      '[10:02:55] Inbound Google SSO OAuth token asserts validation...',
      '[10:02:59] Deploying AlloyDB Omni isolated sandbox perimeters...'
    ];
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < candidates.length) {
        setLogs(prev => [...prev, candidates[idx]]);
        idx++;
      } else {
        // Reset loop
        setLogs([
          '[10:02:31] Ingesting Snowflake analytical datasets...',
          '[10:02:33] Ingress PSC tunnel active (europe-west3)...',
          '[10:02:35] Calibrating base feasibility score models...',
          '[10:02:38] Executing Google Cloud DLP PHI redaction tests...'
        ]);
        idx = 0;
      }
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1.25rem', 
        width: '100%', 
        maxWidth: '1280px', 
        margin: '0 auto', 
        height: 'calc(100vh - 110px)', 
        position: 'relative', 
        padding: '0.25rem 0',
        overflow: 'hidden'
      }}
    >
      {/* Subtle backdrop grids */}
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        
        {/* Left Pane: High-Contrast Premium Hero Card & Console */}
        <div 
          className="glass-card" 
          style={{ 
            flex: '1', 
            display: 'flex', 
            flexDirection: 'column', 
            padding: '1.75rem 1.5rem', 
            borderRadius: '20px', 
            position: 'relative', 
            overflow: 'hidden',
            zIndex: 1,
            height: '100%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Premium Client-Facing Tech Badge */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              background: 'var(--google-blue-light)', 
              color: 'var(--google-blue)', 
              padding: '0.35rem 0.85rem', 
              borderRadius: '100px', 
              fontSize: '0.7rem', 
              fontWeight: 700, 
              marginBottom: '1rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              border: '1px solid rgba(26, 115, 232, 0.25)',
              width: 'fit-content'
            }}
          >
            <Sparkles size={12} />
            <span>SALES ENABLEMENT SUITE</span>
          </div>
          
          {/* Glowing Cobalt-tint Title */}
          <h1 
            style={{ 
              fontSize: '2rem', 
              fontWeight: 900, 
              lineHeight: 1.1, 
              marginBottom: '0.85rem', 
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Gemini Use Case Scoring & Discovery
          </h1>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Accelerate enterprise Generative AI migrations to Google Cloud with multi-dimensional feasibility scoring, automated TCO projections, and real-time CISO objection handling.
          </p>

          {/* Product Value Pillars List with Floating Technical Tooltips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', margin: '0 0 1.25rem 0', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', position: 'relative' }}>
            
            {/* Value 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', position: 'relative' }}>
              <Zap size={14} style={{ color: 'var(--google-blue)', marginTop: '0.15rem', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>2M Tokens Context Length</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', maxWidth: '190px' }}>Analyze entire regulatory dossiers or databases in one context turn.</div>
              </div>

              {/* Floating Load Time Tooltip */}
              <div style={{ position: 'absolute', left: '205px', top: '-4px', background: '#0f172a', border: '1px solid var(--google-blue)', borderRadius: '6px', padding: '0.3rem 0.5rem', fontSize: '0.58rem', color: '#ffffff', width: '115px', pointerEvents: 'none', zIndex: 10, boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' }}>
                <div style={{ fontWeight: 700, color: '#38bdf8' }}>Context Load: &lt;3.5s</div>
                <div style={{ color: '#94a3b8', fontSize: '0.52rem', marginTop: '0.05rem' }}>Throughput: 12,000 T/s</div>
              </div>
            </div>

            {/* Value 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <Shield size={14} style={{ color: 'var(--google-green)', marginTop: '0.15rem', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Enterprise-Grade ADC Isolation</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', maxWidth: '190px' }}>Zero-key authentication linked securely to Google Cloud ADC profiles.</div>
              </div>
            </div>

            {/* Value 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', position: 'relative' }}>
              <Database size={14} style={{ color: 'var(--google-amber)', marginTop: '0.15rem', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Multi-Cloud RAG Grounding</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', maxWidth: '190px' }}>Map analytical endpoints across AWS S3, GCP GCS, and Snowflake.</div>
              </div>

              {/* Floating RAG Grounding Tooltip */}
              <div style={{ position: 'absolute', left: '205px', bottom: '-6px', background: '#0f172a', border: '1px solid var(--google-amber)', borderRadius: '6px', padding: '0.3rem 0.5rem', fontSize: '0.58rem', color: '#ffffff', width: '115px', pointerEvents: 'none', zIndex: 10, boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' }}>
                <div style={{ fontWeight: 700, color: '#f59e0b' }}>Hybrid Ranking</div>
                <div style={{ color: '#94a3b8', fontSize: '0.52rem', marginTop: '0.05rem' }}>Dense + Sparse BM25</div>
              </div>
            </div>
          </div>

          {/* Cyber Staging Live Terminal Console (Developer shell pops out beautifully on light theme) */}
          <div style={{ display: 'flex', flexDirection: 'column', background: '#020617', border: '1px solid rgba(15,23,42,0.12)', borderRadius: '10px', padding: '0.6rem 0.8rem', flex: 1, minHeight: 0, marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem', flexShrink: 0 }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              <span style={{ fontSize: '0.58rem', color: '#94a3b8', fontFamily: 'monospace', marginLeft: '0.5rem' }}>nitinagga-discovery-agent.sh</span>
            </div>
            
            {/* Monospace scrollable console block */}
            <div ref={terminalScrollRef} style={{ flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.58rem', lineHeight: 1.4, color: '#38bdf8', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {logs.map((log, idx) => (
                <div key={idx} style={{ opacity: idx === logs.length - 1 ? 1 : 0.65 }}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Launch Discovery Run CTA Button */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <button 
              onClick={onStartDiscovery} 
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              className="btn" 
              style={{ 
                padding: '0.8rem 2.2rem', 
                fontSize: '0.95rem', 
                fontWeight: 700,
                borderRadius: '10px', 
                background: 'linear-gradient(90deg, #1a73e8 0%, #3b82f6 100%)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 14px rgba(26, 115, 232, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.6rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isCtaHovered ? 'scale(1.02)' : 'scale(1)',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <span>Launch Discovery Run</span>
              <ArrowRight 
                size={16} 
                style={{ 
                  transition: 'transform 0.25s ease', 
                  transform: isCtaHovered ? 'translateX(4px)' : 'translateX(0)' 
                }} 
              />
            </button>
          </div>
        </div>

        {/* Right Pane: Dual Systems Architecture Diagrams */}
        <div style={{ flex: '1.25', display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, gap: '1rem', zIndex: 2 }}>
          
          {/* 1. TOP RIGHT CARD: Business Workflow Diagram */}
          <div className="card" style={{ flex: '0.82', padding: '0.85rem 0 0 0', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '16px', minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', padding: '0 1.15rem 0.35rem 1.15rem', marginBottom: '0.5rem', flexShrink: 0 }}>
              <CheckCircle size={14} style={{ color: 'var(--google-blue)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Business Workflow Pipeline</span>
            </div>

            {/* Horizontal Workflow Image Pipeline */}
            <div style={{ flex: 1, display: 'flex', width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src="/workflow_pipeline.png" 
                alt="Business Workflow Pipeline - Google Cloud Migration Flow" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', aspectRatio: '1024/472', borderRadius: '0 0 16px 16px' }}
              />
            </div>
          </div>

          {/* 2. BOTTOM RIGHT CARD: Highly Detailed Systems Topology */}
          <div className="card" style={{ flex: '1.48', padding: '0.85rem 0 0 0', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '16px', minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', padding: '0 1.15rem 0.35rem 1.15rem', marginBottom: '0.5rem', flexShrink: 0 }}>
              <Layers size={14} style={{ color: 'var(--google-green)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Technical Systems Topology</span>
            </div>

            {/* Advanced premium Technical Systems Topology Image map */}
            <div style={{ flex: 1, display: 'flex', width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src="/systems_topology.png" 
                alt="Technical Systems Topology - Gemini Agentic Architecture" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', aspectRatio: '1024/550', borderRadius: '0 0 16px 16px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar (Corporate preset footer mapping exactly) */}
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
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Trusted Discovery Suite
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

        {/* System Monitoring & Availability Indices */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Server size={11} style={{ color: 'var(--google-green)' }} />
            <span>Active Engine: <b style={{ color: 'var(--text-primary)' }}>nitinagga-ga</b></span>
          </div>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Activity size={11} style={{ color: 'var(--google-blue)' }} />
            <span>Response Latency: <b style={{ color: 'var(--text-primary)' }}>1.25s (avg)</b></span>
          </div>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span>us-central1, 3 Availability Zones, 99.99% Uptime SLA</span>
        </div>
      </div>

      {/* Tech Floating Command Console FAB Button (Slide/terminal launcher bottom right) */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 85 }}>
        <button
          onClick={onStartDiscovery}
          className="pulse-fab"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1a73e8 0%, #3b82f6 100%)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 4px 16px rgba(26, 115, 232, 0.35)'
          }}
          title="Launch Discovery Session CLI"
        >
          <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 800 }}>&gt;_</span>
        </button>
      </div>

    </div>
  );
}
