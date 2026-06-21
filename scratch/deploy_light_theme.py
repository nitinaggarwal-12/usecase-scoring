import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

light_theme_code = """import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Sparkles, Check, ChevronRight, Play, ArrowLeft, ArrowRight, Download, Upload, Trash2, Edit2, AlertTriangle, Eye, HelpCircle, Shield, Layers, TrendingUp, BarChart3, ShieldAlert, Award, FileText, Settings, Sliders, Calendar, HelpCircle as HelpIcon, Activity, CheckSquare, ShieldCheck, Globe, Users, Database, Zap, RefreshCw } from 'lucide-react';

// ==========================================================================
// 25-Question Consultative Scoping Framework (V12 Merck-Novartis Spec)
// ==========================================================================
const V12_PILLARS = [
  {
    id: 'UX_HITL',
    name: '1. UX & HITL Workflow',
    weight: 7,
    purpose: 'Evaluates how marketers, creatives, and MLR reviewers interact without disrupting native workspaces.',
    questions: [
      {
        id: '1.1',
        dimension: 'Native Workspace Integration',
        topic: 'How do marketers and creatives interact with compliance constraints and generation tools?',
        weight: 1,
        options: [
          { score: 1, text: '1 (Manual): Manual PDF cross-referencing and separate portal logins.' },
          { score: 2, text: '2 (Siloed): Basic plugins requiring users to toggle between AI chat and their creative canvas.' },
          { score: 3, text: '3 (Integrated): Passive AI assistants embedded in the workspace (grammar/spell check only).' },
          { score: 4, text: '4 (Agentic): Agentic streaming of generative compliance components directly into the UI.' },
          { score: 5, text: '5 (Optimized): A single "pane of glass" orchestrates the entire lifecycle without leaving primary app.' }
        ],
        businessPainpoints: ['Users refuse to leave native tools', 'High context-switching overhead', 'Low adoption of external portals', 'Creative momentum interrupted', 'Long training cycles on separate compliance UIs'],
        technicalPainpoints: ['Brittle iframe integrations', 'No bidirectional state syncing', 'Complex OAuth/SSO across apps', 'API rate limits on native webhooks', 'Inconsistent UI styling across systems']
      },
      {
        id: '1.2',
        dimension: 'HITL Override & Audit Gateways',
        topic: 'How are generation exceptions and manual compliance overrides approved and logged?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): No override logging. Users copy-paste outputs without compliance sign-off.' },
          { score: 2, text: '2 (Siloed): Overrides sent via email/Slack; manual spreadsheets track approvals.' },
          { score: 3, text: '3 (Integrated): In-app override button, but approvals are slow and block release queues.' },
          { score: 4, text: '4 (Agentic): Multi-agent audit gateways automatically route overrides to designated compliance leads.' },
          { score: 5, text: '5 (Optimized): Real-time risk-profile routing allows instant auto-approval for low-risk changes.' }
        ],
        businessPainpoints: ['Compliance bottlenecks freezing GTM', 'Undocumented AI overrides risking lawsuits', 'Audit trail gaps during GxP reviews', 'MLR reviewer fatigue from repetitive approvals', 'Friction between creative and legal teams'],
        technicalPainpoints: ['No cryptographically signed audit logs', 'Lack of role-based routing (RBAC) in AI logic', 'Manual approval database entries', 'No fallback queues during high-traffic launches', 'Inability to trace override reasoning']
      },
      {
        id: '1.3',
        dimension: 'Brand Integrity & MLR Co-Pilot',
        topic: 'How are brand safety rules, MLR compliance guidelines, and fair balance rules enforced?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): Human editors manually memorize and verify 100+ pages of brand rules.' },
          { score: 2, text: '2 (Siloed): Hardcoded keyword filters block specific terms but miss semantic context.' },
          { score: 3, text: '3 (Integrated): Retrieval-Augmented Generation (RAG) checks brand guidelines but outputs still hallucinate.' },
          { score: 4, text: '4 (Agentic): Multi-agent brand checkers audit every sentence, highlighting risks before human review.' },
          { score: 5, text: '5 (Optimized): Automated self-correcting agents rewrite non-compliant text instantly.' }
        ],
        businessPainpoints: ['Severe brand dilution from rogue AI outputs', 'Fair-balance regulatory warning letters', 'High editing overhead (90% rewrite rates)', 'Inconsistent tone of voice across regions', 'MLR approval cycles taking weeks'],
        technicalPainpoints: ['Keyword blacklists are too rigid', 'RAG retrieves outdated brand guidelines', 'No semantic validation of generated images/text', 'Lack of compliance confidence scoring', 'No automated correction loop']
      }
    ]
  },
  {
    id: 'INTELLIGENCE',
    name: '2. Intelligence & Regulatory',
    weight: 10,
    purpose: 'Evaluates fair-balance compliance, regulatory reasoning, model safety, and multimodal synchronization.',
    questions: [
      {
        id: '2.1',
        dimension: 'Compliance Disclosures & Fair Balance',
        topic: 'How is fair balance (presenting risk information alongside benefits) guaranteed in generative outputs?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): Users must manually write and paste required risk disclosures.' },
          { score: 2, text: '2 (Siloed): System appends static risk text to the bottom of all outputs, regardless of context.' },
          { score: 3, text: '3 (Integrated): RAG dynamically pulls relevant risk terms but text formatting is inconsistent.' },
          { score: 4, text: '4 (Agentic): Dedicated compliance agents evaluate benefit statements and generate matching risk text.' },
          { score: 5, text: '5 (Optimized): Real-time layout-aware agents adjust disclosure size and placement for guaranteed prominence.' }
        ],
        businessPainpoints: ['FDA/EMA warning letters for omitting risks', 'Legal team blocking all generative use cases', 'Disclosures take up too much creative space', 'Inability to launch dynamic digital campaigns', 'High cost of manual compliance review'],
        technicalPainpoints: ['Disclosures decoupled from core benefit text', 'Lack of spatial formatting awareness in models', 'Prompt injection bypasses disclosure rules', 'No validation of risk prominence ratios', 'Inflexible static templates']
      },
      {
        id: '2.2',
        dimension: 'Regulatory Context Reasoning',
        topic: 'Can the system reason over complex local regulatory guidelines (e.g., FDA, EMA, PMDA) to adapt content?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): Compliance teams manually interpret local rules for every country launch.' },
          { score: 2, text: '2 (Siloed): Basic country routing maps users to separate country-specific folders.' },
          { score: 3, text: '3 (Integrated): RAG retrieves regional regulatory documents but fails to apply them correctly.' },
          { score: 4, text: '4 (Agentic): LLM agents reason over regional guidelines, adjusting claims and disclosures dynamically.' },
          { score: 5, text: '5 (Optimized): Automated multi-region compliance mapping adapts content for 50+ countries instantly.' }
        ],
        businessPainpoints: ['Global campaign rollouts delayed by months', 'Regional compliance violations', 'High cost of local translation and legal agencies', 'Inconsistent global brand messaging', 'Inability to scale cross-border marketing'],
        technicalPainpoints: ['Models conflate different regional rules', 'Guidelines are unstructured and hard to query', 'Prompt context limits prevent multi-region reasoning', 'Lack of localized validation benchmarks', 'No regional routing logic']
      },
      {
        id: '2.3',
        dimension: 'Model Garden Interoperability',
        topic: 'Can you swap out foundation models, fine-tune prompts, and control model routing without rebuilding code?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Hardcoded API calls to a single proprietary LLM. Swapping requires a full code rewrite.' },
          { score: 2, text: '2 (Siloed): Wrapper class allows model switching, but prompts must be manually updated.' },
          { score: 3, text: '3 (Integrated): Centralized Model Router, but lack of automated fallback rules.' },
          { score: 4, text: '4 (Framework-Driven): Abstracted Prompt Registry and Model Router with dynamic latency/cost routing.' },
          { score: 5, text: '5 (Optimized): Zero-downtime, model-agnostic architecture with real-time semantic fallback.' }
        ],
        businessPainpoints: ['Vendor lock-in to expensive LLM providers', 'System downtime during model deprecations', 'High operational cost from over-powered models', 'Inability to leverage newer, faster models', 'Slow engineering velocity'],
        technicalPainpoints: ['Hardcoded model endpoints and API keys', 'Prompt templates coupled with application code', 'No automated model benchmarking', 'No fallback to cheaper models for simple tasks', 'Lack of unified output schema parsing']
      },
      {
        id: '2.4',
        dimension: 'Multimodal Grounding & Audio Sync',
        topic: 'Are audio, video, and text assets semantically linked, grounded in clinical databases, and synchronized?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Audio, video, and text are produced in silos and manually synchronized by video editors.' },
          { score: 2, text: '2 (Siloed): Script generated by AI, but voiceover and video editing are fully manual.' },
          { score: 3, text: '3 (Integrated): Automated text-to-speech, but voice lacks natural inflection and lipsync is off.' },
          { score: 4, text: '4 (Agentic): Multimodal grounding agents generate audio, video, and text from a single source of truth.' },
          { score: 5, text: '5 (Optimized): Dynamic, real-time avatar synchronization with automated localized lip-syncing.' }
        ],
        businessPainpoints: ['High cost of video/audio localization', 'Generated videos look robotic and unprofessional', 'Clinical claims in videos mismatch text labels', 'Long production timelines for training videos', 'Inability to update video content quickly'],
        technicalPainpoints: ['Decoupled audio and video pipelines', 'No temporal grounding of clinical claims', 'Robotic text-to-speech synthesis', 'Lipsync drift in localized videos', 'High rendering latency']
      }
    ]
  },
  {
    id: 'DATA_INTEGRATION',
    name: '3. Data & Semantic Integration',
    weight: 5,
    purpose: 'Evaluates real-time data connectors, vector search, semantic memory, and knowledge graphs.',
    questions: [
      {
        id: '3.1',
        dimension: 'Enterprise Data Interoperability',
        topic: 'Can the system fetch and write data to core systems (e.g., Veeva, Salesforce, SAP) in real-time?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): Users manually download CSVs and upload them to the AI tool.' },
          { score: 2, text: '2 (Siloed): Batch night-time ETL pipelines sync data to a separate database.' },
          { score: 3, text: '3 (Integrated): Direct REST API integrations, but queries are slow and lack real-time writebacks.' },
          { score: 4, text: '4 (Agentic): Real-time bi-directional connectors with automated schema mapping.' },
          { score: 5, text: '5 (Optimized): Zero-ETL semantic data mesh with instant writeback and transaction locking.' }
        ],
        businessPainpoints: ['Decisions based on stale, outdated data', 'Data entry errors from manual transfers', 'Compliance issues from un-synced systems', 'High developer cost for custom API connectors', 'Inability to automate transactional tasks'],
        technicalPainpoints: ['Fragile point-to-point API plumbing', 'High latency during real-time queries', 'Lack of transactional safety (no rollbacks)', 'No automated error handling for API failures', 'Hardcoded authentication tokens']
      },
      {
        id: '3.2',
        dimension: 'Semantic Memory & Graph Integration',
        topic: 'Is there a unified semantic memory layer (Vector DB + Knowledge Graph) to maintain context?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): No persistent memory. Every session starts with zero knowledge of the user/case.' },
          { score: 2, text: '2 (Siloed): Session-level memory stored in a local cache, lost when tab closes.' },
          { score: 3, text: '3 (Integrated): Centralized Vector DB for document search, but lacks relationship context.' },
          { score: 4, text: '4 (Agentic): Hybrid memory architecture combining Vector search with a Knowledge Graph.' },
          { score: 5, text: '5 (Optimized): Self-evolving semantic memory mesh that auto-updates relations in real-time.' }
        ],
        businessPainpoints: ['AI forgets user context across sessions', 'Repetitive prompting required from users', 'Inability to trace complex data relationships', 'Hallucinations on relational queries', 'Poor personalized recommendations'],
        technicalPainpoints: ['Vector search lacks relationship mapping', 'Graph databases are hard to query in real-time', 'High latency from multi-hop graph queries', 'Memory drift over long conversations', 'No automated entity extraction']
      }
    ]
  },
  {
    id: 'RUNTIME_ARCH',
    name: '4. Runtime Architecture & State Management',
    weight: 13,
    purpose: 'Evaluates multi-agent orchestration, state persistence, SaaS integration, FinOps, and distributed tracing.',
    questions: [
      {
        id: '4.1',
        dimension: 'Multi-Agent Choreography',
        topic: 'Does the runtime coordinate specialized subagents with distinct roles and parallel execution?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Single monolithic prompt tries to do everything, leading to hallucinations.' },
          { score: 2, text: '2 (Siloed): Hardcoded, linear chaining of 2-3 prompts (no branching or decision making).' },
          { score: 3, text: '3 (Integrated): Centralized orchestrator routes tasks, but execution is synchronous and slow.' },
          { score: 4, text: '4 (Agentic): Autonomous multi-agent runtime with dynamic branching and parallel execution.' },
          { score: 5, text: '5 (Optimized): Asynchronous, event-driven agent mesh with self-healing task queues.' }
        ],
        businessPainpoints: ['High hallucination rates on complex tasks', 'Extremely slow response times (timeouts)', 'Inability to automate non-linear workflows', 'Heavy engineering cost to debug monoliths', 'Rigid systems that break on edge cases'],
        technicalPainpoints: ['No standardized agent communication protocol', 'Synchronous prompt execution bottlenecks', 'Lack of dynamic task routing logic', 'No parallel model execution support', 'Hardcoded orchestrator logic']
      },
      {
        id: '4.2',
        dimension: 'State Persistence & Session Failover',
        topic: 'Are agent state, conversation history, and active task trees persisted to survive server restarts?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): Zero persistence. If a connection drops, the entire session and state are lost.' },
          { score: 2, text: '2 (Siloed): State stored in local browser storage, highly vulnerable to loss.' },
          { score: 3, text: '3 (Integrated): Relational database saves chat history, but active task state is lost.' },
          { score: 4, text: '4 (Agentic): Distributed state machine persists active task trees and variable states in real-time.' },
          { score: 5, text: '5 (Optimized): Transparent session resume with instant, zero-state-loss hot failover.' }
        ],
        businessPainpoints: ['High user frustration from dropped sessions', 'Wasted model tokens from restarted tasks', 'Inability to run long-running async tasks', 'Lost audit trails during system crashes', 'Customer support tickets for broken flows'],
        technicalPainpoints: ['Active agent memory not serialized', 'No distributed cache (Redis) integration', 'Loss of execution context during restarts', 'No optimistic locking on state writes', 'Monolithic state stores cause bottlenecks']
      },
      {
        id: '4.3',
        dimension: 'SaaS Platform Interoperability',
        topic: 'Can agents coordinate actions across distinct SaaS platforms (e.g., ServiceNow to Veeva to Teams)?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Users act as the human integration layer, copy-pasting data between tabs.' },
          { score: 2, text: '2 (Siloed): Basic webhook integrations trigger simple notifications but no actions.' },
          { score: 3, text: '3 (Integrated): Centralized iPaaS (e.g., MuleSoft) connects systems, but flows are rigid.' },
          { score: 4, text: '4 (Agentic): Cross-platform agent mesh orchestrates multi-system transactions autonomously.' },
          { score: 5, text: '5 (Optimized): Semantic API discovery allows agents to bind to new SaaS endpoints on-the-fly.' }
        ],
        businessPainpoints: ['Manual cross-system processes are slow', 'Data discrepancy across enterprise systems', 'High cost of maintaining custom integration glue', 'Slow employee onboarding (too many tools)', 'Inability to automate end-to-end business flows'],
        technicalPainpoints: ['iPaaS flows are too rigid for AI logic', 'API authentication limits across domains', 'No transactional rollback across SaaS APIs', 'Brittle custom connector code', 'Lack of standardized semantic API specs']
      },
      {
        id: '4.4',
        dimension: 'FinOps Cost Guardrails',
        topic: 'Are there active rate limits, budget ceilings, and semantic routing to optimize LLM spend?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): No cost tracking. System runs until the API key is deactivated due to high bills.' },
          { score: 2, text: '2 (Siloed): Monthly billing alerts from cloud providers, but no in-app cost controls.' },
          { score: 3, text: '3 (Integrated): Basic token counter logs usage, but cannot block runaway loops.' },
          { score: 4, text: '4 (Agentic): Active FinOps middleware enforces user/session budgets and routes tasks based on cost.' },
          { score: 5, text: '5 (Optimized): Real-time token arbitrage dynamically routes queries to the cheapest optimal model.' }
        ],
        businessPainpoints: ['Runaway AI spend (shock bills)', 'Inability to predict or scale AI OpEx budgets', 'Resource denial from rogue developer loops', 'Inflexible access policies (all-or-nothing)', 'High cost per transaction limiting ROI'],
        technicalPainpoints: ['No token middleware in the API path', 'Lack of cost attribution per user/session', 'Runaway agent loops cannot be auto-killed', 'No semantic model routing based on task cost', 'Static model allocation']
      },
      {
        id: '4.5',
        dimension: 'Legacy System Modernization',
        topic: 'Does the design facilitate wrapping legacy databases and SOAP APIs in semantic schemas?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Legacy systems ignored. AI only connects to modern REST databases.' },
          { score: 2, text: '2 (Siloed): Dedicated database replication copy-pastes legacy data to a modern cloud store.' },
          { score: 3, text: '3 (Integrated): Custom middleware wraps legacy SOAP/SQL into basic REST endpoints.' },
          { score: 4, text: '4 (Agentic): Semantic wrappers expose legacy mainframe structures as Agent Tools.' },
          { score: 5, text: '5 (Optimized): Automated model-driven generation of semantic schemas over any system.' }
        ],
        businessPainpoints: ['Valuable legacy data locked in mainframes', 'High cost of database replication and storage', 'Slow developer velocity due to legacy bottlenecks', 'Security risks from exposed legacy databases', 'Maintenance cost of obsolete middleware'],
        technicalPainpoints: ['SOAP schemas are incompatible with AI tools', 'High latency from legacy database queries', 'SQL injection risks from dynamic query generation', 'Lack of connection pooling for legacy APIs', 'Brittle database wrappers']
      },
      {
        id: '4.6',
        dimension: 'Distributed Tracing & OpenTelemetry',
        topic: 'Is there end-to-end tracing of prompt inputs, LLM latencies, and tool execution paths?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): No logging. Debugging requires developers to print local console logs.' },
          { score: 2, text: '2 (Siloed): Standard server logs track HTTP codes but miss prompt inputs/outputs.' },
          { score: 3, text: '3 (Integrated): Basic prompt logging to a local file, but no trace correlation.' },
          { score: 4, text: '4 (Agentic): Full OpenTelemetry integration tracing every sub-agent step and model call.' },
          { score: 5, text: '5 (Optimized): Real-time semantic trace analytics automatically flag prompt drift and failures.' }
        ],
        businessPainpoints: ['Weeks required to debug agent failures', 'Inability to audit AI decision-making paths', 'No visibility into LLM latency bottlenecks', 'Compliance validation failures due to zero tracing', 'High support cost for mysterious errors'],
        technicalPainpoints: ['No trace propagation headers across agents', 'Lack of correlation between prompts and tools', 'Trace collectors cause high performance overhead', 'Structured logs lack model-specific metadata', 'No automated trace aggregation']
      }
    ]
  },
  {
    id: 'SECURITY_GXP',
    name: '5. Security, Traceability & Validation (GxP)',
    weight: 15,
    purpose: 'Evaluates GxP software validation, API gateway security, credentials rotation, and data isolation.',
    questions: [
      {
        id: '5.1',
        dimension: 'GxP Software Validation',
        topic: 'Are model updates, prompts, and agent configurations subject to strict validation?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): No validation. Developers change prompts and models directly in production.' },
          { score: 2, text: '2 (Siloed): Basic unit tests, but no regression testing for non-deterministic model outputs.' },
          { score: 3, text: '3 (Integrated): CI/CD pipeline runs prompt regression suites, but lacks GxP compliance sign-off.' },
          { score: 4, text: '4 (Agentic): Automated GxP validation pipeline with golden-dataset evaluation and digital signatures.' },
          { score: 5, text: '5 (Optimized): Continuous compliance validation with real-time audit trails and automated rollback.' }
        ],
        businessPainpoints: ['FDA warning letters for unvalidated systems', 'Severe system regressions (sudden hallucinations)', 'High cost of manual validation paperwork', 'Slow feature release cycles (months of compliance delay)', 'Auditor penalties during regulatory reviews'],
        technicalPainpoints: ['No automated prompt regression testing', 'Lack of cryptographic signatures in releases', 'Models updated without sandbox evaluation', 'No drift detection for model weights/parameters', 'Inability to lock prompts in GxP environments']
      },
      {
        id: '5.2',
        dimension: 'API Gateway Guardrails',
        topic: 'Is there a centralized API gateway enforcing semantic threat protection and prompt injection filters?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): Developers connect directly to LLM APIs with zero middle security.' },
          { score: 2, text: '2 (Siloed): Basic API gateway manages rate limits but misses prompt injection attacks.' },
          { score: 3, text: '3 (Integrated): Centralized AI Security Gateway dynamically blocks jailbreaks, injections, and data leaks.' },
          { score: 5, text: '5 (Optimized): Real-time self-correcting security mesh intercepts and sanitizes payload streams.' }
        ],
        businessPainpoints: ['Jailbreak attacks exposing company data', 'Data leak lawsuits (accidental PHI/PII sharing)', 'Regulatory non-compliance with regional data laws', 'High cost of manual security code audits', 'Brand damage from highly inappropriate outputs'],
        technicalPainpoints: ['No centralized interceptor for model payloads', 'Jailbreak filters are easily bypassed by wrappers', 'High latency from deep semantic security checks', 'No automated sanitization of system prompt inputs', 'Lack of API key isolation per user']
      },
      {
        id: '5.3',
        dimension: 'Security Drift Monitoring',
        topic: 'Are configurations, access policies, and model metadata audited in real-time to detect drift?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Security reviews are annual manual checklists.' },
          { score: 2, text: '2 (Siloed): Log files generated, but require manual scripting to audit.' },
          { score: 3, text: '3 (Integrated): SIEM dashboard aggregates logs, but lack of automated drift alerts.' },
          { score: 4, text: '4 (Agentic): Security agents continuously audit configurations and auto-remediate drift.' },
          { score: 5, text: '5 (Optimized): Zero-trust configuration mesh with cryptographic configuration locking.' }
        ],
        businessPainpoints: ['Undetected security holes for months', 'Inability to pass security audits', 'High cost of compliance consultants', 'Configuration changes break security rules', 'Accidental exposure of developer keys'],
        technicalPainpoints: ['No automated configuration scanning', 'Audit trails are incomplete and mutable', 'No real-time alerts for policy drift', 'Lack of drift correlation across systems', 'No self-healing configuration scripts']
      },
      {
        id: '5.4',
        dimension: 'Cross-Boundary Identity',
        topic: 'How are user permissions enforced when delegating to third-party agents?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Agents run on a single over-privileged service account.' },
          { score: 2, text: '2 (Siloed): Hardcoded API keys for destination systems.' },
          { score: 3, text: '3 (Integrated): Basic OAuth but unable to dynamically downgrade permissions per user.' },
          { score: 4, text: "4 (Agentic): The invoking user's exact identity and permissions pass strictly across boundaries." },
          { score: 5, text: '5 (Optimized): AI Gateways enforce context-aware access policies in real-time.' }
        ],
        businessPainpoints: ['Over-privileged service account risks', 'Unauthorized user data access', 'Lack of dynamic security', 'Compliance audit failures', 'Accidental data modification'],
        technicalPainpoints: ['Hardcoded destination API keys', 'No user identity propagation mesh', 'No role-based delegation contracts', 'Token exchange is insecure', 'Inability to audit agent delegation']
      },
      {
        id: '5.5',
        dimension: 'Data Sandbox Isolation',
        topic: 'Are customer data boundaries, sandbox environments, and LLM training data isolated?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Shared database. All customer data co-exists in the same folders.' },
          { score: 2, text: '2 (Siloed): Logical database isolation, but LLM utilizes shared pools.' },
          { score: 3, text: '3 (Integrated): Database and search indexes fully isolated, but models share prompt cache.' },
          { score: 4, text: '4 (Agentic): Full sandbox isolation. Model weights, prompts, and vector databases isolated.' },
          { score: 5, text: '5 (Optimized): Dynamic, zero-trust sandbox provisioning with automated cryptographic data erasure.' }
        ],
        businessPainpoints: ['Accidental customer data leaks', 'Violation of customer data privacy contracts', 'Regulators blocking shared cloud models', 'High cost of dedicated single-tenant infra', 'Loss of customer trust'],
        technicalPainpoints: ['Shared prompt cache leaks information', 'Lack of database schema isolation', 'No automated sandbox cleanup scripts', 'Model fine-tuning leaks customer data', 'Shared API gateways lack customer routing']
      },
      {
        id: '5.6',
        dimension: 'Quality Sign-off Gates',
        topic: 'Are release approvals locked behind verified signatures from Quality Management (QM) and C-suite?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): Informal sign-off. Releases deployed via verbal/Slack approval.' },
          { score: 2, text: '2 (Siloed): Email sign-off sheet. PDF signature routing takes weeks.' },
          { score: 3, text: '3 (Integrated): Digital sign-off in Jira, but release is not cryptographically locked.' },
          { score: 4, text: '4 (Agentic): Cryptographically locked releases requiring C-suite and QM multi-party keys.' },
          { score: 5, text: '5 (Optimized): Automated multi-party consensus locks deployment pipelines natively.' }
        ],
        businessPainpoints: ['Unapproved prompt changes hitting production', 'Regulatory non-compliance with QM sign-offs', 'Delayed time-to-market due to slow approvals', 'Risk of internal rogue deployments', 'High auditing costs during GxP reviews'],
        technicalPainpoints: ['No hardwired deployment locks', 'Lack of cryptographic signature binding', 'No automated quality gates', 'Mismatched release schemas', 'Inability to trace QU review history']
      }
    ]
  },
  {
    id: 'FEASIBILITY',
    name: '6. Implementation Feasibility & TCO',
    weight: 9,
    purpose: 'Evaluates customization cost, architectural complexity, time-to-market, and maintenance debt.',
    questions: [
      {
        id: '6.1',
        dimension: 'Customization Cost (SI Spend)',
        topic: 'How much bespoke glue code and infrastructure must be built from scratch?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): 100% Bespoke. Developers build database routing, state machines, and UI from scratch ($5M+ SI).' },
          { score: 2, text: '2 (Siloed): Heavy Customization. Utilizing templates, but core agent comms require heavy manual coding.' },
          { score: 3, text: '3 (Integrated): Moderate Customization. Middleware exists, but integrating legacy systems requires custom wrappers.' },
          { score: 4, text: '4 (Framework-Driven): Platform handles routing/state natively, slashing custom code by 60%.' },
          { score: 5, text: '5 (Optimized): Zero-Custom-Code Configuration. Platform-native components snap together.' }
        ],
        businessPainpoints: ['Exorbitant Systems Integrator (SI) billable hours', 'Massive upfront CapEx requirements', 'Unpredictable project budget overruns', 'Longer validation timelines', 'Heavy reliance on external contracting firms'],
        technicalPainpoints: ['Writing custom routing middleware from scratch', 'No standardized agent communication libraries', 'Brittle custom state machine code', 'Heavy API integration overhead', 'Custom security patching required for custom code']
      },
      {
        id: '6.2',
        dimension: 'Architectural Complexity & Moving Parts',
        topic: 'Does it require maintaining multiple disparate databases, compute clusters, and networking rules?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): Fragile Spaghetti. Dozens of point-to-point connections, multiple distinct databases.' },
          { score: 2, text: '2 (Siloed): Complex Plumbing. Agents require dedicated compute clusters and complex networking rules.' },
          { score: 3, text: '3 (Integrated): Standardized but Heavy. Centralized gateway, but requires deep infra expertise to scale.' },
          { score: 4, text: '4 (Abstracted): Infrastructure heavily abstracted behind Managed Agent APIs.' },
          { score: 5, text: '5 (Optimized): Serverless & Declarative. Managed serverless architecture deployed via simple YAML.' }
        ],
        businessPainpoints: ['Required specialized DevOps staff to maintain', 'High cloud infrastructure spend', 'Longer resolution times during outages', 'Engineering team cognitive overload', 'Friction in environment provisioning'],
        technicalPainpoints: ['Managing separate vector, state, and transactional DBs', 'Complex Kubernetes networking and ingress rules', 'Load balancing multi-tenant agent compute', 'API security tokens hard to rotate safely', 'Lack of unified log aggregation across parts']
      },
      {
        id: '6.3',
        dimension: 'Time-to-Market & Velocity',
        topic: 'Can this architecture be successfully validated and launched by the strict January 2027 MVP deadline?',
        weight: 3,
        options: [
          { score: 1, text: '1 (Manual): 12–18+ Months. Custom builds with GxP validation paperwork for every line.' },
          { score: 2, text: '2 (Siloed): 9–12 Months. Highly risky for a January 2027 launch.' },
          { score: 3, text: '3 (Integrated): 6–9 Months. Feasible but requires scope-cutting of features.' },
          { score: 4, text: '4 (Agentic): 3–6 Months. Frameworks drastically accelerate development, easily hitting target.' },
          { score: 5, text: '5 (Optimized): Weeks to Launch. Plug-and-play integrations via marketplaces and MCP.' }
        ],
        businessPainpoints: ['Missed competitive window (deadline failure)', 'Sunk CapEx with zero business return in 2026', 'Department credibility damage with leadership', 'Delayed drug pipeline acceleration benefits', 'Compliance validation backlogs freezing deployments'],
        technicalPainpoints: ['Validation paperwork bottlenecking releases', 'Writing custom unit tests for non-deterministic LLMs', 'Long provisioning queues in traditional MLOps', 'Integrations with legacy silos take months', 'No pre-validated environment templates']
      },
      {
        id: '6.4',
        dimension: 'Maintenance Debt & Extensibility',
        topic: 'How much operational overhead is required when foundation models or APIs inevitably update?',
        weight: 2,
        options: [
          { score: 1, text: '1 (Manual): High Breakage. Every model update breaks custom glue code, requiring full re-validation.' },
          { score: 2, text: '2 (Siloed): Heavy Maintenance. Dedicated teams required to constantly tune prompts.' },
          { score: 3, text: '3 (Integrated): Standard Maintenance. CI/CD automates some patching, but upgrades require coding.' },
          { score: 4, text: '4 (Agentic): Framework Shielding. Framework abstracts APIs, protecting code from breaking.' },
          { score: 5, text: '5 (Optimized): Self-Healing & Evergreen. Platform natively manages model lifecycle and auto-validates.' }
        ],
        businessPainpoints: ['Severe OpEx maintenance drain in 2028', 'System downtime from unannounced model deprecations', 'Constant compliance re-certification fatigue', 'Slow rollout of newer model efficiencies', 'Engineering team spent on patching vs features'],
        technicalPainpoints: ['Model API syntax updates break local code', 'Prompt drift causing unexpected hallucinations', 'Manual GxP re-validation per minor release', 'Lack of automated drift detection alerts', 'No evergreen model abstraction routing layers']
      }
    ]
  }
];

const FLAT_QUESTIONS = [];
V12_PILLARS.forEach(p => {
  p.questions.forEach(q => {
    FLAT_QUESTIONS.push({ ...q, pillarId: p.id, pillarName: p.name });
  });
});

export default function PremiumScopingAssessorV12({ onBackToLanding, globalTheme = 'light', apiKey = '', gcpToken = '' }) {
  const [activeTab, setActiveTab] = useState('intake');
  const [reportPage, setReportPage] = useState('summary'); // 'summary' | 'matrix' | 'blueprints' | 'sandbox' | 'benchmarks' | 'roadmap' | 'gxp_validation' | 'whatif'
  
  const [customerInfo, setCustomerInfo] = useState({
    company: 'Novartis CMC Operations',
    useCaseName: 'Dossier Automation Assistant [CSR_V12]',
    domain: 'Quality & Compliance',
    runtime: 'Google Cloud Vertex AI',
    connectors: ['Veeva Vault GxP Docs', 'BigQuery Zero-ETL Feature Store']
  });

  const [scores, setScores] = useState(() => {
    const initial = {};
    FLAT_QUESTIONS.forEach(q => {
      initial[q.id] = {
        current: null,
        future: null,
        techPain: [],
        bizPain: [],
        comments: '',
        skipped: false
      };
    });
    return initial;
  });

  const [liveSynthesis, setLiveSynthesis] = useState(null);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const activeQuestion = FLAT_QUESTIONS[activeQuestionIdx];
  const activeQuestionId = activeQuestion.id;

  const activePillarIdx = useMemo(() => {
    return V12_PILLARS.findIndex(p => p.id === activeQuestion.pillarId);
  }, [activeQuestion]);

  const [geminiStreamingState, setGeminiStreamingState] = useState({
    active: false,
    currentStep: 1,
    logs: []
  });

  // Dynamic status filters
  const doneCount = useMemo(() => {
    return FLAT_QUESTIONS.filter(q => typeof scores[q.id]?.current === 'number').length;
  }, [scores]);

  const todoCount = useMemo(() => 25 - doneCount, [doneCount]);

  // Premium McKinsey Light Theme Tokens (Stripe/Apple Clean Aesthetics)
  const colors = {
    bgDark: '#f8fafc', // Slate 50
    bgCard: '#ffffff', // Pure white cards
    borderGrey: 'rgba(15, 23, 42, 0.08)', // Slate 900 at 8% opacity
    textDark: '#0f172a', // Slate 900
    textMuted: '#475569', // Slate 600
    accentTeal: '#0d9488', // Teal 600 (High contrast green-teal)
    accentAmber: '#d97706', // Amber 600 (High contrast amber)
    accentCoral: '#e11d48', // Rose 600 (High contrast red-rose)
    purpleGradient: 'linear-gradient(135deg, #2563eb, #7c3aed)' // Blue 600 to Purple 600
  };

  // C-Suite Mathematical Weight Scoring Engine
  const scoringData = useMemo(() => {
    let totalWeightedPoints = 0;
    let yAxisWeightedPoints = 0;
    let xAxisWeightedPoints = 0;
    let totalWeightSum = 0;
    let yWeightSum = 0;
    let xWeightSum = 0;

    FLAT_QUESTIONS.forEach(q => {
      const scoreObj = scores[q.id] || {};
      if (typeof scoreObj.current === 'number') {
        const cur = scoreObj.current;
        const weightedScore = cur * q.weight;
        totalWeightedPoints += weightedScore;
        totalWeightSum += q.weight;

        if (q.pillarId === 'FEASIBILITY') {
          xAxisWeightedPoints += weightedScore;
          xWeightSum += q.weight;
        } else {
          yAxisWeightedPoints += weightedScore;
          yWeightSum += q.weight;
        }
      }
    });

    const finalScore = totalWeightSum > 0 ? Number((totalWeightedPoints / totalWeightSum).toFixed(2)) : 0;
    const capabilityScore = yWeightSum > 0 ? Number((yAxisWeightedPoints / yWeightSum).toFixed(2)) : 0;
    const feasibilityScore = xWeightSum > 0 ? Number((xAxisWeightedPoints / xWeightSum).toFixed(2)) : 0;

    let verdict = 'Offline';
    if (totalWeightSum > 0) {
      if (finalScore >= 4.0) verdict = 'Strategic Launch';
      else if (finalScore >= 3.0) verdict = 'Fund Incubator';
      else if (finalScore >= 2.0) verdict = 'Coached Re-Architect';
      else verdict = 'De-Prioritize';
    }

    return {
      overallScore: finalScore,
      capabilityScore,
      feasibilityScore,
      verdict,
      totalAnswered: totalWeightSum > 0 ? FLAT_QUESTIONS.filter(q => typeof scores[q.id]?.current === 'number').length : 0
    };
  }, [scores]);

  // Enhanced Scenario Sandbox States
  const [crossPlatformOrch, setCrossPlatformOrch] = useState(false);
  const [siBudgetSlider, setSiBudgetSlider] = useState(350); // SI Budget in $K
  const [buyVsBuildSelection, setBuyVsBuildSelection] = useState('build'); // 'buy' (Veeva Native / AWS) | 'build' (Custom Mesh / Google)

  // Composable What-If Engine States
  const [whatIfOrch, setWhatIfOrch] = useState('google'); // 'google' | 'aws' | 'veeva'
  const [whatIfIdentity, setWhatIfIdentity] = useState('entra'); // 'entra' | 'ping'
  const [whatIfFederation, setWhatIfFederation] = useState('mcp'); // 'mcp' | 'webhooks' | 'etl'
  const [whatIfStorage, setWhatIfStorage] = useState('adobe'); // 'adobe' | 'veeva_promomats' | 's3'
  const [scenarioNameInput, setScenarioNameInput] = useState('');
  const [savedScenarios, setSavedScenarios] = useState([
    { name: 'Scenario A: Composable Google + Adobe Mesh', orch: 'google', identity: 'entra', federation: 'mcp', storage: 'adobe', tco: '4.8M', mvp: '6mo', gxp: '93/100', agility: 92, compliance: 90, costEfficiency: 86 },
    { name: 'Scenario B: Veeva Vault Native Monolith', orch: 'veeva', identity: 'entra', federation: 'etl', storage: 'veeva_promomats', tco: '5.2M', mvp: '8mo', gxp: '98/100', agility: 65, compliance: 98, costEfficiency: 82 }
  ]);

  // Page 3 Architecture Drawing Sandbox State
  const [whiteboardShapes, setWhiteboardShapes] = useState([]);
  const [activeTool, setActiveTool] = useState('select'); // 'select' | 'box' | 'circle' | 'line' | 'text'
  const [editModeActive, setEditModeActive] = useState(false);
  const [hoveredArchBlock, setHoveredArchBlock] = useState(null);
  
  // Adobe GenStudio DAG visualizer modal (Page 3)
  const [activeDagNode, setActiveDagNode] = useState(null);

  // Page 5 Sovereignty Globe Region Selector
  const [selectedRegion, setSelectedRegion] = useState('germany'); // 'germany' | 'texas'

  // Page 2 Matrix Filter
  const [matrixSearch, setMatrixSearch] = useState('');
  const [matrixFilter, setMatrixFilter] = useState('all'); // 'all' | 'critical' | 'gaps'
  const [selectedMatrixRow, setSelectedMatrixRow] = useState(null);

  // Page 6 MLR Swimlane Parallel Simulator
  const [mlrSimActive, setMlrSimActive] = useState(false);
  const [mlrSimStep, setMlrSimStep] = useState(0); // 0: idle, 1: drop, 2: shatter, 3: routing, 4: complete
  const [mlrTimer, setMlrTimer] = useState(0);

  // Gantt Chart interactive tooltip state (Page 6)
  const [hoveredGanttTask, setHoveredGanttTask] = useState(null);
  
  // Sign-Off Ledger (Page 6)
  const [signOffModalActive, setSignOffModalActive] = useState(false);
  const [customSignatory, setCustomSignatory] = useState('');
  const [isSignedOff, setIsSignedOff] = useState(false);

  // Dynamic TCO Waterfall Computations (connected to sandbox controls & Buy vs Build toggle)
  const financialMetrics = useMemo(() => {
    const rateFactor = 1.0;
    
    // CapEx calculations based on Buy vs Build selection
    const baseSI = buyVsBuildSelection === 'build' ? Math.round(340000 * rateFactor) : Math.round(80000 * rateFactor);
    const designCapEx = buyVsBuildSelection === 'build' ? 110000 : 40000;
    const totalCapEx = baseSI + designCapEx;

    // OpEx calculations
    const softwareLicense = buyVsBuildSelection === 'buy' ? 120000 : 0; 
    const modelCompute = buyVsBuildSelection === 'buy' ? 320000 : 80000; 
    const totalOpEx = softwareLicense + modelCompute;

    const netTCO = totalCapEx + totalOpEx;
    const paybackMonths = buyVsBuildSelection === 'buy' ? 4 : 16;
    const netROI = Math.round((totalCapEx * 1.5) + (totalOpEx * 0.8));
    const goLiveTimeline = buyVsBuildSelection === 'buy' ? 'Jan 2027 (On Time)' : 'Nov 2027 (GxP Validation Delay)';

    return {
      baseSI,
      softwareLicense,
      modelCompute,
      totalCapEx,
      totalOpEx,
      netTCO,
      paybackMonths,
      netROI,
      goLiveTimeline
    };
  }, [buyVsBuildSelection]);

  // Navigation handlers
  const handleNextQuestion = () => {
    if (activeQuestionIdx < FLAT_QUESTIONS.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx(prev => prev - 1);
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
      [activeQuestionId]: { ...prev[activeQuestionId], comments: txt }
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
      if (typeof scores[q.id]?.current === 'number') completed++;
    });
    return `${completed}/${pillar.questions.length}`;
  };

  const isPillarCompleted = (pillar) => {
    const answered = pillar.questions.filter(q => typeof scores[q.id]?.current === 'number').length;
    return answered === pillar.questions.length;
  };

  // High-Randomness Dynamic Scopes Prefiller
  const handleAutoFillRandom = () => {
    const companies = [
      {
        company: 'Novartis CMC Operations',
        useCaseName: 'Dossier Automation Assistant [CSR_V12]',
        domain: 'Quality & Compliance',
        runtime: 'Google Cloud Vertex AI',
        connectors: ['Veeva Vault GxP Docs', 'BigQuery Zero-ETL Feature Store']
      },
      {
        company: 'Merck Vaccines Global',
        useCaseName: 'Regulatory Submission-Copilot [V12]',
        domain: 'Regulatory Affairs',
        runtime: 'Google Cloud Vertex AI',
        connectors: ['Veeva Vault RIM', 'Databricks Delta Sharing Link']
      },
      {
        company: 'Pfizer Oncology Research',
        useCaseName: 'Clinical Trial Protocol Generator [V12]',
        domain: 'Clinical Development',
        runtime: 'Hybrid GCP/On-Premises Anthos',
        connectors: ['Medidata Rave REST API', 'BigQuery Omnishare']
      },
      {
        company: 'Roche Diagnostics Global',
        useCaseName: 'Instrument Log Analyzer & Assistant [V12]',
        domain: 'Medical Devices & Safety',
        runtime: 'Google Cloud Vertex AI',
        connectors: ['SAP Cloud ERP SOAP Wrapper', 'Google Pub/Sub Egress']
      }
    ];

    const selectedProfile = companies[Math.floor(Math.random() * companies.length)];
    setCustomerInfo(selectedProfile);

    const presetScores = {};
    FLAT_QUESTIONS.forEach(q => {
      const curr = Math.floor(Math.random() * 3) + 1; 
      const maxFut = Math.min(5, curr + 2);
      const fut = curr + Math.floor(Math.random() * (maxFut - curr + 1)); 

      const techPain = (q.technicalPainpoints || []).filter(() => Math.random() > 0.6);
      const bizPain = (q.businessPainpoints || []).filter(() => Math.random() > 0.6);

      let comments = '';
      if (Math.random() > 0.6) {
        const notesPool = [
          `Stakeholder reports significant manual review latency on ${q.dimension}.`,
          `GxP validation perimeters require formal Google Cloud security review for ${q.dimension}.`,
          `Current manual workflow on ${q.dimension} incurs high operational and transcription debt.`,
          `Legacy API connector constraints block automated, real-time scaling of ${q.dimension}.`,
          `C-Suite requested prioritizing security perimeters and VPC-SC isolation for ${q.dimension}.`
        ];
        comments = notesPool[Math.floor(Math.random() * notesPool.length)];
      }

      presetScores[q.id] = {
        current: curr,
        future: fut,
        techPain,
        bizPain,
        comments,
        skipped: false
      };
    });

    setScores(presetScores);
    setActiveTab('intake');
  };

  // Live Vertex AI / Gemini flash compilation
  const handleRunLiveGeminiAssessment = async () => {
    const ts = () => new Date().toISOString().replace('T', ' ').substring(11, 23);
    const { generateMaturityReport } = await import('../services/aiService');

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
      await new Promise(r => setTimeout(r, 120));
      currentLogs.push(stepLogs[i]);
      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: i + 2,
        logs: [...currentLogs]
      }));
    }

    try {
      const activeKey = (apiKey || localStorage.getItem('gemini_api_key') || window.__VITE_ACTIVE_API_KEY__ || '').trim();
      
      const formattedPayload = V12_PILLARS.map(pillar => {
        return {
          pillar: pillar.name,
          results: pillar.questions.map(q => {
            const qScore = scores[q.id] || {};
            return {
              id: q.id,
              topic: q.topic,
              currentScore: typeof qScore.current === 'number' ? qScore.current : null,
              futureScore: typeof qScore.future === 'number' ? qScore.future : null,
              notes: qScore.comments || '',
              technicalPainpoints: qScore.techPain || [],
              businessPainpoints: qScore.bizPain || []
            };
          })
        };
      });

      const response = await generateMaturityReport(
        customerInfo, 
        formattedPayload, 
        activeKey, 
        gcpToken, 
        (step, msg) => {
          setGeminiStreamingState(prev => ({
            ...prev,
            logs: [...prev.logs, `[${ts()}] [AI_ENGINE] ${msg}`]
          }));
        }, 
        'option12'
      );
      
      if (response && (response.report || response.executiveSummary)) {
        setLiveSynthesis(response.report || response);
      } else {
        throw new Error("Unexpected API schema");
      }

      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: 6,
        logs: [...prev.logs, `[${ts()}] [SUCCESS] V12 Executive Readiness Dossier completed successfully!`]
      }));

      setTimeout(() => {
        setGeminiStreamingState(prev => ({ ...prev, active: false }));
        handleTabSwitch('scorecard');
      }, 500);

    } catch(err) {
      console.error("Live AI Generation Failed, falling back to rich simulation:", err);
      setLiveSynthesis({
        executiveSummary: {
          maturityGrade: scoringData.overallScore >= 4.0 ? "A" : scoringData.overallScore >= 3.0 ? "B" : "C",
          maturityLabel: scoringData.verdict,
          rationale: `Maturity Scoping Dossier for ${customerInfo.company}. The active discovery workflow "${customerInfo.useCaseName}" exhibits a weighted current suitability index of ${scoringData.overallScore.toFixed(1)}/5.0, target future readiness of ${(scoringData.overallScore + 1.2).toFixed(1)}/5.0, leaving a strategic GAP of 1.2 points. Business & Operational readiness averages ${scoringData.capabilityScore.toFixed(1)}/5.0, while Technical & Architectural readiness sits at ${scoringData.feasibilityScore.toFixed(1)}/5.0.`,
          businessReadiness: scoringData.capabilityScore,
          technicalReadiness: scoringData.feasibilityScore
        },
        technicalRoadmap: [
          { targetTopicId: '1.2', title: 'Implement Event-Driven HITL Exceptions', remediation: 'Deploy cryptographically signed audit logs and role-based validation routing to clear FDA 21 CFR Part 11 requirements.' },
          { targetTopicId: '2.1', title: 'Automate State AI Disclosures', remediation: 'Enforce real-time layout-aware agents to dynamically append compliance risk text alongside benefits.' },
          { targetTopicId: '3.1', title: 'Zero-ETL Semantic Data Mesh', remediation: 'Establish direct Private Service Connect tunnels and GCP BigQuery analytical feeds to remove CSV export friction.' },
          { targetTopicId: '4.2', title: 'Durable Orchestration Persistence', remediation: 'Integrate distributed cache (Redis) to serialize agent memory state-trees and survive server restarts.' },
          { targetTopicId: '5.2', title: 'Centralized AI Security Gateway', remediation: 'Deploy deep semantic PII/PHI regex filters and jailbreak blockages before routing data outside boundaries.' }
        ]
      });
      
      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: 6,
        logs: [...prev.logs, `[${ts()}] [SUCCESS] (Local Sandbox Fallback) V12 Dossier compiled successfully!`]
      }));

      setTimeout(() => {
        setGeminiStreamingState(prev => ({ ...prev, active: false }));
        handleTabSwitch('scorecard');
      }, 500);
    }
  };

  // Render Page 3 Whiteboard Elements
  const handleWhiteboardCanvasClick = (e) => {
    if (!editModeActive || activeTool === 'select') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newShape = {
      id: Date.now(),
      type: activeTool,
      x, y,
      color: activeTool === 'line' ? colors.accentCoral : colors.accentTeal
    };
    
    setWhiteboardShapes(prev => [...prev, newShape]);
  };

  // Page 2 Table Filtered Dimensions
  const filteredDimensions = useMemo(() => {
    return FLAT_QUESTIONS.filter(q => {
      const sObj = scores[q.id] || {};
      const delta = typeof sObj.current === 'number' ? (sObj.future - sObj.current) : 0;
      const matchesSearch = q.dimension.toLowerCase().includes(matrixSearch.toLowerCase()) || q.pillarName.toLowerCase().includes(matrixSearch.toLowerCase());
      
      if (!matchesSearch) return false;
      if (matrixFilter === 'critical') return q.weight === 3;
      if (matrixFilter === 'gaps') return delta >= 2;
      return true;
    });
  }, [matrixSearch, matrixFilter, scores]);

  // Page 6 Swimlane parallel router simulation engine
  const handleRunMlrSimulation = () => {
    if (mlrSimActive) return;
    setMlrSimActive(true);
    setMlrSimStep(1); 
    setMlrTimer(0);
    
    setTimeout(() => setMlrSimStep(2), 800); 
    setTimeout(() => setMlrSimStep(3), 1600); 
    setTimeout(() => {
      setMlrSimStep(4); 
      setMlrTimer(4.2);
    }, 3200);
  };

  const handleResetMlrSimulation = () => {
    setMlrSimActive(false);
    setMlrSimStep(0);
    setMlrTimer(0);
  };

  return (
    <div className="premium-assessor-v12-container">
      
      <style>{`
        .premium-assessor-v12-container {
          display: flex;
          background: #f8fafc;
          color: #0f172a;
          font-family: 'Inter', -apple-system, sans-serif;
          box-sizing: border-box;
          height: 100%;
          width: 100%;
          overflow: hidden;
          transition: background-color 0.2s, color 0.2s;
        }

        .v12-sidebar-premium {
          width: 250px;
          background: #ffffff;
          border-right: 1px solid rgba(15, 23, 42, 0.08);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          height: 100%;
          flex-shrink: 0;
        }

        .v12-sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1rem;
          cursor: pointer;
          font-size: 0.74rem;
          font-weight: 600;
          color: #475569;
          border-left: 3px solid transparent;
          transition: all 0.15s ease;
        }
        .v12-sidebar-nav-item:hover {
          background: rgba(13, 148, 136, 0.03);
          color: #0f172a;
        }
        .v12-sidebar-nav-item.active {
          background: rgba(13, 148, 136, 0.06);
          color: #0d9488;
          border-left-color: #0d9488;
          font-weight: 800;
        }

        .v12-main-area-premium {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          height: 100%;
          min-height: 0;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
        }

        .v12-card-glass {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
          padding: 0.85rem;
          box-sizing: border-box;
        }

        .v12-kpi-val {
          font-size: 1.4rem;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.5px;
          color: #0f172a;
        }

        .v12-pulse-dot {
          width: 6px;
          height: 6px;
          background: #0d9488;
          border-radius: 50%;
          box-shadow: 0 0 8px #0d9488;
          display: inline-block;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.4; }
          100% { transform: scale(1); opacity: 1; }
        }

        .v12-scrollable::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .v12-scrollable::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.03);
        }
        .v12-scrollable::-webkit-scrollbar-thumb {
          background: rgba(15, 23, 42, 0.08);
          border-radius: 4px;
        }
        .v12-scrollable::-webkit-scrollbar-thumb:hover {
          background: rgba(13, 148, 136, 0.3);
        }

        @keyframes floatPacket {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100%, 0); opacity: 0; }
        }

        .v12-table-row-hover:hover {
          background: rgba(13, 148, 136, 0.02) !important;
        }
      `}</style>

      {/* ==========================================================================
      // GLOBAL LEFT SIDEBAR
      // ========================================================================== */}
      <aside className="v12-sidebar-premium">
        
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.25rem', background: '#ffffff' }}>
          <h2 style={{ fontSize: '0.78rem', fontWeight: 900, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {customerInfo.company || 'ENTERPRISE AUDIT'}
          </h2>
          <span style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 600 }}>
            {activeTab === 'intake' ? 'WORKSHOP MATRIX' : 'EXECUTIVE DOSSIER'}
          </span>
        </div>

        <div style={{ flex: 1, padding: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.1rem' }} className="v12-scrollable">
          
          {activeTab === 'intake' ? (
            V12_PILLARS.map((pillar, idx) => {
              const isPillarActive = pillar.id === activeQuestion.pillarId;
              const completed = isPillarCompleted(pillar);
              
              return (
                <div key={pillar.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    onClick={() => {
                      const targetIdx = FLAT_QUESTIONS.findIndex(q => q.pillarId === pillar.id);
                      if (targetIdx !== -1) setActiveQuestionIdx(targetIdx);
                    }}
                    className={`v12-sidebar-nav-item ${isPillarActive ? 'active' : ''}`}
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                      {completed ? (
                        <Check size={13} strokeWidth={4} style={{ color: colors.accentTeal }} />
                      ) : (
                        <span style={{ fontSize: '0.7rem' }}>{idx === 0 ? '📊' : idx === 1 ? '🧠' : idx === 2 ? '🔌' : idx === 3 ? '⚙️' : idx === 4 ? '🛡️' : '⚖️'}</span>
                      )}
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {pillar.name.split('. ')[1]}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.62rem', color: completed ? colors.accentTeal : '#475569', fontWeight: 800 }}>
                      {getPillarProgress(pillar)}
                    </span>
                  </div>

                  {isPillarActive && (
                    <div style={{ paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', borderLeft: '1.5px solid rgba(13, 148, 136, 0.2)', marginLeft: '1rem', margin: '0.15rem 0 0.25rem 1rem' }}>
                      {pillar.questions.map((q) => {
                        const isQActive = q.id === activeQuestion.id;
                        const isQAnswered = typeof scores[q.id]?.current === 'number';
                        const qIndex = FLAT_QUESTIONS.findIndex(fq => fq.id === q.id);

                        return (
                          <div
                            key={q.id}
                            onClick={() => setActiveQuestionIdx(qIndex)}
                            style={{
                              padding: '0.22rem 0.4rem',
                              fontSize: '0.64rem',
                              fontWeight: isQActive ? 900 : 550,
                              color: isQActive ? colors.accentTeal : isQAnswered ? '#0f172a' : '#94a3b8',
                              background: isQActive ? 'rgba(13, 148, 136, 0.05)' : 'transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              borderRadius: '3px'
                            }}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {q.dimension}
                            </span>
                            {isQAnswered && <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: colors.accentTeal }} />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <>
              <div 
                onClick={() => setReportPage('summary')} 
                className={`v12-sidebar-nav-item ${reportPage === 'summary' ? 'active' : ''}`}
              >
                <Activity size={15} />
                <span>1. Executive Control Tower</span>
              </div>
              <div 
                onClick={() => setReportPage('matrix')} 
                className={`v12-sidebar-nav-item ${reportPage === 'matrix' ? 'active' : ''}`}
              >
                <BarChart3 size={15} />
                <span>2. 25-Dimension Matrix</span>
              </div>
              <div 
                onClick={() => setReportPage('blueprints')} 
                className={`v12-sidebar-nav-item ${reportPage === 'blueprints' ? 'active' : ''}`}
              >
                <Layers size={15} />
                <span>3. Technical Blueprints</span>
              </div>
              <div 
                onClick={() => setReportPage('sandbox')} 
                className={`v12-sidebar-nav-item ${reportPage === 'sandbox' ? 'active' : ''}`}
              >
                <Sliders size={15} />
                <span>4. Financial Sandbox</span>
              </div>
              <div 
                onClick={() => setReportPage('benchmarks')} 
                className={`v12-sidebar-nav-item ${reportPage === 'benchmarks' ? 'active' : ''}`}
              >
                <Globe size={15} />
                <span>5. Sovereign Benchmarks</span>
              </div>
              <div 
                onClick={() => setReportPage('roadmap')} 
                className={`v12-sidebar-nav-item ${reportPage === 'roadmap' ? 'active' : ''}`}
              >
                <Calendar size={15} />
                <span>6. Execution Roadmap</span>
              </div>
              <div 
                onClick={() => setReportPage('gxp_validation')} 
                className={`v12-sidebar-nav-item ${reportPage === 'gxp_validation' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'gxp_validation' ? colors.accentTeal : '#475569' }}
              >
                <ShieldCheck size={15} style={{ color: colors.accentTeal }} />
                <span>7. Continuous GxP Monitor</span>
              </div>
              <div 
                onClick={() => setReportPage('whatif')} 
                className={`v12-sidebar-nav-item ${reportPage === 'whatif' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'whatif' ? colors.accentTeal : '#475569' }}
              >
                <Sliders size={15} style={{ color: colors.accentTeal }} />
                <span>8. Composable What-If Sandbox</span>
              </div>
            </>
          )}

        </div>

        <div style={{ padding: '0.65rem 0.85rem', borderTop: '1px solid rgba(15, 23, 42, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff', flexShrink: 0 }}>
          {activeTab === 'intake' ? (
            <>
              <button
                onClick={handleAutoFillRandom}
                style={{ background: 'rgba(37, 99, 235, 0.04)', border: '1px solid rgba(37, 99, 235, 0.15)', color: '#2563eb', borderRadius: '6px', padding: '0.35rem 0', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
              >
                <Sparkles size={11} /> Prefill Demo Scenario
              </button>
              <button
                onClick={handleRunLiveGeminiAssessment}
                disabled={geminiStreamingState.active}
                style={{ background: colors.purpleGradient, color: '#ffffff', border: 'none', borderRadius: '6px', padding: '0.45rem 0', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)' }}
              >
                <Activity size={12} /> View Report Blueprint
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleTabSwitch('intake')}
                style={{ background: '#f1f5f9', border: '1px solid rgba(15, 23, 42, 0.08)', color: '#0f172a', borderRadius: '6px', padding: '0.45rem 0', fontSize: '0.68rem', fontWeight: 800, cursor: 'pointer' }}
              >
                ← Back to Scoping Matrix
              </button>
              <button
                onClick={onBackToLanding}
                style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: '0.62rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
              >
                Back to Portal Home
              </button>
            </>
          )}
        </div>
      </aside>

      {/* ==========================================================================
      // MAIN WORKSPACE CONTAINER
      // ========================================================================== */}
      <main className="v12-main-area-premium">
        
        {geminiStreamingState.active && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(248, 250, 252, 0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '2rem' }}>
            <div className="v12-card-glass" style={{ width: '100%', maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(13, 148, 136, 0.25)', boxShadow: '0 8px 32px rgba(13, 148, 136, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.5rem' }}>
                <Activity size={20} className="v12-pulse-dot" style={{ color: colors.accentTeal }} />
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px' }}>VERTEX AI SOVEREIGN COMPLIANCE COMPILE</h3>
              </div>
              <div style={{ height: '240px', background: '#f8fafc', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: '6px', padding: '0.6rem', fontFamily: 'Courier, monospace', fontSize: '0.65rem', color: '#0d9488', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }} className="v12-scrollable">
                {geminiStreamingState.logs.map((log, i) => (
                  <div key={i} style={{ lineBreak: 'anywhere' }}>{log}</div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: '#475569' }}>
                <span>Phase {geminiStreamingState.currentStep} of 6 compiled</span>
                <span className="v12-pulse-dot" />
              </div>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------------------
        // VIEW 1: WORKSHOP INTAKE FORM & MATRIX SCORING
        // ----------------------------------------------------------------------------- */}
        {activeTab === 'intake' && (
          <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', boxSizing: 'border-box' }}>
            
            <div className="v12-card-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📊</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
                    {activeQuestion.pillarName.split('. ')[1]}
                  </span>
                  <span style={{ fontSize: '0.58rem', color: '#475569' }}>
                    {activeQuestion.dimension}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.58rem', background: '#f1f5f9', color: '#0f172a', padding: '0.1rem 0.4rem', borderRadius: '100px', fontWeight: 800 }}>ALL 25</span>
                <span style={{ fontSize: '0.58rem', background: 'rgba(13, 148, 136, 0.1)', color: colors.accentTeal, padding: '0.1rem 0.4rem', borderRadius: '100px', fontWeight: 800 }}>DONE {doneCount}</span>
                <span style={{ fontSize: '0.58rem', background: '#f1f5f9', color: '#94a3b8', padding: '0.1rem 0.4rem', borderRadius: '100px', fontWeight: 800 }}>TODO {todoCount}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.12rem', overflowX: 'auto', maxWidth: '340px' }} className="v12-scrollable">
                {FLAT_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === activeQuestionIdx;
                  const isAnswered = typeof scores[q.id]?.current === 'number';
                  return (
                    <div
                      key={q.id}
                      onClick={() => setActiveQuestionIdx(idx)}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.55rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        background: isCurrent ? '#f97316' : isAnswered ? '#16a34a' : '#cbd5e1',
                        color: '#ffffff',
                        border: isCurrent ? '1px solid #ea580c' : '1px solid transparent',
                        boxShadow: isCurrent ? '0 0 6px rgba(249, 115, 22, 0.4)' : 'none',
                        flexShrink: 0
                      }}
                      title={`${q.id} ${q.dimension}`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                {doneCount > 0 && (
                  <span style={{ fontSize: '0.55rem', background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', padding: '0.08rem 0.35rem', borderRadius: '3px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                    ✓ SAVED
                  </span>
                )}
                <span style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 700 }}>Q {activeQuestion.id}</span>
              </div>
            </div>

            <div className="v12-card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.85rem', flexShrink: 0 }}>
              <h2 style={{ fontSize: '0.98rem', fontWeight: 850, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center', lineHeight: 1.3 }}>
                {activeQuestion.topic.includes(':') ? activeQuestion.topic.split(':').slice(1).join(':').trim() : activeQuestion.topic}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem', flexShrink: 0, paddingBottom: '0.15rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.06)' }}>Current State</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.06)' }}>Future State Vision</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.06)' }}>Technical Pain Points</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.06)' }}>Business Pain Points</div>
            </div>

            <div className="v12-grid-area" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(5, 1fr)', gap: '0.35rem', flex: 1, minHeight: 0 }}>
              {[0, 1, 2, 3, 4].map(rowIdx => {
                const opt = activeQuestion.options[rowIdx];
                const techPoint = activeQuestion.technicalPainpoints?.[rowIdx];
                const bizPoint = activeQuestion.businessPainpoints?.[rowIdx];

                const isCurrentSelected = scores[activeQuestionId]?.current === (rowIdx + 1);
                const isTargetSelected = scores[activeQuestionId]?.future === (rowIdx + 1);
                const isTechChecked = scores[activeQuestionId]?.techPain?.includes(techPoint);
                const isBizChecked = scores[activeQuestionId]?.bizPain?.includes(bizPoint);

                return (
                  <React.Fragment key={rowIdx}>
                    
                    <button
                      onClick={() => handleSelectCurrentLevel(rowIdx + 1)}
                      style={{
                        textAlign: 'left',
                        padding: '0.45rem 0.55rem',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        fontWeight: isCurrentSelected ? 800 : 550,
                        background: isCurrentSelected ? 'rgba(13, 148, 136, 0.06)' : '#ffffff',
                        border: isCurrentSelected ? `1.5px solid ${colors.accentTeal}` : '1px solid rgba(15, 23, 42, 0.08)',
                        color: isCurrentSelected ? colors.accentTeal : '#0f172a',
                        cursor: 'pointer',
                        transition: 'all 0.1s',
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        boxSizing: 'border-box'
                      }}
                    >
                      {opt.text}
                    </button>

                    <button
                      onClick={() => handleSelectTargetLevel(rowIdx + 1)}
                      style={{
                        textAlign: 'left',
                        padding: '0.45rem 0.55rem',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        fontWeight: isTargetSelected ? 800 : 550,
                        background: isTargetSelected ? 'rgba(217, 119, 6, 0.06)' : '#ffffff',
                        border: isTargetSelected ? `1.5px solid ${colors.accentAmber}` : '1px solid rgba(15, 23, 42, 0.08)',
                        color: isTargetSelected ? colors.accentAmber : '#0f172a',
                        cursor: 'pointer',
                        transition: 'all 0.1s',
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        boxSizing: 'border-box'
                      }}
                    >
                      {opt.text}
                    </button>

                    <div
                      onClick={() => techPoint && handleTogglePainPoint('tech', techPoint)}
                      style={{
                        padding: '0.45rem 0.55rem',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        background: isTechChecked ? 'rgba(225, 29, 72, 0.06)' : '#ffffff',
                        border: isTechChecked ? `1.5px solid ${colors.accentCoral}` : '1px solid rgba(15, 23, 42, 0.08)',
                        cursor: techPoint ? 'pointer' : 'default',
                        opacity: techPoint ? 1 : 0.4,
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        boxSizing: 'border-box',
                        gap: '0.4rem'
                      }}
                    >
                      {techPoint ? (
                        <>
                          <div style={{ width: '11px', height: '11px', border: '1px solid #94a3b8', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isTechChecked ? colors.accentCoral : 'transparent', borderColor: isTechChecked ? colors.accentCoral : '#94a3b8', flexShrink: 0 }}>
                            {isTechChecked && <Check size={8} strokeWidth={4} color="#fff" />}
                          </div>
                          <span style={{ color: isTechChecked ? colors.accentCoral : '#0f172a', fontWeight: isTechChecked ? 800 : 550, lineHeight: 1.25 }}>{techPoint}</span>
                        </>
                      ) : <span style={{ color: '#94a3b8' }}>N/A</span>}
                    </div>

                    <div
                      onClick={() => bizPoint && handleTogglePainPoint('biz', bizPoint)}
                      style={{
                        padding: '0.45rem 0.55rem',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        background: isBizChecked ? 'rgba(225, 29, 72, 0.06)' : '#ffffff',
                        border: isBizChecked ? `1.5px solid ${colors.accentCoral}` : '1px solid rgba(15, 23, 42, 0.08)',
                        cursor: bizPoint ? 'pointer' : 'default',
                        opacity: bizPoint ? 1 : 0.4,
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        boxSizing: 'border-box',
                        gap: '0.4rem'
                      }}
                    >
                      {bizPoint ? (
                        <>
                          <div style={{ width: '11px', height: '11px', border: '1px solid #94a3b8', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isBizChecked ? colors.accentCoral : 'transparent', borderColor: isBizChecked ? colors.accentCoral : '#94a3b8', flexShrink: 0 }}>
                            {isBizChecked && <Check size={8} strokeWidth={4} color="#fff" />}
                          </div>
                          <span style={{ color: isBizChecked ? colors.accentCoral : '#0f172a', fontWeight: isBizChecked ? 800 : 550, lineHeight: 1.25 }}>{bizPoint}</span>
                        </>
                      ) : <span style={{ color: '#94a3b8' }}>N/A</span>}
                    </div>

                  </React.Fragment>
                );
              })}
            </div>

            <div className="v12-card-glass" style={{ padding: '0.35rem 0.65rem 0.4rem 0.65rem', display: 'flex', flexDirection: 'column', gap: '0.05rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.56rem', fontWeight: 900, color: '#475569', letterSpacing: '0.5px' }}>AUDITOR COMPLIANCE NOTES</span>
              <textarea
                value={scores[activeQuestionId]?.comments || ''}
                onChange={e => handleCommentChange(e.target.value)}
                placeholder="Type regulatory guidelines, GxP validation perimeters, or timeline bottlenecks noted..."
                style={{
                  width: '100%',
                  height: '22px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.72rem',
                  color: '#0f172a',
                  background: 'transparent',
                  fontFamily: 'inherit',
                  lineHeight: 1.25,
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <button
                onClick={handlePrevQuestion}
                disabled={activeQuestionIdx === 0}
                style={{ background: '#ffffff', color: colors.accentTeal, border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: '4px', padding: '0.35rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, cursor: activeQuestionIdx === 0 ? 'default' : 'pointer', opacity: activeQuestionIdx === 0 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <ArrowLeft size={12} /> Back
              </button>
              
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569' }}>
                Completed: {Math.round((doneCount / 25) * 100)}% ({doneCount}/25 Topics)
              </span>

              <button
                onClick={handleNextQuestion}
                disabled={activeQuestionIdx === FLAT_QUESTIONS.length - 1}
                style={{ background: '#f97316', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '0.35rem 1rem', fontSize: '0.7rem', fontWeight: 900, cursor: activeQuestionIdx === FLAT_QUESTIONS.length - 1 ? 'default' : 'pointer', opacity: activeQuestionIdx === FLAT_QUESTIONS.length - 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                Next <ArrowRight size={12} />
              </button>
            </div>

          </div>
        )}

        {/* -----------------------------------------------------------------------------
        // VIEW 2: EXECUTIVE SUMMARY & SCORECARD REPORT (McK 8-Page Dashboard)
        // ----------------------------------------------------------------------------- */}
        {activeTab === 'scorecard' && (
          <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }} className="v12-scrollable">
            
            <div className="v12-card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, padding: '0.65rem 1rem' }}>
              <div>
                <span style={{ fontSize: '0.58rem', color: colors.accentTeal, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Enterprise Diagnostic Report • Framework v12
                </span>
                <h1 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', margin: '0.1rem 0 0 0' }}>
                  {reportPage === 'summary' && "Target Architecture Mitigates FDA Risk While Accelerating Jan 2027 MVP."}
                  {reportPage === 'matrix' && "Core Deficits in Legacy Infrastructure Require Agentic Remediation."}
                  {reportPage === 'blueprints' && "Federated Data Mesh & Zero-Trust Gateways Secure the Agentic Swarm."}
                  {reportPage === 'sandbox' && "Agent-Frameworks Slash System Integrator (SI) Costs by 60%."}
                  {reportPage === 'benchmarks' && "Emerging U.S. State AI Laws Require Immediate Architectural Adaptation."}
                  {reportPage === 'roadmap' && "90-Day Execution Roadmap to Secure January 2027 MVP."}
                  {reportPage === 'gxp_validation' && "GAMP 5 Day-2 Telemetry: Continuous AI Control & Drift Audit."}
                  {reportPage === 'whatif' && "Composable What-If Sandbox: Dynamic Vendor Scenarios."}
                </h1>
              </div>
              <div style={{ display: 'flex', gap: '0.45rem', flexShrink: 0 }}>
                <button 
                  onClick={() => alert("📥 Exporting C-Suite Briefing Ledger to PDF... Complete!")}
                  style={{ background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.08)', color: '#0f172a', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <FileText size={13} /> Export to PDF Brief
                </button>
                <button 
                  onClick={() => {
                    if (isSignedOff) {
                      alert("⚠️ Architecture has already been cryptographically signed!");
                    } else {
                      setSignOffModalActive(true);
                    }
                  }}
                  style={{ background: isSignedOff ? 'rgba(22, 163, 74, 0.1)' : colors.purpleGradient, color: isSignedOff ? '#16a34a' : '#ffffff', border: isSignedOff ? '1px solid #16a34a' : 'none', padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: isSignedOff ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.15)' }}
                >
                  <Shield size={13} /> {isSignedOff ? "Approved & Locked" : "Approve Budget"}
                </button>
              </div>
            </div>

            {/* =========================================================================
            // PAGE 1: EXECUTIVE CONTROL TOWER (SUMMARY) (WITH NEW ENTERPRISE KPIs)
            // ========================================================================= */}
            {reportPage === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                
                {/* 6 Global Executive Symmetrical KPIs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                  
                  {/* KPI 1: Readiness Score */}
                  <div className="v12-card-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: `3.5px solid ${colors.accentTeal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 10px rgba(13, 148, 136, 0.1)` }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 900, color: colors.accentTeal }}>{scoringData.overallScore.toFixed(1)}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.56rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Final Readiness Score</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.1rem' }}>
                        <span className="v12-kpi-val">{scoringData.overallScore.toFixed(1)} <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/ 5.0</span></span>
                        <span style={{ fontSize: '0.58rem', background: 'rgba(13, 148, 136, 0.1)', color: colors.accentTeal, padding: '0.04rem 0.35rem', borderRadius: '3px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}>
                          <span className="v12-pulse-dot" style={{ width: '4px', height: '4px' }} /> GO
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* KPI 2: Financial TCO Breakdown */}
                  <div className="v12-card-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: `3px solid ${colors.accentAmber}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.8rem' }}>💰</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.56rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Financials (3-Year TCO)</span>
                      <span className="v12-kpi-val" style={{ color: colors.accentAmber }}>
                        ${Math.round(financialMetrics.netTCO * 3 / 1000)}K
                      </span>
                      <span style={{ fontSize: '0.52rem', color: '#475569', display: 'block', marginTop: '0.05rem' }}>
                        CapEx: ${Math.round(financialMetrics.totalCapEx/1000)}K | OpEx: ${Math.round(financialMetrics.totalOpEx/1000)}K/yr
                      </span>
                    </div>
                  </div>

                  {/* KPI 3: Time-To-Value */}
                  <div className="v12-card-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: `3px solid ${colors.accentTeal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Calendar size={18} style={{ color: colors.accentTeal }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.56rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Time-to-Value & Validation</span>
                      <span className="v12-kpi-val" style={{ color: colors.accentTeal }}>
                        Jan 2027 MVP
                      </span>
                      <span style={{ fontSize: '0.52rem', color: '#475569', display: 'block', marginTop: '0.05rem' }}>
                        Countdown: 192 Days | GAMP 5 Validation: 6 Weeks
                      </span>
                    </div>
                  </div>

                  {/* KPI 4: Enterprise Scale Indicator */}
                  <div className="v12-card-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: `3px solid ${colors.accentTeal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Users size={18} style={{ color: colors.accentTeal }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.56rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Enterprise Scale Indicator</span>
                      <span className="v12-kpi-val" style={{ color: colors.accentTeal }}>
                        85,000 Users
                      </span>
                      <span style={{ fontSize: '0.52rem', color: '#475569', display: 'block', marginTop: '0.05rem' }}>
                        Peak Concurrency: 12,000 reqs/min threshold
                      </span>
                    </div>
                  </div>

                  {/* KPI 5: GxP Compliance */}
                  <div className="v12-card-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: `3px solid ${colors.accentTeal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Shield size={18} style={{ color: colors.accentTeal }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.56rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>GxP Compliance Status</span>
                      <span className="v12-kpi-val" style={{ fontSize: '0.98rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.15rem' }}>
                        🛡️ Zero Blockers
                      </span>
                      <span style={{ fontSize: '0.52rem', color: '#16a34a', display: 'block', marginTop: '0.05rem' }}>
                        FDA 21 CFR Part 11 Lineage Verified
                      </span>
                    </div>
                  </div>

                  {/* KPI 6: Zero-Trust IAM Identity */}
                  <div className="v12-card-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: `3px solid ${colors.accentTeal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Zap size={18} style={{ color: colors.accentTeal }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.56rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Zero-Trust Identity IAM</span>
                      <span className="v12-kpi-val" style={{ fontSize: '0.98rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.15rem' }}>
                        🔒 Entra ID Active
                      </span>
                      <span style={{ fontSize: '0.52rem', color: '#475569', display: 'block', marginTop: '0.05rem' }}>
                        RBAC Validation enforced per agent API call
                      </span>
                    </div>
                  </div>

                </div>

                {/* 2x2 Scatter Plot and Rationale Block */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '320px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px' }}>2x2 STRATEGIC SUITABILITY SCATTER PLOT</span>
                      <span style={{ fontSize: '0.58rem', color: '#475569' }}>Hover dots for audit details</span>
                    </div>
                    
                    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: '#f8fafc', borderRadius: '6px', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                        <rect x="0" y="0" width="200" height="150" fill="rgba(225, 29, 72, 0.01)" stroke="rgba(15,23,42,0.04)" />
                        <rect x="200" y="0" width="200" height="150" fill="rgba(217, 119, 6, 0.01)" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                        <rect x="0" y="150" width="200" height="150" fill="rgba(217, 119, 6, 0.01)" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                        <rect x="200" y="150" width="200" height="150" fill="rgba(13, 148, 136, 0.015)" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />

                        <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(15,23,42,0.1)" strokeWidth="1.5" strokeDasharray="3" />
                        <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(15,23,42,0.1)" strokeWidth="1.5" strokeDasharray="3" />

                        <text x="20" y="25" fill="#e11d48" fontSize="8" fontWeight="800" opacity="0.7">HIGH COMPLIANCE RISK</text>
                        <text x="280" y="25" fill="#d97706" fontSize="8" fontWeight="800" opacity="0.7">COACHED RE-ARCHITECT</text>
                        <text x="20" y="285" fill="#64748b" fontSize="8" fontWeight="800" opacity="0.7">DE-PRIORITIZE</text>
                        <text x="290" y="285" fill="#0d9488" fontSize="8" fontWeight="900" opacity="0.9">STRATEGIC LAUNCH</text>

                        <g 
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredArchBlock({ name: 'As-Is Architecture', desc: `Capability: ${scoringData.capabilityScore.toFixed(1)}/45 | Feasibility: ${scoringData.feasibilityScore.toFixed(1)}/9. High manual transcription overhead with zero automated audit gateways.` })}
                          onMouseLeave={() => setHoveredArchBlock(null)}
                        >
                          <circle cx="90" cy="210" r="7" fill="#e11d48" stroke="#fff" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(225,29,72,0.2))' }} />
                          <text x="75" y="225" fill="#475569" fontSize="7" fontWeight="bold">1. As-Is (Legacy)</text>
                        </g>

                        <g 
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredArchBlock({ name: 'AWS-Native Stack', desc: 'Capability: 3.2/5.0 | Feasibility: 2.1/3.0. Employs Bedrock and basic wrapper functions. Decoupled brand-safety checks and slow MLR approvals.' })}
                          onMouseLeave={() => setHoveredArchBlock(null)}
                        >
                          <circle cx="210" cy="120" r="7" fill="#d97706" stroke="#fff" strokeWidth="1.5" />
                          <text x="180" y="108" fill="#475569" fontSize="7" fontWeight="bold">2. AWS-Native</text>
                        </g>

                        <g 
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredArchBlock({ name: 'Google-Native Target', desc: `Capability: 4.6/5.0 | Feasibility: 2.8/3.0. Powered by ADK 2.0 Agent Swarms, Vertex AI private endpoints, and BigQuery Zero-ETL semantic graphs.` })}
                          onMouseLeave={() => setHoveredArchBlock(null)}
                        >
                          <circle cx="320" cy="60" r="9" fill="#0d9488" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 2px 6px rgba(13,148,136,0.3))' }} />
                          <text x="290" y="45" fill="#0d9488" fontSize="8" fontWeight="900">3. Google-Native (Target) ★</text>
                        </g>

                        <text x="5" y="142" fill="#64748b" fontSize="7" fontWeight="800">Y-AXIS: GxP CAPABILITY (OUT OF 45)</text>
                        <text x="205" y="296" fill="#64748b" fontSize="7" fontWeight="800">X-AXIS: FEASIBILITY & TCO (OUT OF 9)</text>
                      </svg>

                      {hoveredArchBlock && (
                        <div className="v12-card-glass" style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', padding: '0.45rem', background: '#ffffff', border: '1px solid rgba(13, 148, 136, 0.3)', borderRadius: '6px', zIndex: 10 }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 900, color: colors.accentTeal, display: 'block' }}>{hoveredArchBlock.name}</span>
                          <p style={{ fontSize: '0.62rem', color: '#0f172a', margin: '0.1rem 0 0 0', lineHeight: 1.35 }}>{hoveredArchBlock.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    
                    <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>EXECUTIVE DIAGNOSTIC NARRATIVE</span>
                      <p style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                        {liveSynthesis?.executiveSummary?.rationale || `V12 diagnostic compiles an overall C-Suite readiness score of ${scoringData.overallScore} out of 5.0. Capability & GxP Compliance is scored at ${scoringData.capabilityScore}, and Implementation Feasibility is scored at ${scoringData.feasibilityScore}. Target Google Cloud architecture secures sovereign patient-health perimeters while accelerating January 2027 MVP launch timelines.`}
                      </p>
                    </div>

                    <div className="v12-card-glass" style={{ border: '1px solid rgba(225, 29, 72, 0.2)', background: 'rgba(225, 29, 72, 0.02)', display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.6rem 0.85rem' }}>
                      <ShieldAlert size={22} style={{ color: colors.accentCoral, flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '0.68rem', fontWeight: 950, color: colors.accentCoral, display: 'block' }}>CRITICAL SOVEREIGN RISK IDENTIFIED</span>
                        <span style={{ fontSize: '0.62rem', color: '#475569', display: 'block', marginTop: '0.05rem' }}>
                          Model updates and prompts currently lack cryptographic Quality Unit signatures, violating FDA GxP perimeters.
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 2: 25-DIMENSION ASSESSMENT MATRIX
            // ========================================================================= */}
            {reportPage === 'matrix' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px' }}>6-PILLAR COMPREHENSIVE CAPABILITY HEATMAP</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', padding: '0.2rem 0' }}>
                    {V12_PILLARS.map((pillar, index) => {
                      let sum = 0, count = 0;
                      pillar.questions.forEach(q => {
                        const s = scores[q.id] || {};
                        if (typeof s.current === 'number') {
                          sum += s.current;
                          count++;
                        }
                      });
                      const avg = count > 0 ? sum / count : 1.0;
                      const barWidthPct = (avg / 5.0) * 100;
                      
                      return (
                        <div key={pillar.id} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#475569', width: '130px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 700 }}>
                            {pillar.name.split('. ')[1]}
                          </span>
                          <div style={{ flex: 1, height: '12px', background: 'rgba(15,23,42,0.03)', borderRadius: '100px', overflow: 'hidden', border: '1px solid rgba(15,23,42,0.06)', position: 'relative' }}>
                            <div 
                              style={{ 
                                width: `${barWidthPct}%`, 
                                height: '100%', 
                                background: index === 5 ? `linear-gradient(90deg, ${colors.accentAmber} 0%, #ea580c 100%)` : `linear-gradient(90deg, ${colors.accentTeal} 0%, #0d9488 100%)`, 
                                borderRadius: '100px',
                                boxShadow: index === 5 ? `0 0 8px rgba(217, 119, 6, 0.2)` : `0 0 8px rgba(13, 148, 136, 0.2)`
                              }} 
                            />
                          </div>
                          <span style={{ fontSize: '0.68rem', fontWeight: 900, color: index === 5 ? colors.accentAmber : colors.accentTeal, width: '45px', textAlign: 'right' }}>
                            {avg.toFixed(1)} <span style={{ fontSize: '0.52rem', color: '#94a3b8' }}>/ 5</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem', flex: 1, minHeight: 0, position: 'relative' }}>
                  
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: 0 }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.45rem', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.45rem', flexShrink: 0 }}>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#475569' }}>Filter Matrix:</span>
                        <button 
                          onClick={() => setMatrixFilter('all')}
                          style={{ background: matrixFilter === 'all' ? 'rgba(15,23,42,0.06)' : 'transparent', border: '1px solid rgba(15, 23, 42, 0.08)', color: '#0f172a', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}
                        >
                          All ({filteredDimensions.length})
                        </button>
                        <button 
                          onClick={() => setMatrixFilter('critical')}
                          style={{ background: matrixFilter === 'critical' ? 'rgba(217, 119, 6, 0.1)' : 'transparent', border: '1px solid rgba(217, 119, 6, 0.2)', color: colors.accentAmber, borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}
                        >
                          Critical Weights
                        </button>
                        <button 
                          onClick={() => setMatrixFilter('gaps')}
                          style={{ background: matrixFilter === 'gaps' ? 'rgba(225, 29, 72, 0.1)' : 'transparent', border: '1px solid rgba(225, 29, 72, 0.2)', color: colors.accentCoral, borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}
                        >
                          High Gaps (Delta ≥ 2)
                        </button>
                      </div>

                      <input 
                        type="text"
                        placeholder="Search dimensions or pillars..."
                        value={matrixSearch}
                        onChange={e => setMatrixSearch(e.target.value)}
                        style={{ background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.68rem', color: '#0f172a', outline: 'none', width: '180px' }}
                      />

                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }} className="v12-scrollable">
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)', color: '#475569', fontWeight: 800 }}>
                            <th style={{ padding: '0.35rem 0.45rem' }}>DIMENSION NAME</th>
                            <th style={{ padding: '0.35rem 0.45rem' }}>PILLAR</th>
                            <th style={{ padding: '0.35rem 0.45rem', textAlign: 'center' }}>WEIGHT</th>
                            <th style={{ padding: '0.35rem 0.45rem', textAlign: 'center' }}>AS-IS</th>
                            <th style={{ padding: '0.35rem 0.45rem', textAlign: 'center' }}>TARGET</th>
                            <th style={{ padding: '0.35rem 0.45rem', textAlign: 'center' }}>DELTA</th>
                            <th style={{ padding: '0.35rem 0.45rem' }}>RISK PROFILE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDimensions.map(q => {
                            const s = scores[q.id] || {};
                            const cur = s.current || 1;
                            const fut = s.future || 1;
                            const delta = fut - cur;
                            const isHighGap = delta >= 2;
                            const isCritical = q.weight === 3;
                            
                            return (
                              <tr 
                                key={q.id}
                                onClick={() => setSelectedMatrixRow(q)}
                                style={{ 
                                  borderBottom: '1px solid rgba(15, 23, 42, 0.04)', 
                                  cursor: 'pointer',
                                  background: selectedMatrixRow?.id === q.id ? 'rgba(13, 148, 136, 0.04)' : 'transparent'
                                }}
                                className="v12-table-row-hover"
                              >
                                <td style={{ padding: '0.45rem', fontWeight: 700, color: '#0f172a' }}>{q.dimension}</td>
                                <td style={{ padding: '0.45rem', color: '#475569' }}>{q.pillarName.split('. ')[1]}</td>
                                <td style={{ padding: '0.45rem', textAlign: 'center', color: isCritical ? colors.accentAmber : '#0f172a', fontWeight: isCritical ? 900 : 550 }}>
                                  {isCritical ? '★★★' : q.weight === 2 ? '★★' : '★'}
                                </td>
                                <td style={{ padding: '0.45rem', textAlign: 'center', fontWeight: 800 }}>{cur}</td>
                                <td style={{ padding: '0.45rem', textAlign: 'center', color: colors.accentTeal, fontWeight: 800 }}>{fut}</td>
                                <td style={{ padding: '0.45rem', textAlign: 'center', color: isHighGap ? colors.accentCoral : '#0f172a', fontWeight: 900 }}>
                                  +{delta}
                                </td>
                                <td style={{ padding: '0.45rem' }}>
                                  <span style={{ 
                                    fontSize: '0.52rem', 
                                    fontWeight: 900, 
                                    padding: '0.04rem 0.35rem', 
                                    borderRadius: '3px',
                                    background: isHighGap ? 'rgba(225, 29, 72, 0.1)' : isCritical ? 'rgba(217, 119, 6, 0.1)' : 'rgba(15,23,42,0.04)',
                                    color: isHighGap ? colors.accentCoral : isCritical ? colors.accentAmber : '#475569'
                                  }}>
                                    {isHighGap ? 'HIGH REMEDIATION' : isCritical ? 'SENSITIVE CORE' : 'STANDARD'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                  </div>

                  {selectedMatrixRow && (
                    <div className="v12-card-glass" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '320px', zIndex: 30, borderLeft: `2px solid ${colors.accentTeal}`, display: 'flex', flexDirection: 'column', gap: '0.65rem', background: '#ffffff', padding: '0.85rem', boxShadow: '-10px 0 30px rgba(15, 23, 42, 0.08)', border: '1px solid rgba(15,23,42,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 950, color: colors.accentTeal }}>RUBRIC SPECIFICATION</span>
                        <button 
                          onClick={() => setSelectedMatrixRow(null)}
                          style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 900 }}
                        >
                          ✕
                        </button>
                      </div>

                      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.55rem' }} className="v12-scrollable">
                        <div>
                          <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>Dimension</span>
                          <h4 style={{ margin: '0.1rem 0', fontSize: '0.78rem', fontWeight: 900, color: '#0f172a' }}>{selectedMatrixRow.dimension}</h4>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>Topic Question</span>
                          <p style={{ margin: '0.1rem 0', fontSize: '0.7rem', color: '#475569', lineHeight: 1.35 }}>{selectedMatrixRow.topic}</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', margin: '0.25rem 0' }}>
                          <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>Level Rubric Map</span>
                          {selectedMatrixRow.options.map(opt => {
                            const isCurrent = scores[selectedMatrixRow.id]?.current === opt.score;
                            const isFuture = scores[selectedMatrixRow.id]?.future === opt.score;
                            
                            return (
                              <div 
                                key={opt.score}
                                style={{ 
                                  padding: '0.3rem', 
                                  borderRadius: '4px', 
                                  fontSize: '0.62rem', 
                                  lineHeight: 1.3,
                                  background: isCurrent ? 'rgba(13, 148, 136, 0.06)' : isFuture ? 'rgba(217, 119, 6, 0.06)' : 'rgba(15,23,42,0.02)',
                                  border: isCurrent ? `1px solid ${colors.accentTeal}` : isFuture ? `1px solid ${colors.accentAmber}` : '1px solid transparent',
                                  color: isCurrent ? colors.accentTeal : isFuture ? colors.accentAmber : '#475569'
                                }}
                              >
                                {opt.text}
                              </div>
                            );
                          })}
                        </div>

                        {scores[selectedMatrixRow.id]?.comments && (
                          <div style={{ background: '#f8fafc', padding: '0.45rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.08)' }}>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, display: 'block', marginBottom: '0.15rem' }}>AUDITOR REMARKS</span>
                            <span style={{ fontSize: '0.65rem', color: '#0f172a', fontStyle: 'italic' }}>
                              "{scores[selectedMatrixRow.id].comments}"
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 3: TECHNICAL BLUEPRINTS, DIAGRAMS & ADOBE CONTENT SUPPLY CHAIN
            // ========================================================================= */}
            {reportPage === 'blueprints' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                  
                  {/* Layered Architecture Canvas Card */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minHeight: '220px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px' }}>LAYERED ARCHITECTURE CANVAS</span>
                        {editModeActive && (
                          <span style={{ fontSize: '0.52rem', background: 'rgba(225, 29, 72, 0.1)', color: colors.accentCoral, padding: '0.04rem 0.35rem', borderRadius: '3px', fontWeight: 900 }}>
                            EDIT MODE ACTIVE
                          </span>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {editModeActive && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', background: '#f1f5f9', padding: '0.1rem 0.3rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.08)', marginRight: '0.3rem' }}>
                            <button onClick={() => setActiveTool('box')} style={{ background: activeTool === 'box' ? colors.accentTeal : 'transparent', border: 'none', color: activeTool === 'box' ? '#fff' : '#0f172a', fontSize: '0.55rem', padding: '0.1rem 0.3rem', borderRadius: '3px', cursor: 'pointer' }}>[Box]</button>
                            <button onClick={() => setActiveTool('circle')} style={{ background: activeTool === 'circle' ? colors.accentTeal : 'transparent', border: 'none', color: activeTool === 'circle' ? '#fff' : '#0f172a', fontSize: '0.55rem', padding: '0.1rem 0.3rem', borderRadius: '3px', cursor: 'pointer' }}>[Circle]</button>
                            <button onClick={() => setActiveTool('line')} style={{ background: activeTool === 'line' ? colors.accentTeal : 'transparent', border: 'none', color: activeTool === 'line' ? '#fff' : '#0f172a', fontSize: '0.55rem', padding: '0.1rem 0.3rem', borderRadius: '3px', cursor: 'pointer' }}>[Line]</button>
                            <button 
                              onClick={() => setWhiteboardShapes([])} 
                              style={{ background: 'transparent', border: 'none', color: colors.accentCoral, fontSize: '0.55rem', padding: '0.1rem 0.3rem', cursor: 'pointer' }}
                            >
                              [Clear]
                            </button>
                          </div>
                        )}
                        <button 
                          onClick={() => {
                            setEditModeActive(!editModeActive);
                            setActiveTool('box');
                          }}
                          style={{ background: editModeActive ? colors.accentCoral : '#f1f5f9', border: '1px solid rgba(15, 23, 42, 0.08)', color: editModeActive ? '#fff' : '#0f172a', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}
                        >
                          {editModeActive ? 'Disable Edit Mode' : 'Enable Edit Mode'}
                        </button>
                      </div>
                    </div>

                    <div 
                      style={{ flex: 1, position: 'relative', background: '#f8fafc', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: '6px', overflow: 'hidden', cursor: editModeActive ? 'crosshair' : 'default' }}
                      onClick={handleWhiteboardCanvasClick}
                    >
                      <svg viewBox="0 0 400 320" style={{ width: '100%', height: '100%' }}>
                        <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15, 23, 42, 0.02)" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#archGrid)" />

                        {/* Layer 1: Edge */}
                        <g opacity={editModeActive ? 0.2 : 1}>
                          <rect x="10" y="20" width="380" height="45" rx="4" fill="rgba(15, 23, 42, 0.01)" stroke="rgba(15, 23, 42, 0.08)" />
                          <text x="18" y="32" fill="#475569" fontSize="6" fontWeight="bold">LAYER 1: EDGE PLATFORM (CREATIVE CANVAS)</text>
                          
                          <rect 
                            x="30" y="38" width="100" height="20" rx="3" 
                            fill={hoveredArchBlock?.id === 'edge_photoshop' ? 'rgba(13, 148, 136, 0.08)' : '#ffffff'} 
                            stroke={hoveredArchBlock?.id === 'edge_photoshop' ? colors.accentTeal : 'rgba(15, 23, 42, 0.15)'}
                            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={() => setHoveredArchBlock({ id: 'edge_photoshop', name: 'Adobe Photoshop / InDesign Agent Plugin', desc: 'Embedded agentic panels stream compliance checks directly inside the creative canvas using low-latency REST webhooks.' })}
                            onMouseLeave={() => setHoveredArchBlock(null)}
                          />
                          <text x="42" y="50" fill="#0f172a" fontSize="6.5" fontWeight="bold">Photoshop Creative Agent</text>

                          <rect 
                            x="270" y="38" width="100" height="20" rx="3" 
                            fill={hoveredArchBlock?.id === 'edge_web' ? 'rgba(13, 148, 136, 0.08)' : '#ffffff'} 
                            stroke={hoveredArchBlock?.id === 'edge_web' ? colors.accentTeal : 'rgba(15, 23, 42, 0.15)'}
                            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={() => setHoveredArchBlock({ id: 'edge_web', name: 'Veeva Promomats / Mobile Client', desc: 'Secure web gateway routes auditor overrides and quality sign-off checks directly into the GxP system.' })}
                            onMouseLeave={() => setHoveredArchBlock(null)}
                          />
                          <text x="282" y="50" fill="#0f172a" fontSize="6.5" fontWeight="bold">Veeva Mobile Portal Client</text>
                        </g>

                        {/* Layer 2: API Gateway */}
                        <g opacity={editModeActive ? 0.2 : 1}>
                          <rect x="10" y="90" width="380" height="45" rx="4" fill="rgba(15, 23, 42, 0.01)" stroke="rgba(15, 23, 42, 0.08)" />
                          <text x="18" y="102" fill="#475569" fontSize="6" fontWeight="bold">LAYER 2: SOVEREIGN API GATEWAY & SECURITY</text>

                          <rect 
                            x="150" y="108" width="100" height="20" rx="3" 
                            fill={hoveredArchBlock?.id === 'gateway_security' ? 'rgba(225, 29, 72, 0.08)' : '#ffffff'} 
                            stroke={hoveredArchBlock?.id === 'gateway_security' ? colors.accentCoral : 'rgba(15, 23, 42, 0.15)'}
                            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={() => setHoveredArchBlock({ id: 'gateway_security', name: 'AI Security Shield (VPC-SC / DLP)', desc: 'Kong Gateway running mTLS. Performs inline regex token masking to redact PHI/PII before payloads egress to public endpoints.' })}
                            onMouseLeave={() => setHoveredArchBlock(null)}
                          />
                          <text x="162" y="120" fill="#0f172a" fontSize="6.5" fontWeight="bold">Kong Gateway + DLP Shield</text>
                        </g>

                        {/* Layer 3: Orchestration */}
                        <g opacity={editModeActive ? 0.2 : 1}>
                          <rect x="10" y="160" width="380" height="55" rx="4" fill="rgba(15, 23, 42, 0.01)" stroke="rgba(15, 23, 42, 0.08)" />
                          <text x="18" y="172" fill="#475569" fontSize="6" fontWeight="bold">LAYER 3: AGENTIC SWARM & STATE ORCHESTRATION</text>

                          <rect 
                            x="30" y="180" width="80" height="25" rx="3" 
                            fill={hoveredArchBlock?.id === 'agent_supervisor' ? 'rgba(217, 119, 6, 0.08)' : '#ffffff'} 
                            stroke={hoveredArchBlock?.id === 'agent_supervisor' ? colors.accentAmber : 'rgba(15, 23, 42, 0.15)'}
                            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={() => setHoveredArchBlock({ id: 'agent_supervisor', name: 'ADK 2.0 Supervisor Agent', desc: 'Coordinates sub-agent tasks, manages event-driven dormancy hibernation, and resolves non-linear user overrides.' })}
                            onMouseLeave={() => setHoveredArchBlock(null)}
                          />
                          <text x="36" y="195" fill="#0f172a" fontSize="6.2" fontWeight="bold">ADK 2.0 Supervisor Node</text>

                          <rect 
                            x="290" y="180" width="80" height="25" rx="3" 
                            fill={hoveredArchBlock?.id === 'agent_mlr' ? 'rgba(217, 119, 6, 0.08)' : '#ffffff'} 
                            stroke={hoveredArchBlock?.id === 'agent_mlr' ? colors.accentAmber : 'rgba(15, 23, 42, 0.15)'}
                            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={() => setHoveredArchBlock({ id: 'agent_mlr', name: 'Compliance MLR Auditor Agent', desc: 'Autonomous compliance subagent. Evaluates generated claims against local FDA/EMA rules and generates fair-balance disclosures.' })}
                            onMouseLeave={() => setHoveredArchBlock(null)}
                          />
                          <text x="296" y="195" fill="#0f172a" fontSize="6.2" fontWeight="bold">MLR Auditor Subagent</text>
                        </g>

                        {/* Layer 4: Enterprise Data Mesh */}
                        <g opacity={editModeActive ? 0.2 : 1}>
                          <rect x="10" y="240" width="380" height="55" rx="4" fill="rgba(15, 23, 42, 0.01)" stroke="rgba(15, 23, 42, 0.08)" />
                          <text x="18" y="252" fill="#475569" fontSize="6" fontWeight="bold">LAYER 4: ENTERPRISE DATA MESH (ZERO-ETL)</text>

                          <rect 
                            x="30" y="260" width="90" height="25" rx="3" 
                            fill={hoveredArchBlock?.id === 'data_veeva' ? 'rgba(13, 148, 136, 0.08)' : '#ffffff'} 
                            stroke={hoveredArchBlock?.id === 'data_veeva' ? colors.accentTeal : 'rgba(15, 23, 42, 0.15)'}
                            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={() => setHoveredArchBlock({ id: 'data_veeva', name: 'Veeva Vault GxP Cloud', desc: 'Primary data store for audited clinical claims. Connected via Model Context Protocol (MCP) for real-time document search.' })}
                            onMouseLeave={() => setHoveredArchBlock(null)}
                          />
                          <text x="40" y="275" fill="#0f172a" fontSize="6.2" fontWeight="bold">Veeva Vault GxP API</text>

                          <rect 
                            x="280" y="260" width="90" height="25" rx="3" 
                            fill={hoveredArchBlock?.id === 'data_bq' ? 'rgba(13, 148, 136, 0.08)' : '#ffffff'} 
                            stroke={hoveredArchBlock?.id === 'data_bq' ? colors.accentTeal : 'rgba(15, 23, 42, 0.15)'}
                            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={() => setHoveredArchBlock({ id: 'data_bq', name: 'BigQuery Zero-ETL Analytics Link', desc: 'Secure Private Service Connect link. Exposes structured vector indexes and clinical datasets directly to the agent swarm without manual ETL pipelines.' })}
                            onMouseLeave={() => setHoveredArchBlock(null)}
                          />
                          <text x="290" y="275" fill="#0f172a" fontSize="6.2" fontWeight="bold">BQ Zero-ETL Analytics</text>
                        </g>

                        <g opacity={editModeActive ? 0.1 : 1}>
                          <path d="M 80,58 L 80,90" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
                          <path d="M 320,58 L 320,90" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
                          
                          <path d="M 200,128 L 200,160" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1.2" />
                          <path d="M 70,205 L 70,240" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
                          <path d="M 330,205 L 330,240" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />

                          <circle cx="200" cy="144" r="2" fill={colors.accentTeal} style={{ animation: 'pulse 1s infinite' }} />
                          <circle cx="70" cy="220" r="2" fill={colors.accentCoral} />
                          <circle cx="330" cy="220" r="2" fill={colors.accentAmber} />
                        </g>

                        {editModeActive && whiteboardShapes.map(shape => (
                          <g key={shape.id}>
                            {shape.type === 'box' && (
                              <rect x={shape.x - 25} y={shape.y - 15} width="50" height="30" rx="3" fill="rgba(13, 148, 136, 0.15)" stroke={shape.color} strokeWidth="1.5" />
                            )}
                            {shape.type === 'circle' && (
                              <circle cx={shape.x} cy={shape.y} r="20" fill="rgba(13, 148, 136, 0.15)" stroke={shape.color} strokeWidth="1.5" />
                            )}
                            {shape.type === 'line' && (
                              <line x1={shape.x - 20} y1={shape.y} x2={shape.x + 20} y2={shape.y} stroke={shape.color} strokeWidth="2.5" />
                            )}
                          </g>
                        ))}
                      </svg>

                      {hoveredArchBlock && !editModeActive && (
                        <div className="v12-card-glass" style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', padding: '0.45rem', background: '#ffffff', border: `1.2px solid ${colors.accentTeal}` }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 950, color: colors.accentTeal, display: 'block' }}>{hoveredArchBlock.name}</span>
                          <p style={{ fontSize: '0.6&', color: '#0f172a', margin: '0.08rem 0 0 0', lineHeight: 1.35 }}>{hoveredArchBlock.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ADOBE GENSTUDIO CONTENT SUPPLY CHAIN VISUALIZER (DAG) */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flexShrink: 0, height: '110px' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>ADOBE GENSTUDIO CONTENT SUPPLY CHAIN DAG</span>
                    
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid rgba(15, 23, 42, 0.08)', relative: 'relative', overflow: 'hidden' }}>
                      
                      <div style={{ textAlign: 'center', background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '4px', padding: '0.25rem 0.45rem', cursor: 'pointer', zIndex: 5 }} onClick={() => alert("Workfront: Primary campaign intake and briefs mapped natively.")}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>Workfront</span>
                        <span style={{ fontSize: '0.48rem', color: '#475569' }}>1. Campaign Brief</span>
                      </div>

                      <div style={{ flex: 1, height: '2px', background: 'rgba(15, 23, 42, 0.08)', relative: 'relative' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.accentTeal, position: 'absolute', animation: 'floatPacket 2s infinite linear' }} />
                      </div>

                      <div style={{ textAlign: 'center', background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '4px', padding: '0.25rem 0.45rem', cursor: 'pointer', zIndex: 5 }} onClick={() => alert("Firefly: Dynamic variant image and text generation based on brief briefs.")}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>Firefly</span>
                        <span style={{ fontSize: '0.48rem', color: '#475569' }}>2. Variant Gen</span>
                      </div>

                      <div style={{ flex: 1, height: '2px', background: 'rgba(15, 23, 42, 0.08)' }} />

                      <div 
                        style={{ textAlign: 'center', background: 'rgba(13, 148, 136, 0.06)', border: `1.2px solid ${colors.accentTeal}`, borderRadius: '4px', padding: '0.25rem 0.45rem', cursor: 'pointer', zIndex: 5, boxShadow: '0 2px 8px rgba(13, 148, 136, 0.1)' }}
                        onClick={() => setActiveDagNode({
                          title: "Google Gemini AI Review Gateway & Brand Ontology",
                          desc: "The AI review gateway programmatically intercepts assets before storage. It evaluates compliance against the Adobe Brand Ontology, dynamically injects validated campaign metadata (fair balance labels, disclosures), and writes the asset natively back into Adobe Experience Manager (AEM).",
                          contrast: "AWS Step Functions enforce a sequential, high-latency orchestration block that stalls AEM asset pipelines, whereas Google Gemini leverages parallel, token-aware metadata embedding to ensure real-time content supply chain continuity."
                        })}
                      >
                        <span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.accentTeal, display: 'block' }}>★ AI Gateway</span>
                        <span style={{ fontSize: '0.48rem', color: colors.accentTeal }}>3. GxP / Brand Audit</span>
                      </div>

                      <div style={{ flex: 1, height: '2px', background: 'rgba(15, 23, 42, 0.08)' }} />

                      <div style={{ textAlign: 'center', background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '4px', padding: '0.25rem 0.45rem', cursor: 'pointer', zIndex: 5 }} onClick={() => alert("AEM Assets: Compliant, audited storage ready for omni-channel release.")}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>AEM Assets</span>
                        <span style={{ fontSize: '0.48rem', color: '#475569' }}>4. Audited Storage</span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Granular Technical Deep-Dives & XMP Metadata Translation Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  
                  <div className="v12-card-glass" style={{ display: 'flex', padding: '0.35rem', gap: '0.25rem', flexShrink: 0 }}>
                    {['google', 'aws', 'metadata'].map(tabId => (
                      <button
                        key={tabId}
                        onClick={() => setReportPage(prev => (tabId === 'google' ? 'blueprints' : prev))}
                        style={{
                          flex: 1,
                          background: tabId === 'google' ? 'rgba(13, 148, 136, 0.06)' : 'transparent',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.35rem 0',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          color: tabId === 'google' ? colors.accentTeal : '#475569',
                          cursor: 'pointer',
                          textTransform: 'uppercase'
                        }}
                      >
                        {tabId === 'google' ? 'Google Stack' : tabId === 'aws' ? 'AWS Stack' : 'XMP Metadata Schema'}
                      </button>
                    ))}
                  </div>

                  <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem', background: '#ffffff' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                      METADATA TRANSLATION & ONTOLOGY CODES
                    </span>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', overflowY: 'auto' }} className="v12-scrollable">
                      
                      {/* Interactive code block showing dynamic XMP translation */}
                      <div style={{ background: '#f8fafc', borderRadius: '4px', padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.62rem', border: '1px solid rgba(15,23,42,0.08)' }}>
                        <span style={{ color: '#64748b' }}>// Symmetrical XMP Metadata Mapping</span><br />
                        <span style={{ color: '#7c3aed' }}>&lt;rdf:Description</span> rdf:about=""<br />
                        &nbsp;&nbsp;xmlns:novartis="http://ns.novartis.com/gxp/1.0/"&gt;<br />
                        &nbsp;&nbsp;&lt;novartis:Brand&gt;<strong style={{ color: '#0d9488' }}>"Novartis CMC Operations"</strong>&lt;/novartis:Brand&gt;<br />
                        &nbsp;&nbsp;&lt;novartis:Indication&gt;<strong style={{ color: '#0d9488' }}>"CSR_V12"</strong>&lt;/novartis:Indication&gt;<br />
                        &nbsp;&nbsp;&lt;novartis:Region&gt;<strong style={{ color: '#0d9488' }}>"{selectedRegion === 'germany' ? 'EU-DE' : 'US-TX'}"</strong>&lt;/novartis:Region&gt;<br />
                        &nbsp;&nbsp;&lt;novartis:AssetType&gt;<strong style={{ color: '#0d9488' }}>"CSR Briefing Dossier"</strong>&lt;/novartis:AssetType&gt;<br />
                        &nbsp;&nbsp;&lt;novartis:AIGenerationStatus&gt;<strong style={{ color: '#16a34a' }}>"GxP_Audited_Verified"</strong>&lt;/novartis:AIGenerationStatus&gt;<br />
                        <span style={{ color: '#7c3aed' }}>&lt;/rdf:Description&gt;</span>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '0.45rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.08)' }}>
                        <h4 style={{ margin: 0, fontSize: '0.7rem', fontWeight: 900, color: '#0f172a' }}>System Integration Hooks</h4>
                        <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.62rem', color: '#475569', lineHeight: 1.35 }}>
                          *Adobe Workfront* maps campaigns directly into Google Gemini subagent queues. Upon review, the finalized assets are programmatically tagged and stored in *Adobe Experience Manager (AEM) Assets* with zero manual intervention.
                        </p>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 4: THE FINANCIAL SANDBOX (SPLIT-SCREEN BUILD VS BUY CONTRAST)
            // ========================================================================= */}
            {reportPage === 'sandbox' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Control Panel: Simulator Toggles & Budget Slider */}
                <div className="v12-card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem', padding: '0.6rem 1rem', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Sliders size={18} style={{ color: colors.accentTeal }} />
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px' }}>SCENARIO SIMULATOR CONTROLS:</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
                    
                    {/* Architectural Toggle: Buy vs Build */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f172a' }}>Target State Path:</span>
                      <select
                        value={buyVsBuildSelection}
                        onChange={e => setBuyVsBuildSelection(e.target.value)}
                        style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', borderRadius: '4px', fontSize: '0.65rem', color: '#0f172a', padding: '0.2rem', outline: 'none', cursor: 'pointer', fontWeight: 800 }}
                      >
                        <option value="buy">Veeva Native / AWS Bedrock [BUY]</option>
                        <option value="build">Google Custom Mesh [BUILD]</option>
                      </select>
                    </div>

                    {/* Toggle: Cross-Platform Orchestration */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.68rem', fontWeight: 800, color: '#0f172a', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={crossPlatformOrch}
                        onChange={e => setCrossPlatformOrch(e.target.checked)}
                        style={{ accentColor: colors.accentTeal }}
                      />
                      <span>Cross-Platform Orchestration (Adobe + SAP)</span>
                    </label>

                    {/* Slider: SI Budget */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f172a' }}>SI Budget Cap:</span>
                      <input 
                        type="range" 
                        min="150" 
                        max="500" 
                        step="10"
                        value={siBudgetSlider}
                        onChange={e => setSiBudgetSlider(Number(e.target.value))}
                        style={{ width: '100px', accentColor: colors.accentTeal, cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: siBudgetSlider < 220 ? colors.accentCoral : colors.accentTeal }}>${siBudgetSlider}K</span>
                    </div>

                  </div>
                </div>

                {/* Split-Screen Scenario Comparison Tool */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* Left Column: Veeva Native / AWS Bedrock (Buy) */}
                  <div 
                    className="v12-card-glass" 
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.65rem', 
                      background: crossPlatformOrch ? 'rgba(225, 29, 72, 0.02)' : '#ffffff', 
                      border: crossPlatformOrch ? `2px solid ${colors.accentCoral}` : '1px solid rgba(15, 23, 42, 0.08)',
                      transition: 'all 0.2s',
                      boxShadow: crossPlatformOrch ? '0 4px 20px rgba(225, 29, 72, 0.05)' : 'none'
                    }}
                  >
                    <div style={{ borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.74rem', fontWeight: 950, color: crossPlatformOrch ? colors.accentCoral : '#0f172a' }}>VEEVA NATIVE / AWS BEDROCK [BUY]</span>
                      <span style={{ fontSize: '0.52rem', background: '#f1f5f9', color: '#475569', padding: '0.05rem 0.35rem', borderRadius: '3px', fontWeight: 800 }}>OUT-OF-THE-BOX</span>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.55rem', overflowY: 'auto' }} className="v12-scrollable">
                      
                      <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '0.45rem', border: '1px solid rgba(15, 23, 42, 0.08)', fontSize: '0.65rem' }}>
                        <div style={{ fontWeight: 800, color: '#d97706', marginBottom: '0.2rem' }}>Core AWS Components</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', textAlign: 'left', color: '#475569' }}>
                          <div>• Vault PromoMats AI native integration</div>
                          <div>• Amazon Bedrock managed APIs (200K token limits)</div>
                          <div>• AWS Step Functions for sequential state orchestration</div>
                        </div>
                      </div>

                      <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '0.45rem', border: '1px solid rgba(15, 23, 42, 0.08)', fontSize: '0.65rem' }}>
                        <div style={{ fontWeight: 800, color: colors.accentTeal, marginBottom: '0.2rem' }}>AWS Performance Metrics</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', textAlign: 'left' }}>
                          <div>• AWS-Veeva Latency: <strong style={{ color: '#0f172a' }}>450ms</strong></div>
                          <div>• Guardrails False-Positives: <strong style={{ color: '#0f172a' }}>1.8%</strong></div>
                        </div>
                      </div>

                      {crossPlatformOrch && (
                        <div style={{ background: 'rgba(225, 29, 72, 0.05)', border: `1.2px solid ${colors.accentCoral}`, borderRadius: '6px', padding: '0.45rem', fontSize: '0.65rem', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                          <ShieldAlert size={16} style={{ color: colors.accentCoral, flexShrink: 0, marginTop: '0.05rem' }} />
                          <div>
                            <span style={{ fontWeight: 900, color: colors.accentCoral, display: 'block' }}>⚠️ SILOED LIMITATION DETECTED</span>
                            <span style={{ color: '#0f172a', display: 'block', marginTop: '0.1rem', lineHeight: 1.3 }}>
                              Veeva Native agents run strictly inside the Vault perimeter. Swapping models outside Bedrock is restricted, and pushing metadata to external Adobe supply chains is blocked without heavy bespoke middleware.
                            </span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Right Column: Custom Gemini Orchestration Mesh (Build) */}
                  <div 
                    className="v12-card-glass" 
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.65rem', 
                      background: siBudgetSlider < 220 ? 'rgba(225, 29, 72, 0.02)' : crossPlatformOrch ? 'rgba(13, 148, 136, 0.02)' : '#ffffff', 
                      border: siBudgetSlider < 220 ? `2px solid ${colors.accentCoral}` : crossPlatformOrch ? `2px solid ${colors.accentTeal}` : '1px solid rgba(15, 23, 42, 0.08)',
                      transition: 'all 0.2s',
                      boxShadow: siBudgetSlider < 220 ? 'none' : crossPlatformOrch ? '0 4px 20px rgba(13, 148, 136, 0.05)' : 'none'
                    }}
                  >
                    <div style={{ borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.74rem', fontWeight: 950, color: siBudgetSlider < 220 ? colors.accentCoral : colors.accentTeal }}>CUSTOM GEMINI ORCHESTRATION MESH [BUILD]</span>
                      <span style={{ fontSize: '0.52rem', background: 'rgba(13, 148, 136, 0.1)', color: colors.accentTeal, padding: '0.05rem 0.35rem', borderRadius: '3px', fontWeight: 800 }}>FEDERATED SWARM</span>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.55rem', overflowY: 'auto' }} className="v12-scrollable">
                      
                      <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '0.45rem', border: '1px solid rgba(15, 23, 42, 0.08)', fontSize: '0.65rem' }}>
                        <div style={{ fontWeight: 800, color: colors.accentTeal, marginBottom: '0.2rem' }}>Core Google Components</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', textAlign: 'left', color: '#475569' }}>
                          <div>• Gemini Enterprise Agent Platform and Managed APIs</div>
                          <div>• Firestore context rehydration & event-driven dormancy</div>
                          <div>• NotebookLM secure federated retrieval (85,000-user footprint)</div>
                        </div>
                      </div>

                      <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '0.45rem', border: '1px solid rgba(15, 23, 42, 0.08)', fontSize: '0.65rem' }}>
                        <div style={{ fontWeight: 800, color: colors.accentTeal, marginBottom: '0.2rem' }}>Google Performance Metrics</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', textAlign: 'left' }}>
                          <div>• MCP Fetch Latency: <strong style={{ color: '#0f172a' }}>120ms</strong></div>
                          <div>• Model Armor Sanitization: <strong style={{ color: '#0f172a' }}>22ms</strong></div>
                        </div>
                      </div>

                      {siBudgetSlider < 220 ? (
                        <div style={{ background: 'rgba(225, 29, 72, 0.05)', border: `1.2px solid ${colors.accentCoral}`, borderRadius: '6px', padding: '0.45rem', fontSize: '0.65rem', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                          <ShieldAlert size={16} style={{ color: colors.accentCoral, flexShrink: 0, marginTop: '0.05rem' }} />
                          <div>
                            <span style={{ fontWeight: 900, color: colors.accentCoral, display: 'block' }}>❌ FAILURE: INSUFFICIENT BUDGET FOR BUILD</span>
                            <span style={{ color: '#0f172a', display: 'block', marginTop: '0.1rem', lineHeight: 1.3 }}>
                              Developing a custom federated orchestration mesh requires at least **$220K in SI build budget** to cover custom connectors and GxP validation. Drag SI Budget up to revive Google Custom Mesh.
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ background: '#f8fafc', padding: '0.45rem', borderRadius: '4px', border: '1px solid rgba(15, 23, 42, 0.08)', fontSize: '0.65rem' }}>
                          <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, display: 'block' }}>REMEDIATION & FRICTION FLAGS</span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginTop: '0.2rem', color: '#475569' }}>
                            <div>• <strong style={{ color: colors.accentAmber }}>High CapEx</strong> required for initial custom orchestration mesh development.</div>
                            <div>• <strong style={{ color: colors.accentAmber }}>Maintenance Debt</strong> of managing custom API wrappers for legacy mainframes.</div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 5: SOVEREIGN BENCHMARKS & GLOBAL AI REGULATORY ROUTER
            // ========================================================================= */}
            {reportPage === 'benchmarks' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '320px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px' }}>INTERACTIVE DATA SOVEREIGNTY GLOBE</span>
                    
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      <button 
                        onClick={() => setSelectedRegion('germany')}
                        style={{ background: selectedRegion === 'germany' ? colors.accentTeal : '#f1f5f9', border: '1px solid rgba(15, 23, 42, 0.08)', color: selectedRegion === 'germany' ? '#fff' : '#0f172a', borderRadius: '4px', padding: '0.15rem 0.45rem', fontSize: '0.58rem', fontWeight: 800, cursor: 'pointer' }}
                      >
                        Germany (EU)
                      </button>
                      <button 
                        onClick={() => setSelectedRegion('texas')}
                        style={{ background: selectedRegion === 'texas' ? colors.accentTeal : '#f1f5f9', border: '1px solid rgba(15, 23, 42, 0.08)', color: selectedRegion === 'texas' ? '#fff' : '#0f172a', borderRadius: '4px', padding: '0.15rem 0.45rem', fontSize: '0.58rem', fontWeight: 800, cursor: 'pointer' }}
                      >
                        Texas (US)
                      </button>
                    </div>
                  </div>

                  <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    
                    <svg viewBox="0 0 300 220" style={{ width: '100%', height: '100%', background: '#f8fafc', borderRadius: '6px', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                      <path d="M 30,50 L 80,40 L 90,80 L 50,110 L 30,80 Z" fill="rgba(15, 23, 42, 0.01)" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1" />
                      <text x="45" y="65" fill="#475569" fontSize="6" fontWeight="bold">US-East (Virginia)</text>

                      <path d="M 180,40 L 230,30 L 240,70 L 190,90 Z" fill="rgba(15, 23, 42, 0.01)" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1" />
                      <text x="190" y="55" fill="#475569" fontSize="6" fontWeight="bold">EU (Frankfurt)</text>

                      {selectedRegion === 'germany' ? (
                        <>
                          <path d="M 90,50 Q 150,20 210,45" fill="none" stroke={colors.accentTeal} strokeWidth="1.5" strokeDasharray="3" style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }} />
                          <circle cx="210" cy="45" r="5" fill={colors.accentTeal} />
                          <text x="175" y="38" fill={colors.accentTeal} fontSize="5.5" fontWeight="900">Frankfurt Server Cluster Isolated</text>
                        </>
                      ) : (
                        <>
                          <path d="M 90,50 Q 60,60 50,75" fill="none" stroke={colors.accentTeal} strokeWidth="1.5" strokeDasharray="3" style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }} />
                          <circle cx="50" cy="75" r="5" fill={colors.accentTeal} />
                          <text x="25" y="88" fill={colors.accentTeal} fontSize="5.5" fontWeight="900">US-East Servers Routing Active</text>
                        </>
                      )}
                    </svg>

                    <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', zIndex: 10 }}>
                      {selectedRegion === 'germany' ? (
                        <div className="v12-card-glass" style={{ border: '1px solid rgba(225, 29, 72, 0.25)', background: 'rgba(225, 29, 72, 0.02)', padding: '0.45rem' }}>
                          <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentCoral, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <ShieldAlert size={12} /> 2026 EU AI ACT ARTICLE 52 HIGH-RISK WARNING
                          </span>
                          <p style={{ fontSize: '0.58rem', color: '#0f172a', margin: '0.1rem 0 0 0', lineHeight: 1.3 }}>
                            *Frankfurt Server Isolation Active*. Algorithmic behavioral profiling and biometric emotion tracking features have been **automatically disabled** to comply with high-risk classification rules. 6% global revenue penalty avoided.
                          </p>
                        </div>
                      ) : (
                        <div className="v12-card-glass" style={{ border: '1px solid rgba(13, 148, 136, 0.25)', background: 'rgba(13, 148, 136, 0.02)', padding: '0.45rem' }}>
                          <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentTeal, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <ShieldCheck size={12} /> U.S. STATE ALGORITHMIC TRANSPARENCY DISCLOSURES
                          </span>
                          <p style={{ fontSize: '0.58rem', color: '#0f172a', margin: '0.1rem 0 0 0', lineHeight: 1.3 }}>
                            *US-East Routing Active*. Dynamic consumer opt-out metadata and state-mandated algorithmic transparency disclosures have been programmatically appended to the creative campaign asset prior to release.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  
                  <div className="v12-card-glass" style={{ display: 'flex', gap: '0.75rem', background: '#ffffff', borderLeft: `3.5px solid ${colors.accentCoral}` }}>
                    <ShieldAlert size={24} style={{ color: colors.accentCoral, flexShrink: 0, marginTop: '0.1rem' }} />
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 950, color: colors.accentCoral, display: 'block', textTransform: 'uppercase' }}>
                        Palo Alto "Pickle-in-the-Middle" Threat
                      </span>
                      <p style={{ fontSize: '0.64rem', color: '#475569', margin: '0.15rem 0 0 0', lineHeight: 1.35 }}>
                        Recent open-source supply chain vulnerabilities in huggingface python models highlight the absolute necessity of VPC-SC database sandbox isolation. Standard public routing APIs present egress threats.
                      </p>
                    </div>
                  </div>

                  <div className="v12-card-glass" style={{ display: 'flex', gap: '0.75rem', background: '#ffffff', borderLeft: `3.5px solid ${colors.accentAmber}` }}>
                    <AlertTriangle size={24} style={{ color: colors.accentAmber, flexShrink: 0, marginTop: '0.1rem' }} />
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 950, color: colors.accentAmber, display: 'block', textTransform: 'uppercase' }}>
                        FDA 2026 Quality Unit Auditing Warning
                      </span>
                      <p style={{ fontSize: '0.64rem', color: '#475569', margin: '0.15rem 0 0 0', lineHeight: 1.35 }}>
                        The FDA recently issued formal warnings to biopharma firms delegating MLR review tasks to models without cryptographically locked digital signatures. The "Purolea Precedent" requires physical consensus logs.
                      </p>
                    </div>
                  </div>

                  <div className="v12-card-glass" style={{ display: 'flex', gap: '0.75rem', background: '#ffffff', borderLeft: `3.5px solid ${colors.accentTeal}` }}>
                    <Award size={24} style={{ color: colors.accentTeal, flexShrink: 0, marginTop: '0.1rem' }} />
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 950, color: colors.accentTeal, display: 'block', textTransform: 'uppercase' }}>
                        McKinsey Data: ROI of Trust
                      </span>
                      <p style={{ fontSize: '0.64rem', color: '#475569', margin: '0.15rem 0 0 0', lineHeight: 1.35 }}>
                        Organizations that establish robust agentic compliance perimeters early see an average of **55% higher productivity gains** and **3.2x faster GTM cycles** than firms stuck in manual MLR validation.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 6: RECOMMENDATIONS, PARALLEL MLR ROUTER & ENTERPRISE IAM
            // ========================================================================= */}
            {reportPage === 'roadmap' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Granular MLR Swimlane Parallel Router */}
                <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0, height: '150px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.25rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px' }}>GRANULAR MLR SWIMLANE PARALLEL ROUTER SIMULATOR</span>
                    
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button 
                        onClick={handleRunMlrSimulation} 
                        disabled={mlrSimActive}
                        style={{ background: colors.purpleGradient, border: 'none', color: '#fff', borderRadius: '4px', padding: '0.15rem 0.55rem', fontSize: '0.58rem', fontWeight: 900, cursor: mlrSimActive ? 'default' : 'pointer' }}
                      >
                        {mlrSimStep === 4 ? "Simulation Complete" : "Run Simulation"}
                      </button>
                      {mlrSimActive && (
                        <button 
                          onClick={handleResetMlrSimulation}
                          style={{ background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.08)', color: '#0f172a', borderRadius: '4px', padding: '0.15rem 0.45rem', fontSize: '0.58rem', fontWeight: 800, cursor: 'pointer' }}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ flex: 1, display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: '0.2rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid rgba(15, 23, 42, 0.08)', padding: '0.35rem', relative: 'relative', overflow: 'hidden' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(15,23,42,0.04)', paddingBottom: '0.1rem', relative: 'relative' }}>
                      <span style={{ fontSize: '0.62rem', color: '#475569', width: '90px', fontWeight: 800 }}>Medical (Claims)</span>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(15,23,42,0.03)', borderRadius: '2px', relative: 'relative' }}>
                        {mlrSimStep === 3 && (
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accentTeal, position: 'absolute', top: '-1px', animation: 'floatPacket 1.5s infinite linear' }} />
                        )}
                      </div>
                      <span style={{ fontSize: '0.58rem', fontWeight: 900, width: '55px', textAlign: 'right', color: mlrSimStep === 4 ? '#16a34a' : '#64748b' }}>
                        {mlrSimStep === 4 ? "✓ APPROVED" : "PENDING"}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(15,23,42,0.04)', paddingBottom: '0.1rem', relative: 'relative' }}>
                      <span style={{ fontSize: '0.62rem', color: '#475569', width: '90px', fontWeight: 800 }}>Legal (Rules)</span>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(15,23,42,0.03)', borderRadius: '2px', relative: 'relative' }}>
                        {mlrSimStep === 3 && (
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accentTeal, position: 'absolute', top: '-1px', animation: 'floatPacket 1.5s infinite linear', animationDelay: '0.2s' }} />
                        )}
                      </div>
                      <span style={{ fontSize: '0.58rem', fontWeight: 900, width: '55px', textAlign: 'right', color: mlrSimStep === 4 ? '#16a34a' : '#64748b' }}>
                        {mlrSimStep === 4 ? "✓ APPROVED" : "PENDING"}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', relative: 'relative' }}>
                      <span style={{ fontSize: '0.62rem', color: '#475569', width: '90px', fontWeight: 800 }}>Regulatory (FDA)</span>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(15,23,42,0.03)', borderRadius: '2px', relative: 'relative' }}>
                        {mlrSimStep === 3 && (
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accentTeal, position: 'absolute', top: '-1px', animation: 'floatPacket 1.5s infinite linear', animationDelay: '0.4s' }} />
                        )}
                      </div>
                      <span style={{ fontSize: '0.58rem', fontWeight: 900, width: '55px', textAlign: 'right', color: mlrSimStep === 4 ? '#16a34a' : '#64748b' }}>
                        {mlrSimStep === 4 ? "✓ APPROVED" : "PENDING"}
                      </span>
                    </div>

                    {mlrSimActive && (
                      <div className="v12-card-glass" style={{ position: 'absolute', right: '65px', top: '25px', bottom: '10px', width: '150px', background: 'rgba(255,255,255,0.95)', border: `1.2px solid ${colors.accentTeal}`, padding: '0.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '0.15rem' }}>
                        <span style={{ fontSize: '0.5rem', color: '#475569', fontWeight: 800 }}>PARALLEL AGENTIC VELOCITY</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 950, color: colors.accentTeal }}>{mlrTimer > 0 ? `${mlrTimer}s` : "Shattering..."}</span>
                        <span style={{ fontSize: '0.48rem', color: '#0f172a' }}>Human Manual: 14 Days</span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Symmetrical Grid: Workspace Integrations & Zero-Trust IAM */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', flexShrink: 0 }}>
                  
                  {/* Workspace & Collaboration Layer */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>WORKSPACE & COLLABORATION LAYER</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.65rem', color: '#475569' }}>
                      <div>• <strong style={{ color: '#0f172a' }}>Microsoft 365 SharePoint</strong>: Seamless injection of audited AI-reviewed drafts directly into SharePoint GxP repositories.</div>
                      <div>• <strong style={{ color: '#0f172a' }}>Microsoft Teams Webhooks</strong>: Event-driven alerts and instant agent-to-human escalation channels when MLR exceptions are flagged.</div>
                    </div>
                  </div>

                  {/* Zero-Trust IAM Security */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>ZERO-TRUST IDENTITY ACCESS MANAGEMENT</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.65rem', color: '#475569' }}>
                      <div>• <strong style={{ color: '#0f172a' }}>Microsoft Entra ID SSO</strong>: Secure Azure AD token exchange managed natively via Kong AI security gateways.</div>
                      <div>• <strong style={{ color: '#0f172a' }}>Granular RBAC Contracts</strong>: Cryptographic identity propagation verified on every single tool execution call.</div>
                    </div>
                  </div>

                </div>

                {/* Bottom Row Checklist & Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#ffffff' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>THE 90-DAY EXECUTION CHECKLIST</span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.68rem', color: '#0f172a', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ marginTop: '0.1rem', accentColor: colors.accentTeal }} />
                        <div>
                          <span style={{ fontWeight: 800, display: 'block' }}>1. Formalize Selection of Google Cloud Managed Platform</span>
                          <span style={{ fontSize: '0.58rem', color: '#475569', display: 'block' }}>Kick off sovereign tenant setup and assign GCP billing accounts.</span>
                        </div>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.68rem', color: '#0f172a', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ marginTop: '0.1rem', accentColor: colors.accentTeal }} />
                        <div>
                          <span style={{ fontWeight: 800, display: 'block' }}>2. Initiate Agent-as-Code CI/CD Architecture</span>
                          <span style={{ fontSize: '0.58rem', color: '#475569', display: 'block' }}>Configure private GitHub actions and provision GCP container registries.</span>
                        </div>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.68rem', color: '#0f172a', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ marginTop: '0.1rem', accentColor: colors.accentTeal }} />
                        <div>
                          <span style={{ fontWeight: 800, display: 'block' }}>3. Schedule Day-0 GxP Quality Validation Meeting</span>
                          <span style={{ fontSize: '0.58rem', color: '#475569', display: 'block' }}>Align with biopharma compliance leads on cryptographic consensus key rules.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.55rem' }}>
                    <Award size={28} style={{ color: colors.accentTeal }} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 900, color: '#0f172a' }}>Secure Your January 2027 MVP Delivery</h4>
                      <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.62rem', color: '#475569', lineHeight: 1.35 }}>
                        Authorize the FDE Technical Spike to build the initial mTLS gateway and Veeva Vault vector graph prototypes in Weeks 1-3.
                      </p>
                    </div>
                    <button
                      onClick={() => alert("📩 Scheduling Technical Spike... Request sent to Google CE Field Engineers!")}
                      style={{ background: '#ffffff', border: `1.2px solid ${colors.accentTeal}`, color: colors.accentTeal, borderRadius: '6px', padding: '0.4rem 1.2rem', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      Request Technical Spike / PoC
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 7: GAMP 5 CONTINUOUS GXP VALIDATION COMMAND CENTER
            // ========================================================================= */}
            {reportPage === 'gxp_validation' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                  
                  {/* Symmetrical COU Speedometer Dials */}
                  <div className="v12-card-glass" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', flexShrink: 0, height: '120px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(15,23,42,0.03)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none" stroke={colors.accentTeal} strokeWidth="4" strokeDasharray="150" strokeDashoffset="132" style={{ transition: 'stroke-dashoffset 0.3s' }} />
                      </svg>
                      <div>
                        <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Agent Actions Drift</span>
                        <span style={{ fontSize: '1rem', fontWeight: 950, color: colors.accentTeal }}>0.12 <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>/ 5.0</span></span>
                        <span style={{ fontSize: '0.48rem', color: '#16a34a', display: 'block', marginTop: '0.05rem' }}>✓ Within FDA Validated Boundary</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(15,23,42,0.03)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none" stroke={colors.accentAmber} strokeWidth="4" strokeDasharray="150" strokeDashoffset="25" />
                      </svg>
                      <div>
                        <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Validated Envelope</span>
                        <span style={{ fontSize: '1rem', fontWeight: 950, color: colors.accentAmber }}>96.8%</span>
                        <span style={{ fontSize: '0.48rem', color: '#475569', display: 'block', marginTop: '0.05rem' }}>FDA GAMP 5 Category 4 Shield</span>
                      </div>
                    </div>

                  </div>

                  {/* False Positive/Negative Trackers Line Graph */}
                  <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', minHeight: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.25rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>6-MONTH AUTOMATED MLR ACCURACY TREND</span>
                      <span style={{ fontSize: '0.52rem', color: '#475569' }}>False Positives vs. False Negatives (%)</span>
                    </div>

                    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 300 130" style={{ width: '100%', height: '100%', background: '#f8fafc', borderRadius: '6px' }}>
                        <line x1="25" y1="10" x2="290" y2="10" stroke="rgba(15,23,42,0.04)" />
                        <line x1="25" y1="60" x2="290" y2="60" stroke="rgba(15,23,42,0.04)" />
                        <line x1="25" y1="110" x2="290" y2="110" stroke="rgba(15,23,42,0.04)" />

                        <path 
                          d="M 25,20 L 75,30 L 125,50 L 175,80 L 225,95 L 290,105" 
                          fill="none" 
                          stroke={colors.accentTeal} 
                          strokeWidth="2" 
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }}
                        />
                        <path 
                          d="M 25,95 L 75,100 L 125,98 L 175,105 L 225,107 L 290,108" 
                          fill="none" 
                          stroke={colors.accentCoral} 
                          strokeWidth="1.5" 
                          strokeDasharray="2"
                        />

                        <text x="35" y="125" fill={colors.accentTeal} fontSize="6" fontWeight="bold">False Positives (Decreasing)</text>
                        <text x="160" y="125" fill={colors.accentCoral} fontSize="6" fontWeight="bold">False Negatives (Stable &lt; 1%)</text>
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Symmetrical Right Panel: GAMP 5 Telemetry & Failover Mitigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                  
                  {/* Sovereign Guardrails Comparison Panel */}
                  <div className="v12-card-glass" style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>SOVEREIGN GUARDRAILS COMPARISON</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto' }} className="v12-scrollable">
                      <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '0.4rem', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                        <h4 style={{ margin: 0, fontSize: '0.68rem', fontWeight: 900, color: colors.accentTeal }}>Google Vertex Model Armor</h4>
                        <span style={{ fontSize: '0.58rem', color: '#475569', display: 'block', marginTop: '0.1rem', lineHeight: 1.3 }}>
                          Natively scrubs PII/PHI and blocks off-label medical claims in under **22ms** before prompts ever route to core models.
                        </span>
                      </div>
                      <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '0.4rem', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                        <h4 style={{ margin: 0, fontSize: '0.68rem', fontWeight: 900, color: colors.accentAmber }}>AWS Bedrock Guardrails</h4>
                        <span style={{ fontSize: '0.58rem', color: '#475569', display: 'block', marginTop: '0.1rem', lineHeight: 1.3 }}>
                          Rigid regex-based compliance scrubbing, lacking spatial/ontology-aware metadata tagging.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active-Active Failover Mitigation Strategy Card */}
                  <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'rgba(13, 148, 136, 0.02)', border: `1.2px solid ${colors.accentTeal}` }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>ACTIVE-ACTIVE FAILOVER MITIGATION (GAMP 5)</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.62rem', color: '#475569', lineHeight: 1.35 }}>
                      <div>• <strong style={{ color: '#0f172a' }}>Primary Risk</strong>: Foundation model endpoint failure or regional cloud outage.</div>
                      <div>• <strong style={{ color: '#0f172a' }}>Mitigation Action</strong>: Active-active cross-region failover between GCP US-East (Virginia) and GCP US-Central (Iowa).</div>
                      <div>• <strong style={{ color: '#0f172a' }}>Success Metric</strong>: **RTO &lt; 4 minutes** with zero session data loss during active MLR reviews.</div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 8: COMPOSABLE WHAT-IF SANDBOX (AI ENTERPRISE ARCHITECTURE SIMULATOR)
            // ========================================================================= */}
            {reportPage === 'whatif' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Simulated Values Computation Block */}
                {(() => {
                  // Component Weights & Base Values
                  const vendors = {
                    orch: {
                      google: { label: 'Google Gemini Agent Platform', cost: 1.2, agility: 95, compliance: 90, gxp: 92 },
                      aws: { label: 'AWS Bedrock managed APIs', cost: 1.5, agility: 80, compliance: 85, gxp: 88 },
                      veeva: { label: 'Veeva Vault Native AI', cost: 0.8, agility: 60, compliance: 95, gxp: 98 }
                    },
                    identity: {
                      entra: { label: 'Microsoft Entra ID (Azure AD)', cost: 0.4, agility: 85, compliance: 90, gxp: 90 },
                      ping: { label: 'Okta / PingFederate SSO', cost: 0.6, agility: 90, compliance: 85, gxp: 88 }
                    },
                    federation: {
                      mcp: { label: 'Model Context Protocol (MCP)', cost: 0.3, agility: 98, compliance: 92, gxp: 94 },
                      webhooks: { label: 'Custom API Webhooks', cost: 0.9, agility: 70, compliance: 75, gxp: 80 },
                      etl: { label: 'Scheduled Batch ETL', cost: 0.5, agility: 45, compliance: 80, gxp: 82 }
                    },
                    storage: {
                      adobe: { label: 'Adobe GenStudio / AEM', cost: 0.8, agility: 92, compliance: 88, gxp: 85 },
                      veeva_promomats: { label: 'Veeva Vault PromoMats', cost: 1.1, agility: 70, compliance: 96, gxp: 98 },
                      s3: { label: 'Custom S3 / Cloud Storage', cost: 0.2, agility: 50, compliance: 60, gxp: 65 }
                    }
                  };

                  const selOrch = vendors.orch[whatIfOrch];
                  const selId = vendors.identity[whatIfIdentity];
                  const selFed = vendors.federation[whatIfFederation];
                  const selStore = vendors.storage[whatIfStorage];

                  // Calculations
                  let costSum = selOrch.cost + selId.cost + selFed.cost + selStore.cost;
                  let mvpBase = 6; // Base 6 months
                  let gxpSum = (selOrch.gxp + selId.gxp + selFed.gxp + selStore.gxp) / 4;
                  let agilitySum = (selOrch.agility + selId.agility + selFed.agility + selStore.agility) / 4;

                  let synergyDiscount = 0;
                  let frictionPenalty = 0;
                  let mvpAdjustment = 0;
                  let activeWarnings = [];

                  // Synergy 1: Veeva + Veeva
                  if (whatIfOrch === 'veeva' && whatIfStorage === 'veeva_promomats') {
                    synergyDiscount = costSum * 0.15; // 15% discount
                    mvpAdjustment -= 3;
                    gxpSum = Math.min(100, gxpSum + 5);
                    activeWarnings.push({ type: 'synergy', text: '✓ Veeva Ecosystem Synergy: 15% TCO discount and -3 months MVP validation timeline applied.' });
                  }

                  // Synergy 2: Google + MCP
                  if (whatIfOrch === 'google' && whatIfFederation === 'mcp') {
                    synergyDiscount += costSum * 0.08;
                    mvpAdjustment -= 2;
                    activeWarnings.push({ type: 'synergy', text: '✓ Google MCP Data Mesh Synergy: Shaves 2 months off MVP and reduces integration testing debt.' });
                  }

                  // Friction 1: Custom Webhooks with Google/AWS Orchestration
                  if ((whatIfOrch === 'google' || whatIfOrch === 'aws') && whatIfFederation === 'webhooks') {
                    frictionPenalty += 1.2; // $1.2M Customization Technical Debt
                    mvpAdjustment += 4;
                    agilitySum = Math.max(20, agilitySum - 15);
                    activeWarnings.push({ type: 'friction', text: '⚠️ High technical debt: Custom webhooks lack native agentic state management, increasing TCO by $1.2M and delaying MVP by 4 months.' });
                  }

                  // Friction 2: Veeva AI with Adobe Storage (Siloed)
                  if (whatIfOrch === 'veeva' && whatIfStorage === 'adobe') {
                    frictionPenalty += 0.8;
                    mvpAdjustment += 3;
                    activeWarnings.push({ type: 'friction', text: '⚠️ Ecosystem Friction: Veeva Native AI cannot push metadata to Adobe GenStudio without heavy custom middleware (+3 months).' });
                  }

                  const finalTCO = Math.round((costSum + frictionPenalty - synergyDiscount) * 10) / 10;
                  const finalMonths = Math.max(3, mvpBase + mvpAdjustment);
                  const finalGxP = Math.min(100, Math.round(gxpSum));
                  const finalAgility = Math.min(100, Math.round(agilitySum));
                  const finalCostEfficiency = Math.min(100, Math.round(100 - (finalTCO / 10.0) * 100));

                  const handleSaveScenario = () => {
                    if (!scenarioNameInput.trim()) {
                      alert("⚠️ Please enter a scenario name!");
                      return;
                    }
                    const newScen = {
                      name: scenarioNameInput.trim(),
                      orch: whatIfOrch,
                      identity: whatIfIdentity,
                      federation: whatIfFederation,
                      storage: whatIfStorage,
                      tco: `${finalTCO}M`,
                      mvp: `${finalMonths}mo`,
                      gxp: `${finalGxP}/100`,
                      agility: finalAgility,
                      compliance: finalGxP,
                      costEfficiency: finalCostEfficiency
                    };
                    setSavedScenarios(prev => [...prev, newScen]);
                    setScenarioNameInput('');
                    alert(`✓ Scenario "${newScen.name}" saved to comparative ledger!`);
                  };

                  return (
                    <>
                      {/* Top Horizontal Bars Graph Matching Uploaded Visual Mockup */}
                      <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: '1rem 1.5rem', flexShrink: 0 }}>
                        <h3 style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '0.5px' }}>
                          AI ENTERPRISE ARCHITECTURE SIMULATOR
                        </h3>

                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '0.5rem 0 0.8rem 0' }}>
                          
                          {/* Agility Bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#475569', width: '90px', fontWeight: 800, textAlign: 'right' }}>Agility</span>
                            <div style={{ flex: 1, height: '14px', background: 'rgba(15,23,42,0.03)', borderRadius: '100px', border: '1px solid rgba(15, 23, 42, 0.08)', overflow: 'hidden' }}>
                              <div style={{ width: `${finalAgility}%`, height: '100%', background: '#15803d', borderRadius: '100px', boxShadow: '0 2px 4px rgba(21, 128, 61, 0.2)' }} />
                            </div>
                            <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#0f172a', width: '25px' }}>{finalAgility}</span>
                          </div>

                          {/* Compliance Bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#475569', width: '90px', fontWeight: 800, textAlign: 'right' }}>Compliance</span>
                            <div style={{ flex: 1, height: '14px', background: 'rgba(15,23,42,0.03)', borderRadius: '100px', border: '1px solid rgba(15, 23, 42, 0.08)', overflow: 'hidden' }}>
                              <div style={{ width: `${finalGxP}%`, height: '100%', background: '#d97706', borderRadius: '100px', boxShadow: '0 2px 4px rgba(217, 119, 6, 0.2)' }} />
                            </div>
                            <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#0f172a', width: '25px' }}>{finalGxP}</span>
                          </div>

                          {/* Cost Efficiency Bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#475569', width: '90px', fontWeight: 800, textAlign: 'right' }}>Cost Efficiency</span>
                            <div style={{ flex: 1, height: '14px', background: 'rgba(15,23,42,0.03)', borderRadius: '100px', border: '1px solid rgba(15, 23, 42, 0.08)', overflow: 'hidden' }}>
                              <div style={{ width: `${finalCostEfficiency}%`, height: '100%', background: '#1d4ed8', borderRadius: '100px', boxShadow: '0 2px 4px rgba(29, 78, 216, 0.2)' }} />
                            </div>
                            <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#0f172a', width: '25px' }}>{finalCostEfficiency}</span>
                          </div>

                          {/* Enterprise Target Dashed Line at 70% */}
                          <div style={{ position: 'absolute', left: 'calc(90px + 0.85rem + (100% - 90px - 0.85rem - 25px - 0.85rem) * 0.7)', top: '-5px', bottom: '-5px', width: '1.5px', borderLeft: '1.5px dashed rgba(15, 23, 42, 0.3)', pointerEvents: 'none', zIndex: 5 }}>
                            <span style={{ position: 'absolute', top: '102%', left: '-35px', fontSize: '0.52rem', color: '#475569', fontWeight: 800, whiteSpace: 'nowrap' }}>Enterprise Target (70)</span>
                          </div>

                        </div>

                        {/* Symmetrical Dynamic Score Outputs */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', borderTop: '1px solid rgba(15,23,42,0.08)', paddingTop: '0.65rem', textAlign: 'center' }}>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>3-Year TCO ($M)</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>${finalTCO}M</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Months to MVP</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>{finalMonths}mo</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>GxP Score</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>{finalGxP}/100</span>
                          </div>
                        </div>

                      </div>

                      {/* Dropdown Composable Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', flexShrink: 0 }}>
                        
                        <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', background: '#ffffff' }}>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.3rem' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>CORE PLATFORM COMPONENT SELECTION</span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.65rem' }}>
                            
                            {/* Dropdown 1: Orchestration */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>AI Orchestration & Gateway</span>
                              <select 
                                value={whatIfOrch}
                                onChange={e => setWhatIfOrch(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                <option value="google">Google Gemini Enterprise Platform</option>
                                <option value="aws">AWS Bedrock Managed APIs</option>
                                <option value="veeva">Veeva Vault Native AI</option>
                              </select>
                            </div>

                            {/* Dropdown 2: Identity */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Zero-Trust Identity (IAM)</span>
                              <select 
                                value={whatIfIdentity}
                                onChange={e => setWhatIfIdentity(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                <option value="ping">Okta / PingFederate SSO</option>
                              </select>
                            </div>

                            {/* Dropdown 3: Data Federation */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Data Federation & Memory</span>
                              <select 
                                value={whatIfFederation}
                                onChange={e => setWhatIfFederation(e.target.value)}
                                style={{ 
                                  background: '#ffffff', 
                                  border: (whatIfOrch === 'google' || whatIfOrch === 'aws') && whatIfFederation === 'webhooks' ? `1.5px solid ${colors.accentAmber}` : '1px solid rgba(15,23,42,0.15)', 
                                  borderRadius: '4px', 
                                  color: '#0f172a', 
                                  padding: '0.25rem', 
                                  outline: 'none', 
                                  cursor: 'pointer', 
                                  fontWeight: 700 
                                }}
                              >
                                <option value="mcp">Model Context Protocol (MCP)</option>
                                <option value="webhooks">Custom API Webhooks</option>
                                <option value="etl">Scheduled Batch ETL</option>
                              </select>
                            </div>

                            {/* Dropdown 4: Content Supply Chain */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Content Supply Chain & Storage</span>
                              <select 
                                value={whatIfStorage}
                                onChange={e => setWhatIfStorage(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                <option value="adobe">Adobe GenStudio / AEM</option>
                                <option value="veeva_promomats">Veeva PromoMats</option>
                                <option value="s3">Custom S3 / Cloud Storage</option>
                              </select>
                            </div>

                          </div>
                        </div>

                        {/* Dynamic Synergy & Friction Alert Feed */}
                        <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff', maxHeight: '120px' }}>
                          <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#475569', letterSpacing: '0.5px' }}>ACTIVE SYNERGY & FRICTION COMPILER FEED</span>
                          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.3rem' }} className="v12-scrollable">
                            {activeWarnings.length === 0 ? (
                              <span style={{ fontSize: '0.62rem', color: '#94a3b8', fontStyle: 'italic' }}>*Stack is fully composable. No synergies or technical friction detected.*</span>
                            ) : (
                              activeWarnings.map((warn, i) => (
                                <div 
                                  key={i} 
                                  style={{ 
                                    padding: '0.25rem 0.45rem', 
                                    borderRadius: '4px', 
                                    fontSize: '0.62rem', 
                                    background: warn.type === 'synergy' ? 'rgba(13, 148, 136, 0.05)' : 'rgba(217, 119, 6, 0.05)',
                                    border: warn.type === 'synergy' ? `1px solid ${colors.accentTeal}` : `1px solid ${colors.accentAmber}`,
                                    color: warn.type === 'synergy' ? colors.accentTeal : colors.accentAmber,
                                    lineHeight: 1.3
                                  }}
                                >
                                  {warn.text}
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Save Scenario Bar */}
                      <div className="v12-card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem', flexShrink: 0, background: '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#475569' }}>Save Architecture Snapshot:</span>
                          <input 
                            type="text"
                            placeholder="e.g. Scenario C: Composable GCP + Okta"
                            value={scenarioNameInput}
                            onChange={e => setScenarioNameInput(e.target.value)}
                            style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.65rem', color: '#0f172a', outline: 'none', width: '220px' }}
                          />
                        </div>
                        <button 
                          onClick={handleSaveScenario}
                          style={{ background: colors.purpleGradient, border: 'none', color: '#fff', padding: '0.35rem 1rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer' }}
                        >
                          Save Scenario As...
                        </button>
                      </div>

                      {/* Comparative Saved Scenarios Table */}
                      <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', minHeight: '120px' }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px' }}>STEERING COMMITTEE COMPARATIVE LEDGER</span>
                        
                        <div style={{ flex: 1, overflowY: 'auto' }} className="v12-scrollable">
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.65rem', textAlign: 'left' }}>
                            <thead>
                              <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.08)', color: '#475569', fontWeight: 800 }}>
                                <th style={{ padding: '0.3rem 0.45rem' }}>SCENARIO RUN NAME</th>
                                <th style={{ padding: '0.3rem 0.45rem' }}>ORCHESTRATION</th>
                                <th style={{ padding: '0.3rem 0.45rem' }}>FEDERATION</th>
                                <th style={{ padding: '0.3rem 0.45rem' }}>STORAGE</th>
                                <th style={{ padding: '0.3rem 0.45rem', textAlign: 'center' }}>3-YEAR TCO</th>
                                <th style={{ padding: '0.3rem 0.45rem', textAlign: 'center' }}>MONTHS MVP</th>
                                <th style={{ padding: '0.3rem 0.45rem', textAlign: 'center' }}>GxP SCORE</th>
                                <th style={{ padding: '0.3rem 0.45rem', textAlign: 'center' }}>AGILITY</th>
                              </tr>
                            </thead>
                            <tbody>
                              {savedScenarios.map((scen, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(15,23,42,0.04)' }} className="v12-table-row-hover">
                                  <td style={{ padding: '0.35rem 0.45rem', fontWeight: 800, color: '#0f172a' }}>{scen.name}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', color: '#475569' }}>{scen.orch === 'google' ? 'Google Gemini' : scen.orch === 'aws' ? 'AWS Bedrock' : 'Veeva Native'}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', color: '#475569' }}>{scen.federation === 'mcp' ? 'MCP Data Mesh' : scen.federation === 'webhooks' ? 'Custom Webhooks' : 'Batch ETL'}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', color: '#475569' }}>{scen.storage === 'adobe' ? 'Adobe GenStudio' : scen.storage === 'veeva_promomats' ? 'Veeva PromoMats' : 'S3 Bucket'}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', textAlign: 'center', fontWeight: 900, color: colors.accentAmber }}>${scen.tco}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', textAlign: 'center', color: '#0f172a' }}>{scen.mvp}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', textAlign: 'center', color: colors.accentTeal, fontWeight: 800 }}>{scen.gxp}</td>
                                  <td style={{ padding: '0.35rem 0.45rem', textAlign: 'center', color: '#0f172a' }}>{scen.agility}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  );
                })()}

              </div>
            )}

            {/* =========================================================================
            // PAGE 7: GAMP 5 CONTINUOUS GXP VALIDATION COMMAND CENTER
            // ========================================================================= */}
            {reportPage === 'gxp_validation' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                  
                  {/* Symmetrical COU Speedometer Dials */}
                  <div className="v12-card-glass" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', flexShrink: 0, height: '120px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(15,23,42,0.03)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none" stroke={colors.accentTeal} strokeWidth="4" strokeDasharray="150" strokeDashoffset="132" style={{ transition: 'stroke-dashoffset 0.3s' }} />
                      </svg>
                      <div>
                        <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Agent Actions Drift</span>
                        <span style={{ fontSize: '1rem', fontWeight: 950, color: colors.accentTeal }}>0.12 <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>/ 5.0</span></span>
                        <span style={{ fontSize: '0.48rem', color: '#16a34a', display: 'block', marginTop: '0.05rem' }}>✓ Within FDA Validated Boundary</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(15,23,42,0.03)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none" stroke={colors.accentAmber} strokeWidth="4" strokeDasharray="150" strokeDashoffset="25" />
                      </svg>
                      <div>
                        <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Validated Envelope</span>
                        <span style={{ fontSize: '1rem', fontWeight: 950, color: colors.accentAmber }}>96.8%</span>
                        <span style={{ fontSize: '0.48rem', color: '#475569', display: 'block', marginTop: '0.05rem' }}>FDA GAMP 5 Category 4 Shield</span>
                      </div>
                    </div>

                  </div>

                  {/* False Positive/Negative Trackers Line Graph */}
                  <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', minHeight: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.25rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>6-MONTH AUTOMATED MLR ACCURACY TREND</span>
                      <span style={{ fontSize: '0.52rem', color: '#475569' }}>False Positives vs. False Negatives (%)</span>
                    </div>

                    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 300 130" style={{ width: '100%', height: '100%', background: '#f8fafc', borderRadius: '6px' }}>
                        <line x1="25" y1="10" x2="290" y2="10" stroke="rgba(15,23,42,0.04)" />
                        <line x1="25" y1="60" x2="290" y2="60" stroke="rgba(15,23,42,0.04)" />
                        <line x1="25" y1="110" x2="290" y2="110" stroke="rgba(15,23,42,0.04)" />

                        <path 
                          d="M 25,20 L 75,30 L 125,50 L 175,80 L 225,95 L 290,105" 
                          fill="none" 
                          stroke={colors.accentTeal} 
                          strokeWidth="2" 
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }}
                        />
                        <path 
                          d="M 25,95 L 75,100 L 125,98 L 175,105 L 225,107 L 290,108" 
                          fill="none" 
                          stroke={colors.accentCoral} 
                          strokeWidth="1.5" 
                          strokeDasharray="2"
                        />

                        <text x="35" y="125" fill={colors.accentTeal} fontSize="6" fontWeight="bold">False Positives (Decreasing)</text>
                        <text x="160" y="125" fill={colors.accentCoral} fontSize="6" fontWeight="bold">False Negatives (Stable &lt; 1%)</text>
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Symmetrical Right Panel: GAMP 5 Telemetry & Failover Mitigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                  
                  {/* Sovereign Guardrails Comparison Panel */}
                  <div className="v12-card-glass" style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#ffffff' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>SOVEREIGN GUARDRAILS COMPARISON</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto' }} className="v12-scrollable">
                      <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '0.4rem', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                        <h4 style={{ margin: 0, fontSize: '0.68rem', fontWeight: 900, color: colors.accentTeal }}>Google Vertex Model Armor</h4>
                        <span style={{ fontSize: '0.58rem', color: '#475569', display: 'block', marginTop: '0.1rem', lineHeight: 1.3 }}>
                          Natively scrubs PII/PHI and blocks off-label medical claims in under **22ms** before prompts ever route to core models.
                        </span>
                      </div>
                      <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '0.4rem', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                        <h4 style={{ margin: 0, fontSize: '0.68rem', fontWeight: 900, color: colors.accentAmber }}>AWS Bedrock Guardrails</h4>
                        <span style={{ fontSize: '0.58rem', color: '#475569', display: 'block', marginTop: '0.1rem', lineHeight: 1.3 }}>
                          Rigid regex-based compliance scrubbing, lacking spatial/ontology-aware metadata tagging.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active-Active Failover Mitigation Strategy Card */}
                  <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'rgba(13, 148, 136, 0.02)', border: `1.2px solid ${colors.accentTeal}` }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>ACTIVE-ACTIVE FAILOVER MITIGATION (GAMP 5)</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.62rem', color: '#475569', lineHeight: 1.35 }}>
                      <div>• <strong style={{ color: '#0f172a' }}>Primary Risk</strong>: Foundation model endpoint failure or regional cloud outage.</div>
                      <div>• <strong style={{ color: '#0f172a' }}>Mitigation Action</strong>: Active-active cross-region failover between GCP US-East (Virginia) and GCP US-Central (Iowa).</div>
                      <div>• <strong style={{ color: '#0f172a' }}>Success Metric</strong>: **RTO &lt; 4 minutes** with zero session data loss during active MLR reviews.</div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* ==========================================================================
      // ADOBE DAG DETAIL MODAL (PAGE 3)
      // ========================================================================== */}
      {activeDagNode && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(248, 250, 252, 0.85)', display: 'flex', alignItems: 'center', justifycontent: 'center', zIndex: 120 }}>
          <div className="v12-card-glass" style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '0.85rem', border: `1.2px solid ${colors.accentTeal}`, boxShadow: '0 8px 32px rgba(13, 148, 136, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 950, color: colors.accentTeal }}>{activeDagNode.title}</span>
              <button onClick={() => setActiveDagNode(null)} style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 900 }}>✕</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <div>
                <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>HOW GEMINI PROCESSES REVIEWS</span>
                <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.68rem', color: '#0f172a', lineHeight: 1.4 }}>{activeDagNode.desc}</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.45rem', borderRadius: '4px', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                <span style={{ fontSize: '0.52rem', color: colors.accentTeal, fontWeight: 900, display: 'block', marginBottom: '0.15rem' }}>AWS VS. GOOGLE ARCHITECTURE CONTRAST</span>
                <p style={{ margin: 0, fontSize: '0.65rem', color: '#0f172a', lineHeight: 1.4 }}>{activeDagNode.contrast}</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
              <button 
                onClick={() => setActiveDagNode(null)}
                style={{ background: colors.purpleGradient, border: 'none', color: '#fff', borderRadius: '4px', padding: '0.35rem 0.85rem', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer' }}
              >
                Dismiss Deep-Dive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
      // SIGN-OFF CERTIFICATE MODAL LEDGER (PAGE 6)
      // ========================================================================== */}
      {signOffModalActive && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(248, 250, 252, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}>
          <div className="v12-card-glass" style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '0.85rem', border: '1px solid rgba(13, 148, 136, 0.3)', boxShadow: '0 8px 32px rgba(13, 148, 136, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.45rem' }}>
              <Shield size={18} style={{ color: colors.accentTeal }} />
              <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px' }}>CRYPTOGRAPHIC QUALITY UNIT SIGN-OFF</h3>
            </div>
            
            <p style={{ margin: 0, fontSize: '0.68rem', color: '#475569', lineHeight: 1.4 }}>
              To validate this architecture under **FDA GxP Part 11 perimeters**, please enter the name of the certifying C-Suite executive or Quality Manager below. This locks the assessment configuration in the database and assigns a secure cryptographic verification key.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <label style={{ fontSize: '0.58rem', color: '#475569', fontWeight: 800 }}>CERTIFYING SIGNATORY NAME</label>
              <input 
                type="text"
                value={customSignatory}
                onChange={e => setCustomSignatory(e.target.value)}
                placeholder="e.g. Dr. Arthur Pendelton, VP Quality Assurance"
                style={{ background: '#ffffff', border: '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '4px', padding: '0.35rem 0.5rem', fontSize: '0.7rem', color: '#0f172a', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
              <button 
                onClick={() => setSignOffModalActive(false)}
                style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', padding: '0.3rem 0.65rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!customSignatory.trim()) {
                    alert("⚠️ Signatory name is required!");
                    return;
                  }
                  setIsSignedOff(true);
                  setSignOffModalActive(false);
                  alert(`🔒 Architecture signed successfully by ${customSignatory}! Cryptographic lock key assigned: SHA256-V12_LEDGER_LOCK_${Date.now()}`);
                }}
                style={{ background: colors.purpleGradient, border: 'none', color: '#fff', borderRadius: '4px', padding: '0.35rem 0.75rem', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer' }}
              >
                Certify & Lock
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
"""

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(light_theme_code)

print("🎉 Successfully converted entire V12 dashboard workspace to a premium Light Theme!")
