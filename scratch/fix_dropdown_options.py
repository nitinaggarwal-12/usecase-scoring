import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Patch AI Orchestration Options (Line 4439-4441)
old_options_orch = """                                <option value="google">Google Gemini Enterprise Platform</option>
                                <option value="aws">AWS Bedrock Managed APIs</option>
                                <option value="veeva">Veeva Vault Native AI</option>"""

replacement_options_orch = """                                <option value="google">Google Vertex AI / Gemini Enterprise</option>
                                <option value="aws">AWS Bedrock + LangGraph</option>
                                <option value="azure">Azure OpenAI + Azure AI Studio</option>
                                <option value="kong">Kong AI Gateway + Custom Python</option>
                                <option value="databricks_orch">Databricks MosaicML</option>
                                <option value="veeva">Veeva Vault Native AI</option>"""

if old_options_orch in code:
    code = code.replace(old_options_orch, replacement_options_orch)
    print("✓ Successfully patched AI Orchestration dropdown options!")
else:
    print("❌ old_options_orch not found!")

# 2. Patch Zero-Trust Identity Options (Line 4453-4454)
old_options_identity = """                                <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                <option value="ping">Okta / PingFederate SSO</option>"""

replacement_options_identity = """                                <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                <option value="okta">Okta Workforce Identity Cloud</option>
                                <option value="ping">Ping Identity</option>
                                <option value="google_id">Google Cloud Identity</option>"""

if old_options_identity in code:
    code = code.replace(old_options_identity, replacement_options_identity)
    print("✓ Successfully patched Zero-Trust Identity dropdown options!")
else:
    print("❌ old_options_identity not found!")

# 3. Patch Data Federation Options (Line 4475-4477)
old_options_federation = """                                <option value="mcp">Model Context Protocol (MCP)</option>
                                <option value="webhooks">Custom API Webhooks</option>
                                <option value="etl">Scheduled Batch ETL</option>"""

replacement_options_federation = """                                <option value="mcp">Model Context Protocol (MCP)</option>
                                <option value="databricks_data">Databricks (Data Intelligence Platform)</option>
                                <option value="snowflake">Snowflake Cortex</option>
                                <option value="google_bq">Google BigQuery + Vertex Search</option>
                                <option value="webhooks">Custom API Webhooks</option>
                                <option value="etl">Scheduled Batch ETL</option>"""

if old_options_federation in code:
    code = code.replace(old_options_federation, replacement_options_federation)
    print("✓ Successfully patched Data Federation dropdown options!")
else:
    print("❌ old_options_federation not found!")

# 4. Patch Content Supply Chain Options (Line 4489-4491)
old_options_storage = """                                <option value="adobe">Adobe GenStudio / AEM</option>
                                <option value="veeva_promomats">Veeva PromoMats</option>
                                <option value="s3">Google Cloud Storage / Custom S3</option>"""

replacement_options_storage = """                                <option value="adobe">Adobe GenStudio / AEM</option>
                                <option value="veeva_promomats">Veeva PromoMats / Veeva Vault</option>
                                <option value="sfmc">Salesforce Marketing Cloud Builder</option>
                                <option value="contentful">Contentful Headless CMS</option>
                                <option value="s3">Google Cloud Storage / Custom S3</option>"""

if old_options_storage in code:
    code = code.replace(old_options_storage, replacement_options_storage)
    print("✓ Successfully patched Content Supply Chain dropdown options!")
else:
    print("❌ old_options_storage not found!")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
