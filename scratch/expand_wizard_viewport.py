file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Expand the grid height to 410px (utilizing the empty space at the bottom and eliminating internal scrolls!)
content = content.replace(
    "gap: '0.65rem', height: '225px', minHeight: 0",
    "gap: '0.75rem', height: '410px', minHeight: 0"
)

# 2. Reduce the outermost container padding to let it stretch wider (left/right gutters optimized)
content = content.replace(
    "padding: '0.5rem 1rem 1rem 1rem'",
    "padding: '0.4rem 0.5rem 0.5rem 0.5rem'"
)

# 3. Reduce spacing gaps in the Business and Technical tab layouts from 1.5rem to 0.75rem (top/bottom spaces optimized)
content = content.replace(
    "style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', animation: 'fadeIn 0.25s ease-out' }}",
    "style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', animation: 'fadeIn 0.25s ease-out' }}"
)

# 4. Make the outer questionnaire card padding slightly more spacious inside but tightly framed
content = content.replace(
    "padding: '0.95rem 1.15rem',",
    "padding: '1.25rem 1.4rem',"
)

# 5. Let the options list have a slightly larger gap in the taller columns for premium legibility
content = content.replace(
    "gap: '0.25rem', overflowY: 'auto'",
    "gap: '0.45rem', overflowY: 'auto'"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Wizard successfully expanded to full-viewport layout!")
