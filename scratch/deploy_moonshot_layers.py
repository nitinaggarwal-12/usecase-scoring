import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add state variables for the Moonshot Layers accordion
target_state_vars = """  // C-Suite Operational Readiness States
  const [changeManagementOption, setChangeManagementOption] = useState('teams'); // 'portal' | 'teams' | 'veeva'
  const [njAuditTrailEnabled, setNjAuditTrailEnabled] = useState(true);"""

replacement_state_vars = """  // C-Suite Operational Readiness States
  const [changeManagementOption, setChangeManagementOption] = useState('teams'); // 'portal' | 'teams' | 'veeva'
  const [njAuditTrailEnabled, setNjAuditTrailEnabled] = useState(true);

  // Merck Moonshot Layers Active State
  const [expandedMoonshotLayerId, setExpandedMoonshotLayerId] = useState(1);"""

code = code.replace(target_state_vars, replacement_state_vars)

# 2. Add the Sidebar navigation item for Tab 11
target_sidebar = """              <div 
                onClick={() => setReportPage('operational')} 
                className={`v12-sidebar-nav-item ${reportPage === 'operational' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'operational' ? colors.accentTeal : '#475569' }}
              >
                <Users size={15} style={{ color: colors.accentTeal }} />
                <span>10. C-Suite Operational Readiness</span>
              </div>"""

replacement_sidebar = """              <div 
                onClick={() => setReportPage('operational')} 
                className={`v12-sidebar-nav-item ${reportPage === 'operational' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'operational' ? colors.accentTeal : '#475569' }}
              >
                <Users size={15} style={{ color: colors.accentTeal }} />
                <span>10. C-Suite Operational Readiness</span>
              </div>
              <div 
                onClick={() => setReportPage('moonshot')} 
                className={`v12-sidebar-nav-item ${reportPage === 'moonshot' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'moonshot' ? colors.accentTeal : '#475569' }}
              >
                <Layers size={15} style={{ color: colors.accentTeal }} />
                <span>11. Merck Moonshot Layers</span>
              </div>"""

code = code.replace(target_sidebar, replacement_sidebar)

# 3. Add the title text sync in the header
target_title = """                  {reportPage === 'analytics' && "McKinsey-Gartner Analytical Strategy Frameworks."}
                  {reportPage === 'operational' && "C-Suite Operational Readiness: Legal Risk & Talent Mapping."}"""

replacement_title = """                  {reportPage === 'analytics' && "McKinsey-Gartner Analytical Strategy Frameworks."}
                  {reportPage === 'operational' && "C-Suite Operational Readiness: Legal Risk & Talent Mapping."}
                  {reportPage === 'moonshot' && "Merck Moonshot Layers: 9-Layer Composable Architecture."}"""

code = code.replace(target_title, replacement_title)

# 4. Insert Page 11: Merck Moonshot Layers
target_operational_page = """            {/* =========================================================================
            // PAGE 10: C-SUITE OPERATIONAL READINESS & LEGAL RISK
            // ========================================================================= */}
            {reportPage === 'operational' && ("""

moonshot_page_code = """            {/* =========================================================================
            // PAGE 11: MERCK MOONSHOT LAYERS (9-LAYER COMPOSABLE ARCHITECTURE COMPARISON)
            // ========================================================================= */}
            {reportPage === 'moonshot' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* Left Column: Vertical Accordion of 9 Moonshot Layers */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', overflowY: 'auto' }} className="v12-scrollable">
                    <span style={{ fontSize: '0.65rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem', display: 'block' }}>
                      THE 9 CORE ARCHITECTURAL MOONSHOT LAYERS
                    </span>

                    {(() => {
                      const layers = [
                        { id: 1, name: '1. Experience Layer (UI)', rec: 'Adobe GenStudio + Google A2UI' },
                        { id: 2, name: '2. Context & Semantic Layer', rec: 'Google Sentinel + ADK SkillToolset' },
                        { id: 3, name: '3. Claims Library & Data Platform', rec: 'Databricks & Veeva via MCP' },
                        { id: 4, name: '4. Cognitive Engine (LLM)', rec: 'Google Model Garden (Gemini 3.1 Pro)' },
                        { id: 5, name: '5. Orchestration Runtime', rec: 'ADK 2.0 on Agent Runtime' },
                        { id: 6, name: '6. Trace & State Storage', rec: 'Cloud Trace + Firestore (via ADK)' },
                        { id: 7, name: '7. API Security Gateway', rec: 'Kong AI Gateway (Strict GA)' },
                        { id: 8, name: '8. Downstream Review', rec: 'Frame.io & Veeva via ADK HITL' },
                        { id: 9, name: '9. ModelOps & Quality', rec: 'ADK Eval Framework' }
                      ];

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.2rem' }}>
                          {layers.map(layer => {
                            const isExpanded = expandedMoonshotLayerId === layer.id;
                            return (
                              <div
                                key={layer.id}
                                onClick={() => setExpandedMoonshotLayerId(layer.id)}
                                style={{
                                  padding: '0.55rem 0.75rem',
                                  borderRadius: '6px',
                                  background: isExpanded ? 'rgba(13, 148, 136, 0.05)' : '#f8fafc',
                                  border: isExpanded ? `1.5px solid ${colors.accentTeal}` : '1px solid rgba(15, 23, 42, 0.08)',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease'
                                }}
                                className="v12-table-row-hover"
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: isExpanded ? colors.accentTeal : '#0f172a' }}>
                                    {layer.name}
                                  </span>
                                  <span style={{ fontSize: '0.52rem', background: isExpanded ? 'rgba(13, 148, 136, 0.15)' : 'rgba(15,23,42,0.04)', color: isExpanded ? colors.accentTeal : '#475569', padding: '0.08rem 0.35rem', borderRadius: '3px', fontWeight: 850 }}>
                                    {isExpanded ? 'ACTIVE' : 'SELECT'}
                                  </span>
                                </div>
                                <div style={{ fontSize: '0.58rem', color: '#475569', marginTop: '0.15rem' }}>
                                  Recommendation: <strong style={{ color: '#0f172a' }}>{layer.rec}</strong>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Right Column: Comparative Analytical Panels */}
                  {(() => {
                    const layersData = {
                      1: {
                        name: '1. Experience Layer (UI)',
                        adobe: { pros: 'GenStudio provides a ready-made, risk-free creative workspace.', cons: 'Closed ecosystem; extremely difficult to surface backend multi-agent telemetry natively.' },
                        aws: { pros: 'Total custom design freedom.', cons: 'Zero out-of-the-box UI frameworks. Requires a 100% custom frontend application build, blowing up the timeline.' },
                        gcp: { pros: 'Supports A2UI protocol to dynamically stream generative UIs directly from the agent backend.', cons: 'Requires configuring the ADK backend to stream the correct JSON components.' },
                        rec: 'Adobe GenStudio + Google A2UI',
                        benefits: 'Keeps marketers in their familiar Adobe tools while natively streaming agent telemetry and compliance dashboards to their screens without custom frontend coding.',
                        journey: [
                          'Marketer logs into Adobe GenStudio to initiate a campaign campaign.',
                          'Marketer inputs a natural language brief into the Gemini Enterprise App interface.',
                          'Developer configuration ensures the backend agent streams dynamic A2UI components (progress trackers, compliance scorecards) directly back to the UI.',
                          'Marketer interacts with these generative A2UI components to tweak targeting and review initial asset frameworks without leaving the creative workspace.'
                        ]
                      },
                      2: {
                        name: '2. Context & Semantic Layer',
                        adobe: { pros: 'Brand Intelligence enforces visual standards effectively.', cons: 'Incapable of parsing unstructured clinical rules or L3 strategic guidelines.' },
                        aws: { pros: 'Amazon Neptune offers a highly mature knowledge graph database.', cons: 'Requires building a custom regulatory rules engine from scratch.' },
                        gcp: { pros: 'Sentinel provides a pre-trained rules proxy; ADK SkillToolset loads specific rules on demand.', cons: 'Standard enterprise data ingestion cycles apply.' },
                        rec: 'Google Sentinel + ADK SkillToolset',
                        benefits: 'Avoids custom database builds entirely. Progressively loads MLR rules only when needed, which slashes LLM token costs and latency during the generation phase.',
                        journey: [
                          'Marketer provides the strategic campaign guidelines and L3 parameters in the brief.',
                          'Developer configures ADK SkillToolset to encapsulate complex MLR and Pharma rules as on-demand skills.',
                          'Backend Agent queries Google Sentinel to fetch the precise historical context and user preferences for the specific asset.',
                          'Backend Agent selectively activates the required rules via progressive disclosure to evaluate the brief while keeping token costs low.'
                        ]
                      },
                      3: {
                        name: '3. Claims Library & Data Platform',
                        adobe: { pros: 'Brand Library holds visual assets.', cons: 'Lacks a clinical claims registry or GxP vector search capabilities.' },
                        aws: { pros: 'Databricks (Data Genie) handles the enterprise data layer effectively.', cons: 'Sits outside the core AI loop, requiring custom RAG pipelines to connect.' },
                        gcp: { pros: 'Native support for the Model Context Protocol (MCP) to access enterprise data directly.', cons: 'Requires exposing Databricks/Veeva as MCP servers first.' },
                        rec: 'Databricks & Veeva via MCP',
                        benefits: 'Eliminates custom API webhook code. It securely connects the agent swarm directly to your existing Databricks and Veeva instances as standardized services.',
                        journey: [
                          'Developer registers Databricks (Data Genie) and Veeva PromoMats as MCP servers.',
                          'Marketer selects an audience segment (e.g., "pediatricians") via a drop-down menu in the UI.',
                          'Backend Agent queries the Databricks MCP server to retrieve the approved audience data profile.',
                          'Backend Agent queries the Veeva MCP server to fetch the exact, validated medical claims and citations required for that specific audience.'
                        ]
                      },
                      4: {
                        name: '4. Cognitive Engine (LLM)',
                        adobe: { pros: 'Firefly Services API is the market leader for visual asset generation.', cons: 'Lacks a foundational text reasoning model for deep regulatory and HTML syntax audits.' },
                        aws: { pros: 'Amazon Bedrock aggregates multiple third-party models to prevent lock-in.', cons: 'Adds cross-cloud network latency between the orchestration engine and the models.' },
                        gcp: { pros: 'Model Garden hosts Gemini 3.1 Pro (1M-token context) and Anthropic Claude.', cons: 'Requires enterprise rate-limit management.' },
                        rec: 'Google Model Garden',
                        benefits: 'Provides the massive 1M-token context window needed to swallow 30-page IVAs whole, while retaining model agnosticism via Claude without leaving the orchestration cloud.',
                        journey: [
                          'Marketer selects the asset type (e.g., a massive 30-page Interactive Visual Aid) for generation.',
                          'Backend Agent passes the entire IVA context, audience data, and MLR rules to Gemini 3.1 Pro via the Model Garden.',
                          'Gemini 3.1 Pro utilizes its 1M-token window to conduct simultaneous deep regulatory audits, copy generation, and syntax checks.',
                          'Backend Agent delegates visual generation tasks to Adobe Firefly to produce the required creative imagery.'
                        ]
                      },
                      5: {
                        name: '5. Orchestration Runtime',
                        adobe: { pros: 'Workfront offers top-tier enterprise project tracking.', cons: 'It is a monolithic task manager, not an autonomous agent runtime.' },
                        aws: { pros: 'LangGraph on AgentCore utilizes mature serverless computing primitives.', cons: 'Requires managing custom infrastructure and manually handling agent state logic.' },
                        gcp: { pros: 'ADK 2.0 Graph Workflows run natively on managed Agent Runtime with event-driven dormancy gates.', cons: 'ADK 2.0 introduces a learning curve for teams used to writing custom Python loops.' },
                        rec: 'ADK 2.0 on Agent Runtime',
                        benefits: 'Event-driven dormancy gates handle multi-day MLR pauses autonomously. The agents sleep and wake up natively, saving massive custom AWS EventBridge development time.',
                        journey: [
                          'Developer writes and deploys the ADK 2.0 Graph Workflow code natively to Google\'s managed Agent Runtime.',
                          'Marketer hits "Generate," triggering the multi-agent swarm (Spelling Agent, Medical Agent, Brand Agent) to evaluate the asset in parallel.',
                          'Backend Agent routes tasks deterministically; if a human review is needed, the ADK event-driven dormancy gate automatically hibernates the workflow.',
                          'Platform Engineer relies on the Agent Runtime to handle all auto-scaling and infrastructure provisioning transparently.'
                        ]
                      },
                      6: {
                        name: '6. Trace & State Storage',
                        adobe: { pros: 'Content Fragments track Adobe-specific modular content.', cons: 'Mathematically incompatible with backend multi-agent execution logs and cryptographic traces.' },
                        aws: { pros: 'DynamoDB is a highly scalable, enterprise-approved NoSQL database.', cons: 'Requires manually designing complex JSON partition schemas and mapping LLM memory states.' },
                        gcp: { pros: 'Cloud Trace provides deep observability; ADK Durable Memory natively snaps state to Firestore.', cons: 'Requires basic cloud partition alignment.' },
                        rec: 'Cloud Trace + Firestore (via ADK)',
                        benefits: 'Zero custom schema design required. It natively writes agent state to Firestore and pushes execution spans to Cloud Trace for instant, out-of-the-box visual debugging.',
                        journey: [
                          'Backend Agent initiates a session and assigns a cryptographic SPIFFE ID via Agent Identity to track all actions.',
                          'Backend Agent natively snaps its execution state, memory, and LLM context to Google Cloud Firestore without custom serialization.',
                          'Platform Engineer utilizes Google Cloud Trace to visually monitor the execution spans, tool calls, and debug any workflow bottlenecks in real-time.',
                          'MLR Reviewer benefits from an unbroken, auditable chain of evidence proving how the AI arrived at a specific claim.'
                        ]
                      },
                      7: {
                        name: '7. API Security Gateway',
                        adobe: { pros: 'N/A.', cons: 'Does not offer an enterprise generative AI security gateway.' },
                        aws: { pros: 'API Gateway handles standard REST routing reliably.', cons: 'Lacks native AI prompt sanitization and PII tracking out of the box.' },
                        gcp: { pros: 'Agent Gateway natively manages tool access and Model Armor policies.', cons: 'Agent Gateway is currently in Private Preview and is too risky for a January launch.' },
                        rec: 'Kong AI Gateway (Strict GA)',
                        benefits: 'Fully GA and enterprise-tested. It handles prompt safety, PII scrubbing, and multi-model routing securely today without relying on unreleased preview software.',
                        journey: [
                          'Platform Engineer maintains Kong AI Gateway as the primary enterprise proxy.',
                          'Marketer\'s prompts and file uploads pass through Kong for real-time safety filtering and PII scrubbing before reaching the LLM.',
                          'Developer integrates internal Agent-to-Agent API calls through Kong to ensure all AI communications adhere to existing corporate networking policies.',
                          'Platform Engineer monitors token usage, prompt injection attempts, and model routing fallbacks through Kong\'s centralized dashboard.'
                        ]
                      },
                      8: {
                        name: '8. Downstream Review',
                        adobe: { pros: 'Frame.io and Veeva Vault are approved, risk-free enterprise systems of record.', cons: 'Requires building custom API webhooks for feedback loops.' },
                        aws: { pros: 'Strong API capabilities.', cons: 'Zero native content-review interfaces or pause mechanisms built in.' },
                        gcp: { pros: 'ADK Human-in-the-Loop (HITL) automatically catches workflow exceptions to pause agents.', cons: 'Building a legal UI in Google duplicates Veeva\'s functionality.' },
                        rec: 'Frame.io & Veeva via ADK HITL',
                        benefits: 'Agents automatically hibernate during Frame.io or Veeva human reviews and wake up seamlessly upon approval with zero idle compute costs.',
                        journey: [
                          'Backend Agent compiles the final target HTML and places placeholder jobs in Frame.io and Veeva Vault.',
                          'Backend Agent triggers the ADK Human-in-the-Loop (HITL) mechanism, safely pausing execution and costing zero compute.',
                          'Creative Designer logs into Frame.io to execute visual micro-edits on the generated assets.',
                          'MLR Reviewer logs into Veeva Vault to conduct the final medical review and apply electronic signatures.',
                          'Backend Agent receives the approval webhook, wakes up autonomously, and finalizes the asset for deployment.'
                        ]
                      },
                      9: {
                        name: '9. ModelOps & Quality',
                        adobe: { pros: 'Excellent for visual and creative asset review.', cons: 'Not applicable for programmatic LLM reasoning evaluation.' },
                        aws: { pros: 'Deep custom logging capabilities.', cons: 'Requires building a custom evaluation harness from scratch to test multi-agent loops.' },
                        gcp: { pros: 'ADK Eval Framework provides out-of-the-box local simulation testing for LLMs-as-a-judge.', cons: 'Requires developers to write the initial eval test cases.' },
                        rec: 'ADK Eval Framework',
                        benefits: 'Replaces the need for custom eval harnesses. It allows developers to locally simulate multi-day idle times and test the agent\'s reasoning before deploying anything to production.',
                        journey: [
                          'Developer utilizes the agents-cli eval run framework locally to write test cases for the agent swarm.',
                          'Developer simulates the entire Marketer-to-MLR journey, including multi-day idle delays, to ensure the state machine holds up.',
                          'Developer runs LLM-as-a-judge deterministic tests to verify that the agents strictly adhere to the brand and MLR rubrics.',
                          'Platform Engineer reviews the eval metrics and confidently promotes the workflow into the production Agent Runtime.'
                        ]
                      }
                    };

                    const currentLayer = layersData[expandedMoonshotLayerId];

                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', overflowY: 'auto' }} className="v12-scrollable">
                        
                        {/* Rec Banner */}
                        <div className="v12-card-glass" style={{ borderLeft: `3.5px solid ${colors.accentTeal}`, background: 'rgba(13, 148, 136, 0.03)', padding: '0.6rem 0.85rem' }}>
                          <span style={{ fontSize: '0.55rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                            FINAL RECOMMENDATION FOR {currentLayer.name.toUpperCase()}
                          </span>
                          <h3 style={{ margin: '0.1rem 0 0 0', fontSize: '1rem', fontWeight: 950, color: colors.accentTeal }}>
                            {currentLayer.rec}
                          </h3>
                        </div>

                        {/* Pros & Cons side-by-side columns */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem' }}>
                          
                          {/* Adobe */}
                          <div className="v12-card-glass" style={{ background: '#ffffff', fontSize: '0.65rem' }}>
                            <div style={{ fontWeight: 900, color: '#0f172a', borderBottom: '1px solid rgba(15,23,42,0.06)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>Adobe System</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#475569' }}>
                              <div>🟢 <strong style={{ color: '#0f172a' }}>Pros:</strong> {currentLayer.adobe.pros}</div>
                              <div>🔴 <strong style={{ color: '#0f172a' }}>Cons:</strong> {currentLayer.adobe.cons}</div>
                            </div>
                          </div>

                          {/* AWS */}
                          <div className="v12-card-glass" style={{ background: '#ffffff', fontSize: '0.65rem' }}>
                            <div style={{ fontWeight: 900, color: '#0f172a', borderBottom: '1px solid rgba(15,23,42,0.06)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>AWS Platform</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#475569' }}>
                              <div>🟢 <strong style={{ color: '#0f172a' }}>Pros:</strong> {currentLayer.aws.pros}</div>
                              <div>🔴 <strong style={{ color: '#0f172a' }}>Cons:</strong> {currentLayer.aws.cons}</div>
                            </div>
                          </div>

                          {/* Google Cloud */}
                          <div className="v12-card-glass" style={{ background: 'rgba(13, 148, 136, 0.01)', border: `1.2px solid ${colors.accentTeal}`, fontSize: '0.65rem' }}>
                            <div style={{ fontWeight: 900, color: colors.accentTeal, borderBottom: '1px solid rgba(13,148,136,0.08)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>Google Cloud [2026 Stack]</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#475569' }}>
                              <div>🟢 <strong style={{ color: '#0f172a' }}>Pros:</strong> {currentLayer.gcp.pros}</div>
                              <div>🔴 <strong style={{ color: '#0f172a' }}>Cons:</strong> {currentLayer.gcp.cons}</div>
                            </div>
                          </div>

                        </div>

                        {/* Symmetrical split: Core Benefits vs. User Journey */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.85rem' }}>
                          
                          {/* Core Benefits */}
                          <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#475569', letterSpacing: '0.5px' }}>CORE BUSINESS & GxP BENEFITS</span>
                            <p style={{ margin: 0, fontSize: '0.68rem', color: '#475569', lineHeight: 1.45 }}>
                              {currentLayer.benefits}
                            </p>
                          </div>

                          {/* User Journey */}
                          <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#475569', letterSpacing: '0.5px' }}>SOLUTION APPROACH & USER JOURNEY</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              {currentLayer.journey.map((step, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.65rem', color: '#475569', lineHeight: 1.35 }}>
                                  <span style={{ fontWeight: 900, color: colors.accentTeal, flexShrink: 0 }}>{idx + 1}.</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>

                      </div>
                    );
                  })()}

                </div>

              </div>
            )}
"""

code = code.replace(target_operational_page, moonshot_page_code + "\n" + target_operational_page)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully injected Merck Moonshot Layers page!")
