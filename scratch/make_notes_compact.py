import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Locate the bottom Notes Box in PremiumScopingAssessorV12.jsx
old_notes_box = """            {/* 4. BOTTOM AUDITOR NOTES CANVAS (Full-Width Flex-Stretch!) */}
            <div style={{ background: colors.cardBg, border: `1px solid var(--border-color)`, borderRadius: '8px', padding: '0.55rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1, minHeight: '80px', marginTop: '0.35rem', boxSizing: 'border-box' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: colors.textDark, letterSpacing: '0.5px' }}>
                NOTES & COMMENTS BOX *
              </span>
              <textarea
                value={scores[activeQuestionId]?.comments || ''}
                onChange={e => handleCommentChange(e.target.value)}
                placeholder="Type clinical requirements, regulatory guidelines (e.g. FDA GxP), validation bottlenecks, or CapEx/OpEx constraints noted during this stakeholder interview..."
                style={{
                  width: '100%',
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.8rem',
                  color: colors.textDark,
                  background: 'transparent',
                  fontFamily: 'inherit',
                  lineHeight: 1.45,
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>"""

new_notes_box = """            {/* 4. BOTTOM AUDITOR NOTES CANVAS (Compact, Sleek 1-Line Input!) */}
            <div style={{ background: colors.cardBg, border: `1px solid var(--border-color)`, borderRadius: '8px', padding: '0.4rem 0.65rem 0.45rem 0.65rem', display: 'flex', flexDirection: 'column', gap: '0.1rem', flexShrink: 0, marginTop: '0.35rem', boxSizing: 'border-box' }}>
              <span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.textMuted, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                NOTES & COMMENTS BOX *
              </span>
              <textarea
                value={scores[activeQuestionId]?.comments || ''}
                onChange={e => handleCommentChange(e.target.value)}
                placeholder="Type clinical requirements, GxP validation bottlenecks, or constraints..."
                style={{
                  width: '100%',
                  height: '24px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.78rem',
                  color: colors.textDark,
                  background: 'transparent',
                  fontFamily: 'inherit',
                  lineHeight: 1.25,
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>"""

if old_notes_box in code:
    code = code.replace(old_notes_box, new_notes_box)
    print("Successfully converted Notes Box to a compact, single-line input card!")
else:
    print("⚠️ Warning: Notes box block not found exactly in PremiumScopingAssessorV12.jsx.")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 V12 notes box compaction complete!")
