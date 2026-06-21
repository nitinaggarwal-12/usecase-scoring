import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add state variables for C-Suite Operational Readiness Page
target_state_vars = """  // Analytical Frameworks Active Tab State
  const [activeFrameworkTab, setActiveFrameworkTab] = useState('hype'); // 'hype' | 'capabilities' | 'horizons' | 'wave' | 'wardley'
  const [hoveredFrameworkItem, setHoveredFrameworkItem] = useState(null);"""

replacement_state_vars = """  // Analytical Frameworks Active Tab State
  const [activeFrameworkTab, setActiveFrameworkTab] = useState('hype'); // 'hype' | 'capabilities' | 'horizons' | 'wave' | 'wardley'
  const [hoveredFrameworkItem, setHoveredFrameworkItem] = useState(null);

  // C-Suite Operational Readiness States
  const [changeManagementOption, setChangeManagementOption] = useState('teams'); // 'portal' | 'teams' | 'veeva'
  const [njAuditTrailEnabled, setNjAuditTrailEnabled] = useState(true);"""

code = code.replace(target_state_vars, replacement_state_vars)

# 2. Add the Sidebar navigation item for Tab 10
target_sidebar = """              <div 
                onClick={() => setReportPage('analytics')} 
                className={`v12-sidebar-nav-item ${reportPage === 'analytics' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'analytics' ? colors.accentTeal : '#475569' }}
              >
                <TrendingUp size={15} style={{ color: colors.accentTeal }} />
                <span>9. McKinsey-Gartner Analytics</span>
              </div>"""

replacement_sidebar = """              <div 
                onClick={() => setReportPage('analytics')} 
                className={`v12-sidebar-nav-item ${reportPage === 'analytics' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'analytics' ? colors.accentTeal : '#475569' }}
              >
                <TrendingUp size={15} style={{ color: colors.accentTeal }} />
                <span>9. McKinsey-Gartner Analytics</span>
              </div>
              <div 
                onClick={() => setReportPage('operational')} 
                className={`v12-sidebar-nav-item ${reportPage === 'operational' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'operational' ? colors.accentTeal : '#475569' }}
              >
                <Users size={15} style={{ color: colors.accentTeal }} />
                <span>10. C-Suite Operational Readiness</span>
              </div>"""

code = code.replace(target_sidebar, replacement_sidebar)

# 3. Add the title text sync in the header
target_title = """                  {reportPage === 'whatif' && "Composable What-If Sandbox: Dynamic Vendor Scenarios."}
                  {reportPage === 'analytics' && "McKinsey-Gartner Analytical Strategy Frameworks."}"""

replacement_title = """                  {reportPage === 'whatif' && "Composable What-If Sandbox: Dynamic Vendor Scenarios."}
                  {reportPage === 'analytics' && "McKinsey-Gartner Analytical Strategy Frameworks."}
                  {reportPage === 'operational' && "C-Suite Operational Readiness: Legal Risk & Talent Mapping."}"""

code = code.replace(target_title, replacement_title)

# 4. Inject Peer Competitor Benchmarks (FOMO Overlay) directly onto Page 1 (2x2 Scatter Plot)
target_scatter_plot = """                        <g 
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredArchBlock({ name: 'Google-Native Target', desc: `Capability: ${scoringData.capabilityScore.toFixed(1)}/45 | Feasibility: ${scoringData.feasibilityScore.toFixed(1)}/9. Powered by ADK 2.0 Agent Swarms, Vertex AI private endpoints, and BigQuery Zero-ETL semantic graphs.` })}
                          onMouseLeave={() => setHoveredArchBlock(null)}
                        >
                          <circle cx="320" cy="60" r="9" fill="#0d9488" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 2px 6px rgba(13,148,136,0.3))' }} />
                          <text x="290" y="45" fill="#0d9488" fontSize="8" fontWeight="900">3. Google-Native (Target) ★</text>
                        </g>"""

replacement_scatter_plot = """                        <g 
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredArchBlock({ name: 'Google-Native Target', desc: `Capability: ${scoringData.capabilityScore.toFixed(1)}/45 | Feasibility: ${scoringData.feasibilityScore.toFixed(1)}/9. Powered by ADK 2.0 Agent Swarms, Vertex AI private endpoints, and BigQuery Zero-ETL semantic graphs.` })}
                          onMouseLeave={() => setHoveredArchBlock(null)}
                        >
                          <circle cx="320" cy="60" r="9" fill="#0d9488" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 2px 6px rgba(13,148,136,0.3))' }} />
                          <text x="290" y="45" fill="#0d9488" fontSize="8" fontWeight="900">3. Google-Native (Target) ★</text>
                        </g>

                        {/* Faint Grey Competitor Benchmark Overlay (FOMO Graph) */}
                        <g 
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredArchBlock({ name: 'Pharma Peer A (AWS-Native)', desc: 'Capability: 3.0/5.0. Currently deploying standard AWS Bedrock templates inside Veeva Vault. Fast initial deployment but struggling with cross-system Adobe supply chain silos.' })}
                          onMouseLeave={() => setHoveredArchBlock(null)}
                        >
                          <circle cx="210" cy="155" r="5.5" fill="#94a3b8" opacity="0.4" stroke="#fff" strokeWidth="1" />
                          <text x="180" y="167" fill="#64748b" fontSize="6.5" fontWeight="bold">Pharma Peer A (AWS)</text>
                        </g>

                        <g 
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredArchBlock({ name: 'Oncology Competitor B (GCP-Mesh)', desc: 'Capability: 4.4/5.0. Rapidly scaling a custom Google Gemini orchestration mesh across 60,000 users. Realizing a 50% increase in campaign review throughput.' })}
                          onMouseLeave={() => setHoveredArchBlock(null)}
                        >
                          <circle cx="300" cy="80" r="5.5" fill="#94a3b8" opacity="0.4" stroke="#fff" strokeWidth="1" />
                          <text x="308" y="83" fill="#64748b" fontSize="6.5" fontWeight="bold">Competitor B (GCP)</text>
                        </g>"""

code = code.replace(target_scatter_plot, replacement_scatter_plot)

# 5. Insert Page 10: C-Suite Operational Readiness
target_analytics_page = """            {/* =========================================================================
            // PAGE 9: MCKINSEY-GARTNER ANALYTICAL STRATEGY FRAMEWORKS
            // ========================================================================= */}
            {reportPage === 'analytics' && ("""

operational_page_code = """            {/* =========================================================================
            // PAGE 10: C-SUITE OPERATIONAL READINESS & LEGAL RISK
            // ========================================================================= */}
            {reportPage === 'operational' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Upper Row Symmetrical Split: Talent Mapping vs. Legal Risk */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem', flex: 1.2, minHeight: 0 }}>
                  
                  {/* 1. Talent & Resource Skill Mapping */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '260px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.3rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>ORGANIZATIONAL SKILLS BENCH CONTRAST</span>
                      <span style={{ fontSize: '0.55rem', color: '#475569' }}>Talent hours needed vs. Upskilling bench</span>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifycontent: 'space-around', gap: '0.45rem', padding: '0.35rem 0' }}>
                      
                      {/* Skill 1: Python/MCP Developers */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.15rem' }}>
                          <span>Python & MCP Mesh Architecture (Google Build)</span>
                          <span style={{ color: colors.accentAmber }}>Requires 2 High-Price Hires / 6 Weeks Upskill</span>
                        </div>
                        <div style={{ display: 'flex', height: '10px', background: 'rgba(15,23,42,0.03)', borderRadius: '100px', border: '1px solid rgba(15,23,42,0.06)', overflow: 'hidden' }}>
                          <div style={{ width: '20%', background: colors.accentTeal, borderRadius: '100px 0 0 100px' }} title="Current internal bench" />
                          <div style={{ width: '80%', background: colors.accentAmber }} title="Additional skill hours needed" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', color: '#64748b', marginTop: '0.05rem' }}>
                          <span>Current Bench: 20%</span>
                          <span>Strategic Gap: 80%</span>
                        </div>
                      </div>

                      {/* Skill 2: Veeva Admins */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.15rem' }}>
                          <span>Veeva Admin & Bedrock Configuration (AWS Buy)</span>
                          <span style={{ color: '#16a34a' }}>✓ 100% Upskilled Bench Available</span>
                        </div>
                        <div style={{ display: 'flex', height: '10px', background: 'rgba(15,23,42,0.03)', borderRadius: '100px', border: '1px solid rgba(15,23,42,0.06)', overflow: 'hidden' }}>
                          <div style={{ width: '85%', background: colors.accentTeal, borderRadius: '100px 0 0 100px' }} />
                          <div style={{ width: '15%', background: '#94a3b8' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', color: '#64748b', marginTop: '0.05rem' }}>
                          <span>Current Bench: 85%</span>
                          <span>Strategic Gap: 15%</span>
                        </div>
                      </div>

                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.45rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.08)', fontSize: '0.62rem', color: '#475569', lineHeight: 1.35 }}>
                      <strong>Talent Conclusion:</strong> Choosing the custom *Google Mesh* requires hiring 2 specialized AI engineers or upskilling 3 team members, whereas the *Veeva/AWS Native* route leverages your existing, certified internal Veeva administrators.
                    </div>
                  </div>

                  {/* 2. Legal & Patient Privacy Risk Thermometers */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '260px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.3rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>PATIENT PRIVACY & LEGAL RISK THERMOMETER</span>
                      
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.58rem', fontWeight: 800, color: '#0f172a', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={njAuditTrailEnabled}
                          onChange={e => setNjAuditTrailEnabled(e.target.checked)}
                          style={{ accentColor: colors.accentTeal }}
                        />
                        <span>Algorithmic Audit Trail</span>
                      </label>
                    </div>

                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', padding: '0.35rem 0' }}>
                      
                      {/* Thermometer 1: NJ S-1515 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.25rem', relative: 'relative' }}>
                        <span style={{ fontSize: '0.55rem', fontWeight: 900, color: '#0f172a' }}>NJ S-1515 ADS BILL</span>
                        
                        {/* Vertical Thermometer */}
                        <div style={{ width: '16px', height: '80px', background: '#e2e8f0', borderRadius: '100px', border: '1px solid rgba(15,23,42,0.15)', relative: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <div 
                            style={{ 
                              width: '100%', 
                              height: njAuditTrailEnabled ? '25%' : '90%', 
                              background: njAuditTrailEnabled ? colors.accentTeal : colors.accentCoral, 
                              borderRadius: '100px',
                              transition: 'height 0.3s ease, background-color 0.3s'
                            }} 
                          />
                        </div>
                        <span style={{ fontSize: '0.62rem', fontWeight: 900, color: njAuditTrailEnabled ? colors.accentTeal : colors.accentCoral }}>
                          {njAuditTrailEnabled ? "✓ COMPLIANT" : "❌ HIGH LIABILITY"}
                        </span>
                      </div>

                      {/* Thermometer 2: EU AI Act */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.25rem' }}>
                        <span style={{ fontSize: '0.55rem', fontWeight: 900, color: '#0f172a' }}>EU AI ACT SECTION 52</span>
                        
                        {/* Vertical Thermometer */}
                        <div style={{ width: '16px', height: '80px', background: '#e2e8f0', borderRadius: '100px', border: '1px solid rgba(15,23,42,0.15)', relative: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <div style={{ width: '100%', height: '35%', background: colors.accentTeal, borderRadius: '100px' }} />
                        </div>
                        <span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.accentTeal }}>✓ COMPLIANT</span>
                      </div>

                    </div>

                    {!njAuditTrailEnabled && (
                      <div style={{ background: 'rgba(225, 29, 72, 0.05)', border: `1.2px solid ${colors.accentCoral}`, borderRadius: '6px', padding: '0.45rem', fontSize: '0.62rem', display: 'flex', alignItems: 'flex-start', gap: '0.3rem' }}>
                        <ShieldAlert size={15} style={{ color: colors.accentCoral, flexShrink: 0, marginTop: '0.05rem' }} />
                        <div>
                          <span style={{ fontWeight: 950, color: colors.accentCoral, display: 'block' }}>⚠️ NJ S-1515 REGULATORY BLOCKER</span>
                          <span style={{ color: '#0f172a', display: 'block', marginTop: '0.08rem', lineHeight: 1.3 }}>
                            Disabling the algorithmic audit trail violates New Jersey Automated Decision Systems Act Section 4. **Exposes Merck to penalties up to $250K/day.** Toggle "Algorithmic Audit Trail" ON to remediate liability.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Lower Row: Change Management Friction Index & Peer Benchmarks */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* 3. Change Management Friction Index */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.3rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>END-USER CHANGE MANAGEMENT FRICTION INDEX</span>
                      <span style={{ fontSize: '0.55rem', color: '#475569' }}>Friction score on a scale of 1-10</span>
                    </div>

                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '0.85rem', alignItems: 'center' }}>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#475569' }}>Select End-User Deployment Channel:</span>
                        
                        {/* Selector Radio Group */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#0f172a', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name="changeMgt" 
                              checked={changeManagementOption === 'portal'}
                              onChange={() => setChangeManagementOption('portal')}
                              style={{ accentColor: colors.accentTeal }}
                            />
                            <span>Separate Standalone Web Portal</span>
                          </label>
                          
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#0f172a', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name="changeMgt" 
                              checked={changeManagementOption === 'teams'}
                              onChange={() => setChangeManagementOption('teams')}
                              style={{ accentColor: colors.accentTeal }}
                            />
                            <span>Embedded in Microsoft Teams (Direct Webhook)</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#0f172a', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name="changeMgt" 
                              checked={changeManagementOption === 'veeva'}
                              onChange={() => setChangeManagementOption('veeva')}
                              style={{ accentColor: colors.accentTeal }}
                            />
                            <span>Native in Veeva PromoMats Workspace</span>
                          </label>
                        </div>
                      </div>

                      {/* Interactive Dial Score Display */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '1px solid rgba(15,23,42,0.08)', borderRadius: '6px', padding: '0.65rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.5rem', color: '#475569', fontWeight: 800 }}>FRICTION INDEX</span>
                        <span style={{ 
                          fontSize: '1.6rem', 
                          fontWeight: 950, 
                          color: changeManagementOption === 'portal' ? colors.accentCoral : changeManagementOption === 'teams' ? colors.accentTeal : colors.accentTeal 
                        }}>
                          {changeManagementOption === 'portal' ? '8.2' : changeManagementOption === 'teams' ? '2.4' : '3.8'}
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}> / 10</span>
                        </span>
                        <span style={{ fontSize: '0.52rem', color: '#64748b', display: 'block', marginTop: '0.15rem', lineHeight: 1.3 }}>
                          {changeManagementOption === 'portal' && "Requires extensive staff retraining ($450K budget)."}
                          {changeManagementOption === 'teams' && "Invisible integration. Zero retraining required."}
                          {changeManagementOption === 'veeva' && "Minor staff adjustment. Native workspace flow."}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* 4. Peer Competitor Benchmarks Comparison */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.3rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>PEER BENCHMARK COMPARISON</span>
                      <span style={{ fontSize: '0.55rem', color: '#475569' }}>Pharma Peer Adoption</span>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }} className="v12-scrollable">
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.65rem', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.08)', color: '#475569', fontWeight: 800 }}>
                            <th style={{ padding: '0.3rem' }}>PEER PHARMA</th>
                            <th style={{ padding: '0.3rem' }}>ARCHITECTURE</th>
                            <th style={{ padding: '0.3rem', textAlign: 'center' }}>ACTIVE USERS</th>
                            <th style={{ padding: '0.3rem', textAlign: 'center' }}>COMPLIANCE STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { peer: 'Pfizer Global Oncology', arch: 'GCP Custom Mesh', users: '65,000', status: '✓ GxP Validated' },
                            { peer: 'Novartis Commercial', arch: 'AWS Bedrock + Veeva', users: '45,000', status: '✓ GxP Validated' },
                            { peer: 'Roche Diagnostics', arch: 'Hybrid AWS / GCP', users: '30,000', status: '⚠️ Audit Pending' }
                          ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(15,23,42,0.04)' }}>
                              <td style={{ padding: '0.35rem 0.3rem', fontWeight: 800, color: '#0f172a' }}>{row.peer}</td>
                              <td style={{ padding: '0.35rem 0.3rem', color: '#475569' }}>{row.arch}</td>
                              <td style={{ padding: '0.35rem 0.3rem', textAlign: 'center', color: '#0f172a' }}>{row.users}</td>
                              <td style={{ padding: '0.35rem 0.3rem', textAlign: 'center', color: row.status.includes('✓') ? '#16a34a' : colors.accentCoral, fontWeight: 700 }}>{row.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

              </div>
            )}
"""

code = code.replace(target_analytics_page, operational_page_code + "\n" + target_analytics_page)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully injected the C-Suite Operational Readiness page!")
