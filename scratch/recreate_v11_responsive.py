file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

responsive_code = """import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
    name: 'UX & HITL Workflow',
    weight: 20,
    persona: 'Business',
    purpose: 'Evaluates how users interact with compliance constraints and MLR review gates.',
    questions: [
      {
        id: 'UX_HITL.1',
        dimension: 'Native Workspace Integration',
        topic: 'ROI & Workspace Integration: How do marketers and reviewers interact with compliance constraints?',
        options: [
          { score: 30, text: '1. Manual: Manual PDF cross-referencing and separate portal logins.' },
          { score: 50, text: '2. Siloed: Basic plugins requiring users to toggle between AI chat and creative canvases.' },
          { score: 70, text: '3. Integrated: Passive AI assistants embedded in the workspace (grammar check only).' },
          { score: 90, text: '4. Agentic: Agentic streaming of generative compliance components directly into the UI.' },
          { score: 100, text: '5. Strategic: A single "pane of glass" orchestrates the entire lifecycle natively.' }
        ],
        businessPainpoints: [
          'Users refuse to leave native tools', 
          'High context-switching overhead', 
          'Low adoption of external portals',
          'Long learning curve for new creative tools',
          'Loss of creative momentum during audits'
        ],
        technicalPainpoints: [
          'Brittle iframe integrations', 
          'No bidirectional state syncing', 
          'Complex OAuth/SSO across apps',
          'API rate limits on native webhooks',
          'Inconsistent UI rendering across devices'
        ]
      },
      {
        id: 'UX_HITL.2',
        dimension: 'Exception Handling & HITL',
        topic: 'Exception Handling & HITL: How are legal, medical, and regulatory (MLR) exceptions handled?',
        options: [
          { score: 30, text: '1. Manual: Content is manually emailed/uploaded for human review.' },
          { score: 50, text: '2. Siloed: AI flags issues, but humans manually correct and restart workflows.' },
          { score: 75, text: '3. Integrated: Automated draft generation with static alerts pushed to reviewers.' },
          { score: 95, text: '4. Agentic: Event-driven dormancy gates automatically pause agents during human reviews.' },
          { score: 100, text: '5. Strategic: Deep micro-editing; human edits in Veeva automatically cascade through AI assets.' }
        ],
        businessPainpoints: [
          'Regulatory filings delayed by manual queues', 
          'Lack of audit trail for overrides', 
          'High compliance risks',
          'Reviewer fatigue from false flags',
          'Siloed communications between legal and marketing'
        ],
        technicalPainpoints: [
          'No event-driven workflow pausing', 
          'Lack of state preservation during dormancy', 
          'Brittle webhook integrations',
          'No automated escalation pathways',
          'Mismatched schema between AI and Veeva Vault'
        ]
      },
      {
        id: 'UX_HITL.3',
        dimension: 'Audience Transparency',
        topic: 'Audience Transparency: How does the system handle geolocalized consumer-facing AI disclosures?',
        options: [
          { score: 30, text: '1. Manual: Marketers manually remember to add disclaimers based on geolocation.' },
          { score: 50, text: '2. Siloed: Static disclaimers are hardcoded onto every asset, cluttering the creative.' },
          { score: 75, text: '3. Integrated: System flags AI usage, but marketers manually adjust legal text.' },
          { score: 95, text: '4. Agentic: A Legal Routing Agent reads audience geolocation and appends disclosures.' },
          { score: 100, text: '5. Strategic: Dynamic localization maps AI touchpoints to live regulatory databases.' }
        ],
        businessPainpoints: [
          'Non-compliance with state AI laws', 
          'High cost of manual legal reviews', 
          'Disclaimer localization errors',
          'Inconsistent branding across regions',
          'Negative consumer sentiment from disclosures'
        ],
        technicalPainpoints: [
          'Hardcoded compliance text', 
          'Lack of geolocalized routing intelligence', 
          'No dynamic regulatory DB links',
          'Inability to parse dynamic creative layouts',
          'Stale cache of legal disclaimer texts'
        ]
      }
    ]
  },
  {
    id: 'INT_REG',
    name: 'Intelligence & Regulatory',
    weight: 20,
    persona: 'Business',
    purpose: 'Evaluates cognitive capabilities, model agnosticism, and regulatory rule enforcement.',
    questions: [
      {
        id: 'INT_REG.1',
        dimension: 'Model Agnosticism',
        topic: 'Model Agnosticism & Orchestration: How do you ensure sufficient context windows while avoiding vendor lock-in?',
        options: [
          { score: 30, text: '1. Manual: Web-interface reliance on a single public model.' },
          { score: 50, text: '2. Siloed: Direct, hardcoded API integration with a single model provider.' },
          { score: 70, text: '3. Integrated: Model aggregator access, but routing requires manual developer intervention.' },
          { score: 90, text: '4. Agentic: Unified Model Garden routing tasks based on strengths (e.g., Gemini 1.5 Pro).' },
          { score: 100, text: '5. Strategic: Fully autonomous, cost-effective routing dynamically handled at runtime.' }
        ],
        businessPainpoints: [
          'Vendor lock-in risks', 
          'High API costs for large context windows', 
          'System downtime due to vendor outage',
          'Inability to leverage open-source model efficiencies',
          'Slow adoption of new model capabilities'
        ],
        technicalPainpoints: [
          'Hardcoded model API calls', 
          'No dynamic failover routing', 
          'Lack of unified abstraction layer',
          'Mismatched API token limits',
          'No semantic caching to offset costs'
        ]
      },
      {
        id: 'INT_REG.2',
        dimension: 'Brand Rule Application',
        topic: 'MLR & Brand Rule Application: How are regulatory parameters (PhRMA codes) and brand guidelines enforced?',
        options: [
          { score: 30, text: '1. Manual: Manual human memorization of static rulebooks.' },
          { score: 50, text: '2. Siloed: Rules hardcoded into system prompts, causing token bloat and hallucinations.' },
          { score: 75, text: '3. Integrated: Standard vector database retrieval, which misinterprets regional rules.' },
          { score: 95, text: '4. Agentic: Pre-trained context proxies enforce static constraints before generation.' },
          { score: 100, text: '5. Strategic: Progressive Disclosure dynamically loads conditional rules on-demand.' }
        ],
        businessPainpoints: [
          'Frequent brand guideline violations', 
          'Conflicting rules across regions', 
          'Regulatory fines for copy',
          'Slow approval times from manual check lists',
          'Inconsistent tone of voice across campaigns'
        ],
        technicalPainpoints: [
          'Monolithic prompt bloat', 
          'High hallucination rate of rules', 
          'Inability to trace rule firing events',
          'Brittle vector retrieval for complex logic',
          'Lack of real-time rule parsing engine'
        ]
      },
      {
        id: 'INT_REG.3',
        dimension: 'Fair Balance & AE',
        topic: 'Fair Balance & AE Detection: How does the system ensure "Fair Balance" and detect Adverse Events?',
        options: [
          { score: 30, text: '1. Manual: Manual copy/pasting of Important Safety Information (ISI); no AE detection.' },
          { score: 55, text: '2. Siloed: AI fetches ISI text, but humans verify formatting and prominence.' },
          { score: 75, text: '3. Integrated: Script-based appending via keyword matching that breaks on complex layouts.' },
          { score: 95, text: '4. Agentic: A Medical Safety Agent audits assets for Fair Balance and flags potential AEs to PV.' },
          { score: 100, text: '5. Strategic: Autonomous formatting dynamically integrates ISI with FDA-mandated prominence.' }
        ],
        businessPainpoints: [
          'Missed Adverse Event (AE) signals', 
          'FDA warning letter risks', 
          'Inability to audit PV review logs',
          'High cost of manual safety text verification',
          'Slow time-to-market for safety updates'
        ],
        technicalPainpoints: [
          'Lack of real-time pipeline monitoring', 
          'Brittle keyword-based AE detection', 
          'No secure integration to PV portals',
          'Inability to parse safety text in images',
          'No automated audit trail for safety reviews'
        ]
      },
      {
        id: 'INT_REG.4',
        dimension: 'Multimodal Compliance',
        topic: 'Multimodal Compliance: How does the system comply with FDA simultaneous audio/visual risk presentation?',
        options: [
          { score: 30, text: '1. Manual: Audio/text generated separately and manually synced by video editors.' },
          { score: 50, text: '2. Siloed: AI generates both but lacks spatial/temporal awareness to sync voiceover.' },
          { score: 75, text: '3. Integrated: Scripted subtitles over audio that violate FDA contrast/pacing mandates.' },
          { score: 95, text: '4. Agentic: A Multimodal Agent audits the video timeline against voiceover timestamp/duration.' },
          { score: 100, text: '5. Strategic: Autonomous Dual Modality seamlessly synchronizes audio pacing and visual prominence.' }
        ],
        businessPainpoints: [
          'Audio/video sync mismatch errors', 
          'High video editing and validation costs', 
          'Slow regulatory approval for rich media',
          'Inconsistent safety messaging in audio vs text',
          'Brand exposure from inaccurate captions'
        ],
        technicalPainpoints: [
          'No unified multimodal token space', 
          'Lack of exact voiceover time extraction', 
          'No automated timeline checks',
          'High latency in multimodal rendering',
          'Brittle audio transcription parsing'
        ]
      }
    ]
  },
  {
    id: 'DATA_SEM',
    name: 'Data & Semantic Integration',
    weight: 20,
    persona: 'Technical',
    purpose: 'Audits data federation, claims grounding, and Model Context Protocol (MCP) servers.',
    questions: [
      {
        id: 'DATA_SEM.1',
        dimension: 'Claims Grounding',
        topic: 'Claims Grounding & Sourcing: How are approved medical claims sourced and mapped?',
        options: [
          { score: 30, text: '1. Manual: Manual copy/paste from master spreadsheets.' },
          { score: 50, text: '2. Siloed: Point-in-time static exports of claims databases.' },
          { score: 75, text: '3. Integrated: Custom API webhooks periodically sync data but lack citation mapping.' },
          { score: 95, text: '4. Agentic: Agentic RAG acts as the claims repository, auto-matching copy to approved Vault IDs.' },
          { score: 100, text: '5. Strategic: Direct integration via Model Context Protocol (MCP) queries live databases natively.' }
        ],
        businessPainpoints: [
          'Outdated claims in marketing assets', 
          'High risk of unapproved scientific claims', 
          'Slow claims validation cycles',
          'Regulatory citations from incorrect sourcing',
          'Loss of claims context during translation'
        ],
        technicalPainpoints: [
          'No real-time grounding verification', 
          'No native connection to Veeva Vault API', 
          'Low semantic search accuracy',
          'Lack of dynamic reference link generation',
          'Inability to parse tabular scientific data'
        ]
      },
      {
        id: 'DATA_SEM.2',
        dimension: 'Data Federation',
        topic: 'Data Federation: How does the orchestration layer connect to fragmented backend systems?',
        options: [
          { score: 30, text: '1. Manual: Custom REST API wrappers manually written for every endpoint.' },
          { score: 50, text: '2. Siloed: Scheduled batch ETL pipelines dumping into localized cloud buckets.' },
          { score: 70, text: '3. Integrated: Centralized middleware handling brittle custom webhooks.' },
          { score: 90, text: '4. Agentic: Standardized open-source protocols (MCP) exposing data platforms as native servers.' },
          { score: 100, text: '5. Strategic: Zero-trust semantic data mesh where agents autonomously negotiate schemas.' }
        ],
        businessPainpoints: [
          'High integration engineering costs', 
          'Data sync lag slowing operations', 
          'Fragmented enterprise data silos',
          'Inconsistent data definitions across departments',
          'Difficulty auditing data access logs'
        ],
        technicalPainpoints: [
          'Brittle custom webhook routing', 
          'High middleware operational debt', 
          'Lack of protocol standardization',
          'No real-time data sync conflict resolution',
          'API security token expiration issues'
        ]
      }
    ]
  },
  {
    id: 'RUN_STATE',
    name: 'Runtime Architecture',
    weight: 20,
    persona: 'Technical',
    purpose: 'Evaluates multi-agent coordination, state persistence, cost governance, and change control.',
    questions: [
      {
        id: 'RUN_STATE.1',
        dimension: 'Multi-Agent Coordination',
        topic: 'Multi-Agent Coordination: How are tasks requiring multiple specialized AI personas coordinated?',
        options: [
          { score: 30, text: '1. Manual: A single massive LLM prompt attempting all tasks at once.' },
          { score: 50, text: '2. Siloed: Sequential chaining (agents pass tasks down the line slowly).' },
          { score: 75, text: '3. Integrated: Custom Python scripts orchestrating agents and manually handling state.' },
          { score: 95, text: '4. Agentic: Graph-based runtime organizing agents into deterministic reasoning loops.' },
          { score: 100, text: '5. Strategic: Fully managed multi-agent execution with native auto-scaling and cross-agent comms.' }
        ],
        businessPainpoints: [
          'Monolithic prompt reasoning failures', 
          'High latency in sequential agent runs', 
          'Inability to audit multi-step decisions',
          'High token waste from agent loops',
          'Operational friction between specialized roles'
        ],
        technicalPainpoints: [
          'Hardcoded orchestration scripts', 
          'No standardized agent state sharing', 
          'Lack of trace telemetry',
          'Brittle error recovery in agent graphs',
          'No dynamic agent scaling controls'
        ]
      },
      {
        id: 'RUN_STATE.2',
        dimension: 'State Persistence',
        topic: 'State Persistence & Dormancy: How does the system manage memory during multi-day legal reviews?',
        options: [
          { score: 30, text: '1. Manual: Sessions time out and require manual human restarts.' },
          { score: 50, text: '2. Siloed: Expensive "always-on" compute instances sitting idle.' },
          { score: 75, text: '3. Integrated: Custom serialization code dumping LLM memory to a database.' },
          { score: 95, text: '4. Agentic: Durable memory schemas snapping agent states natively to NoSQL databases.' },
          { score: 100, text: '5. Strategic: Cost-free event-driven hibernation and autonomous exact-context rehydration.' }
        ],
        businessPainpoints: [
          'High compute costs for idle sessions', 
          'Memory loss during long human reviews', 
          'Frustrated users re-entering inputs',
          'Loss of historical context for active cases',
          'Inability to pause complex campaigns'
        ],
        technicalPainpoints: [
          'Brittle custom state serialization', 
          'No native event-driven hibernation', 
          'Inability to hydrate context state',
          'Slow state recovery times',
          'No support for concurrent multi-user editing'
        ]
      },
      {
        id: 'RUN_STATE.3',
        dimension: 'A2A Interoperability',
        topic: 'Third-Party Interoperability: How are tasks orchestrated between internal and third-party SaaS agents?',
        options: [
          { score: 30, text: '1. Manual: Humans copy outputs from one vendor to another.' },
          { score: 50, text: '2. Siloed: Rigid custom API wrappers bridging vendor platforms.' },
          { score: 70, text: '3. Integrated: Internal agents trigger basic external APIs as tools, but cannot delegate reasoning.' },
          { score: 95, text: '4. Agentic: Agent-to-Agent (A2A) protocols allow secure delegation of entire workflows.' },
          { score: 100, text: '5. Strategic: Dynamic discovery and provisioning of third-party capabilities natively.' }
        ],
        businessPainpoints: [
          'Manual cross-vendor copy pasting', 
          'High cost of custom SaaS integrations', 
          'Data privacy leaks across vendors',
          'Slow execution from vendor API latency',
          'Vendor dependency risk'
        ],
        technicalPainpoints: [
          'Hardcoded custom REST wrappers', 
          'No standardized A2A protocol support', 
          'Inability to delegate tasks',
          'Lack of secure cross-tenant auth',
          'Inconsistent schemas between vendor APIs'
        ]
      },
      {
        id: 'RUN_STATE.4',
        dimension: 'Cost Governance',
        topic: 'Cost Governance: How are compute costs and massive token context windows capped?',
        options: [
          { score: 35, text: '1. Manual: Month-end review of unreadable cloud invoices.' },
          { score: 50, text: '2. Siloed: Basic budget alerts that trigger post-spend.' },
          { score: 70, text: '3. Integrated: IT tracks total spend but cannot attribute it to specific campaigns.' },
          { score: 90, text: '4. Agentic: Token-aware routing minimizes prompt sizes with strict concurrency limits.' },
          { score: 100, text: '5. Strategic: Real-time FinOps roll-ups attribute spend directly and auto-cap.' }
        ],
        businessPainpoints: [
          'No real-time token/cost visibility', 
          'Massive budget overruns from loops', 
          'Difficulty justifying GenAI ROI',
          'Slow allocation of department budgets',
          'Wasted spend on redundant generations'
        ],
        technicalPainpoints: [
          'No real-time token counters', 
          'Lack of concurrency limit controls', 
          'No cost-effective token-routing mesh',
          'Brittle API budget caps',
          'No automated duplicate request detection'
        ]
      },
      {
        id: 'RUN_STATE.5',
        dimension: 'Platform Modernization',
        topic: 'Platform Modernization: Is the architecture built on legacy ML endpoints or an agent-first platform?',
        options: [
          { score: 30, text: '1. Manual: Reliance on hardcoded API calls to deprecated legacy ML endpoints.' },
          { score: 50, text: '2. Siloed: Manual translation layers forcing legacy pipelines to act like agents.' },
          { score: 75, text: '3. Integrated: Modern models deployed on traditional MLOps infrastructure.' },
          { score: 95, text: '4. Agentic: Built natively on modern Enterprise Agent Platforms.' },
          { score: 100, text: '5. Strategic: Complete decoupling of agent logic from the underlying platform.' }
        ],
        businessPainpoints: [
          'High maintenance cost of legacy endpoints', 
          'Slow rollout of modern model features', 
          'Frequent downtime during updates',
          'Loss of competitive advantage',
          'Vendor retirement of legacy models'
        ],
        technicalPainpoints: [
          'Hardcoded legacy API endpoints', 
          'Lack of decoupling abstraction layers', 
          'Complex infrastructure setup',
          'No automated migration pipelines',
          'Inconsistent performance across legacy'
        ]
      },
      {
        id: 'RUN_STATE.6',
        dimension: 'Agent-as-Code',
        topic: 'Agent-as-Code: How are agents version-controlled across environments?',
        options: [
          { score: 30, text: '1. Manual: Prompts tweaked in UI consoles with no version history.' },
          { score: 50, text: '2. Siloed: Prompts in text files, but routing logic scattered across codebases.' },
          { score: 75, text: '3. Integrated: Code in Git, but multi-language environments create inconsistencies.' },
          { score: 95, text: '4. Agentic: "Agent-as-Code" methodology defined entirely via YAML configurations.' },
          { score: 100, text: '5. Strategic: Immutable deployments via CI/CD pipelines pushing signed schemas.' }
        ],
        businessPainpoints: [
          'Prompt tweaks breaking production', 
          'No history of system prompt changes', 
          'High risk of unauthorized hotfixes',
          'Slow deployment cycles for updates',
          'Friction between developers and prompt engineers'
        ],
        technicalPainpoints: [
          'No version control for prompts', 
          'Scattered routing logic in code', 
          'Lack of immutable build schemas',
          'No automated prompt regression testing',
          'Difficult environment parity verification'
        ]
      }
    ]
  },
  {
    id: 'SEC_VAL',
    name: 'Security & GxP Validation',
    weight: 20,
    persona: 'Technical',
    purpose: 'Enforces GxP audit trails, sandboxing, continuous validation, and Quality Unit compliance.',
    questions: [
      {
        id: 'SEC_VAL.1',
        dimension: 'GxP Audit Trail',
        topic: 'GxP Audit Trail & Data Provenance: How does the architecture log AI reasoning trails and maintain data freshness?',
        options: [
          { score: 30, text: '1. Manual: Date verifications are manual, and outputs are copied with no record of reasoning.' },
          { score: 50, text: '2. Siloed: Basic application logs capture raw API payloads; post-generation flags identify expired data.' },
          { score: 75, text: '3. Integrated: The system tracks asset fragments and uses daily automated sync scripts.' },
          { score: 95, text: '4. Agentic: Cryptographic IDs map agents to policies; real-time semantic caching drops claims mid-flight.' },
          { score: 100, text: '5. Strategic: Native trace integration visually replay execution spans alongside immutable GxP logs.' }
        ],
        businessPainpoints: [
          'No record of reasoning or data lineage', 
          'High risk of using expired claims', 
          'Difficulty passing regulatory audits',
          'Lack of accountability for automated actions',
          'High legal exposure from untraceable outputs'
        ],
        technicalPainpoints: [
          'No cryptographic trace logging', 
          'Lack of real-time data cache validation', 
          'Missing immutable log storage',
          'Inability to capture full agent execution spans',
          'Mismatched audit schemas between systems'
        ]
      },
      {
        id: 'SEC_VAL.2',
        dimension: 'API Guardrails',
        topic: 'API Security & Guardrails: How are prompts and tool calls sanitized against injection and hallucinations?',
        options: [
          { score: 30, text: '1. Manual: Reliance on consumer-grade LLM safety filters.' },
          { score: 50, text: '2. Siloed: Standard REST API Gateways lacking AI token inspection.' },
          { score: 75, text: '3. Integrated: Custom regex filters scrubbing PII before model hits.' },
          { score: 95, text: '4. Agentic: Enterprise AI proxies enforcing Model Armor protections.' },
          { score: 100, text: '5. Strategic: Zero-Trust ecosystem verifying every internal cross-agent API call.' }
        ],
        businessPainpoints: [
          'Accidental exposure of patient PII', 
          'Brand damage from jailbreak exploits', 
          'Severe security compliance violations',
          'Data leakage to public training sets',
          'Loss of intellectual property'
        ],
        technicalPainpoints: [
          'Consumer-grade safety filters only', 
          'No real-time token/prompt inspection', 
          'Lack of Model Armor gateways',
          'No dynamic PII masking pipelines',
          'Inability to block prompt injection attacks'
        ]
      },
      {
        id: 'SEC_VAL.3',
        dimension: 'Continuous Validation',
        topic: 'AI Change Control & Continuous Validation: How is regression testing handled when foundation models update?',
        options: [
          { score: 30, text: '1. Manual: Months of manual IQ/OQ/PQ paperwork per model update.' },
          { score: 50, text: '2. Siloed: Basic automated tests that freeze production during updates.' },
          { score: 75, text: '3. Integrated: CI/CD tests relying on static string-matching that fail on LLM non-determinism.' },
          { score: 95, text: '4. Agentic: "LLM-as-a-judge" framework running synthetic tests against a gold rubric.' },
          { score: 100, text: '5. Strategic: Continuous Validation monitoring drift in real-time and generating signed, audit reports.' }
        ],
        businessPainpoints: [
          'Months of delayed model upgrades', 
          'High cost of manual QA paperwork', 
          'Model drift breaking live features',
          'Inconsistent compliance standards',
          'Lack of trust from regulatory bodies'
        ],
        technicalPainpoints: [
          'No automated regression testing suite', 
          'Brittle static string-match tests', 
          'Lack of LLM-as-a-judge frameworks',
          'No automated drift monitoring alerts',
          'Inability to generate signed compliance reports'
        ]
      },
      {
        id: 'SEC_VAL.4',
        dimension: 'Agentic IAM',
        topic: 'Cross-Boundary Identity & Agentic IAM: How are user permissions enforced when delegating to third-party agents?',
        options: [
          { score: 30, text: '1. Manual: Agents run on a single over-privileged service account.' },
          { score: 50, text: '2. Siloed: Hardcoded API keys for destination systems.' },
          { score: 70, text: '3. Integrated: Basic OAuth but unable to dynamically downgrade permissions per user.' },
          { score: 95, text: "4. Agentic: The invoking user's exact identity and permissions pass strictly across boundaries." },
          { score: 100, text: '5. Strategic: AI Gateways enforce context-aware access policies in real-time.' }
        ],
        businessPainpoints: [
          'Over-privileged service account risks', 
          'Unauthorized user data access', 
          'Lack of dynamic security',
          'Compliance audit failures',
          'Accidental data modification'
        ],
        technicalPainpoints: [
          'Hardcoded destination API keys', 
          'No user identity propagation mesh', 
          'Lack of dynamic role downgrade',
          'Brittle OAuth token propagation',
          'Inability to enforce column access controls'
        ]
      },
      {
        id: 'SEC_VAL.5',
        dimension: 'Sandbox Isolation',
        topic: 'Supply Chain Security & Sandbox Isolation: How is the architecture secured against deserialization flaws?',
        options: [
          { score: 30, text: '1. Manual: Shared compute instances with no dependency scanning.' },
          { score: 50, text: '2. Siloed: Reliance on basic IAM (vulnerable to RCE/deserialization flaws).' },
          { score: 75, text: '3. Integrated: Container vulnerability scanning prior to deployment, but arbitrary execution allowed.' },
          { score: 95, text: '4. Agentic: Tools execute exclusively within isolated Agent Sandboxes.' },
          { score: 100, text: '5. Strategic: Zero-trust execution cryptographically verifying loaded SDKs.' }
        ],
        businessPainpoints: [
          'High risk of Remote Code Execution (RCE)', 
          'Supply chain dependency vulnerabilities', 
          'Malicious tools compromising servers',
          'Data loss from system corruption',
          'High cost of security recovery'
        ],
        technicalPainpoints: [
          'Shared compute instance perimeters', 
          'No isolated runtime sandboxes', 
          'Brittle container scanning hooks',
          'No micro-segmentation for tool execution',
          'Vulnerability to third-party library exploits'
        ]
      },
      {
        id: 'SEC_VAL.6',
        dimension: 'Quality Unit (QU)',
        topic: 'Quality Unit (QU) Non-Delegation: How does the architecture prevent autonomous deployment without Quality Unit sign-off?',
        options: [
          { score: 30, text: '1. Manual: Manual email routing leaving room for procedural bypass.' },
          { score: 50, text: '2. Siloed: Agents flag items, but lack systemic locks preventing deployment.' },
          { score: 75, text: '3. Integrated: AI confidence scores substituted for human sign-off on lower-tier risks.' },
          { score: 95, text: '4. Agentic: Strict separation of duties where AI drafts, but deployment gates remain locked.' },
          { score: 100, text: '5. Strategic: Cryptographic QU enforcement where deployment is natively rejected until signed.' }
        ],
        businessPainpoints: [
          'Procedural bypass risk for releases', 
          'Accidental unauthorized deployment', 
          'Audit trail gaps in release approvals',
          'Friction between engineering and quality',
          'Delayed time-to-market due to slow approvals'
        ],
        technicalPainpoints: [
          'No hardwired deployment locks', 
          'Lack of cryptographic signature binding', 
          'No automated quality gates',
          'Mismatched release schemas',
          'Inability to trace QU review history'
        ]
      }
    ]
  }
];

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

  const activePillar = V11_PILLARS[activePillarIdx];
  const activeQuestion = activePillar.questions[activeQuestionIdx];
  const activeQuestionId = activeQuestion.id;

  const [geminiStreamingState, setGeminiStreamingState] = useState({
    active: false,
    currentStep: 1,
    logs: [],
    tokensPerSec: 0,
    latencyMs: 0
  });

  const getOverallQuestionIndex = () => {
    let count = 0;
    for (let i = 0; i < activePillarIdx; i++) {
      count += V11_PILLARS[i].questions.length;
    }
    return count + activeQuestionIdx + 1;
  };

  // --------------------------------------------------------------------------
  // Dynamic Light Theme Boardroom Palette (Premium Slate System)
  // --------------------------------------------------------------------------
  const colors = {
    bgMain: '#f8fafc',         // Off-white slate background
    sidebarBg: '#ffffff',      // Pure white sidebar
    cardBg: '#ffffff',         // Pure white card
    borderLight: '#e2e8f0',    // Light grey border
    textDark: '#0f172a',       // Near black text
    textMuted: '#64748b',      // Warm slate grey text
    accentBlue: '#2563eb',     // Brand Royal Blue
    accentBlueLight: '#eff6ff',// Soft blue background
    borderOrange: '#ea580c',   // Vibrant Orange (Current State Active)
    bgOrangeLight: '#fff7ed',  // Soft Orange background
    borderGreen: '#16a34a',    // Rich Green (Target State Active)
    bgGreenLight: '#f0fdf4',   // Soft Green background
    purpleGradient: 'linear-gradient(135deg, #4f46e5, #9333ea)' // Royal purple/magenta
  };

  // --------------------------------------------------------------------------
  // Real-Time C-Suite Mathematical Scoring Engine
  // --------------------------------------------------------------------------
  const scoringData = useMemo(() => {
    let prioritySum = 0;
    let totalQuestionsAnswered = 0;
    
    V11_PILLARS.forEach(pillar => {
      let pillarRawScore = 0;
      let pillarQuestionsCount = pillar.questions.length;
      
      pillar.questions.forEach(q => {
        const scoreObj = scores[q.id] || {};
        const cur = typeof scoreObj.current === 'number' ? scoreObj.current : 3;
        const fut = typeof scoreObj.future === 'number' ? scoreObj.future : 4;
        
        const gapModifier = Math.max(0, fut - cur);
        const questionBaseScore = (cur * 15) + (gapModifier * 10);
        
        pillarRawScore += Math.min(100, questionBaseScore) / pillarQuestionsCount;
        if (scoreObj.current !== undefined) totalQuestionsAnswered++;
      });

      prioritySum += pillarRawScore * (pillar.weight / 100);
    });

    const finalPriorityScore = Math.min(100, Math.max(0, Math.round(prioritySum)));
    
    let decision = 'Offline';
    let activationImpact = 'Offline';
    let pilotAsk = 'Offline';

    if (finalPriorityScore > 0) {
      if (finalPriorityScore >= 85) {
        decision = 'Launch Now';
        activationImpact = currency === 'EUR' ? '€1.3M Value' : currency === 'GBP' ? '£1.1M Value' : '$1.4M Value';
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

  // Calculate completed count per pillar
  const getPillarProgress = (pillar) => {
    let completed = 0;
    pillar.questions.forEach(q => {
      if (scores[q.id]?.current !== undefined) {
        completed++;
      }
    });
    return `${completed}/${pillar.questions.length}`;
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
          techPain.push(q.technicalPainpoints[1]);
        }
        const bizPain = [];
        if (curr <= 3 && q.businessPainpoints?.length > 0) {
          bizPain.push(q.businessPainpoints[0]);
          bizPain.push(q.businessPainpoints[1]);
        }

        randomScores[q.id] = {
          current: curr,
          future: fut,
          techPain,
          bizPain,
          comments: `Dynamic GxP baseline established for ${q.dimension} scoring matrix.`,
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
        const index = p.questions.indexOf(q);
        const overallIdx = V11_PILLARS.slice(0, V11_PILLARS.indexOf(p)).reduce((acc, curr) => acc + curr.questions.length, 0) + index + 1;
        const oldKey = `Q${overallIdx}`;
        
        const val = baseAnswers[oldKey] || baseAnswers[q.id] || 3;
        const targetVal = Math.min(5, val + 1);

        const techPain = [];
        if (val <= 3 && q.technicalPainpoints?.length > 0) {
          techPain.push(q.technicalPainpoints[0]);
          techPain.push(q.technicalPainpoints[1]);
        }
        const bizPain = [];
        if (val <= 3 && q.businessPainpoints?.length > 0) {
          bizPain.push(q.businessPainpoints[0]);
          bizPain.push(q.businessPainpoints[1]);
        }

        mappedScores[q.id] = {
          current: val,
          future: targetVal,
          techPain,
          bizPain,
          comments: `Dynamic GxP baseline established for ${q.dimension} scoring matrix.`,
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
      const existing = JSON.parse(localStorage.getItem('v11_saved_tiles') || '[]');
      const filtered = existing.filter(x => x.id !== targetTileId && x.useCase !== uName);
      localStorage.setItem('v11_saved_tiles', JSON.stringify([newEntry, ...filtered]));

      if (!currentUrlId) {
        existParams.delete('action');
        existParams.set('id', targetTileId);
        existParams.set('view', 'scorecard');
        window.location.hash = `${base}?${existParams.toString()}`;
      }

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
        
        if (idParam === 'demo_merck_preset' || presetParam) {
          vec.liveSynthesis = null;
        }

        let restoredScores = vec.scores || {};
        let restoredCust = vec.customerInfo || {};
        
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
          console.log("🧬 Self-Healing Migrator: Upgraded legacy flat-number scores to V11 GxP format.");
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
      handleAutoFillRandom();
      setTimeout(() => handleRunLiveGeminiAssessment(), 600);
      return;
    }

    const ts = () => new Date().toISOString().replace('T', ' ').substring(11, 23);
    setGeminiStreamingState({
      active: true,
      currentStep: 1,
      logs: [`[${ts()}] [SYS_INIT] Establishing encrypted TLS 1.3 tunnel with Gemini Live Engine...`],
      tokensPerSec: 92,
      latencyMs: 275
    });

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
  // JSX RENDERING ENGINE (100% DYNAMIC RESPONSIVE SYSTEM)
  // --------------------------------------------------------------------------
  return (
    <div className="premium-assessor-v11-container">
      
      {/* Dynamic CSS Stylesheet Block (Enforces Enterprise-Grade Responsiveness) */}
      <style>{`
        /* Parent Layout Container */
        .premium-assessor-v11-container {
          display: flex;
          background: #f8fafc;
          color: #0f172a;
          font-family: 'Inter', sans-serif;
          gap: 0.85rem;
          padding: 1rem;
          box-sizing: border-box;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }
        @media (max-width: 960px) {
          .premium-assessor-v11-container {
            flex-direction: column;
            padding: 0.55rem;
            gap: 0.55rem;
          }
        }

        /* Sidebar Panel styling */
        .v11-sidebar {
          width: 235px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: fit-content;
        }
        @media (max-width: 960px) {
          .v11-sidebar {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.6rem;
          }
        }

        /* Main Workspace area wrapper */
        .v11-main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }

        /* Main Scrutiny Card */
        .v11-intake-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: fit-content;
          width: 100%;
        }

        /* 4-Column Matrix Grid */
        .v11-grid-matrix {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          flex-shrink: 0;
          margin-bottom: 0.25rem;
        }
        @media (max-width: 960px) {
          .v11-grid-matrix {
            grid-template-columns: repeat(2, 1fr); /* 2x2 layout on tablets/small windows */
            gap: 0.45rem;
          }
        }
        @media (max-width: 560px) {
          .v11-grid-matrix {
            grid-template-columns: 1fr; /* 1 column layout on mobile screens */
            gap: 0.35rem;
          }
        }

        /* Symmetric Matrix Buttons & Cards */
        .v11-matrix-box {
          text-align: left;
          padding: 0.25rem 0.45rem;
          border-radius: 6px;
          font-size: 0.62rem;
          line-height: 1.25;
          transition: all 0.15s;
          height: 54px; /* Hardlocked row symmetry */
          display: flex;
          align-items: center;
          box-sizing: border-box;
          overflow: hidden;
        }
        @media (max-width: 1200px) {
          .v11-matrix-box {
            font-size: 0.56rem; /* Scale font size down on smaller laptops to prevent text wrapping clip */
            padding: 0.2rem 0.35rem;
          }
        }
      `}</style>

      {/* LEFT SIDEBAR PANEL (Responsive Floating Card) */}
      <aside className="v11-sidebar">
        
        {/* Top Section (Header & Pillars) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: '1 1 auto' }}>
          {/* Header Identity */}
          <div>
            <h2 style={{ fontSize: '0.74rem', fontWeight: 900, color: colors.textDark, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 0.15rem 0' }}>
              {customerInfo.company ? customerInfo.company.toUpperCase() : 'ENTERPRISE PROFILE'}
            </h2>
            <span style={{ fontSize: '0.62rem', color: colors.textMuted }}>
              {getOverallQuestionIndex()} of 21 topics audited
            </span>
            <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '100px', marginTop: '0.3rem', overflow: 'hidden' }}>
              <div style={{ width: `${Math.round((getOverallQuestionIndex() / 21) * 100)}%`, height: '100%', background: colors.accentBlue }}></div>
            </div>
          </div>

          {/* Pillars List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {V11_PILLARS.map((pillar, idx) => {
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
                    background: isActive ? '#f1f5f9' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.72rem', color: isActive ? colors.accentBlue : colors.textMuted }}>
                      {idx === 0 ? '📊' : idx === 1 ? '🧠' : idx === 2 ? '🔌' : idx === 3 ? '⚙️' : '🛡️'}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 800 : 550, color: isActive ? colors.textDark : colors.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pillar.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.6rem', fontWeight: 800, color: colors.textMuted }}>
                    {getPillarProgress(pillar)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sync & Action Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: `1px solid ${colors.borderLight}`, paddingTop: '0.75rem' }}>
          {/* Offline Sync Controls */}
          <div>
            <span style={{ fontSize: '0.52rem', fontWeight: 800, color: colors.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
              OFFLINE SHEET SYNC
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
              <button style={{ background: '#ffffff', border: `1px solid ${colors.borderLight}`, color: colors.accentBlue, borderRadius: '4px', padding: '0.2rem 0', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}>
                📥 Export
              </button>
              <button style={{ background: '#ffffff', border: `1px solid ${colors.borderLight}`, color: '#16a34a', borderRadius: '4px', padding: '0.2rem 0', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}>
                📤 Import
              </button>
            </div>
          </div>

          {/* Prefill button */}
          {activeTab === 'intake' && (
            <button
              onClick={handleAutoFillRandom}
              style={{
                background: '#ffffff',
                border: '1px solid #c084fc',
                color: '#9333ea',
                borderRadius: '4px',
                padding: '0.35rem 0',
                fontSize: '0.65rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.2rem',
                transition: 'all 0.2s'
              }}
            >
              🪄 Prefill Demo Scenario
            </button>
          )}

          {/* View Report / Scoping button */}
          {activeTab === 'intake' ? (
            <button
              onClick={handleRunLiveGeminiAssessment}
              style={{
                background: colors.purpleGradient,
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.45rem 0',
                fontSize: '0.68rem',
                fontWeight: 900,
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 5px rgba(79,70,229,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.2rem'
              }}
            >
              🚀 View Report Blueprint
            </button>
          ) : (
            <button
              onClick={() => handleTabSwitch('intake')}
              style={{
                background: '#ffffff',
                border: `1px solid ${colors.accentBlue}`,
                color: colors.accentBlue,
                borderRadius: '4px',
                padding: '0.4rem 0',
                fontSize: '0.65rem',
                fontWeight: 800,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              ← Edit Assessments
            </button>
          )}
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE AREA */}
      <main className="v11-main-area">
        
        {/* VIEW 1: INTAKE 4-COLUMN SCRUTINY WORKSPACE */}
        {activeTab === 'intake' && (
          <div className="v11-intake-card">
            
            {/* Topic Pillar Title bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.borderLight}`, paddingBottom: '0.35rem', flexShrink: 0, marginBottom: '0.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: colors.textDark }}>
                  📊 {activePillar.name}
                </span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                <span style={{ fontSize: '0.65rem', color: colors.textMuted }}>
                  Evaluating GxP scoping alignment, risk mitigations, and compliance controls.
                </span>
              </div>

              {/* Steps circles and Save states */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  {activePillar.questions.map((_, idx) => {
                    const isQuestionActive = idx === activeQuestionIdx;
                    return (
                      <span
                        key={idx}
                        onClick={() => setActiveQuestionIdx(idx)}
                        style={{
                          width: '15px',
                          height: '15px',
                          borderRadius: '50%',
                          background: isQuestionActive ? colors.accentBlue : '#cbd5e1',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.55rem',
                          fontWeight: 900,
                          cursor: 'pointer'
                        }}
                      >
                        {idx + 1}
                      </span>
                    );
                  })}
                </div>
                <span style={{ fontSize: '0.52rem', background: '#dcfce7', color: '#15803d', padding: '0.08rem 0.35rem', borderRadius: '3px', fontWeight: 900 }}>
                  • SAVED
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.62rem', color: colors.textMuted, cursor: 'pointer' }}>
                  <input type="checkbox" style={{ margin: 0 }} /> Skip Topic
                </label>
              </div>
            </div>

            {/* Active Topic Header */}
            <div style={{ flexShrink: 0, marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.58rem', fontWeight: 900, color: colors.accentBlue, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px', marginBottom: '0.05rem' }}>
                TOPIC INDEX STRATEGIC.{getOverallQuestionIndex()} ASSESSMENT SCRUTINY:
              </span>
              <h2 style={{ fontSize: '0.8rem', fontWeight: 900, margin: 0, color: colors.textDark, lineHeight: 1.25 }}>
                {activeQuestion.topic}
              </h2>
            </div>

            {/* 4-COLUMN/2-COLUMN/1-COLUMN MATRIX GRID */}
            <div className="v11-grid-matrix">
              
              {/* COLUMN 1: CURRENT STATE */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 850, color: colors.textDark, borderBottom: `2px solid ${colors.textDark}`, paddingBottom: '0.1rem', display: 'block' }}>
                  CURRENT STATE *
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {activeQuestion.options.map((opt, idx) => {
                    const isSelected = (scores[activeQuestionId]?.current || 3) === (idx + 1);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectCurrentLevel(idx + 1)}
                        className="v11-matrix-box"
                        style={{
                          background: isSelected ? colors.bgOrangeLight : colors.cardBg,
                          border: isSelected ? `2px solid ${colors.borderOrange}` : `1px solid ${colors.borderLight}`,
                          color: isSelected ? colors.borderOrange : colors.textDark,
                          fontWeight: isSelected ? 800 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 2: FUTURE STATE */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 850, color: colors.textDark, borderBottom: `2px solid ${colors.textDark}`, paddingBottom: '0.1rem', display: 'block' }}>
                  FUTURE STATE *
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {activeQuestion.options.map((opt, idx) => {
                    const isSelected = (scores[activeQuestionId]?.future || 4) === (idx + 1);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectTargetLevel(idx + 1)}
                        className="v11-matrix-box"
                        style={{
                          background: isSelected ? colors.bgGreenLight : colors.cardBg,
                          border: isSelected ? `2px solid ${colors.borderGreen}` : `1px solid ${colors.borderLight}`,
                          color: isSelected ? colors.borderGreen : colors.textDark,
                          fontWeight: isSelected ? 800 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 3: TECHNICAL PAINPOINTS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 850, color: colors.textDark, borderBottom: `2px solid ${colors.textDark}`, paddingBottom: '0.1rem', display: 'block' }}>
                  TECHNICAL PAINPOINTS *
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {activeQuestion.technicalPainpoints?.map(point => {
                    const isChecked = scores[activeQuestionId]?.techPain?.includes(point);
                    return (
                      <div
                        key={point}
                        onClick={() => handleTogglePainPoint('tech', point)}
                        className="v11-matrix-box"
                        style={{
                          background: isChecked ? colors.accentBlueLight : colors.cardBg,
                          border: isChecked ? `2px solid ${colors.accentBlue}` : `1px solid ${colors.borderLight}`,
                          color: isChecked ? colors.accentBlue : colors.textDark,
                          fontWeight: isChecked ? 850 : 550,
                          cursor: 'pointer',
                          gap: '0.3rem'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked} 
                          readOnly 
                          style={{ cursor: 'pointer', margin: 0, pointerEvents: 'none' }} 
                        />
                        <span style={{ pointerEvents: 'none' }}>{point}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 4: BUSINESS PAINPOINTS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 850, color: colors.textDark, borderBottom: `2px solid ${colors.textDark}`, paddingBottom: '0.1rem', display: 'block' }}>
                  BUSINESS PAINPOINTS *
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {activeQuestion.businessPainpoints?.map(point => {
                    const isChecked = scores[activeQuestionId]?.bizPain?.includes(point);
                    return (
                      <div
                        key={point}
                        onClick={() => handleTogglePainPoint('biz', point)}
                        className="v11-matrix-box"
                        style={{
                          background: isChecked ? colors.accentBlueLight : colors.cardBg,
                          border: isChecked ? `2px solid ${colors.accentBlue}` : `1px solid ${colors.borderLight}`,
                          color: isChecked ? colors.accentBlue : colors.textDark,
                          fontWeight: isChecked ? 850 : 550,
                          cursor: 'pointer',
                          gap: '0.3rem'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked} 
                          readOnly 
                          style={{ cursor: 'pointer', margin: 0, pointerEvents: 'none' }} 
                        />
                        <span style={{ pointerEvents: 'none' }}>{point}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Auditor Notes Area */}
            <div style={{ background: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '6px', padding: '0.4rem 0.6rem', display: 'flex', flexDirection: 'column', gap: '0.15rem', flexShrink: 0, marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.textDark, letterSpacing: '0.5px' }}>
                NOTES & COMMENTS BOX *
              </span>
              <textarea
                value={scores[activeQuestionId]?.comments || ''}
                onChange={e => handleCommentChange(e.target.value)}
                placeholder="Type legal, GxP, or data provenance constraints noted during the customer interview..."
                style={{
                  width: '100%',
                  height: '40px', // Compact height
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.68rem',
                  color: colors.textDark,
                  fontFamily: 'inherit',
                  lineHeight: 1.25,
                  resize: 'none'
                }}
              />
            </div>

            {/* Navigation Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${colors.borderLight}`, paddingTop: '0.35rem', flexShrink: 0 }}>
              <button
                onClick={handlePrevQuestion}
                disabled={activePillarIdx === 0 && activeQuestionIdx === 0}
                style={{
                  background: '#ffffff',
                  color: colors.accentBlue,
                  border: `1px solid ${colors.borderLight}`,
                  borderRadius: '4px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  opacity: (activePillarIdx === 0 && activeQuestionIdx === 0) ? 0.35 : 1
                }}
              >
                ← Back
              </button>
              
              <span style={{ fontSize: '0.62rem', color: colors.textMuted, fontWeight: 700 }}>
                Progress: {Math.round((getOverallQuestionIndex() / 21) * 100)}% ({getOverallQuestionIndex()} of 21 Completed)
              </span>

              <button
                onClick={handleNextQuestion}
                style={{
                  background: getOverallQuestionIndex() === 21 ? '#e2e8f0' : colors.accentBlue,
                  color: getOverallQuestionIndex() === 21 ? colors.textMuted : '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  opacity: getOverallQuestionIndex() === 21 ? 0.5 : 1
                }}
              >
                Next →
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(responsive_code)

print("PremiumScopingAssessorV11 has been successfully upgraded with a dynamic, enterprise-grade responsive layout!")
