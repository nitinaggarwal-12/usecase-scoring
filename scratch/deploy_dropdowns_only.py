import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target the exact block from line 4654 to 4730 on disk
old_dropdown_block = """                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.65rem' }}>
                            
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

replacement_dropdown_block = """                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.62rem' }}>
                            
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

if old_dropdown_block in code:
    code = code.replace(old_dropdown_block, replacement_dropdown_block)
    print("✓ Successfully patched the 5-select dropdown grid on disk!")
else:
    print("❌ old_dropdown_block target not found in file!")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
