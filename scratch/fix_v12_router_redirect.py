import os

app_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/App_v3.jsx'

with open(app_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Locate the State-to-Hash synchronization loop in App_v3.jsx and insert option12
old_sync_block = """    } else if (activeFramework === 'option11') {
      const sessId = activeSessionId;
      newHash = `#agentic-maturity-v11${sessId ? `?session=${sessId}` : ''}`;
    } else if (activeFramework === 'option7') {"""

new_sync_block = """    } else if (activeFramework === 'option11') {
      const sessId = activeSessionId;
      newHash = `#agentic-maturity-v11${sessId ? `?session=${sessId}` : ''}`;
    } else if (activeFramework === 'option12') {
      const sessId = activeSessionId;
      newHash = `#agentic-maturity-v12${sessId ? `?session=${sessId}` : ''}`;
    } else if (activeFramework === 'option7') {"""

if old_sync_block in code:
    code = code.replace(old_sync_block, new_sync_block)
    print("Successfully added option12 routing case to State-to-Hash sync loop in App_v3.jsx!")
else:
    print("⚠️ Warning: Synchronization block not found exactly in App_v3.jsx.")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Router redirection correction complete!")
