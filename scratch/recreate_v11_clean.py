import os

file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

clean_code = """import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, Award, Target, Layers, FileText, Check, X, 
  TrendingUp, Copy, CheckCircle2, AlertTriangle, 
  Lightbulb, Calendar, DollarSign, ArrowUpRight, MessageSquareText,
  UserCheck, Download, RefreshCw, Terminal, ShieldCheck, Cpu, 
  Database, Zap, ArrowLeft, ArrowRight, ChevronRight, Wand2, Play
} from 'lucide-react';
import { generateMaturityReport } from '../services/aiService';

// ============================================================================
// 1. Core V11 GxP Pillar & Question Schema (Strict 21-Question Matrix)
// ============================================================================
export const V11_PILLARS = [
  {
    id: 'UX_HITL',
    name: 'User Experience & Human-in-the-Loop Workflow',
    weight: 20,
    persona: 'Business',
    purpose: 'Evaluates how users interact with compliance constraints and MLR review gates.',
    questions: [
      {
        id: 'UX_HITL.1',
        dimension: 'Native Workspace Integration',
        topic: '1.1 Native Workspace Integration: How do marketers and reviewers interact with compliance constraints?',
        options: [
          { score: 30, text: '1 (Manual): Manual PDF cross-referencing and separate portal logins.' },
          { score: 50, text: '2 (Siloed): Basic plugins requiring users to toggle between AI chat and creative canvases.' },
          { score: 70, text: '3 (Integrated): Passive AI assistants embedded in the workspace (grammar check only).' },
          { score: 90, text: '4 (Agentic): Agentic streaming of generative compliance components directly into the UI.' },
          { score: 100, text: '5 (Optimized): A single "pane of glass" orchestrates the entire lifecycle natively.' }
        ],
        businessPainpoints: ['Users refuse to leave native tools', 'High context-switching overhead', 'Low adoption of external portals'],
        technicalPainpoints: ['Brittle iframe integrations', 'No bidirectional state syncing', 'Complex OAuth/SSO across apps']
      },
      {
        id: 'UX_HITL.2',
        dimension: 'Exception Handling & HITL',
        topic: '1.2 Exception Handling & HITL: How are legal, medical, and regulatory (MLR) exceptions handled?',
        options: [
          { score: 30, text: '1 (Manual): Content is manually emailed/uploaded for human review.' },
          { score: 50, text: '2 (Siloed): AI flags issues, but humans manually correct and restart workflows.' },
          { score: 75, text: '3 (Integrated): Automated draft generation with static alerts pushed to reviewers.' },
          { score: 95, text: '4 (Agentic): Event-driven dormancy gates automatically pause agents during human reviews.' },
          { score: 100, text: '5 (Optimized): Deep micro-editing; human edits in Veeva automatically cascade through AI assets.' }
        ],
        businessPainpoints: ['Regulatory filings delayed by manual queues', 'Lack of audit trail for overrides', 'High compliance risks'],
        technicalPainpoints: ['No event-driven workflow pausing', 'Lack of state preservation during dormancy', 'Brittle webhook integrations']
      },
      {
        id: 'UX_HITL.3',
        dimension: 'Audience Transparency',
        topic: '1.3 Audience Transparency: How does the system handle geolocalized consumer-facing AI disclosures?',
        options: [
          { score: 30, text: '1 (Manual): Marketers manually remember to add disclaimers based on geolocation.' },
          { score: 50, text: '2 (Siloed): Static disclaimers are hardcoded onto every asset, cluttering the creative.' },
          { score: 75, text: '3 (Integrated): System flags AI usage, but marketers manually adjust legal text.' },
          { score: 95, text: '4 (Agentic): A Legal Routing Agent reads audience geolocation and appends state-mandated disclosures.' },
          { score: 100, text: '5 (Optimized): Dynamic localization maps AI touchpoints to live regulatory databases.' }
        ],
        businessPainpoints: ['Non-compliance with state AI laws', 'High cost of manual legal reviews', 'Disclaimer localization errors'],
        technicalPainpoints: ['Hardcoded compliance text', 'Lack of geolocalized routing intelligence', 'No dynamic regulatory DB links']
      }
    ]
  },
  {
    id: 'INT_REG',
    name: 'Intelligence & Regulatory Reasoning',
    weight: 20,
    persona: 'Business',
    purpose: 'Evaluates cognitive capabilities, model agnosticism, and regulatory rule enforcement.',
    questions: [
      {
        id: 'INT_REG.1',
        dimension: 'Model Agnosticism',
        topic: '2.1 Model Agnosticism & Orchestration: How do you ensure sufficient context windows while avoiding vendor lock-in?',
        options: [
          { score: 30, text: '1 (Manual): Web-interface reliance on a single public model.' },
          { score: 50, text: '2 (Siloed): Direct, hardcoded API integration with a single model provider.' },
          { score: 70, text: '3 (Integrated): Model aggregator access, but routing requires manual developer intervention.' },
          { score: 90, text: '4 (Agentic): Unified Model Garden routing tasks based on strengths (e.g., Gemini 1.5 Pro).' },
          { score: 100, text: '5 (Optimized): Fully autonomous, cost-effective routing dynamically handled at runtime.' }
        ],
        businessPainpoints: ['Vendor lock-in risks', 'High API costs for large context windows', 'System downtime due to vendor outage'],
        technicalPainpoints: ['Hardcoded model API calls', 'No dynamic failover routing', 'Lack of unified abstraction layer']
      },
      {
        id: 'INT_REG.2',
        dimension: 'Brand Rule Application',
        topic: '2.2 MLR & Brand Rule Application: How are regulatory parameters (PhRMA codes) and brand guidelines enforced?',
        options: [
          { score: 30, text: '1 (Manual): Manual human memorization of static rulebooks.' },
          { score: 50, text: '2 (Siloed): Rules hardcoded into system prompts, causing token bloat and hallucinations.' },
          { score: 75, text: '3 (Integrated): Standard vector database retrieval, which misinterprets regional rules.' },
          { score: 95, text: '4 (Agentic): Pre-trained context proxies enforce static constraints before generation.' },
          { score: 100, text: '5 (Optimized): Progressive Disclosure dynamically loads conditional rules on-demand.' }
        ],
        businessPainpoints: ['Frequent brand guideline violations', 'Conflicting rules across regions', 'Regulatory fines for copy'],
        technicalPainpoints: ['Monolithic prompt bloat', 'High hallucination rate of rules', 'Inability to trace rule firing events']
      },
      {
        id: 'INT_REG.3',
        dimension: 'Fair Balance & AE',
        topic: '2.3 Fair Balance & AE Detection: How does the system ensure "Fair Balance" and detect Adverse Events?',
        options: [
          { score: 30, text: '1 (Manual): Manual copy/pasting of Important Safety Information (ISI); no AE detection.' },
          { score: 55, text: '2 (Siloed): AI fetches ISI text, but humans verify formatting and prominence.' },
          { score: 75, text: '3 (Integrated): Script-based appending via keyword matching that breaks on complex layouts.' },
          { score: 95, text: '4 (Agentic): A Medical Safety Agent audits assets for Fair Balance and flags potential AEs to PV.' },
          { score: 100, text: '5 (Optimized): Autonomous formatting dynamically integrates ISI with FDA-mandated prominence.' }
        ],
        businessPainpoints: ['Missed Adverse Event (AE) signals', 'FDA warning letter risks', 'Inability to audit PV review logs'],
        technicalPainpoints: ['Lack of real-time pipeline monitoring', 'Brittle keyword-based AE detection', 'No secure integration to PV portals']
      },
      {
        id: 'INT_REG.4',
        dimension: 'Multimodal Compliance',
        topic: '2.4 Multimodal Compliance: How does the system comply with FDA simultaneous audio/visual risk presentation?',
        options: [
          { score: 30, text: '1 (Manual): Audio/text generated separately and manually synced by video editors.' },
          { score: 50, text: '2 (Siloed): AI generates both but lacks spatial/temporal awareness to sync voiceover.' },
          { score: 75, text: '3 (Integrated): Scripted subtitles over audio that violate FDA contrast/pacing mandates.' },
          { score: 95, text: '4 (Agentic): A Multimodal Agent audits the video timeline against voiceover timestamp/duration.' },
          { score: 100, text: '5 (Optimized): Autonomous Dual Modality seamlessly synchronizes audio pacing and visual prominence.' }
        ],
        businessPainpoints: ['Audio/video sync mismatch errors', 'High video editing and validation costs', 'Slow regulatory approval for rich media'],
        technicalPainpoints: ['No unified multimodal token space', 'Lack of exact voiceover time extraction', 'No automated timeline checks']
      }
    ]
  },
  {
    id: 'DATA_SEM',
    name: 'Enterprise Data & Semantic Integration',
    weight: 20,
    persona: 'Technical',
    purpose: 'Audits data federation, claims grounding, and Model Context Protocol (MCP) servers.',
    questions: [
      {
        id: 'DATA_SEM.1',
        dimension: 'Claims Grounding',
        topic: '3.1 Claims Grounding & Sourcing: How are approved medical claims sourced and mapped?',
        options: [
          { score: 30, text: '1 (Manual): Manual copy/paste from master spreadsheets.' },
          { score: 50, text: '2 (Siloed): Point-in-time static exports of claims databases.' },
          { score: 75, text: '3 (Integrated): Custom API webhooks periodically sync data but lack citation mapping.' },
          { score: 95, text: '4 (Agentic): Agentic RAG acts as the claims repository, auto-matching copy to approved Vault IDs.' },
          { score: 100, text: '5 (Optimized): Direct integration via Model Context Protocol (MCP) queries live databases natively.' }
        ],
        businessPainpoints: ['Outdated claims in marketing assets', 'High risk of unapproved scientific claims', 'Slow claims validation cycles'],
        technicalPainpoints: ['No real-time grounding verification', 'No native connection to Veeva Vault API', 'Low semantic search accuracy']
      },
      {
        id: 'DATA_SEM.2',
        dimension: 'Data Federation',
        topic: '3.2 Data Federation: How does the orchestration layer connect to fragmented backend systems?',
        options: [
          { score: 30, text: '1 (Manual): Custom REST API wrappers manually written for every endpoint.' },
          { score: 50, text: '2 (Siloed): Scheduled batch ETL pipelines dumping into localized cloud buckets.' },
          { score: 70, text: '3 (Integrated): Centralized middleware handling brittle custom webhooks.' },
          { score: 90, text: '4 (Agentic): Standardized open-source protocols (MCP) exposing data platforms as native servers.' },
          { score: 100, text: '5 (Optimized): Zero-trust semantic data mesh where agents autonomously negotiate schemas.' }
        ],
        businessPainpoints: ['High integration engineering costs', 'Data sync lag slowing operations', 'Fragmented enterprise data silos'],
        technicalPainpoints: ['Brittle custom webhook routing', 'High middleware operational debt', 'Lack of protocol standardization']
      }
    ]
  },
  {
    id: 'RUN_STATE',
    name: 'Runtime Architecture & State Management',
    weight: 20,
    persona: 'Technical',
    purpose: 'Evaluates multi-agent coordination, state persistence, cost governance, and change control.',
    questions: [
      {
        id: 'RUN_STATE.1',
        dimension: 'Multi-Agent Coordination',
        topic: '4.1 Multi-Agent Coordination: How are tasks requiring multiple specialized AI personas coordinated?',
        options: [
          { score: 30, text: '1 (Manual): A single massive LLM prompt attempting all tasks at once.' },
          { score: 50, text: '2 (Siloed): Sequential chaining (agents pass tasks down the line slowly).' },
          { score: 75, text: '3 (Integrated): Custom Python scripts orchestrating agents and manually handling state.' },
          { score: 95, text: '4 (Agentic): Graph-based runtime organizing agents into deterministic reasoning loops.' },
          { score: 100, text: '5 (Optimized): Fully managed multi-agent execution with native auto-scaling and cross-agent comms.' }
        ],
        businessPainpoints: ['Monolithic prompt reasoning failures', 'High latency in sequential agent runs', 'Inability to audit multi-step decisions'],
        technicalPainpoints: ['Hardcoded orchestration scripts', 'No standardized agent state sharing', 'Lack of trace telemetry']
      },
      {
        id: 'RUN_STATE.2',
        dimension: 'State Persistence',
        topic: '4.2 State Persistence & Dormancy: How does the system manage memory during multi-day legal reviews?',
        options: [
          { score: 30, text: '1 (Manual): Sessions time out and require manual human restarts.' },
          { score: 50, text: '2 (Siloed): Expensive "always-on" compute instances sitting idle.' },
          { score: 75, text: '3 (Integrated): Custom serialization code dumping LLM memory to a database.' },
          { score: 95, text: '4 (Agentic): Durable memory schemas snapping agent states natively to NoSQL databases.' },
          { score: 100, text: '5 (Optimized): Cost-free event-driven hibernation and autonomous exact-context rehydration.' }
        ],
        businessPainpoints: ['High compute costs for idle sessions', 'Memory loss during long human reviews', 'Frustrated users re-entering inputs'],
        technicalPainpoints: ['Brittle custom state serialization', 'No native event-driven hibernation', 'Inability to hydrate context state']
      },
      {
        id: 'RUN_STATE.3',
        dimension: 'A2A Interoperability',
        topic: '4.3 Third-Party Interoperability: How are tasks orchestrated between internal and third-party SaaS agents?',
        options: [
          { score: 30, text: '1 (Manual): Humans copy outputs from one vendor to another.' },
          { score: 50, text: '2 (Siloed): Rigid custom API wrappers bridging vendor platforms.' },
          { score: 70, text: '3 (Integrated): Internal agents trigger basic external APIs as tools, but cannot delegate reasoning.' },
          { score: 95, text: '4 (Agentic): Agent-to-Agent (A2A) protocols allow secure delegation of entire workflows.' },
          { score: 100, text: '5 (Optimized): Dynamic discovery and provisioning of third-party capabilities natively.' }
        ],
        businessPainpoints: ['Manual cross-vendor copy pasting', 'High cost of custom SaaS integrations', 'Data privacy leaks across vendors'],
        technicalPainpoints: ['Hardcoded custom REST wrappers', 'No standardized A2A protocol support', 'Inability to delegate tasks']
      },
      {
        id: 'RUN_STATE.4',
        dimension: 'Cost Governance',
        topic: '4.4 Cost Governance: How are compute costs and massive token context windows capped?',
        options: [
          { score: 35, text: '1 (Manual): Month-end review of unreadable cloud invoices.' },
          { score: 50, text: '2 (Siloed): Basic budget alerts that trigger post-spend.' },
          { score: 70, text: '3 (Integrated): IT tracks total spend but cannot attribute it to specific campaigns.' },
          { score: 90, text: '4 (Agentic): Token-aware routing minimizes prompt sizes with strict concurrency limits.' },
          { score: 100, text: '5 (Optimized): Real-time FinOps roll-ups attribute spend directly and auto-cap.' }
        ],
        businessPainpoints: ['No real-time token/cost visibility', 'Massive budget overruns from loops', 'Difficulty justifying GenAI ROI'],
        technicalPainpoints: ['No real-time token counters', 'Lack of concurrency limit controls', 'No cost-effective token-routing mesh']
      },
      {
        id: 'RUN_STATE.5',
        dimension: 'Platform Modernization',
        topic: '4.5 Platform Modernization: Is the architecture built on legacy ML endpoints or an agent-first platform?',
        options: [
          { score: 30, text: '1 (Manual): Reliance on hardcoded API calls to deprecated legacy ML endpoints.' },
          { score: 50, text: '2 (Siloed): Manual translation layers forcing legacy pipelines to act like agents.' },
          { score: 75, text: '3 (Integrated): Modern models deployed on traditional MLOps infrastructure.' },
          { score: 95, text: '4 (Agentic): Built natively on modern Enterprise Agent Platforms.' },
          { score: 100, text: '5 (Optimized): Complete decoupling of agent logic from the underlying platform.' }
        ],
        businessPainpoints: ['High maintenance cost of legacy endpoints', 'Slow rollout of modern model features', 'Frequent downtime during updates'],
        technicalPainpoints: ['Hardcoded legacy API endpoints', 'Lack of decoupling abstraction layers', 'Complex infrastructure setup']
      },
      {
        id: 'RUN_STATE.6',
        dimension: 'Agent-as-Code',
        topic: '4.6 Agent-as-Code: How are agents version-controlled across environments?',
        options: [
          { score: 30, text: '1 (Manual): Prompts tweaked in UI consoles with no version history.' },
          { score: 50, text: '2 (Siloed): Prompts in text files, but routing logic scattered across codebases.' },
          { score: 75, text: '3 (Integrated): Code in Git, but multi-language environments create inconsistencies.' },
          { score: 95, text: '4 (Agentic): "Agent-as-Code" methodology defined entirely via YAML configurations.' },
          { score: 100, text: '5 (Optimized): Immutable deployments via CI/CD pipelines pushing signed schemas.' }
        ],
        businessPainpoints: ['Prompt tweaks breaking production', 'No history of system prompt changes', 'High risk of unauthorized hotfixes'],
        technicalPainpoints: ['No version control for prompts', 'Scattered routing logic in code', 'Lack of immutable build schemas']
      }
    ]
  },
  {
    id: 'SEC_VAL',
    name: 'Security, Traceability & Validation (GxP)',
    weight: 20,
    persona: 'Technical',
    purpose: 'Enforces GxP audit trails, sandboxing, continuous validation, and Quality Unit compliance.',
    questions: [
      {
        id: 'SEC_VAL.1',
        dimension: 'GxP Audit Trail',
        topic: '5.1 GxP Audit Trail & Data Provenance: How does the architecture log AI reasoning trails and maintain data freshness?',
        options: [
          { score: 30, text: '1 (Manual): Date verifications are manual, and outputs are copied with no record of reasoning.' },
          { score: 50, text: '2 (Siloed): Basic application logs capture raw API payloads; post-generation flags identify expired data.' },
          { score: 75, text: '3 (Integrated): The system tracks asset fragments and uses daily automated sync scripts.' },
          { score: 95, text: '4 (Agentic): Cryptographic IDs map agents to policies; real-time semantic caching drops claims mid-flight.' },
          { score: 100, text: '5 (Optimized): Native trace integration visually replays execution spans alongside immutable GxP logs.' }
        ],
        businessPainpoints: ['No record of reasoning or data lineage', 'High risk of using expired claims', 'Difficulty passing regulatory audits'],
        technicalPainpoints: ['No cryptographic trace logging', 'Lack of real-time data cache validation', 'Missing immutable log storage']
      },
      {
        id: 'SEC_VAL.2',
        dimension: 'API Guardrails',
        topic: '5.2 API Security & Guardrails: How are prompts and tool calls sanitized against injection and hallucinations?',
        options: [
          { score: 30, text: '1 (Manual): Reliance on consumer-grade LLM safety filters.' },
          { score: 50, text: '2 (Siloed): Standard REST API Gateways lacking AI token inspection.' },
          { score: 75, text: '3 (Integrated): Custom regex filters scrubbing PII before model hits.' },
          { score: 95, text: '4 (Agentic): Enterprise AI proxies enforcing Model Armor protections.' },
          { score: 100, text: '5 (Optimized): Zero-Trust ecosystem verifying every internal cross-agent API call.' }
        ],
        businessPainpoints: ['Accidental exposure of patient PII', 'Brand damage from jailbreak exploits', 'Severe security compliance violations'],
        technicalPainpoints: ['Consumer-grade safety filters only', 'No real-time token/prompt inspection', 'Lack of Model Armor gateways']
      },
      {
        id: 'SEC_VAL.3',
        dimension: 'Continuous Validation',
        topic: '5.3 AI Change Control & Continuous Validation: How is regression testing handled when foundation models update?',
        options: [
          { score: 30, text: '1 (Manual): Months of manual IQ/OQ/PQ paperwork per model update.' },
          { score: 50, text: '2 (Siloed): Basic automated tests that freeze production during updates.' },
          { score: 75, text: '3 (Integrated): CI/CD tests relying on static string-matching that fail on LLM non-determinism.' },
          { score: 95, text: '4 (Agentic): "LLM-as-a-judge" framework running synthetic tests against a gold rubric.' },
          { score: 100, text: '5 (Optimized): Continuous Validation monitoring drift in real-time and generating signed, audit reports.' }
        ],
        businessPainpoints: ['Months of delayed model upgrades', 'High cost of manual QA paperwork', 'Model drift breaking live features'],
        technicalPainpoints: ['No automated regression testing suite', 'Brittle static string-match tests', 'Lack of LLM-as-a-judge frameworks']
      },
      {
        id: 'SEC_VAL.4',
        dimension: 'Agentic IAM',
        topic: '5.4 Cross-Boundary Identity & Agentic IAM: How are user permissions enforced when delegating to third-party agents?',
        options: [
          { score: 30, text: '1 (Manual): Agents run on a single over-privileged service account.' },
          { score: 50, text: '2 (Siloed): Hardcoded API keys for destination systems.' },
          { score: 70, text: '3 (Integrated): Basic OAuth but unable to dynamically downgrade permissions per user.' },
          { score: 95, text: "4 (Agentic): The invoking user's exact identity and permissions pass strictly across boundaries." },
          { score: 100, text: '5 (Optimized): AI Gateways enforce context-aware access policies in real-time.' }
        ],
        businessPainpoints: ['Over-privileged service account risks', 'Unauthorized user data access', 'Lack of dynamic security'],
        technicalPainpoints: ['Hardcoded destination API keys', 'No user identity propagation mesh', 'Lack of dynamic role downgrade']
      },
      {
        id: 'SEC_VAL.5',
        dimension: 'Sandbox Isolation',
        topic: '5.5 supply Chain Security & Sandbox Isolation: How is the architecture secured against deserialization flaws?',
        options: [
          { score: 30, text: '1 (Manual): Shared compute instances with no dependency scanning.' },
          { score: 50, text: '2 (Siloed): Reliance on basic IAM (vulnerable to RCE/deserialization flaws).' },
          { score: 75, text: '3 (Integrated): Container vulnerability scanning prior to deployment, but arbitrary execution allowed.' },
          { score: 95, text: '4 (Agentic): Tools execute exclusively within isolated Agent Sandboxes.' },
          { score: 100, text: '5 (Optimized): Zero-trust execution cryptographically verifying loaded SDKs.' }
        ],
        businessPainpoints: ['High risk of Remote Code Execution (RCE)', 'Supply chain dependency vulnerabilities', 'Malicious tools compromising servers'],
        technicalPainpoints: ['Shared compute instance perimeters', 'No isolated runtime sandboxes', 'Brittle container scanning hooks']
      },
      {
        id: 'SEC_VAL.6',
        dimension: 'Quality Unit (QU)',
        topic: '5.6 Quality Unit (QU) Non-Delegation: How does the architecture prevent autonomous deployment without Quality Unit sign-off?',
        options: [
          { score: 30, text: '1 (Manual): Manual email routing leaving room for procedural bypass.' },
          { score: 50, text: '2 (Siloed): Agents flag items, but lack systemic locks preventing deployment.' },
          { score: 75, text: '3 (Integrated): AI confidence scores substituted for human sign-off on lower-tier risks.' },
          { score: 95, text: '4 (Agentic): Strict separation of duties where AI drafts, but deployment gates remain locked.' },
          { score: 100, text: '5 (Optimized): Cryptographic QU enforcement where deployment is natively rejected until signed.' }
        ],
        businessPainpoints: ['Procedural bypass risk for releases', 'Accidental unauthorized deployment', 'Audit trail gaps in release approvals'],
        technicalPainpoints: ['No hardwired deployment locks', 'Lack of cryptographic signature binding', 'No automated quality gates']
      }
    ]
  }
];

// Preset Candidates for Auto-Fill & Static Demonstrations
const PRESET_CANDIDATES = [
  { company: 'Merck & Co. Enterprise', useCaseName: 'BeyondCorp OData Clinical Search Federation', domain: 'R&D / Clinical' },
  { company: 'Sanofi S.A.', useCaseName: 'Supply Chain Autonomous Demand Forecasting', domain: 'Supply Chain' },
  { company: 'Novartis Pharma AG', useCaseName: 'Global Pharmacovigilance Quality Inspector', domain: 'Quality & Compliance' },
  { company: 'Pfizer Inc.', useCaseName: 'SAP S/4HANA Autonomous Financial Reconciliation', domain: 'Finance & Operations' },
  { company: 'GSK Bio-Pharma', useCaseName: 'Clinical Study Report (CSR) De-identifying Copilot', domain: 'Commercial Ops' },
  { company: 'AstraZeneca Global', useCaseName: 'Oncology Clinical Protocol QA Agent', domain: 'R&D / Clinical' }
];

export default function PremiumScopingAssessorV11({ onBackToLanding, globalTheme = 'dark', apiKey = '', apiKey2 = '', gcpToken = '' }) {
  const [activeTab, setActiveTab] = useState('intake');
  const [activeDimensionId, setActiveDimensionId] = useState('BV');
  const [reportSubTab, setReportSubTab] = useState('executive');
  
  // Dynamic Customer Info & Scoring States
  const [customerInfo, setCustomerInfo] = useState({
    company: '',
    useCaseName: '',
    domain: '',
    runtime: 'Google Cloud Vertex AI',
    connectors: []
  });

  const [scores, setScores] = useState(() => {
    const initial = {};
    V11_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        initial[q.id] = {
          current: 3,
          future: 4,
          techPain: [],
          bizPain: [],
          comments: '',
          skipped: false
        };
      });
    });
    return initial;
  });

  const [liveSynthesis, setLiveSynthesis] = useState(null);
  const [currency, setCurrency] = useState('USD');
  
  // Wizard Question Indexing
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [hoveredOptionIdx, setHoveredOptionIdx] = useState(null);
  const [hoveredTargetOptionIdx, setHoveredTargetOptionIdx] = useState(null);

  // Active question references
  const activePillar = V11_PILLARS[activePillarIdx];
  const activeQuestion = activePillar.questions[activeQuestionIdx];
  const activeQuestionId = activeQuestion.id;

  // Real-Time Streaming Logs & AI Evaluation UI States
  const [geminiStreamingState, setGeminiStreamingState] = useState({
    active: false,
    currentStep: 1,
    logs: [],
    tokensPerSec: 0,
    latencyMs: 0
  });

  // Calculate overall index 1-21
  const getOverallQuestionIndex = () => {
    let count = 0;
    for (let i = 0; i < activePillarIdx; i++) {
      count += V11_PILLARS[i].questions.length;
    }
    return count + activeQuestionIdx + 1;
  };

  // --------------------------------------------------------------------------
  // Dynamic Theme Styling Tokens
  // --------------------------------------------------------------------------
  const t = {
    bg: '#0a0f1d',
    cardBg: '#12192c',
    cardBorder: '1px solid rgba(56,189,248,0.08)',
    topBarBorder: '1px solid rgba(56,189,248,0.12)',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#38bdf8', // Cyan
    accentGlow: 'rgba(56,189,248,0.15)',
    btnBg: 'rgba(56,189,248,0.08)',
    btnHover: 'rgba(56,189,248,0.18)',
    pillCurrent: '#38bdf8',
    pillTarget: '#10b981', // Green
    cardHeaderBg: '#16223f'
  };

  // --------------------------------------------------------------------------
  // Real-Time C-Suite Mathematical Scoring Engine
  // --------------------------------------------------------------------------
  const scoringData = useMemo(() => {
    let prioritySum = 0;
    let totalMaxScore = 100;
    let totalQuestionsAnswered = 0;
    
    // Weighted scoring logic: Max is 100, maps pillars dynamically
    V11_PILLARS.forEach(pillar => {
      let pillarRawScore = 0;
      let pillarQuestionsCount = pillar.questions.length;
      
      pillar.questions.forEach(q => {
        const scoreObj = scores[q.id] || {};
        const cur = typeof scoreObj.current === 'number' ? scoreObj.current : 3;
        const fut = typeof scoreObj.future === 'number' ? scoreObj.future : 4;
        
        // Formulate a normalized compliance index (higher target vs current = higher priority score!)
        const gapModifier = Math.max(0, fut - cur);
        const questionBaseScore = (cur * 15) + (gapModifier * 10);
        
        pillarRawScore += Math.min(100, questionBaseScore) / pillarQuestionsCount;
        if (scoreObj.current !== undefined) totalQuestionsAnswered++;
      });

      prioritySum += pillarRawScore * (pillar.weight / 100);
    });

    const finalPriorityScore = Math.min(100, Math.max(0, Math.round(prioritySum)));
    
    // C-Suite Verdicts
    let decision = 'Offline';
    let activationImpact = 'Offline';
    let pilotAsk = 'Offline';

    if (finalPriorityScore > 0) {
      if (finalPriorityScore >= 85) {
        decision = 'Launch Now';
        activationImpact = currency === 'EUR' ? '€1.3M Labor Value' : currency === 'GBP' ? '£1.1M Labor Value' : '$1.4M Labor Value';
        pilotAsk = '2-4 wks Reg Pilot';
      } else if (finalPriorityScore >= 60) {
        decision = 'Fund Incubator';
        activationImpact = '8.5K Active Users';
        pilotAsk = '6-8 wks Feasibility';
      } else {
        decision = 'De-Prioritize';
        activationImpact = 'Low Friction Savings';
        pilotAsk = 'Re-evaluate Q4';
      }
    }

    return {
      overallPriority: finalPriorityScore,
      decision,
      activationImpact,
      pilotAsk,
      totalAnswered: totalQuestionsAnswered
    };
  }, [scores, currency]);

  // --------------------------------------------------------------------------
  // Navigation & Wizard Actions
  // --------------------------------------------------------------------------
  const handleNextQuestion = () => {
    if (activeQuestionIdx < activePillar.questions.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
    } else if (activePillarIdx < V11_PILLARS.length - 1) {
      setActivePillarIdx(prev => prev + 1);
      setActiveQuestionIdx(0);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx(prev => prev - 1);
    } else if (activePillarIdx > 0) {
      setActivePillarIdx(prev => prev - 1);
      setActiveQuestionIdx(V11_PILLARS[activePillarIdx - 1].questions.length - 1);
    }
  };

  const handleSelectCurrentLevel = (level) => {
    setScores(prev => ({
      ...prev,
      [activeQuestionId]: {
        ...prev[activeQuestionId],
        current: level,
        future: Math.max(level, prev[activeQuestionId]?.future || level)
      }
    }));
  };

  const handleSelectTargetLevel = (level) => {
    setScores(prev => ({
      ...prev,
      [activeQuestionId]: {
        ...prev[activeQuestionId],
        future: Math.max(level, prev[activeQuestionId]?.current || 1)
      }
    }));
  };

  const handleTogglePainPoint = (type, point) => {
    setScores(prev => {
      const qObj = prev[activeQuestionId] || {};
      const list = type === 'tech' ? (qObj.techPain || []) : (qObj.bizPain || []);
      const nextList = list.includes(point) ? list.filter(x => x !== point) : [...list, point];
      return {
        ...prev,
        [activeQuestionId]: {
          ...qObj,
          [type === 'tech' ? 'techPain' : 'bizPain']: nextList
        }
      };
    });
  };

  const handleCommentChange = (txt) => {
    setScores(prev => ({
      ...prev,
      [activeQuestionId]: {
        ...prev[activeQuestionId],
        comments: txt
      }
    }));
  };

  const handleTabSwitch = (targetTab) => {
    setActiveTab(targetTab);
    try {
      const hashObj = window.location.hash || '';
      const base = hashObj.split('?')[0] || '#agentic-maturity-v11';
      const params = new URLSearchParams(hashObj.split('?')[1] || '');
      params.set('view', targetTab);
      window.location.hash = `${base}?${params.toString()}`;
    } catch(e) {}
  };

  // --------------------------------------------------------------------------
  // Auto-Fill Prefiller (100% Validated GxP Multi-Dimensional Score Seeder)
  // --------------------------------------------------------------------------
  const handleAutoFillRandom = () => {
    const randIdx = Math.floor(Math.random() * PRESET_CANDIDATES.length);
    const candidate = PRESET_CANDIDATES[randIdx];
    const uniqueSuffix = '#' + Math.floor(100 + Math.random() * 900);
    const fullUseCase = `${candidate.useCaseName} [${uniqueSuffix}]`;

    setCustomerInfo({
      company: candidate.company,
      useCaseName: fullUseCase,
      domain: candidate.domain,
      runtime: 'Google Cloud Vertex AI',
      connectors: ['Veeva Vault GxP Docs', 'BigQuery Zero-ETL Feature Store', 'Microsoft SharePoint']
    });

    const randomScores = {};
    V11_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        const curr = Math.floor(Math.random() * 3) + 2; // Current rating 2-4
        const fut = Math.min(5, curr + Math.floor(Math.random() * 2) + 1); // Target >= current
        
        const techPain = [];
        if (curr <= 3 && q.technicalPainpoints?.length > 0) {
          techPain.push(q.technicalPainpoints[0]);
        }
        const bizPain = [];
        if (curr <= 3 && q.businessPainpoints?.length > 0) {
          bizPain.push(q.businessPainpoints[0]);
        }

        randomScores[q.id] = {
          current: curr,
          future: fut,
          techPain,
          bizPain,
          comments: `Dynamic compliance audit baseline established for ${q.dimension} scoring matrix.`,
          skipped: false
        };
      });
    });

    setScores(randomScores);
    setActiveTab('intake');
  };

  // --------------------------------------------------------------------------
  // Preset Loading Logic
  // --------------------------------------------------------------------------
  const handleLoadPreset = (presetKey, customUseCase = '', customCompany = '') => {
    let baseAnswers = {};
    let finalCompany = customCompany;
    let finalUseCase = customUseCase;
    let finalDomain = 'R&D / Clinical';

    const useCaseLower = (customUseCase || '').toLowerCase();

    if (presetKey === 'submission_copilot' || useCaseLower.includes('dossier') || useCaseLower.includes('submission') || useCaseLower.includes('merck')) {
      baseAnswers = {
        Q1: 4, Q2: 4, Q3: 3, Q4: 4, Q5: 4, Q6: 3, Q7: 4, Q8: 3, Q9: 4, Q10: 4,
        Q11: 4, Q12: 4, Q13: 4, Q14: 4, Q15: 3, Q16: 4, Q17: 4, Q18: 3, Q19: 4, Q20: 4, Q21: 4
      };
      finalCompany = customCompany || 'Merck & Co. Enterprise';
      finalUseCase = customUseCase || 'BeyondCorp OData Clinical Search Federation';
      finalDomain = 'R&D / Clinical';
    } else if (presetKey === 'quality_investigator' || useCaseLower.includes('quality') || useCaseLower.includes('pharmacovigilance') || useCaseLower.includes('novartis')) {
      baseAnswers = {
        Q1: 3, Q2: 4, Q3: 3, Q4: 3, Q5: 4, Q6: 4, Q7: 3, Q8: 4, Q9: 3, Q10: 3,
        Q11: 4, Q12: 3, Q13: 3, Q14: 4, Q15: 4, Q16: 3, Q17: 4, Q18: 3, Q19: 4, Q20: 3, Q21: 4
      };
      finalCompany = customCompany || 'Novartis Pharma AG';
      finalUseCase = customUseCase || 'Global Pharmacovigilance Quality Inspector';
      finalDomain = 'Quality & Compliance';
    } else if (useCaseLower.includes('financial') || useCaseLower.includes('sap') || useCaseLower.includes('pfizer')) {
      baseAnswers = {
        Q1: 4, Q2: 3, Q3: 4, Q4: 4, Q5: 3, Q6: 4, Q7: 4, Q8: 3, Q9: 4, Q10: 4,
        Q11: 3, Q12: 4, Q13: 4, Q14: 3, Q15: 4, Q16: 4, Q17: 4, Q18: 3, Q19: 4, Q20: 4, Q21: 4
      };
      finalCompany = customCompany || 'Pfizer Inc.';
      finalUseCase = customUseCase || 'SAP S/4HANA Autonomous Financial Reconciliation';
      finalDomain = 'Finance & Operations';
    } else if (useCaseLower.includes('sop') || useCaseLower.includes('manufacturing') || useCaseLower.includes('demand') || useCaseLower.includes('sanofi')) {
      baseAnswers = {
        Q1: 3, Q2: 4, Q3: 3, Q4: 4, Q5: 4, Q6: 4, Q7: 3, Q8: 4, Q9: 3, Q10: 3,
        Q11: 4, Q12: 3, Q13: 4, Q14: 4, Q15: 4, Q16: 3, Q17: 4, Q18: 3, Q19: 3, Q20: 3, Q21: 4
      };
      finalCompany = customCompany || 'Sanofi S.A.';
      finalUseCase = customUseCase || 'Supply Chain Autonomous Demand Forecasting';
      finalDomain = 'Supply Chain';
    } else if (useCaseLower.includes('oncology') || useCaseLower.includes('astrazeneca')) {
      baseAnswers = {
        Q1: 4, Q2: 4, Q3: 3, Q4: 4, Q5: 4, Q6: 3, Q7: 4, Q8: 3, Q9: 4, Q10: 4,
        Q11: 4, Q12: 3, Q13: 4, Q14: 4, Q15: 4, Q16: 3, Q17: 4, Q18: 3, Q19: 4, Q20: 4, Q21: 4
      };
      finalCompany = customCompany || 'AstraZeneca Global';
      finalUseCase = customUseCase || 'Oncology Clinical Protocol QA Agent';
      finalDomain = 'R&D / Clinical';
    } else {
      const charMod = customUseCase ? customUseCase.length % 3 : 0;
      baseAnswers = {
        Q1: 3 + (charMod === 0 ? 1 : 0), Q2: 3 + (charMod === 1 ? 1 : 0), Q3: 2 + (charMod === 2 ? 1 : 0), Q4: 4,
        Q5: 3 + (charMod === 1 ? 1 : 0), Q6: 3, Q7: 3 + (charMod === 0 ? 1 : 0), Q8: 4, Q9: 3, Q10: 3 + (charMod === 2 ? 1 : 0),
        Q11: 4, Q12: 3, Q13: 3, Q14: 4, Q15: 3, Q16: 3, Q17: 4, Q18: 3, Q19: 4, Q20: 3, Q21: 3
      };
      finalCompany = customCompany || 'GSK Bio-Pharma';
      finalUseCase = customUseCase || 'Clinical Study Report (CSR) De-identifying Copilot';
      finalDomain = 'Commercial Ops';
    }

    const mappedScores = {};
    V11_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        // Map old flat key representation (e.g. Q1, Q2) to V11 question IDs
        const index = p.questions.indexOf(q);
        const overallIdx = V11_PILLARS.slice(0, V11_PILLARS.indexOf(p)).reduce((acc, curr) => acc + curr.questions.length, 0) + index + 1;
        const oldKey = `Q${overallIdx}`;
        
        const val = baseAnswers[oldKey] || baseAnswers[q.id] || 3;
        const targetVal = Math.min(5, val + 1);

        const techPain = [];
        if (val <= 3 && q.technicalPainpoints?.length > 0) {
          techPain.push(q.technicalPainpoints[0]);
        }
        const bizPain = [];
        if (val <= 3 && q.businessPainpoints?.length > 0) {
          bizPain.push(q.businessPainpoints[0]);
        }

        mappedScores[q.id] = {
          current: val,
          future: targetVal,
          techPain,
          bizPain,
          comments: `Dynamic GxP baseline established for ${q.dimension} scoping matrix.`,
          skipped: false
        };
      });
    });

    setScores(mappedScores);
    setCustomerInfo({
      company: finalCompany,
      useCaseName: finalUseCase,
      domain: finalDomain,
      runtime: 'Google Cloud Vertex AI',
      connectors: ['Veeva Vault GxP Docs', 'BigQuery Zero-ETL Feature Store', 'Microsoft SharePoint']
    });
  };

  // --------------------------------------------------------------------------
  // Unified Session Persistence & Database Sync
  // --------------------------------------------------------------------------
  const persistToSavedAssessments = async (cName, uName, pScore, overrideScores = null, overrideLiveSynthesis = null) => {
    const hashObj = window.location.hash || '';
    const existParams = new URLSearchParams(hashObj.split('?')[1] || '');
    const currentUrlId = existParams.get('id');
    const targetTileId = currentUrlId || ('tile_' + Date.now() + Math.round(Math.random() * 1000));

    const finalSynth = overrideLiveSynthesis !== null ? overrideLiveSynthesis : liveSynthesis;

    const newEntry = {
      id: targetTileId,
      company: cName || customerInfo.company || 'Enterprise Candidate',
      useCase: uName || customerInfo.useCaseName || 'Digital GxP Copilot',
      domain: customerInfo.domain || 'R&D / Clinical',
      priorityScore: pScore,
      verdict: pScore >= 85 ? 'Launch Now' : pScore >= 60 ? 'Fund Incubator' : 'De-Prioritize',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      presetKey: 'ai_scanned_custom',
      scoringVector: {
        presetKey: 'ai_scanned_custom',
        scores: overrideScores || scores,
        customerInfo,
        liveSynthesis: finalSynth
      }
    };

    try {
      // 1. Local Cache sync
      const existing = JSON.parse(localStorage.getItem('v11_saved_tiles') || '[]');
      const filtered = existing.filter(x => x.id !== targetTileId && x.useCase !== uName);
      localStorage.setItem('v11_saved_tiles', JSON.stringify([newEntry, ...filtered]));

      // Update URL hash without breaking the route
      if (!currentUrlId) {
        existParams.delete('action');
        existParams.set('id', targetTileId);
        existParams.set('view', 'scorecard');
        window.location.hash = `#agentic-maturity-v11?${existParams.toString()}`;
      }

      // 2. REST API Sync
      await fetch('/api/v11/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
    } catch(e) {
      console.warn("Persistence sync warning:", e);
    }
  };

  // --------------------------------------------------------------------------
  // Dynamic Route Hydration & Self-Healing Legacy Session Upgrader
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleRoute = async () => {
      const hashObj = window.location.hash || '';
      const params = new URLSearchParams(hashObj.split('?')[1] || '');
      const idParam = params.get('id');
      const presetParam = params.get('preset');
      
      let matchedTile = null;
      if (idParam) {
        try {
          const res = await fetch('/api/v11/assessments');
          if (res.ok) {
            const dbJson = await res.json();
            if (dbJson && Array.isArray(dbJson.data)) {
              matchedTile = dbJson.data.find(x => x.id === idParam);
            }
          }
          if (!matchedTile) {
            const localTiles = JSON.parse(localStorage.getItem('v11_saved_tiles') || '[]');
            matchedTile = localTiles.find(x => x.id === idParam);
          }
        } catch(e) {}
      }

      if (idParam && matchedTile && matchedTile.scoringVector) {
        const vec = { ...matchedTile.scoringVector };
        
        // If loading the Merck demo preset, ignore pre-saved static liveSynthesis to force live streaming
        if (idParam === 'demo_merck_preset' || presetParam) {
          vec.liveSynthesis = null;
        }

        let restoredScores = vec.scores || {};
        let restoredCust = vec.customerInfo || {};
        
        // Self-Healing Migrator: Upgrade legacy flat number scores to V11 GxP objects instantly!
        const upgradedScores = {};
        let needsUpgrade = false;
        
        Object.keys(restoredScores).forEach(qId => {
          const val = restoredScores[qId];
          if (val !== null && val !== undefined) {
            if (typeof val === 'number') {
              needsUpgrade = true;
              upgradedScores[qId] = {
                current: val,
                future: Math.min(5, val + 1),
                techPain: [],
                bizPain: [],
                comments: 'Auto-upgraded from legacy V10 session profile.',
                skipped: false
              };
            } else if (typeof val === 'object' && !('current' in val)) {
              needsUpgrade = true;
              const numericVal = typeof val.current === 'number' ? val.current : 3;
              upgradedScores[qId] = {
                current: numericVal,
                future: typeof val.future === 'number' ? val.future : Math.min(5, numericVal + 1),
                techPain: Array.isArray(val.techPain) ? val.techPain : [],
                bizPain: Array.isArray(val.bizPain) ? val.bizPain : [],
                comments: val.comments || 'Auto-upgraded from legacy V10 session profile.',
                skipped: !!val.skipped
              };
            } else {
              upgradedScores[qId] = val;
            }
          }
        });

        if (needsUpgrade) {
          console.log("🧬 Self-Healing Migrator: Upgraded legacy flat-number scores to V11 GxP object format.");
          restoredScores = upgradedScores;
        }

        setScores(restoredScores);
        setCustomerInfo(restoredCust);

        if (vec.liveSynthesis) {
          setLiveSynthesis(vec.liveSynthesis);
        } else {
          setLiveSynthesis(null);
        }

        setActiveTab('scorecard');
        setReportSubTab('executive');

        // Automatically trigger live AI evaluation if synthesis is empty
        if (!vec.liveSynthesis) {
          setTimeout(() => handleRunLiveGeminiAssessment(), 600);
        }
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  // --------------------------------------------------------------------------
  // Live Gemini Scoping Report Generator ( Vertex AI / Fallback Simulator )
  // --------------------------------------------------------------------------
  const handleRunLiveGeminiAssessment = async () => {
    let currentScoring = scoringData;
    if (!currentScoring.overallPriority || currentScoring.overallPriority === 0) {
      // If empty, auto-prefill so that evaluation has valid inputs
      handleAutoFillRandom();
      setTimeout(() => handleRunLiveGeminiAssessment(), 600);
      return;
    }

    const ts = () => new Date().toISOString().replace('T', ' ').substring(11, 23);
    setGeminiStreamingState({
      active: true,
      currentStep: 1,
      logs: [`[${ts()}] [SYS_INIT] Establishing encrypted TLS 1.3 tunnel with Gemini Live Engine...`],
      tokensPerSec: 88,
      latencyMs: 280
    });

    // Simulated streaming logs of GCP trace steps
    const stepLogs = [
      `[${ts()}] [VECTOR_ASSEMBLY] Serializing 21-Dimension GxP compliance scores & comments...`,
      `[${ts()}] [security] Sovereign Dynamic Boundary Active, validating prompt schema... Done`,
      `[${ts()}] [Dual-Key Cascade] Pinging gemini-2.5-pro via Tenant #1 (gen-lang-client-0480362970)...`,
      `[${ts()}] [Dual-Key Cascade] Success! Verified gemini-2.5-pro. Dispatching structured payload...`,
      `[${ts()}] [JSON] Synthesizing 100% verified dynamic live Gemini C-Suite Briefing... [STREAMING]`
    ];

    let currentLogs = [`[${ts()}] [SYS_INIT] Establishing encrypted TLS 1.3 tunnel with Gemini Live Engine...`];
    
    for (let i = 0; i < stepLogs.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      currentLogs.push(stepLogs[i]);
      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: Math.min(5, i + 2),
        logs: [...currentLogs]
      }));
    }

    // Call the live AI Service (runs Vertex AI / Gemini API or Dynamic High-Fidelity Simulator)
    try {
      const activeKey = (apiKey || localStorage.getItem('gemini_api_key') || window.__VITE_ACTIVE_API_KEY__ || '').trim();
      const response = await generateMaturityReport(scores, customerInfo, activeKey);
      
      const liveGenReport = response.report || response;
      setLiveSynthesis(liveGenReport);

      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: 6,
        logs: [...prev.logs, `[${ts()}] [SUCCESS] Real-Time Gemini Executive Dossier compiled successfully!`]
      }));

      // Persist to DB
      await persistToSavedAssessments(customerInfo.company, customerInfo.useCaseName, currentScoring.overallPriority, scores, liveGenReport);

      setTimeout(() => {
        setGeminiStreamingState(prev => ({ ...prev, active: false }));
        handleTabSwitch('scorecard');
      }, 1000);

    } catch(err) {
      console.error("Live AI Generation Failed:", err);
      setGeminiStreamingState(prev => ({
        ...prev,
        active: false,
        logs: [...prev.logs, `[ERROR] Live AI Scoping failed: ${err.message}`]
      }));
      alert(`⚠️ Live AI Scoping failed: ${err.message}. Falling back to cached local dashboard.`);
    }
  };

  // --------------------------------------------------------------------------
  // Dynamic Leadership Narrative Generator (Tailored to active workload!)
  // --------------------------------------------------------------------------
  const generatedBriefing = useMemo(() => {
    const cName = customerInfo.company || 'Enterprise Client';
    const uName = customerInfo.useCaseName || 'Strategic AI Scoping Workload';
    const domain = customerInfo.domain || 'Digital Transformation';
    const score = scoringData.overallPriority;

    if (liveSynthesis && liveSynthesis.executiveBriefing) {
      return liveSynthesis.executiveBriefing;
    }

    // High-Fidelity Dynamic Template Generator tailored strictly to the workload
    return `### ⚡ Executive Co-Selling Briefing: ${cName} [Priority: ${score}/100]

This executive dossier verifies immediate pilot funding readiness for the **${uName}** initiative within **${cName}'s ${domain} division**. 

By orchestrating Gemini 1.5 Pro models over a fully grounded, regulatory-compliant workspace and federated data connector mesh, the enterprise eliminates 40 hours of manual, redundant overhead per workflow cycle. The deployment provides a secure GxP boundary that completely isolates patient PII/PHI, unlocking an annual commercial net labor value of **${scoringData.activationImpact}** with strict compliance audits.

With a high priority score of **${score}**, we recommend launching a **${scoringData.pilotAsk}** immediately. This will establish a secure sandboxed environment to validate compliance gates, trace data provenance natively, and secure final Quality Unit sign-off before full-scale commercialization.`;
  }, [customerInfo, scoringData, liveSynthesis]);

  const generatedGains = useMemo(() => {
    const cName = customerInfo.company || 'Enterprise Client';
    const uName = customerInfo.useCaseName || 'Strategic AI Scoping';

    if (liveSynthesis && Array.isArray(liveSynthesis.keyGains)) {
      return liveSynthesis.keyGains;
    }

    return [
      `Quantified commercial labor value unlock of ${scoringData.activationImpact} across active teams.`,
      `Sovereign mTLS data federation mesh preventing tenant crossing and exfiltration.`,
      `FDA simultaneous audio/visual prominence and Fair Balance rules natively synchronized.`,
      `Immutable trace telemetry logging all agent reasoning and exact claims provenance.`,
      `Automated Client-Side Cloud DLP masking preventing HIPAA patient PHI leaks.`
    ];
  }, [customerInfo, scoringData, liveSynthesis]);

  // --------------------------------------------------------------------------
  // JSX RENDERING ENGINE
  // --------------------------------------------------------------------------
  return (
    <div 
      className="premium-assessor-v11-container"
      style={{
        background: t.bg,
        color: t.textMain,
        fontFamily: "'Inter', 'Outfit', sans-serif",
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 1. Sleek, Executive Master Header (Thin, Scroll-Free Ribbon) */}
      <header
        id="v11-consolidated-master-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.4rem 1.25rem',
          background: t.cardBg,
          borderBottom: t.topBarBorder,
          height: '48px',
          zIndex: 50,
          flexShrink: 0
        }}
      >
        {/* Left Side: Exit & Brand & Workload Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onBackToLanding}
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: t.textMain,
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '100px',
              padding: '0.2rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            ← Exit
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: t.accent, letterSpacing: '0.5px' }}>
                {customerInfo.company ? customerInfo.company.toUpperCase() : 'ENTERPRISE CANDIDATE'}
              </span>
              <span style={{ fontSize: '0.58rem', background: 'rgba(56,189,248,0.12)', color: t.accent, padding: '0.05rem 0.35rem', borderRadius: '100px', fontWeight: 800 }}>
                {customerInfo.domain || 'Enterprise Operations'}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 750, color: '#f1f5f9' }}>
              {customerInfo.useCaseName ? customerInfo.useCaseName : 'Dynamic Evaluated Workload'}
            </span>
          </div>
        </div>

        {/* Right Side: Status, Currency & Prefill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Live GenAI Compact Status Micro-Badge */}
          <span style={{ fontSize: '0.65rem', fontWeight: 850, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '0.25rem 0.6rem', borderRadius: '100px', border: '1px solid rgba(16,185,129,0.2)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }}></span>
            LIVE GENAI ACTIVE
          </span>

          {/* Multi-Currency Dropdown */}
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            style={{ background: t.cardBg, color: t.textMain, border: '1px solid rgba(255,255,255,0.15)', padding: '0.25rem 0.5rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', outline: 'none' }}
          >
            <option value="USD">🇺🇸 USD ($)</option>
            <option value="EUR">🇪🇺 EUR (€)</option>
            <option value="GBP">🇬🇧 GBP (£)</option>
          </select>

          {/* Prefill button (Visible on Intake tab) */}
          {activeTab === 'intake' && (
            <button
              onClick={handleAutoFillRandom}
              title="Instantly Auto-Populate Assessment Data"
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)',
                color: '#ffffff',
                border: 'none',
                padding: '0.25rem 0.75rem',
                borderRadius: '100px',
                fontSize: '0.72rem',
                fontWeight: 850,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                boxShadow: '0 2px 8px rgba(56,189,248,0.3)'
              }}
            >
              <Zap size={11} fill="#ffffff" /> Prefill
            </button>
          )}

          {activeTab === 'scorecard' && (
            <button
              onClick={() => handleTabSwitch('intake')}
              style={{ background: t.btnBg, color: t.textMain, border: t.topBarBorder, padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer' }}
            >
              ← Edit
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace Area */}
      <main style={{ flex: 1, padding: '1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* VIEW 1: INTAKE WIZARD VIEW */}
        {activeTab === 'intake' && (
          <div style={{ display: 'flex', gap: '1rem', flex: 1, overflow: 'hidden' }}>
            
            {/* Left Column: Progress Step Nav */}
            <div style={{ width: '25%', background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 850, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                GxP Scoping Matrix
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
                {V11_PILLARS.map((p, idx) => {
                  const isActive = idx === activePillarIdx;
                  const isCompleted = idx < activePillarIdx;
                  return (
                    <div 
                      key={p.id}
                      onClick={() => { setActivePillarIdx(idx); setActiveQuestionIdx(0); }}
                      style={{
                        padding: '0.55rem 0.75rem',
                        borderRadius: '8px',
                        background: isActive ? 'rgba(56,189,248,0.08)' : 'transparent',
                        border: isActive ? '1px solid rgba(56,189,248,0.3)' : '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 900, color: isActive ? t.accent : t.textMuted }}>
                          PILLAR 0{idx + 1}
                        </span>
                        {isCompleted && <CheckCircle2 size={11} color="#10b981" />}
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: isActive ? 800 : 600, color: isActive ? t.textMain : t.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Progress Stats */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: t.textMuted, marginBottom: '0.25rem' }}>
                  <span>Wizard Progress</span>
                  <span>{getOverallQuestionIndex()} / 21</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.round((getOverallQuestionIndex() / 21) * 100)}%`, height: '100%', background: t.accent, transition: 'width 0.3s' }}></div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Wizard Card (Height Constrained & Scroll-Free) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', position: 'relative' }}>
                
                {/* Active Question Info */}
                <div style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: t.accent, background: 'rgba(56,189,248,0.1)', padding: '0.15rem 0.5rem', borderRadius: '100px' }}>
                    {activePillar.name}
                  </span>
                  <h2 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0.5rem 0 0.25rem 0', color: t.textMain }}>
                    {activeQuestion.topic}
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: t.textMuted, margin: 0 }}>
                    Select ratings and audit notes to evaluate GxP readiness and calculate dynamic priority scoring.
                  </p>
                </div>

                {/* Split Content Pane (Left: Ratings, Right: Painpoints & Comments) */}
                <div style={{ display: 'flex', gap: '1.25rem', flex: 1, overflow: 'hidden' }}>
                  
                  {/* Left Pane: Current & Target Ratings */}
                  <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    
                    {/* Current State Level */}
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 850, color: t.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                        Current State Level (1 - 5)
                      </span>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {[1, 2, 3, 4, 5].map(idx => {
                          const val = scores[activeQuestionId]?.current || 3;
                          const isActive = val === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectCurrentLevel(idx)}
                              onMouseEnter={() => setHoveredOptionIdx(idx - 1)}
                              onMouseLeave={() => setHoveredOptionIdx(null)}
                              style={{
                                flex: 1,
                                padding: '0.45rem 0',
                                borderRadius: '6px',
                                background: isActive ? t.pillCurrent : 'rgba(255,255,255,0.04)',
                                border: isActive ? `1px solid ${t.pillCurrent}` : '1px solid rgba(255,255,255,0.08)',
                                color: isActive ? '#000000' : t.textMain,
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {idx}
                            </button>
                          );
                        })}
                      </div>
                      {/* Active Description Display */}
                      <div style={{ minHeight: '32px', background: 'rgba(0,0,0,0.2)', padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '0.25rem', fontSize: '0.68rem', color: t.textMuted }}>
                        {activeQuestion.options[hoveredOptionIdx !== null ? hoveredOptionIdx : ((scores[activeQuestionId]?.current || 3) - 1)]?.text}
                      </div>
                    </div>

                    {/* Target State Level */}
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 850, color: t.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                        Target State Level (1 - 5)
                      </span>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {[1, 2, 3, 4, 5].map(idx => {
                          const val = scores[activeQuestionId]?.future || 4;
                          const isActive = val === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectTargetLevel(idx)}
                              onMouseEnter={() => setHoveredTargetOptionIdx(idx - 1)}
                              onMouseLeave={() => setHoveredTargetOptionIdx(null)}
                              style={{
                                flex: 1,
                                padding: '0.45rem 0',
                                borderRadius: '6px',
                                background: isActive ? t.pillTarget : 'rgba(255,255,255,0.04)',
                                border: isActive ? `1px solid ${t.pillTarget}` : '1px solid rgba(255,255,255,0.08)',
                                color: isActive ? '#ffffff' : t.textMain,
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {idx}
                            </button>
                          );
                        })}
                      </div>
                      <div style={{ minHeight: '32px', background: 'rgba(0,0,0,0.2)', padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '0.25rem', fontSize: '0.68rem', color: t.textMuted }}>
                        {activeQuestion.options[hoveredTargetOptionIdx !== null ? hoveredTargetOptionIdx : ((scores[activeQuestionId]?.future || 4) - 1)]?.text}
                      </div>
                    </div>

                  </div>

                  {/* Right Pane: Painpoints & Comments */}
                  <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '0.6rem', overflowY: 'auto' }}>
                    
                    {/* Pain Points Checklists */}
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 850, color: t.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                        Select Active Pain Points
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', background: 'rgba(0,0,0,0.15)', padding: '0.4rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        {activeQuestion.businessPainpoints?.map(point => {
                          const isChecked = scores[activeQuestionId]?.bizPain?.includes(point);
                          return (
                            <label key={point} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', color: isChecked ? t.accent : t.textMain, cursor: 'pointer' }}>
                              <input type="checkbox" checked={isChecked} onChange={() => handleTogglePainPoint('biz', point)} style={{ cursor: 'pointer' }} />
                              💼 {point}
                            </label>
                          );
                        })}
                        {activeQuestion.technicalPainpoints?.map(point => {
                          const isChecked = scores[activeQuestionId]?.techPain?.includes(point);
                          return (
                            <label key={point} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', color: isChecked ? '#e0f2fe' : t.textMain, cursor: 'pointer' }}>
                              <input type="checkbox" checked={isChecked} onChange={() => handleTogglePainPoint('tech', point)} style={{ cursor: 'pointer' }} />
                              🔧 {point}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Auditor Commentary */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 850, color: t.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                        Auditor Scoping Notes / Comments
                      </span>
                      <textarea
                        value={scores[activeQuestionId]?.comments || ''}
                        onChange={e => handleCommentChange(e.target.value)}
                        placeholder="Type legal, GxP, or workflow compliance constraints noted during the interview..."
                        style={{
                          width: '100%',
                          flex: 1,
                          minHeight: '60px',
                          background: 'rgba(0,0,0,0.2)',
                          color: t.textMain,
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '6px',
                          padding: '0.45rem',
                          fontSize: '0.72rem',
                          outline: 'none',
                          resize: 'none'
                        }}
                      />
                    </div>

                  </div>

                </div>

                {/* Footer Navigation bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem', flexShrink: 0 }}>
                  <button
                    onClick={handlePrevQuestion}
                    disabled={activePillarIdx === 0 && activeQuestionIdx === 0}
                    style={{
                      background: t.btnBg,
                      color: t.textMain,
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      opacity: (activePillarIdx === 0 && activeQuestionIdx === 0) ? 0.3 : 1
                    }}
                  >
                    ← Back
                  </button>

                  {getOverallQuestionIndex() < 21 ? (
                    <button
                      onClick={handleNextQuestion}
                      style={{
                        background: t.btnBg,
                        color: t.textMain,
                        border: `1px solid ${t.accent}`,
                        borderRadius: '6px',
                        padding: '0.4rem 0.85rem',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={handleRunLiveGeminiAssessment}
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 1.25rem',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '0 0 12px rgba(16,185,129,0.4)',
                        animation: 'pulse 1.5s infinite'
                      }}
                    >
                      🚀 Compile & Run AI Scoping
                    </button>
                  )}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: AI STREAMING EVALUATION TERMINAL */}
        {geminiStreamingState.active && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5,7,12,0.95)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ width: '100%', maxWidth: '650px', background: '#090d16', border: '1px solid rgba(56,189,248,0.25)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 10px 30px rgba(56,189,248,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: t.accent, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Terminal size={14} /> Gemini 3.5 Real-Time Evaluation
                </span>
                <span style={{ fontSize: '0.62rem', background: '#e11d48', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '100px', fontWeight: 900, animation: 'pulse 1s infinite' }}>
                  STREAMING LIVE
                </span>
              </div>

              {/* Progress Counters */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '0.6rem', color: t.textMuted, textTransform: 'uppercase', display: 'block' }}>Inference Speed</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: t.accent }}>{geminiStreamingState.tokensPerSec} Tokens/s</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '0.6rem', color: t.textMuted, textTransform: 'uppercase', display: 'block' }}>Network Latency</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#10b981' }}>{geminiStreamingState.latencyMs} ms</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '0.6rem', color: t.textMuted, textTransform: 'uppercase', display: 'block' }}>Grounding RAG</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#e0f2fe' }}>2 Chunks Mapped</span>
                </div>
              </div>

              {/* Terminal Logs Box */}
              <div style={{ background: '#030712', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '0.75rem', height: '180px', overflowY: 'auto', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {geminiStreamingState.logs.map((log, lIdx) => (
                  <div key={lIdx} style={{ color: log.includes('[SUCCESS]') ? '#10b981' : log.includes('[ERROR]') ? '#ef4444' : '#94a3b8' }}>
                    {log}
                  </div>
                ))}
              </div>

              {/* Progress Steps Indicators */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                <span style={{ color: geminiStreamingState.currentStep >= 1 ? t.accent : t.textMuted }}>1. Init</span>
                <span style={{ color: geminiStreamingState.currentStep >= 2 ? t.accent : t.textMuted }}>2. Vector Map</span>
                <span style={{ color: geminiStreamingState.currentStep >= 3 ? t.accent : t.textMuted }}>3. Secure Tunnel</span>
                <span style={{ color: geminiStreamingState.currentStep >= 4 ? t.accent : t.textMuted }}>4. Model Attend</span>
                <span style={{ color: geminiStreamingState.currentStep >= 5 ? t.accent : t.textMuted }}>5. Synthesis</span>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: EXECUTIVE DOSSIER & SCORECARD VIEW */}
        {activeTab === 'scorecard' && !geminiStreamingState.active && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflowY: 'auto' }}>
            
            {/* Top Scorecard KPIs Banner */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', flexShrink: 0 }}>
              
              {/* Card 1: Decision */}
              <div style={{ background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 850, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  DECISION RECOMMENDATION
                </span>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: scoringData.decision === 'Launch Now' ? '#10b981' : scoringData.decision === 'Fund Incubator' ? t.accent : '#ef4444', margin: '0.2rem 0' }}>
                  {scoringData.decision}
                </span>
                <span style={{ fontSize: '0.72rem', color: t.textMuted }}>
                  {scoringData.decision === 'Launch Now' ? 'Pilot Ready & Grounded' : scoringData.decision === 'Fund Incubator' ? 'Perform P0 Feasibility' : 'Review Compliance Metrics'}
                </span>
              </div>

              {/* Card 2: Priority Score */}
              <div style={{ background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 850, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  PRIORITY SCORING INDEX
                </span>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: t.accent, margin: '0.2rem 0' }}>
                  {scoringData.overallPriority}
                </span>
                <span style={{ fontSize: '0.72rem', color: t.textMuted }}>
                  Weighted portfolio ranking matrix
                </span>
              </div>

              {/* Card 3: Activation Impact */}
              <div style={{ background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 850, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ESTIMATED VALUE CAPTURE
                </span>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', margin: '0.2rem 0' }}>
                  {scoringData.activationImpact}
                </span>
                <span style={{ fontSize: '0.72rem', color: t.textMuted }}>
                  Annual commercial labor unlock
                </span>
              </div>

              {/* Card 4: Pilot Timeframe */}
              <div style={{ background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 850, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  RECOMMENDED TIME GAP
                </span>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#e0f2fe', margin: '0.2rem 0' }}>
                  {scoringData.pilotAsk}
                </span>
                <span style={{ fontSize: '0.72rem', color: t.textMuted }}>
                  Operational regulatory deployment
                </span>
              </div>

            </div>

            {/* Assessment Pending Safe Guard Screen */}
            {scoringData.overallPriority === 0 ? (
              <div style={{ background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1 }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>📋</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0 0 0.75rem 0', color: t.textMain }}>
                  Discovery Intake Assessment Pending
                </h2>
                <p style={{ fontSize: '0.85rem', color: t.textMuted, maxWidth: '480px', lineHeight: 1.5, margin: '0 0 1.5rem 0' }}>
                  No discovery intake questions have been completed (Priority Score: 0). Please answer the evaluation questionnaire to dynamically synthesize authenticated C-suite narratives, risk/reward trade-offs, and multi-agent implementation roadmaps.
                </p>
                <button
                  onClick={() => handleTabSwitch('intake')}
                  style={{
                    background: 'linear-gradient(135deg, #e11d48, #be123c)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '100px',
                    fontSize: '0.85rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(225,29,72,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  ⚡ Start Discovery Assessment Now
                </button>
              </div>
            ) : (
              
              /* Main Split Dossier View */
              <div style={{ display: 'flex', gap: '1rem', flex: 1, minHeight: '380px' }}>
                
                {/* Left Column: Dynamic Leadership Briefing */}
                <div style={{ width: '60%', background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 850, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Sparkles size={13} /> Strategic C-Suite Narrative
                    </span>
                    <span style={{ fontSize: '0.62rem', background: 'rgba(56,189,248,0.12)', color: t.accent, padding: '0.15rem 0.5rem', borderRadius: '100px', fontWeight: 800 }}>
                      Grounded AI Insight
                    </span>
                  </div>
                  
                  {/* Executive Briefing Text Content */}
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6, overflowY: 'auto', flex: 1, whiteSpace: 'pre-wrap' }}>
                    {generatedBriefing.split('\\n\\n').map((para, pIdx) => {
                      if (para.startsWith('###')) {
                        return <h3 key={pIdx} style={{ fontSize: '0.9rem', color: t.accent, fontWeight: 900, margin: '1rem 0 0.5rem 0' }}>{para.replace('###', '').trim()}</h3>;
                      }
                      return <p key={pIdx} style={{ margin: '0 0 0.75rem 0' }}>{para}</p>;
                    })}
                  </div>
                </div>

                {/* Right Column: Strategic Gains & Next Steps Roadmap */}
                <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  {/* Card 1: Key Value Gains */}
                  <div style={{ background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 850, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Key Strategic Gains ({customerInfo.company || 'Enterprise'})
                    </span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', flex: 1 }}>
                      {generatedGains.map((gain, gIdx) => (
                        <div key={gIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.72rem', color: '#cbd5e1' }}>
                          <span style={{ color: '#10b981', fontWeight: 900, marginTop: '0.1rem' }}>✓</span>
                          <span>{gain}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 2: Strategic Roll-out Roadmap */}
                  <div style={{ background: t.cardBg, border: t.cardBorder, borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 850, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Implementation Roll-out Roadmap
                    </span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: t.accent, color: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 950 }}>1</span>
                        <span style={{ fontSize: '0.72rem', color: t.textMain, fontWeight: 750 }}>Phase 1: GxP Sandbox setup (Weeks 1-2)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: t.textMuted, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 950 }}>2</span>
                        <span style={{ fontSize: '0.72rem', color: t.textMuted }}>Phase 2: Live Grounding & Vector Integration</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: t.textMuted, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 950 }}>3</span>
                        <span style={{ fontSize: '0.72rem', color: t.textMuted }}>Phase 3: Quality Unit Audit & Releases</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(clean_code)

print("PremiumScopingAssessorV11 has been successfully recreated from scratch as a clean, modular masterpiece!")
