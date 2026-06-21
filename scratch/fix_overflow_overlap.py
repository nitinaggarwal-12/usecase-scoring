file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Set grid height to 225px for slightly better framing
content = content.replace(
    "height: '215px', minHeight: 0",
    "height: '225px', minHeight: 0"
)

# 2. Add overflow: 'hidden' to Col 1 container
old_col1_header = """                        {/* Col 1: Current State (Amber Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box' }}>"""

new_col1_header = """                        {/* Col 1: Current State (Amber Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>"""

content = content.replace(old_col1_header, new_col1_header)

# 3. Add overflow: 'hidden' to Col 2 container
old_col2_header = """                        {/* Col 2: Future State (Emerald Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box' }}>"""

new_col2_header = """                        {/* Col 2: Future State (Emerald Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>"""

content = content.replace(old_col2_header, new_col2_header)

# 4. Add overflow: 'hidden' to Col 3 container
old_col3_header = """                        {/* Col 3: Technical Painpoints (Blue Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box' }}>"""

new_col3_header = """                        {/* Col 3: Technical Painpoints (Blue Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>"""

content = content.replace(old_col3_header, new_col3_header)

# 5. Add overflow: 'hidden' to Col 4 container
old_col4_header = """                        {/* Col 4: Business Painpoints (Purple Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box' }}>"""

new_col4_header = """                        {/* Col 4: Business Painpoints (Purple Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>"""

content = content.replace(old_col4_header, new_col4_header)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Overflow hidden containment successfully applied to all 4 columns!")
