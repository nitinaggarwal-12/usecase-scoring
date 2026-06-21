import re

file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

v11_pillars_full = """export const V11_PILLARS = [
  {
    id: 'UX_HITL',
    name: 'User Experience & Human-in-the-Loop (HITL) Workflow',
    weight: 20,
    persona: 'Business',
    purpose: 'Evaluates how marketers, creatives, and MLR reviewers interact with the AI without disrupting native workspaces or compromising oversight.',
    questions: [
      {
        id: 'UX_HITL.1',
        dimension: 'Native Workspace Integration',
        topic: '1.1 Native Workspace Integration: How do marketers and creatives interact with compliance constraints and generation tools?',
        currentOptions: [
          '1 (Manual): Manual PDF cross-referencing and separate portal logins.',
          '2 (Siloed): Basic plugins requiring users to toggle between AI chat and their creative canvas.',
          '3 (Integrated): Passive AI assistants embedded in the workspace (grammar/spell check only).',
          '4 (Agentic): Agentic streaming of generative compliance components directly into the UI.',
          '5 (Optimized): A single "pane of glass" orchestrates the entire lifecycle without leaving the primary application.'
        ],
        futureOptions: [
          '1 (Manual): Manual PDF cross-referencing and separate portal logins.',
          '2 (Siloed): Basic plugins requiring users to toggle between AI chat and their creative canvas.',
          '3 (Integrated): Passive AI assistants embedded in the workspace (grammar/spell check only).',
          '4 (Agentic): Agentic streaming of generative compliance components directly into the UI.',
          '5 (Optimized): A single "pane of glass" orchestrates the entire lifecycle without leaving the primary application.'
        ],
        businessPainpoints: [
          'Users refuse to leave native tools',
          'High context-switching overhead',
          'Fragmented user experience',
          'Manual copying errors between apps',
          'Low adoption of external portals'
        ],
        technicalPainpoints: [
          'Brittle iframe integrations',
          'No bidirectional state syncing',
          'Complex OAuth/SSO across apps',
          'Inability to embed components natively',
          'High latency in UI rendering'
        ]
      },
      {
        id: 'UX_HITL.2',
        dimension: 'Exception Handling & HITL',
        topic: '1.2 Exception Handling & HITL: How are legal, medical, and regulatory (MLR) exceptions handled?',
        currentOptions: [
          '1 (Manual): Content is manually emailed/uploaded for human review.',
          '2 (Siloed): AI flags issues, but humans manually correct and restart workflows.',
          '3 (Integrated): Automated draft generation with static alerts pushed to reviewers across tools.',
          '4 (Agentic): Event-driven dormancy gates automatically pause agents during human review and resume upon approval.',
          '5 (Optimized): Deep micro-editing; human edits in Veeva automatically cascade through the entire AI-generated asset.'
        ],
        futureOptions: [
          '1 (Manual): Content is manually emailed/uploaded for human review.',
          '2 (Siloed): AI flags issues, but humans manually correct and restart workflows.',
          '3 (Integrated): Automated draft generation with static alerts pushed to reviewers across tools.',
          '4 (Agentic): Event-driven dormancy gates automatically pause agents during human review and resume upon approval.',
          '5 (Optimized): Deep micro-editing; human edits in Veeva automatically cascade through the entire AI-generated asset.'
        ],
        businessPainpoints: [
          'Regulatory filings delayed by manual queues',
          'Lack of audit trail for overrides',
          'Reviewers overwhelmed by email alerts',
          'Inconsistent exception criteria',
          'High operational compliance risk'
        ],
        technicalPainpoints: [
          'No event-driven workflow pausing',
          'Lack of state preservation during dormancy',
          'No unified inbox for human reviewers',
          'Brittle webhook integrations with Veeva Vault',
          'Inability to roll back agent actions'
        ]
      },
      {
        id: 'UX_HITL.3',
        dimension: 'Audience Transparency',
        topic: '1.3 Audience Transparency & State AI Disclosure: How does the system handle automated insertion of consumer-facing AI transparency disclosures required by emerging 2026 U.S. state regulations?',
        currentOptions: [
          '1 (Manual): Marketers manually remember to add "AI-generated" disclaimers based on geolocation.',
          '2 (Siloed): Static disclaimers are hardcoded onto every asset, cluttering the creative.',
          '3 (Integrated): System flags AI usage, but marketers manually adjust legal text for the destination state.',
          '4 (Agentic): A Legal Routing Agent reads audience geolocation and appends state-mandated algorithmic transparency disclosures.',
          '5 (Optimized): Dynamic localization maps AI touchpoints to live regulatory databases, auto-rendering disclosures and generating Impact Assessment reports.'
        ],
        futureOptions: [
          '1 (Manual): Marketers manually remember to add "AI-generated" disclaimers based on geolocation.',
          '2 (Siloed): Static disclaimers are hardcoded onto every asset, cluttering the creative.',
          '3 (Integrated): System flags AI usage, but marketers manually adjust legal text for the destination state.',
          '4 (Agentic): A Legal Routing Agent reads audience geolocation and appends state-mandated algorithmic transparency disclosures.',
          '5 (Optimized): Dynamic localization maps AI touchpoints to live regulatory databases, auto-rendering disclosures and generating Impact Assessment reports.'
        ],
        businessPainpoints: [
          'Non-compliance with state AI laws',
          'Brand damage from clunky disclaimers',
          'High cost of manual legal reviews',
          'Geolocalized disclaimer errors',
          'Inability to track compliance audits'
        ],
        technicalPainpoints: [
          'Hardcoded compliance text',
          'Lack of geolocalized routing intelligence',
          'No dynamic connection to regulatory databases',
          'Inability to generate automated impact reports',
          'Vulnerability to prompt injection bypassing disclaimers'
        ]
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
        currentOptions: [
          '1 (Manual): Web-interface reliance on a single public model.',
          '2 (Siloed): Direct, hardcoded API integration with a single model provider.',
          '3 (Integrated): Model aggregator access, but routing requires manual developer intervention.',
          '4 (Agentic): Unified Model Garden routing tasks based on strengths (e.g., 1M-token for IVAs).',
          '5 (Optimized): Fully autonomous, cost-effective routing dynamically handled at runtime.'
        ],
        futureOptions: [
          '1 (Manual): Web-interface reliance on a single public model.',
          '2 (Siloed): Direct, hardcoded API integration with a single model provider.',
          '3 (Integrated): Model aggregator access, but routing requires manual developer intervention.',
          '4 (Agentic): Unified Model Garden routing tasks based on strengths (e.g., 1M-token for IVAs).',
          '5 (Optimized): Fully autonomous, cost-effective routing dynamically handled at runtime.'
        ],
        businessPainpoints: [
          'Vendor lock-in risks',
          'High API costs for large context windows',
          'Inability to leverage model strengths',
          'Slow model transition cycles',
          'System downtime due to vendor outage'
        ],
        technicalPainpoints: [
          'Hardcoded model API calls',
          'No dynamic failover routing',
          'Lack of unified abstraction layer',
          'Difficulty benchmarking model drift',
          'Brittle custom prompt templates per model'
        ]
      },
      {
        id: 'INT_REG.2',
        dimension: 'Brand Rule Application',
        topic: '2.2 MLR & Brand Rule Application: How are regulatory parameters (PhRMA codes) and brand guidelines enforced?',
        currentOptions: [
          '1 (Manual): Manual human memorization of static rulebooks.',
          '2 (Siloed): Rules hardcoded into system prompts, causing token bloat and hallucinations.',
          '3 (Integrated): Standard vector database retrieval, which misinterprets conflicting global/regional rules.',
          '4 (Agentic): Pre-trained context proxies enforce static constraints before generation.',
          '5 (Optimized): Progressive Disclosure dynamically loads conditional rules on-demand.'
        ],
        futureOptions: [
          '1 (Manual): Manual human memorization of static rulebooks.',
          '2 (Siloed): Rules hardcoded into system prompts, causing token bloat and hallucinations.',
          '3 (Integrated): Standard vector database retrieval, which misinterprets conflicting global/regional rules.',
          '4 (Agentic): Pre-trained context proxies enforce static constraints before generation.',
          '5 (Optimized): Progressive Disclosure dynamically loads conditional rules on-demand.'
        ],
        businessPainpoints: [
          'Frequent brand guideline violations',
          'Slowing time-to-market due to regulatory checks',
          'Conflicting rules across regions',
          'High cost of manual compliance audits',
          'Regulatory fines for non-compliant copy'
        ],
        technicalPainpoints: [
          'Monolithic prompt bloat',
          'High hallucination rate of rules',
          'Brittle semantic search over legal text',
          'Inability to trace rule firing events',
          'No local validation schema library'
        ]
      },
      {
        id: 'INT_REG.3',
        dimension: 'Fair Balance & AE',
        topic: '2.3 Fair Balance & AE Detection: How does the system ensure "Fair Balance" and detect Adverse Events?',
        currentOptions: [
          '1 (Manual): Manual copy/pasting of Important Safety Information (ISI); no AE detection.',
          '2 (Siloed): AI fetches ISI text, but humans verify formatting and prominence.',
          '3 (Integrated): Script-based appending via keyword matching that breaks on complex layouts.',
          '4 (Agentic): A Medical Safety Agent audits assets for Fair Balance and flags potential AEs to PV.',
          '5 (Optimized): Autonomous formatting dynamically integrates ISI with FDA-mandated prominence.'
        ],
        futureOptions: [
          '1 (Manual): Manual copy/pasting of Important Safety Information (ISI); no AE detection.',
          '2 (Siloed): AI fetches ISI text, but humans verify formatting and prominence.',
          '3 (Integrated): Script-based appending via keyword matching that breaks on complex layouts.',
          '4 (Agentic): A Medical Safety Agent audits assets for Fair Balance and flags potential AEs to PV.',
          '5 (Optimized): Autonomous formatting dynamically integrates ISI with FDA-mandated prominence.'
        ],
        businessPainpoints: [
          'Missed Adverse Event (AE) signals',
          'Procedural bypass of safety warnings',
          'Incorrect formatting of safety text',
          'Severe FDA warning letter risks',
          'Inability to audit PV review logs'
        ],
        technicalPainpoints: [
          'Lack of real-time pipeline monitoring',
          'Brittle keyword-based AE detection',
          'No automated layout prominence auditing',
          'Missing secure integration to PV portals',
          'Inability to ingest unstructured medical queries'
        ]
      },
      {
        id: 'INT_REG.4',
        dimension: 'Multimodal Compliance',
        topic: '2.4 Multimodal Compliance & Dual Modality Generation: How does the system comply with the FDA simultaneous audio/visual risk presentation?',
        currentOptions: [
          '1 (Manual): Audio/text generated separately and manually synced by video editors.',
          '2 (Siloed): AI generates both but lacks spatial/temporal awareness to sync voiceover to text.',
          '3 (Integrated): Scripted subtitles over audio that frequently violate FDA pacing/contrast mandates.',
          '4 (Agentic): A Multimodal Agent audits the video timeline against voiceover timestamp and duration.',
          '5 (Optimized): Autonomous Dual Modality seamlessly synchronizes audio pacing and visual prominence.'
        ],
        futureOptions: [
          '1 (Manual): Audio/text generated separately and manually synced by video editors.',
          '2 (Siloed): AI generates both but lacks spatial/temporal awareness to sync voiceover to text.',
          '3 (Integrated): Scripted subtitles over audio that frequently violate FDA pacing/contrast mandates.',
          '4 (Agentic): A Multimodal Agent audits the video timeline against voiceover timestamp and duration.',
          '5 (Optimized): Autonomous Dual Modality seamlessly synchronizes audio pacing and visual prominence.'
        ],
        businessPainpoints: [
          'Audio/video sync mismatch errors',
          'Non-compliance with FDA pacing mandates',
          'High video editing and validation costs',
          'Slow regulatory approval for rich media',
          'Inability to localize audio assets safely'
        ],
        technicalPainpoints: [
          'No unified multimodal token space',
          'Lack of exact voiceover time extraction',
          'Brittle separate text and audio models',
          'No automated timeline compliance checks',
          'Vulnerability to video-voiceover drift'
        ]
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
        currentOptions: [
          '1 (Manual): Manual copy/paste from master spreadsheets.',
          '2 (Siloed): Point-in-time static exports of claims databases.',
          '3 (Integrated): Custom API webhooks periodically sync data but lack citation mapping intelligence.',
          '4 (Agentic): Agentic RAG acts as the claims repository, auto-matching copy to approved Vault IDs.',
          '5 (Optimized): Direct integration via Model Context Protocol (MCP) queries live enterprise databases natively.'
        ],
        futureOptions: [
          '1 (Manual): Manual copy/paste from master spreadsheets.',
          '2 (Siloed): Point-in-time static exports of claims databases.',
          '3 (Integrated): Custom API webhooks periodically sync data but lack citation mapping intelligence.',
          '4 (Agentic): Agentic RAG acts as the claims repository, auto-matching copy to approved Vault IDs.',
          '5 (Optimized): Direct integration via Model Context Protocol (MCP) queries live enterprise databases natively.'
        ],
        businessPainpoints: [
          'Outdated claims in marketing assets',
          'High risk of unapproved scientific claims',
          'Inconsistent citation mapping',
          'Slow claims validation cycles',
          'High manual copy-paste error rate'
        ],
        technicalPainpoints: [
          'No real-time grounding verification',
          'Brittle database export pipelines',
          'No native connection to Veeva Vault API',
          'Inability to parse complex scientific tables',
          'Low semantic search accuracy over claims'
        ]
      },
      {
        id: 'DATA_SEM.2',
        dimension: 'Data Federation',
        topic: '3.2 Data Federation & Protocol Standardization: How does the orchestration layer connect to fragmented backend systems?',
        currentOptions: [
          '1 (Manual): Custom REST API wrappers manually written for every endpoint.',
          '2 (Siloed): Scheduled batch ETL pipelines dumping into localized cloud buckets.',
          '3 (Integrated): Centralized middleware handling brittle custom webhooks.',
          '4 (Agentic): Standardized open-source protocols exposing data platforms as native servers.',
          '5 (Optimized): Zero-trust semantic data mesh where agents autonomously negotiate schemas on the fly.'
        ],
        futureOptions: [
          '1 (Manual): Custom REST API wrappers manually written for every endpoint.',
          '2 (Siloed): Scheduled batch ETL pipelines dumping into localized cloud buckets.',
          '3 (Integrated): Centralized middleware handling brittle custom webhooks.',
          '4 (Agentic): Standardized open-source protocols exposing data platforms as native servers.',
          '5 (Optimized): Zero-trust semantic data mesh where agents autonomously negotiate schemas on the fly.'
        ],
        businessPainpoints: [
          'High integration engineering costs',
          'Data sync lag slowing operations',
          'Brittle custom connections breaking',
          'Fragmented enterprise data silos',
          'Vendor lock-in to middleware suites'
        ],
        technicalPainpoints: [
          'Brittle custom webhook routing',
          'High middleware operational debt',
          'Lack of protocol standardization',
          'Inability to negotiate dynamic schemas',
          'No distributed telemetry across endpoints'
        ]
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
        currentOptions: [
          '1 (Manual): A single massive LLM prompt attempting all tasks at once.',
          '2 (Siloed): Sequential chaining (agents pass tasks down the line slowly).',
          '3 (Integrated): Custom Python scripts orchestrating agents and manually handling state.',
          '4 (Agentic): Graph-based runtime organizing agents into deterministic reasoning loops.',
          '5 (Optimized): Fully managed multi-agent execution with native auto-scaling and cross-agent communication.'
        ],
        futureOptions: [
          '1 (Manual): A single massive LLM prompt attempting all tasks at once.',
          '2 (Siloed): Sequential chaining (agents pass tasks down the line slowly).',
          '3 (Integrated): Custom Python scripts orchestrating agents and manually handling state.',
          '4 (Agentic): Graph-based runtime organizing agents into deterministic reasoning loops.',
          '5 (Optimized): Fully managed multi-agent execution with native auto-scaling and cross-agent communication.'
        ],
        businessPainpoints: [
          'Monolithic prompt reasoning failures',
          'High latency in sequential agent runs',
          'Inability to audit multi-step agent decisions',
          'Complex task routing bottlenecks',
          'High failure rate of long reasoning chains'
        ],
        technicalPainpoints: [
          'Hardcoded orchestration scripts',
          'No standardized agent state sharing',
          'Lack of distributed trace telemetry',
          'No dynamic routing/re-routing gates',
          'Vulnerability to agent communication deadlock'
        ]
      },
      {
        id: 'RUN_STATE.2',
        dimension: 'State Persistence',
        topic: '4.2 State Persistence & Dormancy: How does the system manage memory during multi-day legal reviews?',
        currentOptions: [
          '1 (Manual): Sessions time out and require manual human restarts.',
          '2 (Siloed): Expensive "always-on" compute instances sitting idle.',
          '3 (Integrated): Custom serialization code dumping LLM memory to a database.',
          '4 (Agentic): Durable memory schemas snapping agent states natively to a NoSQL database.',
          '5 (Optimized): Cost-free event-driven hibernation and autonomous exact-context rehydration.'
        ],
        futureOptions: [
          '1 (Manual): Sessions time out and require manual human restarts.',
          '2 (Siloed): Expensive "always-on" compute instances sitting idle.',
          '3 (Integrated): Custom serialization code dumping LLM memory to a database.',
          '4 (Agentic): Durable memory schemas snapping agent states natively to a NoSQL database.',
          '5 (Optimized): Cost-free event-driven hibernation and autonomous exact-context rehydration.'
        ],
        businessPainpoints: [
          'High compute costs for idle sessions',
          'Memory loss during long human reviews',
          'Frustrated users re-entering inputs',
          'Inability to audit step-by-step history',
          'Delayed reviews due to session timeouts'
        ],
        technicalPainpoints: [
          'Brittle custom state serialization',
          'Monolithic computing instances lock-in',
          'No native event-driven hibernation',
          'Inability to hydrate precise context state',
          'High compute overhead for state recovery'
        ]
      },
      {
        id: 'RUN_STATE.3',
        dimension: 'A2A Interoperability',
        topic: '4.3 Third-Party Marketplace & A2A Interoperability: How are tasks orchestrated between internal and third-party SaaS agents?',
        currentOptions: [
          '1 (Manual): Humans copy outputs from one vendor to another.',
          '2 (Siloed): Rigid custom API wrappers bridging vendor platforms.',
          '3 (Integrated): Internal agents trigger basic external APIs as tools, but cannot delegate reasoning.',
          '4 (Agentic): Agent-to-Agent (A2A) protocols allow secure delegation of entire workflows.',
          '5 (Optimized): Dynamic discovery and provisioning of third-party capabilities natively.'
        ],
        futureOptions: [
          '1 (Manual): Humans copy outputs from one vendor to another.',
          '2 (Siloed): Rigid custom API wrappers bridging vendor platforms.',
          '3 (Integrated): Internal agents trigger basic external APIs as tools, but cannot delegate reasoning.',
          '4 (Agentic): Agent-to-Agent (A2A) protocols allow secure delegation of entire workflows.',
          '5 (Optimized): Dynamic discovery and provisioning of third-party capabilities natively.'
        ],
        businessPainpoints: [
          'Manual cross-vendor copy pasting',
          'High cost of custom SaaS integrations',
          'Lack of unified workflow view',
          'Data privacy leaks across vendor borders',
          'Slow negotiation of vendor service terms'
        ],
        technicalPainpoints: [
          'Hardcoded custom REST wrappers',
          'No standardized A2A protocol support',
          'Inability to delegate complex tasks',
          'Brittle token propagation across apps',
          'Lack of distributed trace tracking'
        ]
      },
      {
        id: 'RUN_STATE.4',
        dimension: 'Cost Governance',
        topic: '4.4 Agentic FinOps & Cost Governance: How are compute costs and massive token context windows capped?',
        currentOptions: [
          '1 (Manual): Month-end review of unreadable cloud invoices.',
          '2 (Siloed): Basic budget alerts that trigger post-spend.',
          '3 (Integrated): IT tracks total spend but cannot attribute it to specific campaigns.',
          '4 (Agentic): Token-aware routing minimizes prompt sizes with strict concurrency limits.',
          '5 (Optimized): Real-time FinOps roll-ups attribute spend directly and auto-cap.'
        ],
        futureOptions: [
          '1 (Manual): Month-end review of unreadable cloud invoices.',
          '2 (Siloed): Basic budget alerts that trigger post-spend.',
          '3 (Integrated): IT tracks total spend but cannot attribute it to specific campaigns.',
          '4 (Agentic): Token-aware routing minimizes prompt sizes with strict concurrency limits.',
          '5 (Optimized): Real-time FinOps roll-ups attribute spend directly and auto-cap.'
        ],
        businessPainpoints: [
          'No real-time token/cost visibility',
          'Massive budget overruns from loops',
          'Difficulty justifying GenAI ROI',
          'Inability to chargeback by division',
          'IT bottlenecking deployment due to costs'
        ],
        technicalPainpoints: [
          'No real-time token counters',
          'Lack of concurrency limit controls',
          'Brittle budget alert triggers',
          'No cost-effective token-routing mesh',
          'Inability to cache context dynamically'
        ]
      },
      {
        id: 'RUN_STATE.5',
        dimension: 'Platform Modernization',
        topic: '4.5 Platform Modernization & Deprecation Resilience: Is the architecture built on legacy ML endpoints or an agent-first platform?',
        currentOptions: [
          '1 (Manual): Reliance on hardcoded API calls to deprecated legacy ML endpoints.',
          '2 (Siloed): Manual translation layers forcing legacy pipelines to act like agents.',
          '3 (Integrated): Modern models deployed on traditional MLOps infrastructure.',
          '4 (Agentic): Built natively on modern Enterprise Agent Platforms.',
          '5 (Optimized): Complete decoupling of agent logic from the underlying platform.'
        ],
        futureOptions: [
          '1 (Manual): Reliance on hardcoded API calls to deprecated legacy ML endpoints.',
          '2 (Siloed): Manual translation layers forcing legacy pipelines to act like agents.',
          '3 (Integrated): Modern models deployed on traditional MLOps infrastructure.',
          '4 (Agentic): Built natively on modern Enterprise Agent Platforms.',
          '5 (Optimized): Complete decoupling of agent logic from the underlying platform.'
        ],
        businessPainpoints: [
          'High maintenance cost of legacy endpoints',
          'Slow rollout of modern model features',
          'Brittle translations causing errors',
          'Inability to scale infrastructure',
          'Frequent downtime during platform updates'
        ],
        technicalPainpoints: [
          'Hardcoded legacy API endpoints',
          'Lack of decoupling abstraction layers',
          'Complex infrastructure setup',
          'Inability to hot-swap backend LLMs',
          'No standardized agent interface APIs'
        ]
      },
      {
        id: 'RUN_STATE.6',
        dimension: 'Agent-as-Code',
        topic: '4.6 Agent-as-Code & Deterministic Change Control: How are agents version-controlled across environments?',
        currentOptions: [
          '1 (Manual): Prompts tweaked in UI consoles with no version history.',
          '2 (Siloed): Prompts in text files, but routing logic scattered across codebases.',
          '3 (Integrated): Code in Git, but multi-language environments create inconsistencies.',
          '4 (Agentic): "Agent-as-Code" methodology defined entirely via YAML configurations.',
          '5 (Optimized): Immutable deployments via CI/CD pipelines pushing signed schemas.'
        ],
        futureOptions: [
          '1 (Manual): Prompts tweaked in UI consoles with no version history.',
          '2 (Siloed): Prompts in text files, but routing logic scattered across codebases.',
          '3 (Integrated): Code in Git, but multi-language environments create inconsistencies.',
          '4 (Agentic): "Agent-as-Code" methodology defined entirely via YAML configurations.',
          '5 (Optimized): Immutable deployments via CI/CD pipelines pushing signed schemas.'
        ],
        businessPainpoints: [
          'Prompt tweaks breaking production',
          'No history of system prompt changes',
          'Inconsistent behavior across stages',
          'Regulatory non-compliance in changes',
          'High risk of unauthorized hotfixes'
        ],
        technicalPainpoints: [
          'No version control for prompts',
          'Scattered routing logic in code',
          'Lack of immutable build schemas',
          'No automated regression CI/CD',
          'Manual deployment pipeline friction'
        ]
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
        topic: '5.1 GxP Audit Trail & Data Provenance: How does the architecture log AI reasoning trails, track exact data provenance, and maintain real-time data freshness?',
        currentOptions: [
          '1 (Manual): Date verifications are manual, and outputs are copied with no record of reasoning.',
          '2 (Siloed): Basic application logs capture raw API payloads, and post-generation flagging identifies expired data.',
          '3 (Integrated): The system tracks asset fragments and uses daily automated sync scripts.',
          '4 (Agentic): Cryptographic IDs map agents to authorization policies, while real-time semantic caching drops revoked claims mid-flight.',
          '5 (Optimized): Native trace integration visually replays unbroken multi-agent execution spans alongside immutable GxP logs.'
        ],
        futureOptions: [
          '1 (Manual): Date verifications are manual, and outputs are copied with no record of reasoning.',
          '2 (Siloed): Basic application logs capture raw API payloads, and post-generation flagging identifies expired data.',
          '3 (Integrated): The system tracks asset fragments and uses daily automated sync scripts.',
          '4 (Agentic): Cryptographic IDs map agents to authorization policies, while real-time semantic caching drops revoked claims mid-flight.',
          '5 (Optimized): Native trace integration visually replays unbroken multi-agent execution spans alongside immutable GxP logs.'
        ],
        businessPainpoints: [
          'No record of reasoning or data lineage',
          'High risk of using expired claims',
          'Difficulty passing regulatory audits',
          'Audit trail data easily tampered',
          'High cost of manual data freshness checks'
        ],
        technicalPainpoints: [
          'No cryptographic trace logging',
          'Lack of real-time data cache validation',
          'No distributed trace propagation',
          'Missing immutable log storage',
          'Brittle daily sync cron scripts'
        ]
      },
      {
        id: 'SEC_VAL.2',
        dimension: 'API Guardrails',
        topic: '5.2 API Security & Guardrails: How are prompts and tool calls sanitized against injection and hallucinations?',
        currentOptions: [
          '1 (Manual): Reliance on consumer-grade LLM safety filters.',
          '2 (Siloed): Standard REST API Gateways lacking AI token inspection.',
          '3 (Integrated): Custom regex filters scrubbing PII before model hits.',
          '4 (Agentic): Enterprise AI proxies enforcing Model Armor protections.',
          '5 (Optimized): Zero-Trust ecosystem verifying every internal cross-agent API call.'
        ],
        futureOptions: [
          '1 (Manual): Reliance on consumer-grade LLM safety filters.',
          '2 (Siloed): Standard REST API Gateways lacking AI token inspection.',
          '3 (Integrated): Custom regex filters scrubbing PII before model hits.',
          '4 (Agentic): Enterprise AI proxies enforcing Model Armor protections.',
          '5 (Optimized): Zero-Trust ecosystem verifying every internal cross-agent API call.'
        ],
        businessPainpoints: [
          'Accidental exposure of patient PII',
          'Brand damage from jailbreak exploits',
          'Hallucinated scientific facts in copy',
          'Severe security compliance violations',
          'High risk of data exfiltration'
        ],
        technicalPainpoints: [
          'Consumer-grade safety filters only',
          'No real-time token/prompt inspection',
          'Brittle custom regex scrubbing layers',
          'Lack of Model Armor API gateways',
          'No mTLS verification between agents'
        ]
      },
      {
        id: 'SEC_VAL.3',
        dimension: 'Continuous Validation',
        topic: '5.3 AI Change Control & Continuous Validation: How is regression testing handled when foundation models update?',
        currentOptions: [
          '1 (Manual): Months of manual IQ/OQ/PQ paperwork per model update.',
          '2 (Siloed): Basic automated tests that freeze production during updates.',
          '3 (Integrated): CI/CD tests relying on static string-matching that fail on LLM non-determinism.',
          '4 (Agentic): "LLM-as-a-judge" framework running synthetic tests against a gold-standard rubric.',
          '5 (Optimized): Continuous Validation monitoring drift in real-time and generating signed, audit-ready reports.'
        ],
        futureOptions: [
          '1 (Manual): Months of manual IQ/OQ/PQ paperwork per model update.',
          '2 (Siloed): Basic automated tests that freeze production during updates.',
          '3 (Integrated): CI/CD tests relying on static string-matching that fail on LLM non-determinism.',
          '4 (Agentic): "LLM-as-a-judge" framework running synthetic tests against a gold-standard rubric.',
          '5 (Optimized): Continuous Validation monitoring drift in real-time and generating signed, audit-ready reports.'
        ],
        businessPainpoints: [
          'Months of delayed model upgrades',
          'High cost of manual QA paperwork',
          'Model drift breaking live features',
          'Production freeze during testing',
          'Lack of compliance-signed test reports'
        ],
        technicalPainpoints: [
          'No automated regression testing suite',
          'Brittle static string-match tests',
          'Lack of LLM-as-a-judge frameworks',
          'Inability to measure output drift',
          'Missing automated IQ/OQ/PQ document signing'
        ]
      },
      {
        id: 'SEC_VAL.4',
        dimension: 'Agentic IAM',
        topic: '5.4 Cross-Boundary Identity & Agentic IAM: How are user permissions enforced when delegating to third-party agents?',
        currentOptions: [
          '1 (Manual): Agents run on a single over-privileged service account.',
          '2 (Siloed): Hardcoded API keys for destination systems.',
          '3 (Integrated): Basic OAuth but unable to dynamically downgrade permissions per user.',
          '4 (Agentic): The invoking user\'s exact identity and permissions pass strictly across the A2A boundary.',
          '5 (Optimized): AI Gateways enforce context-aware access policies in real-time.'
        ],
        futureOptions: [
          '1 (Manual): Agents run on a single over-privileged service account.',
          '2 (Siloed): Hardcoded API keys for destination systems.',
          '3 (Integrated): Basic OAuth but unable to dynamically downgrade permissions per user.',
          '4 (Agentic): The invoking user\'s exact identity and permissions pass strictly across the A2A boundary.',
          '5 (Optimized): AI Gateways enforce context-aware access policies in real-time.'
        ],
        businessPainpoints: [
          'Over-privileged service account risks',
          'Unauthorized user data access',
          'Lack of dynamic context-aware security',
          'Severe tenant crossing vulnerabilities',
          'Inability to audit downstream user actions'
        ],
        technicalPainpoints: [
          'Hardcoded destination API keys',
          'No user identity propagation mesh',
          'Lack of dynamic role downgrade',
          'Brittle cross-tenant tokens validation',
          'Missing context-aware gateway checks'
        ]
      },
      {
        id: 'SEC_VAL.5',
        dimension: 'Sandbox Isolation',
        topic: '5.5 Supply Chain Security & Sandbox Isolation: How is the architecture secured against deserialization flaws?',
        currentOptions: [
          '1 (Manual): Shared compute instances with no dependency scanning.',
          '2 (Siloed): Reliance on basic IAM (vulnerable to RCE/deserialization flaws).',
          '3 (Integrated): Container vulnerability scanning prior to deployment, but arbitrary execution allowed.',
          '4 (Agentic): Tools execute exclusively within isolated Agent Sandboxes.',
          '5 (Optimized): Zero-trust execution cryptographically verifying loaded SDKs.'
        ],
        futureOptions: [
          '1 (Manual): Shared compute instances with no dependency scanning.',
          '2 (Siloed): Reliance on basic IAM (vulnerable to RCE/deserialization flaws).',
          '3 (Integrated): Container vulnerability scanning prior to deployment, but arbitrary execution allowed.',
          '4 (Agentic): Tools execute exclusively within isolated Agent Sandboxes.',
          '5 (Optimized): Zero-trust execution cryptographically verifying loaded SDKs.'
        ],
        businessPainpoints: [
          'High risk of Remote Code Execution (RCE)',
          'Supply chain dependency vulnerabilities',
          'Malicious tools compromising servers',
          'Lack of secure sandboxed execution',
          'High cost of manual container audits'
        ],
        technicalPainpoints: [
          'Shared compute instance perimeters',
          'No isolated runtime sandboxes',
          'Brittle container scanning hooks',
          'Lack of cryptographic SDK signature check',
          'Deserialization security vulnerabilities'
        ]
      },
      {
        id: 'SEC_VAL.6',
        dimension: 'Quality Unit (QU)',
        topic: '5.6 Quality Unit (QU) Non-Delegation & GxP Boundary Enforcement: How does the architecture prevent autonomous deployment without Quality Unit sign-off?',
        currentOptions: [
          '1 (Manual): Manual email routing leaving room for procedural bypass.',
          '2 (Siloed): Agents flag items, but lack systemic locks preventing deployment.',
          '3 (Integrated): AI confidence scores substituted for human sign-off on lower-tier risks.',
          '4 (Agentic): Strict separation of duties where AI drafts, but deployment gates remain locked.',
          '5 (Optimized): Cryptographic QU enforcement where deployment is natively rejected until a verified human QU signature is bound.'
        ],
        futureOptions: [
          '1 (Manual): Manual email routing leaving room for procedural bypass.',
          '2 (Siloed): Agents flag items, but lack systemic locks preventing deployment.',
          '3 (Integrated): AI confidence scores substituted for human sign-off on lower-tier risks.',
          '4 (Agentic): Strict separation of duties where AI drafts, but deployment gates remain locked.',
          '5 (Optimized): Cryptographic QU enforcement where deployment is natively rejected until a verified human QU signature is bound.'
        ],
        businessPainpoints: [
          'Procedural bypass risk for releases',
          'Accidental unauthorized deployment',
          'Audit trail gaps in release approvals',
          'High compliance liability for Quality Assurance',
          'Slow, manual release verification loops'
        ],
        technicalPainpoints: [
          'No hardwired deployment locks',
          'Lack of cryptographic signature binding',
          'Brittle email release approvals',
          'No automated quality gate checks',
          'Procedural bypass vulnerabilities'
        ]
      }
    ]
  }
];"""

# Replace V11_PILLARS constant at the top
content = re.sub(r'export const V11_PILLARS = \[.*?\n\];', v11_pillars_full, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("V11_PILLARS full schema written successfully!")
