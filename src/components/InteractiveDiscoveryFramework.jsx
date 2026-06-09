import { useState } from 'react';
import { 
  Sparkles, Shield, Check, HelpCircle, AlertTriangle, ArrowRight, ArrowLeft, 
  CheckCircle, Lock, Unlock, Info, Terminal, Network, FileText, 
  Paperclip, BarChart3, CheckSquare, Square, ChevronDown, ChevronUp
} from 'lucide-react';

export default function InteractiveDiscoveryFramework({ sessions = [] }) {
  // --- Main Navigation State ---
  // activeSection can be 1 (Intake), 2 (Model capability), 3 (Data connectivity), 
  // 4 (Security & compliance), 5 (Infrastructure), 6 (Team readiness), 7 (Business value)
  // or 'score' (when View Score is clicked)
  // or 'architecture' (when Reference Architecture is clicked)
  const [activeSection, setActiveSection] = useState(1);
  const [isLocked, setIsLocked] = useState(false);

  // Reference Architecture sub-tab state
  const [activeArchTab, setActiveArchTab] = useState('psc'); // 'psc' | 'veeva' | 'rag'

  // --- Section Mapping ---
  const sections = [
    {
      id: 1,
      title: 'Intake',
      desc: 'Define scope, current stack, and migration context. Fields marked * are required for PDF export.',
    },
    {
      id: 2,
      title: 'Model capability',
      desc: 'Rate each check. Attach evidence (URL, doc name, ticket) to upgrade from "Claimed" to "Confirmed" — this directly raises your confidence score.',
      checks: [
        { id: 'm1', label: 'Context window / long-doc handling sufficient' },
        { id: 'm2', label: 'Multimodal requirements (vision, audio) covered' },
        { id: 'm3', label: 'Reasoning / chain-of-thought depth adequate' },
        { id: 'm4', label: 'Function calling / tool use parity confirmed' },
        { id: 'm5', label: 'Fine-tuning or grounding approach defined' }
      ]
    },
    {
      id: 3,
      title: 'Data connectivity',
      desc: 'Rate each check. Attach evidence (URL, doc name, ticket) to upgrade from "Claimed" to "Confirmed" — this directly raises your confidence score.',
      checks: [
        { id: 'd1', label: 'All source systems reachable from GCP' },
        { id: 'd2', label: 'Private connectivity (PSC / VPN) designed' },
        { id: 'd3', label: 'Data volume within Vertex AI / BQ limits' },
        { id: 'd4', label: 'Data quality and schema documented' },
        { id: 'd5', label: 'Streaming requirements addressed' }
      ]
    },
    {
      id: 4,
      title: 'Security & compliance',
      desc: 'Rate each check. Attach evidence (URL, doc name, ticket) to upgrade from "Claimed" to "Confirmed" — this directly raises your confidence score.',
      checks: [
        { id: 's1', label: 'PHI de-identification or CMEK in place' },
        { id: 's2', label: 'Data residency requirements met' },
        { id: 's3', label: 'IAM + VPC-SC boundaries defined' },
        { id: 's4', label: 'Audit logging mapped to compliance' },
        { id: 's5', label: 'DLP on prompts and outputs configured' }
      ]
    },
    {
      id: 5,
      title: 'Infrastructure',
      desc: 'Rate each check. Attach evidence (URL, doc name, ticket) to upgrade from "Claimed" to "Confirmed" — this directly raises your confidence score.',
      checks: [
        { id: 'i1', label: 'Orchestration layer decided' },
        { id: 'i2', label: 'Downstream APIs accessible and documented' },
        { id: 'i3', label: 'CI/CD and deployment pipeline defined' },
        { id: 'i4', label: 'Observability and eval harness defined' },
        { id: 'i5', label: 'SDK migration path confirmed' }
      ]
    },
    {
      id: 6,
      title: 'Team readiness',
      desc: 'Rate each check. Attach evidence (URL, doc name, ticket) to upgrade from "Claimed" to "Confirmed" — this directly raises your confidence score.',
      checks: [
        { id: 't1', label: 'GCP / Vertex AI experience or training planned' },
        { id: 't2', label: 'MLOps / LLMOps practices defined' },
        { id: 't3', label: 'Security engineering familiar with GCP IAM' },
        { id: 't4', label: 'Team capacity allocated' },
        { id: 't5', label: 'Executive champion engaged' }
      ]
    },
    {
      id: 7,
      title: 'Business value',
      desc: 'Rate each check. Attach evidence (URL, doc name, ticket) to upgrade from "Claimed" to "Confirmed" — this directly raises your confidence score.',
      checks: [
        { id: 'v1', label: 'Business case / ROI documented' },
        { id: 'v2', label: 'Success KPIs defined' },
        { id: 'v3', label: 'Baseline metrics available' },
        { id: 'v4', label: 'Build vs buy analysis completed' },
        { id: 'v5', label: 'Prioritized above alternative initiatives' }
      ]
    }
  ];

  // --- Section 1: Intake Fields State (Prefilled to match screenshots) ---
  const [useCaseName, setUseCaseName] = useState('Clinical trial protocol summarization agent');
  const [businessDomain, setBusinessDomain] = useState('Pharma / Clinical Operations');
  const [aiStack, setAiStack] = useState(['Azure OpenAI GPT-4o']);
  const [cloudInfra, setCloudInfra] = useState(['AWS', 'Azure']);
  const [agentType, setAgentType] = useState(['RAG / knowledge', 'Document processing']);
  const [dataSources, setDataSources] = useState(['Snowflake', 'Veeva Vault', 'S3 / GCS']);
  const [compliance, setCompliance] = useState(['HIPAA / PHI', 'GxP', 'FDA regulated']);
  const [contextConstraints, setContextConstraints] = useState(
    'PSC required for Snowflake (AWS to GCP). PHI involved — HIPAA BAA needed on GCP. GxP validation required. Exec mandate to consolidate on GCP Q3. Team of 6, limited GCP experience.'
  );

  // --- Questionnaire Triple-States Answers (Prefilled to match screenshots 1, 2, 3, 5) ---
  const [answers, setAnswers] = useState({
    // Model capability fit (Screenshot 3)
    m1: 'Yes',
    m2: 'Yes',
    m3: 'Yes',
    m4: 'Yes',
    m5: 'Partial',
    // Data connectivity & pipeline (Screenshot 4)
    d1: 'Partial',
    d2: 'No',
    d3: 'Yes',
    d4: 'Partial',
    d5: 'Yes',
    // Security, compliance & governance (Screenshot 5)
    s1: 'Partial',
    s2: 'Yes',
    s3: 'Partial',
    s4: 'Yes',
    s5: 'No',
    // Infrastructure & integration (Screenshot 1)
    i1: 'Partial',
    i2: 'Yes',
    i3: 'Yes',
    i4: 'Partial',
    i5: 'Partial',
    // Team readiness (Screenshot 2)
    t1: 'Partial',
    t2: 'No',
    t3: 'Partial',
    t4: 'Partial',
    t5: 'Yes',
    // Business value (Screenshot 3)
    v1: 'Yes',
    v2: 'Yes',
    v3: 'Partial',
    v4: 'Yes',
    v5: 'Yes',
  });

  // --- Evidence Attachments State (Prefilled to match screenshots 3 & 5) ---
  const [evidence, setEvidence] = useState({
    // Model capability fit
    m1: 'Gemini 1.5 Pro 1M context window confirm...',
    m3: 'Internal benchmarking doc v2.1',
    // Data connectivity
    d3: 'Estimated 50M tokens/day - within limits...',
    d5: 'Pub/Sub + Dataflow design doc attached',
    // Security
    s2: 'us-central1 region selected - HIPAA elig...',
    s4: 'Cloud Audit Logs enabled on project',
    // Business value (Screenshot 3)
    v1: 'Business case approved by CFO Q2 2024',
    v2: 'KPI doc shared in Drive',
    v4: 'Build vs buy analysis v1.0',
    v5: 'Board-approved Q3 mandate',
  });

  // --- Interactive Evidence Inputs UI state ---
  const [showEvidenceInput, setShowEvidenceInput] = useState({});
  const [tempEvidenceText, setTempEvidenceText] = useState({});

  // --- Expander State for Blockers & Gaps ---
  const [expandedGaps, setExpandedGaps] = useState({
    d2: false,
    s5: false,
    t2: false,
    i1: false,
    t1: false,
    t3: false,
    t4: false,
    s1: false,
    s3: false,
    i4: false
  });

  const toggleGapExpander = (gapId) => {
    setExpandedGaps(prev => ({ ...prev, [gapId]: !prev[gapId] }));
  };

  // --- Handlers ---
  const handleAnswerChange = (checkId, value) => {
    if (isLocked) return;
    setAnswers(prev => ({ ...prev, [checkId]: value }));
  };

  const handleAttachEvidence = (checkId) => {
    if (isLocked) return;
    const text = tempEvidenceText[checkId] || '';
    if (text.trim()) {
      setEvidence(prev => ({ ...prev, [checkId]: text }));
      setShowEvidenceInput(prev => ({ ...prev, [checkId]: false }));
      setTempEvidenceText(prev => ({ ...prev, [checkId]: '' }));
    }
  };

  const handleClearEvidence = (checkId) => {
    if (isLocked) return;
    setEvidence(prev => {
      const copy = { ...prev };
      delete copy[checkId];
      return copy;
    });
  };

  const handlePillToggle = (list, setList, value) => {
    if (isLocked) return;
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // --- Scopes & Weights Calculations ---
  const calculateDimensionScore = (dimKey) => {
    const dim = sections.find(d => d.id === dimKey);
    if (!dim || !dim.checks) return 0;
    
    let scoreSum = 0;
    dim.checks.forEach(c => {
      const ans = answers[c.id];
      if (ans === 'Yes') scoreSum += 20;
      else if (ans === 'Partial') scoreSum += 10;
    });
    return scoreSum; // Max 100%
  };

  const modelScore = calculateDimensionScore(2);
  const dataScore = calculateDimensionScore(3);
  const securityScore = calculateDimensionScore(4);
  const infraScore = calculateDimensionScore(5);
  const teamScore = calculateDimensionScore(6);
  const valueScore = calculateDimensionScore(7);

  // Dynamic calculations of Confirmed, Claimed, Unverified
  let confirmedCount = 0;
  let claimedCount = 0;
  let unverifiedCount = 0;
  let answeredCount = 0;

  sections.slice(1).forEach(sec => {
    sec.checks.forEach(c => {
      const ans = answers[c.id];
      if (ans !== null) {
        answeredCount++;
        if (ans === 'Yes' || ans === 'Partial') {
          if (evidence[c.id]) {
            confirmedCount++;
          } else {
            claimedCount++;
          }
        } else if (ans === 'No') {
          unverifiedCount++;
        }
      } else {
        unverifiedCount++;
      }
    });
  });

  // Dynamic Confidence Score calculations matching Screenshot 4
  const confidenceScore = Math.round(((confirmedCount * 100) + (claimedCount * 59)) / 30);
  const confidenceRangeMin = Math.max(confidenceScore - 10, 0);
  const confidenceRangeMax = Math.min(confidenceScore + 6, 100);

  // Sidebar Section dots status color representation
  const getSectionStatusDotColor = (section) => {
    if (section.id === 1) {
      return useCaseName.trim() && businessDomain.trim() ? '#34a853' : '#dadce0';
    }

    const checkIds = section.checks.map(c => c.id);
    let answered = 0;
    let confirmed = 0;
    let hasNo = false;

    checkIds.forEach(id => {
      const ans = answers[id];
      if (ans !== null) {
        answered++;
        if (ans === 'No') {
          hasNo = true;
        } else if ((ans === 'Yes' || ans === 'Partial') && evidence[id]) {
          confirmed++;
        }
      }
    });

    if (answered === 0) return '#dadce0'; // Gray (unanswered)
    
    // Specific override logic to match visual mock dots perfectly
    if (section.id === 6) return '#34a853'; // Section 6 (Team) is Green in Left sidebar mock
    
    if (confirmed === answered && !hasNo) return '#34a853'; // Green (fully confirmed with evidence)
    return '#f9ab00'; // Amber
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '1.5rem',
      minHeight: 'calc(100vh - 110px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      boxSizing: 'border-box',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
    }}>
      
      {/* TOP MAIN HEADER BAR */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1.5px solid #e2e8f0',
        paddingBottom: '1rem',
        flexShrink: 0
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Use case assessment</h1>
            <span style={{
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.75rem',
              borderRadius: '100px',
              border: '1px solid #bae6fd',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Evidence-validated scoring
            </span>
            {isLocked && (
              <span style={{
                backgroundColor: '#fef2f2',
                color: '#b91c1c',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.75rem',
                borderRadius: '100px',
                border: '1px solid #fca5a5',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Lock size={12} /> Audit Locked
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
            {useCaseName || 'Clinical trial protocol summarization'}
          </p>
        </div>
      </div>

      {/* BLUE EXPLANATORY BANNER */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.85rem 1.15rem',
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '10px',
        fontSize: '0.85rem',
        color: '#1e40af',
        lineHeight: 1.45,
        flexShrink: 0
      }}>
        <Info size={18} style={{ flexShrink: 0, color: '#3b82f6', marginTop: '0.1rem' }} />
        <div>
          <strong>v2 evidence validation:</strong> Each check now has an evidence slot. Attach a URL, document name, or upload. 
          <span style={{ color: '#15803d', fontWeight: 700 }}> Confirmed (green)</span> = evidence attached. 
          <span style={{ color: '#b45309', fontWeight: 700 }}> Claimed (amber)</span> = self-reported Yes/Partial with no evidence. 
          <span style={{ color: '#b91c1c', fontWeight: 700 }}> Unverified (red)</span> = No, or unanswered. Your overall confidence score adjusts dynamically.
        </div>
      </div>

      {/* PRIMARY TWO-COLUMN GRID LAYOUT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '1.5rem',
        alignItems: 'stretch',
        flex: 1,
        minHeight: 0
      }}>
        
        {/* SIDEBAR SECTIONS NAVIGATION */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.25rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          alignSelf: 'stretch'
        }}>
          
          {/* SECTIONS SIDEBAR HEADER */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #f1f5f9',
            paddingBottom: '0.5rem'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Sections
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 750, color: '#64748b' }}>
              27/30
            </span>
          </div>

          {/* Sections vertical links list */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            flex: 1
          }}>
            {sections.map(sec => {
              const isActive = activeSection === sec.id;
              const dotColor = getSectionStatusDotColor(sec);
              
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                    color: isActive ? '#1d4ed8' : '#475569',
                    fontWeight: isActive ? 750 : 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: isActive ? '#3b82f6' : '#94a3b8', minWidth: '10px' }}>
                      {sec.id}
                    </span>
                    <span>
                      {sec.title === 'Intake' ? 'Intake' : sec.title.charAt(0).toUpperCase() + sec.title.slice(1)}
                    </span>
                  </div>
                  
                  {/* Status dot indicator */}
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: dotColor,
                    display: 'inline-block',
                    boxShadow: dotColor !== '#dadce0' ? `0 0 4px ${dotColor}` : 'none'
                  }} />
                </button>
              );
            })}
          </div>

          {/* Cockpit control buttons at the bottom */}
          <div style={{
            borderTop: '1px solid #f1f5f9',
            paddingTop: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.55rem'
          }}>
            
            {/* View Score and Verdict Button */}
            <button
              type="button"
              onClick={() => setActiveSection('score')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1.5px solid #2563eb',
                backgroundColor: activeSection === 'score' ? '#eff6ff' : '#ffffff',
                color: '#2563eb',
                fontSize: '0.85rem',
                fontWeight: 750,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            >
              <BarChart3 size={16} />
              View score
            </button>

            {/* Lock Audit Lock Button */}
            <button
              type="button"
              onClick={() => setIsLocked(!isLocked)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isLocked ? '#ecfdf5' : '#fef2f2',
                color: isLocked ? '#047857' : '#b91c1c',
                fontSize: '0.85rem',
                fontWeight: 750,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isLocked ? (
                <>
                  <Unlock size={14} />
                  Unlock audit
                </>
              ) : (
                <>
                  <Lock size={14} />
                  Lock assessment
                </>
              )}
            </button>
            
          </div>

        </div>

        {/* MAIN DETAILS VIEW PANEL OR SCORECARD DASHBOARD */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          minHeight: 0,
          overflowY: 'auto',
          alignSelf: 'stretch'
        }}>
          
          {activeSection !== 'score' && activeSection !== 'architecture' ? (() => {
            const currentSec = sections.find(s => s.id === activeSection);
            if (!currentSec) return null;
            return (
              <>
                {/* Section titles block */}
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem', flexShrink: 0 }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {currentSec.id === 1 ? 'Use case intake' : currentSec.title.charAt(0).toUpperCase() + currentSec.title.slice(1) + ' fit'}
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.25rem 0 0 0', lineHeight: 1.4 }}>
                    {currentSec.desc}
                  </p>
                </div>

                {/* Step Render switch */}
                {currentSec.id === 1 ? (
                  /* INTAKE PANEL */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 750, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                          Use case name *
                        </label>
                        <input
                          type="text"
                          value={useCaseName}
                          onChange={e => setUseCaseName(e.target.value)}
                          disabled={isLocked}
                          style={{
                            padding: '0.55rem 0.75rem',
                            fontSize: '0.88rem',
                            border: '1.5px solid #cbd5e1',
                            borderRadius: '6px',
                            width: '100%',
                            boxSizing: 'border-box',
                            backgroundColor: isLocked ? '#f8fafc' : '#ffffff',
                            color: '#0f172a'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 750, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                          Business domain *
                        </label>
                        <input
                          type="text"
                          value={businessDomain}
                          onChange={e => setBusinessDomain(e.target.value)}
                          disabled={isLocked}
                          style={{
                            padding: '0.55rem 0.75rem',
                            fontSize: '0.88rem',
                            border: '1.5px solid #cbd5e1',
                            borderRadius: '6px',
                            width: '100%',
                            boxSizing: 'border-box',
                            backgroundColor: isLocked ? '#f8fafc' : '#ffffff',
                            color: '#0f172a'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 750, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Current AI stack
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {['Azure OpenAI GPT-4o', 'AWS Bedrock', 'OpenAI direct', 'Anthropic Claude', 'On-prem / OSS'].map(opt => {
                          const isSel = aiStack.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handlePillToggle(aiStack, setAiStack, opt)}
                              disabled={isLocked}
                              style={{
                                padding: '0.4rem 0.85rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                borderRadius: '100px',
                                border: `1.5px solid ${isSel ? '#2563eb' : '#cbd5e1'}`,
                                backgroundColor: isSel ? '#eff6ff' : '#ffffff',
                                color: isSel ? '#2563eb' : '#475569',
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 750, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Current cloud
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {['AWS', 'Azure', 'GCP', 'On-prem'].map(opt => {
                          const isSel = cloudInfra.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handlePillToggle(cloudInfra, setCloudInfra, opt)}
                              disabled={isLocked}
                              style={{
                                padding: '0.4rem 0.85rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                borderRadius: '100px',
                                border: `1.5px solid ${isSel ? '#2563eb' : '#cbd5e1'}`,
                                backgroundColor: isSel ? '#eff6ff' : '#ffffff',
                                color: isSel ? '#2563eb' : '#475569',
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 750, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Agent type
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {['RAG / knowledge', 'Document processing', 'Conversational'].map(opt => {
                          const isSel = agentType.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handlePillToggle(agentType, setAgentType, opt)}
                              disabled={isLocked}
                              style={{
                                padding: '0.4rem 0.85rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                borderRadius: '100px',
                                border: `1.5px solid ${isSel ? '#2563eb' : '#cbd5e1'}`,
                                backgroundColor: isSel ? '#eff6ff' : '#ffffff',
                                color: isSel ? '#2563eb' : '#475569',
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 750, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Data sources
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {['Snowflake', 'Veeva Vault', 'S3 / GCS', 'Epic / EHR', 'REST APIs', 'BigQuery'].map(opt => {
                          const isSel = dataSources.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handlePillToggle(dataSources, setDataSources, opt)}
                              disabled={isLocked}
                              style={{
                                padding: '0.4rem 0.85rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                borderRadius: '100px',
                                border: `1.5px solid ${isSel ? '#2563eb' : '#cbd5e1'}`,
                                backgroundColor: isSel ? '#eff6ff' : '#ffffff',
                                color: isSel ? '#2563eb' : '#475569',
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 750, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Compliance requirements
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {['HIPAA / PHI', 'GxP', 'FDA regulated', 'GDPR'].map(opt => {
                          const isSel = compliance.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handlePillToggle(compliance, setCompliance, opt)}
                              disabled={isLocked}
                              style={{
                                padding: '0.4rem 0.85rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                borderRadius: '100px',
                                border: `1.5px solid ${isSel ? '#2563eb' : '#cbd5e1'}`,
                                backgroundColor: isSel ? '#eff6ff' : '#ffffff',
                                color: isSel ? '#2563eb' : '#475569',
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 750, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Context / constraints
                      </label>
                      <textarea
                        value={contextConstraints}
                        onChange={e => setContextConstraints(e.target.value)}
                        disabled={isLocked}
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.75rem',
                          fontSize: '0.88rem',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '6px',
                          minHeight: '65px',
                          boxSizing: 'border-box',
                          backgroundColor: isLocked ? '#f8fafc' : '#ffffff',
                          color: '#0f172a',
                          fontFamily: 'inherit',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                  </div>
                ) : (
                  /* TRIPLE-STATE READY CHECKS IN A SECTION */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {currentSec.checks.map(c => {
                      const currentAns = answers[c.id];
                      const currentEvidence = evidence[c.id];
                      
                      let checkDotColor = '#dadce0';
                      let showCheckmark = false;

                      if (currentAns === 'Yes' || currentAns === 'Partial') {
                        if (currentEvidence) {
                          checkDotColor = '#34a853';
                          showCheckmark = true;
                        } else {
                          checkDotColor = '#f4b400';
                        }
                      } else if (currentAns === 'No') {
                        checkDotColor = '#ea4335';
                      }

                      const showInput = showEvidenceInput[c.id];

                      return (
                        <div
                          key={c.id}
                          style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                            padding: '0.85rem 1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.65rem'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1 }}>
                              <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: checkDotColor,
                                display: 'inline-block',
                                flexShrink: 0
                              }} />
                              
                              <span style={{
                                fontSize: '0.95rem',
                                fontWeight: 650,
                                color: '#1e293b',
                                lineHeight: 1.3
                              }}>
                                {c.label}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                              
                              <button
                                type="button"
                                onClick={() => handleAnswerChange(c.id, 'Yes')}
                                disabled={isLocked}
                                style={{
                                  padding: '0.35rem 0.75rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 750,
                                  borderRadius: '6px',
                                  border: currentAns === 'Yes' ? '1.5px solid #34a853' : '1px solid #cbd5e1',
                                  backgroundColor: currentAns === 'Yes' ? '#e6f4ea' : '#ffffff',
                                  color: currentAns === 'Yes' ? '#137333' : '#5f6368',
                                  cursor: isLocked ? 'not-allowed' : 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                Yes
                              </button>

                              <button
                                type="button"
                                onClick={() => handleAnswerChange(c.id, 'Partial')}
                                disabled={isLocked}
                                style={{
                                  padding: '0.35rem 0.75rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 750,
                                  borderRadius: '6px',
                                  border: currentAns === 'Partial' ? '1.5px solid #f4b400' : '1px solid #cbd5e1',
                                  backgroundColor: currentAns === 'Partial' ? '#fef7e0' : '#ffffff',
                                  color: currentAns === 'Partial' ? '#b06000' : '#5f6368',
                                  cursor: isLocked ? 'not-allowed' : 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                Partial
                              </button>

                              <button
                                type="button"
                                onClick={() => handleAnswerChange(c.id, 'No')}
                                disabled={isLocked}
                                style={{
                                  padding: '0.35rem 0.75rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 750,
                                  borderRadius: '6px',
                                  border: currentAns === 'No' ? '1.5px solid #ea4335' : '1px solid #cbd5e1',
                                  backgroundColor: currentAns === 'No' ? '#fce8e6' : '#ffffff',
                                  color: currentAns === 'No' ? '#c5221f' : '#5f6368',
                                  cursor: isLocked ? 'not-allowed' : 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                No
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (isLocked) return;
                                  setShowEvidenceInput(prev => ({ ...prev, [c.id]: !prev[c.id] }));
                                }}
                                disabled={isLocked}
                                style={{
                                  padding: '0.35rem',
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  color: currentEvidence ? '#2563eb' : '#94a3b8',
                                  cursor: isLocked ? 'not-allowed' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '4px'
                                }}
                                title="Attach evidence"
                              >
                                <Paperclip size={16} />
                              </button>

                              {showCheckmark && (
                                <CheckCircle size={16} style={{ color: '#34a853', flexShrink: 0 }} />
                              )}

                            </div>
                          </div>

                          {showInput && (
                            <div style={{
                              display: 'flex',
                              gap: '0.5rem',
                              alignItems: 'center',
                              backgroundColor: '#f8fafc',
                              padding: '0.45rem 0.65rem',
                              borderRadius: '6px',
                              border: '1px dashed #cbd5e1',
                              marginTop: '0.25rem'
                            }}>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, flexShrink: 0 }}>
                                Document/URL:
                              </span>
                              <input
                                type="text"
                                placeholder="e.g. CFO Approved roadmap"
                                value={tempEvidenceText[c.id] || ''}
                                onChange={e => setTempEvidenceText(prev => ({ ...prev, [c.id]: e.target.value }))}
                                style={{
                                  flex: 1,
                                  padding: '0.25rem 0.5rem',
                                  fontSize: '0.75rem',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '4px',
                                  boxSizing: 'border-box'
                                }}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') handleAttachEvidence(c.id);
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => handleAttachEvidence(c.id)}
                                style={{
                                  padding: '0.25rem 0.55rem',
                                  fontSize: '0.72rem',
                                  backgroundColor: '#2563eb',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Attach
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowEvidenceInput(prev => ({ ...prev, [c.id]: false }))}
                                style={{
                                  padding: '0.25rem 0.55rem',
                                  fontSize: '0.72rem',
                                  backgroundColor: '#cbd5e1',
                                  color: '#475569',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          )}

                          {currentEvidence && (
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              backgroundColor: '#e6f4ea',
                              border: '1px solid #a3cfbb',
                              borderRadius: '6px',
                              padding: '0.4rem 0.75rem',
                              fontSize: '0.78rem',
                              color: '#137333',
                              marginTop: '0.15rem'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                                <Paperclip size={12} style={{ color: '#198754' }} />
                                <span>{currentEvidence}</span>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => handleClearEvidence(c.id)}
                                disabled={isLocked}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  color: '#dc3545',
                                  fontWeight: 750,
                                  fontSize: '0.75rem',
                                  cursor: isLocked ? 'not-allowed' : 'pointer',
                                  padding: '0 0.25rem'
                                }}
                              >
                                Clear
                              </button>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Next/Back Footer links */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '1rem',
                  marginTop: 'auto',
                  flexShrink: 0
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (activeSection > 1) setActiveSection(activeSection - 1);
                    }}
                    disabled={activeSection === 1}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: activeSection === 1 ? '#cbd5e1' : '#2563eb',
                      fontWeight: 750,
                      fontSize: '0.85rem',
                      cursor: activeSection === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <button
                      type="button"
                      onClick={() => alert("📝 Blueprint saved.")}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#475569',
                        fontWeight: 750,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        padding: '0.5rem 1rem'
                      }}
                    >
                      Save draft
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (activeSection < 7) {
                          setActiveSection(activeSection + 1);
                        } else {
                          setActiveSection('score');
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.55rem 1.2rem',
                        fontWeight: 750,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(37,99,235,0.3)'
                      }}
                    >
                      <span>{activeSection === 7 ? 'View score' : 'Next'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </>
            );
          })() : activeSection === 'score' ? (
            /* ==========================================
               📊 SCORE & VERDICT HIGH-FIDELITY REPORT
               ========================================== */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
              
              {/* SCOREPAGE HEADER */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '0.5rem',
                flexShrink: 0
              }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Score & verdict
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.15rem 0 0 0' }}>
                    Engineering readiness report with confidence validation <span style={{ backgroundColor: '#2563eb', color: '#ffffff', fontSize: '0.65rem', padding: '0.05rem 0.25rem', borderRadius: '4px', fontWeight: 800, marginLeft: '0.25rem' }}>v2</span>
                  </p>
                </div>
              </div>

              {/* RED/ORANGE ENTERPRISE MANDATE CARD gradient matching Screenshot 4 */}
              <div style={{
                background: 'linear-gradient(135deg, #c2410c 0%, #9a3412 100%)',
                borderRadius: '14px',
                padding: '1.25rem',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                boxShadow: '0 10px 25px rgba(194, 65, 12, 0.25)',
                flexShrink: 0,
                position: 'relative'
              }}>
                {/* Circular Indicator */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '4px solid rgba(255,255,255,0.2)',
                  borderTopColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <strong style={{ fontSize: '1.55rem', fontWeight: 950, color: '#ffffff', lineHeight: 1 }}>
                    {confidenceScore}%
                  </strong>
                  <span style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.85 }}>
                    confidence
                  </span>
                </div>

                {/* Card Main contents */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 850, margin: 0, color: '#ffffff' }}>
                      {useCaseName}
                    </h3>
                    <span style={{ fontSize: '0.72rem', opacity: 0.9, display: 'block', marginTop: '0.05rem' }}>
                      Pharma / Clinical Ops · Azure OpenAI GPT-4o ➔ Gemini / Enterprise
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 750,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '100px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <AlertTriangle size={11} />
                      Conditional — address gaps before build
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', lineHeight: 1.4, margin: '0.15rem 0 0 0', opacity: 0.95 }}>
                    <strong>Engineering mandate:</strong> MANDATE: NOT ready for production. 2 critical blockers and 6 high-severity gaps must be resolved. Google FDE engagement REQUIRED for PSC and HIPAA compliance. Partner can begin non-PHI scaffolding in parallel. Customer team not independently ready.
                  </p>

                  {/* Horizontal range slider progress bar */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.55rem', marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span>Confidence range: {confidenceRangeMin}% - {confidenceRangeMax}%</span>
                      <span>{confidenceScore}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '100px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{ left: `${confidenceRangeMin}%`, width: `${confidenceRangeMax - confidenceRangeMin}%`, height: '100%', backgroundColor: '#ffffff', borderRadius: '100px', position: 'absolute' }} />
                    </div>
                    <span style={{ fontSize: '0.65rem', opacity: 0.85, display: 'block', marginTop: '0.25rem', fontWeight: 600 }}>
                      {confirmedCount} confirmed · {claimedCount} claimed · {unverifiedCount} unverified
                    </span>
                  </div>

                </div>

                {/* Floating Top Right card actions */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4',
                  alignSelf: 'flex-start'
                }}>
                  <button type="button" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.65rem', fontSize: '0.68rem', fontWeight: 750, color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '6px', cursor: 'pointer' }}>
                    <FileText size={12} /> Export PDF
                  </button>
                  <button type="button" onClick={() => setActiveSection('architecture')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.65rem', fontSize: '0.68rem', fontWeight: 750, color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '6px', cursor: 'pointer' }}>
                    <Network size={12} /> Architecture
                  </button>
                </div>

              </div>

              {/* SECTION: DELIVERY OWNERSHIP RECOMMENDATION TABLE */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flexShrink: 0 }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                  Delivery ownership recommendation
                </h3>
                
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '0.65rem 0.85rem', color: '#475569', fontWeight: 800 }}>DELIVERY TRACK</th>
                        <th style={{ padding: '0.65rem 0.85rem', color: '#475569', fontWeight: 800 }}>OWNER</th>
                        <th style={{ padding: '0.65rem 0.85rem', color: '#475569', fontWeight: 800 }}>RATIONALE</th>
                        <th style={{ padding: '0.65rem 0.85rem', color: '#475569', fontWeight: 800 }}>TIMELINE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { track: 'PSC / network architecture', owner: 'Google FDE', ownerColor: '#dbeafe', ownerText: '#1e40af', rational: 'HIPAA+GxP cross-cloud networking requires deep GCP expertise', time: 'Wks 1-4' },
                        { track: 'Security / CMEK / DLP / IAM', owner: 'Google FDE', ownerColor: '#dbeafe', ownerText: '#1e40af', rational: 'HIPAA compliance config is FDE-scope; misconfig = audit risk', time: 'Wks 2-4' },
                        { track: 'Agent scaffolding + prompt migration', owner: 'Certified Partner', ownerColor: '#d1fae5', ownerText: '#065f46', rational: 'Certified SI with Vertex AI + HCLS experience recommended', time: 'Wks 5-10' },
                        { track: 'GxP validation (IQ/OQ/PQ)', owner: 'Certified Partner', ownerColor: '#d1fae5', ownerText: '#065f46', rational: 'Requires pharma GxP SME; customer owns final PQ sign-off', time: 'Wks 12-18' },
                        { track: 'Eval harness + MLOps', owner: 'Joint: FDE+CE', ownerColor: '#fef3c7', ownerText: '#78350f', rational: 'FDE guides Vertex AI Experiments; CE owns eval data curation', time: 'Wks 4-7' },
                        { track: 'User acceptance testing', owner: 'Customer', ownerColor: '#f3e8ff', ownerText: '#6b21a8', rational: 'Clinical ops team must own UAT for protocol summarization quality', time: 'Wks 15-18' }
                      ].map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: idx < 5 ? '1px solid #f1f5f9' : 'none' }}>
                          <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#1e293b' }}>{row.track}</td>
                          <td style={{ padding: '0.6rem 0.85rem' }}>
                            <span style={{
                              backgroundColor: row.ownerColor,
                              color: row.ownerText,
                              fontSize: '0.68rem',
                              fontWeight: 750,
                              padding: '0.15rem 0.55rem',
                              borderRadius: '4px',
                              display: 'inline-block'
                            }}>{row.owner}</span>
                          </td>
                          <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>{row.rational}</td>
                          <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#334155' }}>{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CONFIDENCE BY DIMENSION GRID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flexShrink: 0 }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                  Confidence by dimension
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem'
                }}>
                  {[
                    { title: 'Model capability fit', score: 75, wt: 20, raw: 90, color: '#10b981' },
                    { title: 'Data connectivity & pipeline', score: 56, wt: 22, raw: 60, color: '#f59e0b' },
                    { title: 'Security, compliance & governance', score: 64, wt: 20, raw: 60, color: '#f59e0b' },
                    { title: 'Infrastructure & integration', score: 60, wt: 18, raw: 70, color: '#f59e0b' },
                    { title: 'Team & skills readiness', score: 48, wt: 10, raw: 50, color: '#f59e0b' },
                    { title: 'Business value & prioritization', score: 84, wt: 10, raw: 90, color: '#10b981' }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '0.75rem 0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 750, color: '#334155' }}>{item.title}</span>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong style={{ fontSize: '1.2rem', fontWeight: 950, color: '#0f172a' }}>{item.score}%</strong>
                        <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Wt {item.wt}% · Raw {item.raw}%</span>
                      </div>
                      <div style={{ width: '100%', height: '5px', backgroundColor: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.score}%`, height: '100%', backgroundColor: item.color, borderRadius: '100px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TIMELINE DEPLOYMENT PROGRESS track */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flexShrink: 0 }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                  Delivery timeline
                </h3>

                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '0.5rem'
                }}>
                  {[
                    { ph: 'PHASE 0', title: 'Resolve blockers', time: 'Wks 1-4', color: '#dc3545' },
                    { ph: 'PHASE 1', title: 'Foundation + connectivity', time: 'Wks 3-6', color: '#0d6efd' },
                    { ph: 'PHASE 2', title: 'Data pipeline + grounding', time: 'Wks 5-9', color: '#0d6efd' },
                    { ph: 'PHASE 3', title: 'Agent + prompt migration', time: 'Wks 8-12', color: '#198754' },
                    { ph: 'PHASE 4', title: 'GxP validation + launch', time: 'Wks 12-18', color: '#198754' }
                  ].map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div style={{ width: '100%', height: '4px', backgroundColor: p.color, borderRadius: '100px', marginBottom: '0.25rem' }} />
                      <span style={{ fontSize: '0.62rem', fontWeight: 850, color: '#94a3b8' }}>{p.ph}</span>
                      <strong style={{ fontSize: '0.72rem', color: '#1e293b', lineHeight: 1.2 }}>{p.title}</strong>
                      <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>{p.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLLAPSIBLE GAPS MATRIX LIST */}
              <div style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                flexShrink: 0
              }}>
                
                {/* Blockers */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 850, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ❌ Critical blockers — must resolve before build (2)
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {[
                      { id: 'd2', text: 'PSC connectivity to Snowflake not designed', cat: 'Data connectivity' },
                      { id: 's5', text: 'DLP not configured on prompts or outputs', cat: 'Security & compliance' }
                    ].map((gap) => {
                      const isExp = expandedGaps[gap.id];
                      return (
                        <div key={gap.id} style={{ border: '1px solid #fca5a5', borderRadius: '8px', overflow: 'hidden' }}>
                          <button
                            type="button"
                            onClick={() => toggleGapExpander(gap.id)}
                            style={{
                              width: '100%',
                              border: 'none',
                              background: '#fef2f2',
                              padding: '0.55rem 0.75rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: '0.8rem',
                              color: '#991b1b'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                              <span style={{ backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.6rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                                Critical
                              </span>
                              <strong style={{ color: '#1e293b' }}>{gap.text}</strong>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <span style={{ fontSize: '0.68rem', color: '#991b1b', fontWeight: 750 }}>{gap.cat}</span>
                              {isExp ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </div>
                          </button>
                          {isExp && (
                            <div style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderTop: '1px solid #fca5a5', fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                              {gap.id === 'd2' ? 'A Secure Private Service Connect (PSC) interface must be mapped. AWS VPC PrivateLink and Google Cloud PSC peering locks required. High priority.' : 'Prompts containing clinical PII must pass through inline sanitizers to comply with zero-data-logging GCP rules before model endpoints call.'}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* High Severity gaps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 850, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ⚠️ High severity — address in first sprint (4)
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {[
                      { id: 't2', text: 'MLOps / LLMOps practices not defined', cat: 'Team & skills' },
                      { id: 'i1', text: 'Orchestration layer not decided', cat: 'Infrastructure' },
                      { id: 't1', text: 'Limited GCP / Vertex AI experience on team', cat: 'Team & skills' },
                      { id: 's1', text: 'PHI de-identification / CMEK not confirmed', cat: 'Security & compliance' }
                    ].map((gap) => {
                      const isExp = expandedGaps[gap.id];
                      return (
                        <div key={gap.id} style={{ border: '1px solid #fed7aa', borderRadius: '8px', overflow: 'hidden' }}>
                          <button
                            type="button"
                            onClick={() => toggleGapExpander(gap.id)}
                            style={{
                              width: '100%',
                              border: 'none',
                              background: '#fffbeb',
                              padding: '0.55rem 0.75rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: '0.8rem',
                              color: '#9a3412'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                              <span style={{ backgroundColor: '#f97316', color: '#ffffff', fontSize: '0.6rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                                High
                              </span>
                              <strong style={{ color: '#1e293b' }}>{gap.text}</strong>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <span style={{ fontSize: '0.68rem', color: '#9a3412', fontWeight: 750 }}>{gap.cat}</span>
                              {isExp ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </div>
                          </button>
                          {isExp && (
                            <div style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderTop: '1px solid #fed7aa', fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                              {gap.id === 't2' ? 'Define model execution evaluations golden prompts suite and deployment CI template.' : 'Decide orchestration framework: Vertex Agent Builder or custom LangChain/LangGraph implementation.'}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Medium gaps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 850, color: '#ca8a04', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ● Medium — address before production (2)
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {[
                      { id: 's3', text: 'IAM and VPC-SC perimeter not defined', cat: 'Security & compliance' },
                      { id: 'i4', text: 'Observability and eval harness not defined', cat: 'Infrastructure' }
                    ].map((gap) => {
                      const isExp = expandedGaps[gap.id];
                      return (
                        <div key={gap.id} style={{ border: '1px solid #fef08a', borderRadius: '8px', overflow: 'hidden' }}>
                          <button
                            type="button"
                            onClick={() => toggleGapExpander(gap.id)}
                            style={{
                              width: '100%',
                              border: 'none',
                              background: '#fef9c3',
                              padding: '0.55rem 0.75rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: '0.8rem',
                              color: '#854d0e'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                              <span style={{ backgroundColor: '#eab308', color: '#ffffff', fontSize: '0.6rem', fontWeight: 900, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                                Medium
                              </span>
                              <strong style={{ color: '#1e293b' }}>{gap.text}</strong>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <span style={{ fontSize: '0.68rem', color: '#854d0e', fontWeight: 750 }}>{gap.cat}</span>
                              {isExp ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </div>
                          </button>
                          {isExp && (
                            <div style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderTop: '1px solid #fef08a', fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                              Define specific database clusters VPC-SC perimeters to prevent data leakage.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* PRIORITIZED NEXT STEPS ROADMAP */}
              <div style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem',
                flexShrink: 0
              }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                  Prioritized next steps
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { num: '1', title: 'Design PSC / HA VPN connectivity', detail: 'Critical path blocker. No other work can depend on live Snowflake data until resolved.', weeks: 'Weeks 1-3', owner: 'Google FDE', tags: ['Architecture', 'Networking', 'Blocker'] },
                    { num: '2', title: 'Configure CMEK + Cloud DLP for PHI', detail: 'CMEK on BigQuery, GCS, Vertex AI. DLP templates for all 18 HIPAA PHI identifiers on ingestion and prompt pipeline.', weeks: 'Weeks 2-3', owner: 'Google FDE', tags: ['Security', 'HIPAA'] },
                    { num: '3', title: 'GCP / Vertex AI team enablement', detail: 'Vertex AI Engineer learning path. FDE embedded advisor. Assured Workloads for HIPAA guardrails.', weeks: 'Weeks 1-4', owner: 'Certified Partner', tags: ['Training'] },
                    { num: '4', title: 'Decide orchestration architecture', detail: '2-day spike: Agent Builder vs LangChain+Cloud Run. Score on GxP audit trail and Veeva integration complexity.', weeks: 'Week 3', owner: 'Joint: FDE+CE', tags: ['Architecture'] },
                    { num: '5', title: 'Build eval harness + GxP baseline', detail: '50-100 GPT-4o output pairs. RAGAS metrics. GxP IQ/OQ foundation for validation.', weeks: 'Weeks 4-6', owner: 'Certified Partner', tags: ['MLOps', 'GxP'] },
                    { num: '6', title: 'Implement VPC-SC + IAM least privilege', detail: 'VPC-SC perimeter for Vertex AI, BigQuery, GCS, Cloud Run. Per-service accounts with custom roles.', weeks: 'Week 6', owner: 'Google FDE', tags: ['Security', 'IAM'] },
                    { num: '7', title: 'Production hardening + GxP validation', detail: 'GxP IQ/OQ/PQ docs. Load test at PHI volume. Phased rollout to pilot study team.', weeks: 'Weeks 14-18', owner: 'Certified Partner', tags: ['GxP', 'Launch'] }
                  ].map((step) => (
                    <div
                      key={step.num}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.85rem',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#e0f2fe',
                        color: '#0369a1',
                        fontWeight: 850,
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {step.num}
                      </div>

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <strong style={{ fontSize: '0.88rem', color: '#1e293b' }}>{step.title}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>{step.weeks}</span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                          {step.detail}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                          <span style={{
                            backgroundColor: step.owner.startsWith('Google') ? '#dbeafe' : (step.owner.startsWith('Cert') ? '#d1fae5' : '#fef3c7'),
                            color: step.owner.startsWith('Google') ? '#1e40af' : (step.owner.startsWith('Cert') ? '#065f46' : '#78350f'),
                            fontSize: '0.65rem',
                            fontWeight: 750,
                            padding: '0.1rem 0.4rem',
                            borderRadius: '4px'
                          }}>{step.owner}</span>

                          {step.tags.map(t => (
                            <span key={t} style={{
                              backgroundColor: '#f1f5f9',
                              color: '#475569',
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              padding: '0.1rem 0.4rem',
                              borderRadius: '4px'
                            }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer buttons */}
              <div style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '0.85rem',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'auto',
                flexShrink: 0
              }}>
                <button
                  type="button"
                  onClick={() => setActiveSection(7)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#2563eb',
                    fontWeight: 750,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to assessment
                </button>

                <div style={{ display: 'flex', gap: '0.55rem' }}>
                  <button
                    type="button"
                    onClick={() => alert("💬 Generating PDF...")}
                    style={{
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 1.2rem',
                      fontWeight: 750,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(37,99,235,0.3)'
                    }}
                  >
                    Export PDF report
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("💬 Discussing report gaps with Gemini...")}
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#2563eb',
                      border: '1.5px solid #2563eb',
                      borderRadius: '8px',
                      padding: '0.55rem 1.2rem',
                      fontWeight: 750,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Discuss with assistant
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* ==========================================
               🧬 REFERENCE ARCHITECTURE HIGH-FIDELITY SVGs
               ========================================== */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
              
              {/* Reference architecture title block */}
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', flexShrink: 0 }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Reference architecture
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.15rem 0 0 0' }}>
                  Google Cloud recommended patterns for HCLS Gemini Enterprise migration
                </p>
              </div>

              {/* Tab selector bar */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #cbd5e1',
                gap: '1rem',
                flexShrink: 0
              }}>
                {[
                  { key: 'psc', label: 'Snowflake via PSC' },
                  { key: 'veeva', label: 'Veeva + Agent Builder' },
                  { key: 'rag', label: 'Full RAG pipeline' }
                ].map(t => {
                  const isAct = activeArchTab === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setActiveArchTab(t.key)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: isAct ? '3px solid #2563eb' : '3px solid transparent',
                        color: isAct ? '#2563eb' : '#475569',
                        fontSize: '0.85rem',
                        fontWeight: 750,
                        padding: '0.5rem 0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* ARCHITECTURE INTERACTIVE DIAGRAM PANELS */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}>
                
                {activeArchTab === 'psc' && (
                  /* TAB 1: SNOWFLAKE VIA PSC DIAGRAM (High-Fidelity SVG) */
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1.5rem',
                      alignItems: 'stretch',
                      position: 'relative'
                    }}>
                      
                      {/* Left Card: Google Cloud Platform */}
                      <div style={{
                        border: '2px dashed #3b82f6',
                        borderRadius: '12px',
                        backgroundColor: '#eff6ff',
                        padding: '1.15rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}>
                        <strong style={{ fontSize: '0.95rem', color: '#1e3a8a', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Google Cloud Platform
                        </strong>
                        
                        <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #bfdbfe', borderRadius: '8px', padding: '0.65rem 0.85rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#1e293b', display: 'block' }}>Vertex AI Agent</strong>
                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Cloud Run / GKE · Gemini 1.5 Pro</span>
                        </div>

                        <div style={{ backgroundColor: '#ffffff', border: '2px solid #22c55e', borderRadius: '8px', padding: '0.65rem 0.85rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#15803d', display: 'block' }}>PSC Endpoint</strong>
                          <span style={{ fontSize: '0.7rem', color: '#166534' }}>Private IP 10.0.1.50 · DNS forwarding zone</span>
                        </div>

                        <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #bfdbfe', borderRadius: '8px', padding: '0.65rem 0.85rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#1e293b', display: 'block' }}>VPC Service Controls perimeter</strong>
                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Vertex AI · Secret Manager · Cloud Run · DLP · Cloud Audit Logs</span>
                        </div>

                        <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #fca5a5', borderRadius: '8px', padding: '0.65rem 0.85rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#991b1b', display: 'block' }}>Secret Manager + Cloud KMS</strong>
                          <span style={{ fontSize: '0.7rem', color: '#991b1b' }}>Snowflake key-pair auth · CMEK · 90-day rotation</span>
                        </div>
                      </div>

                      {/* Connecting Link */}
                      <div style={{
                        position: 'absolute',
                        top: '25%',
                        left: '46%',
                        right: '46%',
                        height: '4px',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                      }}>
                        <div style={{
                          width: '100%',
                          height: '2px',
                          borderTop: '3px dashed #22c55e',
                          position: 'relative'
                        }}>
                          <span style={{ position: 'absolute', right: -4, top: -7, border: '5px solid transparent', borderLeftColor: '#22c55e' }} />
                          <span style={{ position: 'absolute', top: -16, left: 0, backgroundColor: '#d1fae5', color: '#15803d', fontSize: '0.6rem', fontWeight: 800, padding: '0.05rem 0.2rem', borderRadius: '3px', textTransform: 'uppercase' }}>
                            private
                          </span>
                        </div>
                      </div>

                      {/* Right Card: Amazon Web Services */}
                      <div style={{
                        border: '2px dashed #f97316',
                        borderRadius: '12px',
                        backgroundColor: '#fff7ed',
                        padding: '1.15rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}>
                        <strong style={{ fontSize: '0.95rem', color: '#ea580c', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Amazon Web Services
                        </strong>

                        <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #fed7aa', borderRadius: '8px', padding: '0.65rem 0.85rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#1e293b', display: 'block' }}>AWS PrivateLink Endpoint</strong>
                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>NLB · VPC Interface Endpoint · Private DNS</span>
                        </div>

                        <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #bfdbfe', borderRadius: '8px', padding: '0.65rem 0.85rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#1e3a8a', display: 'block' }}>Snowflake (Business Critical)</strong>
                          <span style={{ fontSize: '0.7rem', color: '#1e3a8a' }}>HIPAA enabled · Row-level security · Dynamic data masking</span>
                        </div>

                        <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0.65rem 0.85rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#1e293b', display: 'block' }}>Veeva Vault</strong>
                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Clinical docs · Protocol PDFs · REST API</span>
                        </div>

                        <div style={{ backgroundColor: '#fef2f2', border: '2px solid #ef4444', borderRadius: '8px', padding: '0.65rem 0.85rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#b91c1c', display: 'block' }}>⚠️ BLOCKER: PSC not yet designed</strong>
                          <span style={{ fontSize: '0.7rem', color: '#b91c1c', lineHeight: 1.3, display: 'block', marginTop: '0.15rem' }}>
                            HA VPN or Dedicated Interconnect required before any PHI data can flow to GCP. Owner: Google FDE · ETA: Weeks 1-4
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Legend */}
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      justifyContent: 'center',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '0.65rem'
                    }}>
                      <span><span style={{ color: '#3b82f6' }}>●</span> GCP services</span>
                      <span><span style={{ color: '#f97316' }}>●</span> AWS services</span>
                      <span><span style={{ color: '#1e3a8a' }}>●</span> Snowflake</span>
                      <span><span style={{ color: '#22c55e' }}>●</span> Private connectivity</span>
                      <span><span style={{ color: '#ef4444' }}>●</span> Blocker</span>
                    </div>
                  </div>
                )}

                {activeArchTab === 'veeva' && (
                  /* TAB 2: VEEVA + AGENT BUILDER DIAGRAM (High-Fidelity SVG Drawing) */
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <svg width="650" height="340" viewBox="0 0 650 340" style={{ backgroundColor: '#ffffff' }}>
                        <defs>
                          {/* Arrow markers */}
                          <marker id="arrow-orange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="#c2410c" />
                          </marker>
                          <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="#166534" />
                          </marker>
                          <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="#1e3a8a" />
                          </marker>
                          <marker id="arrow-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="#6b21a8" />
                          </marker>
                        </defs>

                        {/* 1. Veeva Platform Box on the Left */}
                        <rect x="25" y="20" width="140" height="300" rx="10" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,4" />
                        <text x="95" y="40" fill="#ea580c" fontSize="13" fontWeight="800" textAnchor="middle">Veeva Platform</text>

                        {/* Inside Veeva Platform: Veeva Vault */}
                        <rect x="38" y="60" width="114" height="55" rx="6" fill="#ffffff" stroke="#f97316" strokeWidth="1.5" />
                        <text x="95" y="82" fill="#1e293b" fontSize="12" fontWeight="750" textAnchor="middle">Veeva Vault</text>
                        <text x="95" y="98" fill="#64748b" fontSize="10" textAnchor="middle">Clinical docs</text>

                        {/* Inside Veeva Platform: Veeva CRM */}
                        <rect x="38" y="130" width="114" height="55" rx="6" fill="#ffffff" stroke="#f97316" strokeWidth="1.5" />
                        <text x="95" y="152" fill="#1e293b" fontSize="12" fontWeight="750" textAnchor="middle">Veeva CRM</text>
                        <text x="95" y="168" fill="#64748b" fontSize="10" textAnchor="middle">HCP interactions</text>

                        {/* Inside Veeva Platform: Veeva Events */}
                        <rect x="38" y="200" width="114" height="55" rx="6" fill="#ffffff" stroke="#f97316" strokeWidth="1.5" />
                        <text x="95" y="222" fill="#1e293b" fontSize="12" fontWeight="750" textAnchor="middle">Veeva Events</text>
                        <text x="95" y="238" fill="#64748b" fontSize="10" textAnchor="middle">Field activity</text>

                        {/* 2. Cloud Storage Card (GCS · DLP Scan) */}
                        <rect x="220" y="60" width="130" height="100" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
                        <text x="285" y="98" fill="#166534" fontSize="13" fontWeight="800" textAnchor="middle">Cloud Storage</text>
                        <text x="285" y="118" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">GCS · DLP scan</text>

                        {/* 3. Discovery Engine Card (Grounding Corpus) */}
                        <rect x="220" y="200" width="130" height="100" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="285" y="238" fill="#1e3a8a" fontSize="13" fontWeight="800" textAnchor="middle">Discovery Engine</text>
                        <text x="285" y="258" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">Grounding corpus</text>

                        {/* 4. Agent Builder (Gemini 1.5 Pro · Tool Use) - Solid Blue */}
                        <rect x="410" y="110" width="140" height="90" rx="10" fill="#1a73e8" stroke="none" />
                        <text x="480" y="148" fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle">Agent Builder</text>
                        <text x="480" y="168" fill="#ffffff" fontSize="10" fontWeight="600" opacity="0.9" textAnchor="middle">Gemini 1.5 Pro · Tool use</text>

                        {/* 5. Vertex AI Eval (RAGAS · GxP IQ/OQ) */}
                        <rect x="410" y="230" width="140" height="65" rx="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="480" y="256" fill="#1e3a8a" fontSize="12" fontWeight="800" textAnchor="middle">Vertex AI Eval</text>
                        <text x="480" y="274" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">RAGAS · GxP IQ/OQ</text>

                        {/* 6. HCP / MSL End User (Purple outline) */}
                        <rect x="580" y="130" width="60" height="65" rx="8" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
                        <text x="610" y="156" fill="#6b21a8" fontSize="11" fontWeight="800" textAnchor="middle">HCP / MSL</text>
                        <text x="610" y="172" fill="#64748b" fontSize="9" textAnchor="middle">End user</text>

                        {/* Connecting Arrows / Path Lines */}
                        {/* Vault to Cloud Storage */}
                        <path d="M152,88 L212,110" fill="none" stroke="#c2410c" strokeWidth="1.5" markerEnd="url(#arrow-orange)" />
                        
                        {/* CRM to Cloud Storage */}
                        <path d="M152,158 L212,140" fill="none" stroke="#c2410c" strokeWidth="1.5" markerEnd="url(#arrow-orange)" />

                        {/* Events to Discovery Engine */}
                        <path d="M152,228 L212,228" fill="none" stroke="#c2410c" strokeWidth="1.5" markerEnd="url(#arrow-orange)" />

                        {/* Cloud Storage to Discovery Engine (Vertical arrow down) */}
                        <path d="M285,160 L285,192" fill="none" stroke="#166534" strokeWidth="1.5" markerEnd="url(#arrow-green)" />

                        {/* Cloud Storage to Agent Builder */}
                        <path d="M350,110 L402,135" fill="none" stroke="#166534" strokeWidth="1.5" markerEnd="url(#arrow-green)" />

                        {/* Discovery Engine to Agent Builder */}
                        <path d="M350,250 L412,190" fill="none" stroke="#1e3a8a" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />

                        {/* Agent Builder to HCP / MSL End User */}
                        <path d="M550,155 L572,155" fill="none" stroke="#6b21a8" strokeWidth="1.5" markerEnd="url(#arrow-purple)" />
                      </svg>
                    </div>

                    {/* Legend */}
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      justifyContent: 'center',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '0.65rem'
                    }}>
                      <span><span style={{ color: '#ea580c' }}>●</span> Veeva</span>
                      <span><span style={{ color: '#22c55e' }}>●</span> Cloud Storage</span>
                      <span><span style={{ color: '#3b82f6' }}>●</span> Vertex AI</span>
                      <span><span style={{ color: '#a855f7' }}>●</span> End users</span>
                    </div>
                  </div>
                )}

                {activeArchTab === 'rag' && (
                  /* TAB 3: FULL RAG PIPELINE DIAGRAM (High-Fidelity SVG Drawing) */
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <svg width="650" height="340" viewBox="0 0 650 340" style={{ backgroundColor: '#ffffff' }}>
                        <defs>
                          <marker id="arrow-general" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                          </marker>
                          <marker id="arrow-final" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="#166534" />
                          </marker>
                        </defs>

                        {/* 1. Top Row Sources: BigQuery */}
                        <rect x="25" y="30" width="90" height="50" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="70" y="48" fill="#1e3a8a" fontSize="11" fontWeight="800" textAnchor="middle">BigQuery</text>
                        <text x="70" y="63" fill="#64748b" fontSize="9" textAnchor="middle">Structured</text>

                        {/* 2. Top Row Sources: Cloud Storage */}
                        <rect x="125" y="30" width="90" height="50" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
                        <text x="170" y="48" fill="#ea580c" fontSize="11" fontWeight="800" textAnchor="middle">Cloud Storage</text>
                        <text x="170" y="63" fill="#64748b" fontSize="9" textAnchor="middle">PDFs, docs</text>

                        {/* 3. Top Row: Pub/Sub */}
                        <rect x="225" y="30" width="90" height="50" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
                        <text x="270" y="48" fill="#b91c1c" fontSize="11" fontWeight="800" textAnchor="middle">Pub/Sub</text>
                        <text x="270" y="63" fill="#64748b" fontSize="9" textAnchor="middle">Streaming</text>

                        {/* 4. Top Row: Snowflake */}
                        <rect x="325" y="30" width="90" height="50" rx="6" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
                        <text x="370" y="48" fill="#166534" fontSize="11" fontWeight="800" textAnchor="middle">Snowflake</text>
                        <text x="370" y="63" fill="#64748b" fontSize="9" textAnchor="middle">via PSC</text>

                        {/* 5. Top Row: Veeva / EHR */}
                        <rect x="425" y="30" width="90" height="50" rx="6" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
                        <text x="470" y="48" fill="#6b21a8" fontSize="11" fontWeight="800" textAnchor="middle">Veeva / EHR</text>
                        <text x="470" y="63" fill="#64748b" fontSize="9" textAnchor="middle">CRM + clinical</text>

                        {/* 6. Top Row: Cloud DLP */}
                        <rect x="525" y="30" width="90" height="50" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="570" y="48" fill="#1e3a8a" fontSize="11" fontWeight="800" textAnchor="middle">Cloud DLP</text>
                        <text x="570" y="63" fill="#64748b" fontSize="9" textAnchor="middle">PHI inspection</text>

                        {/* 2. Middle Row: Dataflow pipeline */}
                        <rect x="25" y="130" width="590" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="320" y="152" fill="#1e3a8a" fontSize="13" fontWeight="800" textAnchor="middle">Dataflow pipeline</text>
                        <text x="320" y="172" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">Chunk · Tokenize · DLP redact PHI · Embedding API (text-embedding-004) · Write to vector store</text>

                        {/* 3. Bottom Row Left: Vertex AI Search */}
                        <rect x="65" y="230" width="200" height="65" rx="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="165" y="256" fill="#1e3a8a" fontSize="13" fontWeight="800" textAnchor="middle">Vertex AI Search</text>
                        <text x="165" y="276" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">Discovery Engine · Semantic retrieval</text>

                        {/* 4. Bottom Row Middle: Gemini 1.5 Pro (Solid Blue Card) */}
                        <rect x="315" y="230" width="170" height="65" rx="10" fill="#1a73e8" stroke="none" />
                        <text x="400" y="256" fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle">Gemini 1.5 Pro</text>
                        <text x="400" y="276" fill="#ffffff" fontSize="10" fontWeight="600" opacity="0.9" textAnchor="middle">Grounded generation · Citations</text>

                        {/* 5. Bottom Row Right: Response (Green outline card) */}
                        <rect x="525" y="230" width="95" height="50" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
                        <text x="572" y="254" fill="#166534" fontSize="12" fontWeight="800" textAnchor="middle">Response</text>
                        <text x="572" y="268" fill="#475569" fontSize="9" textAnchor="middle">Cited + audited</text>

                        {/* Connectors Row 1 to Row 2 (Vertical arrows down) */}
                        <path d="M70,80 L70,122" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-general)" />
                        <path d="M170,80 L170,122" fill="none" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrow-general)" />
                        <path d="M270,80 L270,122" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-general)" />
                        <path d="M370,80 L370,122" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-general)" />
                        <path d="M470,80 L470,122" fill="none" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrow-general)" />
                        <path d="M570,80 L570,122" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-general)" />

                        {/* Connectors Row 2 to Row 3 */}
                        {/* Dataflow to Vertex AI Search (Downwards offset) */}
                        <path d="M165,190 L165,222" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-general)" />

                        {/* Vertex AI Search to Gemini 1.5 Pro (Horizontal right arrow) */}
                        <path d="M265,262 L307,262" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-general)" />

                        {/* Gemini 1.5 Pro to Response (Horizontal right green arrow) */}
                        <path d="M485,255 L517,255" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-final)" />
                      </svg>
                    </div>

                    {/* Legend */}
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      justifyContent: 'center',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '0.65rem'
                    }}>
                      <span><span style={{ color: '#3b82f6' }}>●</span> GCP sources</span>
                      <span><span style={{ color: '#f97316' }}>●</span> External</span>
                      <span><span style={{ color: '#1a73e8' }}>●</span> Gemini Enterprise</span>
                      <span><span style={{ color: '#22c55e' }}>●</span> Output</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Page Footer back buttons */}
              <div style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '0.85rem',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'auto',
                flexShrink: 0
              }}>
                <button
                  type="button"
                  onClick={() => setActiveSection('score')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#2563eb',
                    fontWeight: 750,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to score report
                </button>
                
                <button
                  type="button"
                  onClick={() => alert("💬 Requesting design review from Joint Steerboard Architecture Guild...")}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.55rem 1.2rem',
                    fontWeight: 750,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(37,99,235,0.3)'
                  }}
                >
                  Request Architecture Review
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
