import { useState } from 'react';
import { Building2, Layers, Cpu, TrendingUp, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle, Sparkles, Shield, Check, Upload, Trash2, HelpCircle, Info, BarChart3, Lock, Gauge, ShieldAlert, Server, Zap, Star } from 'lucide-react';

export default function IntakeForm({ formData, onChange, onSubmit, onSaveSession, sessions = [] }) {
  const [step, setStep] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [activeNotes, setActiveNotes] = useState({});
  const [hoveredPrefill, setHoveredPrefill] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const toggleNote = (field) => {
    setActiveNotes(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const steps = [
    { id: 1, label: 'Customer Context', icon: Building2 },
    { id: 2, label: 'Use Case Details', icon: Layers },
    { id: 3, label: 'Technical Landscape', icon: Cpu },
    { id: 4, label: 'Business & ROI', icon: TrendingUp },
    { id: 5, label: 'Risks & Blockers', icon: AlertTriangle },
  ];

  const handleMultiSelect = (field, val) => {
    const current = formData[field] || [];
    let next;
    if (current.includes(val)) {
      next = current.filter(i => i !== val);
    } else {
      next = [...current, val];
    }
    onChange(field, next);
  };

  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    const missing = [];
    if (!formData.reportName?.trim()) missing.push("Descriptive Report Name (Step 1)");
    if (!formData.company?.trim()) missing.push("Company Name (Step 1)");
    if (!formData.useCaseName?.trim()) missing.push("Use Case Name (Step 2)");
    if (!formData.useCaseDesc?.trim()) missing.push("Use Case / Transformation Description (Step 2)");

    if (missing.length > 0) {
      alert(`⚠️ Validation Error: You cannot generate a report with an empty form. Please supply the following required fields first:\n\n• ${missing.join('\\n• ')}\n\nTip: Use the "Healthcare", "FinTech", or "Merck AWS" prefill buttons at the top of Step 1 to instantly prefill these fields!`);
      if (!formData.reportName?.trim() || !formData.company?.trim()) {
        setStep(1);
      } else {
        setStep(2);
      }
      return;
    }
    onSubmit();
  };

  // Prefills with advanced scoping parameters!
  const prefillHealthcare = () => {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    onChange('reportName', `Northside Clinical Discharge Summarizer PoC #${suffix}`);
    onChange('company', 'Northside Health Systems');
    onChange('industry', 'Healthcare & Life Sciences');
    onChange('division', 'Clinical Trials');
    onChange('userRole', 'Jane Doe (VP of Clinical Informatics)');
    onChange('timeline', '3 months');
    onChange('timelineNotes', 'Must freeze pilot phase before regulatory filing closes Oct 1st.');
    onChange('execSponsor', 'Yes');
    onChange('execSponsorDetails', 'Dr. Robert Vance, Chief Medical Officer');
    
    // Advanced Step 1 parameters
    onChange('divisionSize', 'Divisional Departmental Rollout (100 - 1,000 users)');
    onChange('budgetStatus', 'Approved Pilot Budget ($50k - $250k allocated)');

    onChange('useCaseName', 'Clinical Note Summarization');
    onChange('useCaseDesc', 'Migrating clinical summarization notes assistant from Azure OpenAI to Gemini Enterprise. Latency is currently >4s and fails zero-data-logging perimeters. Ingesting Cloud DLP proxy nodes to redact patient PII before payloads hit Gemini models, and VPC Service Control perimeters around BigQuery clusters.');
    onChange('useCaseTypes', ['Document processing / summarization', 'RAG / knowledge search', 'Multi-modal (images, audio, video)']);
    onChange('successMetrics', ['Accuracy', 'Latency', 'Compliance']);

    // Advanced Step 2 parameters
    onChange('agentAutonomy', 'Semi-Autonomous (Human approves final outbound payload)');
    onChange('groundingModality', 'Real-time SQL transactional databases (AlloyDB/BigQuery)');

    onChange('isCurrentUseCase', 'Yes');
    onChange('currentPlatform', 'Azure');
    onChange('currentPlatformNotes', 'Hosting 30x physician summarizers on Azure OpenAI westus2 containers');
    onChange('currentDataSource', 'Snowflake');
    onChange('currentDataSourceNotes', 'Snowflake staging layer holding 12M historical clinician records');
    
    onChange('migratingFrom', ['OpenAI / Azure OpenAI']);
    onChange('currentCloud', 'GCP');
    onChange('dataStack', ['Snowflake', 'BigQuery']);
    onChange('mlMaturity', 4);
    onChange('diagramFile', 'clinical-infra-azure.png');

    onChange('inputModality', 'document');
    onChange('averagePayloadSize', 'medium');
    onChange('targetLatency', 'interactive');
    onChange('groundingStrategy', 'hybrid');
    onChange('dataResidency', 'zero_logging');
    onChange('tuningStrategy', 'few_shot');

    // Advanced Step 3 parameters
    onChange('pipelineSafety', 'Strict PII/PHI Redaction proxies (Automatic DLP mask)');
    onChange('integrationFramework', 'Standard REST API interfaces (Low code)');

    onChange('annualSpend', '$500k-$1M/yr');
    onChange('migrationReason', 'Google Cloud consolidation & HIPAA data isolation');
    onChange('urgency', 5);

    // Advanced Step 4 parameters
    onChange('tokenVolatility', 'Dynamic Interactive Peaks (Elastic token bursts)');
    onChange('valueLeverage', 'Internal Productivity Gains (OpEx efficiency)');
    onChange('gcpCommitment', 'GCP committed spend (CUD Applied)');

    onChange('compliance', ['HIPAA', 'SOC2']);
    onChange('blockers', ['PII handling in prompt pipelines', 'Clinician output quality acceptance', 'Snowflake to Vertex AI pipeline ownership']);

    // Advanced Step 5 parameters
    onChange('regulatoryAudit', 'HIPAA / Healthcare Patient Data (Extreme strict DLP)');
    onChange('refactoringEffort', 'Standard API migration (Azure to GCP adapters, Low effort)');
  };

  const prefillFinTech = () => {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    onChange('reportName', `Apex Portfolio Asset Analyzer Brief #${suffix}`);
    onChange('company', 'Apex Financial Global');
    onChange('industry', 'Financial Services');
    onChange('division', 'Finance & Procurement');
    onChange('userRole', 'Lead Solutions Architect & VP of Brokerage Services');
    onChange('timeline', '9 months');
    onChange('timelineNotes', 'Targeting pilot launch before the Q4 fiscal audit cycles begin.');
    onChange('execSponsor', 'Yes');
    onChange('execSponsorDetails', 'Marcus Vance, Chief Technology Officer');

    // Advanced Step 1 parameters
    onChange('divisionSize', 'Global Enterprise Scale (1,000 - 10,000+ users)');
    onChange('budgetStatus', 'Full Production CapEx Secured (>$250k committed)');

    onChange('useCaseName', 'Wealth Management Agent');
    onChange('useCaseDesc', 'Deploying a portfolio advisor agent. Existing Anthropic Claude Bedrock pipelines struggle with token costs when ingesting 200+ page prospectuses. Target is to migrate to Gemini 1.5 Pro on GCP to leverage the 2M context and Teradata tables to BigQuery using automated adapters and PSC gateways.');
    onChange('useCaseTypes', ['Conversational agents / chatbots', 'RAG / knowledge search', 'Agentic / multi-step workflows']);
    onChange('successMetrics', ['Accuracy', 'Cost reduction']);

    // Advanced Step 2 parameters
    onChange('agentAutonomy', 'Co-Pilot (Human-in-the-loop strictly active at all ticks)');
    onChange('groundingModality', 'Real-time SQL transactional databases (AlloyDB/BigQuery)');

    onChange('isCurrentUseCase', 'Yes');
    onChange('currentPlatform', 'AWS');
    onChange('currentPlatformNotes', 'Chaining portfolio indices in AWS Bedrock US-East-1');
    onChange('currentDataSource', 'Teradata');
    onChange('currentDataSourceNotes', 'Teradata on-prem cluster holds 80TB of broker records');

    onChange('migratingFrom', ['Anthropic / Bedrock']);
    onChange('currentCloud', 'AWS');
    onChange('dataStack', ['Vector DBs', 'Salesforce']);
    onChange('mlMaturity', 3);

    onChange('inputModality', 'text');
    onChange('averagePayloadSize', 'short');
    onChange('targetLatency', 'realtime');
    onChange('groundingStrategy', 'vector');
    onChange('dataResidency', 'vpc_restricted');
    onChange('tuningStrategy', 'prompt_eng');

    // Advanced Step 3 parameters
    onChange('pipelineSafety', 'Standard VPC boundaries (Basic isolation)');
    onChange('integrationFramework', 'Legacy ERP/CRM Database adapters (Medium code)');

    onChange('annualSpend', '>$1M/yr');
    onChange('migrationReason', 'Cost reduction & token consolidation');
    onChange('urgency', 4);

    // Advanced Step 4 parameters
    onChange('tokenVolatility', 'Unpredictable Multi-Agent Chaining (Rapid token spikes)');
    onChange('valueLeverage', 'Customer Experience Transformation (Retention & loyalty)');
    onChange('gcpCommitment', 'GCP committed spend (CUD Applied)');

    onChange('compliance', ['SOC2', 'PII / GDPR']);
    onChange('blockers', ['Data residency compliance', 'Legacy API chaining refactoring']);

    // Advanced Step 5 parameters
    onChange('regulatoryAudit', 'SEC / FINRA Financial Data (Extreme strict auditing)');
    onChange('refactoringEffort', 'Complex Legacy Migration (Teradata/Redshift rewrite, High effort)');
  };

  const prefillBioPharma = () => {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    onChange('reportName', `Merck Multimodal Biomarker PoC #${suffix}`);
    onChange('company', 'Merck & Co.');
    onChange('industry', 'Healthcare & Life Sciences');
    onChange('division', 'Informatics & R&D');
    onChange('userRole', 'Principal AI Architect & VP of R&D Informatics');
    onChange('timeline', '12 months');
    onChange('timelineNotes', 'Genomic discovery clinical research batches.');
    onChange('execSponsor', 'Yes');
    onChange('execSponsorDetails', 'Dr. Elena Rostova, Executive Director of Genomic Discovery');

    // Advanced Step 1 parameters
    onChange('divisionSize', 'Small Specialized R&D Team (<100 users)');
    onChange('budgetStatus', 'Approved Pilot Budget ($50k - $250k allocated)');

    onChange('useCaseName', 'Multimodal Biomarker Assistant');
    onChange('useCaseDesc', 'Ingesting clinical trial Omics datasets. Llama-3-70B cluster is scaling poorly and molecular cell scans fail on Llama accuracy. Ingesting AWS Redshift logs and mounting big genomic files directly from GCP storage.');
    onChange('useCaseTypes', ['RAG / knowledge search', 'Document processing / summarization', 'Multi-modal (images, audio, video)', 'Agentic / multi-step workflows']);
    onChange('successMetrics', ['Accuracy', 'Compliance', 'Latency', 'Cost reduction']);

    // Advanced Step 2 parameters
    onChange('agentAutonomy', 'Semi-Autonomous (Human approves final outbound payload)');
    onChange('groundingModality', 'Real-time SQL transactional databases (AlloyDB/BigQuery)');

    onChange('isCurrentUseCase', 'Yes');
    onChange('currentPlatform', 'On-Premise');
    onChange('currentPlatformNotes', 'Genomic research onlocal local Llama GPU inference clusters');
    onChange('currentDataSource', 'Other');
    onChange('currentDataSourceNotes', 'Redshift stores 2.4B molecular Omics biomarkers');

    onChange('migratingFrom', ['Anthropic / Bedrock', 'Open source / Self-hosted (Llama, Mistral)']);
    onChange('currentCloud', 'AWS');
    onChange('dataStack', ['S3 / GCS Unstructured', 'Snowflake', 'Vector DBs (Pinecone/Milvus)', 'PostgreSQL / AlloyDB']);
    onChange('mlMaturity', 4);
    onChange('diagramFile', 'merck-aws-infrastructure.png');

    onChange('inputModality', 'multimodal');
    onChange('averagePayloadSize', 'extreme');
    onChange('targetLatency', 'batch');
    onChange('groundingStrategy', 'sql');
    onChange('dataResidency', 'eu_restricted');
    onChange('tuningStrategy', 'lora');

    // Advanced Step 3 parameters
    onChange('pipelineSafety', 'Sovereign Dedicated Tenant (Sovereign physical region)');
    onChange('integrationFramework', 'On-Premise Secure Relational lakes (High custom ADK)');

    onChange('annualSpend', '>$1M/yr');
    onChange('migrationReason', 'Multimodal molecular accuracy & long context parsing');
    onChange('urgency', 4);

    // Advanced Step 4 parameters
    onChange('tokenVolatility', 'Stable Batch Streams (Predictable flat payloads)');
    onChange('valueLeverage', 'Net-New Revenue Stream (Innovative business scaling)');
    onChange('gcpCommitment', 'Sovereign Cloud Dedicated Subscription contract');

    onChange('compliance', ['HIPAA', 'SOC2', 'PII / GDPR', 'Data Residency (EU/US)']);
    onChange('blockers', ['PII handling in prompt pipelines', 'Data residency compliance', 'Snowflake to Vertex AI pipeline ownership']);

    // Advanced Step 5 parameters
    onChange('regulatoryAudit', 'HIPAA / Healthcare Patient Data (Extreme strict DLP)');
    onChange('refactoringEffort', 'Complex Legacy Migration (Teradata/Redshift rewrite, High effort)');
  };

  const isDraftRestored = formData.reportName && !sessions.some(s => s.reportName?.trim().toLowerCase() === formData.reportName?.trim().toLowerCase()) && !formData.company?.startsWith('Northside') && !formData.company?.startsWith('Apex') && !formData.company?.startsWith('Merck');

  const calculateIntegrityScore = () => {
    let score = 0;
    if (formData.reportName) score += 15;
    if (formData.company) score += 10;
    if (formData.industry) score += 10;
    if (formData.useCaseName) score += 15;
    if (formData.useCaseDesc) score += 15;
    if (formData.currentCloud) score += 10;
    if (formData.annualSpend) score += 10;
    if (formData.compliance && formData.compliance.length > 0) score += 15;
    return Math.min(score, 100);
  };

  const integrity = calculateIntegrityScore();

  return (
    <div 
      className="card" 
      style={{ 
        maxWidth: '100%', 
        margin: '0', 
        height: 'calc(100vh - 110px)', 
        display: 'flex', 
        flexDirection: 'column', 
        background: 'var(--bg-card)', 
        borderColor: 'var(--border-color)', 
        borderRadius: '16px', 
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden', 
        padding: '0.85rem 1rem', 
        boxSizing: 'border-box'
      }}
    >
      
      {/* TOP ROW presets (Capped, flexShrink: 0) */}
      <div style={{ display: 'flex', gap: '0.65rem', flexShrink: 0, marginBottom: '0.65rem', width: '100%', flexWrap: 'wrap', alignItems: 'center' }} className="no-print">
        {isDraftRestored && step === 1 && (
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', background: 'rgba(26, 115, 232, 0.04)', border: '1px solid rgba(26, 115, 232, 0.2)', padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.72rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: 'var(--google-blue)' }}>
              <Sparkles size={12} />
              <span>Restored active draft session.</span>
            </div>
            <button 
              onClick={() => { if (confirm("Reset all fields and start a fresh intake?")) { try { localStorage.removeItem('gemini_active_draft'); } catch {} window.location.reload(); } }}
              className="btn btn-outline" 
              style={{ padding: '0.1rem 0.45rem', fontSize: '0.62rem', color: 'var(--google-red)', borderColor: 'rgba(234,67,53,0.3)', background: 'transparent', fontWeight: 750 }}
            >
              Clear Draft
            </button>
          </div>
        )}

        {/* Presets */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            background: 'var(--bg-surface)', 
            padding: '0.35rem 0.65rem', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)',
            flex: 1,
            minWidth: '380px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={12} className="badge-purple" style={{ padding: '0.12rem', borderRadius: '4px' }} />
            <span style={{ fontWeight: 800, fontSize: '0.72rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Presets:</span>
          </div>

          <div style={{ display: 'flex', gap: '0.45rem' }}>
            {[
              { key: 'health', label: '🏥 Healthcare', action: prefillHealthcare, border: 'var(--google-blue)', color: 'var(--google-blue)', bg: 'rgba(59,130,246,0.12)', company: 'Northside Health Systems' },
              { key: 'fin', label: '💳 FinTech', action: prefillFinTech, border: 'var(--google-amber)', color: 'var(--google-amber)', bg: 'rgba(245,158,11,0.12)', company: 'Apex Financial Global' },
              { key: 'merck', label: '🧬 Merck AWS', action: prefillBioPharma, border: 'var(--google-purple)', color: 'var(--google-purple)', bg: 'rgba(168,85,247,0.12)', company: 'Merck & Co.' }
            ].map(btn => {
              const isHovered = hoveredPrefill === btn.key;
              const isPresetActive = formData.company === btn.company;
              return (
                <button
                  key={btn.key}
                  onClick={btn.action}
                  onMouseEnter={() => setHoveredPrefill(btn.key)}
                  onMouseLeave={() => setHoveredPrefill(null)}
                  className="btn"
                  style={{
                    fontSize: '0.68rem',
                    padding: '0.28rem 0.55rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    background: isPresetActive ? btn.bg : (isHovered ? btn.bg : 'var(--bg-card)'),
                    border: `1.5px solid ${isPresetActive || isHovered ? btn.color : 'var(--border-color)'}`,
                    color: isPresetActive || isHovered ? btn.color : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isPresetActive || isHovered ? 'translateY(-1.5px)' : 'none',
                    boxShadow: isPresetActive ? `0 0 14px ${btn.color}35` : (isHovered ? `0 4px 12px ${btn.color}18` : 'none')
                  }}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP INDICATOR TIMELINE (Capped, flexShrink: 0) */}
      <div className="step-progress-bar" style={{ flexShrink: 0, marginBottom: '0.65rem', padding: '0.2rem 0' }}>
        <div className="step-progress-line" />
        <div className="step-progress-line-active" style={{ width: `${((step - 1) / 4) * 100}%` }} />
        {steps.map(s => {
          const Icon = s.icon;
          const isCompleted = step > s.id;
          const isActive = step === s.id;
          return (
            <div 
              key={s.id} 
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} 
              onClick={() => setStep(s.id)} 
              style={{ cursor: 'pointer' }}
            >
              <div 
                className={`step-circle ${isActive ? 'step-circle-active-pulse' : ''}`}
                style={{
                  background: isCompleted ? 'var(--google-green)' : (isActive ? 'var(--google-blue)' : '#121829'),
                  border: `2px solid ${isCompleted ? 'var(--google-green)' : (isActive ? 'var(--google-blue)' : 'var(--google-grey-300)')}`,
                  color: (isActive || isCompleted) ? '#ffffff' : 'var(--google-grey-700)',
                  boxShadow: isCompleted ? '0 0 12px rgba(16,185,129,0.25)' : (isActive ? '0 0 12px rgba(59,130,246,0.4)' : 'none'),
                  width: '30px', 
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {isCompleted ? <Check size={14} /> : <Icon size={14} />}
              </div>
              <span className="step-label" style={{ fontSize: '0.65rem', fontWeight: (isActive || isCompleted) ? 800 : 500 }}>{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* DOUBLE-COLUMN SPLIT GRID (Flex: 1, minHeight: 0, scroll-locked!) */}
      <div style={{ display: 'flex', gap: '1rem', flex: 1, minHeight: 0, alignItems: 'stretch', boxSizing: 'border-box' }}>
        
        {/* A. LEFT COLUMN: Visual Scoping Cockpit Dashboard */}
        <div 
          className="glass-card card-glow-accent"
          style={{ 
            flex: '0.72', 
            display: 'flex', 
            flexDirection: 'column', 
            padding: '0.85rem', 
            borderRadius: '12px', 
            background: 'rgba(15,23,42,0.01)', 
            borderColor: 'var(--border-color)', 
            boxShadow: 'var(--shadow-sm)',
            justifyContent: 'flex-start', 
            gap: '0.65rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Cockpit Header */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', marginBottom: '0.45rem' }}>
              <BarChart3 size={13} style={{ color: 'var(--google-blue)' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 850, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scoping Integrity Cockpit</span>
            </div>

            {/* Dynamic Progress Scorecard */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 0.65rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Blueprint Quality Index</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 950, color: integrity > 70 ? 'var(--google-green)' : 'var(--google-blue)' }}>{integrity}% Ready</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                <div 
                  className="progress-bar-glow"
                  style={{ 
                    width: `${integrity}%`, 
                    height: '100%', 
                    background: integrity === 100 ? 'var(--google-green)' : 'var(--google-blue)', 
                    borderRadius: '100px', 
                    transition: 'width 0.4s ease',
                    boxShadow: integrity === 100 ? '0 0 12px var(--google-green)' : '0 0 12px var(--google-blue)'
                  }} 
                />
              </div>
              <span style={{ fontSize: '0.68rem', color: '#64748b', lineHeight: 1.2 }}>
                {integrity === 100 
                  ? '🔥 Blueprint fully synchronized and ready!'
                  : '⚡ Complete fields to compile blueprint.'}
              </span>
            </div>
          </div>

          {/* Checklist Card */}
          <div 
            style={{ 
              background: 'var(--bg-surface)', 
              border: '1px dashed var(--border-color)', 
              borderRadius: '8px', 
              padding: '0.55rem 0.75rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.4rem', 
              flexShrink: 0,
              justifyContent: 'flex-start'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--google-blue)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>
              Scoping Walkthrough Checklist
            </span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {step === 1 && (
                <>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.reportName ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.reportName ? 'var(--google-green)' : 'var(--border-color)', flexShrink: 0 }} />
                    <span>Assign descriptive report name</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.company ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.company ? 'var(--google-green)' : 'var(--border-color)', flexShrink: 0 }} />
                    <span>Identify company & industry</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.execSponsor === 'Yes' ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.execSponsor === 'Yes' ? 'var(--google-green)' : 'var(--border-color)', flexShrink: 0 }} />
                    <span>Confirm executive sponsorship</span>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.useCaseName ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.useCaseName ? 'var(--google-green)' : 'var(--border-color)', flexShrink: 0 }} />
                    <span>Define usecase title & context</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.useCaseDesc ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.useCaseDesc ? 'var(--google-green)' : 'var(--border-color)', flexShrink: 0 }} />
                    <span>Detail legacy system specifications</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.useCaseTypes && formData.useCaseTypes.length > 0 ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.useCaseTypes && formData.useCaseTypes.length > 0 ? 'var(--google-green)' : 'var(--border-color)', flexShrink: 0 }} />
                    <span>Select target capabilities</span>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: (formData.migratingFrom && formData.migratingFrom.length > 0) ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: (formData.migratingFrom && formData.migratingFrom.length > 0) ? 'var(--google-green)' : 'var(--text-secondary)', flexShrink: 0 }} />
                    <span>Scope legacy API hosting frameworks</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.inputModality ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.inputModality ? 'var(--google-green)' : 'var(--text-secondary)', flexShrink: 0 }} />
                    <span>Set payloads & response SLAs</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.diagramFile ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.diagramFile ? 'var(--google-green)' : 'var(--text-secondary)', flexShrink: 0 }} />
                    <span>Parse custom cloud diagrams</span>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.annualSpend ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.annualSpend ? 'var(--google-green)' : 'var(--text-secondary)', flexShrink: 0 }} />
                    <span>Project annual cloud spends</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: formData.migrationReason ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: formData.migrationReason ? 'var(--google-green)' : 'var(--text-secondary)', flexShrink: 0 }} />
                    <span>Mitigate primary migration drivers</span>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: (formData.compliance && formData.compliance.length > 0) ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: (formData.compliance && formData.compliance.length > 0) ? 'var(--google-green)' : 'var(--text-secondary)', flexShrink: 0 }} />
                    <span>Assert compliance perimeters</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', fontSize: '0.8rem', color: (formData.blockers && formData.blockers.length > 0) ? 'var(--google-green)' : 'var(--text-secondary)' }}>
                    <CheckCircle size={13} style={{ color: (formData.blockers && formData.blockers.length > 0) ? 'var(--google-green)' : 'var(--text-secondary)', flexShrink: 0 }} />
                    <span>Flag legacy refactoring blockers</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* GORGEOUS CONSULTATIVE C-SUITE SCORECARD */}
          <div 
            style={{ 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '10px', 
              padding: '0.75rem 0.85rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.55rem', 
              flex: 'none', 
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', flexShrink: 0 }}>
              <Zap size={12} style={{ color: 'var(--google-blue)' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 850, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Enterprise AI Readiness</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Suitability Index (Est.):</span>
                <span className="badge badge-blue" style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem', fontWeight: 700 }}>
                  {step === 1 && "🎯 DISCOVERY BAND"}
                  {step === 2 && "🌟 HIGH FEASIBILITY"}
                  {step === 3 && "🔒 SOVEREIGN CLOUD"}
                  {step === 4 && "💰 TCO OPTIMIZED"}
                  {step === 5 && "🛡️ PRODUCTION READY"}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.25rem' }}>
                <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', opacity: step >= 1 ? 1 : 0.35 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', flex: 1 }}>• Core Context Alignment</span>
                  {step > 1 ? <CheckCircle size={14} style={{ color: 'var(--google-green)' }} /> : <span style={{ fontSize: '0.72rem', color: 'var(--google-blue)', fontWeight: 700 }}>ACTIVE</span>}
                </div>
                <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', opacity: step >= 2 ? 1 : 0.35 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', flex: 1 }}>• Workload Specifications</span>
                  {step > 2 ? <CheckCircle size={14} style={{ color: 'var(--google-green)' }} /> : (step === 2 ? <span style={{ fontSize: '0.72rem', color: 'var(--google-blue)', fontWeight: 700 }}>PENDING</span> : <Lock size={10} style={{ color: 'var(--border-color)' }} />)}
                </div>
                <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', opacity: step >= 3 ? 1 : 0.35 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', flex: 1 }}>• VPC Sovereign Perimeters</span>
                  {step > 3 ? <CheckCircle size={14} style={{ color: 'var(--google-green)' }} /> : (step === 3 ? <span style={{ fontSize: '0.72rem', color: 'var(--google-blue)', fontWeight: 700 }}>PENDING</span> : <Lock size={10} style={{ color: 'var(--border-color)' }} />)}
                </div>
                <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', opacity: step >= 4 ? 1 : 0.35 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', flex: 1 }}>• Financial Cloud Spends</span>
                  {step > 4 ? <CheckCircle size={14} style={{ color: 'var(--google-green)' }} /> : (step === 4 ? <span style={{ fontSize: '0.72rem', color: 'var(--google-blue)', fontWeight: 700 }}>PENDING</span> : <Lock size={10} style={{ color: 'var(--border-color)' }} />)}
                </div>
                <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', opacity: step >= 5 ? 1 : 0.35 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', flex: 1 }}>• Compliance Clearances</span>
                  {step > 5 ? <CheckCircle size={14} style={{ color: 'var(--google-green)' }} /> : (step === 5 ? <span style={{ fontSize: '0.72rem', color: 'var(--google-blue)', fontWeight: 700 }}>PENDING</span> : <Lock size={10} style={{ color: 'var(--border-color)' }} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom context */}
          <div style={{ background: 'rgba(15,23,42,0.01)', border: '1px dashed rgba(15,23,42,0.1)', borderRadius: '6px', padding: '0.25rem 0.45rem', display: 'flex', gap: '0.25rem', alignItems: 'flex-start', flexShrink: 0 }}>
            <Info size={10} style={{ color: 'var(--google-blue)', marginTop: '0.1rem', flexShrink: 0 }} />
            <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.2 }}>
              {step === 1 && "Aligning company context, divisional budgets, and corporate sponsorships."}
              {step === 2 && "Defining usecase descriptions, agent autonomy metrics, and grounding RAG modes."}
              {step === 3 && "Configuring integration frameworks, payload safety, and legacy API adaptions."}
              {step === 4 && "Scoping token volatility, business value category, and target GCP contract CUDs."}
              {step === 5 && "Mitigating regulatory audit compliance perimeters and refactoring blockers."}
            </p>
          </div>
        </div>

        {/* B. RIGHT COLUMN: Scroll-Locked HIGH-FIDELITY Inputs Canvas */}
        <div 
          style={{ 
            flex: '1.28', 
            overflowY: 'auto', 
            paddingRight: '0.4rem', 
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', 
            height: '100%' 
          }}
        >
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem', padding: '0.75rem 0 1.5rem 0', width: '100%', boxSizing: 'border-box' }}>
            
            {/* Step 1: Customer Context */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                <div style={{ borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Step 1: Customer & Meeting Context</h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Define corporate background, transformation timeline, and business budget allocations.</p>
                </div>

                {/* Descriptive Report Name */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Descriptive Report Name <span style={{ color: 'var(--google-red)' }}>*</span></label>
                  <input 
                    type="text"
                    placeholder="e.g., Merck Biomarker Discovery PoC"
                    className="form-input"
                    style={{ borderRadius: '8px', fontSize: '0.95rem', padding: '0.55rem 0.75rem', width: '100%', boxSizing: 'border-box' }}
                    value={formData.reportName || ''}
                    onChange={e => onChange('reportName', e.target.value)}
                    required
                  />
                  
                  {/* Suggested names display */}
                  {(() => {
                    const isNameTaken = formData.reportName?.trim() && sessions.some(s => s.reportName?.trim().toLowerCase() === formData.reportName?.trim().toLowerCase());
                    return formData.reportName?.trim() && (
                      <div style={{ marginTop: '0.35rem' }}>
                        {isNameTaken ? (
                          <div style={{ background: 'rgba(239,68,68,0.02)', border: '1px solid rgba(239,68,68,0.12)', padding: '0.45rem 0.65rem', borderRadius: '6px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--google-red)', fontWeight: 700, display: 'block' }}>❌ Report Name Already in Use</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                              {[
                                `${formData.reportName} PoC`,
                                `${formData.reportName} (${formData.industry || 'Enterprise'})`,
                                `${formData.reportName} v${sessions.filter(s => s.reportName?.toLowerCase().startsWith(formData.reportName.toLowerCase())).length + 1}`
                              ].map((sugg, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => onChange('reportName', sugg)}
                                  style={{ fontSize: '0.68rem', padding: '0.2rem 0.45rem', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--google-blue)', fontWeight: 700, cursor: 'pointer' }}
                                >
                                  {sugg}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--google-green)', fontSize: '0.75rem', fontWeight: 700 }}>✓ Name Acceptable & Available</span>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Unified Symmetrical 2-Column Grid Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.95rem' }}>
                  
                  {/* Row 1 Left: Company Name */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Company Name</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.55rem 0.75rem', fontSize: '0.9rem', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                      value={formData.company || ''}
                      onChange={e => onChange('company', e.target.value)}
                      placeholder="e.g. Merck"
                    />
                  </div>

                  {/* Row 1 Right: Industry */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <label className="form-label" style={{ margin: 0, fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)' }}>Industry</label>
                      <span onClick={() => toggleNote('industry')} style={{ fontSize: '0.68rem', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 800 }}>
                        {activeNotes['industry'] ? '✕ Hide' : '📝 Note'}
                      </span>
                    </div>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.industry || ''}
                      onChange={e => onChange('industry', e.target.value)}
                    >
                      <option value="">Select industry...</option>
                      <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Retail & Consumer Goods">Retail & Consumer Goods</option>
                      <option value="Technology & Software">Technology & Software</option>
                      <option value="Manufacturing & Logistics">Manufacturing & Logistics</option>
                      <option value="Public Sector / Gov">Public Sector / Gov</option>
                    </select>
                    {(activeNotes['industry'] || formData.industryNotes) && (
                      <textarea
                        className="form-input"
                        style={{ marginTop: '0.35rem', fontSize: '0.78rem', minHeight: '45px', padding: '0.35rem' }}
                        placeholder="Industry annotations..."
                        value={formData.industryNotes || ''}
                        onChange={e => onChange('industryNotes', e.target.value)}
                      />
                    )}
                  </div>

                  {/* Row 2 Left: Division Name */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <label className="form-label" style={{ margin: 0, fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)' }}>Division Name</label>
                      <span onClick={() => toggleNote('division')} style={{ fontSize: '0.68rem', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 800 }}>
                        {activeNotes['division'] ? '✕ Hide' : '📝 Note'}
                      </span>
                    </div>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.division || ''}
                      onChange={e => onChange('division', e.target.value)}
                    >
                      <option value="">Select division...</option>
                      <option value="Oncology & Vaccines">Oncology & Vaccines</option>
                      <option value="Clinical Trials">Clinical Trials</option>
                      <option value="Informatics & R&D">Informatics & R&D</option>
                      <option value="Commercial & Sales">Commercial & Sales</option>
                      <option value="Finance & Procurement">Finance & Procurement</option>
                    </select>
                    {(activeNotes['division'] || formData.divisionNotes) && (
                      <textarea
                        className="form-input"
                        style={{ marginTop: '0.35rem', fontSize: '0.78rem', minHeight: '45px', padding: '0.35rem' }}
                        placeholder="Division annotations..."
                        value={formData.divisionNotes || ''}
                        onChange={e => onChange('divisionNotes', e.target.value)}
                      />
                    )}
                  </div>

                  {/* Row 2 Right: Customer Principal Name */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Customer Principal Name</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.55rem 0.75rem', fontSize: '0.9rem', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                      value={formData.userRole || ''}
                      onChange={e => onChange('userRole', e.target.value)}
                      placeholder="e.g. Jane Doe (VP of Informatics)"
                    />
                  </div>

                  {/* Row 3 Left: Timeline */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <label className="form-label" style={{ margin: 0, fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)' }}>Timeline</label>
                      <span onClick={() => toggleNote('timeline')} style={{ fontSize: '0.68rem', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 800 }}>
                        {activeNotes['timeline'] ? '✕ Hide' : '📝 Note'}
                      </span>
                    </div>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.timeline || ''}
                      onChange={e => onChange('timeline', e.target.value)}
                    >
                      <option value="">Select timeline...</option>
                      <option value="3 months">3 months (High Urgency)</option>
                      <option value="6 months">6 months (Standard)</option>
                      <option value="12 months">12 months (Phased)</option>
                      <option value="Exploratory">Exploratory exploration</option>
                    </select>
                    {(activeNotes['timeline'] || formData.timelineNotes) && (
                      <textarea
                        className="form-input"
                        style={{ marginTop: '0.35rem', fontSize: '0.78rem', minHeight: '45px', padding: '0.35rem' }}
                        placeholder="Timeline notes..."
                        value={formData.timelineNotes || ''}
                        onChange={e => onChange('timelineNotes', e.target.value)}
                      />
                    )}
                  </div>

                  {/* Row 3 Right: Lighthouse Classification */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <label className="form-label" style={{ margin: 0, fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)' }}>Lighthouse Classification</label>
                      <span onClick={() => toggleNote('lighthouse')} style={{ fontSize: '0.68rem', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 800 }}>
                        {activeNotes['lighthouse'] ? '✕ Hide' : '📝 Note'}
                      </span>
                    </div>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.lighthouse || '3'}
                      onChange={e => onChange('lighthouse', e.target.value)}
                    >
                      <option value="1">Tier 1 - Tactical Pilot</option>
                      <option value="2">Tier 2 - Divisional Usecase</option>
                      <option value="3">Tier 3 - Strategic Enterprise</option>
                      <option value="4">Tier 4 - High-Visibility Flagship</option>
                      <option value="5">Tier 5 - Global Digital Lighthouse</option>
                    </select>
                    {(activeNotes['lighthouse'] || formData.lighthouseNotes) && (
                      <textarea
                        className="form-input"
                        style={{ marginTop: '0.35rem', fontSize: '0.78rem', minHeight: '45px', padding: '0.35rem' }}
                        placeholder="Lighthouse details..."
                        value={formData.lighthouseNotes || ''}
                        onChange={e => onChange('lighthouseNotes', e.target.value)}
                      />
                    )}
                  </div>

                  {/* Row 4 Left: Discovery Health */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Discovery Health</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.health || 'Green'}
                      onChange={e => onChange('health', e.target.value)}
                    >
                      <option value="Green">🟢 On Track (Green)</option>
                      <option value="Yellow">🟡 Delayed (Yellow)</option>
                      <option value="Red">🔴 Support Needed (Red)</option>
                    </select>
                  </div>

                  {/* Row 4 Right: Active Discovery Budget Status */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Active Discovery Budget Status</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.budgetStatus || 'Approved Pilot Budget ($50k - $250k allocated)'}
                      onChange={e => onChange('budgetStatus', e.target.value)}
                    >
                      <option value="Exploratory Phase (No active budget allocated)">Exploratory Phase (No active budget)</option>
                      <option value="Approved Pilot Budget ($50k - $250k allocated)">Approved Pilot Budget ($50k - $250k)</option>
                      <option value="Full Production CapEx Secured (>$250k committed)">Full Production CapEx Secured (&gt;$250k)</option>
                    </select>
                  </div>

                  {/* Row 5 Left: Business Owner Email */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Business Owner Email</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.55rem 0.75rem', fontSize: '0.9rem', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                      value={formData.businessOwner || ''}
                      onChange={e => onChange('businessOwner', e.target.value)}
                      placeholder="e.g. jane.doe@merck.com"
                    />
                  </div>

                  {/* Row 5 Right: Technical Principal Email */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Technical Principal Email</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.55rem 0.75rem', fontSize: '0.9rem', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                      value={formData.technicalOwner || ''}
                      onChange={e => onChange('technicalOwner', e.target.value)}
                      placeholder="e.g. john.smith@merck.com"
                    />
                  </div>

                  {/* Row 6 Left: Core Division Target Size */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Core Division Target Size</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.divisionSize || 'Divisional Departmental Rollout (100 - 1,000 users)'}
                      onChange={e => onChange('divisionSize', e.target.value)}
                    >
                      <option value="Small Specialized R&D Team (<100 users)">Small Specialized R&D Team (&lt;100 users)</option>
                      <option value="Divisional Departmental Rollout (100 - 1,000 users)">Divisional Departmental Rollout (100 - 1,000 users)</option>
                      <option value="Global Enterprise Scale (1,000 - 10,000+ users)">Global Enterprise Scale (1,000 - 10,000+ users)</option>
                    </select>
                  </div>

                  {/* Row 6 Right: Executive Sponsor Confirmed? */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <label className="form-label" style={{ margin: 0, fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)' }}>Executive Sponsor Confirmed?</label>
                      <span onClick={() => toggleNote('execSponsor')} style={{ fontSize: '0.68rem', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 800 }}>
                        {activeNotes['execSponsor'] ? '✕ Hide' : '📝 Note'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.45rem' }}>
                      {['Yes', 'No', 'Pending'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => onChange('execSponsor', opt)}
                          className={`btn ${formData.execSponsor === opt ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ flex: 1, padding: '0.45rem 0.55rem', fontSize: '0.82rem', borderRadius: '6px', fontWeight: 700 }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Executive Sponsor Details (Visible dynamically below if 'Yes') */}
                {formData.execSponsor === 'Yes' && (
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Executive Sponsor Name & Title</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ fontSize: '0.9rem', padding: '0.55rem 0.75rem', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                      placeholder="Dr. Robert Vance CMO"
                      value={formData.execSponsorDetails || ''}
                      onChange={e => onChange('execSponsorDetails', e.target.value)}
                    />
                  </div>
                )}
                
                {(activeNotes['execSponsor'] || formData.execSponsorNotes) && (
                  <textarea
                    className="form-input"
                    style={{ fontSize: '0.78rem', minHeight: '45px', padding: '0.35rem' }}
                    placeholder="Sponsorship notes..."
                    value={formData.execSponsorNotes || ''}
                    onChange={e => onChange('execSponsorNotes', e.target.value)}
                  />
                )}
              </div>
            )}

            {/* Step 2: Use Case Details */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                <div style={{ borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Step 2: Use Case Details</h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Describe the functional workload scope and expected C-suite success milestones.</p>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Use Case Title</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ padding: '0.55rem 0.75rem', fontSize: '0.9rem', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                    value={formData.useCaseName || ''}
                    onChange={e => onChange('useCaseName', e.target.value)}
                    placeholder="e.g. Clinical Note Summarization"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Detailed Description</label>
                  <textarea
                    className="form-textarea"
                    value={formData.useCaseDesc || ''}
                    onChange={e => onChange('useCaseDesc', e.target.value)}
                    placeholder="Explain inputs, outputs, LLM context sizes, and expected multi-agent workflows..."
                    style={{ minHeight: '90px', fontSize: '0.9rem', padding: '0.55rem', borderRadius: '8px' }}
                  />
                </div>

                {/* Symmetrical 2-Column Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.95rem' }}>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Target Agentic Autonomy Level</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.agentAutonomy || 'Semi-Autonomous (Human approves final outbound payload)'}
                      onChange={e => onChange('agentAutonomy', e.target.value)}
                    >
                      <option value="Co-Pilot (Human-in-the-loop strictly active at all ticks)">Co-Pilot (Strict Human-in-the-loop)</option>
                      <option value="Semi-Autonomous (Human approves final outbound payload)">Semi-Autonomous (Human approval required)</option>
                      <option value="Fully Autonomous (Agent takes real-world API actions)">Fully Autonomous (Independent API execution)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Primary Grounding Retrieval Modality</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.groundingModality || 'Real-time SQL transactional databases (AlloyDB/BigQuery)'}
                      onChange={e => onChange('groundingModality', e.target.value)}
                    >
                      <option value="No grounding needed (Pure generative parametric memory)">Zero Grounding (Generative memory)</option>
                      <option value="Standard Vector Search (Semantic RAG vectors)">Standard Vector Search (RAG vectors)</option>
                      <option value="Real-time SQL transactional databases (AlloyDB/BigQuery)">Real-time Transactional SQL (AlloyDB/BigQuery)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>Existing Use Case currently running elsewhere?</label>
                    <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.25rem' }}>
                      {['Yes', 'No'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => onChange('isCurrentUseCase', opt)}
                          className={`btn ${formData.isCurrentUseCase === opt ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ flex: 1, padding: '0.45rem 0.55rem', fontSize: '0.82rem', borderRadius: '6px', fontWeight: 700 }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Legacy Architecture Sub-Grid (Symmetrical 50%/50% split) */}
                {formData.isCurrentUseCase === 'Yes' && (
                  <div style={{ background: 'rgba(15, 23, 42, 0.01)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>💼 Legacy Architecture Details</span>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.95rem' }}>
                      
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <label className="form-label" style={{ margin: 0, fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)' }}>Current Platform</label>
                          <span onClick={() => toggleNote('currentPlatform')} style={{ fontSize: '0.68rem', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 800 }}>
                            {activeNotes['currentPlatform'] ? '✕ Hide' : '📝 Note'}
                          </span>
                        </div>
                        <select
                          className="form-select"
                          style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                          value={formData.currentPlatform || ''}
                          onChange={e => onChange('currentPlatform', e.target.value)}
                        >
                          <option value="">Select platform...</option>
                          <option value="AWS">AWS</option>
                          <option value="Azure">Azure</option>
                          <option value="On-Premise">On-Premise</option>
                          <option value="GCP (Other Project)">GCP Project</option>
                          <option value="Other">Other SaaS</option>
                        </select>
                        {(activeNotes['currentPlatform'] || formData.currentPlatformNotes) && (
                          <textarea
                            className="form-input"
                            style={{ marginTop: '0.35rem', fontSize: '0.78rem', minHeight: '45px', padding: '0.35rem' }}
                            placeholder="Instance details..."
                            value={formData.currentPlatformNotes || ''}
                            onChange={e => onChange('currentPlatformNotes', e.target.value)}
                          />
                        )}
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <label className="form-label" style={{ margin: 0, fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)' }}>Current Data Source</label>
                          <span onClick={() => toggleNote('currentDataSource')} style={{ fontSize: '0.68rem', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 800 }}>
                            {activeNotes['currentDataSource'] ? '✕ Hide' : '📝 Note'}
                          </span>
                        </div>
                        <select
                          className="form-select"
                          style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                          value={formData.currentDataSource || ''}
                          onChange={e => onChange('currentDataSource', e.target.value)}
                        >
                          <option value="">Select data source...</option>
                          <option value="Teradata">Teradata</option>
                          <option value="Snowflake">Snowflake</option>
                          <option value="Oracle">Oracle</option>
                          <option value="AWS S3">AWS S3</option>
                          <option value="AlloyDB / Postgres">AlloyDB</option>
                          <option value="Local Files">Local Files</option>
                          <option value="Other">Other DB</option>
                        </select>
                        {(activeNotes['currentDataSource'] || formData.currentDataSourceNotes) && (
                          <textarea
                            className="form-input"
                            style={{ marginTop: '0.35rem', fontSize: '0.78rem', minHeight: '45px', padding: '0.35rem' }}
                            placeholder="Staging schemas..."
                            value={formData.currentDataSourceNotes || ''}
                            onChange={e => onChange('currentDataSourceNotes', e.target.value)}
                          />
                        )}
                      </div>

                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Use Case Types (Select all that apply)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                    {[
                      'RAG / knowledge search',
                      'Conversational agents / chatbots',
                      'Document processing / summarization',
                      'Code generation',
                      'Multi-modal (images, audio, video)',
                      'Agentic / multi-step workflows'
                    ].map(type => {
                      const isSel = (formData.useCaseTypes || []).includes(type);
                      return (
                        <div
                          key={type}
                          className={`option-card ${isSel ? 'selected' : ''}`}
                          style={{
                            display: 'flex',
                            gap: '0.45rem',
                            alignItems: 'center',
                            padding: '0.55rem 0.75rem',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleMultiSelect('useCaseTypes', type)}
                        >
                          <CheckCircle size={14} style={{ color: isSel ? 'var(--google-blue)' : 'var(--border-color)', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{type}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Primary Success Metrics</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    {['Accuracy', 'Latency', 'Compliance', 'Cost reduction', 'User adoption', 'Revenue generation'].map(m => {
                      const isSel = (formData.successMetrics || []).includes(m);
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => handleMultiSelect('successMetrics', m)}
                          className={`btn ${isSel ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ borderRadius: '8px', padding: '0.45rem 0.75rem', fontSize: '0.85rem', fontWeight: 700 }}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Technical Landscape */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                <div style={{ borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Step 3: Technical Landscape</h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Map out API host architectures, secure transport perimeters, and relational lakes.</p>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Migrating From / Legacy AI Setup</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                    {[
                      'OpenAI / Azure OpenAI',
                      'Anthropic / Bedrock',
                      'Open source / Self-hosted (Llama, Mistral)',
                      'Google Cloud Vertex AI (Legacy PaLM)',
                      'Net-new deployment (No legacy system)'
                    ].map(platform => {
                      const isSel = (formData.migratingFrom || []).includes(platform);
                      return (
                        <div
                          key={platform}
                          className={`option-card ${isSel ? 'selected' : ''}`}
                          style={{
                            display: 'flex',
                            gap: '0.45rem',
                            alignItems: 'center',
                            padding: '0.55rem 0.75rem',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleMultiSelect('migratingFrom', platform)}
                        >
                          <CheckCircle size={14} style={{ color: isSel ? 'var(--google-blue)' : 'var(--border-color)', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{platform}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Symmetrical 2-Column Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.95rem' }}>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Primary Cloud Infrastructure</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.currentCloud || ''}
                      onChange={e => onChange('currentCloud', e.target.value)}
                    >
                      <option value="">Select infrastructure...</option>
                      <option value="GCP">Google Cloud (GCP)</option>
                      <option value="AWS">AWS</option>
                      <option value="Azure">Azure</option>
                      <option value="Multi-cloud / Hybrid">Multi-cloud / Hybrid</option>
                      <option value="On-Premises">On-Premises</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>ML Team Maturity (1-5)</label>
                    <div className="range-slider-container" style={{ marginTop: '0.55rem', gap: '0.75rem' }}>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        className="range-slider"
                        value={formData.mlMaturity || 3}
                        onChange={e => onChange('mlMaturity', parseInt(e.target.value))}
                      />
                      <div className="range-val-display" style={{ padding: '0.2rem 0.55rem', fontSize: '0.9rem' }}>{formData.mlMaturity || 3}</div>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Model Pipeline Safety Perimeter</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.pipelineSafety || 'Strict PII/PHI Redaction proxies (Automatic DLP mask)'}
                      onChange={e => onChange('pipelineSafety', e.target.value)}
                    >
                      <option value="Standard VPC boundaries (Basic isolation)">Standard VPC boundaries (Basic isolation)</option>
                      <option value="Strict PII/PHI Redaction proxies (Automatic DLP mask)">Strict PII/PHI Redaction proxies (Inline DLP API)</option>
                      <option value="Sovereign Dedicated Tenant (Sovereign physical region)">Sovereign Dedicated Tenant (Physical isolation)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Target System Integration Framework</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.integrationFramework || 'Standard REST API interfaces (Low code)'}
                      onChange={e => onChange('integrationFramework', e.target.value)}
                    >
                      <option value="Standard REST API interfaces (Low code)">Standard REST API (Low code / HTTP)</option>
                      <option value="Legacy ERP/CRM Database adapters (Medium code)">Legacy database adapters (Medium code)</option>
                      <option value="On-Premise Secure Relational lakes (High custom ADK)">Secure relational lakes (High custom ADK)</option>
                    </select>
                  </div>

                  {/* Discovery Parameters Symmetrical rows */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--text-primary)' }}>Input Modality</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.5rem', fontSize: '0.85rem', borderRadius: '8px' }}
                      value={formData.inputModality || 'text'}
                      onChange={e => onChange('inputModality', e.target.value)}
                    >
                      <option value="text">Short Text</option>
                      <option value="document">PDF long-form</option>
                      <option value="multimodal">Genomics/Scans</option>
                      <option value="database">Database tables</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--text-primary)' }}>Payload Size</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.5rem', fontSize: '0.85rem', borderRadius: '8px' }}
                      value={formData.averagePayloadSize || 'short'}
                      onChange={e => onChange('averagePayloadSize', e.target.value)}
                    >
                      <option value="short">Short (&lt;10k)</option>
                      <option value="medium">Medium (10k-100k)</option>
                      <option value="long">Long (100k-1M)</option>
                      <option value="extreme">Extreme (2M context)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--text-primary)' }}>Latency SLA</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.5rem', fontSize: '0.85rem', borderRadius: '8px' }}
                      value={formData.targetLatency || 'interactive'}
                      onChange={e => onChange('targetLatency', e.target.value)}
                    >
                      <option value="realtime">Real-time (&lt;1.5s)</option>
                      <option value="interactive">Interactive (&lt;10s)</option>
                      <option value="batch">Offline Batch</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--text-primary)' }}>Grounding Strategy</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.5rem', fontSize: '0.85rem', borderRadius: '8px' }}
                      value={formData.groundingStrategy || 'none'}
                      onChange={e => onChange('groundingStrategy', e.target.value)}
                    >
                      <option value="none">Zero Grounding</option>
                      <option value="vector">Vector Search (RAG)</option>
                      <option value="sql">AlloyDB SQL mesh</option>
                      <option value="hybrid">Hybrid Semantic</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--text-primary)' }}>Data Residency</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.5rem', fontSize: '0.85rem', borderRadius: '8px' }}
                      value={formData.dataResidency || 'global'}
                      onChange={e => onChange('dataResidency', e.target.value)}
                    >
                      <option value="global">Global US Regions</option>
                      <option value="eu_restricted">EU-Restricted</option>
                      <option value="zero_logging">Zero-Logging HIPAA</option>
                      <option value="vpc_restricted">VPC Service Controls</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--text-primary)' }}>Adaptation Tuning</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.5rem', fontSize: '0.85rem', borderRadius: '8px' }}
                      value={formData.tuningStrategy || 'prompt_eng'}
                      onChange={e => onChange('tuningStrategy', e.target.value)}
                    >
                      <option value="prompt_eng">Prompt Engineering</option>
                      <option value="few_shot">Few-Shot Context</option>
                      <option value="lora">LoRA Fine-tune</option>
                      <option value="full_tuning">Full Adaptation</option>
                    </select>
                  </div>

                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Data Stack Connectors</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    {['BigQuery', 'Snowflake', 'PostgreSQL / AlloyDB', 'Vector DBs (Pinecone/Milvus)', 'Salesforce', 'S3 / GCS Unstructured'].map(ds => {
                      const isSel = (formData.dataStack || []).includes(ds);
                      return (
                        <button
                          key={ds}
                          type="button"
                          onClick={() => handleMultiSelect('dataStack', ds)}
                          className={`btn ${isSel ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ borderRadius: '8px', padding: '0.45rem 0.75rem', fontSize: '0.85rem', fontWeight: 700 }}
                        >
                          {ds}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Diagram upload */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Architecture Diagram (Multimodal Ingest)</label>
                  {formData.diagramFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0.75rem', background: 'rgba(19, 115, 51, 0.05)', border: '1px solid var(--google-green)', borderRadius: '8px' }}>
                      <CheckCircle size={16} style={{ color: 'var(--google-green)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formData.diagramFile}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>AWS infrastructure nodes parsed successfully.</span>
                      </div>
                      <button type="button" onClick={() => onChange('diagramFile', '')} className="btn btn-secondary" style={{ padding: '0.3rem 0.55rem', borderRadius: '6px', flexShrink: 0 }}>
                        <Trash2 size={14} style={{ color: 'var(--google-red)' }} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className={`dropzone ${dragging ? 'dropzone-active' : ''}`}
                      style={{ padding: '0.85rem', borderRadius: '8px', border: '1.5px dashed var(--border-color)', background: dragging ? 'rgba(26,115,232,0.01)' : 'transparent', textAlign: 'center', cursor: 'pointer' }}
                      onDragOver={e => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={e => { e.preventDefault(); setDragging(false); const files = e.dataTransfer.files; if (files && files.length > 0) { onChange('diagramFile', files[0].name); } }}
                      onClick={() => { const fileInput = document.getElementById('hidden-file-upload-cockpit-dense-optimized-v3'); if (fileInput) fileInput.click(); }}
                    >
                      <input 
                        id="hidden-file-upload-cockpit-dense-optimized-v3"
                        type="file"
                        accept="image/*"
                        onChange={e => { if (e.target.files && e.target.files.length > 0) { onChange('diagramFile', e.target.files[0].name); } }}
                        style={{ display: 'none' }}
                      />
                      <Upload size={20} style={{ color: 'var(--google-blue)', marginBottom: '0.25rem' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-primary)', display: 'block' }}>Upload Architecture Diagram</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Drag & drop or click to select files</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Business Drivers & ROI */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                <div style={{ borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Step 4: Business Drivers & ROI</h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Map cloud token expenditures, project CapEx leverage, and target committed spends contract values.</p>
                </div>

                {/* Symmetrical 2-Column Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.95rem' }}>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Projected Annual Spend</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.annualSpend || ''}
                      onChange={e => onChange('annualSpend', e.target.value)}
                    >
                      <option value="">Select projected spend...</option>
                      <option value="<$50k/yr">&lt; $50k/yr (PoC / Small scale)</option>
                      <option value="$50k-$200k/yr">$50k - $200k/yr (Departmental)</option>
                      <option value="$200k-$500k/yr">$200k - $500k/yr (Mid-market)</option>
                      <option value="$500k-$1M/yr">$500k - $1M/yr (Enterprise Core)</option>
                      <option value=">$1M/yr">&gt; $1M/yr (Strategic / Fleet-wide)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Primary Migration Reason</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.migrationReason || ''}
                      onChange={e => onChange('migrationReason', e.target.value)}
                    >
                      <option value="">Select primary reason...</option>
                      <option value="Cost reduction / Token consolidation">Cost reduction / Token consolidation</option>
                      <option value="Carbon reduction / Green energy offset">Carbon reduction / Green energy offset</option>
                      <option value="Multimodal accuracy / Long context (1M+)">Multimodal accuracy / Long context (1M+)</option>
                      <option value="Google Cloud consolidation & Data gravity">Google Cloud consolidation & Data gravity</option>
                      <option value="Data governance & Enterprise Security">Data governance & Enterprise Security</option>
                      <option value="Latency improvements">Latency improvements</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Projected Token Volatility</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.tokenVolatility || 'Dynamic Interactive Peaks (Elastic token bursts)'}
                      onChange={e => onChange('tokenVolatility', e.target.value)}
                    >
                      <option value="Stable Batch Streams (Predictable flat payloads)">Stable Batch Streams (Predictable flat payloads)</option>
                      <option value="Dynamic Interactive Peaks (Elastic token bursts)">Dynamic Interactive Peaks (Elastic token bursts)</option>
                      <option value="Unpredictable Multi-Agent Chaining (Rapid token spikes)">Unpredictable Multi-Agent Chaining (Rapid token spikes)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Expected Business Value Category</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.valueLeverage || 'Internal Productivity Gains (OpEx efficiency)'}
                      onChange={e => onChange('valueLeverage', e.target.value)}
                    >
                      <option value="Internal Productivity Gains (OpEx efficiency)">Internal Productivity Gains (OpEx efficiency)</option>
                      <option value="Customer Experience Transformation (Retention & loyalty)">Customer Experience Transformation (Retention & loyalty)</option>
                      <option value="Net-New Revenue Stream (Innovative business scaling)">Net-New Revenue Stream (Innovative business scaling)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Target Cloud platform Commitment</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.gcpCommitment || 'GCP committed spend (CUD Applied)'}
                      onChange={e => onChange('gcpCommitment', e.target.value)}
                    >
                      <option value="No committed GCP cloud contract (Standard billing rates)">No committed GCP cloud contract (Standard billing rates)</option>
                      <option value="GCP committed spend (CUD Applied)">GCP committed spend contract (Committed Use Discount applied)</option>
                      <option value="Sovereign Cloud Dedicated Subscription contract">Sovereign Cloud Dedicated Subscription contract</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)' }}>Business Urgency (1 = Low, 5 = High)</label>
                    <div className="range-slider-container" style={{ marginTop: '0.35rem', gap: '0.75rem' }}>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        className="range-slider"
                        value={formData.urgency || 3}
                        onChange={e => onChange('urgency', parseInt(e.target.value))}
                      />
                      <div className="range-val-display" style={{ padding: '0.2rem 0.55rem', fontSize: '0.9rem' }}>{formData.urgency || 3}</div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Step 5: Risks, Security & Blockers */}
            {step === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                <div style={{ borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Step 5: Risks, Security & Blockers</h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Map regulatory clearances, configure audit streams, and register code rewrite effort estimation.</p>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Compliance & Security Mandates</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    {['HIPAA', 'SOC2', 'PII / GDPR', 'FedRAMP / Gov', 'Data Residency (EU/US)', 'PCI-DSS'].map(comp => {
                      const isSel = (formData.compliance || []).includes(comp);
                      return (
                        <button
                          key={comp}
                          type="button"
                          onClick={() => handleMultiSelect('compliance', comp)}
                          className={`btn ${isSel ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ borderRadius: '8px', padding: '0.45rem 0.75rem', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <Shield size={13} />
                          <span>{comp}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Symmetrical 2-Column Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.95rem' }}>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Active Regulatory Audit Perimeter</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.regulatoryAudit || 'HIPAA / Healthcare Patient Data (Extreme strict DLP)'}
                      onChange={e => onChange('regulatoryAudit', e.target.value)}
                    >
                      <option value="No regulatory oversight (Public domains)">No regulatory oversight (Public domains)</option>
                      <option value="HIPAA / Healthcare Patient Data (Extreme strict DLP)">HIPAA / Healthcare Patient Data (Strict DLP)</option>
                      <option value="SEC / FINRA Financial Data (Extreme strict auditing)">SEC / FINRA Financial Data (Strict auditing)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Estimated Code Refactoring Effort</label>
                    <select
                      className="form-select"
                      style={{ padding: '0.55rem', fontSize: '0.9rem', borderRadius: '8px' }}
                      value={formData.refactoringEffort || 'Standard API migration (Azure to GCP adapters, Low effort)'}
                      onChange={e => onChange('refactoringEffort', e.target.value)}
                    >
                      <option value="Greenfield (Net-new deployment, no legacy refactor)">Greenfield (Net-new deployment)</option>
                      <option value="Standard API migration (Azure to GCP adapters, Low effort)">Standard API migration (Low effort)</option>
                      <option value="Complex Legacy Migration (Teradata/Redshift rewrite, High effort)">Complex Legacy Migration (High rewrite effort)</option>
                    </select>
                  </div>

                </div>

                <div className="form-group" style={{ marginBottom: 0, marginTop: '0.35rem' }}>
                  <label className="form-label" style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.3rem', display: 'block' }}>Potential Blockers & Friction</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                    {[
                      'PII handling in prompt pipelines',
                      'Clinician output quality acceptance',
                      'Snowflake to Vertex AI pipeline ownership',
                      'Data residency compliance',
                      'Legacy API chaining refactoring',
                      'Lack of dedicated ML/Engineering resources'
                    ].map(b => {
                      const isSel = (formData.blockers || []).includes(b);
                      return (
                        <div
                          key={b}
                          className={`option-card ${isSel ? 'selected' : ''}`}
                          style={{
                            display: 'flex',
                            gap: '0.35rem',
                            alignItems: 'center',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleMultiSelect('blockers', b)}
                        >
                          <AlertTriangle size={13} style={{ color: isSel ? 'var(--google-red)' : 'var(--border-color)', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{b}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ANCHORED CONTROLS FOOTER (Capped, flexShrink: 0, always visible!) */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginTop: '0.65rem', 
          paddingTop: '0.55rem', 
          borderTop: '1px solid var(--border-color)',
          flexShrink: 0
        }}
      >
        <div>
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button onClick={onSaveSession} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', fontWeight: 700 }}>
            Save Draft
          </button>

          {step < 5 ? (
            <button onClick={() => setStep(step + 1)} className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Next Step</span>
              <ArrowRight size={13} />
            </button>
          ) : (
            <button 
              onClick={handleFinalSubmit} 
              onMouseEnter={() => setHoveredBtn('submit')}
              onMouseLeave={() => setHoveredBtn(null)}
              className="btn" 
              style={{ 
                padding: '0.45rem 1rem', 
                fontSize: '0.78rem', 
                fontWeight: 800,
                backgroundColor: 'var(--google-blue)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(26,115,232,0.2)',
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.35rem',
                cursor: 'pointer',
                transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredBtn === 'submit' ? 'translateY(-2px)' : 'none'
              }}
            >
              <Sparkles size={14} />
              <span>Generate Scoring Report</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
