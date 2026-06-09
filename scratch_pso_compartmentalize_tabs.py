filepath = "/Users/nitinagga/Documents/usecase_scoring/src/components/AgenticDiscoveryV7.jsx"

with open(filepath, "r", encoding="utf-8") as f:
    text = f.read()

# Let's define the mapping of deep-dive tabs to their corresponding database sections
# activeDeepDiveTab:
# - 'strategic': 'ctx', 'pain', 'value', 'users'
# - 'data': 'data', 'current'
# - 'architecture': 'target'
# - 'security': 'security', 'connectivity'
# - 'execution': 'team', 'sustain'

# 1. Update getNarrativeContent to include the 'sec' field for all compiled items statefully!
old_narrative_content_js = """  // --- Consultative Narrative Generator (§7.5 Symmetrical to V6!) ---
  const getNarrativeContent = () => {
    const whatsGood = [];
    const blockersAndGaps = [];
    const recommendations = [];

    if (state['tgt1']?.selectedOptions?.[0]?.includes('1.5 Pro')) {
      whatsGood.push({
        title: 'Enterprise Reasoning Model',
        desc: 'Gemini 1.5 Pro selected, unlocking the industry-leading 1M token context window and eliminating complex document chunking.'
      });
    }
    if (state['con1']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        title: 'Secure Transit Path',
        desc: 'Private cross-cloud connectivity successfully designed and validated for transit. Traverses no public internet perimeters.'
      });
    }
    if (state['sec7']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        title: 'Aligned Security Gate',
        desc: 'Corporate security architecture review completed and target GCP VPC-SC landing zone approved.'
      });
    }
    if (state['tea1']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        title: 'Resource Commitments Secured',
        desc: 'Named engineering team confirmed with >50% dedicated bandwidth, preventing sprint kick-off resource delays.'
      });
    }
    if (whatsGood.length === 0) {
      whatsGood.push({
        title: 'Strategic AI Alignment',
        desc: 'Use case parameters mapped successfully inside HCLS compliance perimeters.'
      });
    }

    QUESTIONS.forEach(q => {
      if (q.path === 'recreate' && currentPath === 'build') return;
      const item = state[q.id];
      if (!item) return;
      const isTriggered = item.selectedOptions?.includes(q.blocker?.cond);
      if (isTriggered && q.blocker && (q.blocker.type === 'fatal' || q.blocker.type === 'start')) {
        blockersAndGaps.push({
          title: `${q.blocker.type.toUpperCase()} BLOCKER: ${q.blocker.title}`,
          desc: q.blocker.body,
          opts: q.blocker.opts
        });
      }
    });

    if (state['con4']?.selectedOptions?.[0]?.includes('Standard or Enterprise')) {
      recommendations.push({
        title: 'Upgrade Snowflake Infrastructure',
        desc: 'Transition Snowflake from Standard/Enterprise to Business Critical edition to enable secure AWS PrivateLink egress routing.'
      });
    }
    if (state['con1']?.selectedOptions?.[0]?.includes('Not yet designed')) {
      recommendations.push({
        title: 'Scaffold Private Service Connect (PSC)',
        desc: 'Deploy GCP Private Service Connect and HA VPN gateways to route HCLS data sources securely, bypassing public internet perimeters.'
      });
    }
    if (state['sec3']?.selectedOptions?.[0]?.includes('Yes') && state['sec3']?.selectedOptions?.[0]?.includes('not scoped')) {
      recommendations.push({
        title: 'Initiate GxP FDA Validation Scoping',
        desc: 'Engage a dedicated validation SME early to author IQ/OQ/PQ protocols, preventing late-stage production release locks.'
      });
    }
    if (state['dat5']?.selectedOptions?.[0]?.includes('No')) {
      recommendations.push({
        title: 'Establish Golden Evaluation Dataset',
        desc: 'Assemble an initial corpus of 100+ gold-standard clinical query-response pairs to run Vertex AI Search accuracy evaluations.'
      });
    }
    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Proceed to Technical Architecture Design',
        desc: 'Remediation logs are clear. Draft target GCS and Cloud Run Terraform landing zones in Sprint 0.'
      });
    }

    return { whatsGood, blockersAndGaps, recommendations };
  };"""

new_narrative_content_js = """  // --- Consultative Narrative Generator (§7.5 Symmetrical to V6!) ---
  const getNarrativeContent = () => {
    const whatsGood = [];
    const blockersAndGaps = [];
    const recommendations = [];

    if (state['tgt1']?.selectedOptions?.[0]?.includes('1.5 Pro')) {
      whatsGood.push({
        sec: 'target',
        title: 'Enterprise Reasoning Model',
        desc: 'Gemini 1.5 Pro selected, unlocking the industry-leading 1M token context window and eliminating complex document chunking.'
      });
    }
    if (state['con1']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        sec: 'connectivity',
        title: 'Secure Transit Path',
        desc: 'Private cross-cloud connectivity successfully designed and validated for transit. Traverses no public internet perimeters.'
      });
    }
    if (state['sec7']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        sec: 'security',
        title: 'Aligned Security Gate',
        desc: 'Corporate security architecture review completed and target GCP VPC-SC landing zone approved.'
      });
    }
    if (state['tea1']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        sec: 'team',
        title: 'Resource Commitments Secured',
        desc: 'Named engineering team confirmed with >50% dedicated bandwidth, preventing sprint kick-off resource delays.'
      });
    }
    if (whatsGood.length === 0) {
      whatsGood.push({
        sec: 'ctx',
        title: 'Strategic AI Alignment',
        desc: 'Use case parameters mapped successfully inside HCLS compliance perimeters.'
      });
    }

    QUESTIONS.forEach(q => {
      if (q.path === 'recreate' && currentPath === 'build') return;
      const item = state[q.id];
      if (!item) return;
      const isTriggered = item.selectedOptions?.includes(q.blocker?.cond);
      if (isTriggered && q.blocker && (q.blocker.type === 'fatal' || q.blocker.type === 'start')) {
        blockersAndGaps.push({
          sec: q.sec,
          title: `${q.blocker.type.toUpperCase()} BLOCKER: ${q.blocker.title}`,
          desc: q.blocker.body,
          opts: q.blocker.opts
        });
      }
    });

    if (state['con4']?.selectedOptions?.[0]?.includes('Standard or Enterprise')) {
      recommendations.push({
        sec: 'connectivity',
        title: 'Upgrade Snowflake Infrastructure',
        desc: 'Transition Snowflake from Standard/Enterprise to Business Critical edition to enable secure AWS PrivateLink egress routing.'
      });
    }
    if (state['con1']?.selectedOptions?.[0]?.includes('Not yet designed')) {
      recommendations.push({
        sec: 'connectivity',
        title: 'Scaffold Private Service Connect (PSC)',
        desc: 'Deploy GCP Private Service Connect and HA VPN gateways to route HCLS data sources securely, bypassing public internet perimeters.'
      });
    }
    if (state['sec3']?.selectedOptions?.[0]?.includes('Yes') && state['sec3']?.selectedOptions?.[0]?.includes('not scoped')) {
      recommendations.push({
        sec: 'security',
        title: 'Initiate GxP FDA Validation Scoping',
        desc: 'Engage a dedicated validation SME early to author IQ/OQ/PQ protocols, preventing late-stage production release locks.'
      });
    }
    if (state['dat5']?.selectedOptions?.[0]?.includes('No')) {
      recommendations.push({
        sec: 'data',
        title: 'Establish Golden Evaluation Dataset',
        desc: 'Assemble an initial corpus of 100+ gold-standard clinical query-response pairs to run Vertex AI Search accuracy evaluations.'
      });
    }
    if (recommendations.length === 0) {
      recommendations.push({
        sec: 'target',
        title: 'Proceed to Technical Architecture Design',
        desc: 'Remediation logs are clear. Draft target GCS and Cloud Run Terraform landing zones in Sprint 0.'
      });
    }

    return { whatsGood, blockersAndGaps, recommendations };
  };"""

assert old_narrative_content_js in text, "Could not locate old narrative content generator in AgenticDiscoveryV7.jsx"
text_cleaned = text.replace(old_narrative_content_js, new_narrative_content_js)

# 2. Update the Tier 2 4-Quadrant consulting view rendering block to statefully filter based on activeDeepDiveTab!
old_four_quadrants_js = """                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
                    
                    {/* Left Column: Strengths & Strategies */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Strengths */}
                      <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-green)' }}>
                        <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-green)', margin: '0 0 10px 0' }}>
                          ✅ SCOPING STRENGTHS & IN-FAVOR FACTORS
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {nvGood.map((g, idx) => (
                            <div key={idx} style={{ fontSize: '11.5px' }}>
                              <strong style={{ color: '#fff', display: 'block' }}>{g.title}</strong>
                              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{g.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strategies */}
                      <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-blue)' }}>
                        <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-blue)', margin: '0 0 10px 0' }}>
                          💡 PRIORITY REMEDIATION STRATEGIES
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {nvRecs.map((r, idx) => (
                            <div key={idx} style={{ fontSize: '11.5px' }}>
                              <strong style={{ color: '#fff', display: 'block' }}>{r.title}</strong>
                              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{r.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Roadblocks & Timelines */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Roadblocks */}
                      <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: \`4px solid \${nvBlockers.length > 0 ? 'var(--google-red)' : 'var(--text-secondary)'}\` }}>
                        <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: nvBlockers.length > 0 ? 'var(--google-red)' : 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                          ⚠️ STRATEGIC ROADBLOCKS & BLOCKERS
                        </h4>
                        {nvBlockers.length === 0 ? (
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            Zero roadblocks. Target platform has clear path.
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {nvBlockers.map((b, idx) => (
                              <div key={idx} style={{ fontSize: '11.5px' }}>
                                <strong style={{ color: 'var(--google-red)', display: 'block' }}>{b.title}</strong>
                                <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{b.desc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Timelines */}
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-amber)' }}>
                        <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-amber)', margin: '0 0 10px 0' }}>
                          📅 JOINT ACTIONS & TIMELINES
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {finalSteps.slice(0, 3).map((step, idx) => (
                            <div key={idx} style={{ fontSize: '11.5px' }}>
                              <strong style={{ color: '#fff', display: 'block' }}>{step.title}</strong>
                              <span style={{ color: 'var(--text-secondary)', display: 'block', margin: '2px 0' }}>{step.desc}</span>
                              <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '1px 4px', borderRadius: '4px', color: 'var(--text-primary)' }}>
                                {step.owner} · {step.timeline}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>"""

new_four_quadrants_js = """                  {(() => {
                    // Define HCLS Pillar-to-Section mappings (Strategic, Data, Architecture, Security, Execution)
                    const getPillarSections = (pId) => {
                      if (pId === 'strategic') return ['ctx', 'pain', 'value', 'users'];
                      if (pId === 'data') return ['data', 'current'];
                      if (pId === 'architecture') return ['target'];
                      if (pId === 'security') return ['security', 'connectivity'];
                      return ['team', 'sustain'];
                    };

                    const mappedSecs = getPillarSections(activeDeepDiveTab);

                    // Filter narrative contents statefully!
                    const filteredGood = nvGood.filter(g => mappedSecs.includes(g.sec));
                    const filteredBlockers = nvBlockers.filter(b => mappedSecs.includes(b.sec));
                    const filteredRecs = nvRecs.filter(r => mappedSecs.includes(r.sec));

                    // Standardize fallbacks for empty states per pillar
                    const finalGood = filteredGood.length > 0 ? filteredGood : [{ title: 'Foundation Verified', desc: 'Core structures compiled safely.' }];
                    const finalRecs = filteredRecs.length > 0 ? filteredRecs : [{ title: 'Aligned Roadmap', desc: 'No critical strategies required for this pillar.' }];

                    // Symmetrical Timeline Phase matching based on deep dive pillar!
                    const getPillarTimeline = (pId) => {
                      if (pId === 'data') return [finalSteps[0]]; // Phase 0
                      if (pId === 'architecture') return [finalSteps[1]]; // Phase 1
                      if (pId === 'security') return [finalSteps[2]]; // Phase 2
                      if (pId === 'execution') return [finalSteps[3]]; // Phase 3
                      return finalSteps.slice(0, 3); // Strategic default
                    };
                    const timelineSteps = getPillarTimeline(activeDeepDiveTab);

                    return (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
                        
                        {/* Left Column: Strengths & Strategies */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {/* Strengths */}
                          <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-green)' }}>
                            <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-green)', margin: '0 0 10px 0' }}>
                              ✅ SCOPING STRENGTHS & IN-FAVOR FACTORS
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {finalGood.map((g, idx) => (
                                <div key={idx} style={{ fontSize: '11.5px' }}>
                                  <strong style={{ color: '#fff', display: 'block' }}>{g.title}</strong>
                                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{g.desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Strategies */}
                          <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-blue)' }}>
                            <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-blue)', margin: '0 0 10px 0' }}>
                              💡 PRIORITY REMEDIATION STRATEGIES
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {finalRecs.map((r, idx) => (
                                <div key={idx} style={{ fontSize: '11.5px' }}>
                                  <strong style={{ color: '#fff', display: 'block' }}>{r.title}</strong>
                                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{r.desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Roadblocks & Timelines */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {/* Roadblocks */}
                          <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: `4px solid ${filteredBlockers.length > 0 ? 'var(--google-red)' : 'var(--text-secondary)'}` }}>
                            <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: filteredBlockers.length > 0 ? 'var(--google-red)' : 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                              ⚠️ STRATEGIC ROADBLOCKS & BLOCKERS
                            </h4>
                            {filteredBlockers.length === 0 ? (
                              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '8px 0' }}>
                                🎉 Zero active blockers detected. The target platform is fully optimized for this pillar!
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {filteredBlockers.map((b, idx) => (
                                  <div key={idx} style={{ fontSize: '11.5px' }}>
                                    <strong style={{ color: 'var(--google-red)', display: 'block' }}>{b.title}</strong>
                                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{b.desc}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Timelines */}
                          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-amber)' }}>
                            <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-amber)', margin: '0 0 10px 0' }}>
                              📅 JOINT ACTIONS & TIMELINES
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {timelineSteps.map((step, idx) => (
                                <div key={idx} style={{ fontSize: '11.5px' }}>
                                  <strong style={{ color: '#fff', display: 'block' }}>{step.title}</strong>
                                  <span style={{ color: 'var(--text-secondary)', display: 'block', margin: '2px 0' }}>{step.desc}</span>
                                  <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '1px 4px', borderRadius: '4px', color: 'var(--text-primary)' }}>
                                    {step.owner} · {step.timeline}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })()}"""

assert old_four_quadrants_js in text_cleaned, "Could not locate old four quadrants rendering block in AgenticDiscoveryV7.jsx"
text_final = text_cleaned.replace(old_four_quadrants_js, new_four_quadrants_js)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(text_final)

print("Successfully statefully compartmentalized all V7 Deep-Dive tabs symmetrical to V6!")
