import os

v3_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/App_v3.jsx'

with open(v3_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target the hardcoded redirect in handleSaveMaturitySession
old_redirect = "window.history.replaceState(null, '', `#maturity-assessor?session=${targetSessId}`);"

replacement_redirect = """const hashRoute = activeFramework === 'option12' ? 'agentic-maturity-v12' : activeFramework === 'option11' ? 'agentic-maturity-v11' : 'maturity-assessor';
    window.history.replaceState(null, '', `#${hashRoute}?session=${targetSessId}`);"""

if old_redirect in code:
    code = code.replace(old_redirect, replacement_redirect)
    print("✓ Successfully patched App_v3.jsx to dynamically redirect based on active framework!")
else:
    print("❌ old_redirect target not found in App_v3.jsx!")

with open(v3_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
