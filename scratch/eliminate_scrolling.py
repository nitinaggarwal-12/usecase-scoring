file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the 4-Column Grid to have a fixed height of 300px and prevent stretching
old_grid_string = "                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>"
new_grid_string = "                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', height: '300px', minHeight: 0 }}>"

content = content.replace(old_grid_string, new_grid_string)

# 2. Add overflowY: 'auto' and flex-1 to the options list inside each of the 4 columns
# Let's see the column wrapper styling in our patched wizard:
# Current State Column:
old_col1 = """                        {/* Col 1: Current State (Amber Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.35rem', display: 'block', fontWeight: 800 }}>
                            Current State *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>"""

new_col1 = """                        {/* Col 1: Current State (Amber Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box' }}>
                          <strong style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.25rem', display: 'block', fontWeight: 850, flexShrink: 0 }}>
                            Current State *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto', flex: 1, paddingRight: '2px' }}>"""

content = content.replace(old_col1, new_col1)

# Future State Column:
old_col2 = """                        {/* Col 2: Future State (Emerald Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.35rem', display: 'block', fontWeight: 800 }}>
                            Future State *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>"""

new_col2 = """                        {/* Col 2: Future State (Emerald Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box' }}>
                          <strong style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.25rem', display: 'block', fontWeight: 850, flexShrink: 0 }}>
                            Future State *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto', flex: 1, paddingRight: '2px' }}>"""

content = content.replace(old_col2, new_col2)

# Technical Painpoints Column:
old_col3 = """                        {/* Col 3: Technical Painpoints (Blue Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.35rem', display: 'block', fontWeight: 800 }}>
                            Technical Painpoints *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>"""

new_col3 = """                        {/* Col 3: Technical Painpoints (Blue Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box' }}>
                          <strong style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.25rem', display: 'block', fontWeight: 850, flexShrink: 0 }}>
                            Technical Painpoints *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto', flex: 1, paddingRight: '2px' }}>"""

content = content.replace(old_col3, new_col3)

# Business Painpoints Column:
old_col4 = """                        {/* Col 4: Business Painpoints (Purple Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.35rem', display: 'block', fontWeight: 800 }}>
                            Business Painpoints *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>"""

new_col4 = """                        {/* Col 4: Business Painpoints (Purple Theme) */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', boxSizing: 'border-box' }}>
                          <strong style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.25rem', display: 'block', fontWeight: 850, flexShrink: 0 }}>
                            Business Painpoints *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto', flex: 1, paddingRight: '2px' }}>"""

content = content.replace(old_col4, new_col4)

# 3. Compact the options padding & margins slightly
content = content.replace("padding: '0.55rem 0.65rem',", "padding: '0.45rem 0.55rem',")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Scrolling successfully eliminated from V11 Wizard!")
