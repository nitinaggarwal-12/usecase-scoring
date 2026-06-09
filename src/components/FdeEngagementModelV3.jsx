import { useState } from 'react';
import { generateFdeJustificationReport } from '../services/aiService';
import { Sparkles, Cloud, Shield, Check, HelpCircle, ArrowRight, Terminal, Network, Lock, Info, Compass, ShieldAlert, TrendingUp, BarChart2, ShieldCheck, Users, Zap, Cpu, Clock, CheckCircle, AlertTriangle, ListFilter, Award, Milestone, Database, CheckSquare, Square } from 'lucide-react';

export default function FdeEngagementModelV3() {
  // --- State for active sub-tab ---
  const [subTab, setSubTab] = useState('evaluation'); // 'evaluation' | 'report' | 'execution'
  
  // --- State for active Execution Stage sub-tab (Slide 18 drill down!) ---
  const [activeExecutionStage, setActiveExecutionStage] = useState('build'); // 'build' | 'scale' | 'govern' | 'optimize'

  // --- State for interactive task checkers in Execution stages ---
  const [completedTasks, setCompletedTasks] = useState({
    build_1: true, build_2: false, build_3: false, build_4: false,
    scale_1: false, scale_2: false, scale_3: false, scale_4: false,
    govern_1: false, govern_2: false, govern_3: false, govern_4: false,
    optimize_1: false, optimize_2: false, optimize_3: false, optimize_4: false
  });

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // ==========================================
  // 🛠️ CONSOLIDATED V1 + V2 HIGH-TECH QUESTIONNAIRE STATE
  // ==========================================

  // 1. Strategic & Corporate Perimeters
  const [activeLighthouse, setActiveLighthouse] = useState('Clinical Acceleration');
  const [execSponsor, setExecSponsor] = useState('Confirmed'); // Confirmed, Pending, None
  const [pandLImpact, setPandLImpact] = useState('$100M+ (High)'); // $100M+, $10M-$50M, <$10M
  const [userAdoptionPath, setUserAdoptionPath] = useState('GPTeal2 Active'); // GPTeal2 Active, Standalone, TBD

  // 2. Cloud & Data Architecture
  const [aiStack, setAiStack] = useState('Gemini 1.5 Pro (Vertex AI)'); // Gemini 1.5 Pro (Vertex AI), Azure OpenAI Proxy, Open Source (Llama), Custom LangChain
  const [dataReadiness, setDataReadiness] = useState('BQ/BigLake Ready'); // BQ/BigLake Ready, AWS Snowflake Private Link, Veeva CRM / Salesforce, Siloed
  const [cloudInfra, setCloudInfra] = useState('GCP Dedicated Tenant'); // GCP Dedicated Tenant, Multi-Cloud Egress, Sovereign Cloud
  const [agenticReadiness, setAgenticReadiness] = useState('MGP/API Integrated'); // MGP/API Integrated, Custom LangGraph, SaaS Pre-built

  // 3. Security & Regulatory Perimeters (Slide 17 Logic)
  const [isSensitiveGxP, setIsSensitiveGxP] = useState('Yes'); // Yes, No
  const [hasVpcSC, setHasVpcSC] = useState('Yes'); // Yes, No
  const [hasDlpRedaction, setHasDlpRedaction] = useState('Yes'); // Yes, No
  const [requiresDeepIntegration, setRequiresDeepIntegration] = useState('Yes'); // Yes, No (Tech Transfer)

  // 4. Operational SLAs & Interfaces
  const [requiresCustomUI, setRequiresCustomUI] = useState('Yes'); // Yes, No (Custom UI Workflow Chain)
  const [isProductivityTask, setIsProductivityTask] = useState('No'); // Yes, No (Standard Productivity Task)
  const [strategicUrgency, setStrategicUrgency] = useState('Lighthouse Priority (Weeks)'); // Lighthouse Priority (Weeks), Strategic Initiative (Months), R&D Exploration
  const [techPathSelected, setTechPathSelected] = useState('High-Touch FDE'); // High-Touch FDE, Partner Build, Google Build

  const handlePrefillFdeScenario = () => {
    setActiveLighthouse('Clinical Acceleration');
    setExecSponsor('Confirmed');
    setPandLImpact('$100M+ (High)');
    setUserAdoptionPath('GPTeal2 Active');
    setAiStack('Gemini 1.5 Pro (Vertex AI)');
    setDataReadiness('BQ/BigLake Ready');
    setCloudInfra('GCP Dedicated Tenant');
    setAgenticReadiness('MGP/API Integrated');
    setIsSensitiveGxP('Yes');
    setHasVpcSC('Yes');
    setHasDlpRedaction('Yes');
    setRequiresDeepIntegration('Yes');
    setRequiresCustomUI('Yes');
    setIsProductivityTask('No');
    setStrategicUrgency('Lighthouse Priority (Weeks)');
    setTechPathSelected('High-Touch FDE');
    alert("✨ Strategic biopharma CE-FDE scoping scenario prefilled successfully!");
  };

  // --- FDE Engagement Justification Report Compiler ---
  const [isCompilingReport, setIsCompilingReport] = useState(false);
  const [justificationReport, setJustificationReport] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  const handleCompileFdeJustification = async () => {
    setIsCompilingReport(true);
    setShowReportModal(true);
    setJustificationReport('⏳ Engaging active Vertex AI us-central1 Reasoning Engine... Generating highly technical FDE Headcount Resourcing Justification Dossier... (Please wait, streaming live GenAI results)');
    try {
      const storedToken = localStorage.getItem('gcp_access_token') || 'demo_token';
      const storedApiKey = localStorage.getItem('gemini_api_key') || 'demo_key';

      const v3State = {
        activeLighthouse,
        execSponsor,
        pandLImpact,
        dataReadiness,
        agenticReadiness,
        isSensitiveGxP,
        requiresDeepIntegration,
        requiresCustomUI,
        isProductivityTask,
        aiStack,
        cloudInfra,
        hasVpcSC,
        hasDlpRedaction,
        strategicUrgency,
        techPathSelected
      };

      const report = await generateFdeJustificationReport(v3State, storedApiKey, storedToken);
      setJustificationReport(report);
    } catch (err) {
      setJustificationReport(`⚠️ FDE Justification Compilation Failure: ${err.message || 'Connection Exception'}`);
    } finally {
      setIsCompilingReport(false);
    }
  };

  // --- SLIDE 17: Decision Flow Logic for Staffing ---
  let calculatedStaffingVerdict = 'Re-evaluate with LEVEL 3 Steering';
  let staffingExplanation = 'Does not match standard high/low code integration boundaries. Re-evaluate strategic value with Steering.';
  let activeFlowPath = [false, false, false, false, false];

  if (isSensitiveGxP === 'Yes') {
    calculatedStaffingVerdict = 'LEVEL 1 BUILDER: HIGH-CODE';
    staffingExplanation = 'Custom validation, security wrappers, and deep API expertise required for sensitive regulatory perimeters.';
    activeFlowPath[0] = true;
  } else if (requiresDeepIntegration === 'Yes') {
    calculatedStaffingVerdict = 'LEVEL 1 BUILDER: HIGH/LOW-CODE';
    staffingExplanation = 'Technical execution layer focused on deep system integrations (e.g., Tech Transfer) and custom pipelines.';
    activeFlowPath[1] = true;
  } else if (isProductivityTask === 'Yes') {
    calculatedStaffingVerdict = 'NO-CODE: USER LEVEL + L2 GUIDANCE';
    staffingExplanation = 'Assigned to standard productivity tasks (e.g., Dossier drafting). Utilizes enterprise-sanctioned SaaS tools.';
    activeFlowPath[2] = true;
  } else if (requiresCustomUI === 'Yes') {
    calculatedStaffingVerdict = 'LEVEL 2 LEAD: LOW-CODE';
    staffingExplanation = 'Custom UIs or workflow chains (e.g. Drug Discovery Assistant). Staffed by Delta, Partner FDEs or Merck Dev teams.';
    activeFlowPath[3] = true;
  } else {
    activeFlowPath[4] = true;
  }

  // --- Slide 14 Feasibility Rubric Calculations ---
  const getScoreForBusinessMetric = (metric, val) => {
    if (metric === 'sponsor') return val === 'Confirmed' ? 95 : (val === 'Pending' ? 70 : 30);
    if (metric === 'pandl') return val === '$100M+ (High)' ? 98 : (val === '$10M-$50M' ? 78 : 45);
    if (metric === 'adoption') return val === 'GPTeal2 Active' ? 95 : (val === 'Standalone' ? 75 : 40);
    return 85; // Default alignment score
  };

  const getScoreForTechnicalMetric = (metric, val) => {
    if (metric === 'data') return val === 'BQ/BigLake Ready' ? 95 : (val === 'AWS Snowflake Private Link' ? 80 : (val === 'Veeva CRM / Salesforce' ? 72 : 45));
    if (metric === 'agentic') return val === 'MGP/API Integrated' ? 95 : (val === 'Custom LangGraph' ? 75 : 35);
    if (metric === 'gxp') return val === 'Yes' ? 98 : 60;
    
    // Adjust tech path score based on AI/ML stack selection!
    if (metric === 'path') {
      if (aiStack === 'Gemini 1.5 Pro (Vertex AI)') return 95;
      if (aiStack === 'Azure OpenAI Proxy') return 60; // Penalize inter-cloud proxy
      return 75;
    }
    return 85;
  };

  const businessAlignmentScore = 90; // Lighthouse target
  const businessSponsorScore = getScoreForBusinessMetric('sponsor', execSponsor);
  const businessROI = getScoreForBusinessMetric('pandl', pandLImpact);
  const businessAdoption = getScoreForBusinessMetric('adoption', userAdoptionPath);

  const techDataScore = getScoreForTechnicalMetric('data', dataReadiness);
  const techAgenticScore = getScoreForTechnicalMetric('agentic', agenticReadiness);
  const techCompliance = getScoreForTechnicalMetric('gxp', isSensitiveGxP);
  const techPathScore = getScoreForTechnicalMetric('path', techPathSelected);

  const getGrade = (score) => {
    if (score >= 90) return { g: 'A+', c: 'var(--google-green)' };
    if (score >= 75) return { g: 'B', c: 'var(--google-blue)' };
    if (score >= 50) return { g: 'C', c: 'var(--google-amber)' };
    return { g: 'D', c: 'var(--google-red)' };
  };

  return (
    <div 
      className="card card-glow-accent" 
      style={{ 
        width: '100%', 
        maxWidth: '100%', 
        margin: '0', 
        display: 'flex', 
        flexDirection: 'column', 
        background: 'var(--bg-card)', 
        borderColor: 'var(--border-color)', 
        borderRadius: '16px', 
        padding: '1.25rem',
        boxSizing: 'border-box',
        height: 'calc(100vh - 110px)',
        overflow: 'hidden',
        gap: '0.85rem'
      }}
    >
      
      {/* Header Panel (Scrubbed Title - Sub-Tab Switcher only!) */}
      <div style={{ borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        
        {/* PROGRESSIVE 3-SUB-TAB SWITCHER */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', padding: '0.2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setSubTab('evaluation')}
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.72rem',
              fontWeight: subTab === 'evaluation' ? 800 : 600,
              borderRadius: '6px',
              background: subTab === 'evaluation' ? 'var(--google-blue)' : 'transparent',
              color: subTab === 'evaluation' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            1 • Evaluation Logic & Criteria
          </button>
          <button
            onClick={() => setSubTab('report')}
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.72rem',
              fontWeight: subTab === 'report' ? 800 : 600,
              borderRadius: '6px',
              background: subTab === 'report' ? 'var(--google-blue)' : 'transparent',
              color: subTab === 'report' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            2 • Decision Report & Recommendations 📊
          </button>
          <button
            onClick={() => setSubTab('execution')}
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.72rem',
              fontWeight: subTab === 'execution' ? 800 : 600,
              borderRadius: '6px',
              background: subTab === 'execution' ? 'var(--google-blue)' : 'transparent',
              color: subTab === 'execution' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            3 • Execution Plan & Milestones 🗺️
          </button>
        </div>

        {/* Prefill trigger */}
        <button
          type="button"
          onClick={handlePrefillFdeScenario}
          className="btn btn-outline"
          style={{
            padding: '0.38rem 0.85rem',
            fontSize: '0.72rem',
            fontWeight: 800,
            borderColor: '#a855f7',
            color: '#a855f7',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            cursor: 'pointer',
            borderRadius: '6px',
            background: 'transparent'
          }}
        >
          <Sparkles size={12} />
          <span>Prefill Demo Scenario</span>
        </button>
      </div>

      {/* 1 • EVALUATION LOGIC & CRITERIA VIEW */}
      {subTab === 'evaluation' && (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '0.85rem', minHeight: 0, overflowY: 'auto' }}>
          
          {/* Left Side: Symmetrical 2-Column Questionnaire Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', paddingRight: '0.25rem' }}>
            
            {/* Panel 1: Strategic & Corporate Perimeters */}
            <div className="card" style={{ padding: '0.75rem 0.85rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 850 }}>1. Strategic & Corporate Perimeters</strong>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.55rem' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Lighthouse Funnel Outcome</span>
                  <select value={activeLighthouse} onChange={e => setActiveLighthouse(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="AI-Enabled Discovery">AI-Enabled Discovery</option>
                    <option value="Clinical Acceleration">Clinical Acceleration</option>
                    <option value="Digital CMC & Supply">Digital CMC & Supply</option>
                    <option value="HCP & Patient Engagement">HCP & Patient Engagement</option>
                    <option value="GSF Transformation">GSF Transformation</option>
                  </select>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>P&L ROI Value</span>
                  <select value={pandLImpact} onChange={e => setPandLImpact(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="$100M+ (High)">$100M+ (High)</option>
                    <option value="$10M-$50M">$10M-$50M</option>
                    <option value="<$10M">&lt;$10M</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem', marginTop: '0.15rem' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Executive Sponsorship Gate</span>
                  <select value={execSponsor} onChange={e => setExecSponsor(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Confirmed">SSO Confirmed & Active</option>
                    <option value="Pending">Pending Steerboard</option>
                    <option value="None">R&D Sandbox Only</option>
                  </select>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Adoption Pathway (GPTeal2)</span>
                  <select value={userAdoptionPath} onChange={e => setUserAdoptionPath(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="GPTeal2 Active">GPTeal2 Global Framework</option>
                    <option value="Standalone">Standalone Custom UI</option>
                    <option value="TBD">Local R&D CLI Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Panel 2: Cloud & Data Architecture */}
            <div className="card" style={{ padding: '0.75rem 0.85rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 850 }}>2. Cloud & Data Architecture</strong>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Current AI/ML Stack</span>
                  <select value={aiStack} onChange={e => setAiStack(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Gemini 1.5 Pro (Vertex AI)">Gemini 1.5 Pro (Vertex AI)</option>
                    <option value="Azure OpenAI Proxy">Azure OpenAI Proxy</option>
                    <option value="Open Source (Llama)">Open Source (Llama)</option>
                    <option value="Custom LangChain">Custom LangChain</option>
                  </select>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Data Staging / Repositories</span>
                  <select value={dataReadiness} onChange={e => setDataReadiness(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="BQ/BigLake Ready">BigQuery / BigLake Ready</option>
                    <option value="AWS Snowflake Private Link">AWS Snowflake via Private Link</option>
                    <option value="Veeva CRM / Salesforce">Veeva CRM / Salesforce API</option>
                    <option value="Siloed">Siloed / On-Prem</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem', marginTop: '0.15rem' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Target Cloud Perimeter</span>
                  <select value={cloudInfra} onChange={e => setCloudInfra(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="GCP Dedicated Tenant">GCP Dedicated Tenant</option>
                    <option value="Multi-Cloud Egress">Multi-Cloud Egress (AWS/GCP)</option>
                    <option value="Sovereign Cloud">Sovereign Dedicated Cloud</option>
                  </select>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Agentic Interface Readiness</span>
                  <select value={agenticReadiness} onChange={e => setAgenticReadiness(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="MGP/API Integrated">MGP / Vertex API Ready</option>
                    <option value="Custom LangGraph">Custom LangGraph Orchestrator</option>
                    <option value="SaaS Pre-built">SaaS Pre-built Wrapper</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Panel 3: Security & Regulatory Perimeters */}
            <div className="card" style={{ padding: '0.75rem 0.85rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 850 }}>3. Security & Regulatory Perimeters</strong>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600 }}>Strict GxP / FDA Validation?</span>
                  <select value={isSensitiveGxP} onChange={e => setIsSensitiveGxP(e.target.value)} className="form-select" style={{ width: '60px', padding: '0.15rem', fontSize: '0.68rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600 }}>VPC-SC Egress Locks?</span>
                  <select value={hasVpcSC} onChange={e => setHasVpcSC(e.target.value)} className="form-select" style={{ width: '60px', padding: '0.15rem', fontSize: '0.68rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem', marginTop: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600 }}>Inline DLP Sanitization?</span>
                  <select value={hasDlpRedaction} onChange={e => setHasDlpRedaction(e.target.value)} className="form-select" style={{ width: '60px', padding: '0.15rem', fontSize: '0.68rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600 }}>Deep System Tech Transfer?</span>
                  <select value={requiresDeepIntegration} onChange={e => setRequiresDeepIntegration(e.target.value)} className="form-select" style={{ width: '60px', padding: '0.15rem', fontSize: '0.68rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Panel 4: Operational SLAs & Interfaces */}
            <div className="card" style={{ padding: '0.75rem 0.85rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 850 }}>4. Operational SLAs & Interfaces</strong>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.55rem' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Strategic Urgency Target</span>
                  <select value={strategicUrgency} onChange={e => setStrategicUrgency(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Lighthouse Priority (Weeks)">Lighthouse Sponsor Priority (Weeks)</option>
                    <option value="Strategic Initiative (Months)">Strategic Initiative (Months)</option>
                    <option value="R&D Exploration">R&D Exploration (Quarterly)</option>
                  </select>
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Technical Scoping Path</span>
                  <select value={techPathSelected} onChange={e => setTechPathSelected(e.target.value)} className="form-select" style={{ fontSize: '0.72rem', padding: '0.25rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="High-Touch FDE">High-Touch FDE</option>
                    <option value="Partner Build">Partner Build</option>
                    <option value="Google Build">Google Build</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem', marginTop: '0.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.45rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600 }}>Requires Custom UI?</span>
                  <select value={requiresCustomUI} onChange={e => setRequiresCustomUI(e.target.value)} className="form-select" style={{ width: '60px', padding: '0.15rem', fontSize: '0.68rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600 }}>Productivity Task?</span>
                  <select value={isProductivityTask} onChange={e => setIsProductivityTask(e.target.value)} className="form-select" style={{ width: '60px', padding: '0.15rem', fontSize: '0.68rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: FDE Decision tree */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', paddingRight: '0.25rem' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem', flexShrink: 0 }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'block', fontWeight: 850 }}>FDE Staffing Decision Logic Matrix</strong>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>Watch the active scoping query traverse the decision node tree:</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              
              {/* Node 1 */}
              <div style={{ padding: '0.45rem 0.65rem', background: activeFlowPath[0] ? 'rgba(52,168,83,0.08)' : 'var(--bg-surface)', border: activeFlowPath[0] ? '1px solid var(--google-green)' : '1px solid var(--border-color)', borderRadius: '8px', opacity: activeFlowPath[0] ? 1 : 0.55, transition: 'all 0.2s' }}>
                <strong style={{ fontSize: '0.75rem', color: activeFlowPath[0] ? 'var(--google-green)' : 'var(--text-primary)', display: 'block' }}>1. Is data highly sensitive or GxP regulated? ➔ {isSensitiveGxP}</strong>
                {activeFlowPath[0] && <span style={{ fontSize: '0.68rem', color: 'var(--google-green)', fontWeight: 700 }}>Outcome Match ➔ LEVEL 1 BUILDER: HIGH-CODE</span>}
              </div>

              {/* Node 2 */}
              <div style={{ padding: '0.45rem 0.65rem', background: activeFlowPath[1] ? 'rgba(52,168,83,0.08)' : 'var(--bg-surface)', border: activeFlowPath[1] ? '1px solid var(--google-green)' : '1px solid var(--border-color)', borderRadius: '8px', opacity: activeFlowPath[1] ? 1 : 0.55, transition: 'all 0.2s' }}>
                <strong style={{ fontSize: '0.75rem', color: activeFlowPath[1] ? 'var(--google-green)' : 'var(--text-primary)', display: 'block' }}>2. Requires deep integration (Tech Transfer)? ➔ {requiresDeepIntegration}</strong>
                {activeFlowPath[1] && <span style={{ fontSize: '0.68rem', color: 'var(--google-green)', fontWeight: 700 }}>Outcome Match ➔ LEVEL 1 BUILDER: HIGH/LOW-CODE</span>}
              </div>

              {/* Node 3 */}
              <div style={{ padding: '0.45rem 0.65rem', background: activeFlowPath[2] ? 'rgba(244,180,0,0.08)' : 'var(--bg-surface)', border: activeFlowPath[2] ? '1px solid var(--google-amber)' : '1px solid var(--border-color)', borderRadius: '8px', opacity: activeFlowPath[2] ? 1 : 0.55, transition: 'all 0.2s' }}>
                <strong style={{ fontSize: '0.75rem', color: activeFlowPath[2] ? 'var(--google-amber)' : 'var(--text-primary)', display: 'block' }}>3. Is it a "Standard Productivity" task? ➔ {isProductivityTask}</strong>
                {activeFlowPath[2] && <span style={{ fontSize: '0.68rem', color: 'var(--google-amber)', fontWeight: 700 }}>Outcome Match ➔ NO-CODE: USER LEVEL</span>}
              </div>

              {/* Node 4 */}
              <div style={{ padding: '0.45rem 0.65rem', background: activeFlowPath[3] ? 'rgba(26,115,232,0.08)' : 'var(--bg-surface)', border: activeFlowPath[3] ? '1px solid var(--google-blue)' : '1px solid var(--border-color)', borderRadius: '8px', opacity: activeFlowPath[3] ? 1 : 0.55, transition: 'all 0.2s' }}>
                <strong style={{ fontSize: '0.75rem', color: activeFlowPath[3] ? 'var(--google-blue)' : 'var(--text-primary)', display: 'block' }}>4. Requires custom UI or workflow chain? ➔ {requiresCustomUI}</strong>
                {activeFlowPath[3] && <span style={{ fontSize: '0.68rem', color: 'var(--google-blue)', fontWeight: 700 }}>Outcome Match ➔ LEVEL 2 LEAD: LOW-CODE</span>}
              </div>

              {/* Node 5 */}
              <div style={{ padding: '0.45rem 0.65rem', background: activeFlowPath[4] ? 'rgba(234,67,53,0.08)' : 'var(--bg-surface)', border: activeFlowPath[4] ? '1px solid var(--google-red)' : '1px solid var(--border-color)', borderRadius: '8px', opacity: activeFlowPath[4] ? 1 : 0.55, transition: 'all 0.2s' }}>
                <strong style={{ fontSize: '0.75rem', color: activeFlowPath[4] ? 'var(--google-red)' : 'var(--text-primary)', display: 'block' }}>5. No structural matches identified ➔ Default Out</strong>
                {activeFlowPath[4] && <span style={{ fontSize: '0.68rem', color: 'var(--google-red)', fontWeight: 700 }}>Outcome Match ➔ Re-evaluate with LEVEL 3 Steering</span>}
              </div>

            </div>

            {/* resourcing decision verdict card */}
            <div 
              className="card card-glow-accent" 
              style={{ 
                padding: '0.75rem 1rem', 
                background: 'linear-gradient(135deg, rgba(26,115,232,0.08) 0%, rgba(168,85,247,0.08) 100%)',
                border: '1.5px solid rgba(168,85,247,0.3)',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(168,85,247,0.15)'
              }}
            >
              <span style={{ fontSize: '0.58rem', color: 'var(--google-purple)', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>Staffing Allocation Decision Report</span>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', marginTop: '0.15rem' }}>{calculatedStaffingVerdict}</strong>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0', lineHeight: 1.35 }}>
                {staffingExplanation}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* 2 • DECISION REPORT & RECOMMENDATIONS VIEW */}
      {subTab === 'report' && (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem', minHeight: 0, overflowY: 'auto' }}>
          
          {/* Widescreen table and justifications compiler */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem', flexShrink: 0 }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block', fontWeight: 850 }}>Joint Feasibility Gate Scoring Rubric</strong>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>Google Cloud and Merck Joint Steering Criteria Assessment scorecard:</span>
            </div>

            <div className="card" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', width: '100%', padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--google-blue)', fontWeight: 800 }}>Gate Feasibility Metric</th>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--google-blue)', fontWeight: 800 }}>Scoping Value Mapped</th>
                    <th style={{ padding: '0.65rem 1rem', color: 'var(--google-blue)', fontWeight: 800, textAlign: 'center' }}>Rubric Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}><strong>1. Strategic Alignment</strong><span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Funnel Lighthouse priority</span></td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{activeLighthouse}</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 950, color: getGrade(businessAlignmentScore).c }}>{getGrade(businessAlignmentScore).g}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}><strong>2. Executive Sponsorship</strong><span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Active sponsor & resources locked</span></td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{execSponsor}</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 950, color: getGrade(businessSponsorScore).c }}>{getGrade(businessSponsorScore).g}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}><strong>3. P&L Measurable Impact</strong><span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Potential commercial ROI value</span></td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{pandLImpact}</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 950, color: getGrade(businessROI).c }}>{getGrade(businessROI).g}</td>
                  </tr>
                  <tr style={{ borderBottom: '1.5px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}><strong>4. GPTeal2 Adoption Path</strong><span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Target corporate user route</span></td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{userAdoptionPath}</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 950, color: getGrade(businessAdoption).c }}>{getGrade(businessAdoption).g}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}><strong>5. Data Readiness</strong><span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Staging indices in BigQuery/Cloud storage</span></td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{dataReadiness}</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 950, color: getGrade(techDataScore).c }}>{getGrade(techDataScore).g}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}><strong>6. Agentic Readiness</strong><span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Application ready for Vertex grounding</span></td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{agenticReadiness}</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 950, color: getGrade(techAgenticScore).c }}>{getGrade(techAgenticScore).g}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}><strong>7. GxP Compliance Security</strong><span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Regulatory data sovereignty</span></td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{isSensitiveGxP === 'Yes' ? 'GxP Active' : 'Standard'}</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 950, color: getGrade(techCompliance).c }}>{getGrade(techCompliance).g}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.65rem 1rem' }}><strong>8. Technical Scoping Path</strong><span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Stack selection penalty audit</span></td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{techPathSelected} ({aiStack})</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 950, color: getGrade(techPathScore).c }}>{getGrade(techPathScore).g}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Compile FDE request button */}
            <button 
              type="button"
              onClick={handleCompileFdeJustification}
              disabled={isCompilingReport}
              className="btn btn-primary card-glow-accent"
              style={{
                width: '100%',
                padding: '0.65rem',
                fontSize: '0.8rem',
                fontWeight: 800,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                background: 'linear-gradient(135deg, #1a73e8 0%, #a855f7 100%)',
                border: 'none',
                boxShadow: '0 4px 14px rgba(168,85,247,0.3)',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={14} className={isCompilingReport ? "spin-animation" : ""} style={{ color: 'var(--google-amber)' }} />
              <span>{isCompilingReport ? "Aggregating Steering Logic..." : "⚡ Compile FDE Headcount Justification Dossier"}</span>
            </button>

          </div>

        </div>
      )}

      {/* 3 • EXECUTION PLAN & MILESTONES VIEW (Equipped with visual phase sub-tabs!) */}
      {subTab === 'execution' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', paddingRight: '0.25rem' }}>
          
          {/* Header and Stage Selector Ribbon Track */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.45rem', flexShrink: 0 }}>
            <div>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block', fontWeight: 850 }}>Enterprise Agent Execution Lifecycle</strong>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>4-Phase progressive resourcing milestones:</span>
            </div>

            {/* VISUAL STAGE SELECTOR SUB-TAB TRACK */}
            <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.15rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              {[
                { key: 'build', label: '1. BUILD (Active Stage)', icon: <Milestone size={12} />, activeColor: 'var(--google-blue)' },
                { key: 'scale', label: '2. SCALE', icon: <TrendingUp size={12} />, activeColor: 'var(--google-purple)' },
                { key: 'govern', label: '3. GOVERN', icon: <Shield size={12} />, activeColor: 'var(--google-amber)' },
                { key: 'optimize', label: '4. OPTIMIZE', icon: <Zap size={12} />, activeColor: 'var(--google-green)' }
              ].map(stage => {
                const isAct = activeExecutionStage === stage.key;
                return (
                  <button
                    key={stage.key}
                    onClick={() => setActiveExecutionStage(stage.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      fontSize: '0.68rem',
                      fontWeight: isAct ? 800 : 600,
                      borderRadius: '6px',
                      background: isAct ? stage.activeColor : 'transparent',
                      color: isAct ? '#ffffff' : 'var(--text-secondary)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {stage.icon}
                    <span>{stage.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Highly Visual, Widescreen 2-Column Phase Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '0.85rem', flex: 1 }}>
            
            {/* Left Column: Entry & Exit Criteria */}
            <div className="card card-glow-accent" style={{ padding: '0.85rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              <div>
                <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--google-blue)', fontWeight: 900, letterSpacing: '1.2px' }}>Progressive Scoping</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', marginTop: '0.15rem', textTransform: 'uppercase' }}>
                  {activeExecutionStage} Stage
                </strong>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem' }}>
                
                {/* Entry Criteria Checklist */}
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--google-green)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.35rem' }}>
                    <CheckCircle size={12} />
                    <span>Entry Criteria Checklist:</span>
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-primary)', paddingLeft: '0.25rem' }}>
                    {activeExecutionStage === 'build' && (
                      <>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✓ <span>Defined Use Case ({activeLighthouse})</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✓ <span>Locked Executive Sponsor ({execSponsor})</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✓ <span>P&L ROI Feasibility Verified ({pandLImpact})</span></div>
                      </>
                    )}
                    {activeExecutionStage === 'scale' && (
                      <>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>→ <span>MVP Functional Validation Phase 1</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>→ <span>Provisioned Agent Staging Runtime</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>→ <span>Security Requirements Audited</span></div>
                      </>
                    )}
                    {activeExecutionStage === 'govern' && (
                      <>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>→ <span>Scale-Ready Architecture Egress checks</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>→ <span>GxP / FDA Compliance protocol ({isSensitiveGxP})</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>→ <span>Approved Steerboard Autonomous Policies</span></div>
                      </>
                    )}
                    {activeExecutionStage === 'optimize' && (
                      <>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>→ <span>Live Customer Traffic Egress Active</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>→ <span>Hallucination & Latency baseline logs</span></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Exit Criteria Checklist */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.55rem', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--google-blue)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.35rem' }}>
                    <ArrowRight size={12} />
                    <span>Target Exit Criteria Gates:</span>
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-primary)', paddingLeft: '0.25rem' }}>
                    {activeExecutionStage === 'build' && (
                      <>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Functional MVP Release Handover</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Verified APIs & Grounding index</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Baseline prompt engineering golden file</span></div>
                      </>
                    )}
                    {activeExecutionStage === 'scale' && (
                      <>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Sandbox Staging Environment Release</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Enterprise Memory Store Active</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Load Testing & Latency thresholds met</span></div>
                      </>
                    )}
                    {activeExecutionStage === 'govern' && (
                      <>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Model Armor Egress locks active</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Enterprise Registry formal entry</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Immutable audit logging pipeline locked</span></div>
                      </>
                    )}
                    {activeExecutionStage === 'optimize' && (
                      <>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>30/60/90 performance analysis signed</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Optimize prompt feedback loops locked</span></div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>✦ <span>Simulation tools handover to Merck Ops</span></div>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Clickable Milestone Task Checklists */}
            <div className="card" style={{ padding: '0.85rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div>
                <strong style={{ fontSize: '0.82rem', color: 'var(--google-blue)', display: 'block', fontWeight: 850 }}>Google & Merck Joint Engineering Handover Checklist</strong>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>Click task nodes to mark milestones completed in live steering meeting:</span>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', paddingRight: '0.15rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.55rem' }}>
                {activeExecutionStage === 'build' && [
                  { id: 'build_1', text: 'Establish golden prompt benchmark test dataset (50+ prompts)' },
                  { id: 'build_2', text: `Configure dedicated project tenant using target: "${cloudInfra}"` },
                  { id: 'build_3', text: `Deploy GCP DLP inline masking filters matching compliance: "${isSensitiveGxP === 'Yes' ? 'GxP Regulatory' : 'Standard'}"` },
                  { id: 'build_4', text: `Route private staging connections targeting data indices: "${dataReadiness}"` }
                ].map(task => {
                  const isComp = completedTasks[task.id];
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        display: 'flex',
                        gap: '0.55rem',
                        alignItems: 'center',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        background: isComp ? 'rgba(52,168,83,0.08)' : 'var(--bg-surface)',
                        border: `1px solid ${isComp ? 'var(--google-green)' : 'var(--border-color)'}`,
                        color: isComp ? 'var(--google-green)' : 'var(--text-secondary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isComp ? <CheckSquare size={15} style={{ color: 'var(--google-green)', flexShrink: 0 }} /> : <Square size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />}
                      <span style={{ textDecoration: isComp ? 'line-through' : 'none', flex: 1 }}>{task.text}</span>
                    </button>
                  );
                })}

                {activeExecutionStage === 'scale' && [
                  { id: 'scale_1', text: 'Deploy MVP code build into dedicated staging Google Kubernetes Engine' },
                  { id: 'scale_2', text: `Provision enterprise agent routing interfaces via: "${agenticReadiness}"` },
                  { id: 'scale_3', text: 'Execute automated load testing (simulate 500+ concurrent RAG queries)' },
                  { id: 'scale_4', text: 'Verify sub-second latency targets across model inference layers' }
                ].map(task => {
                  const isComp = completedTasks[task.id];
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        display: 'flex',
                        gap: '0.55rem',
                        alignItems: 'center',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        background: isComp ? 'rgba(168,85,247,0.08)' : 'var(--bg-surface)',
                        border: `1px solid ${isComp ? 'var(--google-purple)' : 'var(--border-color)'}`,
                        color: isComp ? 'var(--google-purple)' : 'var(--text-secondary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isComp ? <CheckSquare size={15} style={{ color: 'var(--google-purple)', flexShrink: 0 }} /> : <Square size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />}
                      <span style={{ textDecoration: isComp ? 'line-through' : 'none', flex: 1 }}>{task.text}</span>
                    </button>
                  );
                })}

                {activeExecutionStage === 'govern' && [
                  { id: 'govern_1', text: `Lock Vertex AI model endpoints inside secure: "${hasVpcSC === 'Yes' ? 'VPC Service Controls (VPC-SC)' : 'GCP Service Account IAM'}"` },
                  { id: 'govern_2', text: 'Establish centralized model execution registry entries for audit trails' },
                  { id: 'govern_3', text: 'Publish immutable Cloud Logging profiles to tracking storage buckets' },
                  { id: 'govern_4', text: 'Obtain compliance sign-offs from Merck Information Security steerboard' }
                ].map(task => {
                  const isComp = completedTasks[task.id];
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        display: 'flex',
                        gap: '0.55rem',
                        alignItems: 'center',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        background: isComp ? 'rgba(244,180,0,0.08)' : 'var(--bg-surface)',
                        border: `1px solid ${isComp ? 'var(--google-amber)' : 'var(--border-color)'}`,
                        color: isComp ? 'var(--google-amber)' : 'var(--text-secondary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isComp ? <CheckSquare size={15} style={{ color: 'var(--google-amber)', flexShrink: 0 }} /> : <Square size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />}
                      <span style={{ textDecoration: isComp ? 'line-through' : 'none', flex: 1 }}>{task.text}</span>
                    </button>
                  );
                })}

                {activeExecutionStage === 'optimize' && [
                  { id: 'optimize_1', text: 'Transition 100% production workflow traffic to Vertex active API perimeters' },
                  { id: 'optimize_2', text: 'Review 30-day latency and prompt token billing metrics' },
                  { id: 'optimize_3', text: 'Tune hallucination thresholds and temperature targets in production' },
                  { id: 'optimize_4', text: 'Deliver comprehensive operations handover guides to Merck GSF team' }
                ].map(task => {
                  const isComp = completedTasks[task.id];
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        display: 'flex',
                        gap: '0.55rem',
                        alignItems: 'center',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        background: isComp ? 'rgba(52,168,83,0.08)' : 'var(--bg-surface)',
                        border: `1px solid ${isComp ? 'var(--google-green)' : 'var(--border-color)'}`,
                        color: isComp ? 'var(--google-green)' : 'var(--text-secondary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isComp ? <CheckSquare size={15} style={{ color: 'var(--google-green)', flexShrink: 0 }} /> : <Square size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />}
                      <span style={{ textDecoration: isComp ? 'line-through' : 'none', flex: 1 }}>{task.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 📊 GORGEOUS GLASSMORPHIC FDE JUSTIFICATION DOSSIER OVERLAY */}
      {showReportModal && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(12px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            boxSizing: 'border-box'
          }}
          className="no-print"
        >
          <div 
            className="card card-glow-accent" 
            style={{
              width: '100%',
              maxWidth: '750px',
              height: '100%',
              maxHeight: '520px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-lg)',
              gap: '0.85rem'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.45rem' }}>
              <div>
                <strong style={{ fontSize: '1.15rem', color: 'var(--text-primary)', display: 'block', fontWeight: 850 }}>
                  FDE Resourcing Steering Justification Dossier
                </strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  Formal headcount resourcing request scoped dynamically for Merck & Google Cloud joint board
                </span>
              </div>
              <button 
                type="button" 
                onClick={() => setShowReportModal(false)} 
                className="btn btn-secondary" 
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem', borderRadius: '6px' }}
              >
                Close [X]
              </button>
            </div>

            {/* Report Content */}
            <div 
              style={{ 
                flex: 1, 
                overflowY: 'auto', 
                fontSize: '0.8rem', 
                color: 'var(--text-primary)', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                padding: '1rem', 
                borderRadius: '10px', 
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap'
              }}
            >
              {justificationReport}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.55rem' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Shield size={12} style={{ color: 'var(--google-green)' }} />
                <span>Sovereign Vertex AI Scoping Active</span>
              </span>
              <div style={{ display: 'flex', gap: '0.55rem' }}>
                <button 
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(justificationReport);
                    alert("📋 Dossier copied to clipboard! Ready to paste inside Google resourcing portals.");
                  }}
                  className="btn btn-primary" 
                  style={{ padding: '0.45rem 1rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: '6px' }}
                >
                  Copy Dossier to Clipboard
                </button>
                <button 
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-secondary" 
                  style={{ padding: '0.45rem 1rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: '6px' }}
                >
                  Print Report 🖨️
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
