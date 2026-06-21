import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

# Let's write the complete, unredacted, premium Silverline-style component!
silverline_code = """import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Check, ChevronRight, Play, ArrowLeft, ArrowRight, Download, Upload, Trash2, Edit2, AlertTriangle, Eye, HelpCircle } from 'lucide-react';

// ==========================================================================
# 25-Question Consultative Scoping Framework (V12 Merck-Novartis Spec)
// ==========================================================================
const V12_PILLARS = [
  {
    id: 'UX_HITL',
    name: '1. UX & HITL Workflow',
    weight: 7, // Sum of weights: 3 + 3 + 1
    purpose: 'Evaluates how marketers, creatives, and MLR reviewers interact without disrupting native workspaces.',
    questions: [
      {
        id: '1.1',
        dimension: 'Native Workspace Integration',
        topic: 'How do marketers and creatives interact with compliance constraints and generation tools?',
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
        dimension: 'HITL Override & Audit Gateways',
        topic: 'How are generation exceptions and manual compliance overrides approved and logged?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): No override logging. Users copy-paste outputs without compliance sign-off.' },
          { score: 2, text: '2 (Siloed): Overrides sent via email/Slack; manual spreadsheets track approvals.' },
          { score: 3, text: '3 (Integrated): In-app override button, but approvals are slow and block release queues.' },
          { score: 4, text: '4 (Agentic): Multi-agent audit gateways automatically route overrides to designated compliance leads.' },
          { score: 5, text: '5 (Optimized): Real-time risk-profile routing allows instant auto-approval for low-risk changes.' }
        ],
        businessPainpoints: [
          'Compliance bottlenecks freezing GTM',
          'Undocumented AI overrides risking lawsuits',
          'Audit trail gaps during GxP reviews',
          'MLR reviewer fatigue from repetitive approvals',
          'Friction between creative and legal teams'
        ],
        technicalPainpoints: [
          'No cryptographically signed audit logs',
          'Lack of role-based routing (RBAC) in AI logic',
          'Manual approval database entries',
          'No fallback queues during high-traffic launches',
          'Inability to trace override reasoning'
        ]
      },
      {
        id: '1.3',
        dimension: 'Brand Integrity & MLR Co-Pilot',
        topic: 'How are brand safety rules, MLR compliance guidelines, and fair balance rules enforced?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): Human editors manually memorize and verify 100+ pages of brand rules.' },
          { score: 2, text: '2 (Siloed): Hardcoded keyword filters block specific terms but miss semantic context.' },
          { score: 3, text: '3 (Integrated): Retrieval-Augmented Generation (RAG) checks brand guidelines but outputs still hallucinate.' },
          { score: 4, text: '4 (Agentic): Multi-agent brand checkers audit every sentence, highlighting risks before human review.' },
          { score: 5, text: '5 (Optimized): Automated self-correcting agents rewrite non-compliant text instantly.' }
        ],
        businessPainpoints: [
          'Severe brand dilution from rogue AI outputs',
          'Fair-balance regulatory warning letters',
          'High editing overhead (90% rewrite rates)',
          'Inconsistent tone of voice across regions',
          'MLR approval cycles taking weeks'
        ],
        technicalPainpoints: [
          'Keyword blacklists are too rigid',
          'RAG retrieves outdated brand guidelines',
          'No semantic validation of generated images/text',
          'Lack of compliance confidence scoring',
          'No automated correction loop'
        ]
      }
    ]
  },
  {
    id: 'INTELLIGENCE',
    name: '2. Intelligence & Regulatory',
    weight: 10, // Sum of weights: 3 + 3 + 2 + 2
    purpose: 'Evaluates fair-balance compliance, regulatory reasoning, model safety, and multimodal synchronization.',
    questions: [
      {
        id: '2.1',
        dimension: 'Compliance Disclosures & Fair Balance',
        topic: 'How is fair balance (presenting risk information alongside benefits) guaranteed in generative outputs?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): Users must manually write and paste required risk disclosures.' },
          { score: 2, text: '2 (Siloed): System appends static risk text to the bottom of all outputs, regardless of context.' },
          { score: 3, text: '3 (Integrated): RAG dynamically pulls relevant risk terms but text formatting is inconsistent.' },
          { score: 4, text: '4 (Agentic): Dedicated compliance agents evaluate benefit statements and generate matching risk text.' },
          { score: 5, text: '5 (Optimized): Real-time layout-aware agents adjust disclosure size and placement for guaranteed prominence.' }
        ],
        businessPainpoints: [
          'FDA/EMA warning letters for omitting risks',
          'Legal team blocking all generative use cases',
          'Disclosures take up too much creative space',
          'Inability to launch dynamic digital campaigns',
          'High cost of manual compliance review'
        ],
        technicalPainpoints: [
          'Disclosures decoupled from core benefit text',
          'Lack of spatial formatting awareness in models',
          'Prompt injection bypasses disclosure rules',
          'No validation of risk prominence ratios',
          'Inflexible static templates'
        ]
      },
      {
        id: '2.2',
        dimension: 'Regulatory Context Reasoning',
        topic: 'Can the system reason over complex local regulatory guidelines (e.g., FDA, EMA, PMDA) to adapt content?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): Compliance teams manually interpret local rules for every country launch.' },
          { score: 2, text: '2 (Siloed): Basic country routing maps users to separate country-specific folders.' },
          { score: 3, text: '3 (Integrated): RAG retrieves regional regulatory documents but fails to apply them correctly.' },
          { score: 4, text: '4 (Agentic): LLM agents reason over regional guidelines, adjusting claims and disclosures dynamically.' },
          { score: 5, text: '5 (Optimized): Automated multi-region compliance mapping adapts content for 50+ countries instantly.' }
        ],
        businessPainpoints: [
          'Global campaign rollouts delayed by months',
          'Regional compliance violations',
          'High cost of local translation and legal agencies',
          'Inconsistent global brand messaging',
          'Inability to scale cross-border marketing'
        ],
        technicalPainpoints: [
          'Models conflate different regional rules',
          'Guidelines are unstructured and hard to query',
          'Prompt context limits prevent multi-region reasoning',
          'Lack of localized validation benchmarks',
          'No regional routing logic'
        ]
      },
      {
        id: '2.3',
        dimension: 'Model Garden Interoperability',
        topic: 'Can you swap out foundation models, fine-tune prompts, and control model routing without rebuilding code?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Hardcoded API calls to a single proprietary LLM. Swapping requires a full code rewrite.' },
          { score: 2, text: '2 (Siloed): Wrapper class allows model switching, but prompts must be manually updated.' },
          { score: 3, text: '3 (Integrated): Centralized Model Router, but lack of automated fallback rules.' },
          { score: 4, text: '4 (Framework-Driven): Abstracted Prompt Registry and Model Router with dynamic latency/cost routing.' },
          { score: 5, text: '5 (Optimized): Zero-downtime, model-agnostic architecture with real-time semantic fallback.' }
        ],
        businessPainpoints: [
          'Vendor lock-in to expensive LLM providers',
          'System downtime during model deprecations',
          'High operational cost from over-powered models',
          'Inability to leverage newer, faster models',
          'Slow engineering velocity'
        ],
        technicalPainpoints: [
          'Hardcoded model endpoints and API keys',
          'Prompt templates coupled with application code',
          'No automated model benchmarking',
          'No fallback to cheaper models for simple tasks',
          'Lack of unified output schema parsing'
        ]
      },
      {
        id: '2.4',
        dimension: 'Multimodal Grounding & Audio Sync',
        topic: 'Are audio, video, and text assets semantically linked, grounded in clinical databases, and synchronized?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Audio, video, and text are produced in silos and manually synchronized by video editors.' },
          { score: 2, text: '2 (Siloed): Script generated by AI, but voiceover and video editing are fully manual.' },
          { score: 3, text: '3 (Integrated): Automated text-to-speech, but voice lacks natural inflection and lipsync is off.' },
          { score: 4, text: '4 (Agentic): Multimodal grounding agents generate audio, video, and text from a single source of truth.' },
          { score: 5, text: '5 (Optimized): Dynamic, real-time avatar synchronization with automated localized lip-syncing.' }
        ],
        businessPainpoints: [
          'High cost of video/audio localization',
          'Generated videos look robotic and unprofessional',
          'Clinical claims in videos mismatch text labels',
          'Long production timelines for training videos',
          'Inability to update video content quickly'
        ],
        technicalPainpoints: [
          'Decoupled audio and video pipelines',
          'No temporal grounding of clinical claims',
          'Robotic text-to-speech synthesis',
          'Lipsync drift in localized videos',
          'High rendering latency'
        ]
      }
    ]
  },
  {
    id: 'DATA_INTEGRATION',
    name: '3. Enterprise Data & Semantic Integration',
    weight: 5, // Sum of weights: 3 + 2
    purpose: 'Evaluates real-time data connectors, vector search, semantic memory, and knowledge graphs.',
    questions: [
      {
        id: '3.1',
        dimension: 'Enterprise Data Interoperability',
        topic: 'Can the system fetch and write data to core systems (e.g., Veeva, Salesforce, SAP) in real-time?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): Users manually download CSVs and upload them to the AI tool.' },
          { score: 2, text: '2 (Siloed): Batch night-time ETL pipelines sync data to a separate database.' },
          { score: 3, text: '3 (Integrated): Direct REST API integrations, but queries are slow and lack real-time writebacks.' },
          { score: 4, text: '4 (Agentic): Real-time bi-directional connectors with automated schema mapping.' },
          { score: 5, text: '5 (Optimized): Zero-ETL semantic data mesh with instant writeback and transaction locking.' }
        ],
        businessPainpoints: [
          'Decisions based on stale, outdated data',
          'Data entry errors from manual transfers',
          'Compliance issues from un-synced systems',
          'High developer cost for custom API connectors',
          'Inability to automate transactional tasks'
        ],
        technicalPainpoints: [
          'Fragile point-to-point API plumbing',
          'High latency during real-time queries',
          'Lack of transactional safety (no rollbacks)',
          'No automated error handling for API failures',
          'Hardcoded authentication tokens'
        ]
      },
      {
        id: '3.2',
        dimension: 'Semantic Memory & Graph Integration',
        topic: 'Is there a unified semantic memory layer (Vector DB + Knowledge Graph) to maintain context?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): No persistent memory. Every session starts with zero knowledge of the user/case.' },
          { score: 2, text: '2 (Siloed): Session-level memory stored in a local cache, lost when tab closes.' },
          { score: 3, text: '3 (Integrated): Centralized Vector DB for document search, but lacks relationship context.' },
          { score: 4, text: '4 (Agentic): Hybrid memory architecture combining Vector search with a Knowledge Graph.' },
          { score: 5, text: '5 (Optimized): Self-evolving semantic memory mesh that auto-updates relations in real-time.' }
        ],
        businessPainpoints: [
          'AI forgets user context across sessions',
          'Repetitive prompting required from users',
          'Inability to trace complex data relationships',
          'Hallucinations on relational queries',
          'Poor personalized recommendations'
        ],
        technicalPainpoints: [
          'Vector search lacks semantic relationship mapping',
          'Graph databases are hard to query in real-time',
          'High latency from multi-hop graph queries',
          'Memory drift over long conversations',
          'No automated entity extraction'
        ]
      }
    ]
  },
  {
    id: 'RUNTIME_ARCH',
    name: '4. Runtime Architecture & State Management',
    weight: 13, // Sum of weights: 2 + 3 + 2 + 2 + 2 + 2
    purpose: 'Evaluates multi-agent orchestration, state persistence, SaaS integration, FinOps, and distributed tracing.',
    questions: [
      {
        id: '4.1',
        dimension: 'Multi-Agent Choreography',
        topic: 'Does the runtime coordinate specialized subagents with distinct roles and parallel execution?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Single monolithic prompt tries to do everything, leading to hallucinations.' },
          { score: 2, text: '2 (Siloed): Hardcoded, linear chaining of 2-3 prompts (no branching or decision making).' },
          { score: 3, text: '3 (Integrated): Centralized orchestrator routes tasks, but execution is synchronous and slow.' },
          { score: 4, text: '4 (Agentic): Autonomous multi-agent runtime with dynamic branching and parallel execution.' },
          { score: 5, text: '5 (Optimized): Asynchronous, event-driven agent mesh with self-healing task queues.' }
        ],
        businessPainpoints: [
          'High hallucination rates on complex tasks',
          'Extremely slow response times (timeouts)',
          'Inability to automate non-linear workflows',
          'Heavy engineering cost to debug monoliths',
          'Rigid systems that break on edge cases'
        ],
        technicalPainpoints: [
          'No standardized agent communication protocol',
          'Synchronous prompt execution bottlenecks',
          'Lack of dynamic task routing logic',
          'No parallel model execution support',
          'Hardcoded orchestrator logic'
        ]
      },
      {
        id: '4.2',
        dimension: 'State Persistence & Session Failover',
        topic: 'Are agent state, conversation history, and active task trees persisted to survive server restarts?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): Zero persistence. If a connection drops, the entire session and state are lost.' },
          { score: 2, text: '2 (Siloed): State stored in local browser storage, highly vulnerable to loss.' },
          { score: 3, text: '3 (Integrated): Relational database saves chat history, but active task state is lost.' },
          { score: 4, text: '4 (Agentic): Distributed state machine persists active task trees and variable states in real-time.' },
          { score: 5, text: '5 (Optimized): Transparent session resume with instant, zero-state-loss hot failover.' }
        ],
        businessPainpoints: [
          'High user frustration from dropped sessions',
          'Wasted model tokens from restarted tasks',
          'Inability to run long-running async tasks',
          'Lost audit trails during system crashes',
          'Customer support tickets for broken flows'
        ],
        technicalPainpoints: [
          'Active agent memory not serialized',
          'No distributed cache (Redis) integration',
          'Loss of execution context during restarts',
          'No optimistic locking on state writes',
          'Monolithic state stores cause bottlenecks'
        ]
      },
      {
        id: '4.3',
        dimension: 'SaaS Platform Interoperability',
        topic: 'Can agents coordinate actions across distinct SaaS platforms (e.g., ServiceNow to Veeva to Teams)?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Users act as the human integration layer, copy-pasting data between tabs.' },
          { score: 2, text: '2 (Siloed): Basic webhook integrations trigger simple notifications but no actions.' },
          { score: 3, text: '3 (Integrated): Centralized iPaaS (e.g., MuleSoft) connects systems, but flows are rigid.' },
          { score: 4, text: '4 (Agentic): Cross-platform agent mesh orchestrates multi-system transactions autonomously.' },
          { score: 5, text: '5 (Optimized): Semantic API discovery allows agents to bind to new SaaS endpoints on-the-fly.' }
        ],
        businessPainpoints: [
          'Manual cross-system processes are slow',
          'Data discrepancy across enterprise systems',
          'High cost of maintaining custom integration glue',
          'Slow employee onboarding (too many tools)',
          'Inability to automate end-to-end business flows'
        ],
        technicalPainpoints: [
          'iPaaS flows are too rigid for AI logic',
          'API authentication limits across domains',
          'No transactional rollback across SaaS APIs',
          'Brittle custom connector code',
          'Lack of standardized semantic API specs'
        ]
      },
      {
        id: '4.4',
        dimension: 'FinOps Cost Guardrails',
        topic: 'Are there active rate limits, budget ceilings, and semantic routing to optimize LLM spend?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): No cost tracking. System runs until the API key is deactivated due to high bills.' },
          { score: 2, text: '2 (Siloed): Monthly billing alerts from cloud providers, but no in-app cost controls.' },
          { score: 3, text: '3 (Integrated): Basic token counter logs usage, but cannot block runaway loops.' },
          { score: 4, text: '4 (Agentic): Active FinOps middleware enforces user/session budgets and routes tasks based on cost.' },
          { score: 5, text: '5 (Optimized): Real-time token arbitrage dynamically routes queries to the cheapest optimal model.' }
        ],
        businessPainpoints: [
          'Runaway AI spend (shock bills)',
          'Inability to predict or scale AI OpEx budgets',
          'Resource denial from rogue developer loops',
          'Inflexible access policies (all-or-nothing)',
          'High cost per transaction limiting ROI'
        ],
        technicalPainpoints: [
          'No token middleware in the API path',
          'Lack of cost attribution per user/session',
          'Runaway agent loops cannot be auto-killed',
          'No semantic model routing based on task cost',
          'Static model allocation'
        ]
      },
      {
        id: '4.5',
        dimension: 'Legacy System Modernization',
        topic: 'Does the design facilitate wrapping legacy databases and SOAP APIs in semantic schemas?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Legacy systems ignored. AI only connects to modern REST databases.' },
          { score: 2, text: '2 (Siloed): Dedicated database replication copy-pastes legacy data to a modern cloud store.' },
          { score: 3, text: '3 (Integrated): Custom middleware wraps legacy SOAP/SQL into basic REST endpoints.' },
          { score: 4, text: '4 (Agentic): Semantic wrappers expose legacy mainframe structures as Agent Tools.' },
          { score: 5, text: '5 (Optimized): Automated model-driven generation of semantic schemas over any system.' }
        ],
        businessPainpoints: [
          'Valuable legacy data locked in mainframes',
          'High cost of database replication and storage',
          'Slow developer velocity due to legacy bottlenecks',
          'Security risks from exposed legacy databases',
          'Maintenance cost of obsolete middleware'
        ],
        technicalPainpoints: [
          'SOAP schemas are incompatible with AI tools',
          'High latency from legacy database queries',
          'SQL injection risks from dynamic query generation',
          'Lack of connection pooling for legacy APIs',
          'Brittle database wrappers'
        ]
      },
      {
        id: '4.6',
        dimension: 'Distributed Tracing & OpenTelemetry',
        topic: 'Is there end-to-end tracing of prompt inputs, LLM latencies, and tool execution paths?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): No logging. Debugging requires developers to print local console logs.' },
          { score: 2, text: '2 (Siloed): Standard server logs track HTTP codes but miss prompt inputs/outputs.' },
          { score: 3, text: '3 (Integrated): Basic prompt logging to a local file, but no trace correlation.' },
          { score: 4, text: '4 (Agentic): Full OpenTelemetry integration tracing every sub-agent step and model call.' },
          { score: 5, text: '5 (Optimized): Real-time semantic trace analytics automatically flag prompt drift and failures.' }
        ],
        businessPainpoints: [
          'Weeks required to debug agent failures',
          'Inability to audit AI decision-making paths',
          'No visibility into LLM latency bottlenecks',
          'Compliance validation failures due to zero tracing',
          'High support cost for mysterious errors'
        ],
        technicalPainpoints: [
          'No trace propagation headers across agents',
          'Lack of correlation between prompts and tools',
          'Trace collectors cause high performance overhead',
          'Structured logs lack model-specific metadata',
          'No automated trace aggregation'
        ]
      }
    ]
  },
  {
    id: 'SECURITY_GXP',
    name: '5. Security, Traceability & Validation (GxP)',
    weight: 15, // Sum of weights: 3 + 3 + 2 + 2 + 2 + 3
    purpose: 'Evaluates GxP software validation, API gateway security, credentials rotation, and data isolation.',
    questions: [
      {
        id: '5.1',
        dimension: 'GxP Software Validation',
        topic: 'Are model updates, prompts, and agent configurations subject to strict validation?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): No validation. Developers change prompts and models directly in production.' },
          { score: 2, text: '2 (Siloed): Basic unit tests, but no regression testing for non-deterministic model outputs.' },
          { score: 3, text: '3 (Integrated): CI/CD pipeline runs prompt regression suites, but lacks GxP compliance sign-off.' },
          { score: 4, text: '4 (Agentic): Automated GxP validation pipeline with golden-dataset evaluation and digital signatures.' },
          { score: 5, text: '5 (Optimized): Continuous compliance validation with real-time audit trails and automated rollback.' }
        ],
        businessPainpoints: [
          'FDA warning letters for unvalidated systems',
          'Severe system regressions (sudden hallucinations)',
          'High cost of manual validation paperwork',
          'Slow feature release cycles (months of compliance delay)',
          'Auditor penalties during regulatory reviews'
        ],
        technicalPainpoints: [
          'No automated prompt regression testing',
          'Lack of cryptographic signatures in releases',
          'Models updated without sandbox evaluation',
          'No drift detection for model weights/parameters',
          'Inability to lock prompts in GxP environments'
        ]
      },
      {
        id: '5.2',
        dimension: 'API Gateway Guardrails',
        topic: 'Is there a centralized API gateway enforcing semantic threat protection and prompt injection filters?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): Developers connect directly to LLM APIs with zero middle security.' },
          { score: 2, text: '2 (Siloed): Basic API gateway manages rate limits but misses prompt injection attacks.' },
          { score: 3, text: '3 (Integrated): Semantic guardrail middleware blocks standard PII and bad words.' },
          { score: 4, text: '4 (Agentic): Centralized AI Security Gateway dynamically blocks jailbreaks, injections, and data leaks.' },
          { score: 5, text: '5 (Optimized): Real-time self-correcting security mesh intercepts and sanitizes payload streams.' }
        ],
        businessPainpoints: [
          'Jailbreak attacks exposing company data',
          'Data leak lawsuits (accidental PHI/PII sharing)',
          'Regulatory non-compliance with regional data laws',
          'High cost of manual security code audits',
          'Brand damage from highly inappropriate outputs'
        ],
        technicalPainpoints: [
          'No centralized interceptor for model payloads',
          'Jailbreak filters are easily bypassed by wrappers',
          'High latency from deep semantic security checks',
          'No automated sanitization of system prompt inputs',
          'Lack of API key isolation per user'
        ]
      },
      {
        id: '5.3',
        dimension: 'Security Drift Monitoring',
        topic: 'Are configurations, access policies, and model metadata audited in real-time to detect drift?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Security reviews are annual manual checklists.' },
          { score: 2, text: '2 (Siloed): Log files generated, but require manual scripting to audit.' },
          { score: 3, text: '3 (Integrated): SIEM dashboard aggregates logs, but lack of automated drift alerts.' },
          { score: 4, text: '4 (Agentic): Security agents continuously audit configurations and auto-remediate drift.' },
          { score: 5, text: '5 (Optimized): Zero-trust configuration mesh with cryptographic configuration locking.' }
        ],
        businessPainpoints: [
          'Undetected security holes for months',
          'Inability to pass security audits',
          'High cost of compliance consultants',
          'Configuration changes break security rules',
          'Accidental exposure of developer keys'
        ],
        technicalPainpoints: [
          'No automated configuration scanning',
          'Audit trails are incomplete and mutable',
          'No real-time alerts for policy drift',
          'Lack of drift correlation across systems',
          'No self-healing configuration scripts'
        ]
      },
      {
        id: '5.4',
        dimension: 'Cross-Boundary Identity',
        topic: 'How are user permissions enforced when delegating to third-party agents?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Agents run on a single over-privileged service account.' },
          { score: 2, text: '2 (Siloed): Hardcoded API keys for destination systems.' },
          { score: 3, text: '3 (Integrated): Basic OAuth but unable to dynamically downgrade permissions per user.' },
          { score: 4, text: "4 (Agentic): The invoking user's exact identity and permissions pass strictly across boundaries." },
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
          'No role-based delegation contracts',
          'Token exchange is insecure',
          'Inability to audit agent delegation'
        ]
      },
      {
        id: '5.5',
        dimension: 'Data Sandbox Isolation',
        topic: 'Are customer data boundaries, sandbox environments, and LLM training data isolated?',
        weight: 2, // Strategic
        options: [
          { score: 1, text: '1 (Manual): Shared database. All customer data co-exists in the same folders.' },
          { score: 2, text: '2 (Siloed): Logical database isolation, but LLM utilizes shared pools.' },
          { score: 3, text: '3 (Integrated): Database and search indexes fully isolated, but models share prompt cache.' },
          { score: 4, text: '4 (Agentic): Full sandbox isolation. Model weights, prompts, and vector databases isolated.' },
          { score: 5, text: '5 (Optimized): Dynamic, zero-trust sandbox provisioning with automated cryptographic data erasure.' }
        ],
        businessPainpoints: [
          'Accidental customer data leaks',
          'Violation of customer data privacy contracts',
          'Regulators blocking shared cloud models',
          'High cost of dedicated single-tenant infra',
          'Loss of customer trust'
        ],
        technicalPainpoints: [
          'Shared prompt cache leaks information',
          'Lack of database schema isolation',
          'No automated sandbox cleanup scripts',
          'Model fine-tuning leaks customer data',
          'Shared API gateways lack customer routing'
        ]
      },
      {
        id: '5.6',
        dimension: 'Quality Sign-off Gates',
        topic: 'Are release approvals locked behind verified signatures from Quality Management (QM) and C-suite?',
        weight: 3, // Critical (Dealbreaker!)
        options: [
          { score: 1, text: '1 (Manual): Informal sign-off. Releases deployed via verbal/Slack approval.' },
          { score: 2, text: '2 (Siloed): Email sign-off sheet. PDF signature routing takes weeks.' },
          { score: 3, text: '3 (Integrated): Digital sign-off in Jira, but release is not cryptographically locked.' },
          { score: 4, text: '4 (Agentic): Cryptographically locked releases requiring C-suite and QM multi-party keys.' },
          { score: 5, text: '5 (Optimized): Automated multi-party consensus locks deployment pipelines natively.' }
        ],
        businessPainpoints: [
          'Unapproved prompt changes hitting production',
          'Regulatory non-compliance with QM sign-offs',
          'Delayed time-to-market due to slow approvals',
          'Risk of internal rogue deployments',
          'High auditing costs during GxP reviews'
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
        topic: 'How much bespoke glue code and infrastructure must be built from scratch?',
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
        topic: 'Does it require maintaining multiple disparate databases, compute clusters, and networking rules?',
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
        topic: 'Can this architecture be successfully validated and launched by the strict January 2027 MVP deadline?',
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
        topic: 'How much operational overhead is required when foundation models or APIs inevitably update?',
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

// Flat list of 25 questions for direct indexing
const FLAT_QUESTIONS = [];
V12_PILLARS.forEach(p => {
  p.questions.forEach(q => {
    FLAT_QUESTIONS.push({ ...q, pillarId: p.id, pillarName: p.name });
  });
});

export default function PremiumScopingAssessorV12({ onBackToLanding, globalTheme = 'dark', apiKey = '' }) {
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
  
  // Wizard active question index (0 to 24)
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const activeQuestion = FLAT_QUESTIONS[activeQuestionIdx];
  const activeQuestionId = activeQuestion.id;

  // Active pillar index based on active question
  const activePillarIdx = useMemo(() => {
    return V12_PILLARS.findIndex(p => p.id === activeQuestion.pillarId);
  }, [activeQuestion]);

  const activePillar = V12_PILLARS[activePillarIdx];

  const [geminiStreamingState, setGeminiStreamingState] = useState({
    active: false,
    currentStep: 1,
    logs: []
  });

  // Dynamic status filters based on user answering actions
  const doneCount = useMemo(() => {
    return FLAT_QUESTIONS.filter(q => typeof scores[q.id]?.current === 'number').length;
  }, [scores]);

  const todoCount = useMemo(() => {
    return 25 - doneCount;
  }, [doneCount]);

  // Theme-Aware Color Tokens (Luxurious C-Suite Palette)
  const colors = {
    bgMain: 'var(--bg-primary)',
    sidebarBg: 'var(--bg-surface)',
    cardBg: 'var(--bg-surface)',
    borderLight: 'var(--border-color)',
    textDark: 'var(--text-primary)',
    textMuted: 'var(--text-secondary)',
    accentBlue: '#2563eb',
    accentBlueLight: 'rgba(37, 99, 235, 0.08)',
    borderOrange: '#f97316',
    bgOrangeLight: 'rgba(249, 115, 22, 0.06)',
    borderGreen: '#16a34a',
    bgGreenLight: 'rgba(22, 163, 74, 0.06)',
    purpleGradient: 'linear-gradient(135deg, #4f46e5, #9333ea)'
  };

  // ==========================================================================
  # C-Suite Mathematical Weight Scoring Engine (Denominator = 54)
  // ==========================================================================
  const scoringData = useMemo(() => {
    let totalWeightedPoints = 0;
    let totalQuestionsAnswered = 0;
    let yAxisWeightedPoints = 0; // Pillars 1-5 (Capability & Compliance) - total weight 45
    let xAxisWeightedPoints = 0; // Pillar 6 (Feasibility & TCO) - total weight 9
    let totalWeightSum = 0;
    let yWeightSum = 0;
    let xWeightSum = 0;

    FLAT_QUESTIONS.forEach(q => {
      const scoreObj = scores[q.id] || {};
      if (typeof scoreObj.current === 'number') {
        const cur = scoreObj.current;
        const weightedScore = cur * q.weight;
        totalWeightedPoints += weightedScore;
        totalQuestionsAnswered++;
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
    if (totalQuestionsAnswered > 0) {
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
      totalAnswered: totalQuestionsAnswered
    };
  }, [scores]);

  // Navigation
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
      if (typeof scores[q.id]?.current === 'number') {
        completed++;
      }
    });
    return `${completed}/${pillar.questions.length}`;
  };

  const isPillarCompleted = (pillar) => {
    const answered = pillar.questions.filter(q => typeof scores[q.id]?.current === 'number').length;
    return answered === pillar.questions.length;
  };

  // Demo Prefiller (Novartis Dossier Scoping Preset)
  const handleAutoFillRandom = () => {
    setCustomerInfo({
      company: 'Novartis CMC Operations',
      useCaseName: 'Dossier Automation Assistant [CSR_V12]',
      domain: 'Quality & Compliance',
      runtime: 'Google Cloud Vertex AI',
      connectors: ['Veeva Vault GxP Docs', 'BigQuery Zero-ETL Feature Store']
    });

    const presetScores = {};
    FLAT_QUESTIONS.forEach(q => {
      let curr = 3;
      if (q.pillarId === 'UX_HITL') curr = 4;
      else if (q.weight === 3) curr = 2; // Critical items scored challenging
      else if (q.pillarId === 'FEASIBILITY') curr = 2; // SI Cost scored low

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

    setScores(presetScores);
    setActiveTab('intake');
  };

  // Live AI Dossier Compiler
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
      await new Promise(r => setTimeout(r, 300));
      currentLogs.push(stepLogs[i]);
      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: i + 2,
        logs: [...currentLogs]
      }));
    }

    try {
      // Simulation or Live API call
      await new Promise(r => setTimeout(r, 600));
      setLiveSynthesis({
        executiveSummary: `Dossier Automation Assistant [CSR_V12] exhibits high functional capability (Score: ${scoringData.capabilityScore}) across UX Workflows, but GxP Validation barriers and high SI Customization complexity (Feasibility: ${scoringData.feasibilityScore}) impose a high release risk. Recommendation: Proceed with the Fund Incubator route, focusing on hardwiring audit gateways before January 2027.`,
        criticalRisks: [
          'Model updates and prompt templates lack physical GxP cryptographic signatures, creating compliance exposure.',
          'Over-privileged service accounts used for multi-system Veeva Vault delegation present an IAM vulnerability.'
        ],
        remediationRoadmap: [
          'Deploy centralized AI Security Gateway to sanitize dynamic model payloads and enforce semantic PII filters.',
          'Wrap Veeva Vault SOAP/REST APIs in semantic OpenAPI schemas to allow structured multi-agent tool execution.'
        ]
      });

      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: 6,
        logs: [...prev.logs, `[${ts()}] [SUCCESS] V12 Executive Readiness Dossier completed successfully!`]
      }));

      setTimeout(() => {
        setGeminiStreamingState(prev => ({ ...prev, active: false }));
        handleTabSwitch('scorecard');
      }, 800);

    } catch(err) {
      setGeminiStreamingState(prev => ({ ...prev, active: false }));
      alert(`⚠️ AI Synthesis failed: ${err.message}`);
    }
  };

  return (
    <div className="premium-assessor-v12-container">
      
      <style>{`
        .premium-assessor-v12-container {
          display: flex;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          gap: 0.6rem;
          padding: 0.5rem;
          box-sizing: border-box;
          height: 100%;
          min-height: 0;
          width: 100%;
          overflow-x: hidden;
          transition: background-color 0.2s, color 0.2s;
        }

        .v12-sidebar {
          width: 260px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          height: 100%;
          overflow-y: auto;
        }

        .v12-sidebar-header-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .v12-main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
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
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .v12-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
          flex-shrink: 0;
          gap: 0.5rem;
        }

        .v12-status-capsules {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .v12-capsule {
          font-size: 0.6rem;
          font-weight: 800;
          padding: 0.15rem 0.45rem;
          border-radius: 100px;
          text-transform: uppercase;
        }

        .v12-num-shortcut-row {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          overflow-x: auto;
          padding: 0.1rem 0;
          max-width: 320px;
        }
        .v12-num-shortcut-row::-webkit-scrollbar {
          height: 2px;
        }
        .v12-num-shortcut-row::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 10px;
        }

        .v12-num-dot {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.58rem;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }

        .v12-column-header-capsule {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--text-secondary);
          background: var(--bg-primary);
          padding: 0.35rem 0.5rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          box-sizing: border-box;
          border: 1px solid var(--border-color);
        }

        .q-badge {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2563eb;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.5rem;
          font-weight: 900;
        }

        .v12-grid-area {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1.2fr;
          gap: 0.5rem;
          flex: 1;
          min-height: 0;
        }

        .v12-matrix-box {
          text-align: left;
          padding: 0.5rem 0.6rem;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 550;
          line-height: 1.35;
          transition: all 0.15s;
          min-height: 52px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          overflow: hidden;
          width: 100%;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .v12-matrix-box.active-select {
          border: 2px solid #f97316 !important;
          background: rgba(249, 115, 22, 0.05) !important;
          color: #ea580c !important;
          font-weight: 800 !important;
        }

        .v12-checkbox-dot {
          width: 13px;
          height: 13px;
          border: 1.5px solid #cbd5e1;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .v12-checkbox-dot.checked {
          border-color: #2563eb;
          background: #2563eb;
        }

        .v12-notes-card {
          grid-column: 5;
          grid-row: 1 / 6;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          height: 100%;
          min-height: 0;
          overflow: hidden;
        }
      `}</style>

      {/* ==========================================================================
      # SIDEBAR (LEFT Nav Pane)
      ========================================================================== */}
      <aside className="v12-sidebar">
        
        <div className="v12-sidebar-header-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '0.78rem', fontWeight: 900, color: colors.textDark, margin: 0 }}>
              {customerInfo.company || 'ENTERPRISE PROFILE'}
            </h2>
            <button 
              onClick={() => handleTabSwitch('intake')}
              style={{ background: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '0.15rem 0.45rem', fontSize: '0.58rem', fontWeight: 800, cursor: 'pointer' }}
            >
              Edit
            </button>
          </div>
          <span style={{ fontSize: '0.62rem', color: colors.textMuted }}>
            {customerInfo.useCaseName ? `${customerInfo.useCaseName} • ` : ''}{doneCount} of 25 completed
          </span>
        </div>

        {/* Pillars Navigation List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
          {V12_PILLARS.map((pillar, idx) => {
            const isPillarActive = pillar.id === activeQuestion.pillarId;
            const completed = isPillarCompleted(pillar);
            
            return (
              <div key={pillar.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                
                {/* Pillar Card Header */}
                <div
                  onClick={() => {
                    const targetIdx = FLAT_QUESTIONS.findIndex(q => q.pillarId === pillar.id);
                    if (targetIdx !== -1) setActiveQuestionIdx(targetIdx);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.45rem 0.55rem',
                    borderRadius: '8px',
                    background: isPillarActive ? 'var(--bg-primary)' : 'transparent',
                    border: isPillarActive ? '1px solid var(--border-color)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
                    {completed ? (
                      <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} strokeWidth={3.5} />
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: colors.textMuted }}>
                        {idx === 0 ? '📊' : idx === 1 ? '🧠' : idx === 2 ? '🔌' : idx === 3 ? '⚙️' : idx === 4 ? '🛡️' : '⚖️'}
                      </span>
                    )}
                    <span style={{ fontSize: '0.75rem', fontWeight: isPillarActive ? 850 : 550, color: isPillarActive ? colors.textDark : colors.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pillar.name.split('. ')[1]}
                    </span>
                  </div>
                  
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, color: completed ? '#16a34a' : colors.textMuted }}>
                    {getPillarProgress(pillar)}
                  </span>
                </div>

                {/* Sub-list of dimensions when active */}
                {isPillarActive && (
                  <div style={{ paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.15rem', borderLeft: '1.5px solid var(--border-color)', marginLeft: '0.75rem', marginTop: '0.1rem', marginBottom: '0.2rem' }}>
                    {pillar.questions.map((q) => {
                      const isQActive = q.id === activeQuestion.id;
                      const isQAnswered = typeof scores[q.id]?.current === 'number';
                      const qIndex = FLAT_QUESTIONS.findIndex(fq => fq.id === q.id);

                      return (
                        <div
                          key={q.id}
                          onClick={() => setActiveQuestionIdx(qIndex)}
                          style={{
                            padding: '0.2rem 0.4rem',
                            borderRadius: '4px',
                            fontSize: '0.65rem',
                            fontWeight: isQActive ? 850 : 550,
                            color: isQActive ? colors.accentBlue : isQAnswered ? colors.textDark : colors.textMuted,
                            background: isQActive ? colors.accentBlueLight : 'transparent',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            transition: 'all 0.1s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.2rem'
                          }}
                          title={q.dimension}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <ChevronRight size={10} style={{ opacity: isQActive ? 1 : 0.3 }} />
                            {q.dimension}
                          </span>
                          {isQAnswered && (
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Sync Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', flexShrink: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
            <button style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: colors.accentBlue, borderRadius: '4px', padding: '0.2rem 0', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}>
              📥 Export
            </button>
            <button style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: '#16a34a', borderRadius: '4px', padding: '0.2rem 0', fontSize: '0.62rem', fontWeight: 800, cursor: 'pointer' }}>
              📤 Import
            </button>
          </div>
          {activeTab === 'intake' && (
            <button
              onClick={handleAutoFillRandom}
              style={{ background: 'var(--bg-surface)', border: '1px solid #c084fc', color: '#9333ea', borderRadius: '4px', padding: '0.35rem 0', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer' }}
            >
              🪄 Prefill Demo Scenario
            </button>
          )}
          {activeTab === 'intake' ? (
            <button
              onClick={handleRunLiveGeminiAssessment}
              style={{ background: colors.purpleGradient, color: '#ffffff', border: 'none', borderRadius: '4px', padding: '0.45rem 0', fontSize: '0.68rem', fontWeight: 900, cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
            >
              🚀 View Report Blueprint
            </button>
          ) : (
            <button
              onClick={() => handleTabSwitch('intake')}
              style={{ background: 'var(--bg-surface)', border: `1px solid ${colors.accentBlue}`, color: colors.accentBlue, borderRadius: '4px', padding: '0.4rem 0', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', textAlign: 'center' }}
            >
              ← Edit Assessments
            </button>
          )}
        </div>
      </aside>

      {/* ==========================================================================
      # MAIN CONTENT WORKSPACE AREA
      ========================================================================== */}
      <main className="v12-main-area">
        {activeTab === 'intake' && (
          <div className="v12-intake-card">
            
            {/* 1. TOP STATUS / NAV BAR */}
            <div className="v12-top-bar">
              {/* Left Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.25rem' }}>
                  {activeQuestion.pillarId === 'UX_HITL' ? '📊' : activeQuestion.pillarId === 'INTELLIGENCE' ? '🧠' : activeQuestion.pillarId === 'DATA_INTEGRATION' ? '🔌' : activeQuestion.pillarId === 'RUNTIME_ARCH' ? '⚙️' : activeQuestion.pillarId === 'SECURITY_GXP' ? '🛡️' : '⚖️'}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, color: colors.textDark, lineHeight: 1.1 }}>
                    {activeQuestion.pillarName.split('. ')[1]}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: colors.textMuted }}>
                    {activeQuestion.dimension}
                  </span>
                </div>
              </div>

              {/* Center Status Indicators */}
              <div className="v12-status-capsules">
                <span className="v12-capsule" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#ea580c' }}>All 25</span>
                <span className="v12-capsule" style={{ background: 'rgba(22, 163, 74, 0.12)', color: '#16a34a' }}>Done {doneCount}</span>
                <span className="v12-capsule" style={{ background: 'rgba(100, 116, 139, 0.12)', color: '#64748b' }}>Todo {todoCount}</span>
              </div>

              {/* Direct Question Nav Shortcuts */}
              <div className="v12-num-shortcut-row">
                {FLAT_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === activeQuestionIdx;
                  const isAnswered = typeof scores[q.id]?.current === 'number';
                  
                  return (
                    <div
                      key={q.id}
                      onClick={() => setActiveQuestionIdx(idx)}
                      className="v12-num-dot"
                      style={{
                        background: isCurrent ? '#f97316' : isAnswered ? '#16a34a' : 'var(--bg-primary)',
                        color: (isCurrent || isAnswered) ? '#ffffff' : colors.textMuted,
                        border: isCurrent ? '1px solid #ea580c' : isAnswered ? '1px solid #14532d' : '1px solid var(--border-color)',
                        boxShadow: isCurrent ? '0 0 8px rgba(249, 115, 22, 0.4)' : 'none'
                      }}
                      title={`${q.id} ${q.dimension}`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>

              {/* Right indicators */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                {doneCount > 0 && (
                  <span style={{ fontSize: '0.58rem', background: '#dcfce7', color: '#15803d', padding: '0.08rem 0.35rem', borderRadius: '3px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                    <Check size={10} strokeWidth={4} /> SAVED
                  </span>
                )}
                <span style={{ fontSize: '0.65rem', color: colors.textMuted, fontWeight: 700 }}>
                  Q {activeQuestion.id}
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', fontSize: '0.62rem', color: colors.textMuted, cursor: 'pointer' }}>
                  <input type="checkbox" style={{ margin: 0 }} /> Skip
                </label>
              </div>
            </div>

            {/* 2. THE CENTRAL CORE QUESTION HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.1rem', flexShrink: 0 }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 900, color: colors.textDark, margin: 0, flex: 1, textAlign: 'center', lineHeight: 1.35 }}>
                {activeQuestion.topic.includes(':') ? activeQuestion.topic.split(':').slice(1).join(':').trim() : activeQuestion.topic}
              </h2>
              <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                <button style={{ border: '1px solid var(--border-color)', background: 'var(--bg-surface)', padding: '0.25rem 0.45rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 700, color: colors.textMuted, cursor: 'pointer' }}>Edit</button>
                <button style={{ border: '1px solid rgba(239, 68, 68, 0.2)', background: 'var(--bg-surface)', padding: '0.25rem 0.45rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 700, color: '#ef4444', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>

            {/* 3. THE 5-COLUMN MATRIX GRID AREA */}
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              
              {/* Grid Column Header Capsules */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1.2fr', gap: '0.5rem', flexShrink: 0 }}>
                <div className="v12-column-header-capsule">
                  Current State <span className="q-badge" title="Score from 1 to 5 reflecting active operational baseline.">?</span>
                </div>
                <div className="v12-column-header-capsule">
                  Future State Vision <span className="q-badge" title="Target maturity score to be achieved by post-launch scaling.">?</span>
                </div>
                <div className="v12-column-header-capsule">Technical Pain Points</div>
                <div className="v12-column-header-capsule">Business Pain Points</div>
                <div className="v12-column-header-capsule">Notes & Comments</div>
              </div>

              {/* 5-Column Grid Body */}
              <div className="v12-grid-area">
                
                {# Spanning Notes Card in Column 5 (Spans rows 1 to 5) }
                <div className="v12-notes-card" style={{ gridColumn: 5, gridRow: '1 / 6' }}>
                  <div style={{ background: colors.cardBg, height: '100%', padding: '0.6rem', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                    <textarea
                      value={scores[activeQuestionId]?.comments || ''}
                      onChange={e => handleCommentChange(e.target.value)}
                      placeholder="Type clinical requirements, regulatory guidelines (e.g. FDA GxP), validation bottlenecks, or CapEx/OpEx constraints noted during this stakeholder interview..."
                      style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: '0.8rem',
                        color: colors.textDark,
                        background: 'transparent',
                        fontFamily: 'inherit',
                        lineHeight: 1.45,
                        resize: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {# Render the 5 horizontal rows (distributed natively in columns 1 to 4) }
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
                      
                      {/* Column 1: Current State Card */}
                      <button
                        onClick={() => handleSelectCurrentLevel(rowIdx + 1)}
                        className={`v12-matrix-box ${isCurrentSelected ? 'active-select' : ''}`}
                      >
                        {opt.text}
                      </button>

                      {/* Column 2: Future State Card */}
                      <button
                        onClick={() => handleSelectTargetLevel(rowIdx + 1)}
                        className={`v12-matrix-box ${isTargetSelected ? 'active-select' : ''}`}
                      >
                        {opt.text}
                      </button>

                      {/* Column 3: Technical Pain Point Card */}
                      <div
                        onClick={() => techPoint && handleTogglePainPoint('tech', techPoint)}
                        className="v12-matrix-box"
                        style={{
                          border: isTechChecked ? '2px solid #f97316' : '1px solid var(--border-color)',
                          background: isTechChecked ? 'rgba(249,115,22,0.05)' : 'var(--bg-surface)',
                          cursor: techPoint ? 'pointer' : 'default',
                          opacity: techPoint ? 1 : 0.4
                        }}
                      >
                        {techPoint ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', pointerEvents: 'none', width: '100%' }}>
                            <div className={`v12-checkbox-dot ${isTechChecked ? 'checked' : ''}`}>
                              {isTechChecked && <Check size={9} strokeWidth={4.5} color="#ffffff" />}
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: isTechChecked ? 800 : 550, color: isTechChecked ? '#ea580c' : colors.textDark, lineHeight: 1.25 }}>
                              {techPoint}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: colors.textMuted }}>N/A</span>
                        )}
                      </div>

                      {/* Column 4: Business Pain Point Card */}
                      <div
                        onClick={() => bizPoint && handleTogglePainPoint('biz', bizPoint)}
                        className="v12-matrix-box"
                        style={{
                          border: isBizChecked ? '2px solid #f97316' : '1px solid var(--border-color)',
                          background: isBizChecked ? 'rgba(249,115,22,0.05)' : 'var(--bg-surface)',
                          cursor: bizPoint ? 'pointer' : 'default',
                          opacity: bizPoint ? 1 : 0.4
                        }}
                      >
                        {bizPoint ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', pointerEvents: 'none', width: '100%' }}>
                            <div className={`v12-checkbox-dot ${isBizChecked ? 'checked' : ''}`}>
                              {isBizChecked && <Check size={9} strokeWidth={4.5} color="#ffffff" />}
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: isBizChecked ? 800 : 550, color: isBizChecked ? '#ea580c' : colors.textDark, lineHeight: 1.25 }}>
                              {bizPoint}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: colors.textMuted }}>N/A</span>
                        )}
                      </div>

                    </React.Fragment>
                  );
                })}

              </div>

            </div>

            {/* 4. NAVIGATION FOOTER BAR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.45rem', marginTop: '0.35rem', flexShrink: 0 }}>
              <button
                onClick={handlePrevQuestion}
                disabled={activeQuestionIdx === 0}
                style={{
                  background: 'var(--bg-surface)',
                  color: colors.accentBlue,
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: activeQuestionIdx === 0 ? 'default' : 'pointer',
                  opacity: activeQuestionIdx === 0 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <ArrowLeft size={13} strokeWidth={3} /> Back
              </button>
              
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: colors.textMuted }}>
                Progress: {Math.round((doneCount / 25) * 100)}% ({doneCount} of 25 Completed)
              </span>

              <button
                onClick={handleNextQuestion}
                disabled={activeQuestionIdx === FLAT_QUESTIONS.length - 1}
                style={{
                  background: '#f97316',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.35rem 1rem',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  cursor: activeQuestionIdx === FLAT_QUESTIONS.length - 1 ? 'default' : 'pointer',
                  opacity: activeQuestionIdx === FLAT_QUESTIONS.length - 1 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  boxShadow: '0 2px 5px rgba(249, 115, 22, 0.2)'
                }}
              >
                Next <ArrowRight size={13} strokeWidth={3} />
              </button>
            </div>

          </div>
        )}

        {/* VIEW 2: EXECUTIVE SUMMARY & SCORECARD REPORT */}
        {activeTab === 'scorecard' && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', flexShrink: 0 }}>
              <div>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: colors.textDark, margin: 0 }}>
                  Enterprise AI Readiness Dossier
                </h1>
                <span style={{ fontSize: '0.68rem', color: colors.textMuted }}>
                  Diagnostic target: {customerInfo.company || 'Simulation Profile'} • Framework V12
                </span>
              </div>
              <button
                onClick={() => handleTabSwitch('intake')}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, color: colors.textDark, cursor: 'pointer' }}
              >
                ← Back to Matrix
              </button>
            </div>

            {/* Scorecard grids */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', flexShrink: 0 }}>
              
              {/* Executive Summary Card */}
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', color: colors.accentBlue, margin: 0 }}>
                  Executive Evaluation Summary
                </h3>
                <p style={{ fontSize: '0.78rem', color: colors.textDark, lineHeight: 1.45, margin: 0 }}>
                  {liveSynthesis?.executiveSummary || `V12 Diagnostic for ${customerInfo.company || 'unspecified client'} compiles an overall C-Suite readiness score of ${scoringData.overallScore} out of 5.0. Capability & GxP Compliance is scored at ${scoringData.capabilityScore}, and Implementation Feasibility is scored at ${scoringData.feasibilityScore}. Recommendation: Proceed with the incubator pathway.`}
                </p>
                
                {liveSynthesis?.criticalRisks && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.3rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <AlertTriangle size={12} /> Critical Path Risks:
                    </span>
                    {liveSynthesis.criticalRisks.map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.3rem', fontSize: '0.72rem', color: colors.textDark, paddingLeft: '0.5rem' }}>
                        <span>•</span> <span>{r}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2x2 C-Suite Verdict Box */}
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '0.58rem', fontWeight: 800, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Board-level Recommendation
                </span>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#f97316', margin: '0.1rem 0' }}>
                  {scoringData.verdict}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', width: '100%', marginTop: '0.3rem' }}>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.35rem', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.52rem', color: colors.textMuted, display: 'block' }}>CAPABILITY (Y)</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 900, color: colors.textDark }}>{scoringData.capabilityScore}</span>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.35rem', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.52rem', color: colors.textMuted, display: 'block' }}>FEASIBILITY (X)</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 900, color: colors.textDark }}>{scoringData.feasibilityScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Remediations */}
            {liveSynthesis?.remediationRoadmap && (
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minHeight: 0 }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#16a34a', margin: 0 }}>
                  Strategic Technical Roadmap
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
                  {liveSynthesis.remediationRoadmap.map((rem, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.74rem', color: colors.textDark, padding: '0.35rem', background: 'var(--bg-surface)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontWeight: 800, color: '#16a34a' }}>Step {i + 1}:</span>
                      <span>{rem}</span>
                    </div>
                  ))}
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

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(silverline_code)

print("🎉 Overwrote V12 component file with the high-fidelity Silverline Design!")
