import { useState } from 'react';
import { Play, Sparkles, FolderClock, BookOpen, Target, Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AssessmentLanding({
  framework = 'option5',
  onStart,
  onTrySample,
  onOpenSaved,
  savedCount = 0
}) {
  const contentMap = {
    option5: {
      title: "ML Capability & MLOps Maturity Assessor (v5)",
      subtitle: "Evaluate your enterprise machine learning engineering depth, continuous evaluation rigor, and deployment readiness.",
      whatIs: "A consultative diagnostic framework measuring organizational capability maturity across 25 granular technical and strategic dimensions. Grounded in Google DeepMind and Cloud MLOps best practices.",
      targetUser: "Chief Technology Officers, Lead Cloud Architects, Head of MLOps, and Enterprise AI Platform Engineering Leads.",
      whenUsed: "During initial customer discovery, platform modernization planning, or before migrating non-standard legacy ML pipelines to managed GCP cloud infrastructure.",
      benefits: "Identifies exact technical bottlenecks, establishes clear labor hours reduction benchmarks, and provides actionable remediation steps to achieve Level-5 autonomous AI maturity.",
      posture: "Strengthens enterprise compliance by auditing model weight versioning, continuous evaluation regression test coverage, and automated deployment pipelines."
    },
    option6: {
      title: "Financial ROI & Unit Economics Scoping Assessor (v6)",
      subtitle: "Quantify hard commercial revenue generation, token compute TCO, and enterprise payback runways.",
      whatIs: "An interactive unit-economics and financial modeling closing cockpit. Replaces subjective capability scores with hard empirical financial telemetry and volumetric scaling curves.",
      targetUser: "Chief Financial Officers, Commercial P&L Owners, C-Suite Executive Sponsors, and Cloud Procurement Evaluators.",
      whenUsed: "When presenting hard financial justification to corporate investment committees or securing capital expenditure runway for multimodal AI scaling.",
      benefits: "Demonstrates exact payback milestones, models 50%+ compute savings via Multimodal Context Caching, and provides rigorous defense against budget objections.",
      posture: "Mitigates financial risk exposure by modeling token consumption boundaries, caching hit ratios, and hard infrastructure licensing costs."
    },
    option7: {
      title: "Agentic AI Discovery & Introspection Scanner (v7)",
      subtitle: "Autonomous code porting, database catalog indexing, and agentless OpenAPI spec validation.",
      whatIs: "A state-of-the-art agentic diagnostic engine that parses external SQL DDLs, Python orchestration scripts, and OpenAPI Swagger specs to assess automated migration compatibility.",
      targetUser: "Lead Migration Engineers, Database Administrators, Enterprise Integration Architects, and AI Field Development Engineers (FDEs).",
      whenUsed: "Before executing massive code refactoring, translating legacy Teradata/Oracle SQL queries to BigQuery, or porting monolithic Langchain wrappers to the native Gemini SDK.",
      benefits: "Cuts manual code translation time by 80%, generates immediate prompt-compatibility diffs, and establishes automated zero-ETL data tunneling.",
      posture: "Enhances application security by verifying immutable audit trailing across prompt executions and ensuring zero un-sanitized token persistence."
    },
    option8: {
      title: "Enterprise Feasibility & Multi-Cloud Assessment (v8)",
      subtitle: "Validate production feasibility across Strategic Alignment, Data Lakes, Latency SLAs, Security, and TCO.",
      whatIs: "A holistic 5-Pillar executive evaluation suite designed to validate complex multi-cloud generative AI workloads for production readiness.",
      targetUser: "Chief Information Security Officers (CISOs), Enterprise Infosec Evaluators, Vice Presidents of Engineering, and Google Cloud Field SA Partners.",
      whenUsed: "As the ultimate gatekeeper prior to deploying regulated enterprise AI applications into sovereign healthcare and biopharma production perimeters.",
      benefits: "Delivers a fully normalized executive fit score (0-100), populates automated GxP audit blocks, and generates a concrete 3-week joint delivery playbook.",
      posture: "Enforces zero regulatory compromise through automated checks for inline Cloud DLP token masking, VPC Service Controls perimeters, and Cloud KMS CMEK key rotation."
    },
    option9: {
      title: "Premium Executive Closing Cockpit (v9)",
      subtitle: "The ultimate 5-in-1 executive boardroom closing dashboard combining high-fidelity graphics with rigorous multi-cloud rigor.",
      whatIs: "An ultra-premium executive closing dossier that synthesizes real-time Vertex AI streaming analytics, interactive component dials, and two-way offline spreadsheet synchronization.",
      targetUser: "C-Suite Board Members, Executive Leadership Teams, Managing Directors, and Strategic Google Account Executives.",
      whenUsed: "During high-stakes boardroom executive briefings, biopharma customer intake presentations, and multi-million dollar platform vendor selections.",
      benefits: "Wows executive stakeholders with stunning visual glassmorphism design, ensures seamless two-way offline Excel interoperability, and closes enterprise deals with undeniable clarity.",
      posture: "Elevates corporate infosec posture by embedding verifiable proof of FDA 21 CFR Part 11 lineage logging, sovereign EU regional isolation, and hardware key access justifications."
    },
    intake: {
      title: "Enterprise AI Discovery & Scoping Intake",
      subtitle: "Capture customer requirements, current data stacks, strategic sponsorship, and timeline urgency.",
      whatIs: "A structured discovery questionnaire designed to intake enterprise generative AI opportunities, audit technical prerequisites, and establish initial delivery scoping.",
      targetUser: "Customer Engineers, Solution Architects, Field AI Consultants, and Lead Discovery Managers.",
      whenUsed: "During the first discovery meeting with new prospective customers or when initiating scoping for a newly identified generative AI business opportunity.",
      benefits: "Standardizes customer qualification, provides architectural grounding context, and automatically feeds down-stream multi-agent scoring evaluations.",
      posture: "Verifies compliance perimeters early by logging HIPAA/GDPR constraints, current cloud sovereignty needs, and required CMEK encryption boundaries."
    },
    option11: {
      title: "Agentic AI & Multi-Agent Maturity Assessor (v11)",
      subtitle: "Measure multi-agent orchestration reliability, planning reasoning loops, and state machine persistence.",
      whatIs: "A comprehensive technical diagnostic assessing agentic capabilities, loop safety, back-off recoverability, and multi-agent teamwork patterns. Grounded in advanced cognitive reasoning architectures.",
      targetUser: "Chief AI Officers, Principal Agentic Architects, Lead Systems Integrators, and Cognitive Software Engineers.",
      whenUsed: "Prior to launching production-grade autonomous agent clusters, multi-agent orchestrations, or complex stateful LangGraph/Semantic Kernel reasoning loops.",
      benefits: "Identifies loop starvation risks, optimizes token consumption per agent execution, and establishes robust guardrails for agentic self-repair and tool execution.",
      posture: "Strengthens autonomous compliance by validating tool-use permissions, sandboxing agent executions, and enforcing strict human-in-the-loop (HITL) overrides."
    },
    option12: {
      title: "Enterprise Readiness & GxP Compliance Scoping Assessor (v12)",
      subtitle: "Audit biopharma enterprise readiness, FDA 21 CFR Part 11 validation, and sovereign network isolation.",
      whatIs: "The ultimate enterprise readiness scoping suite built for highly regulated perimeters. Evaluates zero-trust data ingestion pipelines, cryptographically signed audit ledgers, and secure Vertex AI sovereign environments.",
      targetUser: "Vice Presidents of Clinical Quality, Lead Regulatory Officers, Cloud Security Directors, and Merck-Novartis Engagement Partners.",
      whenUsed: "Prior to executing GxP compliance reviews, submitting regulatory dossiers, or launching validated clinical co-pilots in sovereign enterprise zones.",
      benefits: "Guarantees 100% complete audit attestation, eliminates manual compliance verification overhead by 90%, and provides a clear 4-week validation roadmap.",
      posture: "Secures regulated pipelines through immutable audit logs, strict role-based access control (RBAC), and hardware key cryptographic signing."
    }

  };

  const meta = contentMap[framework] || contentMap.option5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Premium Header Action Suite */}
      <div 
        className="card no-print" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '20px', 
          padding: '1.75rem 2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem' 
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-purple" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
                {framework.toUpperCase()} Portal Landing
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Autonomous Enterprise Standard</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>
              {meta.title}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.45rem', maxWidth: '800px' }}>
              {meta.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={onStart}
              className="btn btn-primary"
              style={{ background: 'linear-gradient(90deg, #1a73e8 0%, #3b82f6 100%)', padding: '0.75rem 1.4rem', fontWeight: 800, fontSize: '0.9rem', borderRadius: '10px', boxShadow: '0 8px 24px rgba(26,115,232,0.3)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <Play size={18} />
              <span>Start an Assessment</span>
            </button>

            <button 
              onClick={onTrySample}
              className="btn btn-outline"
              style={{ borderColor: 'var(--google-purple)', color: 'var(--google-purple)', background: 'rgba(168, 85, 247, 0.06)', padding: '0.75rem 1.2rem', fontWeight: 750, fontSize: '0.9rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <Sparkles size={18} />
              <span>Try Sample (Prefilled Inputs)</span>
            </button>

            <button 
              onClick={onOpenSaved}
              className="btn btn-outline"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--bg-surface)', padding: '0.75rem 1.2rem', fontWeight: 750, fontSize: '0.9rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <FolderClock size={18} style={{ color: 'var(--google-blue)' }} />
              <span>Saved Assessments ({savedCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Premium Informational Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        
        {/* What This Assessment Is */}
        <div className="card" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', padding: '1.75rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s ease', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(26,115,232,0.1)', color: 'var(--google-blue)', padding: '0.6rem', borderRadius: '10px' }}>
              <BookOpen size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>What This Assessment Is</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {meta.whatIs}
          </p>
        </div>

        {/* Who The Target User Is */}
        <div className="card" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', padding: '1.75rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s ease', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(168,85,247,0.1)', color: 'var(--google-purple)', padding: '0.6rem', borderRadius: '10px' }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Who The Target User Is</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {meta.targetUser}
          </p>
        </div>

        {/* When This Can Be Used */}
        <div className="card" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', padding: '1.75rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s ease', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--google-amber)', padding: '0.6rem', borderRadius: '10px' }}>
              <Clock size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>When This Can Be Used</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {meta.whenUsed}
          </p>
        </div>

        {/* What Will Be The Benefits */}
        <div className="card" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', padding: '1.75rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s ease', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--google-green)', padding: '0.6rem', borderRadius: '10px' }}>
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>What Will Be The Benefits</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {meta.benefits}
          </p>
        </div>

        {/* How It Improves Customers Posture */}
        <div className="card" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', padding: '1.75rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.2s ease', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--google-red)', padding: '0.6rem', borderRadius: '10px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>How It Improves Customer Posture</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {meta.posture}
          </p>
        </div>

      </div>

      {/* Quick Launch Bottom Banner */}
      <div 
        className="card" 
        style={{ 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '16px', 
          padding: '1.5rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem' 
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Ready to launch your enterprise discovery?</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Experience zero data stubbing and real-time Google Cloud MLOps telemetry.</p>
        </div>
        <button 
          onClick={onStart} 
          className="btn btn-primary" 
          style={{ background: 'var(--text-primary)', color: 'var(--bg-surface)', padding: '0.65rem 1.4rem', border: 'none', borderRadius: '8px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <span>Begin Assessment Session</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}
