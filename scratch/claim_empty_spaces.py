import os

base_dir = '/usr/local/google/home/nitinagga/usecase_scoring'
app_path = os.path.join(base_dir, 'src/App_v3.jsx')
v12_path = os.path.join(base_dir, 'src/components/PremiumScopingAssessorV12.jsx')

# -----------------------------------------------------------------------------
# 1. Edit App_v3.jsx
# -----------------------------------------------------------------------------
if os.path.exists(app_path):
    with open(app_path, 'r', encoding='utf-8') as f:
        app_code = f.read()

    # Find line 1647: <main className="main-content" style={activeFramework === 'option10' ? ...
    old_main_line = '<main className="main-content" style={activeFramework === \'option10\' ? { padding: 0, margin: 0, maxWidth: \'100%\' } : undefined}>'
    new_main_line = '<main className="main-content" style={[\'option10\', \'option11\', \'option12\'].includes(activeFramework) ? { padding: 0, margin: 0, maxWidth: \'100%\' } : undefined}>'

    if old_main_line in app_code:
        app_code = app_code.replace(old_main_line, new_main_line)
        print("Successfully updated App_v3.jsx main-content container styling to 100% width override.")
    else:
        # Fuzzy replacement if whitespace is different
        app_code = app_code.replace("activeFramework === 'option10' ? { padding: 0", "['option10', 'option11', 'option12'].includes(activeFramework) ? { padding: 0")
        print("Fuzzy-updated App_v3.jsx main-content style overrides.")

    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(app_code)

# -----------------------------------------------------------------------------
# 2. Edit PremiumScopingAssessorV12.jsx
# -----------------------------------------------------------------------------
if os.path.exists(v12_path):
    with open(v12_path, 'r', encoding='utf-8') as f:
        v12_code = f.read()

    # A. Tighten outer container padding/gap
    old_container_style = """        .premium-assessor-v12-container {
          display: flex;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          gap: 0.85rem;
          padding: 1rem;"""
    
    new_container_style = """        .premium-assessor-v12-container {
          display: flex;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          gap: 0.6rem;
          padding: 0.5rem;"""

    if old_container_style in v12_code:
        v12_code = v12_code.replace(old_container_style, new_container_style)
        print("Successfully tightened container padding & gaps in V12 stylesheet.")
    else:
        # Fuzzy replacements
        v12_code = v12_code.replace("gap: 0.85rem;\n          padding: 1rem;", "gap: 0.6rem;\n          padding: 0.5rem;")
        print("Fuzzy-replaced container padding in V12 stylesheet.")

    # B. Expand sidebar width slightly to prevent wrapping & utilize space better
    old_sidebar_style = """        .v12-sidebar {
          width: 235px;"""
    
    new_sidebar_style = """        .v12-sidebar {
          width: 250px;"""

    if old_sidebar_style in v12_code:
        v12_code = v12_code.replace(old_sidebar_style, new_sidebar_style)
        print("Successfully widened sidebar in V12 stylesheet.")
    else:
        v12_code = v12_code.replace("width: 235px;", "width: 250px;")
        print("Fuzzy-replaced sidebar width in V12 stylesheet.")

    with open(v12_path, 'w', encoding='utf-8') as f:
        f.write(v12_code)

print("🎉 Space claiming layout updates completed successfully!")
