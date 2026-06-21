import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target unescaped Layer 9 benefits block
old_l9_benefits = """                      9: {
                        name: '9. ModelOps & Quality',
                        adobe: { pros: 'Excellent for visual and creative asset review.', cons: 'Not applicable for programmatic LLM reasoning evaluation.' },
                        aws: { pros: 'Deep custom logging capabilities.', cons: 'Requires building a custom evaluation harness from scratch to test multi-agent loops.' },
                        gcp: { pros: 'ADK Eval Framework provides out-of-the-box local simulation testing for LLMs-as-a-judge.', cons: 'Requires developers to write the initial eval test cases.' },
                        rec: 'ADK Eval Framework',
                        benefits: 'Replaces the need for custom eval harnesses. It allows developers to locally simulate multi-day idle times and test the agent's reasoning before deploying anything to production.',"""

replacement_l9_benefits = """                      9: {
                        name: '9. ModelOps & Quality',
                        adobe: { pros: 'Excellent for visual and creative asset review.', cons: 'Not applicable for programmatic LLM reasoning evaluation.' },
                        aws: { pros: 'Deep custom logging capabilities.', cons: 'Requires building a custom evaluation harness from scratch to test multi-agent loops.' },
                        gcp: { pros: 'ADK Eval Framework provides out-of-the-box local simulation testing for LLMs-as-a-judge.', cons: 'Requires developers to write the initial eval test cases.' },
                        rec: 'ADK Eval Framework',
                        benefits: "Replaces the need for custom eval harnesses. It allows developers to locally simulate multi-day idle times and test the agent's reasoning before deploying anything to production.","""

if old_l9_benefits in code:
    code = code.replace(old_l9_benefits, replacement_l9_benefits)
    print("✓ Successfully replaced Layer 9 GCP unescaped single quotes with double quotes!")
else:
    # Try alternate match if spaces differ slightly
    print("⚠️ Direct match not found, attempting fallback replacement...")
    target_broken = "benefits: 'Replaces the need for custom eval harnesses. It allows developers to locally simulate multi-day idle times and test the agent's reasoning before deploying anything to production.',"
    target_fixed = 'benefits: "Replaces the need for custom eval harnesses. It allows developers to locally simulate multi-day idle times and test the agent\'s reasoning before deploying anything to production.",'
    if target_broken in code:
        code = code.replace(target_broken, target_fixed)
        print("✓ Successfully replaced targeted broken quote string!")
    else:
        print("❌ Fallback match failed.")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
