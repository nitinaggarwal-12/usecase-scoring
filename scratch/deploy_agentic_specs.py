import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update the Executive Diagnostic Narrative pitch on Page 1 (The Control Tower)
target_narrative = """                    <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>EXECUTIVE DIAGNOSTIC NARRATIVE</span>
                      <p style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                        {liveSynthesis?.executiveSummary?.rationale || `V12 diagnostic compiles an overall C-Suite readiness score of ${scoringData.overallScore} out of 5.0. Capability & GxP Compliance is scored at ${scoringData.capabilityScore}, and Implementation Feasibility is scored at ${scoringData.feasibilityScore}. Target Google Cloud architecture secures sovereign patient-health perimeters while accelerating January 2027 MVP launch timelines.`}
                      </p>
                    </div>"""

replacement_narrative = """                    <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>EXECUTIVE DIAGNOSTIC NARRATIVE</span>
                      <p style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                        <strong>By adopting Google's Agentic Resource Discovery (ARD) and MCP specifications, Merck is not "building a custom app." We are deploying a self-assembling AI mesh.</strong> The Gemini Managed Agents will dynamically discover and utilize Veeva and Adobe resources via A2A protocols, eliminating millions in custom integration costs while preventing vendor lock-in.
                      </p>
                    </div>"""

code = code.replace(target_narrative, replacement_narrative)

# 2. Update the Page 8 What-If Sandbox logic to slash the SI Budget threshold and display the Google Agentic spec active message
target_whatif_sandbox_logic = """                  const finalTCO = Math.round((costSum + frictionPenalty - synergyDiscount) * 10) / 10;
                  const finalMonths = Math.max(3, mvpBase + mvpAdjustment);
                  const finalGxP = Math.min(100, Math.round(gxpSum));
                  const finalAgility = Math.min(100, Math.round(agilitySum));
                  const finalCostEfficiency = Math.min(100, Math.round(100 - (finalTCO / 10.0) * 100));"""

replacement_whatif_sandbox_logic = """                  // 2026 Google Agentic Specifications: MCP + OKF + ARD Slashes Build Threshold to $100K
                  const isGoogleAgenticSpecActive = whatIfOrch === 'google' && whatIfFederation === 'mcp';
                  const minBuildBudgetLimit = isGoogleAgenticSpecActive ? 100 : 220;

                  // Synergy 3: Google Agentic Spec TCO Slasher
                  if (isGoogleAgenticSpecActive) {
                    synergyDiscount += costSum * 0.22; // Additional 22% TCO savings
                    mvpAdjustment = Math.max(-4, mvpAdjustment - 2); // Shaves off another 2 months (A2UI & Managed Agents)
                    activeWarnings.push({ type: 'synergy', text: '✓ Google Agentic Spec Active (ARD + MCP + A2UI): Slashes SI build budget requirements by 60% and eliminates post-launch API maintenance debt.' });
                  }

                  const finalTCO = Math.round((costSum + frictionPenalty - synergyDiscount) * 10) / 10;
                  const finalMonths = Math.max(3, mvpBase + mvpAdjustment);
                  const finalGxP = Math.min(100, Math.round(gxpSum));
                  const finalAgility = Math.min(100, Math.round(agilitySum));
                  const finalCostEfficiency = Math.min(100, Math.round(100 - (finalTCO / 10.0) * 100));"""

code = code.replace(target_whatif_sandbox_logic, replacement_whatif_sandbox_logic)

# Replace the SI Budget failure conditional in Page 8
target_whatif_budget_failure = """                      {siBudgetSlider < 220 ? (
                        <div style={{ background: 'rgba(225, 29, 72, 0.05)', border: `1.2px solid ${colors.accentCoral}`, borderRadius: '6px', padding: '0.45rem', fontSize: '0.65rem', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                          <ShieldAlert size={16} style={{ color: colors.accentCoral, flexShrink: 0, marginTop: '0.05rem' }} />
                          <div>
                            <span style={{ fontWeight: 900, color: colors.accentCoral, display: 'block' }}>❌ FAILURE: INSUFFICIENT BUDGET FOR BUILD</span>
                            <span style={{ color: '#cbd5e1', display: 'block', marginTop: '0.1rem', lineHeight: 1.3 }}>
                              Developing a custom federated orchestration mesh requires at least **$220K in SI build budget** to cover custom connectors and GxP validation. Drag SI Budget up to revive Google Custom Mesh.
                            </span>
                          </div>
                        </div>
                      ) : ("""

replacement_whatif_budget_failure = """                      {siBudgetSlider < minBuildBudgetLimit ? (
                        <div style={{ background: 'rgba(225, 29, 72, 0.05)', border: `1.2px solid ${colors.accentCoral}`, borderRadius: '6px', padding: '0.45rem', fontSize: '0.65rem', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                          <ShieldAlert size={16} style={{ color: colors.accentCoral, flexShrink: 0, marginTop: '0.05rem' }} />
                          <div>
                            <span style={{ fontWeight: 900, color: colors.accentCoral, display: 'block' }}>❌ FAILURE: INSUFFICIENT BUDGET FOR BUILD</span>
                            <span style={{ color: '#0f172a', display: 'block', marginTop: '0.1rem', lineHeight: 1.3 }}>
                              {isGoogleAgenticSpecActive 
                                ? "Developing a custom mesh with Google Agentic Specs requires a minimum SI budget of **$100K**. Drag SI Budget up to enable."
                                : "Developing a custom federated orchestration mesh requires at least **$220K in SI build budget** to cover custom connectors and GxP validation. Drag SI Budget up to revive Google Custom Mesh."
                              }
                            </span>
                          </div>
                        </div>
                      ) : ("""

code = code.replace(target_whatif_budget_failure, replacement_whatif_budget_failure)

# 3. Add the 6th framework tab (Future-Proofing Radar Chart) to Page 9
target_analytical_framework_tabs = """                  {[
                    { id: 'hype', label: '1. Gartner Hype Cycle' },
                    { id: 'capabilities', label: '2. Critical Capabilities (Harvey Balls)' },
                    { id: 'horizons', label: '3. McKinsey Three Horizons' },
                    { id: 'wave', label: '4. Forrester Wave Model' },
                    { id: 'wardley', label: '5. Wardley Strategic Map' }
                  ].map(tab => ("""

replacement_analytical_framework_tabs = """                  {[
                    { id: 'hype', label: '1. Gartner Hype Cycle' },
                    { id: 'capabilities', label: '2. Critical Capabilities (Harvey Balls)' },
                    { id: 'horizons', label: '3. McKinsey Three Horizons' },
                    { id: 'wave', label: '4. Forrester Wave Model' },
                    { id: 'wardley', label: '5. Wardley Strategic Map' },
                    { id: 'radar', label: '6. Future-Proofing Radar' }
                  ].map(tab => ("""

code = code.replace(target_analytical_framework_tabs, replacement_analytical_framework_tabs)

# Add the Radar Chart SVG visualizer block inside Page 9
target_wardley_svg = """                          {/* Dependency Lines */}
                          <line x1="120" y1="46" x2="210" y2="104" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="2" />
                          <line x1="210" y1="116" x2="280" y2="174" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="2" />

                          <text x="15" y="25" fill="#64748b" fontSize="6" fontWeight="bold">Y-AXIS: VALUE TO USER / COMPILATION LEVEL</text>
                        </svg>
                      )}"""

radar_svg_code = """                          {/* Dependency Lines */}
                          <line x1="120" y1="46" x2="210" y2="104" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="2" />
                          <line x1="210" y1="116" x2="280" y2="174" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="2" />

                          <text x="15" y="25" fill="#64748b" fontSize="6" fontWeight="bold">Y-AXIS: VALUE TO USER / COMPILATION LEVEL</text>
                        </svg>
                      )}

                      {/* 6. Future-Proofing Radar Chart (Google ARD vs. AWS/Veeva Locked) */}
                      {activeFrameworkTab === 'radar' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Radial Background Grid */}
                          <polygon points="160,20 260,90 220,190 100,190 60,90" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                          <polygon points="160,50 235,100 205,170 115,170 85,100" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                          <polygon points="160,80 210,110 190,150 130,150 110,110" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />

                          {/* Vertices Axis Lines */}
                          <line x1="160" y1="100" x2="160" y2="20" stroke="rgba(15,23,42,0.06)" />
                          <line x1="160" y1="100" x2="260" y2="90" stroke="rgba(15,23,42,0.06)" />
                          <line x1="160" y1="100" x2="220" y2="190" stroke="rgba(15,23,42,0.06)" />
                          <line x1="160" y1="100" x2="100" y2="190" stroke="rgba(15,23,42,0.06)" />
                          <line x1="160" y1="100" x2="60" y2="90" stroke="rgba(15,23,42,0.06)" />

                          {/* Axis Labels */}
                          <text x="160" y="15" fill="#475569" fontSize="5.5" fontWeight="bold" textAnchor="middle">Dynamic Discovery</text>
                          <text x="268" y="93" fill="#475569" fontSize="5.5" fontWeight="bold">Federated Grounding</text>
                          <text x="225" y="198" fill="#475569" fontSize="5.5" fontWeight="bold">UI Embeddability</text>
                          <text x="95" y="198" fill="#475569" fontSize="5.5" fontWeight="bold" textAnchor="end">Security Identity</text>
                          <text x="52" y="93" fill="#475569" fontSize="5.5" fontWeight="bold" textAnchor="end">Ecosystem Lock-in</text>

                          {/* Polygon 1: Google ARD Stack (Teal - High Flexibility) */}
                          <polygon 
                            points="160,25 255,92 215,182 106,181 65,85" 
                            fill="rgba(13, 148, 136, 0.08)" 
                            stroke="#0d9488" 
                            strokeWidth="2" 
                            style={{ cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Google Cloud ARD Stack', phase: 'Composable Ecosystem (High Flexibility)', readiness: 'Overall Score: 94%', desc: 'Google Cloud Agentic specifications (ARD, MCP, A2UI) provide unparalleled flexibility. Eliminates static API wrappers via self-assembling discoverable mesh, keeping vendor lock-in to an absolute minimum.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />

                          {/* Polygon 2: AWS/Veeva Locked Stack (Orange - Siloed) */}
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

code = code.replace(target_wardley_svg, radar_svg_code)

# Update the Procurement Conclusion text for the Radar chart on Page 9
target_procurement_conclusion = """                        {activeFrameworkTab === 'wave' && "The Forrester Wave visually justifies to procurement why choosing established mega-vendors (Google/AWS) reduces enterprise scale risk, whereas startup orchestrators introduce support debt."}
                        {activeFrameworkTab === 'wardley' && "The Wardley Map proves to the CIO exactly where engineering hours should be spent. Do not spend SI budget custom-building utilities; spend it custom-building the GxP MLR routing logic that creates value."}"""

replacement_procurement_conclusion = """                        {activeFrameworkTab === 'wave' && "The Forrester Wave visually justifies to procurement why choosing established mega-vendors (Google/AWS) reduces enterprise scale risk, whereas startup orchestrators introduce support debt."}
                        {activeFrameworkTab === 'wardley' && "The Wardley Map proves to the CIO exactly where engineering hours should be spent. Do not spend SI budget custom-building utilities; spend it custom-building the GxP MLR routing logic that creates value."}
                        {activeFrameworkTab === 'radar' && "The Future-Proofing Radar Chart highlights the massive operational contrast between the Google ARD composable mesh and the rigid, proprietary AWS/Veeva locked stack."}"""

code = code.replace(target_procurement_conclusion, replacement_procurement_conclusion)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully injected Google 2026 Agentic specifications (ARD, MCP, A2UI) and Future-Proofing Radar Chart!")
