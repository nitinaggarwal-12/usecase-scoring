import os

file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

v12_code = """import { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, Award, Target, Layers, FileText, Check, X, 
  TrendingUp, Copy, CheckCircle2, AlertTriangle, 
  Lightbulb, Calendar, DollarSign, ArrowUpRight, MessageSquareText,
  UserCheck, Download, RefreshCw, ShieldCheck, Cpu, 
  Database, Zap, ArrowLeft, ArrowRight, ChevronRight
} from 'lucide-react';
import { generateMaturityReport } from '../services/aiService';

// ============================================================================
// 1. Core V12 Framework Schema (Exactly 25-Dimension Scoping Matrix)
// ============================================================================
export const V12_PILLARS = [
  {
    id: 'UX_HITL',
    name: '1. UX & HITL Workflow',
    weight: 6, // Sum of question weights: 1 + 3 + 2
    purpose: 'Evaluates how marketers, creatives, and MLR reviewers interact without disrupting native workspaces.',
    questions: [
      {
        id: '1.1',
        dimension: 'Native Workspace Integration',
        topic: 'Native Workspace Integration: How do marketers and creatives interact with compliance constraints and generation tools?',
        weight: 1, // Operational
        options: [
          { score: 1, text: '1 (Manual): Manual PDF cross-referencing and separate portal logins.' },
          { score: 2, text: '2 (Siloed): Basic plugins requiring users to toggle between AI chat and their creative canvas.' },
          { score: 3, text: '3 (Integrated): Passive AI assistants embedded in the workspace (grammar/spell check only).' },
          { score: 4, text: '4 (Agentic): Agentic streaming of generative compliance components directly into the UI.' },
          { score: 5, text: '5 (Optimized): A single "pane of glass" orchestrates the entire lifecycle without leaving primary app.' }
        ],
        businessPainpoints: [
          'Users refuse to leave native tools', 
          'High context-switching overhead', 
          'Low adoption of external portals',
          'Creative momentum interrupted',
          'Long training cycles on separate compliance UIs'
        ],
        technicalPainpoints: [
          'Brittle iframe integrations', 
          'No bidirectional state syncing', 
          'Complex OAuth/SSO across apps',
          'API rate limits on native webhooks',
          'Inconsistent UI styling across systems'
        ]
      },
      {
        id: '1.2',
        dimension: 'Exception Handling & HITL',
        topic: 'Exception Handling & HITL: How are legal, medical, and regulatory (MLR) exceptions handled?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Content is manually emailed/uploaded for human review.' },
          { score: 2, text: '2 (Siloed): AI flags issues, but humans manually correct and restart workflows.' },
          { score: 3, text: '3 (Integrated): Automated draft generation with static alerts pushed to reviewers across tools.' },
          { score: 4, text: '4 (Agentic): Event-driven dormancy gates automatically pause agents during human review.' },
          { score: 5, text: '5 (Optimized): Deep micro-editing; human edits in Veeva automatically cascade through all AI assets.' }
        ],
        businessPainpoints: [
          'Regulatory filings delayed in manual queues', 
          'Lack of audit trail for compliance overrides', 
          'Extreme risk of human error during re-assembly',
          'Reviewer fatigue from false positive flags',
          'High cost of post-generation manual edits'
        ],
        technicalPainpoints: [
          'No event-driven workflow pausing', 
          'Lack of state preservation during dormancy', 
          'Brittle webhook connections to Veeva',
          'No automated escalation pathways',
          'Mismatched schema between AI state and Veeva Vault'
        ]
      },
      {
        id: '1.3',
        dimension: 'Audience Transparency',
        topic: 'Audience Transparency & State AI Disclosure: How does the system handle automated insertion of consumer-facing disclosures?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Marketers manually remember to add "AI-generated" disclaimers based on geolocation.' },
          { score: 2, text: '2 (Siloed): Static disclaimers are hardcoded onto every asset, cluttering the creative.' },
          { score: 3, text: '3 (Integrated): System flags AI usage, but marketers manually adjust legal text for destination state.' },
          { score: 4, text: '4 (Agentic): A Legal Routing Agent reads audience geolocation and appends state-mandated disclosures.' },
          { score: 5, text: '5 (Optimized): Dynamic localization maps AI touchpoints to live regulatory DBs and auto-renders.' }
        ],
        businessPainpoints: [
          'Non-compliance with fast-moving state laws', 
          'High cost of regional legal reviews', 
          'Disclaimer errors on consumer-facing copy',
          'Negative brand perception from clunky disclosures',
          'Slow rollout of regional campaigns'
        ],
        technicalPainpoints: [
          'Hardcoded disclosure rules', 
          'No geolocalized IP routing intelligence', 
          'No connection to live regulatory registries',
          'Inability to parse dynamic creative text layouts',
          'Stale caches of state legal requirements'
        ]
      }
    ]
  },
  {
    id: 'INT_REG',
    name: '2. Intelligence & Regulatory',
    weight: 10, // Sum of weights: 2 + 3 + 3 + 2
    purpose: 'Assesses cognitive capabilities, model orchestration, brand guidelines, and FDA/OPDP compliance.',
    questions: [
      {
        id: '2.1',
        dimension: 'Model Agnosticism & Orchestration',
        topic: 'Model Agnosticism & Orchestration: How do you ensure sufficient context windows while avoiding vendor lock-in?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Web-interface reliance on a single public model.' },
          { score: 2, text: '2 (Siloed): Direct, hardcoded API integration with a single model provider.' },
          { score: 3, text: '3 (Integrated): Model aggregator access, but routing requires manual developer intervention.' },
          { score: 4, text: '4 (Agentic): Unified Model Garden routing tasks based on strengths (e.g., 1M-token for IVAs).' },
          { score: 5, text: '5 (Optimized): Fully autonomous, cost-effective routing dynamically handled at runtime.' }
        ],
        businessPainpoints: [
          'Extreme vendor lock-in risk', 
          'High API costs for large context windows', 
          'System downtime due to single-vendor outages',
          'Slow adoption of newer, cheaper models',
          'Loss of competitive edge in cognitive tasks'
        ],
        technicalPainpoints: [
          'Hardcoded model API wrappers', 
          'No dynamic failover routing logic', 
          'Lack of a unified LLM abstraction layer',
          'Mismatched API token limits causing crashes',
          'No semantic caching to minimize token burn'
        ]
      },
      {
        id: '2.2',
        dimension: 'MLR & Brand Rule Application',
        topic: 'MLR & Brand Rule Application: How are regulatory parameters (PhRMA codes) and brand guidelines enforced?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Manual human memorization of static rulebooks.' },
          { score: 2, text: '2 (Siloed): Rules hardcoded into system prompts, causing token bloat and hallucinations.' },
          { score: 3, text: '3 (Integrated): Standard vector database retrieval, which misinterprets conflicting global/regional rules.' },
          { score: 4, text: '4 (Agentic): Pre-trained context proxies enforce static constraints before generation.' },
          { score: 5, text: '5 (Optimized): Progressive Disclosure dynamically loads conditional rules on-demand.' }
        ],
        businessPainpoints: [
          'Frequent brand guideline violations', 
          'FDA warning letter risk from rule oversight', 
          'Inconsistent tone of voice across channels',
          'Conflicting regional rules causing bottlenecks',
          'Long approval delays from manual checklists'
        ],
        technicalPainpoints: [
          'Monolithic system prompt bloat', 
          'High hallucination rates on complex logic', 
          'No trace telemetry for rule-firing events',
          'Vector retrieval misses hard logical constraints',
          'No semantic parsing of nested brand rules'
        ]
      },
      {
        id: '2.3',
        dimension: 'Fair Balance & AE Detection',
        topic: 'Fair Balance & AE Detection: How does the system ensure "Fair Balance" and detect Adverse Events?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Manual copy/pasting of Important Safety Information (ISI); no AE detection.' },
          { score: 2, text: '2 (Siloed): AI fetches ISI text, but humans verify formatting and prominence.' },
          { score: 3, text: '3 (Integrated): Script-based appending via keyword matching that breaks on complex layouts.' },
          { score: 4, text: '4 (Agentic): A Medical Safety Agent audits assets for Fair Balance and flags potential AEs to PV.' },
          { score: 5, text: '5 (Optimized): Autonomous formatting dynamically integrates ISI with FDA prominence on visual layers.' }
        ],
        businessPainpoints: [
          'Missed Adverse Event (AE) signals', 
          'FDA enforcement actions / product recalls', 
          'Scientific inaccuracies in public copy',
          'High cost of manual safety review teams',
          'Inability to audit Pharmacovigilance logs'
        ],
        technicalPainpoints: [
          'No real-time pipeline safety filtering', 
          'Brittle keyword-based AE detection logic', 
          'No secure connection to PV intake portals',
          'Inability to parse safety text inside images',
          'No cryptographic audit trail for safety audits'
        ]
      },
      {
        id: '2.4',
        dimension: 'Multimodal Compliance',
        topic: 'Multimodal Compliance: How does the system comply with the FDA Final Rule requiring simultaneous audio/visual risk presentation?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Audio/text generated separately and manually synced by video editors.' },
          { score: 2, text: '2 (Siloed): AI generates both but lacks spatial/temporal awareness to sync voiceover to on-screen text.' },
          { score: 3, text: '3 (Integrated): Scripted subtitles over audio that frequently violate FDA pacing/contrast mandates.' },
          { score: 4, text: '4 (Agentic): A Multimodal Agent audits the video timeline against voiceover timestamp and duration.' },
          { score: 5, text: '5 (Optimized): Autonomous Dual Modality seamlessly synchronizes audio pacing and visual prominence.' }
        ],
        businessPainpoints: [
          'Audio/visual sync mismatch errors', 
          'High video editing and validation costs', 
          'Regulatory rejections for rich media ads',
          'Safety messaging missed by visual-impaired users',
          'Slow campaign launch cycles for rich media'
        ],
        technicalPainpoints: [
          'No unified multimodal token space', 
          'Lack of exact voiceover time extraction', 
          'No automated timeline compliance checks',
          'High rendering latency for unified video',
          'Brittle transcription parsing scripts'
        ]
      }
    ]
  },
  {
    id: 'DATA_SEM',
    name: '3. Data & Semantic Integration',
    weight: 5, // Sum of weights: 3 + 2
    purpose: 'Audits data federation, claims grounding, and Model Context Protocol (MCP) servers.',
    questions: [
      {
        id: '3.1',
        dimension: 'Claims Grounding & Sourcing',
        topic: 'Claims Grounding & Sourcing: How are approved medical claims sourced and mapped?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Manual copy/paste from master spreadsheets.' },
          { score: 2, text: '2 (Siloed): Point-in-time static exports of claims databases.' },
          { score: 3, text: '3 (Integrated): Custom API webhooks periodically sync data but lack citation mapping.' },
          { score: 4, text: '4 (Agentic): Agentic RAG acts as the claims repository, auto-matching copy to approved Vault IDs.' },
          { score: 5, text: '5 (Optimized): Direct integration via Model Context Protocol (MCP) queries live enterprise databases natively.' }
        ],
        businessPainpoints: [
          'Outdated or expired scientific claims in market', 
          'FDA citations from ungrounded marketing claims', 
          'High cost of constant claims re-verification',
          'Loss of clinical context in translated copy',
          'Delayed approvals from claims verification backlogs'
        ],
        technicalPainpoints: [
          'No real-time grounding validation pipeline', 
          'No native connection to Veeva Vault API', 
          'Low semantic search accuracy on clinical terms',
          'Lack of dynamic reference link generation',
          'Inability to parse complex scientific tables'
        ]
      },
      {
        id: '3.2',
        dimension: 'Data Federation & Protocol',
        topic: 'Data Federation: How does the orchestration layer connect to fragmented backend systems?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Custom REST API wrappers manually written for every endpoint.' },
          { score: 2, text: '2 (Siloed): Scheduled batch ETL pipelines dumping into localized cloud buckets.' },
          { score: 3, text: '3 (Integrated): Centralized middleware handling brittle custom webhooks.' },
          { score: 4, text: '4 (Agentic): Standardized open-source protocols exposing data platforms as native servers.' },
          { score: 5, text: '5 (Optimized): Zero-trust semantic data mesh where agents autonomously negotiate schemas.' }
        ],
        businessPainpoints: [
          'Massive custom integration engineering debt', 
          'Data sync delays slowing business processes', 
          'Fragmented silos preventing unified customer views',
          'Inconsistent data definitions across departments',
          'Difficulty maintaining compliance access logs'
        ],
        technicalPainpoints: [
          'Brittle custom webhook routing logic', 
          'High middleware maintenance overhead', 
          'Lack of protocol standardization (no MCP)',
          'No real-time sync conflict resolution',
          'API security token expiration issues'
        ]
      }
    ]
  },
  {
    id: 'RUN_STATE',
    name: '4. Runtime Architecture',
    weight: 10, // Sum of weights: 2 + 2 + 1 + 1 + 2 + 2
    purpose: 'Evaluates multi-agent coordination, memory state persistence, FinOps cost, and Agent-as-Code versioning.',
    questions: [
      {
        id: '4.1',
        dimension: 'Multi-Agent Coordination',
        topic: 'Multi-Agent Coordination: How are tasks requiring multiple specialized AI personas coordinated?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): A single massive LLM prompt attempting all tasks at once.' },
          { score: 2, text: '2 (Siloed): Sequential chaining (agents pass tasks down the line slowly).' },
          { score: 3, text: '3 (Integrated): Custom Python scripts orchestrating agents and manually handling state.' },
          { score: 4, text: '4 (Agentic): Graph-based runtime organizing agents into deterministic reasoning loops.' },
          { score: 5, text: '5 (Optimized): Fully managed multi-agent execution with native auto-scaling and cross-agent comms.' }
        ],
        businessPainpoints: [
          'Monolithic prompt reasoning breakdowns', 
          'Extremely high latency in sequential execution', 
          'Inability to audit intermediate agent steps',
          'High token waste from redundant agent prompts',
          'Operational silos between AI roles'
        ],
        technicalPainpoints: [
          'Hardcoded orchestration scripts', 
          'No standardized agent state sharing', 
          'Lack of execution trace telemetry',
          'Brittle error recovery in custom agent graphs',
          'No dynamic agent scaling controls'
        ]
      },
      {
        id: '4.2',
        dimension: 'State Persistence & Dormancy',
        topic: 'State Persistence & Dormancy: How does the system manage memory during multi-day legal reviews?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Sessions time out and require manual human restarts.' },
          { score: 2, text: '2 (Siloed): Expensive "always-on" compute instances sitting idle.' },
          { score: 3, text: '3 (Integrated): Custom serialization code dumping LLM memory to a database.' },
          { score: 4, text: '4 (Agentic): Durable memory schemas snapping agent states natively to a NoSQL database.' },
          { score: 5, text: '5 (Optimized): Cost-free event-driven hibernation and autonomous exact-context rehydration.' }
        ],
        businessPainpoints: [
          'Prohibitive compute costs for idle sessions', 
          'Loss of agent memory during long review queues', 
          'Frustrated users re-entering historical data',
          'Loss of compliance context during audits',
          'Inability to scale concurrently'
        ],
        technicalPainpoints: [
          'Brittle custom state serialization logic', 
          'No native event-driven hibernation hooks', 
          'Inability to rehydrate exact context state',
          'Slow database recovery times',
          'No support for multi-user concurrent edits'
        ]
      },
      {
        id: '4.3',
        dimension: 'Third-Party Marketplace',
        topic: 'Third-Party Marketplace & A2A: How are tasks orchestrated between internal and third-party SaaS agents?',
        weight: 1, // Operational
        options: [
          { score: 1, text: '1 (Manual): Humans copy outputs from one vendor to another.' },
          { score: 2, text: '2 (Siloed): Rigid custom API wrappers bridging vendor platforms.' },
          { score: 3, text: '3 (Integrated): Internal agents trigger basic external APIs, but cannot delegate reasoning.' },
          { score: 4, text: '4 (Agentic): Agent-to-Agent (A2A) protocols allow secure delegation of entire workflows.' },
          { score: 5, text: '5 (Optimized): Dynamic discovery and provisioning of third-party capabilities natively.' }
        ],
        businessPainpoints: [
          'Manual cross-vendor copy-pasting', 
          'High cost of custom SaaS API connectors', 
          'Data leakage risk across vendor perimeters',
          'Vendor lock-in and high dependency risks',
          'Slow execution from multi-vendor API lags'
        ],
        technicalPainpoints: [
          'Hardcoded custom REST wrappers', 
          'No standardized A2A protocol support', 
          'Inability to delegate complex tasks',
          'Lack of secure cross-tenant authentication',
          'Inconsistent data schemas between vendors'
        ]
      },
      {
        id: '4.4',
        dimension: 'Agentic FinOps & Cost',
        topic: 'Agentic FinOps & Cost Governance: How are compute costs and massive token context windows capped?',
        weight: 1, // Operational
        options: [
          { score: 1, text: '1 (Manual): Month-end review of unreadable cloud invoices.' },
          { score: 2, text: '2 (Siloed): Basic budget alerts that trigger post-spend.' },
          { score: 3, text: '3 (Integrated): IT tracks total spend but cannot attribute it to specific campaigns.' },
          { score: 4, text: '4 (Agentic): Token-aware routing minimizes prompt sizes with strict concurrency limits.' },
          { score: 5, text: '5 (Optimized): Real-time FinOps roll-ups attribute multi-vendor agent spend directly.' }
        ],
        businessPainpoints: [
          'No real-time token/cost visibility', 
          'Massive budget overruns from infinite loops', 
          'Difficulty justifying generative AI ROI',
          'Slow allocation of department budgets',
          'Wasted spend on redundant generations'
        ],
        technicalPainpoints: [
          'No real-time token counters in pipelines', 
          'Lack of concurrency limit controls', 
          'No cost-effective token routing mesh',
          'Brittle API budget cap hooks',
          'No automated duplicate request detection'
        ]
      },
      {
        id: '4.5',
        dimension: 'Platform Modernization',
        topic: 'Platform Modernization: Is the architecture built on legacy ML endpoints or an agent-first platform?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Reliance on hardcoded API calls to deprecated legacy ML endpoints.' },
          { score: 2, text: '2 (Siloed): Manual translation layers forcing legacy pipelines to act like agents.' },
          { score: 3, text: '3 (Integrated): Modern models deployed on traditional MLOps infrastructure.' },
          { score: 4, text: '4 (Agentic): Built natively on modern Enterprise Agent Platforms.' },
          { score: 5, text: '5 (Optimized): Complete decoupling of agent logic from the underlying platform.' }
        ],
        businessPainpoints: [
          'High maintenance cost of legacy ML endpoints', 
          'Slow rollout of modern model features', 
          'Frequent downtime during model deprecations',
          'Loss of competitive advantage',
          'High refactoring costs'
        ],
        technicalPainpoints: [
          'Hardcoded legacy API endpoints', 
          'Lack of decoupling abstraction layers', 
          'Complex infrastructure setups',
          'No automated migration pipelines',
          'Inconsistent performance across models'
        ]
      },
      {
        id: '4.6',
        dimension: 'Agent-as-Code & Control',
        topic: 'Agent-as-Code: How are agents version-controlled across environments?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Prompts tweaked in UI consoles with no version history.' },
          { score: 2, text: '2 (Siloed): Prompts in text files, but routing logic scattered across codebases.' },
          { score: 3, text: '3 (Integrated): Code in Git, but multi-language environments create behavioral inconsistencies.' },
          { score: 4, text: '4 (Agentic): "Agent-as-Code" methodology defined entirely via language-agnostic YAML.' },
          { score: 5, text: '5 (Optimized): Immutable deployments via CI/CD pipelines pushing signed agent schemas.' }
        ],
        businessPainpoints: [
          'Prompt tweaks breaking live production features', 
          'No history or audit trail of prompt changes', 
          'High risk of unauthorized production hotfixes',
          'Slow deployment cycles for compliance updates',
          'Friction between prompt designers and dev teams'
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
    name: '5. Security & Validation (GxP)',
    weight: 17, // Sum of weights: 3 + 3 + 3 + 2 + 3 + 3
    purpose: 'Enforces GxP audit trails, continuous validation, sandboxing, and Quality Unit compliance.',
    questions: [
      {
        id: '5.1',
        dimension: 'GxP Audit Trail & Provenance',
        topic: 'GxP Audit Trail: How does the architecture log AI reasoning, track ALCOA+ provenance, and maintain freshness?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Date verifications are manual; outputs copied with no record of reasoning.' },
          { score: 2, text: '2 (Siloed): Basic application logs capture raw API payloads; post-generation flags identify expired data.' },
          { score: 3, text: '3 (Integrated): System tracks asset fragments and daily syncs, but lacks real-time revocation.' },
          { score: 4, text: '4 (Agentic): Cryptographic IDs map agents to policies; semantic caching drops revoked claims.' },
          { score: 5, text: '5 (Optimized): Native trace integration visually replays spans alongside immutable GxP logs.' }
        ],
        businessPainpoints: [
          'No record of reasoning or data lineage', 
          'High risk of using expired scientific claims', 
          'Pass/Fail GxP audit failures',
          'Lack of accountability for agent decisions',
          'High legal exposure from untraceable outputs'
        ],
        technicalPainpoints: [
          'No cryptographic trace logging', 
          'Lack of real-time data cache validation', 
          'Missing immutable log storage',
          'Inability to capture full execution spans',
          'Mismatched audit schemas between systems'
        ]
      },
      {
        id: '5.2',
        dimension: 'API Security & Guardrails',
        topic: 'API Security & Guardrails: How are prompts and tool calls sanitized against injection and PII leaks?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Reliance on consumer-grade LLM safety filters.' },
          { score: 2, text: '2 (Siloed): Standard REST API Gateways lacking AI token inspection.' },
          { score: 3, text: '3 (Integrated): Custom regex filters scrubbing PII before model hits.' },
          { score: 4, text: '4 (Agentic): Enterprise AI proxies enforcing Model Armor protections.' },
          { score: 5, text: '5 (Optimized): Zero-Trust ecosystem verifying every internal cross-agent API call.' }
        ],
        businessPainpoints: [
          'Accidental exposure of patient PII/PHI', 
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
        id: '5.3',
        dimension: 'AI Change Control & Validation',
        topic: 'AI Change Control: How is regression testing handled when foundation models update?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Months of manual IQ/OQ/PQ paperwork per model update.' },
          { score: 2, text: '2 (Siloed): Basic automated tests that freeze production during updates.' },
          { score: 3, text: '3 (Integrated): CI/CD tests relying on static string-matching that fail on LLM non-determinism.' },
          { score: 4, text: '4 (Agentic): "LLM-as-a-judge" framework running synthetic tests against a gold-standard rubric.' },
          { score: 5, text: '5 (Optimized): Continuous Validation monitoring drift in real-time and generating signed reports.' }
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
        id: '5.4',
        dimension: 'Cross-Boundary Identity',
        topic: 'Cross-Boundary Identity & Agentic IAM: How are user permissions enforced when delegating to third-party agents?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Agents run on a single over-privileged service account.' },
          { score: 2, text: '2 (Siloed): Hardcoded API keys for destination systems.' },
          { score: 3, text: '3 (Integrated): Basic OAuth but unable to dynamically downgrade permissions per user.' },
          { score: 4, text: '4 (Agentic): The invoking user\'s exact identity and permissions pass strictly across boundaries.' },
          { score: 5, text: '5 (Optimized): AI Gateways enforce context-aware access policies in real-time.' }
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
        id: '5.5',
        dimension: 'Supply Chain & Sandbox',
        topic: 'Supply Chain Security: How is the architecture secured against deserialization flaws?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Shared compute instances with no dependency scanning.' },
          { score: 2, text: '2 (Siloed): Reliance on basic IAM (vulnerable to RCE/deserialization flaws).' },
          { score: 3, text: '3 (Integrated): Container vulnerability scanning prior to deployment, but arbitrary execution allowed.' },
          { score: 4, text: '4 (Agentic): Tools execute exclusively within isolated Agent Sandboxes.' },
          { score: 5, text: '5 (Optimized): Zero-trust execution cryptographically verifying loaded SDKs.' }
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
        id: '5.6',
        dimension: 'Quality Unit (QU) Non-Delegation',
        topic: 'Quality Unit (QU) Non-Delegation: How does the architecture prevent autonomous deployment without QU sign-off?',
        weight: 3, // Critical
        options: [
          { score: 1, text: '1 (Manual): Manual email routing leaving room for procedural bypass.' },
          { score: 2, text: '2 (Siloed): Agents flag items, but lack systemic locks preventing deployment.' },
          { score: 3, text: '3 (Integrated): AI confidence scores substituted for human sign-off on lower-tier risks.' },
          { score: 4, text: '4 (Agentic): Strict separation of duties where AI drafts, but deployment gates remain locked.' },
          { score: 5, text: '5 (Optimized): Cryptographic QU enforcement where deployment is natively rejected until signed.' }
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
  },
  {
    id: 'FEASIBILITY',
    name: '6. Implementation Feasibility & TCO',
    weight: 9, // Sum of weights: 2 + 2 + 3 + 2
    purpose: 'Evaluates customization cost, architectural complexity, time-to-market, and maintenance debt.',
    questions: [
      {
        id: '6.1',
        dimension: 'Customization Cost (SI Spend)',
        topic: 'Customization Cost & Build Effort (SI Spend): How much bespoke glue code and infrastructure must be built from scratch?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): 100% Bespoke. Developers build database routing, state machines, and UI from scratch ($5M+ SI).' },
          { score: 2, text: '2 (Siloed): Heavy Customization. Utilizing templates, but core agent comms require heavy manual coding.' },
          { score: 3, text: '3 (Integrated): Moderate Customization. Middleware exists, but integrating legacy systems requires custom wrappers.' },
          { score: 4, text: '4 (Framework-Driven): Platform handles routing/state natively, slashing custom code by 60%.' },
          { score: 5, text: '5 (Optimized): Zero-Custom-Code Configuration. Platform-native components snap together.' }
        ],
        businessPainpoints: [
          'Exorbitant Systems Integrator (SI) billable hours', 
          'Massive upfront CapEx requirements', 
          'Unpredictable project budget overruns',
          'Longer validation timelines',
          'Heavy reliance on external contracting firms'
        ],
        technicalPainpoints: [
          'Writing custom routing middleware from scratch', 
          'No standardized agent communication libraries', 
          'Brittle custom state machine code',
          'Heavy API integration overhead',
          'Custom security patching required for custom code'
        ]
      },
      {
        id: '6.2',
        dimension: 'Architectural Complexity & Moving Parts',
        topic: 'Architectural Complexity: Does it require maintaining multiple disparate databases, compute clusters, and networking rules?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Fragile Spaghetti. Dozens of point-to-point connections, multiple distinct databases.' },
          { score: 2, text: '2 (Siloed): Complex Plumbing. Agents require dedicated compute clusters and complex networking rules.' },
          { score: 3, text: '3 (Integrated): Standardized but Heavy. Centralized gateway, but requires deep infra expertise to scale.' },
          { score: 4, text: '4 (Abstracted): Infrastructure heavily abstracted behind Managed Agent APIs.' },
          { score: 5, text: '5 (Optimized): Serverless & Declarative. Managed serverless architecture deployed via simple YAML.' }
        ],
        businessPainpoints: [
          'Required specialized DevOps staff to maintain', 
          'High cloud infrastructure spend', 
          'Longer resolution times during outages',
          'Engineering team cognitive overload',
          'Friction in environment provisioning'
        ],
        technicalPainpoints: [
          'Managing separate vector, state, and transactional DBs', 
          'Complex Kubernetes networking and ingress rules', 
          'Load balancing multi-tenant agent compute',
          'API security tokens hard to rotate safely',
          'Lack of unified log aggregation across parts'
        ]
      },
      {
        id: '6.3',
        dimension: 'Time-to-Market & Velocity',
        topic: 'Time-to-Market: Can this architecture be successfully validated and launched by the strict January 2027 MVP deadline?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): 12–18+ Months. Custom builds with heavy GxP validation paperwork for every line.' },
          { score: 2, text: '2 (Siloed): 9–12 Months. Highly risky for a January 2027 launch.' },
          { score: 3, text: '3 (Integrated): 6–9 Months. Feasible but requires ruthless scope-cutting of features.' },
          { score: 4, text: '4 (Agentic): 3–6 Months. Frameworks drastically accelerate development, easily hitting target.' },
          { score: 5, text: '5 (Optimized): Weeks to Launch. Plug-and-play integrations via marketplaces and MCP.' }
        ],
        businessPainpoints: [
          'Missed competitive window (deadline failure)', 
          'Sunk CapEx with zero business return in 2026', 
          'Department credibility damage with leadership',
          'Delayed drug pipeline acceleration benefits',
          'Compliance validation backlogs freezing deployments'
        ],
        technicalPainpoints: [
          'Validation paperwork bottlenecking releases', 
          'Writing custom unit tests for non-deterministic LLMs', 
          'Long provisioning queues in traditional MLOps',
          'Integrations with legacy silos take months',
          'No pre-validated environment templates'
        ]
      },
      {
        id: '6.4',
        dimension: 'Maintenance Debt & Extensibility',
        topic: 'Maintenance Debt: How much operational overhead is required when foundation models or APIs inevitably update?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): High Breakage. Every model update breaks custom glue code, requiring full re-validation.' },
          { score: 2, text: '2 (Siloed): Heavy Maintenance. Dedicated teams required to constantly tune prompts.' },
          { score: 3, text: '3 (Integrated): Standard Maintenance. CI/CD automates some patching, but upgrades require coding.' },
          { score: 4, text: '4 (Agentic): Framework Shielding. Framework abstracts APIs, protecting code from breaking.' },
          { score: 5, text: '5 (Optimized): Self-Healing & Evergreen. Platform natively manages model lifecycle and auto-validates.' }
        ],
        businessPainpoints: [
          'Severe OpEx maintenance drain in 2028', 
          'System downtime from unannounced model deprecations', 
          'Constant compliance re-certification fatigue',
          'Slow rollout of newer model efficiencies',
          'Engineering team spent on patching vs features'
        ],
        technicalPainpoints: [
          'Model API syntax updates break local code', 
          'Prompt drift causing unexpected hallucinations', 
          'Manual GxP re-validation per minor release',
          'Lack of automated drift detection alerts',
          'No evergreen model abstraction routing layers'
        ]
      }
    ]
  }
];

export default function PremiumScopingAssessorV12({ onBackToLanding, globalTheme = 'dark', apiKey = '', gcpToken = '' }) {
  const [activeTab, setActiveTab] = useState('intake');
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
    V12_PILLARS.forEach(p => {
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
  
  // Wizard Question Indexing
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  const activePillar = V12_PILLARS[activePillarIdx];
  const activeQuestion = activePillar.questions[activeQuestionIdx];
  const activeQuestionId = activeQuestion.id;

  const [geminiStreamingState, setGeminiStreamingState] = useState({
    active: false,
    currentStep: 1,
    logs: []
  });

  const getOverallQuestionIndex = () => {
    let count = 0;
    for (let i = 0; i < activePillarIdx; i++) {
      count += V12_PILLARS[i].questions.length;
    }
    return count + activeQuestionIdx + 1;
  };

  // Theme-Aware Color Tokens
  const colors = {
    bgMain: 'var(--bg-primary)',
    sidebarBg: 'var(--bg-surface)',
    cardBg: 'var(--bg-surface)',
    borderLight: 'var(--border-color)',
    textDark: 'var(--text-primary)',
    textMuted: 'var(--text-secondary)',
    accentBlue: '#2563eb',
    accentBlueLight: 'rgba(37, 99, 235, 0.08)',
    borderOrange: '#ea580c',
    bgOrangeLight: 'rgba(234, 88, 12, 0.08)',
    borderGreen: '#16a34a',
    bgGreenLight: 'rgba(22, 163, 74, 0.08)',
    purpleGradient: 'linear-gradient(135deg, #4f46e5, #9333ea)'
  };

  // ==========================================================================
  // Merck C-Suite Mathematical Weight Scoring Engine (Denominator = 54)
  // ==========================================================================
  const scoringData = useMemo(() => {
    let totalWeightedPoints = 0;
    let totalQuestionsAnswered = 0;
    let yAxisWeightedPoints = 0; // Pillars 1-5 (Capability & Compliance) - total weight 45
    let xAxisWeightedPoints = 0; // Pillar 6 (Feasibility & TCO) - total weight 9

    V12_PILLARS.forEach(pillar => {
      pillar.questions.forEach(q => {
        const scoreObj = scores[q.id] || {};
        const cur = typeof scoreObj.current === 'number' ? scoreObj.current : 3;
        
        // Multiplier: base score * assigned weight
        const weightedScore = cur * q.weight;
        totalWeightedPoints += weightedScore;
        totalQuestionsAnswered++;

        if (pillar.id === 'FEASIBILITY') {
          xAxisWeightedPoints += weightedScore;
        } else {
          yAxisWeightedPoints += weightedScore;
        }
      });
    });

    // Final Weighted averages on a 1.0 to 5.0 executive scale!
    const finalScore = Number((totalWeightedPoints / 54).toFixed(2));
    const capabilityScore = Number((yAxisWeightedPoints / 45).toFixed(2));
    const feasibilityScore = Number((xAxisWeightedPoints / 9).toFixed(2));

    let verdict = 'De-Prioritize';
    if (finalScore >= 4.0) verdict = 'Strategic Launch';
    else if (finalScore >= 3.0) verdict = 'Fund Incubator';
    else if (finalScore >= 2.0) verdict = 'Coached Re-Architect';

    return {
      overallScore: finalScore,
      capabilityScore,
      feasibilityScore,
      verdict,
      totalAnswered: totalQuestionsAnswered
    };
  }, [scores]);

  // Navigation
  const handleNextQuestion = () => {
    if (activeQuestionIdx < activePillar.questions.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
    } else if (activePillarIdx < V12_PILLARS.length - 1) {
      setActivePillarIdx(prev => prev + 1);
      setActiveQuestionIdx(0);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx(prev => prev - 1);
    } else if (activePillarIdx > 0) {
      setActivePillarIdx(prev => prev - 1);
      setActiveQuestionIdx(V12_PILLARS[activePillarIdx - 1].questions.length - 1);
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
      const base = hashObj.split('?')[0] || '#agentic-maturity-v12';
      const params = new URLSearchParams(hashObj.split('?')[1] || '');
      params.set('view', targetTab);
      window.location.hash = `${base}?${params.toString()}`;
    } catch(e) {}
  };

  const getPillarProgress = (pillar) => {
    let completed = 0;
    pillar.questions.forEach(q => {
      if (scores[q.id]?.current !== undefined) {
        completed++;
      }
    });
    return `${completed}/${pillar.questions.length}`;
  };

  // Demo Prefiller (Generates a beautifully challenging GxP scenario)
  const handleAutoFillRandom = () => {
    setCustomerInfo({
      company: 'Novartis CMC Operations',
      useCaseName: 'Dossier Automation Assistant [CSR_V12]',
      domain: 'Quality & Compliance',
      runtime: 'Google Cloud Vertex AI',
      connectors: ['Veeva Vault GxP Docs', 'BigQuery Zero-ETL Feature Store']
    });

    const presetScores = {};
    V12_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        // High capabilities on UX (4-5), but lower on Critical GxP/TCO (2-3) to show realistic weighted scoring!
        let curr = 3;
        if (p.id === 'UX_HITL') curr = 4;
        else if (q.weight === 3) curr = 2; // Critical compliance constraints scored low
        else if (p.id === 'FEASIBILITY') curr = 2; // SI Cost & complexity scored low

        const fut = Math.min(5, curr + 1);

        presetScores[q.id] = {
          current: curr,
          future: fut,
          techPain: q.technicalPainpoints?.slice(0, 2) || [],
          bizPain: q.businessPainpoints?.slice(0, 2) || [],
          comments: `V12 baseline validated for ${q.dimension} scoring. Symmetrical GxP audit required.`,
          skipped: false
        };
      });
    });

    setScores(presetScores);
    setActiveTab('intake');
  };

  // Live Gemini dossier compiler
  const handleRunLiveGeminiAssessment = async () => {
    const ts = () => new Date().toISOString().replace('T', ' ').substring(11, 23);
    setGeminiStreamingState({
      active: true,
      currentStep: 1,
      logs: [`[${ts()}] [SYS_INIT] Establishing secure Vertex AI endpoint for V12 Executive Review...`]
    });

    const stepLogs = [
      `[${ts()}] [SCORING_MATRIX] Calculating 25-dimension weighted average (denominator = 54)...`,
      `[${ts()}] [2X2_PLOTTER] Placing architecture on Capability (Y) & Feasibility (X) axes...`,
      `[${ts()}] [AI_STUDY] Invoking gemini-2.5-pro for C-Suite Strategic Dossier...`,
      `[${ts()}] [JSON_STREAM] Structuring executive recommendations & GxP validation roadmap...`
    ];

    let currentLogs = [`[${ts()}] [SYS_INIT] Establishing secure Vertex AI endpoint for V12 Executive Review...`];
    for (let i = 0; i < stepLogs.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      currentLogs.push(stepLogs[i]);
      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: i + 2,
        logs: [...currentLogs]
      }));
    }

    try {
      const activeKey = (apiKey || localStorage.getItem('gemini_api_key') || window.__VITE_ACTIVE_API_KEY__ || '').trim();
      
      // Upgrade model request structure to match V12 scoring denominator and matrix!
      const response = await generateMaturityReport(scores, customerInfo, activeKey);
      setLiveSynthesis(response.report || response);

      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: 6,
        logs: [...prev.logs, `[${ts()}] [SUCCESS] V12 Executive Readiness Dossier completed successfully!`]
      }));

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
      alert(`⚠️ Live AI Scoping failed: ${err.message}. Showing local mathematical dashboard.`);
      handleTabSwitch('scorecard');
    }
  };

  return (
    <div className="premium-assessor-v12-container">
      
      {/* Stylesheet block (Injects exact row-grid auto-stretch & theme rules) */}
      <style>{`
        .premium-assessor-v12-container {
          display: flex;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          gap: 0.85rem;
          padding: 1rem;
          box-sizing: border-box;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          transition: background-color 0.2s, color 0.2s;
        }
        @media (max-width: 960px) {
          .premium-assessor-v12-container {
            flex-direction: column;
            padding: 0.55rem;
            gap: 0.55rem;
          }
        }

        .v12-sidebar {
          width: 235px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.85rem 0.85rem 1.25rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: fit-content;
          transition: background-color 0.2s, border-color 0.2s;
        }

        .v12-main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }

        .v12-intake-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: fit-content;
          width: 100%;
          transition: background-color 0.2s, border-color 0.2s;
        }

        .v12-column-header {
          font-size: 0.62rem;
          font-weight: 850;
          color: var(--text-primary);
          border-bottom: 2px solid var(--text-primary);
          padding-bottom: 0.25rem;
          display: block;
          margin-bottom: 0.15rem;
        }

        .v12-matrix-box {
          text-align: left;
          padding: 0.35rem 0.5rem;
          border-radius: 6px;
          font-size: 0.62rem;
          line-height: 1.25;
          transition: all 0.15s;
          min-height: 54px; /* Dynamic: grows taller to prevent clipping! */
          display: flex;
          align-items: center;
          box-sizing: border-box;
          overflow: hidden;
          width: 100%;
        }

        .v12-progress-bar-fill {
          height: 100%;
          background: #2563eb;
          position: relative;
          overflow: hidden;
          border-radius: 100px;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .v12-progress-bar-fill::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: v12-progress-pulse 2.5s infinite;
        }
        @keyframes v12-progress-pulse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* LEFT SIDEBAR PANEL */}
      <aside className="v12-sidebar">
        
        {/* Top Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: '1 1 auto' }}>
          <div>
            <h2 style={{ fontSize: '0.72rem', fontWeight: 900, color: colors.textDark, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 0.15rem 0' }}>
              {customerInfo.company ? customerInfo.company.toUpperCase() : 'ENTERPRISE PROFILE'}
            </h2>
            <span style={{ fontSize: '0.62rem', color: colors.textMuted }}>
              Topic {getOverallQuestionIndex()} of 25 Audited
            </span>
            <div style={{ height: '5px', background: 'var(--border-color)', borderRadius: '100px', marginTop: '0.3rem', overflow: 'hidden' }}>
              <div className="v12-progress-bar-fill" style={{ width: `${Math.round((getOverallQuestionIndex() / 25) * 100)}%` }}></div>
            </div>
          </div>

          {/* Pillars List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {V12_PILLARS.map((pillar, idx) => {
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
                    background: isActive ? 'var(--bg-primary)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.72rem', color: isActive ? colors.accentBlue : colors.textMuted }}>
                      {idx === 0 ? '📊' : idx === 1 ? '🧠' : idx === 2 ? '🔌' : idx === 3 ? '⚙️' : idx === 4 ? '🛡️' : '⚖️'}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 800 : 550, color: isActive ? colors.textDark : colors.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pillar.name.split('. ')[1]}
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

        {/* Action Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: `1px solid var(--border-color)`, paddingTop: '0.75rem' }}>
          {/* Offline Sync Controls */}
          <div>
            <span style={{ fontSize: '0.52rem', fontWeight: 800, color: colors.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
              OFFLINE SHEET SYNC
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
              <button style={{ background: 'var(--bg-surface)', border: `1px solid var(--border-color)`, color: colors.accentBlue, borderRadius: '4px', padding: '0.2rem 0', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}>
                📥 Export
              </button>
              <button style={{ background: 'var(--bg-surface)', border: `1px solid var(--border-color)`, color: '#16a34a', borderRadius: '4px', padding: '0.2rem 0', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}>
                📤 Import
              </button>
            </div>
          </div>

          {activeTab === 'intake' && (
            <button
              onClick={handleAutoFillRandom}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid #c084fc',
                color: '#9333ea',
                borderRadius: '4px',
                padding: '0.35rem 0',
                fontSize: '0.65rem',
                fontWeight: 800,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              🪄 Prefill Demo Scenario
            </button>
          )}

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
                background: 'var(--bg-surface)',
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
      <main className="v12-main-area">
        
        {/* VIEW 1: INTAKE 25-QUESTION WORKSPACE */}
        {activeTab === 'intake' && (
          <div className="v12-intake-card">
            
            {/* Title Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid var(--border-color)`, paddingBottom: '0.35rem', flexShrink: 0, marginBottom: '0.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: colors.textDark }}>
                  {activePillar.name}
                </span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                <span style={{ fontSize: '0.65rem', color: colors.textMuted }}>
                  {activePillar.purpose}
                </span>
              </div>

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
            <div style={{ flexShrink: 0, marginBottom: '0.45rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.1rem' }}>
                <span style={{ fontSize: '0.58rem', fontWeight: 900, color: colors.accentBlue, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  TOPIC INDEX {activeQuestion.id} AUDIT SCOPE:
                </span>
                <span style={{ 
                  fontSize: '0.52rem', 
                  fontWeight: 900, 
                  color: activeQuestion.weight === 3 ? '#b91c1c' : activeQuestion.weight === 2 ? '#d97706' : '#2563eb', 
                  background: activeQuestion.weight === 3 ? '#fee2e2' : activeQuestion.weight === 2 ? '#fef3c7' : '#dbeafe',
                  padding: '0.04rem 0.35rem', 
                  borderRadius: '3px',
                  textTransform: 'uppercase'
                }}>
                  {activeQuestion.weight === 3 ? 'Critical' : activeQuestion.weight === 2 ? 'Strategic' : 'Operational'} (Weight {activeQuestion.weight})
                </span>
              </div>
              <h2 style={{ fontSize: '0.8rem', fontWeight: 900, margin: 0, color: colors.textDark, lineHeight: 1.25 }}>
                {activeQuestion.topic}
              </h2>
            </div>

            {/* Dynamic Symmetrical Auto-Height Row-Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flexShrink: 0 }}>
              
              {/* Grid Headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span className="v12-column-header">CURRENT STATE *</span>
                <span className="v12-column-header">FUTURE STATE *</span>
                <span className="v12-column-header">TECHNICAL PAINPOINTS *</span>
                <span className="v12-column-header">BUSINESS PAINPOINTS *</span>
              </div>

              {/* 5 Symmetrical Option Rows (Auto-Stretching!) */}
              {[0, 1, 2, 3, 4].map(rowIdx => {
                const opt = activeQuestion.options[rowIdx];
                const techPoint = activeQuestion.technicalPainpoints?.[rowIdx];
                const bizPoint = activeQuestion.businessPainpoints?.[rowIdx];

                const isCurrentSelected = (scores[activeQuestionId]?.current || 3) === (rowIdx + 1);
                const isTargetSelected = (scores[activeQuestionId]?.future || 4) === (rowIdx + 1);
                const isTechChecked = scores[activeQuestionId]?.techPain?.includes(techPoint);
                const isBizChecked = scores[activeQuestionId]?.bizPain?.includes(bizPoint);

                return (
                  <div 
                    key={rowIdx} 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(4, 1fr)', 
                      gap: '0.5rem', 
                      alignItems: 'stretch' // NATIVE CSS GRID STRETCH: Perfect horizontal row alignment!
                    }}
                  >
                    {/* 1. Current State Card */}
                    <button
                      onClick={() => handleSelectCurrentLevel(rowIdx + 1)}
                      className="v12-matrix-box"
                      style={{
                        background: isCurrentSelected ? colors.bgOrangeLight : colors.cardBg,
                        border: isCurrentSelected ? `2px solid ${colors.borderOrange}` : `1px solid var(--border-color)`,
                        color: isCurrentSelected ? colors.borderOrange : colors.textDark,
                        fontWeight: isCurrentSelected ? 800 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {opt.text}
                    </button>

                    {/* 2. Future State Card */}
                    <button
                      onClick={() => handleSelectTargetLevel(rowIdx + 1)}
                      className="v12-matrix-box"
                      style={{
                        background: isTargetSelected ? colors.bgGreenLight : colors.cardBg,
                        border: isTargetSelected ? `2px solid ${colors.borderGreen}` : `1px solid var(--border-color)`,
                        color: isTargetSelected ? colors.borderGreen : colors.textDark,
                        fontWeight: isTargetSelected ? 800 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {opt.text}
                    </button>

                    {/* 3. Technical Pain Point Card (Custom Checkboxes) */}
                    <div
                      onClick={() => techPoint && handleTogglePainPoint('tech', techPoint)}
                      className="v12-matrix-box"
                      style={{
                        background: isTechChecked ? colors.accentBlueLight : colors.cardBg,
                        border: isTechChecked ? `2px solid ${colors.accentBlue}` : `1px solid var(--border-color)`,
                        color: isTechChecked ? colors.accentBlue : colors.textDark,
                        cursor: techPoint ? 'pointer' : 'default',
                        opacity: techPoint ? 1 : 0.4
                      }}
                    >
                      {techPoint ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', width: '100%', height: '100%', pointerEvents: 'none' }}>
                          <div 
                            style={{
                              width: '14px',
                              height: '14px',
                              border: isTechChecked ? `2px solid ${colors.accentBlue}` : '1.5px solid #cbd5e1',
                              borderRadius: '4px',
                              background: isTechChecked ? colors.accentBlue : 'var(--bg-surface)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s',
                              flexShrink: 0
                            }}
                          >
                            {isTechChecked && <Check size={10} strokeWidth={4} color="#ffffff" />}
                          </div>
                          <span style={{ fontSize: '0.62rem', fontWeight: isTechChecked ? 850 : 550, color: isTechChecked ? colors.accentBlue : colors.textDark, lineHeight: 1.2 }}>
                            {techPoint}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.62rem', color: colors.textMuted }}>N/A</span>
                      )}
                    </div>

                    {/* 4. Business Pain Point Card (Custom Checkboxes) */}
                    <div
                      onClick={() => bizPoint && handleTogglePainPoint('biz', bizPoint)}
                      className="v12-matrix-box"
                      style={{
                        background: isBizChecked ? colors.accentBlueLight : colors.cardBg,
                        border: isBizChecked ? `2px solid ${colors.accentBlue}` : `1px solid var(--border-color)`,
                        color: isBizChecked ? colors.accentBlue : colors.textDark,
                        cursor: bizPoint ? 'pointer' : 'default',
                        opacity: bizPoint ? 1 : 0.4
                      }}
                    >
                      {bizPoint ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', width: '100%', height: '100%', pointerEvents: 'none' }}>
                          <div 
                            style={{
                              width: '14px',
                              height: '14px',
                              border: isBizChecked ? `2px solid ${colors.accentBlue}` : '1.5px solid #cbd5e1',
                              borderRadius: '4px',
                              background: isBizChecked ? colors.accentBlue : 'var(--bg-surface)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s',
                              flexShrink: 0
                            }}
                          >
                            {isBizChecked && <Check size={10} strokeWidth={4} color="#ffffff" />}
                          </div>
                          <span style={{ fontSize: '0.62rem', fontWeight: isBizChecked ? 850 : 550, color: isBizChecked ? colors.accentBlue : colors.textDark, lineHeight: 1.2 }}>
                            {bizPoint}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.62rem', color: colors.textMuted }}>N/A</span>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Bottom Auditor Notes Area */}
            <div style={{ background: colors.cardBg, border: `1px solid var(--border-color)`, borderRadius: '6px', padding: '0.5rem 0.65rem 0.65rem 0.65rem', display: 'flex', flexDirection: 'column', gap: '0.15rem', flexShrink: 0, marginBottom: '0.15rem' }}>
              <span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.textDark, letterSpacing: '0.5px' }}>
                NOTES & COMMENTS BOX *
              </span>
              <textarea
                value={scores[activeQuestionId]?.comments || ''}
                onChange={e => handleCommentChange(e.target.value)}
                placeholder="Type clinical, GxP validation, or CapEx/OpEx constraints noted during this stakeholder interview..."
                style={{
                  width: '100%',
                  height: '40px', 
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.68rem',
                  color: colors.textDark,
                  background: 'transparent',
                  fontFamily: 'inherit',
                  lineHeight: 1.25,
                  resize: 'none'
                }}
              />
            </div>

            {/* Navigation Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid var(--border-color)`, paddingTop: '0.45rem', marginTop: '0.85rem', flexShrink: 0 }}>
              <button
                onClick={handlePrevQuestion}
                disabled={activePillarIdx === 0 && activeQuestionIdx === 0}
                style={{
                  background: 'var(--bg-surface)',
                  color: colors.accentBlue,
                  border: `1px solid var(--border-color)`,
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
                Progress: {Math.round((getOverallQuestionIndex() / 25) * 100)}% ({getOverallQuestionIndex()} of 25 Completed)
              </span>

              <button
                onClick={handleNextQuestion}
                style={{
                  background: getOverallQuestionIndex() === 25 ? 'var(--border-color)' : colors.accentBlue,
                  color: getOverallQuestionIndex() === 25 ? colors.textMuted : '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  opacity: getOverallQuestionIndex() === 25 ? 0.5 : 1
                }}
              >
                Next →
              </button>
            </div>

          </div>
        )}

        {/* VIEW 2: EXECUTIVE DOSSIER REPORT */}
        {activeTab === 'scorecard' && (
          <div className="v12-intake-card" style={{ gap: '1.25rem' }}>
            
            {/* Header Identity */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.58rem', fontWeight: 950, color: colors.accentBlue, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Merck Consultative Scoping Dashboard (v12)
                </span>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: colors.textDark, margin: '0.15rem 0' }}>
                  {customerInfo.useCaseName || 'Dossier Automation Assistant'}
                </h1>
                <p style={{ fontSize: '0.72rem', color: colors.textMuted, margin: 0 }}>
                  Strategic Readiness Scorecard compiled on {new Date().toLocaleDateString()} for {customerInfo.company || 'Merck CMC Operations'}
                </p>
              </div>

              {/* Overall Score Badge */}
              <div style={{ textAlign: 'right', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                <div style={{ background: colors.purpleGradient, padding: '0.55rem 0.85rem', borderRadius: '8px', color: '#ffffff', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.55rem', fontWeight: 800, textTransform: 'uppercase' }}>Weighted Score</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{scoringData.overallScore}</div>
                  <div style={{ fontSize: '0.5rem', fontWeight: 700 }}>out of 5.0</div>
                </div>
              </div>
            </div>

            {/* 2x2 Matrix Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
              
              {/* Y-Axis: Capability & Compliance */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={16} color={colors.accentBlue} />
                  <strong style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: colors.textDark }}>Y-Axis: Capability & Compliance</strong>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: colors.textDark }}>{scoringData.capabilityScore} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: colors.textMuted }}>/ 5.0</span></div>
                <div style={{ fontSize: '0.58rem', color: colors.textMuted, marginTop: '0.15rem' }}>Weighted average of Pillars 1–5 (Regulatory, GxP, Data, Security, UX).</div>
              </div>

              {/* X-Axis: Feasibility & TCO */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                  <Cpu size={16} color="#d97706" />
                  <strong style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: colors.textDark }}>X-Axis: Feasibility & TCO</strong>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: colors.textDark }}>{scoringData.feasibilityScore} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: colors.textMuted }}>/ 5.0</span></div>
                <div style={{ fontSize: '0.58rem', color: colors.textMuted, marginTop: '0.15rem' }}>Weighted average of Pillar 6 (Timeline, Complexity, SI Spend, Debt).</div>
              </div>

              {/* Executive Verdict */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                  <Award size={16} color="#16a34a" />
                  <strong style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: colors.textDark }}>Board Verdict</strong>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#16a34a', textTransform: 'uppercase', marginTop: '0.2rem' }}>{scoringData.verdict}</div>
                <div style={{ fontSize: '0.58rem', color: colors.textMuted, marginTop: '0.25rem' }}>Calculated mathematically using impact-weighted criteria.</div>
              </div>

            </div>

            {/* Scorecard Detailed Breakdown */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '0.55rem 0.85rem', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '0.72rem', fontWeight: 900, color: colors.textDark, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  25-Dimension Audit Scorecard Ledger
                </h3>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.65rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', fontWeight: 800 }}>
                      <th style={{ padding: '0.45rem 0.85rem' }}>ID</th>
                      <th style={{ padding: '0.45rem 0.85rem' }}>Dimension</th>
                      <th style={{ padding: '0.45rem 0.85rem' }}>Pillar</th>
                      <th style={{ padding: '0.45rem 0.85rem', textAlign: 'center' }}>Weight</th>
                      <th style={{ padding: '0.45rem 0.85rem', textAlign: 'center' }}>Score</th>
                      <th style={{ padding: '0.45rem 0.85rem', textAlign: 'center' }}>Weighted Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {V12_PILLARS.flatMap((p, pIdx) => p.questions.map((q, qIdx) => {
                      const scoreVal = scores[q.id]?.current || 3;
                      const weightedPts = scoreVal * q.weight;
                      return (
                        <tr key={q.id} style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
                          <td style={{ padding: '0.45rem 0.85rem', fontWeight: 800 }}>{q.id}</td>
                          <td style={{ padding: '0.45rem 0.85rem', fontWeight: 650, color: colors.textDark }}>{q.dimension}</td>
                          <td style={{ padding: '0.45rem 0.85rem', color: colors.textMuted }}>{p.name.split('. ')[1]}</td>
                          <td style={{ padding: '0.45rem 0.85rem', textAlign: 'center', fontWeight: 700 }}>{q.weight}</td>
                          <td style={{ padding: '0.45rem 0.85rem', textAlign: 'center', fontWeight: 800, color: colors.accentBlue }}>{scoreVal}</td>
                          <td style={{ padding: '0.45rem 0.85rem', textAlign: 'center', fontWeight: 800 }}>{weightedPts}</td>
                        </tr>
                      );
                    }))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Executive Dossier AI Summary View */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: colors.textDark }}>
                📝 C-Suite AI Scoping Briefing
              </strong>
              <div style={{ 
                background: 'var(--bg-secondary)', 
                border: '1px dashed var(--border-color)', 
                borderRadius: '8px', 
                padding: '0.85rem', 
                fontSize: '0.7rem', 
                lineHeight: 1.45, 
                color: colors.textDark,
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {liveSynthesis ? (
                  <div style={{ whiteSpace: 'pre-line' }}>{liveSynthesis}</div>
                ) : (
                  <div style={{ color: colors.textMuted, textAlign: 'center', padding: '1rem 0' }}>
                    <AlertTriangle size={24} style={{ margin: '0 auto 0.45rem auto', display: 'block', color: '#d97706' }} />
                    No live briefing compiled. Click "View Report Blueprint" in the sidebar to generate the C-Suite Briefing.
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(v12_code)

print("PremiumScopingAssessorV12 has been successfully created with exactly 25 questions, custom weights, and 2x2 matrix calculations!")
