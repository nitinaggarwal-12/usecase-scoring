file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the bugged V10 hijacking condition on line 1654 with a clean framework-scoped condition
old_hijack_condition = ") : (activeFramework === 'option10' || viewMode === 'assessor') ? ("
new_hijack_condition = ") : (activeFramework === 'option10') ? ("

content = content.replace(old_hijack_condition, new_hijack_condition)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("V10 render hijack successfully resolved in App.jsx!")
