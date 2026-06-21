file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_wizard_loop_code = """{/* Individual Question Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {(() => {
                  const q = activePillar.questions[activeQuestionIdx];
                  if (!q) return null;
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
                    <div key={q.id} style={{ background: t.questionBg, border: t.questionBorder, borderRadius: '20px', padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                      
                      {/* circular step navigation indicators inside the card */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: t.cardBorder, paddingBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3b82f6', background: isLight ? '#eff6ff' : 'rgba(37,99,235,0.15)', padding: '0.2rem 0.65rem', borderRadius: '6px' }}>
                            {q.id} • {q.dimension}
                          </span>
                          
                          {/* Circular jump badges */}
                          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                            {activePillar.questions.map((item, idx) => {
                              const itemState = scores[item.id] || {};
                              const isCompleted = itemState.current !== null && itemState.current !== undefined && itemState.future !== null && itemState.future !== undefined;
                              const isActive = activeQuestionIdx === idx;
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => setActiveQuestionIdx(idx)}
                                  style={{
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: isActive 
                                      ? '#3b82f6' 
                                      : (isCompleted ? '#10b981' : (isLight ? '#e2e8f0' : 'rgba(255,255,255,0.08)')),
                                    color: isActive || isCompleted ? '#ffffff' : t.textSub,
                                    transition: 'all 0.15s ease'
                                  }}
                                  title={`Jump to ${item.id}`}
                                >
                                  {idx + 1}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 900, color: '#10b981', background: isLight ? '#dcfce7' : 'rgba(16,185,129,0.12)', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>
                          {scoringData.questionScores[q.id] || 0} Pts
                        </span>
                      </div>

                      {/* Topic Title */}
                      <div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 850, color: t.textMain, margin: 0, lineHeight: 1.35 }}>
                          {q.topic}
                        </h4>
                      </div>

                      {/* 4-Column Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                        
                        {/* Col 1: Current State (Amber Theme) */}
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
                                    padding: '0.55rem 0.65rem',
                                    borderRadius: '8px',
                                    fontSize: '0.72rem',
                                    fontWeight: isSelected ? 800 : 550,
                                    cursor: 'pointer',
                                    background: isSelected ? (isLight ? '#fffbeb' : 'rgba(245,158,11,0.08)') : t.optionBg,
                                    border: `1.5px solid ${isSelected ? '#f59e0b' : t.optionBorder}`,
                                    color: isSelected ? (isLight ? '#b45309' : '#fbbf24') : t.textSub,
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

                        {/* Col 2: Future State (Emerald Theme) */}
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
                                    padding: '0.55rem 0.65rem',
                                    borderRadius: '8px',
                                    fontSize: '0.72rem',
                                    fontWeight: isSelected ? 800 : 550,
                                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                                    background: isSelected ? (isLight ? '#ecfdf5' : 'rgba(16,185,129,0.08)') : t.optionBg,
                                    border: `1.5px solid ${isSelected ? '#10b981' : t.optionBorder}`,
                                    color: isSelected ? (isLight ? '#047857' : '#34d399') : t.textSub,
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

                        {/* Col 3: Technical Painpoints (Blue Theme) */}
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
                                    padding: '0.55rem 0.65rem',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: isSelected ? 800 : 550,
                                    cursor: 'pointer',
                                    background: isSelected ? (isLight ? '#eff6ff' : 'rgba(59,130,246,0.08)') : t.optionBg,
                                    border: `1.5px solid ${isSelected ? '#3b82f6' : t.optionBorder}`,
                                    color: isSelected ? (isLight ? '#1d4ed8' : '#60a5fa') : t.textSub,
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

                        {/* Col 4: Business Painpoints (Purple Theme) */}
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
                                    padding: '0.55rem 0.65rem',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: isSelected ? 800 : 550,
                                    cursor: 'pointer',
                                    background: isSelected ? (isLight ? '#f5f3ff' : 'rgba(139,92,246,0.08)') : t.optionBg,
                                    border: `1.5px solid ${isSelected ? '#8b5cf6' : t.optionBorder}`,
                                    color: isSelected ? (isLight ? '#6d28d9' : '#a78bfa') : t.textSub,
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
                                    style={{ marginRight: '0.4rem', accentColor: '#8b5cf6' }}
                                  />
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                      {/* Comment / Evidence Notes Box */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <textarea
                          placeholder="Enter active GxP compliance observations, integration notes, or SME validation remarks..."
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

                      {/* Wizard Navigation Footer */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: t.cardBorder, paddingTop: '0.85rem', marginTop: '0.25rem' }}>
                        <button
                          onClick={handleBack}
                          className="btn btn-outline"
                          style={{
                            padding: '0.45rem 1rem',
                            fontSize: '0.75rem',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            cursor: 'pointer',
                            border: t.cardBorder,
                            color: t.textMain,
                            background: 'transparent'
                          }}
                        >
                          <ArrowLeft size={13} />
                          <span>Back</span>
                        </button>

                        <span style={{ fontSize: '0.72rem', color: t.textSub, fontWeight: 700 }}>
                          Question {V11_PILLARS.indexOf(activePillar) * (activePillar.questions ? activePillar.questions.length : 3) + activeQuestionIdx + 1} of 21
                        </span>

                        <button
                          onClick={handleNext}
                          className="btn"
                          style={{
                            padding: '0.45rem 1rem',
                            fontSize: '0.75rem',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            cursor: 'pointer',
                            background: (activeTab === 'technical' && activePillar.id === 'SEC_VAL' && activeQuestionIdx === activePillar.questions.length - 1)
                              ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                              : 'linear-gradient(135deg, #3b82f6, #10b981)',
                            color: '#ffffff',
                            border: 'none',
                            fontWeight: 800
                          }}
                        >
                          <span>{(activeTab === 'technical' && activePillar.id === 'SEC_VAL' && activeQuestionIdx === activePillar.questions.length - 1) ? 'Compile & Run AI Scoping' : 'Next'}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>

                    </div>
                  );
                })()}
              </div>"""

# Target the exact Business list block using the correct old comment marker
biz_marker = "{/* Individual Questions List under this Tab */}"
start_idx = content.find(biz_marker)
if start_idx != -1:
    end_marker = "                }))}\n              </div>"
    end_idx = content.find(end_marker, start_idx)
    if end_idx != -1:
        end_idx += len(end_marker)
        content = content[:start_idx] + new_wizard_loop_code + content[end_idx:]
        print("Business loop successfully patched to wizard!")
    else:
        print("Failed to find end marker for business loop.")
else:
    print("Failed to find start marker for business loop.")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Business loop patch verification done!")
