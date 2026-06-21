import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# -----------------------------------------------------------------------------
# 1. Scale up CSS stylesheet values (.v12-matrix-box, .v12-column-header)
# -----------------------------------------------------------------------------
code = code.replace(
    """        .v12-column-header {
          font-size: 0.62rem;
          font-weight: 850;
          color: var(--text-primary);
          border-bottom: 2px solid var(--text-primary);
          padding-bottom: 0.25rem;
          display: block;
          margin-bottom: 0.15rem;
        }""",
    """        .v12-column-header {
          font-size: 0.75rem;
          font-weight: 850;
          color: var(--text-primary);
          border-bottom: 2px solid var(--text-primary);
          padding-bottom: 0.3rem;
          display: block;
          margin-bottom: 0.2rem;
        }"""
)

code = code.replace(
    """        .v12-matrix-box {
          text-align: left;
          padding: 0.35rem 0.5rem;
          border-radius: 6px;
          font-size: 0.62rem;
          line-height: 1.25;
          transition: all 0.15s;
          min-height: 54px; /* Dynamic: grows taller to prevent clipping! */
          display: flex;
          align-items: center;
          box-sizing: border-box;
          overflow: hidden;
          width: 100%;
        }""",
    """        .v12-matrix-box {
          text-align: left;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 550;
          line-height: 1.35;
          transition: all 0.15s;
          min-height: 72px; /* Dynamic: grows taller to prevent clipping! */
          display: flex;
          align-items: center;
          box-sizing: border-box;
          overflow: hidden;
          width: 100%;
        }"""
)

# -----------------------------------------------------------------------------
# 2. Scale up JSX Font Sizes
# -----------------------------------------------------------------------------
# A. Sidebar pillar text size
code = code.replace(
    "span style={{ fontSize: '0.68rem', fontWeight: isActive ? 800 : 550, color: isActive ? colors.textDark : colors.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}",
    "span style={{ fontSize: '0.78rem', fontWeight: isActive ? 850 : 550, color: isActive ? colors.textDark : colors.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}"
)
code = code.replace(
    "span style={{ fontSize: '0.72rem', color: isActive ? colors.accentBlue : colors.textMuted }}",
    "span style={{ fontSize: '0.82rem', color: isActive ? colors.accentBlue : colors.textMuted }}"
)

# B. Active pillar title in main area header
code = code.replace(
    "span style={{ fontSize: '0.72rem', fontWeight: 900, color: colors.textDark }}",
    "span style={{ fontSize: '0.92rem', fontWeight: 900, color: colors.textDark }}"
)
code = code.replace(
    "span style={{ fontSize: '0.65rem', color: colors.textMuted }}",
    "span style={{ fontSize: '0.78rem', color: colors.textMuted }}"
)

# C. Active question topic title
code = code.replace(
    "h2 style={{ fontSize: '0.8rem', fontWeight: 900, margin: 0, color: colors.textDark, lineHeight: 1.25 }}",
    "h2 style={{ fontSize: '0.98rem', fontWeight: 900, margin: 0, color: colors.textDark, lineHeight: 1.3 }}"
)

# D. Topic index & weight tags
code = code.replace(
    "span style={{ fontSize: '0.58rem', fontWeight: 900, color: colors.accentBlue, textTransform: 'uppercase', letterSpacing: '0.5px' }}",
    "span style={{ fontSize: '0.72rem', fontWeight: 900, color: colors.accentBlue, textTransform: 'uppercase', letterSpacing: '0.5px' }}"
)
code = code.replace(
    "fontSize: '0.52rem', \n                  fontWeight: 900, \n                  color: activeQuestion.weight === 3 ? '#b91c1c' : activeQuestion.weight === 2 ? '#d97706' : '#2563eb', \n                  background: activeQuestion.weight === 3 ? '#fee2e2' : activeQuestion.weight === 2 ? '#fef3c7' : '#dbeafe',",
    "fontSize: '0.65rem', \n                  fontWeight: 900, \n                  color: activeQuestion.weight === 3 ? '#b91c1c' : activeQuestion.weight === 2 ? '#d97706' : '#2563eb', \n                  background: activeQuestion.weight === 3 ? '#fee2e2' : activeQuestion.weight === 2 ? '#fef3c7' : '#dbeafe',"
)

# E. Skip topic checkbox
code = code.replace(
    "label style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.62rem', color: colors.textMuted, cursor: 'pointer' }}",
    "label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: colors.textMuted, cursor: 'pointer' }}"
)

# F. Notes box label & textarea font size
code = code.replace(
    "span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.textDark, letterSpacing: '0.5px' }}",
    "span style={{ fontSize: '0.75rem', fontWeight: 900, color: colors.textDark, letterSpacing: '0.5px' }}"
)
code = code.replace(
    """                  fontSize: '0.68rem',
                  color: colors.textDark,
                  background: 'transparent',
                  fontFamily: 'inherit',
                  lineHeight: 1.25,
                  resize: 'none'""",
    """                  fontSize: '0.8rem',
                  color: colors.textDark,
                  background: 'transparent',
                  fontFamily: 'inherit',
                  lineHeight: 1.35,
                  resize: 'none'"""
)

# G. Painpoints checkboxes text sizes
code = code.replace(
    "span style={{ fontSize: '0.62rem', fontWeight: isTechChecked ? 850 : 550, color: isTechChecked ? colors.accentBlue : colors.textDark, lineHeight: 1.2 }}",
    "span style={{ fontSize: '0.72rem', fontWeight: isTechChecked ? 850 : 550, color: isTechChecked ? colors.accentBlue : colors.textDark, lineHeight: 1.2 }}"
)
code = code.replace(
    "span style={{ fontSize: '0.62rem', fontWeight: isBizChecked ? 850 : 550, color: isBizChecked ? colors.accentBlue : colors.textDark, lineHeight: 1.2 }}",
    "span style={{ fontSize: '0.72rem', fontWeight: isBizChecked ? 850 : 550, color: isBizChecked ? colors.accentBlue : colors.textDark, lineHeight: 1.2 }}"
)
code = code.replace(
    "span style={{ fontSize: '0.62rem', color: colors.textMuted }}>N/A</span>",
    "span style={{ fontSize: '0.72rem', color: colors.textMuted }}>N/A</span>"
)

# H. Progress tracker text size at bottom
code = code.replace(
    "fontSize: '0.65rem'",
    "fontSize: '0.78rem'"
)

# Write back to file
with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 V12 font scaling and box expansion completed successfully!")
