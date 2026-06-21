import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target unescaped Layer 8 GCP block
old_l8_gcp = """                      8: {
                        name: '8. Downstream Review',
                        adobe: { pros: 'Frame.io and Veeva Vault are approved, risk-free enterprise systems of record.', cons: 'Requires building custom API webhooks for feedback loops.' },
                        aws: { pros: 'Strong API capabilities.', cons: 'Zero native content-review interfaces or pause mechanisms built in.' },
                        gcp: { pros: 'ADK Human-in-the-Loop (HITL) automatically catches workflow exceptions to pause agents.', cons: 'Building a legal UI in Google duplicates Veeva's functionality.' },"""

replacement_l8_gcp = """                      8: {
                        name: '8. Downstream Review',
                        adobe: { pros: 'Frame.io and Veeva Vault are approved, risk-free enterprise systems of record.', cons: 'Requires building custom API webhooks for feedback loops.' },
                        aws: { pros: 'Strong API capabilities.', cons: 'Zero native content-review interfaces or pause mechanisms built in.' },
                        gcp: { pros: 'ADK Human-in-the-Loop (HITL) automatically catches workflow exceptions to pause agents.', cons: "Building a legal UI in Google duplicates Veeva's functionality." },"""

if old_l8_gcp in code:
    code = code.replace(old_l8_gcp, replacement_l8_gcp)
    print("✓ Successfully replaced Layer 8 GCP unescaped single quotes with double quotes!")
else:
    # Try alternate match if spaces differ slightly
    print("⚠️ Direct match not found, attempting fallback replacement...")
    target_broken = "cons: 'Building a legal UI in Google duplicates Veeva's functionality.'"
    target_fixed = 'cons: "Building a legal UI in Google duplicates Veeva\'s functionality."'
    if target_broken in code:
        code = code.replace(target_broken, target_fixed)
        print("✓ Successfully replaced targeted broken quote string!")
    else:
        print("❌ Fallback match failed. Scanning for similar structures...")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
