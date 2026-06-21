import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add the Sidebar navigation item for Tab 12
target_sidebar = """              <div 
                onClick={() => setReportPage('moonshot')} 
                className={`v12-sidebar-nav-item ${reportPage === 'moonshot' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'moonshot' ? colors.accentTeal : '#475569' }}
              >
                <Layers size={15} style={{ color: colors.accentTeal }} />
                <span>11. Merck Moonshot Layers</span>
              </div>"""

replacement_sidebar = """              <div 
                onClick={() => setReportPage('moonshot')} 
                className={`v12-sidebar-nav-item ${reportPage === 'moonshot' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'moonshot' ? colors.accentTeal : '#475569' }}
              >
                <Layers size={15} style={{ color: colors.accentTeal }} />
                <span>11. Merck Moonshot Layers</span>
              </div>
              <div 
                onClick={() => setReportPage('resilience')} 
                className={`v12-sidebar-nav-item ${reportPage === 'resilience' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'resilience' ? colors.accentTeal : '#475569' }}
              >
                <ShieldCheck size={15} style={{ color: colors.accentTeal }} />
                <span>12. Ecosystem Resilience Report</span>
              </div>"""

code = code.replace(target_sidebar, replacement_sidebar)

# 2. Add the title text sync in the header
target_title = """                  {reportPage === 'operational' && "C-Suite Operational Readiness: Legal Risk & Talent Mapping."}
                  {reportPage === 'moonshot' && "Merck Moonshot Layers: 9-Layer Composable Architecture."}"""

replacement_title = """                  {reportPage === 'operational' && "C-Suite Operational Readiness: Legal Risk & Talent Mapping."}
                  {reportPage === 'moonshot' && "Merck Moonshot Layers: 9-Layer Composable Architecture."}
                  {reportPage === 'resilience' && "Ecosystem Resilience: What-If Day-Two Architecture Audit."}"""

code = code.replace(target_title, replacement_title)

# 3. Insert Page 12: Ecosystem Resilience Report
target_moonshot_page = """            {/* =========================================================================
            // PAGE 11: MERCK MOONSHOT LAYERS (9-LAYER COMPOSABLE ARCHITECTURE COMPARISON)
            // ========================================================================= */}
            {reportPage === 'moonshot' && ("""

resilience_page_code = """            {/* =========================================================================
            // PAGE 12: ECOSYSTEM RESILIENCE REPORT (DYNAMIC ARCHITECTURAL AUDIT)
            // ========================================================================= */}
            {reportPage === 'resilience' && (() => {
              // Extract active sandbox selections from state
              const selectedOrch = whatIfOrch || 'google';
              const selectedId = whatIfIdentity || 'entra';
              const selectedFed = whatIfFederation || 'mcp';
              const selectedStore = whatIfStorage || 'adobe';

              // Dynamic evaluation engine for McKinsey Resilience Report
              let verdictTitle = '';
              let verdictText = '';
              let busScore = 'Med';
              let busRationale = '';
              let watchdogScore = 'Med';
              let watchdogRationale = '';
              let magmaScore = 'Med';
              let magmaRationale = '';
              let synergies = [];
              let friction = [];
              let recommendation = '';

              // Check for Scenario A: Google All-In Native Stack
              const isGoogleNativeStack = selectedOrch === 'google' && selectedId === 'google_id' && selectedFed === 'google_bq';
              
              // Check for Scenario B: Highly Regulated Composable Stack
              const isRegulatedComposable = selectedOrch === 'aws' && selectedId === 'ping' && selectedFed === 'databricks_data' && selectedStore === 'veeva_promomats';

              // Check for Scenario C: Creative & Agentic Hybrid
              const isCreativeHybrid = selectedOrch === 'azure' && selectedId === 'okta' && selectedFed === 'mcp' && selectedStore === 'adobe';

              if (isGoogleNativeStack) {
                verdictTitle = '✓ STABLE DAY-ONE VALUE (NATIVE HIGH SYNERGY)';
                verdictText = 'This native Google Cloud architecture achieves near-zero integration debt and flawless day-two governance. By running managed agentic meshes over BigQuery data lakes, the swarm communicates with maximum fidelity, eliminating custom translation middleware and loop risks.';
                busScore = 'High';
                busRationale = 'Native Vertex AI routing and BigQuery zero-ETL integration guarantee absolute context fidelity across all agent hops.';
                watchdogScore = 'High';
                watchdogRationale = 'Vertex AI Model Armor provides out-of-the-box Policy-as-Code interception, preventing tokenomics loops and safety leaks.';
                magmaScore = 'High';
                magmaRationale = 'BigQuery semantic tables and Vertex AI Search facilitate unified, systemic learning across the multi-agent swarm.';
                synergies = [
                  'Google Cloud Identity + Vertex AI: Seamless IAM token propagation, cutting implementation overhead by 40%.',
                  'BigQuery Zero-ETL + Gemini: Real-time clinical claims grounding with zero data replication lag.'
                ];
                friction = [
                  'Content Workflow Friction: High-fidelity creative assets stored in Google Cloud Storage may face sync latency with external Adobe design systems.',
                  'Ecosystem Lock-in: Going all-in on the native Google stack reduces cross-cloud flexibility, although it maximizes speed-to-value.'
                ];
                recommendation = 'Proceed immediately. This native stack represents the fastest, most secure, and most cost-effective path to a GxP-compliant production deployment.';
              } 
              else if (isRegulatedComposable) {
                verdictTitle = '⚠️ STABLE DAY-TWO GOVERNANCE (HIGH COMPLIANCE CEILING)';
                verdictText = 'This architecture delivers maximum compliance and governance (98/100 GxP ceiling) suitable for strict clinical environments. However, it carries substantial integration debt. Linking Bedrock, Ping, and Databricks requires custom API adapters, increasing maintenance debt.';
                busScore = 'Med';
                busRationale = 'Custom translation wrappers between Bedrock and Databricks introduce minor context degradation during multi-agent hops.';
                watchdogScore = 'High';
                watchdogRationale = 'Veeva Vault and Ping Identity provide rigid, GxP-validated access gates, but custom watchdog loops are needed for Bedrock.';
                magmaScore = 'High';
                magmaRationale = 'Databricks Unity Catalog provides excellent, centralized data governance and systemic learning hooks.';
                synergies = [
                  'Databricks + Bedrock: Strong custom fine-tuning capabilities over proprietary clinical datasets.',
                  'Veeva Vault + Ping Identity: Highly secure federated authentication, matching strict MLR guidelines.'
                ];
                friction = [
                  'High Integration Debt: Linking Bedrock, Ping, and Databricks requires custom API adapters, increasing maintenance debt.',
                  'Tokenomics Vulnerability: Lacking an active watchdog gateway exposes the system to runaway agent loops during peak MLR review times.'
                ];
                recommendation = 'Pivot or Introduce Middleware. We strongly recommend introducing a dedicated API Gateway (like Kong AI Gateway) to act as a secure Watchdog layer before proceeding.';
              } 
              else if (isCreativeHybrid) {
                verdictTitle = '✓ EXCELLENT CREATIVE VELOCITY (AGILE HYBRID)';
                verdictText = 'This stack provides outstanding creative workflow velocity and flexible identity management, making it highly attractive for marketing swarms. However, data federation may suffer from minor latency if legacy data sources lack native MCP support.';
                busScore = 'High';
                busRationale = 'Model Context Protocol (MCP) standardizes model-to-data communication, ensuring excellent fidelity.';
                watchdogScore = 'Med';
                watchdogRationale = 'Azure AI Studio provides robust safety filters, but lacks automated tokenomics circuit breakers for custom swarms.';
                magmaScore = 'Med';
                magmaRationale = 'Okta provides excellent federated identity, but memory schemas are fragmented across Adobe AEM and Azure storage.';
                synergies = [
                  'Okta + Azure OpenAI: Flexible, federated access control across external creative agencies.',
                  'MCP + Adobe GenStudio: Direct, real-time creative asset and design system metadata indexing.'
                ];
                friction = [
                  'Data Federation Latency: Potential indexing friction if legacy claims databases do not natively support MCP ports.',
                  'Identity Fragment: Separate identity directories between Okta and Azure tenant boundaries require custom sync intervals.'
                ];
                recommendation = 'Proceed with Caution. Introduce a dedicated vector claims database (like BigQuery) to ground the MCP layer and prevent compliance drift.';
              } 
              else {
                // Default / Composable Custom evaluation
                verdictTitle = '⚠️ RISKS DAY-TWO CHAOS (HIGH INTEGRATION DEBT)';
                verdictText = 'While highly composable, this custom stack carries substantial integration debt and lacks a unified watchdog governance layer. Swapping disparate vendors across all 4 pillars increases API translation overhead, exposing the swarm to tokenomics loops and context drift.';
                busScore = 'Low';
                busRationale = `Custom translation middleware between ${selectedOrch.toUpperCase()} and ${selectedFed.toUpperCase()} increases data loss risks during multi-agent hops.`;
                watchdogScore = 'Low';
                watchdogRationale = `Lacks a unified Policy-as-Code security gateway. Running ${selectedOrch.toUpperCase()} without managed guardrails requires writing thousands of lines of custom loop code.`;
                magmaScore = 'Med';
                magmaRationale = `Multi-graph memory is siloed between ${selectedFed.toUpperCase()} and ${selectedStore.toUpperCase()}, restricting systemic learning across the swarm.`;
                synergies = [
                  'Agile Vendor Choice: Custom selection avoids vendor lock-in, allowing procurement to negotiate rates.',
                  'Specialized Pillars: Each component represents a best-of-breed solution for its specific technical silo.'
                ];
                friction = [
                  `API Translation Debt: Integrating ${selectedOrch.toUpperCase()} with ${selectedFed.toUpperCase()} requires manual API wrappers, increasing maintenance debt.`,
                  `Runaway Tokenomics Risk: Lacking an active Watchdog gateway exposes the swarm to infinite loop risks during peak MLR review hours.`
                ];
                recommendation = 'Pivot to Native or Introduce a Gateway. We strongly recommend migrating to Kong AI Gateway or Google Vertex AI to establish a secure, GxP-validated Watchdog layer.';
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* Executive Summary Card */}
                  <div className="v12-card-glass" style={{ borderLeft: `4px solid ${busScore === 'High' ? colors.accentTeal : colors.accentCoral}`, background: '#ffffff', padding: '0.8rem 1.2rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.55rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>
                      WHAT-IF ECOSYSTEM RESILIENCE AUDIT
                    </span>
                    <h3 style={{ margin: '0.15rem 0 0.35rem 0', fontSize: '0.92rem', fontWeight: 950, color: busScore === 'High' ? colors.accentTeal : colors.accentCoral }}>
                      {verdictTitle}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.72rem', color: '#475569', lineHeight: 1.45 }}>
                      {verdictText}
                    </p>
                  </div>

                  {/* Symmetrical Split: Ecosystem Health Matrix vs. Synergy & Friction Feed */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                    
                    {/* Left Column: Ecosystem Health Matrix */}
                    <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.3rem', display: 'block' }}>
                        DIGITAL WORKFORCE HEALTH MATRIX
                      </span>

                      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem', textAlign: 'left' }}>
                          <thead>
                            <tr style={{ borderBottom: '2px solid rgba(15,23,42,0.1)', color: '#475569', fontWeight: 800 }}>
                              <th style={{ padding: '0.45rem' }}>ECOSYSTEM METRIC</th>
                              <th style={{ padding: '0.45rem', textAlign: 'center', width: '80px' }}>SCORE</th>
                              <th style={{ padding: '0.45rem' }}>ARCHITECTURAL RATIONALE</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                            {/* Bus Context Fidelity */}
                            <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                              <td style={{ padding: '0.6rem 0.45rem', fontWeight: 800, color: '#0f172a' }}>
                                Bus Context Fidelity
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', textAlign: 'center' }}>
                                <span style={{ 
                                  fontSize: '0.55rem', 
                                  background: busScore === 'High' ? 'rgba(13, 148, 136, 0.1)' : busScore === 'Med' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(225, 29, 72, 0.1)', 
                                  color: busScore === 'High' ? colors.accentTeal : busScore === 'Med' ? colors.accentAmber : colors.accentCoral, 
                                  padding: '0.1rem 0.4rem', 
                                  borderRadius: '3px', 
                                  fontWeight: 900 
                                }}>
                                  {busScore.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', color: '#475569', lineHeight: 1.3 }}>
                                {busRationale}
                              </td>
                            </tr>

                            {/* Watchdog Autonomy */}
                            <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                              <td style={{ padding: '0.6rem 0.45rem', fontWeight: 800, color: '#0f172a' }}>
                                Watchdog Autonomy
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', textAlign: 'center' }}>
                                <span style={{ 
                                  fontSize: '0.55rem', 
                                  background: watchdogScore === 'High' ? 'rgba(13, 148, 136, 0.1)' : watchdogScore === 'Med' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(225, 29, 72, 0.1)', 
                                  color: watchdogScore === 'High' ? colors.accentTeal : watchdogScore === 'Med' ? colors.accentAmber : colors.accentCoral, 
                                  padding: '0.1rem 0.4rem', 
                                  borderRadius: '3px', 
                                  fontWeight: 900 
                                }}>
                                  {watchdogScore.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', color: '#475569', lineHeight: 1.3 }}>
                                {watchdogRationale}
                              </td>
                            </tr>

                            {/* MAGMA Readiness */}
                            <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                              <td style={{ padding: '0.6rem 0.45rem', fontWeight: 800, color: '#0f172a' }}>
                                MAGMA Readiness
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', textAlign: 'center' }}>
                                <span style={{ 
                                  fontSize: '0.55rem', 
                                  background: magmaScore === 'High' ? 'rgba(13, 148, 136, 0.1)' : magmaScore === 'Med' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(225, 29, 72, 0.1)', 
                                  color: magmaScore === 'High' ? colors.accentTeal : magmaScore === 'Med' ? colors.accentAmber : colors.accentCoral, 
                                  padding: '0.1rem 0.4rem', 
                                  borderRadius: '3px', 
                                  fontWeight: 900 
                                }}>
                                  {magmaScore.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', color: '#475569', lineHeight: 1.3 }}>
                                {magmaRationale}
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Right Column: Active Synergy & Friction Feed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                      
                      {/* Synergies Card */}
                      <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto' }} className="v12-scrollable">
                        <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                          ACTIVE SYSTEM SYNERGIES
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.15rem' }}>
                          {synergies.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.65rem', color: '#475569', lineHeight: 1.35 }}>
                              <span style={{ fontWeight: 900, color: colors.accentTeal }}>✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Friction & Risks Card */}
                      <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto' }} className="v12-scrollable">
                        <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentCoral, letterSpacing: '0.5px' }}>
                          ECOSYSTEM FRICTION & RISKS
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.15rem' }}>
                          {friction.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.65rem', color: '#475569', lineHeight: 1.35 }}>
                              <span style={{ fontWeight: 900, color: colors.accentCoral }}>⚠️</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strategic Recommendation Card */}
                      <div className="v12-card-glass" style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'rgba(13, 148, 136, 0.02)', border: `1.2px solid ${colors.accentTeal}` }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                          THE C-SUITE RECOMMENDATION
                        </span>
                        <p style={{ margin: 0, fontSize: '0.65rem', color: '#0f172a', lineHeight: 1.4, fontWeight: 700 }}>
                          {recommendation}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })()}
"""

code = code.replace(target_moonshot_page, resilience_page_code + "\n" + target_moonshot_page)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully injected the Ecosystem Resilience Report page!")
