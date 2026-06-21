import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# =========================================================================
# STEP 1: ADD REACT STATES FOR SPLIT SELECTS & SCOPE GUARD TOGGLE
# =========================================================================
old_states_block = """  // Composable What-If Engine States
  const [whatIfOrch, setWhatIfOrch] = useState('google'); // 'google' | 'aws' | 'veeva'
  const [whatIfIdentity, setWhatIfIdentity] = useState('entra'); // 'entra' | 'ping'
  const [whatIfFederation, setWhatIfFederation] = useState('mcp'); // 'mcp' | 'webhooks' | 'etl'
  const [whatIfStorage, setWhatIfStorage] = useState('adobe'); // 'adobe' | 'veeva_promomats' | 's3'
  const [scenarioNameInput, setScenarioNameInput] = useState('');"""

replacement_states_block = """  // Composable What-If Engine States
  const [whatIfOrch, setWhatIfOrch] = useState('google'); 
  const [whatIfIdentity, setWhatIfIdentity] = useState('entra'); 
  const [whatIfFederation, setWhatIfFederation] = useState('mcp'); 
  const [whatIfCreative, setWhatIfCreative] = useState('firefly'); // 'workfront' | 'firefly'
  const [whatIfMLR, setWhatIfMLR] = useState('veeva_promomats'); // 'veeva_promomats' | 'custom_mlr'
  const [whatIfStorage, setWhatIfStorage] = useState('adobe'); // Kept for compatibility
  const [scenarioNameInput, setScenarioNameInput] = useState('');
  
  // Agile Scope Guard Toggle State
  const [scopeConstraint, setScopeConstraint] = useState('2026'); // '2026' (MVP) | '2027' (Scale)"""

if old_states_block in code:
    code = code.replace(old_states_block, replacement_states_block)
    print("✓ Successfully patched state hooks!")
else:
    print("❌ old_states_block not found!")


# =========================================================================
# STEP 2: ADD TABS 7 & 8 TO THE MCKINSEY SUB-NAV
# =========================================================================
old_subnav = """                  {[
                    { id: 'hype', label: '1. Gartner Hype Cycle' },
                    { id: 'capabilities', label: '2. Critical Capabilities (Harvey Balls)' },
                    { id: 'horizons', label: '3. McKinsey Three Horizons' },
                    { id: 'wave', label: '4. Forrester Wave Model' },
                    { id: 'wardley', label: '5. Wardley Strategic Map' },
                    { id: 'radar', label: '6. Future-Proofing Radar' }
                  ].map(tab => ("""

replacement_subnav = """                  {[
                    { id: 'hype', label: '1. Gartner Hype Cycle' },
                    { id: 'capabilities', label: '2. Critical Capabilities (Harvey Balls)' },
                    { id: 'horizons', label: '3. McKinsey Three Horizons' },
                    { id: 'wave', label: '4. Forrester Wave Model' },
                    { id: 'wardley', label: '5. Wardley Strategic Map' },
                    { id: 'radar', label: '6. Future-Proofing Radar' },
                    { id: 'progress', label: '7. Future Workflow Progress' },
                    { id: 'exception', label: '8. Workload Exception Gate' }
                  ].map(tab => ("""

if old_subnav in code:
    code = code.replace(old_subnav, replacement_subnav)
    print("✓ Successfully patched McKinsey subnav tabs!")
else:
    print("❌ old_subnav not found!")


# =========================================================================
# STEP 3: IMPLEMENT SVG FOR TABS 7 & 8 INSIDE PAGE 9 CANVASES
# =========================================================================
target_radar_end = """                          {/* Polygon 2: AWS/Veeva Locked Stack (Orange - Siloed) */}
                          <polygon 
                            points="160,68 210,95 181,130 112,125 120,92" 
                            fill="rgba(217, 119, 6, 0.05)" 
                            stroke="#d97706" 
                            strokeWidth="1.5" 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'AWS / Veeva Locked Stack', phase: 'Siloed Ecosystem (High Lock-in)', readiness: 'Overall Score: 42%', desc: 'Relying strictly on native Veeva AI or static AWS Bedrock APIs locks the architecture into proprietary rails. Restricts dynamic discoverability and requires extensive custom middleware to sync with external Adobe content supply chains.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />
                        </svg>
                      )}"""

replacement_radar_end = """                          {/* Polygon 2: AWS/Veeva Locked Stack (Orange - Siloed) */}
                          <polygon 
                            points="160,68 210,95 181,130 112,125 120,92" 
                            fill="rgba(217, 119, 6, 0.05)" 
                            stroke="#d97706" 
                            strokeWidth="1.5" 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'AWS / Veeva Locked Stack', phase: 'Siloed Ecosystem (High Lock-in)', readiness: 'Overall Score: 42%', desc: 'Relying strictly on native Veeva AI or static AWS Bedrock APIs locks the architecture into proprietary rails. Restricts dynamic discoverability and requires extensive custom middleware to sync with external Adobe content supply chains.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />
                        </svg>
                      )}

                      {/* 7. Progressive Horizontal Stage Chart (Future Workflow Progress) */}
                      {activeFrameworkTab === 'progress' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Chevron Stage Background Track */}
                          <rect x="10" y="100" width="300" height="20" rx="4" fill="rgba(15,23,42,0.03)" />
                          
                          {/* Connected Chevron Stages */}
                          {[
                            { id: 1, name: 'Create/Gather Rules', x: 15, w: 50, color: colors.accentTeal },
                            { id: 2, name: 'Owner Approval', x: 75, w: 50, color: colors.accentTeal },
                            { id: 3, name: 'Embed Rules', x: 135, w: 50, color: colors.accentTeal },
                            { id: 4, name: 'Test History', x: 195, w: 50, color: colors.accentTeal },
                            { id: 5, name: 'Create Asset', x: 255, w: 50, color: colors.accentTeal }
                          ].map((stage, i) => (
                            <g 
                              key={stage.id}
                              style={{ cursor: 'pointer' }}
                              onMouseEnter={() => setHoveredFrameworkItem({ 
                                name: `${stage.id}. Stage: ${stage.name}`, 
                                phase: 'Operational Milestone', 
                                readiness: i < 3 ? 'Active In-Scope' : 'Day-Two Integration', 
                                desc: `Progressive workflow migration. By shifting compliance rules to the start of creative generation, we eliminate downstream legal bottlenecks. Currently modeling: ${stage.name}.` 
                              })}
                              onMouseLeave={() => setHoveredFrameworkItem(null)}
                            >
                              {/* Connector arrow */}
                              {i > 0 && (
                                <line x1={stage.x - 10} y1="110" x2={stage.x} y2="110" stroke={colors.accentTeal} strokeWidth="1.5" strokeDasharray="2" />
                              )}
                              
                              {/* Stage circle node */}
                              <circle cx={stage.x + 25} cy="110" r="10" fill={stage.color} stroke="#fff" strokeWidth="1.5" />
                              <text x={stage.x + 25} y="112" fill="#fff" fontSize="6" fontWeight="bold" textAnchor="middle">{stage.id}</text>
                              
                              {/* Label text */}
                              <text 
                                x={stage.x + 25} 
                                y="132" 
                                fill="#0f172a" 
                                fontSize="4.8" 
                                fontWeight="bold" 
                                textAnchor="middle"
                                style={{ transform: 'rotate(-15deg)', transformOrigin: `${stage.x + 25}px 132px` }}
                              >
                                {stage.name}
                              </text>
                            </g>
                          ))}
                          
                          <text x="160" y="35" fill="#475569" fontSize="6.5" fontWeight="bold" textAnchor="middle">THE FUTURE-STATE COMPLIANCE WORKFLOW</text>
                          <text x="160" y="48" fill="#94a3b8" fontSize="5" fontWeight="bold" textAnchor="middle">Rules-First Shift-Left Progression Pipeline</text>
                        </svg>
                      )}

                      {/* 8. Exception Gate Distribution Chart (Pie Chart) */}
                      {activeFrameworkTab === 'exception' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* 85% Sector (Automated Pass) - Large sector */}
                          <path 
                            d="M 160,110 L 160,50 A 60,60 0 1,1 110,145 Z" 
                            fill="rgba(13, 148, 136, 0.85)" 
                            stroke="#fff" 
                            strokeWidth="1.5"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({
                              name: 'Automated Compliance Pass (85%)',
                              phase: 'Standard Compliance Engine',
                              readiness: 'Target State Velocity',
                              desc: '85% of standard promotional content (static banners, simple emails, text adjustments) bypasses manual review and is instantly certified by the digital GxP rule engine.'
                            })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />
                          
                          {/* 15% Sector (Flagged Exceptions) - Small slice */}
                          <path 
                            d="M 160,110 L 110,145 A 60,60 0 0,1 160,50 Z" 
                            fill="rgba(239, 68, 68, 0.85)" 
                            stroke="#fff" 
                            strokeWidth="1.5"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({
                              name: 'Flagged Exception Gate (15%)',
                              phase: 'Human-in-the-Loop Escalation',
                              readiness: 'Review-by-Exception',
                              desc: 'Only 15% of highly complex, risky, or ambiguous assets are flagged and escalated to human MLR review teams. Maximizes capacity and eliminates queue stagnation!'
                            })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />
                          
                          {/* Center Cutout to make it a Donut Chart */}
                          <circle cx="160" cy="110" r="30" fill="#f8fafc" />
                          
                          {/* Text indicators */}
                          <text x="160" y="107" fill="#0f172a" fontSize="8" fontWeight="900" textAnchor="middle">85/15</text>
                          <text x="160" y="116" fill="#475569" fontSize="4.5" fontWeight="bold" textAnchor="middle">Ratio</text>
                          
                          {/* Legend */}
                          <rect x="230" y="75" width="6" height="6" fill="rgba(13, 148, 136, 0.85)" />
                          <text x="240" y="80" fill="#0f172a" fontSize="5" fontWeight="bold">Automated Pass (85%)</text>
                          
                          <rect x="230" y="90" width="6" height="6" fill="rgba(239, 68, 68, 0.85)" />
                          <text x="240" y="95" fill="#0f172a" fontSize="5" fontWeight="bold">Human Exceptions (15%)</text>

                          <text x="160" y="25" fill="#475569" fontSize="6.5" fontWeight="bold" textAnchor="middle">WORKLOAD DISTRIBUTION FOR HUMAN REVIEWERS</text>
                          <text x="160" y="195" fill="#94a3b8" fontSize="4.8" fontStyle="italic" textAnchor="middle">*Hover segments to audit compliance exception gates.*</text>
                        </svg>
                      )}"""

if target_radar_end in code:
    code = code.replace(target_radar_end, replacement_radar_end)
    print("✓ Successfully patched SVG canvases!")
else:
    print("❌ target_radar_end not found!")


# =========================================================================
# STEP 4: OVERHAUL THE COMPOSABLE WHAT-IF SIMULATOR PAGE 8 VENDORS & FORMULAS
# =========================================================================
old_whatif_logic = """            {reportPage === 'whatif' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Simulated Values Computation Block */}
                {(() => {
                  // Proportional Component Weights & Base Values for Expanded Composable Sandbox
                  const vendors = {
                    orch: {
                      google: { label: 'Google Vertex AI / Gemini Enterprise', cost: 1.1, agility: 95, compliance: 90, gxp: 92 },
                      aws: { label: 'AWS Bedrock + LangGraph', cost: 1.4, agility: 80, compliance: 85, gxp: 88 },
                      azure: { label: 'Azure OpenAI + Azure AI Studio', cost: 1.3, agility: 82, compliance: 88, gxp: 89 },
                      kong: { label: 'Kong AI Gateway + Custom Python', cost: 0.9, agility: 88, compliance: 80, gxp: 82 },
                      databricks_orch: { label: 'Databricks MosaicML', cost: 1.5, agility: 75, compliance: 85, gxp: 87 },
                      veeva: { label: 'Veeva Vault Native AI', cost: 0.8, agility: 60, compliance: 95, gxp: 98 }
                    },
                    identity: {
                      entra: { label: 'Microsoft Entra ID (Azure AD)', cost: 0.4, agility: 85, compliance: 90, gxp: 90 },
                      okta: { label: 'Okta Workforce Identity Cloud', cost: 0.5, agility: 92, compliance: 88, gxp: 89 },
                      ping: { label: 'Ping Identity SSO', cost: 0.6, agility: 90, compliance: 85, gxp: 88 },
                      google_id: { label: 'Google Cloud Identity', cost: 0.3, agility: 88, compliance: 90, gxp: 91 }
                    },
                    federation: {
                      mcp: { label: 'Model Context Protocol (MCP)', cost: 0.3, agility: 98, compliance: 92, gxp: 94 },
                      databricks_data: { label: 'Databricks Data Platform', cost: 0.7, agility: 85, compliance: 90, gxp: 92 },
                      snowflake: { label: 'Snowflake Cortex', cost: 0.8, agility: 82, compliance: 88, gxp: 89 },
                      google_bq: { label: 'Google BigQuery + Vertex Search', cost: 0.4, agility: 95, compliance: 92, gxp: 94 },
                      webhooks: { label: 'Custom API Webhooks', cost: 0.9, agility: 70, compliance: 75, gxp: 80 },
                      etl: { label: 'Scheduled Batch ETL', cost: 0.5, agility: 45, compliance: 80, gxp: 82 }
                    },
                    storage: {
                      adobe: { label: 'Adobe GenStudio / AEM', cost: 0.8, agility: 92, compliance: 88, gxp: 85 },
                      veeva_promomats: { label: 'Veeva PromoMats / Veeva Vault', cost: 1.1, agility: 70, compliance: 96, gxp: 98 },
                      sfmc: { label: 'Salesforce Marketing Cloud Builder', cost: 1.0, agility: 80, compliance: 78, gxp: 75 },
                      contentful: { label: 'Contentful Headless CMS', cost: 0.5, agility: 90, compliance: 82, gxp: 80 },
                      s3: { label: 'Google Cloud Storage / Custom S3', cost: 0.2, agility: 50, compliance: 60, gxp: 65 }
                    }
                  };

                  const selOrch = vendors.orch[whatIfOrch] || vendors.orch.google;
                  const selId = vendors.identity[whatIfIdentity] || vendors.identity.entra;
                  const selFed = vendors.federation[whatIfFederation] || vendors.federation.mcp;
                  const selStore = vendors.storage[whatIfStorage] || vendors.storage.adobe;

                  // Calculations
                  let costSum = selOrch.cost + selId.cost + selFed.cost + selStore.cost;
                  let mvpBase = 6; // Base 6 months
                  let gxpSum = (selOrch.gxp + selId.gxp + selFed.gxp + selStore.gxp) / 4;
                  let agilitySum = (selOrch.agility + selId.agility + selFed.agility + selStore.agility) / 4;"""

replacement_whatif_logic = """            {reportPage === 'whatif' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Simulated Values Computation Block */}
                {(() => {
                  // Proportional Component Weights & Base Values for Expanded Composable Sandbox
                  const vendors = {
                    orch: {
                      aws: { label: 'LangGraph + AWS AgentCore (Confirmed Foundation)', cost: 1.3, agility: 82, compliance: 88, gxp: 90 },
                      kong: { label: 'Kong AI Gateway (Confirmed Foundation)', cost: 0.9, agility: 90, compliance: 82, gxp: 84 },
                      google: { label: 'Google Vertex AI / Gemini Enterprise (Strategic Candidate)', cost: 1.1, agility: 95, compliance: 90, gxp: 92 }
                    },
                    identity: {
                      entra: { label: 'Microsoft Entra ID (Azure AD)', cost: 0.4, agility: 85, compliance: 90, gxp: 90 },
                      okta: { label: 'Okta Workforce Identity Cloud', cost: 0.5, agility: 92, compliance: 88, gxp: 89 },
                      ping: { label: 'AWS IAM + Ping Identity (Day-1 Candidate)', cost: 0.6, agility: 90, compliance: 85, gxp: 88 },
                      google_id: { label: 'Google Cloud Identity', cost: 0.3, agility: 88, compliance: 90, gxp: 91 }
                    },
                    federation: {
                      databricks_data: { label: 'Databricks (Data Genie) (Confirmed Foundation)', cost: 0.7, agility: 88, compliance: 90, gxp: 92 },
                      mcp: { label: 'Model Context Protocol (MCP) (Strategic Candidate)', cost: 0.3, agility: 98, compliance: 92, gxp: 94 },
                      dynamodb: { label: 'Amazon DynamoDB (Manifest Store Candidate)', cost: 0.5, agility: 80, compliance: 85, gxp: 86 },
                      webhooks: { label: 'Custom API Webhooks', cost: 0.9, agility: 70, compliance: 75, gxp: 80 },
                      etl: { label: 'Scheduled Batch ETL', cost: 0.5, agility: 45, compliance: 80, gxp: 82 }
                    },
                    creative: {
                      workfront: { label: 'Adobe Workfront (Intake Candidate)', cost: 0.5, agility: 80, compliance: 85, gxp: 85 },
                      firefly: { label: 'Adobe Firefly + AEM Assets (DAM)', cost: 0.8, agility: 92, compliance: 88, gxp: 85 }
                    },
                    mlr: {
                      veeva_promomats: { label: 'Veeva PromoMats (Claims/Registration Candidate)', cost: 1.1, agility: 70, compliance: 96, gxp: 98 },
                      custom_mlr: { label: 'Bedrock + Custom MLR Rule Set', cost: 0.7, agility: 85, compliance: 80, gxp: 82 }
                    }
                  };

                  const selOrch = vendors.orch[whatIfOrch] || vendors.orch.aws;
                  const selId = vendors.identity[whatIfIdentity] || vendors.identity.entra;
                  const selFed = vendors.federation[whatIfFederation] || vendors.federation.databricks_data;
                  const selCreative = vendors.creative[whatIfCreative] || vendors.creative.firefly;
                  const selMLR = vendors.mlr[whatIfMLR] || vendors.mlr.veeva_promomats;

                  // Calculations
                  let costSum = selOrch.cost + selId.cost + selFed.cost + selCreative.cost + selMLR.cost;
                  let mvpBase = 6; // Base 6 months
                  let gxpSum = (selOrch.gxp + selId.gxp + selFed.gxp + selCreative.gxp + selMLR.gxp) / 5;
                  let agilitySum = (selOrch.agility + selId.agility + selFed.agility + selCreative.agility + selMLR.agility) / 5;"""

if old_whatif_logic in code:
    code = code.replace(old_whatif_logic, replacement_whatif_logic)
    print("✓ Successfully patched What-If logic and vendors split!")
else:
    print("❌ old_whatif_logic not found!")


# =========================================================================
# STEP 5: OVERWRITE SYNERGY & FRICTION COMPILER LOGIC IN PAGE 8
# =========================================================================
old_synergy_rules = """                  // Synergy 1: Veeva + Veeva
                  if (whatIfOrch === 'veeva' && whatIfStorage === 'veeva_promomats') {
                    synergyDiscount = costSum * 0.15; 
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

                  // 2026 Google Agentic Specifications: MCP + OKF + ARD Slashes Build Threshold to $100K
                  const isGoogleAgenticSpecActive = whatIfOrch === 'google' && whatIfFederation === 'mcp';
                  const minBuildBudgetLimit = isGoogleAgenticSpecActive ? 100 : 220;

                  // Synergy 3: Google Agentic Spec TCO Slasher
                  if (isGoogleAgenticSpecActive) {
                    synergyDiscount += costSum * 0.22; // Additional 22% TCO savings
                    mvpAdjustment = Math.max(-4, mvpAdjustment - 2); // Shaves off another 2 months (A2UI & Managed Agents)
                    activeWarnings.push({ type: 'synergy', text: '✓ Google Agentic Spec Active (ARD + MCP + A2UI): Slashes SI build budget requirements by 60% and eliminates post-launch API maintenance debt.' });
                  }

                  // =========================================================================
                  // MCKINSEY SPECIFIC SCENARIO INTERCEPTIONS & CALCULATIONS
                  // =========================================================================
                  
                  // Scenario A: The "All-In" Native Stack
                  if (whatIfOrch === 'google' && whatIfIdentity === 'google_id' && whatIfFederation === 'google_bq' && whatIfStorage === 's3') {
                    synergyDiscount += costSum * 0.25; // 25% Native integration discount
                    mvpAdjustment -= 3; // Shaves 3 months off MVP
                    agilitySum = Math.min(100, agilitySum + 10);
                    activeWarnings.push({ 
                      type: 'synergy', 
                      text: '✓ Scenario A (All-In Google Native Stack): High synergy, lowest integration debt, and fastest time to MVP (shaved 3 months). Note: potential content-workflow friction with legacy design platforms.' 
                    });
                  }

                  // Scenario B: The Highly Regulated Composable Stack
                  if (whatIfOrch === 'aws' && whatIfIdentity === 'ping' && whatIfFederation === 'databricks_data' && whatIfStorage === 'veeva_promomats') {
                    frictionPenalty += 0.8; // $0.8M Integration Complexity Technical Debt
                    mvpAdjustment += 2; // Delays MVP by 2 months for cross-cloud GxP validation
                    gxpSum = 98; // Hard GxP validation ceiling
                    activeWarnings.push({ 
                      type: 'friction', 
                      text: '⚠️ Scenario B (Highly Regulated Composable Stack): Maximum compliance and GxP auditability (98/100), but high integration friction. Requires specialized gateways (like Kong) to link disparate data lakes.' 
                    });
                  }

                  // Scenario C: The Creative & Agentic Hybrid
                  if (whatIfOrch === 'azure' && whatIfIdentity === 'okta' && whatIfFederation === 'mcp' && whatIfStorage === 'adobe') {
                    synergyDiscount += costSum * 0.12;
                    activeWarnings.push({ 
                      type: 'synergy', 
                      text: '✓ Scenario C (Creative & Agentic Hybrid): Outstanding creative workflow velocity and flexible identity management, but carries potential data-source indexing friction if MCP is not natively supported.' 
                    });
                  }

                  // General Friction: Custom Webhooks with Google/AWS Orchestration
                  if ((whatIfOrch === 'google' || whatIfOrch === 'aws') && whatIfFederation === 'webhooks') {
                    frictionPenalty += 1.2; 
                    mvpAdjustment += 4;
                    agilitySum = Math.max(20, agilitySum - 15);
                    activeWarnings.push({ type: 'friction', text: '⚠️ High technical debt: Custom webhooks lack native agentic state management, increasing TCO by $1.2M and delaying MVP by 4 months.' });
                  }

                  // General Friction: Veeva AI with Adobe Storage (Siloed)
                  if (whatIfOrch === 'veeva' && whatIfStorage === 'adobe') {
                    frictionPenalty += 0.8;
                    mvpAdjustment += 3;
                    activeWarnings.push({ type: 'friction', text: '⚠️ Ecosystem Friction: Veeva Native AI cannot push metadata to Adobe GenStudio without heavy custom middleware (+3 months).' });
                  }"""

replacement_synergy_rules = """                  // 1. Confirmed Foundation Synergy: LangGraph + AWS AgentCore + Databricks
                  if (whatIfOrch === 'aws' && whatIfFederation === 'databricks_data') {
                    synergyDiscount = costSum * 0.20; 
                    mvpAdjustment -= 3;
                    activeWarnings.push({ 
                      type: 'synergy', 
                      text: '✓ Confirmed Foundation Synergy: Ensures standard routing, step advancement, and manifest spine tracking tied to a single trace ID out-of-the-box.' 
                    });
                  }

                  // 2. Multimodal Blindspot Friction: Adobe Firefly + Text-Only LLM without Image Grounding
                  if (whatIfCreative === 'firefly' && whatIfOrch === 'kong') {
                    frictionPenalty += 0.7;
                    mvpAdjustment += 2;
                    activeWarnings.push({ 
                      type: 'friction', 
                      text: '⚠️ Multimodal Blindspot: Separate creative and copy workflows risk generating unapprovable implied claims (e.g., fishing attire mismatches or incorrect patient physical realities).' 
                    });
                  }

                  // 3. Semantic Conflict Risk Friction: Any Custom MLR / Bedrock custom rules
                  if (whatIfMLR === 'custom_mlr') {
                    frictionPenalty += 0.5;
                    activeWarnings.push({ 
                      type: 'friction', 
                      text: "⚠️ Semantic Conflict Risk: Linguistic data formatting show that weak phrasing ('should') overrides mandatory constraints ('must') in testing loops, extending validation sprints." 
                    });
                  }

                  // Synergy: Google Vertex AI + MCP Data Mesh
                  if (whatIfOrch === 'google' && whatIfFederation === 'mcp') {
                    synergyDiscount += costSum * 0.12;
                    mvpAdjustment -= 2;
                    activeWarnings.push({ 
                      type: 'synergy', 
                      text: '✓ Google MCP Data Mesh Synergy: Shaves 2 months off MVP and reduces integration testing debt.' 
                    });
                  }

                  // 2026 Google Agentic Specifications: MCP + OKF + ARD Slashes Build Threshold to $100K
                  const isGoogleAgenticSpecActive = whatIfOrch === 'google' && whatIfFederation === 'mcp';
                  const minBuildBudgetLimit = isGoogleAgenticSpecActive ? 100 : 220;"""

if old_synergy_rules in code:
    code = code.replace(old_synergy_rules, replacement_synergy_rules)
    print("✓ Successfully patched synergy rules engine!")
else:
    print("❌ old_synergy_rules not found!")


# =========================================================================
# STEP 6: INJECT THE AGILE SCOPE GUARD TOGGLE & FILTER MAPPING TABLE
# =========================================================================
old_whatif_div_start = """            {reportPage === 'whatif' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>"""

replacement_whatif_div_start = """            {reportPage === 'whatif' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* 🛡️ AGILE SCOPE GUARD DECISION FILTER & TOGGLE */}
                <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', background: '#ffffff', border: `1.2px solid ${colors.accentTeal}`, padding: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>🛡️ AGILE SCOPE GUARD DECISION FILTER</span>
                      <span style={{ fontSize: '0.55rem', color: '#475569' }}>Draws a hard line between MVP delivery and downstream integration to avoid waterfall blockages.</span>
                    </div>
                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.2rem', borderRadius: '8px', gap: '0.2rem', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)' }}>
                      <button
                        onClick={() => setScopeConstraint('2026')}
                        style={{
                          background: scopeConstraint === '2026' ? colors.tealGradient : 'transparent',
                          color: scopeConstraint === '2026' ? '#ffffff' : '#475569',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.62rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: scopeConstraint === '2026' ? '0 2px 4px rgba(13,148,136,0.15)' : 'none'
                        }}
                      >
                        2026 Scope (HCP Alert Narrow MVP)
                      </button>
                      <button
                        onClick={() => setScopeConstraint('2027')}
                        style={{
                          background: scopeConstraint === '2027' ? colors.tealGradient : 'transparent',
                          color: scopeConstraint === '2027' ? '#ffffff' : '#475569',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.62rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: scopeConstraint === '2027' ? '0 2px 4px rgba(13,148,136,0.15)' : 'none'
                        }}
                      >
                        Day-Two / 2027+ Scale
                      </button>
                    </div>
                  </div>

                  {/* Summit Filter Mapping Table */}
                  <div style={{ overflowX: 'auto', border: '1px solid rgba(15,23,42,0.06)', borderRadius: '6px', marginTop: '0.15rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.58rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid rgba(15,23,42,0.06)', color: '#475569', fontWeight: 900 }}>
                          <th style={{ padding: '0.3rem 0.45rem' }}>UI DIMENSION</th>
                          <th style={{ padding: '0.3rem 0.45rem' }}>2026 IN-SCOPE MVP (ACTIVE)</th>
                          <th style={{ padding: '0.3rem 0.45rem' }}>DAY-TWO SCALE (2027+)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { dim: 'Channels', mvp: 'HCP Alert / Single PDF Template', dayTwo: 'SFMC Email Journeys, Veeva CLM, Full IVA' },
                          { dim: 'Data Inputs', mvp: 'Static Dropdown Segment Selection', dayTwo: 'Live CDP Integration, Intelligent Target Lists' },
                          { dim: 'Infrastructure', mvp: 'Core Agentic Logic', dayTwo: 'Disaster Recovery, High Availability, CI/CD' },
                          { dim: 'Capabilities', mvp: 'Core Execution Loops', dayTwo: 'Rule-Authoring UI, Automated Model-Ops Loop' }
                        ].map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(15,23,42,0.04)', background: '#ffffff' }}>
                            <td style={{ padding: '0.35rem 0.45rem', fontWeight: 900, color: '#0f172a' }}>{row.dim}</td>
                            <td style={{ padding: '0.35rem 0.45rem', color: '#0d9488', fontWeight: 800 }}>✓ {row.mvp}</td>
                            <td style={{ 
                              padding: '0.35rem 0.45rem', 
                              color: scopeConstraint === '2026' ? '#94a3b8' : '#e11d48', 
                              fontWeight: 800,
                              opacity: scopeConstraint === '2026' ? 0.6 : 1,
                              background: scopeConstraint === '2026' ? '#fcfcfc' : 'transparent'
                            }}>
                              {scopeConstraint === '2026' ? `🔒 Hidden/Grayed: ${row.dayTwo}` : `⚡ Unlocked: ${row.dayTwo}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>"""

if old_whatif_div_start in code:
    code = code.replace(old_whatif_div_start, replacement_whatif_div_start)
    print("✓ Successfully patched Scope Guard toggle UI!")
else:
    print("❌ old_whatif_div_start not found!")


# =========================================================================
# STEP 7: RENDER FIVE PICKLIST DROPDOWNS IN A RE-DESIGNED GRID
# =========================================================================
old_dropdown_grid_on_disk = """                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.65rem' }}>
                            
                            {/* Dropdown 1: Orchestration */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                               <span style={{ fontWeight: 800, color: '#475569' }}>AI Orchestration & Gateway</span>
                               <select 
                                 value={whatIfOrch}
                                 onChange={e => setWhatIfOrch(e.target.value)}
                                 style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                               >
                                <option value="google">Google Vertex AI / Gemini Enterprise</option>
                                <option value="aws">AWS Bedrock + LangGraph</option>
                                <option value="azure">Azure OpenAI + Azure AI Studio</option>
                                <option value="kong">Kong AI Gateway + Custom Python</option>
                                <option value="databricks_orch">Databricks MosaicML</option>
                                <option value="veeva">Veeva Vault Native AI</option>
                               </select>
                            </div>

                            {/* Dropdown 2: Identity */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Zero-Trust Identity (IAM)</span>
                              <select 
                                value={whatIfIdentity}
                                onChange={e => setWhatIfIdentity(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                <option value="okta">Okta Workforce Identity Cloud</option>
                                <option value="ping">Ping Identity</option>
                                <option value="google_id">Google Cloud Identity</option>
                              </select>
                            </div>

                            {/* Dropdown 3: Data Federation */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Data Federation & Memory</span>
                              <select 
                                value={whatIfFederation}
                                onChange={e => setWhatIfFederation(e.target.value)}
                                style={{ 
                                  background: '#ffffff', 
                                  border: (whatIfOrch === 'google' || whatIfOrch === 'aws') && whatIfFederation === 'webhooks' ? `1.5px solid ${colors.accentAmber}` : '1px solid rgba(15,23,42,0.15)', 
                                  borderRadius: '4px', 
                                  color: '#0f172a', 
                                  padding: '0.25rem', 
                                  outline: 'none', 
                                  cursor: 'pointer', 
                                  fontWeight: 700 
                                }}
                              >
                                <option value="mcp">Model Context Protocol (MCP)</option>
                                <option value="databricks_data">Databricks (Data Intelligence Platform)</option>
                                <option value="snowflake">Snowflake Cortex</option>
                                <option value="google_bq">Google BigQuery + Vertex Search</option>
                                <option value="webhooks">Custom API Webhooks</option>
                                <option value="etl">Scheduled Batch ETL</option>
                              </select>
                            </div>

                            {/* Dropdown 4: Content Supply Chain */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Content Supply Chain & Storage</span>
                              <select 
                                value={whatIfStorage}
                                onChange={e => setWhatIfStorage(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                <option value="adobe">Adobe GenStudio / AEM</option>
                                <option value="veeva_promomats">Veeva PromoMats / Veeva Vault</option>
                                <option value="sfmc">Salesforce Marketing Cloud Builder</option>
                                <option value="contentful">Contentful Headless CMS</option>
                                <option value="s3">Google Cloud Storage / Custom S3</option>
                              </select>
                            </div>

                          </div>"""

replacement_dropdown_grid = """                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.62rem' }}>
                            
                            {/* Dropdown 1: AI Orchestration & Gateway */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>AI Orchestration & Gateway</span>
                              <select 
                                value={whatIfOrch}
                                onChange={e => setWhatIfOrch(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="aws">LangGraph + AWS AgentCore (Confirmed Foundation)</option>
                                <option value="kong">Kong AI Gateway (Confirmed Foundation)</option>
                                <option value="google">Google Vertex AI / Gemini Enterprise (Strategic Candidate)</option>
                              </select>
                            </div>

                            {/* Dropdown 2: Zero-Trust Identity (IAM) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Zero-Trust Identity (IAM)</span>
                              <select 
                                value={whatIfIdentity}
                                onChange={e => setWhatIfIdentity(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                <option value="okta">Okta Workforce Identity Cloud</option>
                                <option value="ping">AWS IAM + Ping Identity (Day-1 Candidate)</option>
                                <option value="google_id">Google Cloud Identity</option>
                              </select>
                            </div>

                            {/* Dropdown 3: Data Federation & Memory */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Data Federation & Memory</span>
                              <select 
                                value={whatIfFederation}
                                onChange={e => setWhatIfFederation(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="databricks_data">Databricks (Data Genie) (Confirmed Foundation)</option>
                                <option value="mcp">Model Context Protocol (MCP) (Strategic Candidate)</option>
                                <option value="dynamodb">Amazon DynamoDB (Manifest Store Candidate)</option>
                                <option value="webhooks">Custom API Webhooks</option>
                                <option value="etl">Scheduled Batch ETL</option>
                              </select>
                            </div>

                            {/* Dropdown 4: Creative Intake (Grayed if 2026 Scope) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', opacity: scopeConstraint === '2026' ? 0.65 : 1 }}>
                              <span style={{ fontWeight: 800, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                                Creative Intake & DAM {scopeConstraint === '2026' && '🔒'}
                              </span>
                              <select 
                                value={whatIfCreative}
                                onChange={e => {
                                  if (scopeConstraint === '2026') {
                                    alert("⚠️ Locked: Advanced creative asset integrations are scheduled for Day-Two (2027+) scale!");
                                  } else {
                                    setWhatIfCreative(e.target.value);
                                  }
                                }}
                                disabled={scopeConstraint === '2026'}
                                style={{ background: scopeConstraint === '2026' ? '#f8fafc' : '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: scopeConstraint === '2026' ? 'not-allowed' : 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="firefly">Adobe Firefly + AEM Assets (DAM)</option>
                                <option value="workfront">Adobe Workfront (Intake Candidate)</option>
                              </select>
                            </div>

                            {/* Dropdown 5: MLR Source of Record */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>MLR Source of Record & Guardrails</span>
                              <select 
                                value={whatIfMLR}
                                onChange={e => setWhatIfMLR(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="veeva_promomats">Veeva PromoMats (Claims/Registration Candidate)</option>
                                <option value="custom_mlr">Bedrock + Custom MLR Rule Set</option>
                              </select>
                            </div>

                          </div>"""

if old_dropdown_grid_on_disk in code:
    code = code.replace(old_dropdown_grid_on_disk, replacement_dropdown_grid)
    print("✓ Successfully patched dropdown selectors split!")
else:
    print("❌ old_dropdown_grid_on_disk not found!")


# =========================================================================
# STEP 8: INJECT EXPANDED CALCULATOR METRICS & RACI WARNINGS
# =========================================================================
old_scorecard_outputs = """                        {/* Symmetrical Dynamic Score Outputs */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', borderTop: '1px solid rgba(15,23,42,0.08)', paddingTop: '0.65rem', textAlign: 'center' }}>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>3-Year TCO ($M)</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>${finalTCO}M</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Months to MVP</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>{finalMonths}mo</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>GxP Score</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>{finalGxP}/100</span>
                          </div>
                        </div>"""

replacement_scorecard_outputs = """                        {/* Symmetrical Dynamic Score Outputs Row 1 */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.45rem', borderTop: '1px solid rgba(15,23,42,0.08)', paddingTop: '0.65rem', textAlign: 'center' }}>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>3-Year TCO ($M)</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>${finalTCO}M</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Months to MVP</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>{finalMonths}mo</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>GxP Score</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>{finalGxP}/100</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Rule Codification</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: whatIfMLR === 'veeva_promomats' ? '#0d9488' : '#ef4444', display: 'block', marginTop: '0.1rem' }}>
                              {whatIfMLR === 'veeva_promomats' ? '92%' : '< 30%'}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Watchdog Safety</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: whatIfOrch === 'aws' || whatIfOrch === 'google' ? '#0d9488' : '#ef4444', display: 'block', marginTop: '0.1rem' }}>
                              {whatIfOrch === 'aws' || whatIfOrch === 'google' ? '96/100' : whatIfOrch === 'kong' ? '82/100' : '35/100'}
                            </span>
                          </div>
                        </div>

                        {/* RACI & Operational Drag Warnings Banner */}
                        <div style={{ background: whatIfMLR === 'custom_mlr' ? 'rgba(239, 68, 68, 0.04)' : 'rgba(13, 148, 136, 0.04)', border: `1px solid ${whatIfMLR === 'custom_mlr' ? '#ef4444' : '#0d9488'}`, borderRadius: '6px', padding: '0.45rem', marginTop: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.1rem', textAlign: 'left' }}>
                          <span style={{ fontSize: '0.52rem', fontWeight: 950, color: whatIfMLR === 'custom_mlr' ? '#ef4444' : '#0d9488', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {whatIfMLR === 'custom_mlr' ? '⚠️ RACI & Capacity Impact Warning' : '✓ RACI Operational Efficiency'}
                          </span>
                          <p style={{ margin: 0, fontSize: '0.58rem', color: '#0f172a', lineHeight: 1.35 }}>
                            {whatIfMLR === 'custom_mlr' 
                              ? '⚠️ High Dependency: Requires dedicated capacity from reviewer functions, brand, and marketing ops to manually validate rules against historical context.'
                              : '✓ Low Operational Drag: Automated exception gates minimize manual regulatory reviewer overhead and eliminate pipeline delays.'}
                          </p>
                        </div>"""

if old_scorecard_outputs in code:
    code = code.replace(old_scorecard_outputs, replacement_scorecard_outputs)
    print("✓ Successfully patched scorecard metrics and warnings banner!")
else:
    print("❌ old_scorecard_outputs not found!")

# Write everything back
with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
