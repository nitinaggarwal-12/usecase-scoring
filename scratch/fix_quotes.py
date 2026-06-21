file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the single-quoted string with double quotes to escape the single quote cleanly
target_str = "'4 (Agentic): The invoking user's exact identity and permissions pass strictly across the A2A boundary.'"
replacement_str = '"4 (Agentic): The invoking user\'s exact identity and permissions pass strictly across the A2A boundary."'

content = content.replace(target_str, replacement_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Quotes successfully escaped!")
