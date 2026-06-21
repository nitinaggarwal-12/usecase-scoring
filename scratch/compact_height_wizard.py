file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Reduce 4-Column Grid height to 215px
content = content.replace(
    "gap: '0.85rem', height: '300px', minHeight: 0",
    "gap: '0.65rem', height: '215px', minHeight: 0"
)

# 2. Compact Card Padding and internal gaps
# Outer card padding from 1.6rem to 1rem, and gap from 1.15rem to 0.6rem
content = content.replace(
    "padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1.15rem'",
    "padding: '0.95rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '0.6rem'"
)

# 3. Compact Comment textarea height to 38px
content = content.replace(
    "height: '55px',",
    "height: '38px',"
)

# 4. Compact the options padding slightly more to fit nicely in 215px
content = content.replace(
    "padding: '0.45rem 0.55rem',",
    "padding: '0.35rem 0.45rem',"
)

# 5. Compact margins in the wizard navigation footer
content = content.replace(
    "paddingTop: '0.85rem', marginTop: '0.25rem'",
    "paddingTop: '0.55rem', marginTop: '0.1rem'"
)
content = content.replace(
    "padding: '0.45rem 1rem',",
    "padding: '0.35rem 0.85rem',"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Wizard height successfully compacted to eliminate bottom cutting!")
