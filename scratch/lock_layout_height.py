import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# -----------------------------------------------------------------------------
# 1. Update the CSS stylesheet block
# -----------------------------------------------------------------------------
old_css_block = """        .premium-assessor-v12-container {
          display: flex;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          gap: 0.6rem;
          padding: 0.5rem;
          box-sizing: border-box;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          transition: background-color 0.2s, color 0.2s;
        }
        @media (max-width: 960px) {
          .premium-assessor-v12-container {
            flex-direction: column;
            padding: 0.55rem;
            gap: 0.55rem;
          }
        }

        .v12-sidebar {
          width: 250px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.85rem 0.85rem 1.25rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: fit-content;
          transition: background-color 0.2s, border-color 0.2s;
        }

        .v12-main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }

        .v12-intake-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: fit-content;
          width: 100%;
          transition: background-color 0.2s, border-color 0.2s;
        }"""

new_css_block = """        .premium-assessor-v12-container {
          display: flex;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          gap: 0.6rem;
          padding: 0.5rem;
          box-sizing: border-box;
          height: 100%;
          min-height: 0;
          width: 100%;
          overflow-x: hidden;
          transition: background-color 0.2s, color 0.2s;
        }
        @media (max-width: 960px) {
          .premium-assessor-v12-container {
            flex-direction: column;
            padding: 0.55rem;
            gap: 0.55rem;
            height: auto;
          }
        }

        .v12-sidebar {
          width: 250px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.85rem 0.85rem 1.25rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: 100%;
          overflow-y: auto;
          transition: background-color 0.2s, border-color 0.2s;
        }

        .v12-main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .v12-intake-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: 100%;
          width: 100%;
          transition: background-color 0.2s, border-color 0.2s;
        }"""

if old_css_block in code:
    code = code.replace(old_css_block, new_css_block)
    print("Successfully replaced CSS stylesheet block with viewport-locking rules.")
else:
    # Fuzzy fallback (try replacing min-height and height: fit-content individually)
    code = code.replace("min-height: 100vh;\n          width: 100%;", "height: 100%;\n          min-height: 0;\n          width: 100%;")
    code = code.replace(".v12-sidebar {\n          width: 250px;\n          background: var(--bg-surface);\n          border: 1px solid var(--border-color);\n          border-radius: 12px;\n          padding: 0.85rem 0.85rem 1.25rem 0.85rem;\n          display: flex;\n          flex-direction: column;\n          gap: 0.85rem;\n          flex-shrink: 0;\n          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);\n          box-sizing: border-box;\n          height: fit-content;", ".v12-sidebar {\n          width: 250px;\n          background: var(--bg-surface);\n          border: 1px solid var(--border-color);\n          border-radius: 12px;\n          padding: 0.85rem 0.85rem 1.25rem 0.85rem;\n          display: flex;\n          flex-direction: column;\n          gap: 0.85rem;\n          flex-shrink: 0;\n          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);\n          box-sizing: border-box;\n          height: 100%;\n          overflow-y: auto;")
    code = code.replace(".v12-intake-card {\n          background: var(--bg-surface);\n          border: 1px solid var(--border-color);\n          border-radius: 12px;\n          padding: 0.85rem;\n          display: flex;\n          flex-direction: column;\n          gap: 0.65rem;\n          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);\n          box-sizing: border-box;\n          height: fit-content;", ".v12-intake-card {\n          background: var(--bg-surface);\n          border: 1px solid var(--border-color);\n          border-radius: 12px;\n          padding: 0.85rem;\n          display: flex;\n          flex-direction: column;\n          gap: 0.65rem;\n          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);\n          box-sizing: border-box;\n          height: 100%;")
    print("Fuzzy-replaced height rules in V12 stylesheet.")

# -----------------------------------------------------------------------------
# 2. Update Notes & Comments Box and Navigation Footer
# -----------------------------------------------------------------------------
old_notes_block = """            {/* Bottom Auditor Notes Area */}
            <div style={{ background: colors.cardBg, border: `1px solid var(--border-color)`, borderRadius: '6px', padding: '0.5rem 0.65rem 0.65rem 0.65rem', display: 'flex', flexDirection: 'column', gap: '0.15rem', flexShrink: 0, marginBottom: '0.15rem' }}>
              <span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.textDark, letterSpacing: '0.5px' }}>
                NOTES & COMMENTS BOX *
              </span>
              <textarea
                value={scores[activeQuestionId]?.comments || ''}
                onChange={e => handleCommentChange(e.target.value)}
                placeholder="Type clinical, GxP validation, or CapEx/OpEx constraints noted during this stakeholder interview..."
                style={{
                  width: '100%',
                  height: '40px', 
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.68rem',
                  color: colors.textDark,
                  background: 'transparent',
                  fontFamily: 'inherit',
                  lineHeight: 1.25,
                  resize: 'none'
                }}
              />
            </div>"""

new_notes_block = """            {/* Bottom Auditor Notes Area (Flex-stretch!) */}
            <div style={{ background: colors.cardBg, border: `1px solid var(--border-color)`, borderRadius: '6px', padding: '0.5rem 0.65rem 0.65rem 0.65rem', display: 'flex', flexDirection: 'column', gap: '0.15rem', flex: 1, minHeight: '80px' }}>
              <span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.textDark, letterSpacing: '0.5px' }}>
                NOTES & COMMENTS BOX *
              </span>
              <textarea
                value={scores[activeQuestionId]?.comments || ''}
                onChange={e => handleCommentChange(e.target.value)}
                placeholder="Type clinical, GxP validation, or CapEx/OpEx constraints noted during this stakeholder interview..."
                style={{
                  width: '100%',
                  flex: 1, 
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.68rem',
                  color: colors.textDark,
                  background: 'transparent',
                  fontFamily: 'inherit',
                  lineHeight: 1.25,
                  resize: 'none'
                }}
              />
            </div>"""

if old_notes_block in code:
    code = code.replace(old_notes_block, new_notes_block)
    print("Successfully converted Notes Box to flex-stretching column.")
else:
    print("⚠️ Warning: Notes block not found exactly. Checking spacing...")

# Update navigation footer marginTop
old_nav_footer = """            {/* Navigation Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid var(--border-color)`, paddingTop: '0.45rem', marginTop: '0.85rem', flexShrink: 0 }}>"""

new_nav_footer = """            {/* Navigation Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid var(--border-color)`, paddingTop: '0.45rem', marginTop: '0.35rem', flexShrink: 0 }}>"""

if old_nav_footer in code:
    code = code.replace(old_nav_footer, new_nav_footer)
    print("Successfully optimized Navigation Footer bottom margin alignment.")
else:
    print("⚠️ Warning: Nav footer block not found exactly.")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 V12 height-locking and layout alignment completed!")
