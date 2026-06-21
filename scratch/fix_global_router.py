file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the coupled V5/V6/V11 routing block on line 756 with separate blocks
old_routing_block = """    } else if (activeFramework === 'option5' || activeFramework === 'option6' || activeFramework === 'option11') {
      const sessId = activeSessionId;
      if (viewMode === 'report') {
        newHash = `#maturity-report${sessId ? `?session=${sessId}` : ''}`;
      } else {
        newHash = `#maturity-assessor${sessId ? `?session=${sessId}` : ''}`;
      }"""

new_routing_block = """    } else if (activeFramework === 'option5' || activeFramework === 'option6') {
      const sessId = activeSessionId;
      if (viewMode === 'report') {
        newHash = `#maturity-report${sessId ? `?session=${sessId}` : ''}`;
      } else {
        newHash = `#maturity-assessor${sessId ? `?session=${sessId}` : ''}`;
      }
    } else if (activeFramework === 'option11') {
      const sessId = activeSessionId;
      newHash = `#agentic-maturity-v11${sessId ? `?session=${sessId}` : ''}`;"""

content = content.replace(old_routing_block, new_routing_block)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Global router untangled: V11 decoupled from V5 successfully!")
