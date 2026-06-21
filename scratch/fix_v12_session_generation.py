import os

app_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/App_v3.jsx'

with open(app_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Locate the onStart landing block in App_v3.jsx (around line 1704)
old_onstart_block = """                } else if (activeFramework === 'option11') {
                  setViewMode('assessor');
                  window.location.hash = `#agentic-maturity-v11?id=assessment_${Date.now()}&action=start`;
                } else {
                  setViewMode('home');
                  window.location.hash = `#maturity-assessor?action=start`;
                }"""

new_onstart_block = """                } else if (activeFramework === 'option11') {
                  setViewMode('assessor');
                  window.location.hash = `#agentic-maturity-v11?id=assessment_${Date.now()}&action=start`;
                } else if (activeFramework === 'option12') {
                  setViewMode('assessor');
                  window.location.hash = `#agentic-maturity-v12?id=assessment_${Date.now()}&action=start`;
                } else {
                  setViewMode('home');
                  window.location.hash = `#maturity-assessor?action=start`;
                }"""

if old_onstart_block in code:
    code = code.replace(old_onstart_block, new_onstart_block)
    print("Successfully added V12 session ID generator to landing page start handler!")
else:
    # Fuzzy replacement
    code = code.replace(
        "window.location.hash = `#agentic-maturity-v11?id=assessment_${Date.now()}&action=start`;",
        "window.location.hash = `#agentic-maturity-v11?id=assessment_${Date.now()}&action=start`;\\n                } else if (activeFramework === 'option12') {\\n                  setViewMode('assessor');\\n                  window.location.hash = `#agentic-maturity-v12?id=assessment_${Date.now()}&action=start`;"
    )
    print("Fuzzy-added V12 session ID generator.")

# Write back to file
with open(app_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 V12 session ID generation fix completed successfully!")
