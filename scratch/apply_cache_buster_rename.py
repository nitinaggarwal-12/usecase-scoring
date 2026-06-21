import os

base_dir = '/usr/local/google/home/nitinagga/usecase_scoring'

# 1. Paths
old_v11_path = os.path.join(base_dir, 'src/components/PremiumScopingAssessorV11.jsx')
new_v11_path = os.path.join(base_dir, 'src/components/PremiumScopingAssessorV11_v3.jsx')

old_app_path = os.path.join(base_dir, 'src/App.jsx')
new_app_path = os.path.join(base_dir, 'src/App_v3.jsx')

main_path = os.path.join(base_dir, 'src/main.jsx')
index_path = os.path.join(base_dir, 'index.html')

# 2. Rename V11 file
if os.path.exists(old_v11_path):
    # Copy/write the content to the new path
    with open(old_v11_path, 'r', encoding='utf-8') as f:
        v11_code = f.read()
    with open(new_v11_path, 'w', encoding='utf-8') as f:
        f.write(v11_code)
    print(f"Copied V11 component to: {new_v11_path}")

# 3. Read App.jsx, update import, and write to App_v3.jsx
if os.path.exists(old_app_path):
    with open(old_app_path, 'r', encoding='utf-8') as f:
        app_code = f.read()
    
    # Update the V11 import
    target_import = "import PremiumScopingAssessorV11 from './components/PremiumScopingAssessorV11';"
    replacement_import = "import PremiumScopingAssessorV11 from './components/PremiumScopingAssessorV11_v3';"
    
    if target_import in app_code:
        app_code = app_code.replace(target_import, replacement_import)
        print("Updated V11 import inside App_v3.jsx code.")
    else:
        # Fallback if there was a slight whitespace difference
        app_code = app_code.replace("components/PremiumScopingAssessorV11", "components/PremiumScopingAssessorV11_v3")
        print("Regex/fuzzy-replaced V11 import inside App_v3.jsx code.")

    with open(new_app_path, 'w', encoding='utf-8') as f:
        f.write(app_code)
    print(f"Created App_v3.jsx: {new_app_path}")

# 4. Update main.jsx to import App_v3
if os.path.exists(main_path):
    with open(main_path, 'r', encoding='utf-8') as f:
        main_code = f.read()
    
    main_code = main_code.replace("import App from './App.jsx'", "import App from './App_v3.jsx'")
    main_code = main_code.replace("import App from './App'", "import App from './App_v3.jsx'")
    
    with open(main_path, 'w', encoding='utf-8') as f:
        f.write(main_code)
    print(f"Updated main.jsx imports: {main_path}")

# 5. Update index.html to load main.jsx?v=3
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        index_code = f.read()
    
    index_code = index_code.replace('src="/src/main.jsx"', 'src="/src/main.jsx?v=3"')
    index_code = index_code.replace("src='/src/main.jsx'", "src='/src/main.jsx?v=3'")
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_code)
    print(f"Updated index.html: {index_path}")

print("🎉 Cache-Buster Rename Chain successfully deployed!")
