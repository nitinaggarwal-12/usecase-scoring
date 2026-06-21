file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_loop_code = """{/* Individual Questions List under this Tab */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {activePillar.questions.map(q => {
                  const qState = scores[q.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                  const handleOptionSelect = (type, val) => {
                    setScores(prev => {
                      const state = prev[q.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                      return {
                        ...prev,
                        [q.id]: { ...state, [type]: val }
                      };
                    });
                  };

                  return (
                    <div key={q.id} style={{ background: t.questionBg, border: t.questionBorder, borderRadius: '20px', padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', borderBottom: t.cardBorder, paddingBottom: '0.75rem' }}>
                        <div>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3b82f6', background: isLight ? '#eff6ff' : 'rgba(37,99,235,0.15)', padding: '0.2rem 0.65rem', borderRadius: '6px', marginRight: '0.65rem' }}>
                            {q.id} • {q.dimension}
                          </span>
                          <h4 style={{ fontSize: '1.08rem', fontWeight: 850, color: t.textMain, display: 'inline', margin: 0, lineHeight: 1.35 }}>
                            {q.topic}
                          </h4>
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 900, color: '#10b981', background: isLight ? '#dcfce7' : 'rgba(16,185,129,0.12)', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>
                          {scoringData.questionScores[q.id] || 0} Pts
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                        
                        {/* Col 1: Current State */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.35rem', display: 'block', fontWeight: 800 }}>
                            Current State *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {q.currentOptions.map((opt, index) => {
                              const val = index + 1;
                              const isSelected = qState.current === val;
                              return (
                                <div
                                  key={`curr-${val}`}
                                  onClick={() => handleOptionSelect('current', val)}
                                  style={{
                                    padding: '0.5rem 0.6rem',
                                    borderRadius: '8px',
                                    fontSize: '0.72rem',
                                    fontWeight: isSelected ? 750 : 550,
                                    cursor: 'pointer',
                                    background: isSelected ? 'rgba(245,158,11,0.08)' : t.optionBg,
                                    border: `1.5px solid ${isSelected ? '#ea580c' : t.optionBorder}`,
                                    color: isSelected ? '#ea580c' : t.textSub,
                                    lineHeight: 1.3,
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  {opt}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Col 2: Future State */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.35rem', display: 'block', fontWeight: 800 }}>
                            Future State *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {q.futureOptions.map((opt, index) => {
                              const val = index + 1;
                              const isSelected = qState.future === val;
                              const isDisabled = qState.current !== null && val < qState.current;
                              return (
                                <div
                                  key={`fut-${val}`}
                                  onClick={() => !isDisabled && handleOptionSelect('future', val)}
                                  style={{
                                    padding: '0.5rem 0.6rem',
                                    borderRadius: '8px',
                                    fontSize: '0.72rem',
                                    fontWeight: isSelected ? 750 : 550,
                                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                                    background: isSelected ? 'rgba(16,185,129,0.08)' : t.optionBg,
                                    border: `1.5px solid ${isSelected ? '#10b981' : t.optionBorder}`,
                                    color: isSelected ? '#10b981' : t.textSub,
                                    lineHeight: 1.3,
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    opacity: isDisabled ? 0.35 : 1
                                  }}
                                >
                                  {opt}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Col 3: Technical Painpoints */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.35rem', display: 'block', fontWeight: 800 }}>
                            Technical Painpoints *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {q.technicalPainpoints.map((opt) => {
                              const isSelected = qState.techPain.includes(opt);
                              return (
                                <div
                                  key={opt}
                                  onClick={() => {
                                    setScores(prev => {
                                      const state = prev[q.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                                      const list = state.techPain.includes(opt) 
                                        ? state.techPain.filter(x => x !== opt)
                                        : [...state.techPain, opt];
                                      return { ...prev, [q.id]: { ...state, techPain: list } };
                                    });
                                  }}
                                  style={{
                                    padding: '0.5rem 0.6rem',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: isSelected ? 750 : 550,
                                    cursor: 'pointer',
                                    background: isSelected ? 'rgba(37,99,235,0.08)' : t.optionBg,
                                    border: `1.5px solid ${isSelected ? '#3b82f6' : t.optionBorder}`,
                                    color: isSelected ? '#3b82f6' : t.textSub,
                                    lineHeight: 1.25,
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                    style={{ marginRight: '0.4rem', accentColor: '#3b82f6' }}
                                  />
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Col 4: Business Painpoints */}
                        <div style={{ background: isLight ? '#ffffff' : 'rgba(6,9,19,0.2)', border: t.cardBorder, borderRadius: '14px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.textMain, letterSpacing: '0.5px', borderBottom: `1.5px solid ${t.questionBorder}`, paddingBottom: '0.35rem', display: 'block', fontWeight: 800 }}>
                            Business Painpoints *
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {q.businessPainpoints.map((opt) => {
                              const isSelected = qState.bizPain.includes(opt);
                              return (
                                <div
                                  key={opt}
                                  onClick={() => {
                                    setScores(prev => {
                                      const state = prev[q.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                                      const list = state.bizPain.includes(opt) 
                                        ? state.bizPain.filter(x => x !== opt)
                                        : [...state.bizPain, opt];
                                      return { ...prev, [q.id]: { ...state, bizPain: list } };
                                    });
                                  }}
                                  style={{
                                    padding: '0.5rem 0.6rem',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: isSelected ? 750 : 550,
                                    cursor: 'pointer',
                                    background: isSelected ? 'rgba(37,99,235,0.08)' : t.optionBg,
                                    border: `1.5px solid ${isSelected ? '#3b82f6' : t.optionBorder}`,
                                    color: isSelected ? '#3b82f6' : t.textSub,
                                    lineHeight: 1.25,
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                    style={{ marginRight: '0.4rem', accentColor: '#3b82f6' }}
                                  />
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.35rem' }}>
                        <textarea
                          placeholder="Enter active scoping notes, union agreements details, or custom SME validations observations..."
                          value={qState.comments || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setScores(prev => {
                              const state = prev[q.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                              return { ...prev, [q.id]: { ...state, comments: val } };
                            });
                          }}
                          style={{
                            width: '100%',
                            height: '55px',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '10px',
                            border: t.optionBorder,
                            background: t.optionBg,
                            color: t.textMain,
                            fontSize: '0.76rem',
                            fontFamily: 'inherit',
                            resize: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                    </div>
                  );
                })}
              </div>"""

# Find Business Loop
biz_marker = "{/* Individual Questions List under this Tab */}"
start_idx = content.find(biz_marker)
if start_idx != -1:
    # Find the end of the loop, which terminates with the next `                ))}\n              </div>`
    end_marker = "'))}\n              </div>"
    # Wait, in the code, is it `                ))}`? Yes!
    # Let's search for `map(q => (` ... `))}\n              </div>`
    end_idx = content.find("))}\n              </div>", start_idx)
    if end_idx != -1:
        end_idx += len("))}\n              </div>")
        content = content[:start_idx] + new_loop_code + content[end_idx:]
        print("Business loop replaced successfully!")

# Re-read to find Technical Loop
# The Technical loop marker is: {/* Individual Questions List under this Technical Tab */}
tech_marker = "{/* Individual Questions List under this Technical Tab */}"
start_idx_tech = content.find(tech_marker)
if start_idx_tech != -1:
    end_idx_tech = content.find("))}\n              </div>", start_idx_tech)
    if end_idx_tech != -1:
        end_idx_tech += len("))}\n              </div>")
        content = content[:start_idx_tech] + new_loop_code.replace("Individual Questions List under this Tab", "Individual Questions List under this Technical Tab") + content[end_idx_tech:]
        print("Technical loop replaced successfully!")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("UI loops successfully patched by index!")
