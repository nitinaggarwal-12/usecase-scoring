import re

file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Target Business Questionnaire Loop (starts with aria-labelledby={`q_label_${q.id}`})
biz_loop_pattern = r'\{\/\* Individual Questions List under this Tab \*\/\}\s*<div style=\{\{\s*display:\s*\'flex\',\s*flexDirection:\s*\'column\',\s*gap:\s*\'1\.5rem\'\s*\}\}>\s*\{activePillar\.questions\.map\(q => \(.*?\n\s*\)\)\}\s*<\/div>'

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

# Find and replace the Business questions list loop
business_marker = "{/* Individual Questions List under this Tab */}"
idx_biz = content.find(business_marker)
if idx_biz != -1:
    # Find the end of the map list which is at a closing `</div>` before `</div>\n            </div>\n          </div>\n        );\n      })()}`
    # Let's write a simple python loop to locate the end of the div
    pass

# To make the replacement 100% bulletproof, we will do a string replace on the exact text of the Business loop.
# Let's read the file as lines and find the block starting at `{activePillar.questions.map(q => (` and ending at `                ))} \n              </div>`
lines = content.split('\n')

def replace_question_loop(lines_arr, search_marker):
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines_arr):
        if search_marker in line and "activePillar.questions.map" in line:
            start_idx = i - 1  # Include the parent div opening or the comment marker
            break
            
    if start_idx != -1:
        # Find the closing parent </div> which is 17 lines down in the old code or we can count brackets
        # Let's count open/close parentheses or divs
        open_divs = 1
        for j in range(start_idx + 2, len(lines_arr)):
            if "<div" in lines_arr[j]:
                open_divs += lines_arr[j].count("<div")
            if "</div" in lines_arr[j]:
                open_divs -= lines_arr[j].count("</div")
            if "</div>" in lines_arr[j] and open_divs == 0:
                end_idx = j
                break
    return start_idx, end_idx

# Replace the first loop (Business)
start_biz, end_biz = replace_question_loop(lines, "Individual Questions List under this Tab")
if start_biz != -1 and end_biz != -1:
    print(f"Found Business Loop from line {start_biz} to {end_biz}")
    # Replace lines from start_biz to end_biz inclusive
    lines = lines[:start_biz] + [new_loop_code] + lines[end_biz+1:]

# Save and reload lines to find the Technical loop
content_temp = '\n'.join(lines)
lines = content_temp.split('\n')

# Replace the second loop (Technical)
start_tech, end_tech = replace_question_loop(lines, "Individual Questions List under this Technical Tab")
if start_tech != -1 and end_tech != -1:
    print(f"Found Technical Loop from line {start_tech} to {end_tech}")
    lines = lines[:start_tech] + [new_loop_code.replace("Individual Questions List under this Tab", "Individual Questions List under this Technical Tab")] + lines[end_tech+1:]

content_final = '\n'.join(lines)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content_final)

print("UI loops successfully replaced with V5 4-column cards!")
