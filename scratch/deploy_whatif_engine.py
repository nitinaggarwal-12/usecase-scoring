import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add state variables for the Composable What-If Engine
target_state_vars = """  // Enhanced Scenario Sandbox States
  const [crossPlatformOrch, setCrossPlatformOrch] = useState(false);
  const [siBudgetSlider, setSiBudgetSlider] = useState(350); // SI Budget in $K
  const [buyVsBuildSelection, setBuyVsBuildSelection] = useState('build'); // 'buy' (Veeva Native / AWS) | 'build' (Custom Mesh / Google)"""

replacement_state_vars = """  // Enhanced Scenario Sandbox States
  const [crossPlatformOrch, setCrossPlatformOrch] = useState(false);
  const [siBudgetSlider, setSiBudgetSlider] = useState(350); // SI Budget in $K
  const [buyVsBuildSelection, setBuyVsBuildSelection] = useState('build'); // 'buy' (Veeva Native / AWS) | 'build' (Custom Mesh / Google)

  // Composable What-If Engine States
  const [whatIfOrch, setWhatIfOrch] = useState('google'); // 'google' | 'aws' | 'veeva'
  const [whatIfIdentity, setWhatIfIdentity] = useState('entra'); // 'entra' | 'ping'
  const [whatIfFederation, setWhatIfFederation] = useState('mcp'); // 'mcp' | 'webhooks' | 'etl'
  const [whatIfStorage, setWhatIfStorage] = useState('adobe'); // 'adobe' | 'veeva_promomats' | 's3'
  const [scenarioNameInput, setScenarioNameInput] = useState('');
  const [savedScenarios, setSavedScenarios] = useState([
    { name: 'Scenario A: Composable Google + Adobe Mesh', orch: 'google', identity: 'entra', federation: 'mcp', storage: 'adobe', tco: '4.8M', mvp: '6mo', gxp: '93/100', agility: 92, compliance: 90, costEfficiency: 86 },
    { name: 'Scenario B: Veeva Vault Native Monolith', orch: 'veeva', identity: 'entra', federation: 'etl', storage: 'veeva_promomats', tco: '5.2M', mvp: '8mo', gxp: '98/100', agility: 65, compliance: 98, costEfficiency: 82 }
  ]);"""

code = code.replace(target_state_vars, replacement_state_vars)

# 2. Add the Sidebar navigation item
target_sidebar = """              <div 
                onClick={() => setReportPage('gxp_validation')} 
                className={`v12-sidebar-nav-item ${reportPage === 'gxp_validation' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'gxp_validation' ? colors.accentTeal : '#9ca3af' }}
              >
                <ShieldCheck size={15} style={{ color: colors.accentTeal }} />
                <span>7. Continuous GxP Monitor</span>
              </div>"""

replacement_sidebar = """              <div 
                onClick={() => setReportPage('gxp_validation')} 
                className={`v12-sidebar-nav-item ${reportPage === 'gxp_validation' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'gxp_validation' ? colors.accentTeal : '#9ca3af' }}
              >
                <ShieldCheck size={15} style={{ color: colors.accentTeal }} />
                <span>7. Continuous GxP Monitor</span>
              </div>
              <div 
                onClick={() => setReportPage('whatif')} 
                className={`v12-sidebar-nav-item ${reportPage === 'whatif' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'whatif' ? colors.accentTeal : '#9ca3af' }}
              >
                <Sliders size={15} style={{ color: colors.accentTeal }} />
                <span>8. Composable What-If Sandbox</span>
              </div>"""

code = code.replace(target_sidebar, replacement_sidebar)

# 3. Add the title text sync in the header
target_title = """                  {reportPage === 'roadmap' && "90-Day Execution Roadmap to Secure January 2027 MVP."}
                  {reportPage === 'gxp_validation' && "GAMP 5 Day-2 Telemetry: Continuous AI Control & Drift Audit."}"""

replacement_title = """                  {reportPage === 'roadmap' && "90-Day Execution Roadmap to Secure January 2027 MVP."}
                  {reportPage === 'gxp_validation' && "GAMP 5 Day-2 Telemetry: Continuous AI Control & Drift Audit."}
                  {reportPage === 'whatif' && "Composable What-If Sandbox: Dynamic Vendor Scenarios."}"""

code = code.replace(target_title, replacement_title)

# 4. Insert Page 8: Composable What-If Engine (AI Enterprise Architecture Simulator)
target_gxp_page = """            {/* =========================================================================
            // PAGE 7: GAMP 5 CONTINUOUS GXP VALIDATION COMMAND CENTER
            // ========================================================================= */}
            {reportPage === 'gxp_validation' && ("""

whatif_page_code = """            {/* =========================================================================
            // PAGE 8: COMPOSABLE WHAT-IF SANDBOX (AI ENTERPRISE ARCHITECTURE SIMULATOR)
            // ========================================================================= */}
            {reportPage === 'whatif' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Simulated Values Computation Block */}
                {(() => {
                  // Component Weights & Base Values
                  const vendors = {
                    orch: {
                      google: { label: 'Google Gemini Agent Platform', cost: 1.2, agility: 95, compliance: 90, gxp: 92 },
                      aws: { label: 'AWS Bedrock managed APIs', cost: 1.5, agility: 80, compliance: 85, gxp: 88 },
                      veeva: { label: 'Veeva Vault Native AI', cost: 0.8, agility: 60, compliance: 95, gxp: 98 }
                    },
                    identity: {
                      entra: { label: 'Microsoft Entra ID (Azure AD)', cost: 0.4, agility: 85, compliance: 90, gxp: 90 },
                      ping: { label: 'Okta / PingFederate SSO', cost: 0.6, agility: 90, compliance: 85, gxp: 88 }
                    },
                    federation: {
                      mcp: { label: 'Model Context Protocol (MCP)', cost: 0.3, agility: 98, compliance: 92, gxp: 94 },
                      webhooks: { label: 'Custom API Webhooks', cost: 0.9, agility: 70, compliance: 75, gxp: 80 },
                      etl: { label: 'Scheduled Batch ETL', cost: 0.5, agility: 45, compliance: 80, gxp: 82 }
                    },
                    storage: {
                      adobe: { label: 'Adobe GenStudio / AEM', cost: 0.8, agility: 92, compliance: 88, gxp: 85 },
                      veeva_promomats: { label: 'Veeva Vault PromoMats', cost: 1.1, agility: 70, compliance: 96, gxp: 98 },
                      s3: { label: 'Custom S3 / Cloud Storage', cost: 0.2, agility: 50, compliance: 60, gxp: 65 }
                    }
                  };

                  const selOrch = vendors.orch[whatIfOrch];
                  const selId = vendors.identity[whatIfIdentity];
                  const selFed = vendors.federation[whatIfFederation];
                  const selStore = vendors.storage[whatIfStorage];

                  // Calculations
                  let costSum = selOrch.cost + selId.cost + selFed.cost + selStore.cost;
                  let mvpBase = 6; // Base 6 months
                  let gxpSum = (selOrch.gxp + selId.gxp + selFed.gxp + selStore.gxp) / 4;
                  let agilitySum = (selOrch.agility + selId.agility + selFed.agility + selStore.agility) / 4;

                  let synergyDiscount = 0;
                  let frictionPenalty = 0;
                  let mvpAdjustment = 0;
                  let activeWarnings = [];

                  // Synergy 1: Veeva + Veeva
                  if (whatIfOrch === 'veeva' && whatIfStorage === 'veeva_promomats') {
                    synergyDiscount = costSum * 0.15; // 15% discount
                    mvpAdjustment -= 3;
                    gxpSum = Math.min(100, gxpSum + 5);
                    activeWarnings.push({ type: 'synergy', text: '✓ Veeva Ecosystem Synergy: 15% TCO discount and -3 months MVP validation timeline applied.' });
                  }

                  // Synergy 2: Google + MCP
                  if (whatIfOrch === 'google' && whatIfFederation === 'mcp') {
                    synergyDiscount += costSum * 0.08;
                    mvpAdjustment -= 2;
                    activeWarnings.push({ type: 'synergy', text: '✓ Google MCP Data Mesh Synergy: Shaves 2 months off MVP and reduces integration testing debt.' });
                  }

                  // Friction 1: Custom Webhooks with Google/AWS Orchestration
                  if ((whatIfOrch === 'google' || whatIfOrch === 'aws') && whatIfFederation === 'webhooks') {
                    frictionPenalty += 1.2; // $1.2M Customization Technical Debt
                    mvpAdjustment += 4;
                    agilitySum = Math.max(20, agilitySum - 15);
                    activeWarnings.push({ type: 'friction', text: '⚠️ High technical debt: Custom webhooks lack native agentic state management, increasing TCO by $1.2M and delaying MVP by 4 months.' });
                  }

                  // Friction 2: Veeva AI with Adobe Storage (Siloed)
                  if (whatIfOrch === 'veeva' && whatIfStorage === 'adobe') {
                    frictionPenalty += 0.8;
                    mvpAdjustment += 3;
                    activeWarnings.push({ type: 'friction', text: '⚠️ Ecosystem Friction: Veeva Native AI cannot push metadata to Adobe GenStudio without heavy custom middleware (+3 months).' });
                  }

                  const finalTCO = Math.round((costSum + frictionPenalty - synergyDiscount) * 10) / 10;
                  const finalMonths = Math.max(3, mvpBase + mvpAdjustment);
                  const finalGxP = Math.min(100, Math.round(gxpSum));
                  const finalAgility = Math.min(100, Math.round(agilitySum));
                  const finalCostEfficiency = Math.min(100, Math.round(100 - (finalTCO / 10.0) * 100));

                  const handleSaveScenario = () => {
                    if (!scenarioNameInput.trim()) {
                      alert("⚠️ Please enter a scenario name!");
                      return;
                    }
                    const newScen = {
                      name: scenarioNameInput.trim(),
                      orch: whatIfOrch,
                      identity: whatIfIdentity,
                      federation: whatIfFederation,
                      storage: whatIfStorage,
                      tco: `${finalTCO}M`,
                      mvp: `${finalMonths}mo`,
                      gxp: `${finalGxP}/100`,
                      agility: finalAgility,
                      compliance: finalGxP,
                      costEfficiency: finalCostEfficiency
                    };
                    setSavedScenarios(prev => [...prev, newScen]);
                    setScenarioNameInput('');
                    alert(`✓ Scenario "${newScen.name}" saved to comparative ledger!`);
                  };

                  return (
                    <>
                      {/* Top Horizontal Bars Graph Matching Uploaded Visual Mockup */}
                      <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: '1rem 1.5rem', flexShrink: 0 }}>
                        <h3 style={{ fontSize: '0.82rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.5px' }}>
                          AI ENTERPRISE ARCHITECTURE SIMULATOR
                        </h3>

                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '0.5rem 0 0.8rem 0' }}>
                          
                          {/* Agility Bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#9ca3af', width: '90px', fontWeight: 800, textAlign: 'right' }}>Agility</span>
                            <div style={{ flex: 1, height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                              <div style={{ width: `${finalAgility}%`, height: '100%', background: '#15803d', borderRadius: '100px', boxShadow: '0 0 10px rgba(21, 128, 61, 0.3)' }} />
                            </div>
                            <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#ffffff', width: '25px' }}>{finalAgility}</span>
                          </div>

                          {/* Compliance Bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#9ca3af', width: '90px', fontWeight: 800, textAlign: 'right' }}>Compliance</span>
                            <div style={{ flex: 1, height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                              <div style={{ width: `${finalGxP}%`, height: '100%', background: '#d97706', borderRadius: '100px', boxShadow: '0 0 10px rgba(217, 119, 6, 0.3)' }} />
                            </div>
                            <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#ffffff', width: '25px' }}>{finalGxP}</span>
                          </div>

                          {/* Cost Efficiency Bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#9ca3af', width: '90px', fontWeight: 800, textAlign: 'right' }}>Cost Efficiency</span>
                            <div style={{ flex: 1, height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                              <div style={{ width: `${finalCostEfficiency}%`, height: '100%', background: '#1d4ed8', borderRadius: '100px', boxShadow: '0 0 10px rgba(29, 78, 216, 0.3)' }} />
                            </div>
                            <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#ffffff', width: '25px' }}>{finalCostEfficiency}</span>
                          </div>

                          {/* Enterprise Target Dashed Line at 70% */}
                          <div style={{ position: 'absolute', left: 'calc(90px + 0.85rem + (100% - 90px - 0.85rem - 25px - 0.85rem) * 0.7)', top: '-5px', bottom: '-5px', width: '1.5px', borderLeft: '1.5px dashed rgba(255,255,255,0.25)', pointerEvents: 'none', zIndex: 5 }}>
                            <span style={{ position: 'absolute', top: '102%', left: '-35px', fontSize: '0.52rem', color: '#9ca3af', fontWeight: 800, whiteSpace: 'nowrap' }}>Enterprise Target (70)</span>
                          </div>

                        </div>

                        {/* Symmetrical Dynamic Score Outputs */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.65rem', textAlign: 'center' }}>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>3-Year TCO ($M)</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#ffffff', display: 'block', marginTop: '0.1rem' }}>${finalTCO}M</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Months to MVP</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#ffffff', display: 'block', marginTop: '0.1rem' }}>{finalMonths}mo</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>GxP Score</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#ffffff', display: 'block', marginTop: '0.1rem' }}>{finalGxP}/100</span>
                          </div>
                        </div>

                      </div>

                      {/* Dropdown Composable Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', flexShrink: 0 }}>
                        
                        <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', background: '#0e1428' }}>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.3rem' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>CORE PLATFORM COMPONENT SELECTION</span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.65rem' }}>
                            
                            {/* Dropdown 1: Orchestration */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#9ca3af' }}>AI Orchestration & Gateway</span>
                              <select 
                                value={whatIfOrch}
                                onChange={e => setWhatIfOrch(e.target.value)}
                                style={{ background: '#0c1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                <option value="google">Google Gemini Enterprise Platform</option>
                                <option value="aws">AWS Bedrock Managed APIs</option>
                                <option value="veeva">Veeva Vault Native AI</option>
                              </select>
                            </div>

                            {/* Dropdown 2: Identity */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#9ca3af' }}>Zero-Trust Identity (IAM)</span>
                              <select 
                                value={whatIfIdentity}
                                onChange={e => setWhatIfIdentity(e.target.value)}
                                style={{ background: '#0c1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                <option value="ping">Okta / PingFederate SSO</option>
                              </select>
                            </div>

                            {/* Dropdown 3: Data Federation */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#9ca3af' }}>Data Federation & Memory</span>
                              <select 
                                value={whatIfFederation}
                                onChange={e => setWhatIfFederation(e.target.value)}
                                style={{ 
                                  background: '#0c1122', 
                                  border: (whatIfOrch === 'google' || whatIfOrch === 'aws') && whatIfFederation === 'webhooks' ? `1.5px solid ${colors.accentAmber}` : '1px solid rgba(255,255,255,0.1)', 
                                  borderRadius: '4px', 
                                  color: '#fff', 
                                  padding: '0.25rem', 
                                  outline: 'none', 
                                  cursor: 'pointer', 
                                  fontWeight: 700 
                                }}
                              >
                                <option value="mcp">Model Context Protocol (MCP)</option>
                                <option value="webhooks">Custom API Webhooks</option>
                                <option value="etl">Scheduled Batch ETL</option>
                              </select>
                            </div>

                            {/* Dropdown 4: Content Supply Chain */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#9ca3af' }}>Content Supply Chain & Storage</span>
                              <select 
                                value={whatIfStorage}
                                onChange={e => setWhatIfStorage(e.target.value)}
                                style={{ background: '#0c1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                <option value="adobe">Adobe GenStudio / AEM</option>
                                <option value="veeva_promomats">Veeva PromoMats</option>
                                <option value="s3">Custom S3 / Cloud Storage</option>
                              </select>
                            </div>

                          </div>
                        </div>

                        {/* Dynamic Synergy & Friction Alert Feed */}
                        <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#0c1122', maxHeight: '120px' }}>
                          <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#9ca3af', letterSpacing: '0.5px' }}>ACTIVE SYNERGY & FRICTION COMPILER FEED</span>
                          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.3rem' }} className="v12-scrollable">
                            {activeWarnings.length === 0 ? (
                              <span style={{ fontSize: '0.62rem', color: '#6b7280', fontStyle: 'italic' }}>*Stack is fully composable. No synergies or technical friction detected.*</span>
                            ) : (
                              activeWarnings.map((warn, i) => (
                                <div 
                                  key={i} 
                                  style={{ 
                                    padding: '0.25rem 0.45rem', 
                                    borderRadius: '4px', 
                                    fontSize: '0.62rem', 
                                    background: warn.type === 'synergy' ? 'rgba(20, 184, 166, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                                    border: warn.type === 'synergy' ? `1px solid ${colors.accentTeal}` : `1px solid ${colors.accentAmber}`,
                                    color: warn.type === 'synergy' ? colors.accentTeal : colors.accentAmber,
                                    lineHeight: 1.3
                                  }}
                                >
                                  {warn.text}
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Save Scenario Bar */}
                      <div className="v12-card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem', flexShrink: 0, background: '#0e1428' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#9ca3af' }}>Save Architecture Snapshot:</span>
                          <input 
                            type="text"
                            placeholder="e.g. Scenario C: Composable GCP + Okta"
                            value={scenarioNameInput}
                            onChange={e => setScenarioNameInput(e.target.value)}
                            style={{ background: '#05070e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.65rem', color: '#fff', outline: 'none', width: '220px' }}
                          />
                        </div>
                        <button 
                          onClick={handleSaveScenario}
                          style={{ background: colors.purpleGradient, border: 'none', color: '#fff', padding: '0.35rem 1rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer' }}
                        >
                          Save Scenario As...
                        </button>
                      </div>

                      {/* Comparative Saved Scenarios Table */}
                      <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', minHeight: '120px' }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px' }}>STEERING COMMITTEE COMPARATIVE LEDGER</span>
                        
                        <div style={{ flex: 1, overflowY: 'auto' }} className="v12-scrollable">
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.65rem', textAlign: 'left' }}>
                            <thead>
                              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af', fontWeight: 800 }}>
                                <th style={{ padding: '0.3rem 0.45rem' }}>SCENARIO RUN NAME</th>
                                <th style={{ padding: '0.3rem 0.45rem' }}>ORCHESTRATION</th>
                                <th style={{ padding: '0.3rem 0.45rem' }}>FEDERATION</th>
                                <th style={{ padding: '0.3rem 0.45rem' }}>STORAGE</th>
                                <th style={{ padding: '0.3rem 0.45rem', textAlign: 'center' }}>3-YEAR TCO</th>
                                <th style={{ padding: '0.3rem 0.45rem', textAlign: 'center' }}>MONTHS MVP</th>
                                <th style={{ padding: '0.3rem 0.45rem', textAlign: 'center' }}>GxP SCORE</th>
                                <th style={{ padding: '0.3rem 0.45rem', textAlign: 'center' }}>AGILITY</th>
                              </tr>
                            </thead>
                            <tbody>
                              {savedScenarios.map((scen, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }} className="v12-table-row-hover">
                                  <td style={{ padding: '0.35rem 0.45rem', fontWeight: 800, color: '#fff' }}>{scen.name}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', color: '#cbd5e1' }}>{scen.orch === 'google' ? 'Google Gemini' : scen.orch === 'aws' ? 'AWS Bedrock' : 'Veeva Native'}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', color: '#cbd5e1' }}>{scen.federation === 'mcp' ? 'MCP Data Mesh' : scen.federation === 'webhooks' ? 'Custom Webhooks' : 'Batch ETL'}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', color: '#cbd5e1' }}>{scen.storage === 'adobe' ? 'Adobe GenStudio' : scen.storage === 'veeva_promomats' ? 'Veeva PromoMats' : 'S3 Bucket'}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', textAlign: 'center', fontWeight: 900, color: colors.accentAmber }}>${scen.tco}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', textAlign: 'center', color: '#fff' }}>{scen.mvp}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', textAlign: 'center', color: colors.accentTeal, fontWeight: 800 }}>{scen.gxp}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', textAlign: 'center', color: '#fff' }}>{scen.agility}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  );
                })()}

              </div>
            )}
"""

code = code.replace(target_gxp_page, whatif_page_code + "\n" + target_gxp_page)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully injected the Composable What-If Sandbox (AI Enterprise Architecture Simulator)!")
