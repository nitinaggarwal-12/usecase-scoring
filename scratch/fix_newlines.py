import os

base_dir = '/usr/local/google/home/nitinagga/usecase_scoring'

sidebar_path = os.path.join(base_dir, 'src/components/Sidebar.jsx')
app_path = os.path.join(base_dir, 'src/App_v3.jsx')

# 1. Fix App_v3.jsx
if os.path.exists(app_path):
    with open(app_path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    # Replace literal '\\n' (two characters: backslash + n) with a real newline
    fixed_code = code.replace('\\n', '\n')
    
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(fixed_code)
    print("Successfully replaced all literal \\n with physical line breaks in App_v3.jsx!")

# 2. Fix Sidebar.jsx
if os.path.exists(sidebar_path):
    with open(sidebar_path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    # Replace literal '\\n' with a real newline
    fixed_code = code.replace('\\n', '\n')
    
    with open(sidebar_path, 'w', encoding='utf-8') as f:
        f.write(fixed_code)
    print("Successfully replaced all literal \\n with physical line breaks in Sidebar.jsx!")

print("🎉 File cleanup complete!")
