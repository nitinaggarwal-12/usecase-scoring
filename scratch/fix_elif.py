file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all occurrences of 'elif (' with 'else if ('
content = content.replace("elif (", "else if (")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("elif syntax successfully corrected to else if!")
