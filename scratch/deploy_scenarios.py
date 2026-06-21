import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update state variables in PremiumScopingAssessorV12.jsx to support Okta and other keys in defaults
# In state initialization, we can keep the default variables. Let's make sure the savedScenarios presets look highly professional.
target_saved_scenarios = """  const [savedScenarios, setSavedScenarios] = useState([
    { name: 'Scenario A: Composable Google + Adobe Mesh', orch: 'google', identity: 'entra', federation: 'mcp', storage: 'adobe', tco: '4.8M', mvp: '6mo', gxp: '93/100', agility: 92, compliance: 90, costEfficiency: 86 },
    { name: 'Scenario B: Veeva Vault Native Monolith', orch: 'veeva', identity: 'entra', federation: 'etl', storage: 'veeva_promomats', tco: '5.2M', mvp: '8mo', gxp: '98/100', agility: 65, compliance: 98, costEfficiency: 82 }
  ]);"""

replacement_saved_scenarios = """  const [savedScenarios, setSavedScenarios] = useState([
    { name: 'Scenario A: Google Cloud All-In Native Stack', orch: 'google', identity: 'google_id', federation: 'google_bq', storage: 's3', tco: '2.1M', mvp: '3mo', gxp: '92/100', agility: 95, compliance: 92, costEfficiency: 92 },
    { name: 'Scenario B: Highly Regulated Composable Stack', orch: 'aws', identity: 'ping', federation: 'databricks_data', storage: 'veeva_promomats', tco: '4.9M', mvp: '8mo', gxp: '98/100', agility: 81, compliance: 98, costEfficiency: 81 },
    { name: 'Scenario C: Creative & Agentic Hybrid Stack', orch: 'azure', identity: 'okta', federation: 'mcp', storage: 'adobe', tco: '3.6M', mvp: '6mo', gxp: '88/100', agility: 90, compliance: 88, costEfficiency: 88 }
  ]);"""

code = code.replace(target_saved_scenarios, replacement_saved_scenarios)

# 2. Patch the entire vendors mapping and calculations block in Page 8
target_vendors_and_math = """                  // Component Weights & Base Values
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

                  // 2026 Google Agentic Specifications: MCP + OKF + ARD Slashes Build Threshold to $100K
                  const isGoogleAgenticSpecActive = whatIfOrch === 'google' && whatIfFederation === 'mcp';
                  const minBuildBudgetLimit = isGoogleAgenticSpecActive ? 100 : 220;

                  // Synergy 3: Google Agentic Spec TCO Slasher
                  if (isGoogleAgenticSpecActive) {
                    synergyDiscount += costSum * 0.22; // Additional 22% TCO savings
                    mvpAdjustment = Math.max(-4, mvpAdjustment - 2); // Shaves off another 2 months (A2UI & Managed Agents)
                    activeWarnings.push({ type: 'synergy', text: '✓ Google Agentic Spec Active (ARD + MCP + A2UI): Slashes SI build budget requirements by 60% and eliminates post-launch API maintenance debt.' });
                  }"""

replacement_vendors_and_math = """                  // Proportional Component Weights & Base Values for Expanded Composable Sandbox
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
                      s3: { label: 'Custom S3 / Cloud Storage', cost: 0.2, agility: 50, compliance: 60, gxp: 65 }
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
                  let agilitySum = (selOrch.agility + selId.agility + selFed.agility + selStore.agility) / 4;

                  let synergyDiscount = 0;
                  let frictionPenalty = 0;
                  let mvpAdjustment = 0;
                  let activeWarnings = [];

                  // Synergy 1: Veeva + Veeva
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
                  if (whatIfOrch === 'google' && whatIfIdentity === 'google_id' && whatIfFederation === 'google_bq') {
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

code = code.replace(target_vendors_and_math, replacement_vendors_and_math)

# 3. Patch the select menus in JSX
target_select_1 = """                             {/* Dropdown 1: Orchestration */}
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                               <span style={{ fontWeight: 800, color: '#475569' }}>AI Orchestration & Gateway</span>
                               <select 
                                 value={whatIfOrch}
                                 onChange={e => setWhatIfOrch(e.target.value)}
                                 style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                               >
                                 <option value="google">Google Gemini Enterprise Platform</option>
                                 <option value="aws">AWS Bedrock Managed APIs</option>
                                 <option value="veeva">Veeva Vault Native AI</option>
                               </select>
                             </div>"""

replacement_select_1 = """                             {/* Dropdown 1: Orchestration */}
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                               <span style={{ fontWeight: 800, color: '#475569' }}>AI Orchestration & Gateway</span>
                               <select 
                                 value={whatIfOrch}
                                 onChange={e => setWhatIfOrch(e.target.value)}
                                 style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                               >
                                 <option value="google">Google Vertex AI / Gemini Enterprise</option>
                                 <option value="aws">AWS Bedrock + LangGraph</option>
                                 <option value="azure">Azure OpenAI + Azure AI Studio</option>
                                 <option value="kong">Kong AI Gateway + Custom Python</option>
                                 <option value="databricks_orch">Databricks MosaicML</option>
                                 <option value="veeva">Veeva Vault Native AI</option>
                               </select>
                             </div>"""

code = code.replace(target_select_1, replacement_select_1)

target_select_2 = """                             {/* Dropdown 2: Identity */}
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                               <span style={{ fontWeight: 800, color: '#475569' }}>Zero-Trust Identity (IAM)</span>
                               <select 
                                 value={whatIfIdentity}
                                 onChange={e => setWhatIfIdentity(e.target.value)}
                                 style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                               >
                                 <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                 <option value="ping">Okta / PingFederate SSO</option>
                               </select>
                             </div>"""

replacement_select_2 = """                             {/* Dropdown 2: Identity */}
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                               <span style={{ fontWeight: 800, color: '#475569' }}>Zero-Trust Identity (IAM)</span>
                               <select 
                                 value={whatIfIdentity}
                                 onChange={e => setWhatIfIdentity(e.target.value)}
                                 style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                               >
                                 <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                 <option value="okta">Okta Workforce Identity Cloud</option>
                                 <option value="ping">Ping Identity</option>
                                 <option value="google_id">Google Cloud Identity</option>
                               </select>
                             </div>"""

code = code.replace(target_select_2, replacement_select_2)

target_select_3 = """                             {/* Dropdown 3: Data Federation */}
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
                                 <option value="webhooks">Custom API Webhooks</option>
                                 <option value="etl">Scheduled Batch ETL</option>
                               </select>
                             </div>"""

replacement_select_3 = """                             {/* Dropdown 3: Data Federation */}
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
                             </div>"""

code = code.replace(target_select_3, replacement_select_3)

# 4. Patch Dropdown 4 in JSX (lines 4053-4060)
# Let's find the exact block for storage dropdown
target_select_4 = """                             {/* Dropdown 4: Content Supply Chain */}
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                               <span style={{ fontWeight: 800, color: '#475569' }}>Content Supply Chain & Storage</span>
                               <select 
                                 value={whatIfStorage}
                                 onChange={e => setWhatIfStorage(e.target.value)}
                                 style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                               >
                                 <option value="adobe">Adobe GenStudio / AEM</option>
                                 <option value="veeva_promomats">Veeva Vault PromoMats</option>
                                 <option value="s3">Custom S3 / Cloud Storage</option>
                               </select>
                             </div>"""

replacement_select_4 = """                             {/* Dropdown 4: Content Supply Chain */}
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                               <span style={{ fontWeight: 800, color: '#475569' }}>Content Supply Chain & Storage</span>
                               <select 
                                 value={whatIfStorage}
                                 onChange={e => setWhatIfStorage(e.target.value)}
                                 style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                               >
                                 <option value="adobe">Adobe GenStudio / AEM</option>
                                 <option value="veeva_promomats">Veeva PromoMats / Veeva Vault</option>
                                 <option value="sfmc">Salesforce Marketing Cloud Builder</option>
                                 <option value="contentful">Contentful Headless CMS</option>
                                 <option value="s3">Custom S3 / Cloud Storage</option>
                               </select>
                             </div>"""

code = code.replace(target_select_4, replacement_select_4)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully deployed expanded Composable Sandbox & Scenario Calculations!")
