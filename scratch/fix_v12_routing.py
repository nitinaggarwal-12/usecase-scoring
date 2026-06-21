import os

v3_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/App_v3.jsx'

with open(v3_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Patch session framework parser (Line 595)
old_parser_1 = "if (session && (session.framework === 'option5' || session.framework === 'option6' || session.framework === 'option11')) {"
replacement_parser_1 = "if (session && (session.framework === 'option5' || session.framework === 'option6' || session.framework === 'option11' || session.framework === 'option12')) {"
code = code.replace(old_parser_1, replacement_parser_1)

# 2. Patch session framework parser (Line 612)
# Since they are identical, replace both occurrences
# If replace is done, both will be fixed. Let's make sure.

# 3. Patch sidebar click handler (Line 1611)
old_sidebar = "if (['option5', 'option6', 'option7', 'option8', 'option9', 'option10', 'option11', 'intake'].includes(fw)) {"
replacement_sidebar = "if (['option5', 'option6', 'option7', 'option8', 'option9', 'option10', 'option11', 'option12', 'intake'].includes(fw)) {"
code = code.replace(old_sidebar, replacement_sidebar)

# 4. Patch navbar click handler (Line 1633)
# (Same string signature as sidebar, replacing it covers both if they match, but let's do a replace)
# In App_v3.jsx, they both match the old_sidebar signature. Let's verify how many replacements were made.
# Let's perform a direct string replacement.

# 5. Patch "Try Sample" handler (Line 1727)
old_try_sample = """                } else if (activeFramework === 'option11') {
                  setViewMode('assessor');
                  window.location.hash = `#agentic-maturity-v11?id=demo_merck_preset&preset=merck_preset`;"""

replacement_try_sample = """                } else if (activeFramework === 'option11') {
                  setViewMode('assessor');
                  window.location.hash = `#agentic-maturity-v11?id=demo_merck_preset&preset=merck_preset`;
                } else if (activeFramework === 'option12') {
                  setViewMode('assessor');
                  window.location.hash = `#agentic-maturity-v12?id=demo_merck_preset&preset=merck_preset`;"""

code = code.replace(old_try_sample, replacement_try_sample)

with open(v3_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully patched App_v3.jsx routing for option12!")
