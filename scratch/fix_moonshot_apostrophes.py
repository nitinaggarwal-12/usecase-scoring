import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Escaped strings for Layer 1
old_l1 = """                        journey: [
                          'Marketer logs into Adobe GenStudio to initiate a campaign campaign.',
                          'Marketer inputs a natural language brief into the Gemini Enterprise App interface.',
                          'Developer configuration ensures the backend agent streams dynamic A2UI components (progress trackers, compliance scorecards) directly back to the UI.',
                          'Marketer interacts with these generative A2UI components to tweak targeting and review initial asset frameworks without leaving the creative workspace.'
                        ]"""

new_l1 = """                        journey: [
                          "Marketer logs into Adobe GenStudio to initiate a campaign.",
                          "Marketer inputs a natural language brief into the Gemini Enterprise App interface.",
                          "Developer configuration ensures the backend agent streams dynamic A2UI components (progress trackers, compliance scorecards) directly back to the UI.",
                          "Marketer interacts with these generative A2UI components to tweak targeting and review initial asset frameworks without leaving the creative workspace."
                        ]"""

# Escaped strings for Layer 5
old_l5 = """                        journey: [
                          'Developer writes and deploys the ADK 2.0 Graph Workflow code natively to Google\'s managed Agent Runtime.',
                          'Marketer hits "Generate," triggering the multi-agent swarm (Spelling Agent, Medical Agent, Brand Agent) to evaluate the asset in parallel.',
                          'Backend Agent routes tasks deterministically; if a human review is needed, the ADK event-driven dormancy gate automatically hibernates the workflow.',
                          'Platform Engineer relies on the Agent Runtime to handle all auto-scaling and infrastructure provisioning transparently.'
                        ]"""

new_l5 = """                        journey: [
                          "Developer writes and deploys the ADK 2.0 Graph Workflow code natively to Google's managed Agent Runtime.",
                          'Marketer hits "Generate," triggering the multi-agent swarm (Spelling Agent, Medical Agent, Brand Agent) to evaluate the asset in parallel.',
                          "Backend Agent routes tasks deterministically; if a human review is needed, the ADK event-driven dormancy gate automatically hibernates the workflow.",
                          "Platform Engineer relies on the Agent Runtime to handle all auto-scaling and infrastructure provisioning transparently."
                        ]"""

# Escaped strings for Layer 7
old_l7 = """                        journey: [
                          'Platform Engineer maintains Kong AI Gateway as the primary enterprise proxy.',
                          'Marketer\'s prompts and file uploads pass through Kong for real-time safety filtering and PII scrubbing before reaching the LLM.',
                          'Developer integrates internal Agent-to-Agent API calls through Kong to ensure all AI communications adhere to existing corporate networking policies.',
                          'Platform Engineer monitors token usage, prompt injection attempts, and model routing fallbacks through Kong\'s centralized dashboard.'
                        ]"""

new_l7 = """                        journey: [
                          "Platform Engineer maintains Kong AI Gateway as the primary enterprise proxy.",
                          "Marketer's prompts and file uploads pass through Kong for real-time safety filtering and PII scrubbing before reaching the LLM.",
                          "Developer integrates internal Agent-to-Agent API calls through Kong to ensure all AI communications adhere to existing corporate networking policies.",
                          "Platform Engineer monitors token usage, prompt injection attempts, and model routing fallbacks through Kong's centralized dashboard."
                        ]"""

# Escaped strings for Layer 9
old_l9 = """                        journey: [
                          'Developer utilizes the agents-cli eval run framework locally to write test cases for the agent swarm.',
                          'Developer simulates the entire Marketer-to-MLR journey, including multi-day idle delays, to ensure the state machine holds up.',
                          'Developer runs LLM-as-a-judge deterministic tests to verify that the agents strictly adhere to the brand and MLR rubrics.',
                          'Platform Engineer reviews the eval metrics and confidently promotes the workflow into the production Agent Runtime.'
                        ]"""

new_l9 = """                        journey: [
                          "Developer utilizes the agents-cli eval run framework locally to write test cases for the agent swarm.",
                          "Developer simulates the entire Marketer-to-MLR journey, including multi-day idle delays, to ensure the state machine holds up.",
                          "Developer runs LLM-as-a-judge deterministic tests to verify that the agents strictly adhere to the brand and MLR rubrics.",
                          "Platform Engineer reviews the eval metrics and confidently promotes the workflow into the production Agent Runtime."
                        ]"""

if old_l1 in code:
    code = code.replace(old_l1, new_l1)
    print("Fixed Layer 1 journey quotes.")

# Since there was a typo "Google's" in old_l5 without escape, let's replace it by target matching
old_l5_raw = """                        journey: [
                          'Developer writes and deploys the ADK 2.0 Graph Workflow code natively to Google's managed Agent Runtime.',
                          'Marketer hits "Generate," triggering the multi-agent swarm (Spelling Agent, Medical Agent, Brand Agent) to evaluate the asset in parallel.',
                          'Backend Agent routes tasks deterministically; if a human review is needed, the ADK event-driven dormancy gate automatically hibernates the workflow.',
                          'Platform Engineer relies on the Agent Runtime to handle all auto-scaling and infrastructure provisioning transparently.'
                        ]"""

if old_l5_raw in code:
    code = code.replace(old_l5_raw, new_l5)
    print("Fixed Layer 5 journey quotes.")
elif old_l5 in code:
    code = code.replace(old_l5, new_l5)
    print("Fixed Layer 5 journey quotes (escaped version).")

if old_l7 in code:
    code = code.replace(old_l7, new_l7)
    print("Fixed Layer 7 journey quotes.")

if old_l9 in code:
    code = code.replace(old_l9, new_l9)
    print("Fixed Layer 9 journey quotes.")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Quote fix complete!")
