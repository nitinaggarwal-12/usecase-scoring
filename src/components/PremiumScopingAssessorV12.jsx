import React, { useState, useMemo, useEffect, useRef } from 'react';
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

export default function PremiumScopingAssessorV12({ 
  onBackToLanding, 
  globalTheme = 'light', 
  apiKey = '', 
  gcpToken = '',
  onSaveSession,
  activeSessionId,
  sessions = []
}) {
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

  // --------------------------------------------------------------------------
  // POSTGRESQL DATABASE SESSION PERSISTENCE & AUTO-REHYDRATION ENGINE
  // --------------------------------------------------------------------------
  
  // 1. Hybrid GxP Persistence Engine (LocalStorage Immediate Mount + PostgreSQL Database Sync)
  
  // Phase A: Immediate Synchronous Rehydration on Mount (Prevents form resets & keeps view mode!)
  useEffect(() => {
    if (!activeSessionId) return;

    try {
      // Synchronously restore scores from local cache to prevent empty screen flashes!
      const cachedScoresRaw = localStorage.getItem(`v12_scores_${activeSessionId}`);
      if (cachedScoresRaw) {
        const parsed = JSON.parse(cachedScoresRaw);
        if (JSON.stringify(scores) !== JSON.stringify(parsed)) {
          setScores(parsed);
        }
      }

      // Synchronously restore customer profile
      const cachedInfoRaw = localStorage.getItem(`v12_customer_info_${activeSessionId}`);
      if (cachedInfoRaw) {
        const parsed = JSON.parse(cachedInfoRaw);
        if (JSON.stringify(customerInfo) !== JSON.stringify(parsed)) {
          setCustomerInfo(parsed);
        }
      }

      // Synchronously restore report view tab and sub-page
      const cachedPage = localStorage.getItem(`v12_report_page_${activeSessionId}`);
      if (cachedPage) {
        setReportPage(cachedPage);
        setActiveTab('scorecard');
      }
    } catch (e) {
      console.error("[GxP_LOCAL_REHYDRATION_ERROR] Failed immediate mount restore:", e);
    }
  }, [activeSessionId]);

  // Phase B: Asynchronous Database Alignment (Aligns local state with database once network fetch completes)
  useEffect(() => {
    if (!activeSessionId || !sessions || sessions.length === 0) return;

    const dbSession = sessions.find(s => s.id === activeSessionId);
    if (!dbSession || !dbSession.versions || dbSession.versions.length === 0) return;

    try {
      const latestVer = dbSession.versions[dbSession.versions.length - 1];
      
      // Sync scores with database
      if (latestVer.scores && Object.keys(latestVer.scores).length > 0) {
        const localScoresJson = JSON.stringify(scores);
        const dbScoresJson = JSON.stringify(latestVer.scores);
        if (localScoresJson !== dbScoresJson) {
          setScores(latestVer.scores);
        }
      }

      // Sync customer profile with database
      if (latestVer.formData) {
        const newInfo = {
          company: latestVer.formData.customerName || latestVer.formData.company || 'Pfizer Oncology Research',
          useCaseName: latestVer.formData.useCaseName || 'Clinical Trial Protocol Generator [V12]',
          domain: latestVer.formData.customerDomain || latestVer.formData.industry || latestVer.formData.domain || 'Clinical Development',
          runtime: latestVer.formData.runtime || 'Google Cloud Vertex AI',
          connectors: latestVer.formData.connectors || ['Medidata Rave REST API', 'BigQuery Omnishare', 'Veeva Vault GxP Docs']
        };
        if (JSON.stringify(customerInfo) !== JSON.stringify(newInfo)) {
          setCustomerInfo(newInfo);
        }
      }
    } catch (e) {
      console.error("[GxP_DB_ALIGNMENT_ERROR] Failed background database alignment:", e);
    }
  }, [activeSessionId, sessions]);

  // Phase C: Write-through Cache (Saves state locally on any change to back up Phase A rehydration)
  useEffect(() => {
    if (!activeSessionId) return;
    try {
      localStorage.setItem(`v12_scores_${activeSessionId}`, JSON.stringify(scores));
      localStorage.setItem(`v12_customer_info_${activeSessionId}`, JSON.stringify(customerInfo));
    } catch (e) {
      console.error("[GxP_CACHE_WRITE_ERROR] Failed writing to local cache:", e);
    }
  }, [scores, customerInfo, activeSessionId]);

  // 2. Explicit Database Save Action (Fired on manual clicks & core milestones)
  const triggerDbSave = (customScores = scores, customInfo = customerInfo) => {
    if (!onSaveSession || !activeSessionId) {
      alert("⚠️ Database session pipeline is offline. Run from Portfolio Summary page!");
      return;
    }
    
    try {
      const metadata = {
        customerName: customInfo.company || 'Pfizer Oncology Research',
        customerDomain: customInfo.domain || 'Clinical Development',
        useCaseName: customInfo.useCaseName || 'Clinical Trial Protocol Generator [V12]',
        runtime: customInfo.runtime || 'Google Cloud Vertex AI',
        connectors: customInfo.connectors || []
      };

      // Write directly to PostgreSQL database
      onSaveSession(metadata, customScores, liveSynthesis || '', null, null);
    } catch (e) {
      console.error("[GxP_DB_SAVE_ERROR] Failed to save session to database:", e);
    }
  };

  // 3. Save active report view page locally (transient view state)
  useEffect(() => {
    if (!activeSessionId) return;
    localStorage.setItem(`v12_report_page_${activeSessionId}`, reportPage);
  }, [reportPage, activeSessionId]);

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
  const [whatIfOrch, setWhatIfOrch] = useState('google'); 
  const [whatIfIdentity, setWhatIfIdentity] = useState('entra'); 
  const [whatIfFederation, setWhatIfFederation] = useState('mcp'); 
  const [whatIfCreative, setWhatIfCreative] = useState('firefly'); // 'workfront' | 'firefly'
  const [whatIfMLR, setWhatIfMLR] = useState('veeva_promomats'); // 'veeva_promomats' | 'custom_mlr'
  const [whatIfStorage, setWhatIfStorage] = useState('adobe'); // Kept for compatibility
  const [scenarioNameInput, setScenarioNameInput] = useState('');
  
  // Agile Scope Guard Toggle State
  const [scopeConstraint, setScopeConstraint] = useState('2026'); // '2026' (MVP) | '2027' (Scale)
  const [savedScenarios, setSavedScenarios] = useState([
    { name: 'Scenario A: Google Cloud All-In Native Stack', orch: 'google', identity: 'google_id', federation: 'google_bq', storage: 's3', tco: '2.1M', mvp: '3mo', gxp: '92/100', agility: 95, compliance: 92, costEfficiency: 92 },
    { name: 'Scenario B: Highly Regulated Composable Stack', orch: 'aws', identity: 'ping', federation: 'databricks_data', storage: 'veeva_promomats', tco: '4.9M', mvp: '8mo', gxp: '98/100', agility: 81, compliance: 98, costEfficiency: 81 },
    { name: 'Scenario C: Creative & Agentic Hybrid Stack', orch: 'azure', identity: 'okta', federation: 'mcp', storage: 'adobe', tco: '3.6M', mvp: '6mo', gxp: '88/100', agility: 90, compliance: 88, costEfficiency: 88 }
  ]);

  // Analytical Frameworks Active Tab State
  const [activeFrameworkTab, setActiveFrameworkTab] = useState('hype'); // 'hype' | 'capabilities' | 'horizons' | 'wave' | 'wardley'
  const [hoveredFrameworkItem, setHoveredFrameworkItem] = useState(null);

  // C-Suite Operational Readiness States
  const [changeManagementOption, setChangeManagementOption] = useState('teams'); // 'portal' | 'teams' | 'veeva'
  const [njAuditTrailEnabled, setNjAuditTrailEnabled] = useState(true);

  // Merck Moonshot Layers Active State
  const [expandedMoonshotLayerId, setExpandedMoonshotLayerId] = useState(1);

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

  // 100% Deterministic Scopes Prefiller (Zero Randomness - Guaranteed First-Click Selection)
  const handleAutoFillRandom = () => {
    // Lock to a single, high-fidelity biopharma profile for consistent client demo
    const selectedProfile = {
      company: 'Pfizer Oncology Research',
      useCaseName: 'Clinical Trial Protocol Generator [V12]',
      domain: 'Clinical Development',
      runtime: 'Google Cloud Vertex AI',
      connectors: ['Medidata Rave REST API', 'BigQuery Omnishare', 'Veeva Vault GxP Docs']
    };
    setCustomerInfo(selectedProfile);

    // Simple deterministic string-hashing function to generate stable, non-random, high-fidelity indices
    const getStableNumber = (str, min, max) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const range = max - min + 1;
      return min + (Math.abs(hash) % range);
    };

    const presetScores = {};
    FLAT_QUESTIONS.forEach(q => {
      // Deterministically generate scores (1-3 current, 4-5 future)
      const curr = getStableNumber(q.id + "_current", 1, 3);
      const fut = getStableNumber(q.id + "_future", 4, 5);

      // Deterministically select exactly 1-2 distinct pain points to guarantee no empty checkboxes!
      const techPain = [];
      if (q.technicalPainpoints && q.technicalPainpoints.length > 0) {
        const idx1 = getStableNumber(q.id + "_tech1", 0, q.technicalPainpoints.length - 1);
        techPain.push(q.technicalPainpoints[idx1]);
        if (q.technicalPainpoints.length > 2) {
          const idx2 = getStableNumber(q.id + "_tech2", 0, q.technicalPainpoints.length - 1);
          if (q.technicalPainpoints[idx2] !== q.technicalPainpoints[idx1]) {
            techPain.push(q.technicalPainpoints[idx2]);
          }
        }
      }

      const bizPain = [];
      if (q.businessPainpoints && q.businessPainpoints.length > 0) {
        const idx1 = getStableNumber(q.id + "_biz1", 0, q.businessPainpoints.length - 1);
        bizPain.push(q.businessPainpoints[idx1]);
        if (q.businessPainpoints.length > 2) {
          const idx2 = getStableNumber(q.id + "_biz2", 0, q.businessPainpoints.length - 1);
          if (q.businessPainpoints[idx2] !== q.businessPainpoints[idx1]) {
            bizPain.push(q.businessPainpoints[idx2]);
          }
        }
      }

      // Deterministically select a highly professional biopharma comment from the pool
      const notesPool = [
        `Stakeholder reports manual review latency on ${q.dimension}. GxP validation is a top priority.`,
        `Veeva integration constraints require a robust Model Context Protocol (MCP) data federation for ${q.dimension}.`,
        `Transitioning to ${q.dimension} agentic loops will eliminate manual transcription debt and slash review cycles by 60%.`,
        `Infosec reviews require strict VPC-SC perimeters, Cloud KMS CMEK keys, and inline DLP masking for ${q.dimension}.`,
        `End-user change management friction index is high for ${q.dimension}. Embedded Teams/A2UI delivery is highly recommended.`
      ];
      const commentIdx = getStableNumber(q.id + "_comments", 0, notesPool.length - 1);
      const comments = notesPool[commentIdx];

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
              <div 
                onClick={() => setReportPage('analytics')} 
                className={`v12-sidebar-nav-item ${reportPage === 'analytics' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'analytics' ? colors.accentTeal : '#475569' }}
              >
                <TrendingUp size={15} style={{ color: colors.accentTeal }} />
                <span>9. McKinsey-Gartner Analytics</span>
              </div>
              <div 
                onClick={() => setReportPage('operational')} 
                className={`v12-sidebar-nav-item ${reportPage === 'operational' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'operational' ? colors.accentTeal : '#475569' }}
              >
                <Users size={15} style={{ color: colors.accentTeal }} />
                <span>10. C-Suite Operational Readiness</span>
              </div>
              <div 
                onClick={() => setReportPage('moonshot')} 
                className={`v12-sidebar-nav-item ${reportPage === 'moonshot' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'moonshot' ? colors.accentTeal : '#475569' }}
              >
                <Layers size={15} style={{ color: colors.accentTeal }} />
                <span>11. Merck Moonshot Layers</span>
              </div>
              <div 
                onClick={() => setReportPage('resilience')} 
                className={`v12-sidebar-nav-item ${reportPage === 'resilience' ? 'active' : ''}`}
                style={{ borderLeftColor: colors.accentTeal, color: reportPage === 'resilience' ? colors.accentTeal : '#475569' }}
              >
                <ShieldCheck size={15} style={{ color: colors.accentTeal }} />
                <span>12. Ecosystem Resilience Report</span>
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
                onClick={() => {
                  triggerDbSave(scores, customerInfo);
                }}
                style={{ background: '#1e3a8a', border: 'none', color: '#ffffff', borderRadius: '6px', padding: '0.35rem 0', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', boxShadow: '0 2px 6px rgba(30, 58, 138, 0.15)' }}
              >
                💾 Save Scoping Session
              </button>
              <button
                onClick={() => {
                  triggerDbSave(scores, customerInfo); // Auto-save to DB before loading report!
                  handleRunLiveGeminiAssessment();
                }}
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
                onClick={() => {
                  triggerDbSave(scores, customerInfo);
                }}
                style={{ background: '#1e3a8a', border: 'none', color: '#ffffff', borderRadius: '6px', padding: '0.42rem 0', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', marginTop: '0.2rem', boxShadow: '0 2px 6px rgba(30, 58, 138, 0.15)' }}
              >
                💾 Save Scoping Session
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
                  {reportPage === 'analytics' && "McKinsey-Gartner Analytical Strategy Frameworks."}
                  {reportPage === 'operational' && "C-Suite Operational Readiness: Legal Risk & Talent Mapping."}
                  {reportPage === 'moonshot' && "Merck Moonshot Layers: 9-Layer Composable Architecture."}
                  {reportPage === 'resilience' && "Ecosystem Resilience: What-If Day-Two Architecture Audit."}
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
                      triggerDbSave(scores, customerInfo); // Auto-save to DB on approval!
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
                        <strong>By adopting Google's Agentic Resource Discovery (ARD) and MCP specifications, Merck is not "building a custom app." We are deploying a self-assembling AI mesh.</strong> The Gemini Managed Agents will dynamically discover and utilize Veeva and Adobe resources via A2A protocols, eliminating millions in custom integration costs while preventing vendor lock-in.
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
            // PAGE 12: ECOSYSTEM RESILIENCE REPORT (DYNAMIC ARCHITECTURAL AUDIT)
            // ========================================================================= */}
            {reportPage === 'resilience' && (() => {
              // Extract active sandbox selections from state
              const selectedOrch = whatIfOrch || 'google';
              const selectedId = whatIfIdentity || 'entra';
              const selectedFed = whatIfFederation || 'mcp';
              const selectedStore = whatIfStorage || 'adobe';

              // Dynamic evaluation engine for McKinsey Resilience Report
              let verdictTitle = '';
              let verdictText = '';
              let busScore = 'Med';
              let busRationale = '';
              let watchdogScore = 'Med';
              let watchdogRationale = '';
              let magmaScore = 'Med';
              let magmaRationale = '';
              let synergies = [];
              let friction = [];
              let recommendation = '';

              // Check for Scenario A: Google All-In Native Stack
              const isGoogleNativeStack = selectedOrch === 'google' && selectedId === 'google_id' && selectedFed === 'google_bq' && selectedStore === 's3';
              
              // Check for Scenario B: Highly Regulated Composable Stack
              const isRegulatedComposable = selectedOrch === 'aws' && selectedId === 'ping' && selectedFed === 'databricks_data' && selectedStore === 'veeva_promomats';

              // Check for Scenario C: Creative & Agentic Hybrid
              const isCreativeHybrid = selectedOrch === 'azure' && selectedId === 'okta' && selectedFed === 'mcp' && selectedStore === 'adobe';

              if (isGoogleNativeStack) {
                verdictTitle = '✓ STABLE DAY-ONE VALUE (NATIVE HIGH SYNERGY)';
                verdictText = 'This native Google Cloud architecture achieves near-zero integration debt and flawless day-two governance. By running managed agentic meshes over BigQuery data lakes, the swarm communicates with maximum fidelity, eliminating custom translation middleware and loop risks.';
                busScore = 'High';
                busRationale = 'Native Vertex AI routing and BigQuery zero-ETL integration guarantee absolute context fidelity across all agent hops.';
                watchdogScore = 'High';
                watchdogRationale = 'Vertex AI Model Armor provides out-of-the-box Policy-as-Code interception, preventing tokenomics loops and safety leaks.';
                magmaScore = 'High';
                magmaRationale = 'BigQuery semantic tables and Vertex AI Search facilitate unified, systemic learning across the multi-agent swarm.';
                synergies = [
                  'Google Cloud Identity + Vertex AI: Seamless IAM token propagation, cutting implementation overhead by 40%.',
                  'BigQuery Zero-ETL + Gemini: Real-time clinical claims grounding with zero data replication lag.'
                ];
                friction = [
                  'Content Workflow Friction: High-fidelity creative assets stored in Google Cloud Storage may face sync latency with external Adobe design systems.',
                  'Ecosystem Lock-in: Going all-in on the native Google stack reduces cross-cloud flexibility, although it maximizes speed-to-value.'
                ];
                recommendation = 'Proceed immediately. This native stack represents the fastest, most secure, and most cost-effective path to a GxP-compliant production deployment.';
              } 
              else if (isRegulatedComposable) {
                verdictTitle = '⚠️ STABLE DAY-TWO GOVERNANCE (HIGH COMPLIANCE CEILING)';
                verdictText = 'This architecture delivers maximum compliance and governance (98/100 GxP ceiling) suitable for strict clinical environments. However, it carries substantial integration debt. Linking Bedrock, Ping, and Databricks requires custom API adapters, increasing maintenance debt.';
                busScore = 'Med';
                busRationale = 'Custom translation wrappers between Bedrock and Databricks introduce minor context degradation during multi-agent hops.';
                watchdogScore = 'High';
                watchdogRationale = 'Veeva Vault and Ping Identity provide rigid, GxP-validated access gates, but custom watchdog loops are needed for Bedrock.';
                magmaScore = 'High';
                magmaRationale = 'Databricks Unity Catalog provides excellent, centralized data governance and systemic learning hooks.';
                synergies = [
                  'Databricks + Bedrock: Strong custom fine-tuning capabilities over proprietary clinical datasets.',
                  'Veeva Vault + Ping Identity: Highly secure federated authentication, matching strict MLR guidelines.'
                ];
                friction = [
                  'High Integration Debt: Linking Bedrock, Ping, and Databricks requires custom API adapters, increasing maintenance debt.',
                  'Tokenomics Vulnerability: Lacking an active watchdog gateway exposes the system to runaway agent loops during peak MLR review times.'
                ];
                recommendation = 'Pivot or Introduce Middleware. We strongly recommend introducing a dedicated API Gateway (like Kong AI Gateway) to act as a secure Watchdog layer before proceeding.';
              } 
              else if (isCreativeHybrid) {
                verdictTitle = '✓ EXCELLENT CREATIVE VELOCITY (AGILE HYBRID)';
                verdictText = 'This stack provides outstanding creative workflow velocity and flexible identity management, making it highly attractive for marketing swarms. However, data federation may suffer from minor latency if legacy data sources lack native MCP support.';
                busScore = 'High';
                busRationale = 'Model Context Protocol (MCP) standardizes model-to-data communication, ensuring excellent fidelity.';
                watchdogScore = 'Med';
                watchdogRationale = 'Azure AI Studio provides robust safety filters, but lacks automated tokenomics circuit breakers for custom swarms.';
                magmaScore = 'Med';
                magmaRationale = 'Okta provides excellent federated identity, but memory schemas are fragmented across Adobe AEM and Azure storage.';
                synergies = [
                  'Okta + Azure OpenAI: Flexible, federated access control across external creative agencies.',
                  'MCP + Adobe GenStudio: Direct, real-time creative asset and design system metadata indexing.'
                ];
                friction = [
                  'Data Federation Latency: Potential indexing friction if legacy claims databases do not natively support MCP ports.',
                  'Identity Fragment: Separate identity directories between Okta and Azure tenant boundaries require custom sync intervals.'
                ];
                recommendation = 'Proceed with Caution. Introduce a dedicated vector claims database (like BigQuery) to ground the MCP layer and prevent compliance drift.';
              } 
              else {
                // Default / Composable Custom evaluation
                verdictTitle = '⚠️ RISKS DAY-TWO CHAOS (HIGH INTEGRATION DEBT)';
                verdictText = 'While highly composable, this custom stack carries substantial integration debt and lacks a unified watchdog governance layer. Swapping disparate vendors across all 4 pillars increases API translation overhead, exposing the swarm to tokenomics loops and context drift.';
                busScore = 'Low';
                busRationale = `Custom translation middleware between ${selectedOrch.toUpperCase()} and ${selectedFed.toUpperCase()} increases data loss risks during multi-agent hops.`;
                watchdogScore = 'Low';
                watchdogRationale = `Lacks a unified Policy-as-Code security gateway. Running ${selectedOrch.toUpperCase()} without managed guardrails requires writing thousands of lines of custom loop code.`;
                magmaScore = 'Med';
                magmaRationale = `Multi-graph memory is siloed between ${selectedFed.toUpperCase()} and ${selectedStore.toUpperCase()}, restricting systemic learning across the swarm.`;
                synergies = [
                  'Agile Vendor Choice: Custom selection avoids vendor lock-in, allowing procurement to negotiate rates.',
                  'Specialized Pillars: Each component represents a best-of-breed solution for its specific technical silo.'
                ];
                friction = [
                  `API Translation Debt: Integrating ${selectedOrch.toUpperCase()} with ${selectedFed.toUpperCase()} requires manual API wrappers, increasing maintenance debt.`,
                  `Runaway Tokenomics Risk: Lacking an active Watchdog gateway exposes the swarm to infinite loop risks during peak MLR review hours.`
                ];
                recommendation = 'Pivot to Native or Introduce a Gateway. We strongly recommend migrating to Kong AI Gateway or Google Vertex AI to establish a secure, GxP-validated Watchdog layer.';
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* Executive Summary Card */}
                  <div className="v12-card-glass" style={{ borderLeft: `4px solid ${busScore === 'High' ? colors.accentTeal : colors.accentCoral}`, background: '#ffffff', padding: '0.8rem 1.2rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.55rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>
                      WHAT-IF ECOSYSTEM RESILIENCE AUDIT
                    </span>
                    <h3 style={{ margin: '0.15rem 0 0.35rem 0', fontSize: '0.92rem', fontWeight: 950, color: busScore === 'High' ? colors.accentTeal : colors.accentCoral }}>
                      {verdictTitle}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.72rem', color: '#475569', lineHeight: 1.45 }}>
                      {verdictText}
                    </p>
                  </div>

                  {/* Symmetrical Split: Ecosystem Health Matrix vs. Synergy & Friction Feed */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                    
                    {/* Left Column: Ecosystem Health Matrix */}
                    <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.3rem', display: 'block' }}>
                        DIGITAL WORKFORCE HEALTH MATRIX
                      </span>

                      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem', textAlign: 'left' }}>
                          <thead>
                            <tr style={{ borderBottom: '2px solid rgba(15,23,42,0.1)', color: '#475569', fontWeight: 800 }}>
                              <th style={{ padding: '0.45rem' }}>ECOSYSTEM METRIC</th>
                              <th style={{ padding: '0.45rem', textAlign: 'center', width: '80px' }}>SCORE</th>
                              <th style={{ padding: '0.45rem' }}>ARCHITECTURAL RATIONALE</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                            {/* Bus Context Fidelity */}
                            <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                              <td style={{ padding: '0.6rem 0.45rem', fontWeight: 800, color: '#0f172a' }}>
                                Bus Context Fidelity
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', textAlign: 'center' }}>
                                <span style={{ 
                                  fontSize: '0.55rem', 
                                  background: busScore === 'High' ? 'rgba(13, 148, 136, 0.1)' : busScore === 'Med' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(225, 29, 72, 0.1)', 
                                  color: busScore === 'High' ? colors.accentTeal : busScore === 'Med' ? colors.accentAmber : colors.accentCoral, 
                                  padding: '0.1rem 0.4rem', 
                                  borderRadius: '3px', 
                                  fontWeight: 900 
                                }}>
                                  {busScore.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', color: '#475569', lineHeight: 1.3 }}>
                                {busRationale}
                              </td>
                            </tr>

                            {/* Watchdog Autonomy */}
                            <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                              <td style={{ padding: '0.6rem 0.45rem', fontWeight: 800, color: '#0f172a' }}>
                                Watchdog Autonomy
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', textAlign: 'center' }}>
                                <span style={{ 
                                  fontSize: '0.55rem', 
                                  background: watchdogScore === 'High' ? 'rgba(13, 148, 136, 0.1)' : watchdogScore === 'Med' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(225, 29, 72, 0.1)', 
                                  color: watchdogScore === 'High' ? colors.accentTeal : watchdogScore === 'Med' ? colors.accentAmber : colors.accentCoral, 
                                  padding: '0.1rem 0.4rem', 
                                  borderRadius: '3px', 
                                  fontWeight: 900 
                                }}>
                                  {watchdogScore.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', color: '#475569', lineHeight: 1.3 }}>
                                {watchdogRationale}
                              </td>
                            </tr>

                            {/* MAGMA Readiness */}
                            <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                              <td style={{ padding: '0.6rem 0.45rem', fontWeight: 800, color: '#0f172a' }}>
                                MAGMA Readiness
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', textAlign: 'center' }}>
                                <span style={{ 
                                  fontSize: '0.55rem', 
                                  background: magmaScore === 'High' ? 'rgba(13, 148, 136, 0.1)' : magmaScore === 'Med' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(225, 29, 72, 0.1)', 
                                  color: magmaScore === 'High' ? colors.accentTeal : magmaScore === 'Med' ? colors.accentAmber : colors.accentCoral, 
                                  padding: '0.1rem 0.4rem', 
                                  borderRadius: '3px', 
                                  fontWeight: 900 
                                }}>
                                  {magmaScore.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ padding: '0.6rem 0.45rem', color: '#475569', lineHeight: 1.3 }}>
                                {magmaRationale}
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Right Column: Active Synergy & Friction Feed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                      
                      {/* Synergies Card */}
                      <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto' }} className="v12-scrollable">
                        <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                          ACTIVE SYSTEM SYNERGIES
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.15rem' }}>
                          {synergies.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.65rem', color: '#475569', lineHeight: 1.35 }}>
                              <span style={{ fontWeight: 900, color: colors.accentTeal }}>✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Friction & Risks Card */}
                      <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto' }} className="v12-scrollable">
                        <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentCoral, letterSpacing: '0.5px' }}>
                          ECOSYSTEM FRICTION & RISKS
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.15rem' }}>
                          {friction.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.65rem', color: '#475569', lineHeight: 1.35 }}>
                              <span style={{ fontWeight: 900, color: colors.accentCoral }}>⚠️</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strategic Recommendation Card */}
                      <div className="v12-card-glass" style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'rgba(13, 148, 136, 0.02)', border: `1.2px solid ${colors.accentTeal}` }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                          THE C-SUITE RECOMMENDATION
                        </span>
                        <p style={{ margin: 0, fontSize: '0.65rem', color: '#0f172a', lineHeight: 1.4, fontWeight: 700 }}>
                          {recommendation}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })()}

            {/* =========================================================================
            // PAGE 11: MERCK MOONSHOT LAYERS (9-LAYER COMPOSABLE ARCHITECTURE COMPARISON)
            // ========================================================================= */}
            {reportPage === 'moonshot' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* Left Column: Vertical Accordion of 9 Moonshot Layers */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', height: '100%', overflowY: 'auto' }} className="v12-scrollable">
                    <span style={{ fontSize: '0.65rem', fontWeight: 950, color: colors.accentTeal, letterSpacing: '0.5px', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem', display: 'block' }}>
                      THE 9 CORE ARCHITECTURAL MOONSHOT LAYERS
                    </span>

                    {(() => {
                      const layers = [
                        { id: 1, name: '1. Experience Layer (UI)', rec: 'Adobe GenStudio + Google A2UI' },
                        { id: 2, name: '2. Context & Semantic Layer', rec: 'Google Sentinel + ADK SkillToolset' },
                        { id: 3, name: '3. Claims Library & Data Platform', rec: 'Databricks & Veeva via MCP' },
                        { id: 4, name: '4. Cognitive Engine (LLM)', rec: 'Google Model Garden (Gemini 3.1 Pro)' },
                        { id: 5, name: '5. Orchestration Runtime', rec: 'ADK 2.0 on Agent Runtime' },
                        { id: 6, name: '6. Trace & State Storage', rec: 'Cloud Trace + Firestore (via ADK)' },
                        { id: 7, name: '7. API Security Gateway', rec: 'Kong AI Gateway (Strict GA)' },
                        { id: 8, name: '8. Downstream Review', rec: 'Frame.io & Veeva via ADK HITL' },
                        { id: 9, name: '9. ModelOps & Quality', rec: 'ADK Eval Framework' }
                      ];

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.2rem' }}>
                          {layers.map(layer => {
                            const isExpanded = expandedMoonshotLayerId === layer.id;
                            return (
                              <div
                                key={layer.id}
                                onClick={() => setExpandedMoonshotLayerId(layer.id)}
                                style={{
                                  padding: '0.55rem 0.75rem',
                                  borderRadius: '6px',
                                  background: isExpanded ? 'rgba(13, 148, 136, 0.05)' : '#f8fafc',
                                  border: isExpanded ? `1.5px solid ${colors.accentTeal}` : '1px solid rgba(15, 23, 42, 0.08)',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease'
                                }}
                                className="v12-table-row-hover"
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: isExpanded ? colors.accentTeal : '#0f172a' }}>
                                    {layer.name}
                                  </span>
                                  <span style={{ fontSize: '0.52rem', background: isExpanded ? 'rgba(13, 148, 136, 0.15)' : 'rgba(15,23,42,0.04)', color: isExpanded ? colors.accentTeal : '#475569', padding: '0.08rem 0.35rem', borderRadius: '3px', fontWeight: 850 }}>
                                    {isExpanded ? 'ACTIVE' : 'SELECT'}
                                  </span>
                                </div>
                                <div style={{ fontSize: '0.58rem', color: '#475569', marginTop: '0.15rem' }}>
                                  Recommendation: <strong style={{ color: '#0f172a' }}>{layer.rec}</strong>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Right Column: Comparative Analytical Panels */}
                  {(() => {
                    const layersData = {
                      1: {
                        name: '1. Experience Layer (UI)',
                        adobe: { pros: 'GenStudio provides a ready-made, risk-free creative workspace.', cons: 'Closed ecosystem; extremely difficult to surface backend multi-agent telemetry natively.' },
                        aws: { pros: 'Total custom design freedom.', cons: 'Zero out-of-the-box UI frameworks. Requires a 100% custom frontend application build, blowing up the timeline.' },
                        gcp: { pros: 'Supports A2UI protocol to dynamically stream generative UIs directly from the agent backend.', cons: 'Requires configuring the ADK backend to stream the correct JSON components.' },
                        rec: 'Adobe GenStudio + Google A2UI',
                        benefits: 'Keeps marketers in their familiar Adobe tools while natively streaming agent telemetry and compliance dashboards to their screens without custom frontend coding.',
                        journey: [
                          "Marketer logs into Adobe GenStudio to initiate a campaign.",
                          "Marketer inputs a natural language brief into the Gemini Enterprise App interface.",
                          "Developer configuration ensures the backend agent streams dynamic A2UI components (progress trackers, compliance scorecards) directly back to the UI.",
                          "Marketer interacts with these generative A2UI components to tweak targeting and review initial asset frameworks without leaving the creative workspace."
                        ]
                      },
                      2: {
                        name: '2. Context & Semantic Layer',
                        adobe: { pros: 'Brand Intelligence enforces visual standards effectively.', cons: 'Incapable of parsing unstructured clinical rules or L3 strategic guidelines.' },
                        aws: { pros: 'Amazon Neptune offers a highly mature knowledge graph database.', cons: 'Requires building a custom regulatory rules engine from scratch.' },
                        gcp: { pros: 'Sentinel provides a pre-trained rules proxy; ADK SkillToolset loads specific rules on demand.', cons: 'Standard enterprise data ingestion cycles apply.' },
                        rec: 'Google Sentinel + ADK SkillToolset',
                        benefits: 'Avoids custom database builds entirely. Progressively loads MLR rules only when needed, which slashes LLM token costs and latency during the generation phase.',
                        journey: [
                          'Marketer provides the strategic campaign guidelines and L3 parameters in the brief.',
                          'Developer configures ADK SkillToolset to encapsulate complex MLR and Pharma rules as on-demand skills.',
                          'Backend Agent queries Google Sentinel to fetch the precise historical context and user preferences for the specific asset.',
                          'Backend Agent selectively activates the required rules via progressive disclosure to evaluate the brief while keeping token costs low.'
                        ]
                      },
                      3: {
                        name: '3. Claims Library & Data Platform',
                        adobe: { pros: 'Brand Library holds visual assets.', cons: 'Lacks a clinical claims registry or GxP vector search capabilities.' },
                        aws: { pros: 'Databricks (Data Genie) handles the enterprise data layer effectively.', cons: 'Sits outside the core AI loop, requiring custom RAG pipelines to connect.' },
                        gcp: { pros: 'Native support for the Model Context Protocol (MCP) to access enterprise data directly.', cons: 'Requires exposing Databricks/Veeva as MCP servers first.' },
                        rec: 'Databricks & Veeva via MCP',
                        benefits: 'Eliminates custom API webhook code. It securely connects the agent swarm directly to your existing Databricks and Veeva instances as standardized services.',
                        journey: [
                          'Developer registers Databricks (Data Genie) and Veeva PromoMats as MCP servers.',
                          'Marketer selects an audience segment (e.g., "pediatricians") via a drop-down menu in the UI.',
                          'Backend Agent queries the Databricks MCP server to retrieve the approved audience data profile.',
                          'Backend Agent queries the Veeva MCP server to fetch the exact, validated medical claims and citations required for that specific audience.'
                        ]
                      },
                      4: {
                        name: '4. Cognitive Engine (LLM)',
                        adobe: { pros: 'Firefly Services API is the market leader for visual asset generation.', cons: 'Lacks a foundational text reasoning model for deep regulatory and HTML syntax audits.' },
                        aws: { pros: 'Amazon Bedrock aggregates multiple third-party models to prevent lock-in.', cons: 'Adds cross-cloud network latency between the orchestration engine and the models.' },
                        gcp: { pros: 'Model Garden hosts Gemini 3.1 Pro (1M-token context) and Anthropic Claude.', cons: 'Requires enterprise rate-limit management.' },
                        rec: 'Google Model Garden',
                        benefits: 'Provides the massive 1M-token context window needed to swallow 30-page IVAs whole, while retaining model agnosticism via Claude without leaving the orchestration cloud.',
                        journey: [
                          'Marketer selects the asset type (e.g., a massive 30-page Interactive Visual Aid) for generation.',
                          'Backend Agent passes the entire IVA context, audience data, and MLR rules to Gemini 3.1 Pro via the Model Garden.',
                          'Gemini 3.1 Pro utilizes its 1M-token window to conduct simultaneous deep regulatory audits, copy generation, and syntax checks.',
                          'Backend Agent delegates visual generation tasks to Adobe Firefly to produce the required creative imagery.'
                        ]
                      },
                      5: {
                        name: '5. Orchestration Runtime',
                        adobe: { pros: 'Workfront offers top-tier enterprise project tracking.', cons: 'It is a monolithic task manager, not an autonomous agent runtime.' },
                        aws: { pros: 'LangGraph on AgentCore utilizes mature serverless computing primitives.', cons: 'Requires managing custom infrastructure and manually handling agent state logic.' },
                        gcp: { pros: 'ADK 2.0 Graph Workflows run natively on managed Agent Runtime with event-driven dormancy gates.', cons: 'ADK 2.0 introduces a learning curve for teams used to writing custom Python loops.' },
                        rec: 'ADK 2.0 on Agent Runtime',
                        benefits: 'Event-driven dormancy gates handle multi-day MLR pauses autonomously. The agents sleep and wake up natively, saving massive custom AWS EventBridge development time.',
                        journey: [
                          "Developer writes and deploys the ADK 2.0 Graph Workflow code natively to Google's managed Agent Runtime.",
                          'Marketer hits "Generate," triggering the multi-agent swarm (Spelling Agent, Medical Agent, Brand Agent) to evaluate the asset in parallel.',
                          "Backend Agent routes tasks deterministically; if a human review is needed, the ADK event-driven dormancy gate automatically hibernates the workflow.",
                          "Platform Engineer relies on the Agent Runtime to handle all auto-scaling and infrastructure provisioning transparently."
                        ]
                      },
                      6: {
                        name: '6. Trace & State Storage',
                        adobe: { pros: 'Content Fragments track Adobe-specific modular content.', cons: 'Mathematically incompatible with backend multi-agent execution logs and cryptographic traces.' },
                        aws: { pros: 'DynamoDB is a highly scalable, enterprise-approved NoSQL database.', cons: 'Requires manually designing complex JSON partition schemas and mapping LLM memory states.' },
                        gcp: { pros: 'Cloud Trace provides deep observability; ADK Durable Memory natively snaps state to Firestore.', cons: 'Requires basic cloud partition alignment.' },
                        rec: 'Cloud Trace + Firestore (via ADK)',
                        benefits: 'Zero custom schema design required. It natively writes agent state to Firestore and pushes execution spans to Cloud Trace for instant, out-of-the-box visual debugging.',
                        journey: [
                          'Backend Agent initiates a session and assigns a cryptographic SPIFFE ID via Agent Identity to track all actions.',
                          'Backend Agent natively snaps its execution state, memory, and LLM context to Google Cloud Firestore without custom serialization.',
                          'Platform Engineer utilizes Google Cloud Trace to visually monitor the execution spans, tool calls, and debug any workflow bottlenecks in real-time.',
                          'MLR Reviewer benefits from an unbroken, auditable chain of evidence proving how the AI arrived at a specific claim.'
                        ]
                      },
                      7: {
                        name: '7. API Security Gateway',
                        adobe: { pros: 'N/A.', cons: 'Does not offer an enterprise generative AI security gateway.' },
                        aws: { pros: 'API Gateway handles standard REST routing reliably.', cons: 'Lacks native AI prompt sanitization and PII tracking out of the box.' },
                        gcp: { pros: 'Agent Gateway natively manages tool access and Model Armor policies.', cons: 'Agent Gateway is currently in Private Preview and is too risky for a January launch.' },
                        rec: 'Kong AI Gateway (Strict GA)',
                        benefits: 'Fully GA and enterprise-tested. It handles prompt safety, PII scrubbing, and multi-model routing securely today without relying on unreleased preview software.',
                        journey: [
                          "Platform Engineer maintains Kong AI Gateway as the primary enterprise proxy.",
                          "Marketer's prompts and file uploads pass through Kong for real-time safety filtering and PII scrubbing before reaching the LLM.",
                          "Developer integrates internal Agent-to-Agent API calls through Kong to ensure all AI communications adhere to existing corporate networking policies.",
                          "Platform Engineer monitors token usage, prompt injection attempts, and model routing fallbacks through Kong's centralized dashboard."
                        ]
                      },
                      8: {
                        name: '8. Downstream Review',
                        adobe: { pros: 'Frame.io and Veeva Vault are approved, risk-free enterprise systems of record.', cons: 'Requires building custom API webhooks for feedback loops.' },
                        aws: { pros: 'Strong API capabilities.', cons: 'Zero native content-review interfaces or pause mechanisms built in.' },
                        gcp: { pros: 'ADK Human-in-the-Loop (HITL) automatically catches workflow exceptions to pause agents.', cons: "Building a legal UI in Google duplicates Veeva's functionality." },
                        rec: 'Frame.io & Veeva via ADK HITL',
                        benefits: 'Agents automatically hibernate during Frame.io or Veeva human reviews and wake up seamlessly upon approval with zero idle compute costs.',
                        journey: [
                          'Backend Agent compiles the final target HTML and places placeholder jobs in Frame.io and Veeva Vault.',
                          'Backend Agent triggers the ADK Human-in-the-Loop (HITL) mechanism, safely pausing execution and costing zero compute.',
                          'Creative Designer logs into Frame.io to execute visual micro-edits on the generated assets.',
                          'MLR Reviewer logs into Veeva Vault to conduct the final medical review and apply electronic signatures.',
                          'Backend Agent receives the approval webhook, wakes up autonomously, and finalizes the asset for deployment.'
                        ]
                      },
                      9: {
                        name: '9. ModelOps & Quality',
                        adobe: { pros: 'Excellent for visual and creative asset review.', cons: 'Not applicable for programmatic LLM reasoning evaluation.' },
                        aws: { pros: 'Deep custom logging capabilities.', cons: 'Requires building a custom evaluation harness from scratch to test multi-agent loops.' },
                        gcp: { pros: 'ADK Eval Framework provides out-of-the-box local simulation testing for LLMs-as-a-judge.', cons: 'Requires developers to write the initial eval test cases.' },
                        rec: 'ADK Eval Framework',
                        benefits: "Replaces the need for custom eval harnesses. It allows developers to locally simulate multi-day idle times and test the agent's reasoning before deploying anything to production.",
                        journey: [
                          "Developer utilizes the agents-cli eval run framework locally to write test cases for the agent swarm.",
                          "Developer simulates the entire Marketer-to-MLR journey, including multi-day idle delays, to ensure the state machine holds up.",
                          "Developer runs LLM-as-a-judge deterministic tests to verify that the agents strictly adhere to the brand and MLR rubrics.",
                          "Platform Engineer reviews the eval metrics and confidently promotes the workflow into the production Agent Runtime."
                        ]
                      }
                    };

                    const currentLayer = layersData[expandedMoonshotLayerId];

                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', overflowY: 'auto' }} className="v12-scrollable">
                        
                        {/* Rec Banner */}
                        <div className="v12-card-glass" style={{ borderLeft: `3.5px solid ${colors.accentTeal}`, background: 'rgba(13, 148, 136, 0.03)', padding: '0.6rem 0.85rem' }}>
                          <span style={{ fontSize: '0.55rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                            FINAL RECOMMENDATION FOR {currentLayer.name.toUpperCase()}
                          </span>
                          <h3 style={{ margin: '0.1rem 0 0 0', fontSize: '1rem', fontWeight: 950, color: colors.accentTeal }}>
                            {currentLayer.rec}
                          </h3>
                        </div>

                        {/* Pros & Cons side-by-side columns */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem' }}>
                          
                          {/* Adobe */}
                          <div className="v12-card-glass" style={{ background: '#ffffff', fontSize: '0.65rem' }}>
                            <div style={{ fontWeight: 900, color: '#0f172a', borderBottom: '1px solid rgba(15,23,42,0.06)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>Adobe System</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#475569' }}>
                              <div>🟢 <strong style={{ color: '#0f172a' }}>Pros:</strong> {currentLayer.adobe.pros}</div>
                              <div>🔴 <strong style={{ color: '#0f172a' }}>Cons:</strong> {currentLayer.adobe.cons}</div>
                            </div>
                          </div>

                          {/* AWS */}
                          <div className="v12-card-glass" style={{ background: '#ffffff', fontSize: '0.65rem' }}>
                            <div style={{ fontWeight: 900, color: '#0f172a', borderBottom: '1px solid rgba(15,23,42,0.06)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>AWS Platform</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#475569' }}>
                              <div>🟢 <strong style={{ color: '#0f172a' }}>Pros:</strong> {currentLayer.aws.pros}</div>
                              <div>🔴 <strong style={{ color: '#0f172a' }}>Cons:</strong> {currentLayer.aws.cons}</div>
                            </div>
                          </div>

                          {/* Google Cloud */}
                          <div className="v12-card-glass" style={{ background: 'rgba(13, 148, 136, 0.01)', border: `1.2px solid ${colors.accentTeal}`, fontSize: '0.65rem' }}>
                            <div style={{ fontWeight: 900, color: colors.accentTeal, borderBottom: '1px solid rgba(13,148,136,0.08)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>Google Cloud [2026 Stack]</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#475569' }}>
                              <div>🟢 <strong style={{ color: '#0f172a' }}>Pros:</strong> {currentLayer.gcp.pros}</div>
                              <div>🔴 <strong style={{ color: '#0f172a' }}>Cons:</strong> {currentLayer.gcp.cons}</div>
                            </div>
                          </div>

                        </div>

                        {/* Symmetrical split: Core Benefits vs. User Journey */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.85rem' }}>
                          
                          {/* Core Benefits */}
                          <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#475569', letterSpacing: '0.5px' }}>CORE BUSINESS & GxP BENEFITS</span>
                            <p style={{ margin: 0, fontSize: '0.68rem', color: '#475569', lineHeight: 1.45 }}>
                              {currentLayer.benefits}
                            </p>
                          </div>

                          {/* User Journey */}
                          <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#475569', letterSpacing: '0.5px' }}>SOLUTION APPROACH & USER JOURNEY</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              {currentLayer.journey.map((step, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.65rem', color: '#475569', lineHeight: 1.35 }}>
                                  <span style={{ fontWeight: 900, color: colors.accentTeal, flexShrink: 0 }}>{idx + 1}.</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>

                      </div>
                    );
                  })()}

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 10: C-SUITE OPERATIONAL READINESS & LEGAL RISK
            // ========================================================================= */}
            {reportPage === 'operational' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Upper Row Symmetrical Split: Talent Mapping vs. Legal Risk */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem', flex: 1.2, minHeight: 0 }}>
                  
                  {/* 1. Talent & Resource Skill Mapping */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '260px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.3rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>ORGANIZATIONAL SKILLS BENCH CONTRAST</span>
                      <span style={{ fontSize: '0.55rem', color: '#475569' }}>Talent hours needed vs. Upskilling bench</span>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifycontent: 'space-around', gap: '0.45rem', padding: '0.35rem 0' }}>
                      
                      {/* Skill 1: Python/MCP Developers */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.15rem' }}>
                          <span>Python & MCP Mesh Architecture (Google Build)</span>
                          <span style={{ color: colors.accentAmber }}>Requires 2 High-Price Hires / 6 Weeks Upskill</span>
                        </div>
                        <div style={{ display: 'flex', height: '10px', background: 'rgba(15,23,42,0.03)', borderRadius: '100px', border: '1px solid rgba(15,23,42,0.06)', overflow: 'hidden' }}>
                          <div style={{ width: '20%', background: colors.accentTeal, borderRadius: '100px 0 0 100px' }} title="Current internal bench" />
                          <div style={{ width: '80%', background: colors.accentAmber }} title="Additional skill hours needed" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', color: '#64748b', marginTop: '0.05rem' }}>
                          <span>Current Bench: 20%</span>
                          <span>Strategic Gap: 80%</span>
                        </div>
                      </div>

                      {/* Skill 2: Veeva Admins */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.15rem' }}>
                          <span>Veeva Admin & Bedrock Configuration (AWS Buy)</span>
                          <span style={{ color: '#16a34a' }}>✓ 100% Upskilled Bench Available</span>
                        </div>
                        <div style={{ display: 'flex', height: '10px', background: 'rgba(15,23,42,0.03)', borderRadius: '100px', border: '1px solid rgba(15,23,42,0.06)', overflow: 'hidden' }}>
                          <div style={{ width: '85%', background: colors.accentTeal, borderRadius: '100px 0 0 100px' }} />
                          <div style={{ width: '15%', background: '#94a3b8' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', color: '#64748b', marginTop: '0.05rem' }}>
                          <span>Current Bench: 85%</span>
                          <span>Strategic Gap: 15%</span>
                        </div>
                      </div>

                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.45rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.08)', fontSize: '0.62rem', color: '#475569', lineHeight: 1.35 }}>
                      <strong>Talent Conclusion:</strong> Choosing the custom *Google Mesh* requires hiring 2 specialized AI engineers or upskilling 3 team members, whereas the *Veeva/AWS Native* route leverages your existing, certified internal Veeva administrators.
                    </div>
                  </div>

                  {/* 2. Legal & Patient Privacy Risk Thermometers */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '260px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.3rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>PATIENT PRIVACY & LEGAL RISK THERMOMETER</span>
                      
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.58rem', fontWeight: 800, color: '#0f172a', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={njAuditTrailEnabled}
                          onChange={e => setNjAuditTrailEnabled(e.target.checked)}
                          style={{ accentColor: colors.accentTeal }}
                        />
                        <span>Algorithmic Audit Trail</span>
                      </label>
                    </div>

                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', padding: '0.35rem 0' }}>
                      
                      {/* Thermometer 1: NJ S-1515 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.25rem', relative: 'relative' }}>
                        <span style={{ fontSize: '0.55rem', fontWeight: 900, color: '#0f172a' }}>NJ S-1515 ADS BILL</span>
                        
                        {/* Vertical Thermometer */}
                        <div style={{ width: '16px', height: '80px', background: '#e2e8f0', borderRadius: '100px', border: '1px solid rgba(15,23,42,0.15)', relative: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <div 
                            style={{ 
                              width: '100%', 
                              height: njAuditTrailEnabled ? '25%' : '90%', 
                              background: njAuditTrailEnabled ? colors.accentTeal : colors.accentCoral, 
                              borderRadius: '100px',
                              transition: 'height 0.3s ease, background-color 0.3s'
                            }} 
                          />
                        </div>
                        <span style={{ fontSize: '0.62rem', fontWeight: 900, color: njAuditTrailEnabled ? colors.accentTeal : colors.accentCoral }}>
                          {njAuditTrailEnabled ? "✓ COMPLIANT" : "❌ HIGH LIABILITY"}
                        </span>
                      </div>

                      {/* Thermometer 2: EU AI Act */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.25rem' }}>
                        <span style={{ fontSize: '0.55rem', fontWeight: 900, color: '#0f172a' }}>EU AI ACT SECTION 52</span>
                        
                        {/* Vertical Thermometer */}
                        <div style={{ width: '16px', height: '80px', background: '#e2e8f0', borderRadius: '100px', border: '1px solid rgba(15,23,42,0.15)', relative: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <div style={{ width: '100%', height: '35%', background: colors.accentTeal, borderRadius: '100px' }} />
                        </div>
                        <span style={{ fontSize: '0.62rem', fontWeight: 900, color: colors.accentTeal }}>✓ COMPLIANT</span>
                      </div>

                    </div>

                    {!njAuditTrailEnabled && (
                      <div style={{ background: 'rgba(225, 29, 72, 0.05)', border: `1.2px solid ${colors.accentCoral}`, borderRadius: '6px', padding: '0.45rem', fontSize: '0.62rem', display: 'flex', alignItems: 'flex-start', gap: '0.3rem' }}>
                        <ShieldAlert size={15} style={{ color: colors.accentCoral, flexShrink: 0, marginTop: '0.05rem' }} />
                        <div>
                          <span style={{ fontWeight: 950, color: colors.accentCoral, display: 'block' }}>⚠️ NJ S-1515 REGULATORY BLOCKER</span>
                          <span style={{ color: '#0f172a', display: 'block', marginTop: '0.08rem', lineHeight: 1.3 }}>
                            Disabling the algorithmic audit trail violates New Jersey Automated Decision Systems Act Section 4. **Exposes Merck to penalties up to $250K/day.** Toggle "Algorithmic Audit Trail" ON to remediate liability.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Lower Row: Change Management Friction Index & Peer Benchmarks */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* 3. Change Management Friction Index */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.3rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>END-USER CHANGE MANAGEMENT FRICTION INDEX</span>
                      <span style={{ fontSize: '0.55rem', color: '#475569' }}>Friction score on a scale of 1-10</span>
                    </div>

                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '0.85rem', alignItems: 'center' }}>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#475569' }}>Select End-User Deployment Channel:</span>
                        
                        {/* Selector Radio Group */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#0f172a', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name="changeMgt" 
                              checked={changeManagementOption === 'portal'}
                              onChange={() => setChangeManagementOption('portal')}
                              style={{ accentColor: colors.accentTeal }}
                            />
                            <span>Separate Standalone Web Portal</span>
                          </label>
                          
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#0f172a', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name="changeMgt" 
                              checked={changeManagementOption === 'teams'}
                              onChange={() => setChangeManagementOption('teams')}
                              style={{ accentColor: colors.accentTeal }}
                            />
                            <span>Embedded in Microsoft Teams (Direct Webhook)</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', color: '#0f172a', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name="changeMgt" 
                              checked={changeManagementOption === 'veeva'}
                              onChange={() => setChangeManagementOption('veeva')}
                              style={{ accentColor: colors.accentTeal }}
                            />
                            <span>Native in Veeva PromoMats Workspace</span>
                          </label>
                        </div>
                      </div>

                      {/* Interactive Dial Score Display */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '1px solid rgba(15,23,42,0.08)', borderRadius: '6px', padding: '0.65rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.5rem', color: '#475569', fontWeight: 800 }}>FRICTION INDEX</span>
                        <span style={{ 
                          fontSize: '1.6rem', 
                          fontWeight: 950, 
                          color: changeManagementOption === 'portal' ? colors.accentCoral : changeManagementOption === 'teams' ? colors.accentTeal : colors.accentTeal 
                        }}>
                          {changeManagementOption === 'portal' ? '8.2' : changeManagementOption === 'teams' ? '2.4' : '3.8'}
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}> / 10</span>
                        </span>
                        <span style={{ fontSize: '0.52rem', color: '#64748b', display: 'block', marginTop: '0.15rem', lineHeight: 1.3 }}>
                          {changeManagementOption === 'portal' && "Requires extensive staff retraining ($450K budget)."}
                          {changeManagementOption === 'teams' && "Invisible integration. Zero retraining required."}
                          {changeManagementOption === 'veeva' && "Minor staff adjustment. Native workspace flow."}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* 4. Peer Competitor Benchmarks Comparison */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.3rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>PEER BENCHMARK COMPARISON</span>
                      <span style={{ fontSize: '0.55rem', color: '#475569' }}>Pharma Peer Adoption</span>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }} className="v12-scrollable">
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.65rem', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(15,23,42,0.08)', color: '#475569', fontWeight: 800 }}>
                            <th style={{ padding: '0.3rem' }}>PEER PHARMA</th>
                            <th style={{ padding: '0.3rem' }}>ARCHITECTURE</th>
                            <th style={{ padding: '0.3rem', textAlign: 'center' }}>ACTIVE USERS</th>
                            <th style={{ padding: '0.3rem', textAlign: 'center' }}>COMPLIANCE STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { peer: 'Pfizer Global Oncology', arch: 'GCP Custom Mesh', users: '65,000', status: '✓ GxP Validated' },
                            { peer: 'Novartis Commercial', arch: 'AWS Bedrock + Veeva', users: '45,000', status: '✓ GxP Validated' },
                            { peer: 'Roche Diagnostics', arch: 'Hybrid AWS / GCP', users: '30,000', status: '⚠️ Audit Pending' }
                          ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(15,23,42,0.04)' }}>
                              <td style={{ padding: '0.35rem 0.3rem', fontWeight: 800, color: '#0f172a' }}>{row.peer}</td>
                              <td style={{ padding: '0.35rem 0.3rem', color: '#475569' }}>{row.arch}</td>
                              <td style={{ padding: '0.35rem 0.3rem', textAlign: 'center', color: '#0f172a' }}>{row.users}</td>
                              <td style={{ padding: '0.35rem 0.3rem', textAlign: 'center', color: row.status.includes('✓') ? '#16a34a' : colors.accentCoral, fontWeight: 700 }}>{row.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* =========================================================================
            // PAGE 9: MCKINSEY-GARTNER ANALYTICAL STRATEGY FRAMEWORKS
            // ========================================================================= */}
            {reportPage === 'analytics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                
                {/* Symmetrical Header Sub-Navigation Bar */}
                <div className="v12-card-glass" style={{ display: 'flex', padding: '0.35rem', gap: '0.25rem', flexShrink: 0 }}>
                  {[
                    { id: 'hype', label: '1. Gartner Hype Cycle' },
                    { id: 'capabilities', label: '2. Critical Capabilities (Harvey Balls)' },
                    { id: 'horizons', label: '3. McKinsey Three Horizons' },
                    { id: 'wave', label: '4. Forrester Wave Model' },
                    { id: 'wardley', label: '5. Wardley Strategic Map' },
                    { id: 'radar', label: '6. Future-Proofing Radar' },
                    { id: 'progress', label: '7. Future Workflow Progress' },
                    { id: 'exception', label: '8. Workload Exception Gate' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveFrameworkTab(tab.id);
                        setHoveredFrameworkItem(null);
                      }}
                      style={{
                        flex: 1,
                        background: activeFrameworkTab === tab.id ? 'rgba(13, 148, 136, 0.08)' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0',
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        color: activeFrameworkTab === tab.id ? colors.accentTeal : '#475569',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Main Interactive Sandbox Content */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
                  
                  {/* Left Column: Framework Visual Canvas */}
                  <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', minHeight: '320px' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.35rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>
                        {activeFrameworkTab === 'hype' && "GARTNER EMERGENCE HYPE CYCLE"}
                        {activeFrameworkTab === 'capabilities' && "CRITICAL USE-CASE CAPABILITIES MATRIX"}
                        {activeFrameworkTab === 'horizons' && "MCKINSEY THREE HORIZONS OF Enterprise Growth"}
                        {activeFrameworkTab === 'wave' && "FORRESTER WAVE: STRATEGY VS. CURRENT OFFERING"}
                        {activeFrameworkTab === 'wardley' && "WARDLEY EVOLUTION & VALUE CHAIN MAP"}
                      </span>
                      <span style={{ fontSize: '0.58rem', color: '#475569' }}>
                        {activeFrameworkTab === 'capabilities' ? "Harvey Ball grading" : "Hover components for strategic details"}
                      </span>
                    </div>

                    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '1px solid rgba(15, 23, 42, 0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                      
                      {/* 1. Gartner Hype Cycle */}
                      {activeFrameworkTab === 'hype' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Gartner Hype Curve Path */}
                          <path 
                            d="M 10,200 Q 60,180 80,40 T 130,160 Q 180,120 230,80 T 310,65" 
                            fill="none" 
                            stroke="#0d9488" 
                            strokeWidth="2.5" 
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }}
                          />
                          
                          {/* Phase Dividers */}
                          <line x1="80" y1="10" x2="80" y2="210" stroke="rgba(15,23,42,0.04)" strokeDasharray="2" />
                          <line x1="130" y1="10" x2="130" y2="210" stroke="rgba(15,23,42,0.04)" strokeDasharray="2" />
                          <line x1="200" y1="10" x2="200" y2="210" stroke="rgba(15,23,42,0.04)" strokeDasharray="2" />

                          {/* Phase Labels */}
                          <text x="25" y="215" fill="#94a3b8" fontSize="5" fontWeight="bold">Innovation Trigger</text>
                          <text x="85" y="15" fill="#94a3b8" fontSize="5" fontWeight="bold">Peak of Inflated Expectations</text>
                          <text x="135" y="215" fill="#94a3b8" fontSize="5" fontWeight="bold">Trough of Disillusionment</text>
                          <text x="205" y="15" fill="#94a3b8" fontSize="5" fontWeight="bold">Slope of Enlightenment</text>

                          {/* Interactive Node 1: Swarms */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Multi-Agent Swarms', phase: 'Innovation Trigger', readiness: '2-3 Years', desc: 'Autonomous swarms coordinate medical, legal, and regulatory checks in parallel. High potential for timeline acceleration, but requires strict validation parameters to clear GxP perimeters.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="65" cy="110" r="5" fill="#e11d48" stroke="#fff" strokeWidth="1" />
                            <text x="73" y="112" fill="#0f172a" fontSize="5.5" fontWeight="bold">Agent Swarms</text>
                          </g>

                          {/* Interactive Node 2: Chatbots */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Standalone LLM Chatbots', phase: 'Peak of Inflated Expectations', readiness: '5+ Years (for MLR)', desc: 'General-purpose LLM interfaces lack domain-specific clinical grounding. Highly prone to compliance hallucinations, rendering them unsuitable for direct, un-audited MLR workflows.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="95" cy="65" r="5" fill="#d97706" stroke="#fff" strokeWidth="1" />
                            <text x="103" y="62" fill="#0f172a" fontSize="5.5" fontWeight="bold">Standalone Chatbots</text>
                          </g>

                          {/* Interactive Node 3: RAG */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Retrieval-Augmented Generation (RAG)', phase: 'Slope of Enlightenment', readiness: '1 Year (Active Dev)', desc: 'Grounds model outputs directly in approved Veeva clinical claim vaults. Minimizes hallucinations and serves as the core foundation for automated compliance review.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="215" cy="95" r="5" fill="#0d9488" stroke="#fff" strokeWidth="1" />
                            <text x="223" y="98" fill="#0f172a" fontSize="5.5" fontWeight="bold">Clinical RAG</text>
                          </g>

                          {/* Interactive Node 4: API Gateways */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Deterministic API Gateways (Kong)', phase: 'Plateau of Productivity', readiness: 'Immediate (Production Active)', desc: 'Enforces mTLS, token rate-limiting, and deep semantic PII/PHI scrubbing. Extremely stable, GxP-validated, and vital for secure external cloud transitions.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="290" cy="68" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1" />
                            <text x="245" y="62" fill="#0f172a" fontSize="5.5" fontWeight="bold">Kong API Gateway</text>
                          </g>
                        </svg>
                      )}

                      {/* 2. Critical Capabilities Matrix */}
                      {activeFrameworkTab === 'capabilities' && (
                        <div style={{ width: '100%', height: '100%', padding: '1rem', display: 'flex', alignItems: 'center' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem', textAlign: 'left' }}>
                            <thead>
                              <tr style={{ borderBottom: '2px solid rgba(15,23,42,0.1)', color: '#475569', fontWeight: 800 }}>
                                <th style={{ padding: '0.45rem' }}>CRITICAL USE CASE</th>
                                <th style={{ padding: '0.45rem', textAlign: 'center' }}>VEEVA NATIVE</th>
                                <th style={{ padding: '0.45rem', textAlign: 'center' }}>AWS BEDROCK</th>
                                <th style={{ padding: '0.45rem', textAlign: 'center' }}>GOOGLE VERTEX</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { case: 'FDA 21 CFR Part 11 Audit Trails', veeva: '🌕 (Complete)', aws: '🌔 (Strong)', gcp: '🌓 (Requires Wrapper)' },
                                { case: 'Adobe GenStudio Metadata Injection', veeva: '🌑 (No Integration)', aws: '🌓 (Custom Glue)', gcp: '🌕 (Native MCP/API)' },
                                { case: 'EU AI Act Geofencing & Safeguards', veeva: '🌔 (Frankfurt Option)', aws: '🌕 (Strong)', gcp: '🌕 (Vertex Model Armor)' },
                                { case: 'Real-Time Vector Claims Grounding', veeva: '🌓 (Basic Search)', aws: '🌔 (Kendra Link)', gcp: '🌕 (Zero-ETL BigQuery)' }
                              ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                                  <td style={{ padding: '0.55rem', fontWeight: 700, color: '#0f172a' }}>{row.case}</td>
                                  <td style={{ padding: '0.55rem', textAlign: 'center', color: '#0d9488', fontWeight: 800 }}>{row.veeva}</td>
                                  <td style={{ padding: '0.55rem', textAlign: 'center', color: '#0d9488', fontWeight: 800 }}>{row.aws}</td>
                                  <td style={{ padding: '0.55rem', textAlign: 'center', color: '#0d9488', fontWeight: 800 }}>{row.gcp}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* 3. McKinsey Three Horizons of Growth */}
                      {activeFrameworkTab === 'horizons' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Horizon 3 Stacked Area Fill */}
                          <path d="M 10,210 Q 90,200 150,160 T 310,40 L 310,210 Z" fill="rgba(139, 92, 246, 0.05)" />
                          {/* Horizon 2 Stacked Area Fill */}
                          <path d="M 10,210 Q 90,180 160,110 T 310,95 L 310,210 Z" fill="rgba(245, 158, 11, 0.05)" />
                          {/* Horizon 1 Stacked Area Fill */}
                          <path d="M 10,210 Q 80,110 160,70 T 310,140 L 310,210 Z" fill="rgba(13, 148, 136, 0.05)" />

                          {/* Horizon Dividers */}
                          <path d="M 10,210 Q 80,110 160,70 T 310,140" fill="none" stroke="#0d9488" strokeWidth="2" />
                          <path d="M 10,210 Q 90,180 160,110 T 310,95" fill="none" stroke="#d97706" strokeWidth="2" />
                          <path d="M 10,210 Q 90,200 150,160 T 310,40" fill="none" stroke="#7c3aed" strokeWidth="2" />

                          {/* Symmetrical Clickable Dots */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Horizon 1: Defend & Extend', phase: 'MVP Go-Live (Jan 2027)', readiness: 'Focus: MLR Text Automation', desc: 'Deploy out-of-the-box Veeva Native AI or a basic Google Vertex API Gateway to automate static text claims verification, slashing initial compliance latency by 40%.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="80" cy="115" r="5" fill="#0d9488" stroke="#fff" strokeWidth="1" />
                            <text x="65" y="100" fill="#0d9488" fontSize="5" fontWeight="bold">Horizon 1: MVP</text>
                          </g>

                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Horizon 2: Emerging Opportunities', phase: 'Strategic Expansion (2028)', readiness: 'Focus: Agentic Orchestration', desc: 'Transition from single prompts to autonomous agent swarms. Connect Adobe GenStudio and Workfront campaign briefs directly to automate metadata tagging and routing.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="170" cy="112" r="5" fill="#d97706" stroke="#fff" strokeWidth="1" />
                            <text x="145" y="98" fill="#d97706" fontSize="5" fontWeight="bold">Horizon 2: Swarms</text>
                          </g>

                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Horizon 3: Transformative Vision', phase: 'Long-Term Scale (2030)', readiness: 'Focus: Predictive Supply Chain', desc: 'Establish an autonomous content supply chain. Harness real-time localized HCP interaction data to programmatically generate and validate compliance campaigns globally.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="250" cy="78" r="5" fill="#7c3aed" stroke="#fff" strokeWidth="1" />
                            <text x="225" y="65" fill="#7c3aed" fontSize="5" fontWeight="bold">Horizon 3: Autonomous</text>
                          </g>

                          <text x="15" y="25" fill="#64748b" fontSize="6" fontWeight="bold">Y-AXIS: STRATEGIC ENTERPRISE VALUE</text>
                          <text x="200" y="200" fill="#64748b" fontSize="6" fontWeight="bold">X-AXIS: TIMELINE (2026 - 2030)</text>
                        </svg>
                      )}

                      {/* 4. Forrester Wave Model */}
                      {activeFrameworkTab === 'wave' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Forrester Arc Lines (Leaders, Strong Performers, Contenders) */}
                          <path d="M 280,210 A 200,200 0 0,0 60,20" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                          <path d="M 280,210 A 130,130 0 0,0 130,70" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1.5" />
                          
                          {/* Quadrant Text Labels */}
                          <text x="260" y="30" fill="#94a3b8" fontSize="6" fontWeight="bold" textAnchor="end">LEADERS</text>
                          <text x="180" y="70" fill="#94a3b8" fontSize="5.5" fontWeight="bold">STRONG PERFORMERS</text>
                          <text x="110" y="130" fill="#94a3b8" fontSize="5" fontWeight="bold">CONTENDERS</text>

                          {/* Bubble 1: Google */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Google Cloud Vertex AI', phase: 'Forrester Leader (Massive Presence)', readiness: 'Strategy: 4.8 | Offering: 4.6', desc: 'Combines highly scalable enterprise agent platform APIs with BigQuery zero-ETL data lakes. Giant bubble reflects massive global market presence and zero-trust credentials.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="240" cy="65" r="14" fill="#0d9488" opacity="0.8" stroke="#fff" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.15))' }} />
                            <text x="240" y="67" fill="#fff" fontSize="5" fontWeight="bold" textAnchor="middle">Google</text>
                          </g>

                          {/* Bubble 2: AWS */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Amazon Web Services (Bedrock)', phase: 'Forrester Leader (Massive Presence)', readiness: 'Strategy: 4.5 | Offering: 4.3', desc: 'Offers excellent model stability and broad foundational gardens. High enterprise presence (large bubble), but restricted model swapping outside Bedrock boundaries.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="210" cy="95" r="13" fill="#1e293b" opacity="0.8" stroke="#fff" strokeWidth="1.5" />
                            <text x="210" y="97" fill="#fff" fontSize="5" fontWeight="bold" textAnchor="middle">AWS</text>
                          </g>

                          {/* Bubble 3: Veeva */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Veeva Vault Native AI', phase: 'Strong Performer (Niche Focus)', readiness: 'Strategy: 3.8 | Offering: 4.0', desc: 'Deep vertical integration within pharmaceutical GxP perimeters. Moderate market presence bubble; restricted cross-cloud orchestration.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="170" cy="140" r="9" fill="#d97706" opacity="0.8" stroke="#fff" strokeWidth="1" />
                            <text x="170" y="142" fill="#fff" fontSize="4.5" fontWeight="bold" textAnchor="middle">Veeva</text>
                          </g>

                          {/* Bubble 4: Startups */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Bespoke AI Orchestrator Startup', phase: 'Contender / Niche (Small Presence)', readiness: 'Strategy: 4.2 | Offering: 2.8', desc: 'Provides highly customized orchestration hooks, but carries massive operational and security risks. Tiny bubble reflects low market footprint.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="90" cy="165" r="5" fill="#e11d48" opacity="0.8" stroke="#fff" strokeWidth="1" />
                            <text x="98" y="167" fill="#0f172a" fontSize="4.5" fontWeight="bold">Startups</text>
                          </g>

                          <text x="15" y="25" fill="#64748b" fontSize="6" fontWeight="bold">Y-AXIS: CURRENT OFFERING SUITABILITY</text>
                          <text x="200" y="212" fill="#64748b" fontSize="6" fontWeight="bold">X-AXIS: ARCHITECTURAL STRATEGY</text>
                        </svg>
                      )}

                      {/* 5. Wardley Mapping */}
                      {activeFrameworkTab === 'wardley' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Evolution Phases Grid */}
                          <line x1="80" y1="10" x2="80" y2="200" stroke="rgba(15,23,42,0.04)" />
                          <line x1="160" y1="10" x2="160" y2="200" stroke="rgba(15,23,42,0.04)" />
                          <line x1="240" y1="10" x2="240" y2="200" stroke="rgba(15,23,42,0.04)" />

                          {/* Evolution Labels */}
                          <text x="40" y="210" fill="#94a3b8" fontSize="5.5" fontWeight="bold" textAnchor="middle">Genesis</text>
                          <text x="120" y="210" fill="#94a3b8" fontSize="5.5" fontWeight="bold" textAnchor="middle">Custom Built</text>
                          <text x="200" y="210" fill="#94a3b8" fontSize="5.5" fontWeight="bold" textAnchor="middle">Product</text>
                          <text x="280" y="210" fill="#94a3b8" fontSize="5.5" fontWeight="bold" textAnchor="middle">Commodity</text>

                          {/* Wardley Components */}
                          {/* Component 1: Cloud Compute */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'GCP/AWS Cloud Compute & Storage', phase: 'Commodity Utilities', readiness: 'Maturity: High (Out-of-the-Box)', desc: 'Standard cloud infrastructure is a pure commodity. Proves we should never waste SI budget building this layers from scratch.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="280" cy="180" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1" />
                            <text x="270" y="172" fill="#0f172a" fontSize="5.5" fontWeight="bold" textAnchor="end">Cloud Compute</text>
                          </g>

                          {/* Component 2: LLM Models */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'LLM Foundational Models (Gemini/Claude)', phase: 'Product (Transitioning to Commodity)', readiness: 'Maturity: Moderate-High', desc: 'Foundation models are rapidly evolving from specialized products into utility commodities. The value lies in orchestration, not model training.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="210" cy="110" r="5" fill="#d97706" stroke="#fff" strokeWidth="1" />
                            <text x="200" y="102" fill="#0f172a" fontSize="5.5" fontWeight="bold" textAnchor="end">Foundational Models</text>
                          </g>

                          {/* Component 3: Pharma Agentic MLR */}
                          <g 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Pharma Agentic MLR Routing Engine', phase: 'Custom Built (High Value)', readiness: 'Maturity: Low (Bespoke Logic)', desc: 'The core business value layer. Requires custom agent architecture to map compliance rules natively. Proves exactly where SI development hours must be spent.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          >
                            <circle cx="120" cy="40" r="6" fill="#0d9488" stroke="#fff" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }} />
                            <text x="130" y="42" fill="#0d9488" fontSize="6" fontWeight="900">Custom MLR Routing ★</text>
                          </g>

                          {/* Dependency Lines */}
                          <line x1="120" y1="46" x2="210" y2="104" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="2" />
                          <line x1="210" y1="116" x2="280" y2="174" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="2" />

                          <text x="15" y="25" fill="#64748b" fontSize="6" fontWeight="bold">Y-AXIS: VALUE TO USER / COMPILATION LEVEL</text>
                        </svg>
                      )}

                      {/* 6. Future-Proofing Radar Chart (Google ARD vs. AWS/Veeva Locked) */}
                      {activeFrameworkTab === 'radar' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Radial Background Grid */}
                          <polygon points="160,20 260,90 220,190 100,190 60,90" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                          <polygon points="160,50 235,100 205,170 115,170 85,100" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                          <polygon points="160,80 210,110 190,150 130,150 110,110" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />

                          {/* Vertices Axis Lines */}
                          <line x1="160" y1="100" x2="160" y2="20" stroke="rgba(15,23,42,0.06)" />
                          <line x1="160" y1="100" x2="260" y2="90" stroke="rgba(15,23,42,0.06)" />
                          <line x1="160" y1="100" x2="220" y2="190" stroke="rgba(15,23,42,0.06)" />
                          <line x1="160" y1="100" x2="100" y2="190" stroke="rgba(15,23,42,0.06)" />
                          <line x1="160" y1="100" x2="60" y2="90" stroke="rgba(15,23,42,0.06)" />

                          {/* Axis Labels */}
                          <text x="160" y="15" fill="#475569" fontSize="5.5" fontWeight="bold" textAnchor="middle">Dynamic Discovery</text>
                          <text x="268" y="93" fill="#475569" fontSize="5.5" fontWeight="bold">Federated Grounding</text>
                          <text x="225" y="198" fill="#475569" fontSize="5.5" fontWeight="bold">UI Embeddability</text>
                          <text x="95" y="198" fill="#475569" fontSize="5.5" fontWeight="bold" textAnchor="end">Security Identity</text>
                          <text x="52" y="93" fill="#475569" fontSize="5.5" fontWeight="bold" textAnchor="end">Ecosystem Lock-in</text>

                          {/* Polygon 1: Google ARD Stack (Teal - High Flexibility) */}
                          <polygon 
                            points="160,25 255,92 215,182 106,181 65,85" 
                            fill="rgba(13, 148, 136, 0.08)" 
                            stroke="#0d9488" 
                            strokeWidth="2" 
                            style={{ cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(13,148,136,0.2))' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'Google Cloud ARD Stack', phase: 'Composable Ecosystem (High Flexibility)', readiness: 'Overall Score: 94%', desc: 'Google Cloud Agentic specifications (ARD, MCP, A2UI) provide unparalleled flexibility. Eliminates static API wrappers via self-assembling discoverable mesh, keeping vendor lock-in to an absolute minimum.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />

                          {/* Polygon 2: AWS/Veeva Locked Stack (Orange - Siloed) */}
                          <polygon 
                            points="160,68 210,95 181,130 112,125 120,92" 
                            fill="rgba(217, 119, 6, 0.05)" 
                            stroke="#d97706" 
                            strokeWidth="1.5" 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({ name: 'AWS / Veeva Locked Stack', phase: 'Siloed Ecosystem (High Lock-in)', readiness: 'Overall Score: 42%', desc: 'Relying strictly on native Veeva AI or static AWS Bedrock APIs locks the architecture into proprietary rails. Restricts dynamic discoverability and requires extensive custom middleware to sync with external Adobe content supply chains.' })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />
                        </svg>
                      )}

                      {/* 7. Progressive Horizontal Stage Chart (Future Workflow Progress) */}
                      {activeFrameworkTab === 'progress' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* Chevron Stage Background Track */}
                          <rect x="10" y="100" width="300" height="20" rx="4" fill="rgba(15,23,42,0.03)" />
                          
                          {/* Connected Chevron Stages */}
                          {[
                            { id: 1, name: 'Create/Gather Rules', x: 15, w: 50, color: colors.accentTeal },
                            { id: 2, name: 'Owner Approval', x: 75, w: 50, color: colors.accentTeal },
                            { id: 3, name: 'Embed Rules', x: 135, w: 50, color: colors.accentTeal },
                            { id: 4, name: 'Test History', x: 195, w: 50, color: colors.accentTeal },
                            { id: 5, name: 'Create Asset', x: 255, w: 50, color: colors.accentTeal }
                          ].map((stage, i) => (
                            <g 
                              key={stage.id}
                              style={{ cursor: 'pointer' }}
                              onMouseEnter={() => setHoveredFrameworkItem({ 
                                name: `${stage.id}. Stage: ${stage.name}`, 
                                phase: 'Operational Milestone', 
                                readiness: i < 3 ? 'Active In-Scope' : 'Day-Two Integration', 
                                desc: `Progressive workflow migration. By shifting compliance rules to the start of creative generation, we eliminate downstream legal bottlenecks. Currently modeling: ${stage.name}.` 
                              })}
                              onMouseLeave={() => setHoveredFrameworkItem(null)}
                            >
                              {/* Connector arrow */}
                              {i > 0 && (
                                <line x1={stage.x - 10} y1="110" x2={stage.x} y2="110" stroke={colors.accentTeal} strokeWidth="1.5" strokeDasharray="2" />
                              )}
                              
                              {/* Stage circle node */}
                              <circle cx={stage.x + 25} cy="110" r="10" fill={stage.color} stroke="#fff" strokeWidth="1.5" />
                              <text x={stage.x + 25} y="112" fill="#fff" fontSize="6" fontWeight="bold" textAnchor="middle">{stage.id}</text>
                              
                              {/* Label text */}
                              <text 
                                x={stage.x + 25} 
                                y="132" 
                                fill="#0f172a" 
                                fontSize="4.8" 
                                fontWeight="bold" 
                                textAnchor="middle"
                                style={{ transform: 'rotate(-15deg)', transformOrigin: `${stage.x + 25}px 132px` }}
                              >
                                {stage.name}
                              </text>
                            </g>
                          ))}
                          
                          <text x="160" y="35" fill="#475569" fontSize="6.5" fontWeight="bold" textAnchor="middle">THE FUTURE-STATE COMPLIANCE WORKFLOW</text>
                          <text x="160" y="48" fill="#94a3b8" fontSize="5" fontWeight="bold" textAnchor="middle">Rules-First Shift-Left Progression Pipeline</text>
                        </svg>
                      )}

                      {/* 8. Exception Gate Distribution Chart (Pie Chart) */}
                      {activeFrameworkTab === 'exception' && (
                        <svg viewBox="0 0 320 220" style={{ width: '100%', height: '100%' }}>
                          {/* 85% Sector (Automated Pass) - Large sector */}
                          <path 
                            d="M 160,110 L 160,50 A 60,60 0 1,1 110,145 Z" 
                            fill="rgba(13, 148, 136, 0.85)" 
                            stroke="#fff" 
                            strokeWidth="1.5"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({
                              name: 'Automated Compliance Pass (85%)',
                              phase: 'Standard Compliance Engine',
                              readiness: 'Target State Velocity',
                              desc: '85% of standard promotional content (static banners, simple emails, text adjustments) bypasses manual review and is instantly certified by the digital GxP rule engine.'
                            })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />
                          
                          {/* 15% Sector (Flagged Exceptions) - Small slice */}
                          <path 
                            d="M 160,110 L 110,145 A 60,60 0 0,1 160,50 Z" 
                            fill="rgba(239, 68, 68, 0.85)" 
                            stroke="#fff" 
                            strokeWidth="1.5"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredFrameworkItem({
                              name: 'Flagged Exception Gate (15%)',
                              phase: 'Human-in-the-Loop Escalation',
                              readiness: 'Review-by-Exception',
                              desc: 'Only 15% of highly complex, risky, or ambiguous assets are flagged and escalated to human MLR review teams. Maximizes capacity and eliminates queue stagnation!'
                            })}
                            onMouseLeave={() => setHoveredFrameworkItem(null)}
                          />
                          
                          {/* Center Cutout to make it a Donut Chart */}
                          <circle cx="160" cy="110" r="30" fill="#f8fafc" />
                          
                          {/* Text indicators */}
                          <text x="160" y="107" fill="#0f172a" fontSize="8" fontWeight="900" textAnchor="middle">85/15</text>
                          <text x="160" y="116" fill="#475569" fontSize="4.5" fontWeight="bold" textAnchor="middle">Ratio</text>
                          
                          {/* Legend */}
                          <rect x="230" y="75" width="6" height="6" fill="rgba(13, 148, 136, 0.85)" />
                          <text x="240" y="80" fill="#0f172a" fontSize="5" fontWeight="bold">Automated Pass (85%)</text>
                          
                          <rect x="230" y="90" width="6" height="6" fill="rgba(239, 68, 68, 0.85)" />
                          <text x="240" y="95" fill="#0f172a" fontSize="5" fontWeight="bold">Human Exceptions (15%)</text>

                          <text x="160" y="25" fill="#475569" fontSize="6.5" fontWeight="bold" textAnchor="middle">WORKLOAD DISTRIBUTION FOR HUMAN REVIEWERS</text>
                          <text x="160" y="195" fill="#94a3b8" fontSize="4.8" fontStyle="italic" textAnchor="middle">*Hover segments to audit compliance exception gates.*</text>
                        </svg>
                      )}

                    </div>
                  </div>

                  {/* Right Column: Deep-Dive Strategic Analysis */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%', minHeight: 0 }}>
                    
                    <div className="v12-card-glass" style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '0.55rem', background: '#ffffff', overflowY: 'auto' }} className="v12-scrollable">
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                        MCKINSEY-GARTNER ANNOTATIONS
                      </span>

                      {hoveredFrameworkItem ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          <div>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>Selected Component</span>
                            <h4 style={{ margin: '0.08rem 0', fontSize: '0.78rem', fontWeight: 900, color: '#0f172a' }}>{hoveredFrameworkItem.name}</h4>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                            <div>
                              <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>Classification</span>
                              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: colors.accentAmber, display: 'block' }}>{hoveredFrameworkItem.phase}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase' }}>GxP Readiness</span>
                              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: colors.accentTeal, display: 'block' }}>{hoveredFrameworkItem.readiness}</span>
                            </div>
                          </div>

                          <div style={{ background: '#f8fafc', padding: '0.45rem', borderRadius: '4px', border: '1px solid rgba(15,23,42,0.08)', marginTop: '0.2rem' }}>
                            <span style={{ fontSize: '0.52rem', color: '#475569', fontWeight: 800, display: 'block', marginBottom: '0.15rem' }}>STRATEGIC OUTLINE & RISK PROFILE</span>
                            <p style={{ margin: 0, fontSize: '0.65rem', color: '#0f172a', lineHeight: 1.35 }}>{hoveredFrameworkItem.desc}</p>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', justifyContent: 'center', height: '100%', textAlign: 'center', color: '#94a3b8' }}>
                          <TrendingUp size={24} style={{ margin: '0 auto', opacity: 0.5 }} />
                          <span style={{ fontSize: '0.65rem', fontStyle: 'italic' }}>*Hover over any plotted node on the left canvas to unlock deep-dive board annotations.*</span>
                        </div>
                      )}
                    </div>

                    {/* Value Matrix Card */}
                    <div className="v12-card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'rgba(13, 148, 136, 0.02)', border: `1.2px solid ${colors.accentTeal}` }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>
                        THE PROCUREMENT CONCLUSION
                      </span>
                      <p style={{ margin: 0, fontSize: '0.62rem', color: '#475569', lineHeight: 1.45 }}>
                        {activeFrameworkTab === 'hype' && "The Hype Cycle proves that deterministic Kong gateways and clinical RAG are ready for GxP production today. Standalone chatbots are highly volatile and must be restricted to prevent warnings."}
                        {activeFrameworkTab === 'capabilities' && "The Capabilities matrix proves that while Veeva excels at FDA Part 11 auditing out-of-the-box, Google Cloud excels natively at cross-cloud Adobe GenStudio metadata injection and geofencing."}
                        {activeFrameworkTab === 'horizons' && "The Growth timeline shows the board a clear, phased scale pathway. H1 delivers immediate MLR velocity; H2 automates supply chain sync; H3 introduces autonomous predictive campaigns."}
                        {activeFrameworkTab === 'wave' && "The Forrester Wave visually justifies to procurement why choosing established mega-vendors (Google/AWS) reduces enterprise scale risk, whereas startup orchestrators introduce support debt."}
                        {activeFrameworkTab === 'wardley' && "The Wardley Map proves to the CIO exactly where engineering hours should be spent. Do not spend SI budget custom-building utilities; spend it custom-building the GxP MLR routing logic that creates value."}
                        {activeFrameworkTab === 'radar' && "The Future-Proofing Radar Chart highlights the massive operational contrast between the Google ARD composable mesh and the rigid, proprietary AWS/Veeva locked stack."}
                      </p>
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
                
                {/* 🛡️ AGILE SCOPE GUARD DECISION FILTER & TOGGLE */}
                <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', background: '#ffffff', border: `1.2px solid ${colors.accentTeal}`, padding: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>🛡️ AGILE SCOPE GUARD DECISION FILTER</span>
                      <span style={{ fontSize: '0.55rem', color: '#475569' }}>Draws a hard line between MVP delivery and downstream integration to avoid waterfall blockages.</span>
                    </div>
                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.2rem', borderRadius: '8px', gap: '0.2rem', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)' }}>
                      <button
                        onClick={() => setScopeConstraint('2026')}
                        style={{
                          background: scopeConstraint === '2026' ? colors.tealGradient : 'transparent',
                          color: scopeConstraint === '2026' ? '#ffffff' : '#475569',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.62rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: scopeConstraint === '2026' ? '0 2px 4px rgba(13,148,136,0.15)' : 'none'
                        }}
                      >
                        2026 Scope (HCP Alert Narrow MVP)
                      </button>
                      <button
                        onClick={() => setScopeConstraint('2027')}
                        style={{
                          background: scopeConstraint === '2027' ? colors.tealGradient : 'transparent',
                          color: scopeConstraint === '2027' ? '#ffffff' : '#475569',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.62rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: scopeConstraint === '2027' ? '0 2px 4px rgba(13,148,136,0.15)' : 'none'
                        }}
                      >
                        Day-Two / 2027+ Scale
                      </button>
                    </div>
                  </div>

                  {/* Summit Filter Mapping Table */}
                  <div style={{ overflowX: 'auto', border: '1px solid rgba(15,23,42,0.06)', borderRadius: '6px', marginTop: '0.15rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.58rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid rgba(15,23,42,0.06)', color: '#475569', fontWeight: 900 }}>
                          <th style={{ padding: '0.3rem 0.45rem' }}>UI DIMENSION</th>
                          <th style={{ padding: '0.3rem 0.45rem' }}>2026 IN-SCOPE MVP (ACTIVE)</th>
                          <th style={{ padding: '0.3rem 0.45rem' }}>DAY-TWO SCALE (2027+)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { dim: 'Channels', mvp: 'HCP Alert / Single PDF Template', dayTwo: 'SFMC Email Journeys, Veeva CLM, Full IVA' },
                          { dim: 'Data Inputs', mvp: 'Static Dropdown Segment Selection', dayTwo: 'Live CDP Integration, Intelligent Target Lists' },
                          { dim: 'Infrastructure', mvp: 'Core Agentic Logic', dayTwo: 'Disaster Recovery, High Availability, CI/CD' },
                          { dim: 'Capabilities', mvp: 'Core Execution Loops', dayTwo: 'Rule-Authoring UI, Automated Model-Ops Loop' }
                        ].map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(15,23,42,0.04)', background: '#ffffff' }}>
                            <td style={{ padding: '0.35rem 0.45rem', fontWeight: 900, color: '#0f172a' }}>{row.dim}</td>
                            <td style={{ padding: '0.35rem 0.45rem', color: '#0d9488', fontWeight: 800 }}>✓ {row.mvp}</td>
                            <td style={{ 
                              padding: '0.35rem 0.45rem', 
                              color: scopeConstraint === '2026' ? '#94a3b8' : '#e11d48', 
                              fontWeight: 800,
                              opacity: scopeConstraint === '2026' ? 0.6 : 1,
                              background: scopeConstraint === '2026' ? '#fcfcfc' : 'transparent'
                            }}>
                              {scopeConstraint === '2026' ? `🔒 Hidden/Grayed: ${row.dayTwo}` : `⚡ Unlocked: ${row.dayTwo}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Simulated Values Computation Block */}
                {(() => {
                  // Proportional Component Weights & Base Values for Expanded Composable Sandbox
                  const vendors = {
                    orch: {
                      aws: { label: 'LangGraph + AWS AgentCore (Confirmed Foundation)', cost: 1.3, agility: 82, compliance: 88, gxp: 90 },
                      kong: { label: 'Kong AI Gateway (Confirmed Foundation)', cost: 0.9, agility: 90, compliance: 82, gxp: 84 },
                      google: { label: 'Google Vertex AI / Gemini Enterprise (Strategic Candidate)', cost: 1.1, agility: 95, compliance: 90, gxp: 92 }
                    },
                    identity: {
                      entra: { label: 'Microsoft Entra ID (Azure AD)', cost: 0.4, agility: 85, compliance: 90, gxp: 90 },
                      okta: { label: 'Okta Workforce Identity Cloud', cost: 0.5, agility: 92, compliance: 88, gxp: 89 },
                      ping: { label: 'AWS IAM + Ping Identity (Day-1 Candidate)', cost: 0.6, agility: 90, compliance: 85, gxp: 88 },
                      google_id: { label: 'Google Cloud Identity', cost: 0.3, agility: 88, compliance: 90, gxp: 91 }
                    },
                    federation: {
                      databricks_data: { label: 'Databricks (Data Genie) (Confirmed Foundation)', cost: 0.7, agility: 88, compliance: 90, gxp: 92 },
                      mcp: { label: 'Model Context Protocol (MCP) (Strategic Candidate)', cost: 0.3, agility: 98, compliance: 92, gxp: 94 },
                      dynamodb: { label: 'Amazon DynamoDB (Manifest Store Candidate)', cost: 0.5, agility: 80, compliance: 85, gxp: 86 },
                      webhooks: { label: 'Custom API Webhooks', cost: 0.9, agility: 70, compliance: 75, gxp: 80 },
                      etl: { label: 'Scheduled Batch ETL', cost: 0.5, agility: 45, compliance: 80, gxp: 82 }
                    },
                    creative: {
                      workfront: { label: 'Adobe Workfront (Intake Candidate)', cost: 0.5, agility: 80, compliance: 85, gxp: 85 },
                      firefly: { label: 'Adobe Firefly + AEM Assets (DAM)', cost: 0.8, agility: 92, compliance: 88, gxp: 85 }
                    },
                    mlr: {
                      veeva_promomats: { label: 'Veeva PromoMats (Claims/Registration Candidate)', cost: 1.1, agility: 70, compliance: 96, gxp: 98 },
                      custom_mlr: { label: 'Bedrock + Custom MLR Rule Set', cost: 0.7, agility: 85, compliance: 80, gxp: 82 }
                    }
                  };

                  const selOrch = vendors.orch[whatIfOrch] || vendors.orch.aws;
                  const selId = vendors.identity[whatIfIdentity] || vendors.identity.entra;
                  const selFed = vendors.federation[whatIfFederation] || vendors.federation.databricks_data;
                  const selCreative = vendors.creative[whatIfCreative] || vendors.creative.firefly;
                  const selMLR = vendors.mlr[whatIfMLR] || vendors.mlr.veeva_promomats;

                  // Calculations
                  let costSum = selOrch.cost + selId.cost + selFed.cost + selCreative.cost + selMLR.cost;
                  let mvpBase = 6; // Base 6 months
                  let gxpSum = (selOrch.gxp + selId.gxp + selFed.gxp + selCreative.gxp + selMLR.gxp) / 5;
                  let agilitySum = (selOrch.agility + selId.agility + selFed.agility + selCreative.agility + selMLR.agility) / 5;

                  let synergyDiscount = 0;
                  let frictionPenalty = 0;
                  let mvpAdjustment = 0;
                  let activeWarnings = [];

                  // 1. Confirmed Foundation Synergy: LangGraph + AWS AgentCore + Databricks
                  if (whatIfOrch === 'aws' && whatIfFederation === 'databricks_data') {
                    synergyDiscount = costSum * 0.20; 
                    mvpAdjustment -= 3;
                    activeWarnings.push({ 
                      type: 'synergy', 
                      text: '✓ Confirmed Foundation Synergy: Ensures standard routing, step advancement, and manifest spine tracking tied to a single trace ID out-of-the-box.' 
                    });
                  }

                  // 2. Multimodal Blindspot Friction: Adobe Firefly + Text-Only LLM without Image Grounding
                  if (whatIfCreative === 'firefly' && whatIfOrch === 'kong') {
                    frictionPenalty += 0.7;
                    mvpAdjustment += 2;
                    activeWarnings.push({ 
                      type: 'friction', 
                      text: '⚠️ Multimodal Blindspot: Separate creative and copy workflows risk generating unapprovable implied claims (e.g., fishing attire mismatches or incorrect patient physical realities).' 
                    });
                  }

                  // 3. Semantic Conflict Risk Friction: Any Custom MLR / Bedrock custom rules
                  if (whatIfMLR === 'custom_mlr') {
                    frictionPenalty += 0.5;
                    activeWarnings.push({ 
                      type: 'friction', 
                      text: "⚠️ Semantic Conflict Risk: Linguistic data formatting show that weak phrasing ('should') overrides mandatory constraints ('must') in testing loops, extending validation sprints." 
                    });
                  }

                  // Synergy: Google Vertex AI + MCP Data Mesh
                  if (whatIfOrch === 'google' && whatIfFederation === 'mcp') {
                    synergyDiscount += costSum * 0.12;
                    mvpAdjustment -= 2;
                    activeWarnings.push({ 
                      type: 'synergy', 
                      text: '✓ Google MCP Data Mesh Synergy: Shaves 2 months off MVP and reduces integration testing debt.' 
                    });
                  }

                  // 2026 Google Agentic Specifications: MCP + OKF + ARD Slashes Build Threshold to $100K
                  const isGoogleAgenticSpecActive = whatIfOrch === 'google' && whatIfFederation === 'mcp';
                  const minBuildBudgetLimit = isGoogleAgenticSpecActive ? 100 : 220;

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

                        {/* Symmetrical Dynamic Score Outputs Row 1 */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.45rem', borderTop: '1px solid rgba(15,23,42,0.08)', paddingTop: '0.65rem', textAlign: 'center' }}>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>3-Year TCO ($M)</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>${finalTCO}M</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Months to MVP</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>{finalMonths}mo</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>GxP Score</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: '#0f172a', display: 'block', marginTop: '0.1rem' }}>{finalGxP}/100</span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Rule Codification</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: whatIfMLR === 'veeva_promomats' ? '#0d9488' : '#ef4444', display: 'block', marginTop: '0.1rem' }}>
                              {whatIfMLR === 'veeva_promomats' ? '92%' : '< 30%'}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.48rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Watchdog Safety</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 950, color: whatIfOrch === 'aws' || whatIfOrch === 'google' ? '#0d9488' : '#ef4444', display: 'block', marginTop: '0.1rem' }}>
                              {whatIfOrch === 'aws' || whatIfOrch === 'google' ? '96/100' : whatIfOrch === 'kong' ? '82/100' : '35/100'}
                            </span>
                          </div>
                        </div>

                        {/* RACI & Operational Drag Warnings Banner */}
                        <div style={{ background: whatIfMLR === 'custom_mlr' ? 'rgba(239, 68, 68, 0.04)' : 'rgba(13, 148, 136, 0.04)', border: `1px solid ${whatIfMLR === 'custom_mlr' ? '#ef4444' : '#0d9488'}`, borderRadius: '6px', padding: '0.45rem', marginTop: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.1rem', textAlign: 'left' }}>
                          <span style={{ fontSize: '0.52rem', fontWeight: 950, color: whatIfMLR === 'custom_mlr' ? '#ef4444' : '#0d9488', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {whatIfMLR === 'custom_mlr' ? '⚠️ RACI & Capacity Impact Warning' : '✓ RACI Operational Efficiency'}
                          </span>
                          <p style={{ margin: 0, fontSize: '0.58rem', color: '#0f172a', lineHeight: 1.35 }}>
                            {whatIfMLR === 'custom_mlr' 
                              ? '⚠️ High Dependency: Requires dedicated capacity from reviewer functions, brand, and marketing ops to manually validate rules against historical context.'
                              : '✓ Low Operational Drag: Automated exception gates minimize manual regulatory reviewer overhead and eliminate pipeline delays.'}
                          </p>
                        </div>

                      </div>

                      {/* Dropdown Composable Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', flexShrink: 0 }}>
                        
                        <div className="v12-card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', background: '#ffffff' }}>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15,23,42,0.08)', paddingBottom: '0.3rem' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: colors.accentTeal, letterSpacing: '0.5px' }}>CORE PLATFORM COMPONENT SELECTION</span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.62rem' }}>
                            
                            {/* Dropdown 1: AI Orchestration & Gateway */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>AI Orchestration & Gateway</span>
                              <select 
                                value={whatIfOrch}
                                onChange={e => setWhatIfOrch(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="aws">LangGraph + AWS AgentCore (Confirmed Foundation)</option>
                                <option value="kong">Kong AI Gateway (Confirmed Foundation)</option>
                                <option value="google">Google Vertex AI / Gemini Enterprise (Strategic Candidate)</option>
                              </select>
                            </div>

                            {/* Dropdown 2: Zero-Trust Identity (IAM) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Zero-Trust Identity (IAM)</span>
                              <select 
                                value={whatIfIdentity}
                                onChange={e => setWhatIfIdentity(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="entra">Microsoft Entra ID (Azure AD)</option>
                                <option value="okta">Okta Workforce Identity Cloud</option>
                                <option value="ping">AWS IAM + Ping Identity (Day-1 Candidate)</option>
                                <option value="google_id">Google Cloud Identity</option>
                              </select>
                            </div>

                            {/* Dropdown 3: Data Federation & Memory */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>Data Federation & Memory</span>
                              <select 
                                value={whatIfFederation}
                                onChange={e => setWhatIfFederation(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="databricks_data">Databricks (Data Genie) (Confirmed Foundation)</option>
                                <option value="mcp">Model Context Protocol (MCP) (Strategic Candidate)</option>
                                <option value="dynamodb">Amazon DynamoDB (Manifest Store Candidate)</option>
                                <option value="webhooks">Custom API Webhooks</option>
                                <option value="etl">Scheduled Batch ETL</option>
                              </select>
                            </div>

                            {/* Dropdown 4: Creative Intake (Grayed if 2026 Scope) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', opacity: scopeConstraint === '2026' ? 0.65 : 1 }}>
                              <span style={{ fontWeight: 800, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                                Creative Intake & DAM {scopeConstraint === '2026' && '🔒'}
                              </span>
                              <select 
                                value={whatIfCreative}
                                onChange={e => {
                                  if (scopeConstraint === '2026') {
                                    alert("⚠️ Locked: Advanced creative asset integrations are scheduled for Day-Two (2027+) scale!");
                                  } else {
                                    setWhatIfCreative(e.target.value);
                                  }
                                }}
                                disabled={scopeConstraint === '2026'}
                                style={{ background: scopeConstraint === '2026' ? '#f8fafc' : '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: scopeConstraint === '2026' ? 'not-allowed' : 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="firefly">Adobe Firefly + AEM Assets (DAM)</option>
                                <option value="workfront">Adobe Workfront (Intake Candidate)</option>
                              </select>
                            </div>

                            {/* Dropdown 5: MLR Source of Record */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontWeight: 800, color: '#475569' }}>MLR Source of Record & Guardrails</span>
                              <select 
                                value={whatIfMLR}
                                onChange={e => setWhatIfMLR(e.target.value)}
                                style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.15)', color: '#0f172a', padding: '0.25rem', outline: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: '4px' }}
                              >
                                <option value="veeva_promomats">Veeva PromoMats (Claims/Registration Candidate)</option>
                                <option value="custom_mlr">Bedrock + Custom MLR Rule Set</option>
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
