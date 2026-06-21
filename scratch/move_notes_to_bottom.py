import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# -----------------------------------------------------------------------------
# 1. Update stylesheet grid template columns (change 5-col to 4-col)
# -----------------------------------------------------------------------------
code = code.replace(
    """        .v12-grid-area {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1.2fr;
          gap: 0.5rem;
          flex: 1;
          min-height: 0;
        }""",
    """        .v12-grid-area {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          flex-shrink: 0;
          min-height: 0;
        }"""
)

# -----------------------------------------------------------------------------
# 2. Update Column Headers block in JSX (Remove Notes header, change to 4-col)
# -----------------------------------------------------------------------------
old_headers = """              {/* Grid Column Header Capsules */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1.2fr', gap: '0.5rem', flexShrink: 0 }}>
                <div className="v12-column-header-capsule">
                  Current State <span className="q-badge" title="Score from 1 to 5 reflecting active operational baseline.">?</span>
                </div>
                <div className="v12-column-header-capsule">
                  Future State Vision <span className="q-badge" title="Target maturity score to be achieved by post-launch scaling.">?</span>
                </div>
                <div className="v12-column-header-capsule">Technical Pain Points</div>
                <div className="v12-column-header-capsule">Business Pain Points</div>
                <div className="v12-column-header-capsule">Notes</div>
              </div>"""

new_headers = """              {/* Grid Column Header Capsules (Spacious 4-Column!) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', flexShrink: 0 }}>
                <div className="v12-column-header-capsule">
                  Current State <span className="q-badge" title="Score from 1 to 5 reflecting active operational baseline.">?</span>
                </div>
                <div className="v12-column-header-capsule">
                  Future State Vision <span className="q-badge" title="Target maturity score to be achieved by post-launch scaling.">?</span>
                </div>
                <div className="v12-column-header-capsule">Technical Pain Points</div>
                <div className="v12-column-header-capsule">Business Pain Points</div>
              </div>"""

code = code.replace(old_headers, new_headers)

# -----------------------------------------------------------------------------
# 3. Update Grid Body & Move Spanning Notes Box to Bottom
# -----------------------------------------------------------------------------
# We will remove the notes card from inside the grid and place it as a full-width card below the grid
old_grid_body_start = """              {/* 5-Column Grid Body */}
              <div className="v12-grid-area">
                
                {/* Spanning Notes Card in Column 5 (Spans rows 1 to 5) */}
                <div className="v12-notes-card" style={{ gridColumn: 5, gridRow: '1 / 6' }}>
                  <div style={{ background: colors.cardBg, height: '100%', padding: '0.6rem', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                    <textarea
                      value={scores[activeQuestionId]?.comments || ''}
                      onChange={e => handleCommentChange(e.target.value)}
                      placeholder="Type clinical requirements, regulatory guidelines (e.g. FDA GxP), validation bottlenecks, or CapEx/OpEx constraints noted during this stakeholder interview..."
                      style={{
                        width: '100%',
                        height: '100%',
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
                  </div>
                </div>"""

new_grid_body_start = """              {/* 4-Column Symmetrical Grid Body */}
              <div className="v12-grid-area" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', flexShrink: 0 }}>"""

code = code.replace(old_grid_body_start, new_grid_body_start)

# Now, we find where the grid ends (right before the Navigation Footer) and insert the bottom Notes Box there!
old_footer_block = """            {/* 4. NAVIGATION FOOTER BAR */}"""

new_notes_and_footer = """            {/* 4. BOTTOM AUDITOR NOTES CANVAS (Full-Width Flex-Stretch!) */}
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
            </div>

            {/* 5. NAVIGATION FOOTER BAR */}"""

code = code.replace(old_footer_block, new_notes_and_footer)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully moved Notes & Comments box to the bottom and restored spacious 4-column grid!")
