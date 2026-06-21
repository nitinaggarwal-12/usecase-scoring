import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add state variables for the Analytical Frameworks sub-navigation
target_state_vars = """  // Composable What-If Engine States
  const [whatIfOrch, setWhatIfOrch] = useState('google'); // 'google' | 'aws' | 'veeva'
  const [whatIfIdentity, setWhatIfIdentity] = useState('entra'); // 'entra' | 'ping'
  const [whatIfFederation, setWhatIfFederation] = useState('mcp'); // 'mcp' | 'webhooks' | 'etl'
  const [whatIfStorage, setWhatIfStorage] = useState('adobe'); // 'adobe' | 'veeva_promomats' | 's3'
  const [scenarioNameInput, setScenarioNameInput] = useState('');
  const [savedScenarios, setSavedScenarios] = useState([
    { name: 'Scenario A: Composable Google + Adobe Mesh', orch: 'google', identity: 'entra', federation: 'mcp', storage: 'adobe', tco: '4.8M', mvp: '6mo', gxp: '93/100', agility: 92, compliance: 90, costEfficiency: 86 },
    { name: 'Scenario B: Veeva Vault Native Monolith', orch: 'veeva', identity: 'entra', federation: 'etl', storage: 'veeva_promomats', tco: '5.2M', mvp: '8mo', gxp: '98/100', agility: 65, compliance: 98, costEfficiency: 82 }
  ]);"""

replacement_state_vars = """  // Composable What-If Engine States
  const [whatIfOrch, setWhatIfOrch] = useState('google'); // 'google' | 'aws' | 'veeva'
  const [whatIfIdentity, setWhatIfIdentity] = useState('entra'); // 'entra' | 'ping'
  const [whatIfFederation, setWhatIfFederation] = useState('mcp'); // 'mcp' | 'webhooks' | 'etl'
  const [whatIfStorage, setWhatIfStorage] = useState('adobe'); // 'adobe' | 'veeva_promomats' | 's3'
  const [scenarioNameInput, setScenarioNameInput] = useState('');
  const [savedScenarios, setSavedScenarios] = useState([
    { name: 'Scenario A: Composable Google + Adobe Mesh', orch: 'google', identity: 'entra', federation: 'mcp', storage: 'adobe', tco: '4.8M', mvp: '6mo', gxp: '93/100', agility: 92, compliance: 90, costEfficiency: 86 },
    { name: 'Scenario B: Veeva Vault Native Monolith', orch: 'veeva', identity: 'entra', federation: 'etl', storage: 'veeva_promomats', tco: '5.2M', mvp: '8mo', gxp: '98/100', agility: 65, compliance: 98, costEfficiency: 82 }
  ]);

  // Analytical Frameworks Active Tab State
  const [activeFrameworkTab, setActiveFrameworkTab] = useState('hype'); // 'hype' | 'capabilities' | 'horizons' | 'wave' | 'wardley'
  const [hoveredFrameworkItem, setHoveredFrameworkItem] = useState(null);"""

code = code.replace(target_state_vars, replacement_state_vars)

# 2. Add the Sidebar navigation item
target_sidebar = """              <div 
                onClick={() => setReportPage('whatif')} 
                className={`v12-sidebar-nav-item ${reportPage === 'whatif' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'whatif' ? colors.accentTeal : '#475569' }}
              >
                <Sliders size={15} style={{ color: colors.accentTeal }} />
                <span>8. Composable What-If Sandbox</span>
              </div>"""

replacement_sidebar = """              <div 
                onClick={() => setReportPage('whatif')} 
                className={`v12-sidebar-nav-item ${reportPage === 'whatif' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'whatif' ? colors.accentTeal : '#475569' }}
              >
                <Sliders size={15} style={{ color: colors.accentTeal }} />
                <span>8. Composable What-If Sandbox</span>
              </div>
              <div 
                onClick={() => setReportPage('analytics')} 
                className={`v12-sidebar-nav-item ${reportPage === 'analytics' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'analytics' ? colors.accentTeal : '#475569' }}
              >
                <TrendingUp size={15} style={{ color: colors.accentTeal }} />
                <span>9. McKinsey-Gartner Analytics</span>
              </div>"""

code = code.replace(target_sidebar, replacement_sidebar)

# 3. Add the title text sync in the header
target_title = """                  {reportPage === 'gxp_validation' && "GAMP 5 Day-2 Telemetry: Continuous AI Control & Drift Audit."}
                  {reportPage === 'whatif' && "Composable What-If Sandbox: Dynamic Vendor Scenarios."}"""

replacement_title = """                  {reportPage === 'gxp_validation' && "GAMP 5 Day-2 Telemetry: Continuous AI Control & Drift Audit."}
                  {reportPage === 'whatif' && "Composable What-If Sandbox: Dynamic Vendor Scenarios."}
                  {reportPage === 'analytics' && "McKinsey-Gartner Analytical Strategy Frameworks."}"""

code = code.replace(target_title, replacement_title)

# 4. Insert Page 9: McKinsey-Gartner Analytics Tab
target_whatif_page = """            {/* =========================================================================
            // PAGE 8: COMPOSABLE WHAT-IF SANDBOX (AI ENTERPRISE ARCHITECTURE SIMULATOR)
            // ========================================================================= */}
            {reportPage === 'whatif' && ("""

analytics_page_code = """            {/* =========================================================================
            // PAGE 9: MCKINSEY-GARTNER ANALYTICAL STRATEGY FRAMEWORKS
            // ========================================================================= */}
            {reportPage === 'analytics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Symmetrical Header Sub-Navigation Bar */}
                <div className="v12-card-glass" style={{ display: 'flex', padding: '0.35rem', gap: '0.25rem', flexShrink: 0 }}>
                  {[
                    { id: 'hype', label: '1. Gartner Hype Cycle' },
                    { id: 'capabilities', label: '2. Critical Capabilities (Harvey Balls)' },
                    { id: 'horizons', label: '3. McKinsey Three Horizons' },
                    { id: 'wave', label: '4. Forrester Wave Model' },
                    { id: 'wardley', label: '5. Wardley Strategic Map' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveFrameworkTab(tab.id);
                        setHoveredFrameworkItem(null);
                      }}
                      style={{
                        flex: 1,
                        background: activeFrameworkTab === tab.id ? 'rgba(13, 148, 136, 0.08)' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0',
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        color: activeFrameworkTab === tab.id ? colors.accentTeal : '#475569',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Main Interactive Sandbox Content */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* Left Column: Framework Visual Canvas */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '320px' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>
                        {activeFrameworkTab === 'hype' && "GARTNER EMERGENCE HYPE CYCLE"}
                        {activeFrameworkTab === 'capabilities' && "CRITICAL USE-CASE CAPABILITIES MATRIX"}
                        {activeFrameworkTab === 'horizons' && "MCKINSEY THREE HORIZONS OF Enterprise Growth"}
                        {activeFrameworkTab === 'wave' && "FORRESTER WAVE: STRATEGY VS. CURRENT OFFERING"}
                        {activeFrameworkTab === 'wardley' && "WARDLEY EVOLUTION & VALUE CHAIN MAP"}
                      </span>
                      <span style={{ fontSize: '0.58rem', color: '#475569' }}>
                        {activeFrameworkTab === 'capabilities' ? "Harvey Ball grading" : "Hover components for strategic details"}
                      </span>
                    </div>

                    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                      
                      {/* 1. Gartner Hype Cycle */}
                      {activeFrameworkTab === 'hype' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Gartner Hype Curve Path */}
                          <path 
                            d="M 10,200 Q 60,180 80,40 T 130,160 Q 180,120 230,80 T 310,65" 
                            fill="none" 
                            stroke="#0d9488" 
                            strokeWidth="2.5" 
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }}
                          />
                          
                          {/* Phase Dividers */}
                          <line x1="80" y1="10" x2="80" y2="210" stroke="rgba(15,23,42,0.04)" strokeDasharray="2" />
                          <line x1="130" y1="10" x2="130" y2="210" stroke="rgba(15,23,42,0.04)" strokeDasharray="2" />
                          <line x1="200" y1="10" x2="200" y2="210" stroke="rgba(15,23,42,0.04)" strokeDasharray="2" />

                          {/* Phase Labels */}
                          <text x="25" y="215" fill="#94a3b8" fontSize="5" fontWeight="bold">Innovation Trigger</text>
                          <text x="85" y="15" fill="#94a3b8" fontSize="5" fontWeight="bold">Peak of Inflated Expectations</text>
                          <text x="135" y="215" fill="#94a3b8" fontSize="5" fontWeight="bold">Trough of Disillusionment</text>
                          <text x="205" y="15" fill="#94a3b8" fontSize="5" fontWeight="bold">Slope of Enlightenment</text>

                          {/* Interactive Node 1: Swarms */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Multi-Agent Swarms', phase: 'Innovation Trigger', readiness: '2-3 Years', desc: 'Autonomous swarms coordinate medical, legal, and regulatory checks in parallel. High potential for timeline acceleration, but requires strict validation parameters to clear GxP perimeters.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="65" cy="110" r="5" fill="#e11d48" stroke="#fff" strokeWidth="1" />
                            <text x="73" y="112" fill="#0f172a" fontSize="5.5" fontWeight="bold">Agent Swarms</text>
                          </g>

                          {/* Interactive Node 2: Chatbots */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Standalone LLM Chatbots', phase: 'Peak of Inflated Expectations', readiness: '5+ Years (for MLR)', desc: 'General-purpose LLM interfaces lack domain-specific clinical grounding. Highly prone to compliance hallucinations, rendering them unsuitable for direct, un-audited MLR workflows.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="95" cy="65" r="5" fill="#d97706" stroke="#fff" strokeWidth="1" />
                            <text x="103" y="62" fill="#0f172a" fontSize="5.5" fontWeight="bold">Standalone Chatbots</text>
                          </g>

                          {/* Interactive Node 3: RAG */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Retrieval-Augmented Generation (RAG)', phase: 'Slope of Enlightenment', readiness: '1 Year (Active Dev)', desc: 'Grounds model outputs directly in approved Veeva clinical claim vaults. Minimizes hallucinations and serves as the core foundation for automated compliance review.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="215" cy="95" r="5" fill="#0d9488" stroke="#fff" strokeWidth="1" />
                            <text x="223" y="98" fill="#0f172a" fontSize="5.5" fontWeight="bold">Clinical RAG</text>
                          </g>

                          {/* Interactive Node 4: API Gateways */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Deterministic API Gateways (Kong)', phase: 'Plateau of Productivity', readiness: 'Immediate (Production Active)', desc: 'Enforces mTLS, token rate-limiting, and deep semantic PII/PHI scrubbing. Extremely stable, GxP-validated, and vital for secure external cloud transitions.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="290" cy="68" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1" />
                            <text x="245" y="62" fill="#0f172a" fontSize="5.5" fontWeight="bold">Kong API Gateway</text>
                          </g>
                        </svg>
                      )}

                      {/* 2. Critical Capabilities Matrix */}
                      {activeFrameworkTab === 'capabilities' && (
                        <div style={{ width: '100%', height: '100%', padding: '1rem', display: 'flex', alignItems: 'center' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem', textAlign: 'left' }}>
                            <thead>
                              <tr style={{ borderBottom: '2px solid rgba(15,23,42,0.1)', color: '#475569', fontWeight: 800 }}>
                                <th style={{ padding: '0.45rem' }}>CRITICAL USE CASE</th>
                                <th style={{ padding: '0.45rem', textAlign: 'center' }}>VEEVA NATIVE</th>
                                <th style={{ padding: '0.45rem', textAlign: 'center' }}>AWS BEDROCK</th>
                                <th style={{ padding: '0.45rem', textAlign: 'center' }}>GOOGLE VERTEX</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { case: 'FDA 21 CFR Part 11 Audit Trails', veeva: '🌕 (Complete)', aws: '🌔 (Strong)', gcp: '🌓 (Requires Wrapper)' },
                                { case: 'Adobe GenStudio Metadata Injection', veeva: '🌑 (No Integration)', aws: '🌓 (Custom Glue)', gcp: '🌕 (Native MCP/API)' },
                                { case: 'EU AI Act Geofencing & Safeguards', veeva: '🌔 (Frankfurt Option)', aws: '🌕 (Strong)', gcp: '🌕 (Vertex Model Armor)' },
                                { case: 'Real-Time Vector Claims Grounding', veeva: '🌓 (Basic Search)', aws: '🌔 (Kendra Link)', gcp: '🌕 (Zero-ETL BigQuery)' }
                              ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                                  <td style={{ padding: '0.55rem', fontWeight: 700, color: '#0f172a' }}>{row.case}</td>
                                  <td style={{ padding: '0.55rem', textAlign: 'center', color: '#0d9488', fontWeight: 800 }}>{row.veeva}</td>
                                  <td style={{ padding: '0.55rem', textAlign: 'center', color: '#0d9488', fontWeight: 800 }}>{row.aws}</td>
                                  <td style={{ padding: '0.55rem', textAlign: 'center', color: '#0d9488', fontWeight: 800 }}>{row.gcp}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* 3. McKinsey Three Horizons of Growth */}
                      {activeFrameworkTab === 'horizons' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Horizon 3 Stacked Area Fill */}
                          <path d="M 10,210 Q 90,200 150,160 T 310,40 L 310,210 Z" fill="rgba(139, 92, 246, 0.05)" />
                          {/* Horizon 2 Stacked Area Fill */}
                          <path d="M 10,210 Q 90,180 160,110 T 310,95 L 310,210 Z" fill="rgba(245, 158, 11, 0.05)" />
                          {/* Horizon 1 Stacked Area Fill */}
                          <path d="M 10,210 Q 80,110 160,70 T 310,140 L 310,210 Z" fill="rgba(13, 148, 136, 0.05)" />

                          {/* Horizon Dividers */}
                          <path d="M 10,210 Q 80,110 160,70 T 310,140" fill="none" stroke="#0d9488" strokeWidth="2" />
                          <path d="M 10,210 Q 90,180 160,110 T 310,95" fill="none" stroke="#d97706" strokeWidth="2" />
                          <path d="M 10,210 Q 90,200 150,160 T 310,40" fill="none" stroke="#7c3aed" strokeWidth="2" />

                          {/* Symmetrical Clickable Dots */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Horizon 1: Defend & Extend', phase: 'MVP Go-Live (Jan 2027)', readiness: 'Focus: MLR Text Automation', desc: 'Deploy out-of-the-box Veeva Native AI or a basic Google Vertex API Gateway to automate static text claims verification, slashing initial compliance latency by 40%.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="80" cy="115" r="5" fill="#0d9488" stroke="#fff" strokeWidth="1" />
                            <text x="65" y="100" fill="#0d9488" fontSize="5" fontWeight="bold">Horizon 1: MVP</text>
                          </g>

                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Horizon 2: Emerging Opportunities', phase: 'Strategic Expansion (2028)', readiness: 'Focus: Agentic Orchestration', desc: 'Transition from single prompts to autonomous agent swarms. Connect Adobe GenStudio and Workfront campaign briefs directly to automate metadata tagging and routing.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="170" cy="112" r="5" fill="#d97706" stroke="#fff" strokeWidth="1" />
                            <text x="145" y="98" fill="#d97706" fontSize="5" fontWeight="bold">Horizon 2: Swarms</text>
                          </g>

                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Horizon 3: Transformative Vision', phase: 'Long-Term Scale (2030)', readiness: 'Focus: Predictive Supply Chain', desc: 'Establish an autonomous content supply chain. Harness real-time localized HCP interaction data to programmatically generate and validate compliance campaigns globally.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="250" cy="78" r="5" fill="#7c3aed" stroke="#fff" strokeWidth="1" />
                            <text x="225" y="65" fill="#7c3aed" fontSize="5" fontWeight="bold">Horizon 3: Autonomous</text>
                          </g>

                          <text x="15" y="25" fill="#64748b" fontSize="6" fontWeight="bold">Y-AXIS: STRATEGIC ENTERPRISE VALUE</text>
                          <text x="200" y="200" fill="#64748b" fontSize="6" fontWeight="bold">X-AXIS: TIMELINE (2026 - 2030)</text>
                        </svg>
                      )}

                      {/* 4. Forrester Wave Model */}
                      {activeFrameworkTab === 'wave' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Forrester Arc Lines (Leaders, Strong Performers, Contenders) */}
                          <path d="M 280,210 A 200,200 0 0,0 60,20" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                          <path d="M 280,210 A 130,130 0 0,0 130,70" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1.5" />
                          
                          {/* Quadrant Text Labels */}
                          <text x="260" y="30" fill="#94a3b8" fontSize="6" fontWeight="bold" textAnchor="end">LEADERS</text>
                          <text x="180" y="70" fill="#94a3b8" fontSize="5.5" fontWeight="bold">STRONG PERFORMERS</text>
                          <text x="110" y="130" fill="#94a3b8" fontSize="5" fontWeight="bold">CONTENDERS</text>

                          {/* Bubble 1: Google */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Google Cloud Vertex AI', phase: 'Forrester Leader (Massive Presence)', readiness: 'Strategy: 4.8 | Offering: 4.6', desc: 'Combines highly scalable enterprise agent platform APIs with BigQuery zero-ETL data lakes. Giant bubble reflects massive global market presence and zero-trust credentials.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="240" cy="65" r="14" fill="#0d9488" opacity="0.8" stroke="#fff" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.15))' }} />
                            <text x="240" y="67" fill="#fff" fontSize="5" fontWeight="bold" textAnchor="middle">Google</text>
                          </g>

                          {/* Bubble 2: AWS */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Amazon Web Services (Bedrock)', phase: 'Forrester Leader (Massive Presence)', readiness: 'Strategy: 4.5 | Offering: 4.3', desc: 'Offers excellent model stability and broad foundational gardens. High enterprise presence (large bubble), but restricted model swapping outside Bedrock boundaries.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="210" cy="95" r="13" fill="#1e293b" opacity="0.8" stroke="#fff" strokeWidth="1.5" />
                            <text x="210" y="97" fill="#fff" fontSize="5" fontWeight="bold" textAnchor="middle">AWS</text>
                          </g>

                          {/* Bubble 3: Veeva */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Veeva Vault Native AI', phase: 'Strong Performer (Niche Focus)', readiness: 'Strategy: 3.8 | Offering: 4.0', desc: 'Deep vertical integration within pharmaceutical GxP perimeters. Moderate market presence bubble; restricted cross-cloud orchestration.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="170" cy="140" r="9" fill="#d97706" opacity="0.8" stroke="#fff" strokeWidth="1" />
                            <text x="170" y="142" fill="#fff" fontSize="4.5" fontWeight="bold" textAnchor="middle">Veeva</text>
                          </g>

                          {/* Bubble 4: Startups */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Bespoke AI Orchestrator Startup', phase: 'Contender / Niche (Small Presence)', readiness: 'Strategy: 4.2 | Offering: 2.8', desc: 'Provides highly customized orchestration hooks, but carries massive operational and security risks. Tiny bubble reflects low market footprint.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="90" cy="165" r="5" fill="#e11d48" opacity="0.8" stroke="#fff" strokeWidth="1" />
                            <text x="98" y="167" fill="#0f172a" fontSize="4.5" fontWeight="bold">Startups</text>
                          </g>

                          <text x="15" y="25" fill="#64748b" fontSize="6" fontWeight="bold">Y-AXIS: CURRENT OFFERING SUITABILITY</text>
                          <text x="200" y="212" fill="#64748b" fontSize="6" fontWeight="bold">X-AXIS: ARCHITECTURAL STRATEGY</text>
                        </svg>
                      )}

                      {/* 5. Wardley Mapping */}
                      {activeFrameworkTab === 'wardley' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Evolution Phases Grid */}
                          <line x1="80" y1="10" x2="80" y2="200" stroke="rgba(15,23,42,0.04)" />
                          <line x1="160" y1="10" x2="160" y2="200" stroke="rgba(15,23,42,0.04)" />
                          <line x1="240" y1="10" x2="240" y2="200" stroke="rgba(15,23,42,0.04)" />

                          {/* Evolution Labels */}
                          <text x="40" y="210" fill="#94a3b8" fontSize="5.5" fontWeight="bold" textAnchor="middle">Genesis</text>
                          <text x="120" y="210" fill="#94a3b8" fontSize="5.5" fontWeight="bold" textAnchor="middle">Custom Built</text>
                          <text x="200" y="210" fill="#94a3b8" fontSize="5.5" fontWeight="bold" textAnchor="middle">Product</text>
                          <text x="280" y="210" fill="#94a3b8" fontSize="5.5" fontWeight="bold" textAnchor="middle">Commodity</text>

                          {/* Wardley Components */}
                          {/* Component 1: Cloud Compute */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'GCP/AWS Cloud Compute & Storage', phase: 'Commodity Utilities', readiness: 'Maturity: High (Out-of-the-Box)', desc: 'Standard cloud infrastructure is a pure commodity. Proves we should never waste SI budget building this layers from scratch.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="280" cy="180" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1" />
                            <text x="270" y="172" fill="#0f172a" fontSize="5.5" fontWeight="bold" textAnchor="end">Cloud Compute</text>
                          </g>

                          {/* Component 2: LLM Models */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'LLM Foundational Models (Gemini/Claude)', phase: 'Product (Transitioning to Commodity)', readiness: 'Maturity: Moderate-High', desc: 'Foundation models are rapidly evolving from specialized products into utility commodities. The value lies in orchestration, not model training.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="210" cy="110" r="5" fill="#d97706" stroke="#fff" strokeWidth="1" />
                            <text x="200" y="102" fill="#0f172a" fontSize="5.5" fontWeight="bold" textAnchor="end">Foundational Models</text>
                          </g>

                          {/* Component 3: Pharma Agentic MLR */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Pharma Agentic MLR Routing Engine', phase: 'Custom Built (High Value)', readiness: 'Maturity: Low (Bespoke Logic)', desc: 'The core business value layer. Requires custom agent architecture to map compliance rules natively. Proves exactly where SI development hours must be spent.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="120" cy="40" r="6" fill="#0d9488" stroke="#fff" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }} />
                            <text x="130" y="42" fill="#0d9488" fontSize="6" fontWeight="900">Custom MLR Routing ★</text>
                          </g>

                          {/* Dependency Lines */}
                          <line x1="120" y1="46" x2="210" y2="104" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="2" />
                          <line x1="210" y1="116" x2="280" y2="174" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="2" />

                          <text x="15" y="25" fill="#64748b" fontSize="6" fontWeight="bold">Y-AXIS: VALUE TO USER / COMPILATION LEVEL</text>
                        </svg>
                      )}

                    </div>
                  </div>

                  {/* Right Column: Deep-Dive Strategic Analysis */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                    
                    <div className="v12-card-glass" style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '0.55rem', background: '#ffffff', overflowY: 'auto' }} className="v12-scrollable">
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                        MCKINSEY-GARTNER ANNOTATIONS
                      </span>

                      {hoveredFrameworkItem ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>Selected Component</span>
                            <h4 style={{ margin: '0.08rem 0', fontSize: '0.78rem', fontWeight: 900, color: '#0f172a' }}>{hoveredFrameworkItem.name}</h4>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                            <div>
                              <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>Classification</span>
                              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: colors.accentAmber, display: 'block' }}>{hoveredFrameworkItem.phase}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>GxP Readiness</span>
                              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: colors.accentTeal, display: 'block' }}>{hoveredFrameworkItem.readiness}</span>
                            </div>
                          </div>

                          <div style={{ background: '#f8fafc', padding: '0.45rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.08)', marginTop: '0.2rem' }}>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, display: 'block', marginBottom: '0.15rem' }}>STRATEGIC OUTLINE & RISK PROFILE</span>
                            <p style={{ margin: 0, fontSize: '0.65rem', color: '#0f172a', lineHeight: 1.35 }}>{hoveredFrameworkItem.desc}</p>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', justifyContent: 'center', height: '100%', textAlign: 'center', color: '#94a3b8' }}>
                          <TrendingUp size={24} style={{ margin: '0 auto', opacity: 0.5 }} />
                          <span style={{ fontSize: '0.65rem', fontStyle: 'italic' }}>*Hover over any plotted node on the left canvas to unlock deep-dive board annotations.*</span>
                        </div>
                      )}
                    </div>

                    {/* Value Matrix Card */}
                    <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'rgba(13, 148, 136, 0.02)', border: `1.2px solid ${colors.accentTeal}` }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                        THE PROCUREMENT CONCLUSION
                      </span>
                      <p style={{ margin: 0, fontSize: '0.62rem', color: '#475569', lineHeight: 1.45 }}>
                        {activeFrameworkTab === 'hype' && "The Hype Cycle proves that deterministic Kong gateways and clinical RAG are ready for GxP production today. Standalone chatbots are highly volatile and must be restricted to prevent warnings."}
                        {activeFrameworkTab === 'capabilities' && "The Capabilities matrix proves that while Veeva excels at FDA Part 11 auditing out-of-the-box, Google Cloud excels natively at cross-cloud Adobe GenStudio metadata injection and geofencing."}
                        {activeFrameworkTab === 'horizons' && "The Growth timeline shows the board a clear, phased scale pathway. H1 delivers immediate MLR velocity; H2 automates supply chain sync; H3 introduces autonomous predictive campaigns."}
                        {activeFrameworkTab === 'wave' && "The Forrester Wave visually justifies to procurement why choosing established mega-vendors (Google/AWS) reduces enterprise scale risk, whereas startup orchestrators introduce support debt."}
                        {activeFrameworkTab === 'wardley' && "The Wardley Map proves to the CIO exactly where engineering hours should be spent. Do not spend SI budget custom-building utilities; spend it custom-building the GxP MLR routing logic that creates value."}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            )}
"""

code = code.replace(target_whatif_page, analytics_page_code + "\n" + target_whatif_page)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully injected McKinsey-Gartner Strategy Analytics page!")
