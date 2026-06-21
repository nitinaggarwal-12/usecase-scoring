file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the syntax error with the correct conditional operator
content = content.replace("fontWeight: 800 : 550,", "fontWeight: isSelected ? 800 : 550,")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Font weight syntax successfully corrected!")
