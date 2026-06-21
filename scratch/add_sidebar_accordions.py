import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Locate the pillars list block in PremiumScopingAssessorV12.jsx
old_pillars_list = """          {/* Pillars List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {V12_PILLARS.map((pillar, idx) => {
              const isActive = idx === activePillarIdx;
              return (
                <div
                  key={pillar.id}
                  onClick={() => { setActivePillarIdx(idx); setActiveQuestionIdx(0); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.55rem',
                    borderRadius: '6px',
                    background: isActive ? 'var(--bg-primary)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.82rem', color: isActive ? colors.accentBlue : colors.textMuted }}>
                      {idx === 0 ? '📊' : idx === 1 ? '🧠' : idx === 2 ? '🔌' : idx === 3 ? '⚙️' : idx === 4 ? '🛡️' : '⚖️'}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: isActive ? 850 : 550, color: isActive ? colors.textDark : colors.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pillar.name.split('. ')[1]}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.6rem', fontWeight: 800, color: colors.textMuted }}>
                    {getPillarProgress(pillar)}
                  </span>
                </div>
              );
            })}
          </div>"""

new_pillars_list = """          {/* Pillars List (Accordion-enabled!) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {V12_PILLARS.map((pillar, idx) => {
              const isActive = idx === activePillarIdx;
              return (
                <div key={pillar.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  
                  {/* Pillar Header Item */}
                  <div
                    onClick={() => { setActivePillarIdx(idx); setActiveQuestionIdx(0); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.4rem 0.55rem',
                      borderRadius: '6px',
                      background: isActive ? 'var(--bg-primary)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      border: isActive ? `1px solid var(--border-color)` : '1px solid transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                      <span style={{ fontSize: '0.82rem', color: isActive ? colors.accentBlue : colors.textMuted }}>
                        {idx === 0 ? '📊' : idx === 1 ? '🧠' : idx === 2 ? '🔌' : idx === 3 ? '⚙️' : idx === 4 ? '🛡️' : '⚖️'}
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: isActive ? 850 : 550, color: isActive ? colors.textDark : colors.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {pillar.name.split('. ')[1]}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.6rem', fontWeight: 800, color: colors.textMuted }}>
                      {getPillarProgress(pillar)}
                    </span>
                  </div>

                  {/* Expanded Dimensions Sub-list */}
                  {isActive && (
                    <div 
                      style={{ 
                        paddingLeft: '0.75rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.15rem', 
                        borderLeft: '1.5px solid var(--border-color)', 
                        marginLeft: '0.75rem', 
                        marginTop: '0.1rem',
                        marginBottom: '0.2rem'
                      }}
                    >
                      {pillar.questions.map((q, qIdx) => {
                        const isQActive = qIdx === activeQuestionIdx;
                        
                        // Calculate answer status
                        const isAnswered = typeof scores[q.id]?.current === 'number';
                        
                        return (
                          <div
                            key={q.id}
                            onClick={() => setActiveQuestionIdx(qIdx)}
                            style={{
                              padding: '0.2rem 0.4rem',
                              borderRadius: '4px',
                              fontSize: '0.65rem',
                              fontWeight: isQActive ? 850 : 550,
                              color: isQActive ? colors.accentBlue : isAnswered ? colors.textDark : colors.textMuted,
                              background: isQActive ? colors.accentBlueLight : 'transparent',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              transition: 'all 0.1s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.2rem'
                            }}
                            title={q.dimension}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {q.id} {q.dimension}
                            </span>
                            
                            {/* Visual completion dot */}
                            {isAnswered && (
                              <span style={{ 
                                width: '4px', 
                                height: '4px', 
                                borderRadius: '50%', 
                                background: '#16a34a', 
                                flexShrink: 0 
                              }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>"""

if old_pillars_list in code:
    code = code.replace(old_pillars_list, new_pillars_list)
    print("Successfully replaced pillars list in V12 with the new accordion nested dimensions list!")
else:
    print("⚠️ Warning: Pillars list block not found exactly in PremiumScopingAssessorV12.jsx.")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Accordion navigation update complete!")
