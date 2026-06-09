import { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, Plus, Play, Check, RotateCcw, Trash2, Info, Layers, Code, ArrowLeft, ArrowRight, CheckCircle, HelpCircle, Clipboard, Mail, User, Users, FileText, BarChart, Award, Target, Zap, Globe, LogIn, ArrowLeft as BackIcon, Square, CheckSquare, Wand2, Printer, Compass, ChevronRight, Edit2, Terminal } from 'lucide-react';
import { generateMaturityReport } from '../services/aiService';

// 60-Question Database Mapped Exactly from Intake Specification
const PILLARS = [
  {
    key: 'STRATEGIC',
    name: 'Strategic Value & Business Alignment',
    description: 'Evaluating pipeline acceleration, executive backing, and regulatory labor considerations.',
    icon: '📊',
    questions: [
      {
        id: 'STRATEGIC.1',
        topic: 'ROI & Pipeline Acceleration: Evaluate the financial tracking and baseline measurement for this use case.',
        currentOptions: [
          '1. Unmeasured: No baseline or financial tracking exists.',
          '2. Anecdotal: Soft estimates of time or efficiency savings only.',
          '3. Operational: Standard metrics and basic hard-cost reductions are tracked.',
          '4. Automated: Direct financial impact (revenue/cost savings) is tracked automatically.',
          '5. Strategic: Real-time tracking tied directly to enterprise unit economics or clinical pipeline acceleration (e.g., faster time-to-market).'
        ],
        futureOptions: [
          '1. Establish baseline tracking',
          '2. Achieve soft time/efficiency savings',
          '3. Hard infrastructure/licensing cost reduction',
          '4. Direct revenue acceleration',
          '5. Enable a net-new strategic business model'
        ],
        businessPainpoints: [
          'Cannot justify IT spend',
          'Stagnant clinical pipeline speed',
          'High operational bloat',
          'Shadow IT spending',
          'Inability to prioritize investments'
        ],
        technicalPainpoints: [
          'No native telemetry',
          'Fragmented tracking across tools',
          'Manual data exports required',
          'Untrustworthy data',
          'Inability to isolate process compute costs'
        ]
      },
      {
        id: 'STRATEGIC.2',
        topic: 'Executive Sponsorship: Evaluate the level of leadership backing and dedicated resources.',
        currentOptions: [
          '1. Unfunded: Shadow IT or exploratory sandbox without official budget.',
          '2. Localized: Mid-level manager or localized pilot project.',
          '3. Departmental (Unfunded): Sponsored by a department head, but competing for limited IT bandwidth.',
          '4. Departmental (Funded): Fully funded departmental initiative with dedicated engineering resources.',
          '5. Enterprise: C-Suite mandated global or customer-facing rollout.'
        ],
        futureOptions: [
          '1. Unfunded: Shadow IT or exploratory sandbox without official budget.',
          '2. Localized: Mid-level manager or localized pilot project.',
          '3. Departmental (Unfunded): Sponsored by a department head, but competing for limited IT bandwidth.',
          '4. Departmental (Funded): Fully funded departmental initiative with dedicated engineering resources.',
          '5. Enterprise: C-Suite mandated global or customer-facing rollout.'
        ],
        businessPainpoints: [
          'Project stalls for budget',
          'Loss of momentum',
          'Competing vendor tools',
          'Misaligned executive goals',
          'High risk of cancellation'
        ],
        technicalPainpoints: [
          'Competing infrastructure priorities',
          'Lack of dedicated engineering',
          'Shifting architectural requirements',
          'Unclear security mandates',
          'Constant scope creep'
        ]
      },
      {
        id: 'STRATEGIC.3',
        topic: 'Change Management: Evaluate the end-user readiness to adopt the Gemini interface.',
        currentOptions: [
          '1. Resistant: Active user resistance to new tools; heavy reliance on legacy processes.',
          '2. Reluctant: Users will adopt only if forced via mandatory compliance.',
          '3. Neutral: Users will accept the tool with basic training, but lack enthusiasm.',
          '4. Eager: Self-service adoption driven by internal champions and active desire for better tools.',
          '5. Seamless: Tech-forward user base expecting a frictionless, AI-first workflow.'
        ],
        futureOptions: [
          '1. Resistant: Active user resistance to new tools; heavy reliance on legacy processes.',
          '2. Reluctant: Users will adopt only if forced via mandatory compliance.',
          '3. Neutral: Users will accept the tool with basic training, but lack enthusiasm.',
          '4. Eager: Self-service adoption driven by internal champions and active desire for better tools.',
          '5. Seamless: Tech-forward user base expecting a frictionless, AI-first workflow.'
        ],
        businessPainpoints: [
          'Low ROI due to non-usage',
          'High training costs',
          'Short-term productivity drop',
          'Employee frustration',
          'Help desk overwhelmed'
        ],
        technicalPainpoints: [
          'Legacy UI is hard to deprecate',
          'Lack of usage analytics',
          'Complex login/SSO friction',
          'Slow performance frustrates users',
          'Insufficient help-desk tooling'
        ]
      },
      {
        id: 'STRATEGIC.4',
        topic: 'Labor Relations & Works Councils: Evaluate the risk of labor injunctions due to AI altering job functions.',
        currentOptions: [
          '1. Unassessed: No consultation with HR or local Works Councils has occurred.',
          '2. High Risk: Tool monitors employee performance or replaces core job functions.',
          '3. Moderately Altering: AI alters daily tasks but does not actively evaluate the employee.',
          '4. AI as Assistant: Positioned purely as an opt-in assistant; cleared by HR.',
          '5. Fully Approved: Formal approval granted by European Works Councils and global labor boards.'
        ],
        futureOptions: [
          '1. Unassessed: No consultation with HR or local Works Councils has occurred.',
          '2. High Risk: Tool monitors employee performance or replaces core job functions.',
          '3. Moderately Altering: AI alters daily tasks but does not actively evaluate the employee.',
          '4. AI as Assistant: Positioned purely as an opt-in assistant; cleared by HR.',
          '5. Fully Approved: Formal approval granted by European Works Councils and global labor boards.'
        ],
        businessPainpoints: [
          'Imminent risk of union injunctions',
          'Employee privacy concerns',
          'Fear of job displacement',
          'Regional rollout delays',
          'Negative internal PR'
        ],
        technicalPainpoints: [
          'Inability to disable user tracking',
          'Lack of feature-flagging per region',
          'Tool enforces rigid workflows',
          'Forced software mandates',
          'Telemetry exposes individual performance'
        ]
      },
      {
        id: 'STRATEGIC.5',
        topic: 'Patient Safety & Blast Radius: Evaluate the regulatory and safety risk profile of the AI\'s output.',
        currentOptions: [
          '1. Catastrophic Risk: Direct impact on patient dosing, diagnosis, or adverse event reporting.',
          '2. High Risk: Drafting regulatory submissions (FDA/EMA) or GxP documentation.',
          '3. Moderate Risk: Internal R&D decision support; non-patient facing.',
          '4. Low Risk: Back-office administrative summarization.',
          '5. Zero Risk: General public information and basic IT Q&A.'
        ],
        futureOptions: [
          '1. Catastrophic Risk: Direct impact on patient dosing, diagnosis, or adverse event reporting.',
          '2. High Risk: Drafting regulatory submissions (FDA/EMA) or GxP documentation.',
          '3. Moderate Risk: Internal R&D decision support; non-patient facing.',
          '4. Low Risk: Back-office administrative summarization.',
          '5. Zero Risk: General public information and basic IT Q&A.'
        ],
        businessPainpoints: [
          'Catastrophic patient safety liability',
          'Risk of FDA warning letters',
          'Extreme QA burden',
          'Unacceptable hallucination tolerance',
          'Delayed regulatory filings'
        ],
        technicalPainpoints: [
          'No deterministic grounding',
          'Lack of mandatory Human-in-the-Loop workflows',
          'Inability to freeze model weights',
          'Unpredictable AI responses',
          'Complex validation requirements'
        ]
      }
    ]
  },
  {
    key: 'DATA',
    name: 'Data Readiness & Connectors',
    description: 'Evaluating scientific data complexity, edge compute constraints, and retrieval architecture.',
    icon: '🗄️',
    questions: [
      {
        id: 'DATA.1',
        topic: 'Cross-Cloud & OT/IT Accessibility: Evaluate the accessibility of external data sources (e.g., Azure, Veeva, On-Prem OT).',
        currentOptions: [
          '1. OT/Air-Gapped: Data locked on isolated Manufacturing OT networks.',
          '2. Legacy: Accessible via legacy protocols only (e.g., SOAP/XML, flat files).',
          '3. Closed Cloud: Cloud-hosted (Azure/Veeva) but locked behind strict VPNs/VPCs.',
          '4. Modern APIs: Standard REST APIs available over the internet.',
          '5. Native Integration: Data natively resides in Google Workspace or has plug-and-play connectors.'
        ],
        futureOptions: [
          '1. OT/Air-Gapped: Data locked on isolated Manufacturing OT networks.',
          '2. Legacy: Accessible via legacy protocols only (e.g., SOAP/XML, flat files).',
          '3. Closed Cloud: Cloud-hosted (Azure/Veeva) but locked behind strict VPNs/VPCs.',
          '4. Modern APIs: Standard REST APIs available over the internet.',
          '5. Native Integration: Data natively resides in Google Workspace or has plug-and-play connectors.'
        ],
        businessPainpoints: [
          '"Blind spots" for the AI',
          'High modernization costs',
          'Legal blocks on moving data',
          'Delays waiting for network approvals',
          'Cannot query live manufacturing data'
        ],
        technicalPainpoints: [
          'Legacy firewalls block Google IPs',
          'Strict IP allowlisting requirements',
          'Bridging the OT/IT divide securely',
          'Undocumented legacy APIs',
          'Lack of pagination in source APIs'
        ]
      },
      {
        id: 'DATA.2',
        topic: 'Scientific Data Richness & Modality: Evaluate the complexity of the proprietary data the model must process.',
        currentOptions: [
          '1. Fragmented Text: Messy, unstructured, text-only data.',
          '2. Standard Docs: Corporate PDFs, Word docs, and slide decks.',
          '3. Complex Media: Highly complex multi-column PDFs and diagrams requiring deep OCR.',
          '4. Proprietary Scientific: Chemical structures (SMILES), genomic sequences, and raw instrument telemetry (chromatograms).',
          '5. Massive Multimodal: Massive context data, including video, audio, and mixed scientific modalities.'
        ],
        futureOptions: [
          '1. Fragmented Text: Messy, unstructured, text-only data.',
          '2. Standard Docs: Corporate PDFs, Word docs, and slide decks.',
          '3. Complex Media: Highly complex multi-column PDFs and diagrams requiring deep OCR.',
          '4. Proprietary Scientific: Chemical structures (SMILES), genomic sequences, and raw instrument telemetry (chromatograms).',
          '5. Massive Multimodal: Massive context data, including video, audio, and mixed scientific modalities.'
        ],
        businessPainpoints: [
          'AI misses insights in chemical diagrams',
          'High licensing costs for separate OCR',
          'Inaccurate insights from LIMS/ELN data',
          'Manual review of raw telemetry is bottlenecking R&D',
          'Cannot process historical paper records'
        ],
        technicalPainpoints: [
          'Existing OCR pipelines fail on molecular structures',
          'Unrecognized legacy ELN file formats',
          'Context window limits',
          'Difficult to chunk mixed scientific media',
          'High cost of vectorizing complex datasets'
        ]
      },
      {
        id: 'DATA.3',
        topic: 'Ingestion & Fetch Strategy (A2A vs. MCP): Evaluate how data will move from the source to the Gemini model.',
        currentOptions: [
          '1. Manual: Users must manually download files and upload them to the AI.',
          '2. Heavy Sync (A2A): Nightly batch syncing of raw data into Google Cloud storage.',
          '3. Hybrid Sync: Syncing metadata only; files are fetched when needed.',
          '4. Event-Driven: Micro-batches or event-streaming updates to a vector database.',
          '5. Dynamic Fetch (MCP): Zero data duplication; Gemini fetches context via connectors dynamically at runtime.'
        ],
        futureOptions: [
          '1. Manual: Users must manually download files and upload them to the AI.',
          '2. Heavy Sync (A2A): Nightly batch syncing of raw data into Google Cloud storage.',
          '3. Hybrid Sync: Syncing metadata only; files are fetched when needed.',
          '4. Event-Driven: Micro-batches or event-streaming updates to a vector database.',
          '5. Dynamic Fetch (MCP): Zero data duplication; Gemini fetches context via connectors dynamically at runtime.'
        ],
        businessPainpoints: [
          'AI gives answers based on stale data',
          'Massive cloud egress fees',
          'Unacceptable UI latency while fetching',
          'Compliance violations from duplicating data',
          'Bloated infrastructure costs'
        ],
        technicalPainpoints: [
          'Syncing duplicates petabytes of data',
          'MCP runtime fetching is too slow',
          'A2A struggles to replicate granular folder permissions',
          'Keeping vector DBs fresh is an engineering nightmare',
          'Dependency on source API uptime'
        ]
      },
      {
        id: 'DATA.4',
        topic: 'Source System Search Quality: Evaluate the search capability of the external source system feeding the Gemini connector.',
        currentOptions: [
          '1. Broken: Source system (e.g., legacy Veeva/SAP) has no native search or it is completely broken.',
          '2. Basic Keyword: Exact-match keyword search only.',
          '3. Metadata Search: Search relies heavily on manually entered tags/metadata.',
          '4. Semantic Search: Standard natural language/semantic search capability.',
          '5. Optimized Enterprise Search: Highly tuned hybrid search (keyword + semantic + graph).'
        ],
        futureOptions: [
          '1. Broken: Source system (e.g., legacy Veeva/SAP) has no native search or it is completely broken.',
          '2. Basic Keyword: Exact-match keyword search only.',
          '3. Metadata Search: Search relies heavily on manually entered tags/metadata.',
          '4. Semantic Search: Standard natural language/semantic search capability.',
          '5. Optimized Enterprise Search: Highly tuned hybrid search (keyword + semantic + graph).'
        ],
        businessPainpoints: [
          '"Garbage in, garbage out"',
          'Users blame AI for legacy system search failures',
          'Wasted time re-prompting',
          'Loss of trust in the tool',
          'Critical documents consistently missed'
        ],
        technicalPainpoints: [
          'Source API returns irrelevant results to Gemini',
          'Missing metadata tags on source docs',
          'Connectors fail due to malformed queries',
          'Inability to tune search relevance on 3rd-party systems',
          'Source search lacks pagination'
        ]
      },
      {
        id: 'DATA.5',
        topic: 'Medical-Grade Multilingualism: Evaluate the need for precise localization of highly specialized clinical terminology.',
        currentOptions: [
          '1. Single Language: Entire workflow operates in a single, local language.',
          '2. Basic Translation: Standard corporate communication translated ad-hoc.',
          '3. Global Business: High-volume standard translation (e.g., internal emails, training docs).',
          '4. Clinical Localization: Requires precise translation of clinical trial protocols across regions.',
          '5. Regulated Multilingualism: Requires exact localization to standardized medical coding (e.g., MedDRA) across languages for FDA/EMA.'
        ],
        futureOptions: [
          '1. Single Language: Entire workflow operates in a single, local language.',
          '2. Basic Translation: Standard corporate communication translated ad-hoc.',
          '3. Global Business: High-volume standard translation (e.g., internal emails, training docs).',
          '4. Clinical Localization: Requires precise translation of clinical trial protocols across regions.',
          '5. Regulated Multilingualism: Requires exact localization to standardized medical coding (e.g., MedDRA) across languages for FDA/EMA.'
        ],
        businessPainpoints: [
          'Mistranslation altering drug risk profiles',
          'Delayed global trial coordination',
          'High external translation agency costs',
          'Inconsistent adverse event reporting',
          'Regulatory rejection due to poor localization'
        ],
        technicalPainpoints: [
          'LLM struggles with niche medical dialects',
          'Lack of custom dictionary enforcement',
          'Hallucinated translations of acronyms',
          'Poor OCR on foreign-language PDFs',
          'Complex multi-step translation pipelines required'
        ]
      }
    ]
  },
  {
    key: 'ARCHITECTURE',
    name: 'Architecture & Ecosystem',
    description: 'Evaluating API loads, cross-cloud latency, and the threshold of Agentic Write-Backs.',
    icon: '🔌',
    questions: [
      {
        id: 'ARCHITECTURE.1',
        topic: 'Ecosystem & UI Fit: Evaluate where the user will access the Gemini interface.',
        currentOptions: [
          '1. Disconnected: Standalone terminal or legacy thick-client desktop app.',
          '2. Fragmented Portals: Multiple web portals requiring separate logins.',
          '3. Intranet: Integrated into a corporate intranet but feels "bolted on."',
          '4. Standard SSO: Seamless web app access via enterprise Single Sign-On.',
          '5. Native Workspace: Natively embedded as a side-panel within the user\'s core productivity suite.'
        ],
        futureOptions: [
          '1. Disconnected: Standalone terminal or legacy thick-client desktop app.',
          '2. Fragmented Portals: Multiple web portals requiring separate logins.',
          '3. Intranet: Integrated into a corporate intranet but feels "bolted on."',
          '4. Standard SSO: Seamless web app access via enterprise Single Sign-On.',
          '5. Native Workspace: Natively embedded as a side-panel within the user\'s core productivity suite.'
        ],
        businessPainpoints: [
          'Low adoption due to context-switching',
          'Fragmented user experience',
          'Shadow IT solutions preferred',
          'Decreased productivity',
          'Poor accessibility compliance'
        ],
        technicalPainpoints: [
          'No SSO integration',
          'Mobile MDM blocks the app',
          'Browser compatibility issues',
          'Inability to pass deep links back to source apps',
          'Difficult session management'
        ]
      },
      {
        id: 'ARCHITECTURE.2',
        topic: 'Network Routing & Firewalls: Evaluate the network perimeter constraints for cross-cloud access.',
        currentOptions: [
          '1. Strict Inbound Blocks: Fully air-gapped or outbound-only proxies.',
          '2. Complex Proxies: Requires complex reverse-proxy routing to access.',
          '3. VPN Tunnels: Standard IPsec/VPN tunnels required for cross-cloud access.',
          '4. Private Cloud Perimeters: VPC Service Controls (VPC-SC) or Private Service Connect enabled.',
          '5. Zero-Trust Public: Standard secure TLS/HTTPS over the public internet.'
        ],
        futureOptions: [
          '1. Strict Inbound Blocks: Fully air-gapped or outbound-only proxies.',
          '2. Complex Proxies: Requires complex reverse-proxy routing to access.',
          '3. VPN Tunnels: Standard IPsec/VPN tunnels required for cross-cloud access.',
          '4. Private Cloud Perimeters: VPC Service Controls (VPC-SC) or Private Service Connect enabled.',
          '5. Zero-Trust Public: Standard secure TLS/HTTPS over the public internet.'
        ],
        businessPainpoints: [
          'Project stalled in network review',
          'High costs of dedicated interconnects',
          'System outages due to firewall rule changes',
          'Inability to scale to remote workers',
          'Compliance architecture failures'
        ],
        technicalPainpoints: [
          'InfoSec refuses inbound ports for Google connectors',
          'Complex routing causes packet drops',
          'Dynamic IP ranges break allowlists',
          'Lack of internal network engineering bandwidth',
          'Overlapping IP subnets between clouds'
        ]
      },
      {
        id: 'ARCHITECTURE.3',
        topic: 'Latency & UI Streaming: Evaluate performance expectations vs. generative AI streaming realities.',
        currentOptions: [
          '1. Sub-Second Sync: Workflow expects millisecond database-like responses (poor GenAI fit).',
          '2. Tolerates Delay: Users will tolerate 2-5 second wait times.',
          '3. Asynchronous: Architecture supports asynchronous processing (user notified when ready).',
          '4. Streaming UI: UI supports text streaming (words appear as they generate).',
          '5. Optimized Streaming: Highly cached, stream-optimized cross-cloud architecture.'
        ],
        futureOptions: [
          '1. Sub-Second Sync: Workflow expects millisecond database-like responses (poor GenAI fit).',
          '2. Tolerates Delay: Users will tolerate 2-5 second wait times.',
          '3. Asynchronous: Architecture supports asynchronous processing (user notified when ready).',
          '4. Streaming UI: UI supports text streaming (words appear as they generate).',
          '5. Optimized Streaming: Highly cached, stream-optimized cross-cloud architecture.'
        ],
        businessPainpoints: [
          'Users abandon prompts before finishing',
          'Unacceptable for live customer-facing ops',
          'Degraded brand perception',
          'Slower than doing task manually',
          'SLA breaches'
        ],
        technicalPainpoints: [
          'Round-trip time causes HTTP timeouts',
          'Large file transfers stall the connector',
          'Legacy custom apps lack streaming UI support',
          'High latency degrades voice interactions',
          'Inefficient API pagination slows retrieval'
        ]
      },
      {
        id: 'ARCHITECTURE.4',
        topic: 'Rate Limiting & API Quotas: Evaluate the source system\'s ability to handle automated API requests from the AI.',
        currentOptions: [
          '1. Legacy Hard Quotas: Strict API limits that will break immediately under AI load.',
          '2. Frequent Throttling: Source system frequently returns "429 Too Many Requests" errors.',
          '3. Middleware Backoff: Middleware handles throttling with exponential backoff retries.',
          '4. Caching Layers: Caching layers intercept redundant queries to protect source APIs.',
          '5. Auto-Scaling Limits: Unrestricted enterprise API agreements with auto-scaling throughput.'
        ],
        futureOptions: [
          '1. Legacy Hard Quotas: Strict API limits that will break immediately under AI load.',
          '2. Frequent Throttling: Source system frequently returns "429 Too Many Requests" errors.',
          '3. Middleware Backoff: Middleware handles throttling with exponential backoff retries.',
          '4. Caching Layers: Caching layers intercept redundant queries to protect source APIs.',
          '5. Auto-Scaling Limits: Unrestricted enterprise API agreements with auto-scaling throughput.'
        ],
        businessPainpoints: [
          '9 AM outages when everyone logs in',
          'Unexpected API overage bills',
          'Critical automated tasks fail silently',
          'IT help desk flooded with tickets',
          'Complete loss of user trust'
        ],
        technicalPainpoints: [
          'AI reads trigger aggressive Source throttling',
          'No queueing system if connector hits a limit',
          'Source system crashes under LLM load',
          'Hard to monitor cross-cloud API usage',
          'Throttling breaks multi-step agents'
        ]
      },
      {
        id: 'ARCHITECTURE.5',
        topic: 'Read-Only vs. Agentic Write-Back: Evaluate if the AI will execute state-changing actions in source systems (e.g., SAP, Veeva).',
        currentOptions: [
          '1. Deep Write-Back: AI autonomously updates inventory, orders API, or submits regulatory tickets.',
          '2. Approval Write-Back: AI drafts state changes but requires human click-to-approve execution.',
          '3. Local Export: AI exports summaries to local user files (Word/Excel) only.',
          '4. Strict Read-Only: AI fetches data but cannot push any data back to the source.',
          '5. Sandboxed Analysis: AI analyzes a securely isolated copy of data with zero connection back to source production.'
        ],
        futureOptions: [
          '1. Deep Write-Back: AI autonomously updates inventory, orders API, or submits regulatory tickets.',
          '2. Approval Write-Back: AI drafts state changes but requires human click-to-approve execution.',
          '3. Local Export: AI exports summaries to local user files (Word/Excel) only.',
          '4. Strict Read-Only: AI fetches data but cannot push any data back to the source.',
          '5. Sandboxed Analysis: AI analyzes a securely isolated copy of data with zero connection back to source production.'
        ],
        businessPainpoints: [
          'Irreversible supply chain errors',
          'AI hallucinates a regulatory submission',
          'Accidental deletion of clinical records',
          'Loss of transactional integrity',
          'Financial liability from autonomous agents'
        ],
        technicalPainpoints: [
          'Source APIs lack idempotency',
          'Complex deterministic rollback requirements',
          'Inability to test write-backs safely',
          'Managing agent state across failures',
          'Difficult to secure write-access OAuth tokens'
        ]
      }
    ]
  },
  {
    key: 'SECURITY',
    name: 'Security, Governance & Regulatory',
    description: 'Evaluating IP isolation, FDA explainability, and legal discovery.',
    icon: '🛡️',
    questions: [
      {
        id: 'SECURITY.1',
        topic: 'Data Boundary & IP Isolation: Evaluate regulatory constraints and the risk of Intellectual Property cross-contamination.',
        currentOptions: [
          '1. Extreme Isolation: ITAR, FedRAMP High, or strict IP silios preventing R&D cross-contamination.',
          '2. Regional Lock: Strict in-country data residency laws (e.g., EU GDPR localization).',
          '3. Commercial Sensitive: Standard commercial cloud, but handles highly sensitive PII/PHI.',
          '4. Internal Confidential: Standard corporate confidential; standard BAA/DPA agreements.',
          '5. Public/Non-Sensitive: Fully public or non-sensitive internal data.'
        ],
        futureOptions: [
          '1. Extreme Isolation: ITAR, FedRAMP High, or strict IP silios preventing R&D cross-contamination.',
          '2. Regional Lock: Strict in-country data residency laws (e.g., EU GDPR localization).',
          '3. Commercial Sensitive: Standard commercial cloud, but handles highly sensitive PII/PHI.',
          '4. Internal Confidential: Standard corporate confidential; standard BAA/DPA agreements.',
          '5. Public/Non-Sensitive: Fully public or non-sensitive internal data.'
        ],
        businessPainpoints: [
          'Cross-pollination of confidential R&D IP',
          'Massive regulatory fines',
          'Loss of enterprise contracts',
          'Project blocked by legal',
          'Inability to scale globally'
        ],
        technicalPainpoints: [
          'Connectors pull data into wrong regions',
          'Lack of CMEK support across clouds',
          'Difficulty proving data isn\'t training models',
          'Shadow IT data copying',
          'Complex data masking required'
        ]
      },
      {
        id: 'SECURITY.2',
        topic: 'Identity Propagation (RBAC): Evaluate how user permissions are passed through connectors to prevent the "God Mode" flaw.',
        currentOptions: [
          '1. Service Account (God Mode): Single connector account reads all files regardless of user.',
          '2. Hard-Coded: Hard-coded identity mapping tables managed manually.',
          '3. Group Access: Broad departmental or nested-group level access.',
          '4. Delegated OAuth 2.0: Secure OAuth token passing (Connector acts strictly as the user).',
          '5. Zero-Trust Federated: Fully federated, dynamic, per-prompt identity evaluation.'
        ],
        futureOptions: [
          '1. Service Account (God Mode): Single connector account reads all files regardless of user.',
          '2. Hard-Coded: Hard-coded identity mapping tables managed manually.',
          '3. Group Access: Broad departmental or nested-group level access.',
          '4. Delegated OAuth 2.0: Secure OAuth token passing (Connector acts strictly as the user).',
          '5. Zero-Trust Federated: Fully federated, dynamic, per-prompt identity evaluation.'
        ],
        businessPainpoints: [
          'Severe insider threat risks',
          'Leakage of HR/Executive files',
          'Failed InfoSec audits',
          'User lockouts',
          'Massive admin overhead'
        ],
        technicalPainpoints: [
          'Service accounts bypass native RBAC',
          'OAuth tokens expire and connectors fail silently',
          'Mapping cross-cloud identities is broken',
          'Source API lacks granular permissions',
          'Nested groups fail to propagate'
        ]
      },
      {
        id: 'SECURITY.3',
        topic: 'Model Safety & Indirect Prompt Injection: Evaluate defenses against hallucinations, toxicity, and poisoned source documents.',
        currentOptions: [
          '1. Unfiltered: Raw model outputs with no safety filters.',
          '2. Keyword Blocks: Basic, hard-coded keyword blocklists.',
          '3. Native Safety: Relying solely on the model\'s out-of-the-box safety settings.',
          '4. System Instructions: Strict managed instructions limiting tone and topical scope.',
          '5. Advanced Gateway: Active defenses including pre-ingestion scanning of source PDFs for indirect prompt injection and data poisoning.'
        ],
        futureOptions: [
          '1. Unfiltered: Raw model outputs with no safety filters.',
          '2. Keyword Blocks: Basic, hard-coded keyword blocklists.',
          '3. Native Safety: Relying solely on the model\'s out-of-the-box safety settings.',
          '4. System Instructions: Strict managed instructions limiting tone and topical scope.',
          '5. Advanced Gateway: Active defenses including pre-ingestion scanning of source PDFs for indirect prompt injection and data poisoning.'
        ],
        businessPainpoints: [
          'PR nightmares from toxic outputs',
          'Employees acting on hallucinated advice',
          'AI executes malicious commands hidden in PDFs',
          'Loss of confidence',
          'Overly restrictive filters make tool useless'
        ],
        technicalPainpoints: [
          'False positives block valid queries',
          'Prompt injection jailbreaks',
          'Model hallucinates facts not in source docs',
          'Tuning safety breaks the app',
          'Lack of visibility into blocked prompts'
        ]
      },
      {
        id: 'SECURITY.4',
        topic: 'Auditability & Deterministic Explainability: Evaluate the ability to trace an AI response back to immutable source documents for regulatory scrutiny.',
        currentOptions: [
          '1. Black Box: No logging; impossible to reconstruct an AI interaction.',
          '2. App Logs: Prompts and responses logged locally in the app.',
          '3. SIEM Export: Logs systematically exported to a central SIEM.',
          '4. Cross-System Correlation: Tracing connects a specific prompt to a specific file read.',
          '5. Deterministic Citation: AI response provides explicit, immutable citations back to the exact paragraph in a validated source document for FDA/EMA audit.'
        ],
        futureOptions: [
          '1. Black Box: No logging; impossible to reconstruct an AI interaction.',
          '2. App Logs: Prompts and responses logged locally in the app.',
          '3. SIEM Export: Logs systematically exported to a central SIEM.',
          '4. Cross-System Correlation: Tracing connects a specific prompt to a specific file read.',
          '5. Deterministic Citation: AI response provides explicit, immutable citations back to the exact paragraph in a validated source document for FDA/EMA audit.'
        ],
        businessPainpoints: [
          'Inability to pass FDA/EMA audits',
          'Cannot investigate breaches',
          'Lack of scientific explainability',
          'High SIEM licensing costs',
          'Risk-averse execs halt project'
        ],
        technicalPainpoints: [
          'Cannot correlate prompt to external file read',
          'Logging exposes PII',
          'Massive log volumes spike costs',
          'Disjointed timestamp formats',
          'LLM struggles to provide deterministic line-level citations'
        ]
      },
      {
        id: 'SECURITY.5',
        topic: 'GxP Validation & eDiscovery: Evaluate if the system requires 21 CFR Part 11 validation and legal hold integration.',
        currentOptions: [
          '1. Full GxP: System touches clinical trial data or adverse event reporting; mandates rigorous software validation.',
          '2. High Litigation Risk: Requires deep integration with enterprise eDiscovery/Legal Hold systems to freeze user chat histories.',
          '3. Standard Corporate: Standard data retention policies (e.g., auto-delete after 30 days).',
          '4. Low Risk: Internal collaboration only; no formal eDiscovery requirement.',
          '5. Ephemeral: Chats are entirely ephemeral and never saved to disk.'
        ],
        futureOptions: [
          '1. Full GxP: System touches clinical trial data or adverse event reporting; mandates rigorous software validation.',
          '2. High Litigation Risk: Requires deep integration with enterprise eDiscovery/Legal Hold systems to freeze user chat histories.',
          '3. Standard Corporate: Standard data retention policies (e.g., auto-delete after 30 days).',
          '4. Low Risk: Internal collaboration only; no formal eDiscovery requirement.',
          '5. Ephemeral: Chats are entirely ephemeral and never saved to disk.'
        ],
        businessPainpoints: [
          'Non-compliance with 21 CFR Part 11',
          'Legal inability to produce subpoenaed chat logs',
          'Extremely slow validation cycles',
          'Spoliation of evidence',
          'Disrupted R&D operations'
        ],
        technicalPainpoints: [
          'APIs lack eDiscovery hooks',
          'Inability to export specific user histories',
          'Hard to freeze data while maintaining system use',
          'Automated testing for GxP is complex',
          'Lack of change management controls'
        ]
      }
    ]
  },
  {
    key: 'EXECUTION',
    name: 'Execution, Evaluation & Operations',
    description: 'Evaluating Day 2 maintenance, SME bottlenecks, and GreenOps.',
    icon: '⚙️',
    questions: [
      {
        id: 'EXECUTION.1',
        topic: 'App & Prompt Configuration: Evaluate how system instructions and application behaviors are managed.',
        currentOptions: [
          '1. Ad-Hoc: Users must write and manage their own prompts from scratch.',
          '2. Shared Docs: Best-practice prompts shared via Word docs.',
          '3. Basic Library: Hard-coded prompt templates in the UI.',
          '4. Admin Configured: Global System Instructions configured in the Gemini Admin panel.',
          '5. Dynamic LLMOps: Version-controlled, role-based Agents/Gems with automated prompt evaluation.'
        ],
        futureOptions: [
          '1. Ad-Hoc: Users must write and manage their own prompts from scratch.',
          '2. Shared Docs: Best-practice prompts shared via Word docs.',
          '3. Basic Library: Hard-coded prompt templates in the UI.',
          '4. Admin Configured: Global System Instructions configured in the Gemini Admin panel.',
          '5. Dynamic LLMOps: Version-controlled, role-based Agents/Gems with automated prompt evaluation.'
        ],
        businessPainpoints: [
          'Inconsistent AI behavior',
          'Workflows break after model updates',
          'High support burden',
          'Wasted user time re-typing',
          'Cannot scale specialized workflows'
        ],
        technicalPainpoints: [
          'Admin console lacks bulk config',
          'Cannot A/B test system instructions',
          'Users override instructions with bad prompts',
          'No config version control',
          '"Prompt drift" degrades quality'
        ]
      },
      {
        id: 'EXECUTION.2',
        topic: 'SME Availability & Validation Bandwidth: Evaluate if top-tier scientific experts (not just IT) have dedicated time to validate AI outputs.',
        currentOptions: [
          '1. No SME Involvement: IT is building and evaluating the AI in a vacuum.',
          '2. Ad-Hoc Feedback: Scientists occasionally review outputs when they have free time.',
          '3. Allocated Hours: SMEs have formal billable hours allocated to test prompts.',
          '4. Dedicated Medical Lead: A dedicated Medical/Scientific Director owns the quality of the model.',
          '5. Automated SME Evaluation: SMEs have built ground-truth datasets for automated LLM-as-a-judge evaluation pipelines.'
        ],
        futureOptions: [
          '1. No SME Involvement: IT is building and evaluating the AI in a vacuum.',
          '2. Ad-Hoc Feedback: Scientists occasionally review outputs when they have free time.',
          '3. Allocated Hours: SMEs have formal billable hours allocated to test prompts.',
          '4. Dedicated Medical Lead: A dedicated Medical/Scientific Director owns the quality of the model.',
          '5. Automated SME Evaluation: SMEs have built ground-truth datasets for automated LLM-as-a-judge evaluation pipelines.'
        ],
        businessPainpoints: [
          'IT does not understand the scientific nuance',
          'Pilot fails due to lack of expert validation',
          'SMEs burn out testing the AI',
          'Delayed project timelines',
          'Poor adoption due to lack of trust'
        ],
        technicalPainpoints: [
          'No ground-truth datasets available',
          'Lack of LLMOps tooling for SME feedback',
          'Difficult to quantify output quality',
          'Over-reliance on qualitative "vibes"',
          'Long feedback loops'
        ]
      },
      {
        id: 'EXECUTION.3',
        topic: 'Omission Risk & False Negatives: Evaluate testing for "recall" to ensure the AI doesn\'t silently skip critical data during summarization.',
        currentOptions: [
          '1. Untested: No systematic testing for omitted information.',
          '2. Spot Checks: Manual spot-checking of large summaries.',
          '3. Precision Focused: Testing focuses only on hallucinations (false positives), not omissions.',
          '4. Recall Tested: Formal evaluation pipelines specifically check for missed facts (recall).',
          '5. Red Teamed: Aggressive adversarial red-teaming to intentionally force the model to omit critical adverse events.'
        ],
        futureOptions: [
          '1. Untested: No systematic testing for omitted information.',
          '2. Spot Checks: Manual spot-checking of large summaries.',
          '3. Precision Focused: Testing focuses only on hallucinations (false positives), not omissions.',
          '4. Recall Tested: Formal evaluation pipelines specifically check for missed facts (recall).',
          '5. Red Teamed: Aggressive adversarial red-teaming to intentionally force the model to omit critical adverse events.'
        ],
        businessPainpoints: [
          'Missed critical adverse events',
          'False sense of security',
          'Regulatory liability from false negatives',
          'Incomplete clinical summaries',
          'High manual rework required'
        ],
        technicalPainpoints: [
          'Hard to automate "recall" testing',
          'Context window truncation causes omissions',
          'LLM prioritizes brevity over completeness',
          'Poor chunking strategies split critical facts',
          'Complex validation rubrics'
        ]
      },
      {
        id: 'EXECUTION.4',
        topic: 'FinOps & GreenOps: Evaluate the ability to monitor API usage costs and track carbon/ESG impact.',
        currentOptions: [
          '1. Unmonitored: Pay-as-you-go with no financial or carbon alerting.',
          '2. Basic Alerts: Simple monthly budget ceiling alerts.',
          '3. Cross-Cloud Tracking: Active monitoring of egress fees from source systems to Google.',
          '4. Quota Enforced: Strict API usage quotas enforced at the user/department level.',
          '5. GreenOps & Unit Economics: Real-time dashboards correlating AI API costs and Scope 3 cloud emissions to corporate ESG targets.'
        ],
        futureOptions: [
          '1. Unmonitored: Pay-as-you-go with no financial or carbon alerting.',
          '2. Basic Alerts: Simple monthly budget ceiling alerts.',
          '3. Cross-Cloud Tracking: Active monitoring of egress fees from source systems to Google.',
          '4. Quota Enforced: Strict API usage quotas enforced at the user/department level.',
          '5. GreenOps & Unit Economics: Real-time dashboards correlating AI API costs and Scope 3 cloud emissions to corporate ESG targets.'
        ],
        businessPainpoints: [
          '"Bill shock" freezes project',
          'Unprofitable AI use cases',
          'Carbon footprint sabotages ESG commitments',
          'CFO halts rollout',
          'No chargeback capability'
        ],
        technicalPainpoints: [
          'Azure/AWS egress fees spike from MCP fetching',
          'Cannot attribute costs/emissions to specific users',
          'A2A polling drives compute costs',
          'Lack of granular billing tags',
          'Cannot forecast usage scaling'
        ]
      },
      {
        id: 'EXECUTION.5',
        topic: 'Lifecycle Maintenance & Model Pinning: Evaluate the Day-2 operations plan, including maintaining validation when foundation models update.',
        currentOptions: [
          '1. Forced Auto-Updates: Relying on the vendor to auto-update models, breaking validated state.',
          '2. Reactive Break-Fix: IT helpdesk responds to tickets when connectors or prompts fail.',
          '3. Short-Term Pinning: Ability to pin a model version for 6 months before forced migration.',
          '4. Long-Term Pinning: Ability to pin model weights for 1-3 years to satisfy regulatory GxP validation lifecycles.',
          '5. Automated Sandbox Migration: CI/CD pipeline tests the new model version against historical baselines before cutting over to maintain validation.'
        ],
        futureOptions: [
          '1. Forced Auto-Updates: Relying on the vendor to auto-update models, breaking validated state.',
          '2. Reactive Break-Fix: IT helpdesk responds to tickets when connectors or prompts fail.',
          '3. Short-Term Pinning: Ability to pin a model version for 6 months before forced migration.',
          '4. Long-Term Pinning: Ability to pin model weights for 1-3 years to satisfy regulatory GxP validation lifecycles.',
          '5. Automated Sandbox Migration: CI/CD pipeline tests the new model version against historical baselines before cutting over to maintain validation.'
        ],
        businessPainpoints: [
          'Forced model updates break GxP validation',
          'Frequent application downtime',
          'Loss of user trust',
          'High maintenance IT overhead',
          'SLA penalties'
        ],
        technicalPainpoints: [
          'Source APIs deprecate silently',
          'OAuth tokens require manual resets',
          'Prompt drift as models change',
          'Unclear error logs',
          'Hard to isolate if issue is network, API, or LLM'
        ]
      }
    ]
  }
];

// Dynamic demo prefilled datasets
const MATURITY_DEMO_SCENARIOS = {
  STRATEGIC: [
    "SAs confirmed Merck GSF has no automated dashboard to track baseline cycle times for protocol curation. Currently relying on manual log spreadsheets to estimate FTE savings, resulting in unmeasured operational bottlenecks.",
    "The project is fully sponsored by the VP of Clinical Operations and backed by a dedicated Year 1 sandbox budget, but engineering resources are currently shared with competing cloud database modernization initiatives.",
    "Clinical researchers expressed reluctancy due to past friction with complex LIMS interfaces. User champions are eager for conversational AI, but adoption will require embedded contextual micro-learning guides to prevent helpdesk overload.",
    "Initial alignment brief submitted to the European Works Council. Since the assistant strictly summarizes unstructured protocols and does not monitor individual investigator transaction speeds, labor risk is flagged as low/opt-in.",
    "Since outputs do not directly dictate patient dosing or adverse event diagnosis, blast radius is moderate. However, the assistant drafts FDA regulatory briefs, necessitating a mandatory, strict Human-in-the-Loop QA checkpoint."
  ],
  DATA: [
    "Source protocol documents reside securely in Veeva Vault and isolated SharePoint folders. Direct internet endpoints are blocked by Merck network firewalls, requiring private API gateways to secure data egress.",
    "Dataset contains highly complex multi-column PDFs, molecular compound diagrams (SMILES), and raw chromatography instrument logs. Basic parser scripts fail on chemical structures, necessitating custom Gemini multimodal vision schemas.",
    "GSF IT rejected daily batch replication of petabyte-scale LIMS archives due to data duplication compliance rules. SAs recommended a Model Context Protocol (MCP) server to fetch context dynamically at query runtime.",
    "Veeva's native keyword search returns high levels of noise, frequently missing historical trial reports. Gemini will rely on a hybrid search connector (semantic embeddings + parent-child metadata graph) to ensure recall.",
    "Clinical trials span multiple global sites in Germany and Japan. Translation must strictly adhere to standard medical terminologies (MedDRA coding) to prevent risk profile mistranslations during FDA filings."
  ],
  ARCHITECTURE: [
    "Clinical investigators actively resist logging into separate web terminals. The target architecture embeds Gemini as a native side-panel inside their daily electronic lab notebooks (ELN) via secure iframe widgets.",
    "GSF InfoSec prohibits allowlisting public cloud IP ranges. Egress traffic will be routed strictly through Google Private Service Connect (PSC) gateways connected via a dedicated Cloud Interconnect tunnel.",
    "Scientific summarization of 200-page protocols takes up to 12 seconds to generate. SAs implemented dynamic token-by-word UI streaming to maintain visual responsiveness and prevent users from abandoning hanging prompts.",
    "Backend LIMS database APIs enforce strict threshold quotas of 100 queries/minute. Token bucket queuing and exponential backoff are written into the MCP connector to protect backend systems from LLM traffic spikes.",
    "To mitigate safety and regulatory liabilities, write-backs to production LIMS and Veeva databases are strictly disabled. The assistant operates in a secure read-only sandboxed context, exporting reports as local draft files."
  ],
  SECURITY: [
    "GSF operates under rigorous IP isolation perimeters. All data processing and Vertex AI endpoint dispatches are geofenced within the europe-west9 region, satisfying strict European data sovereignty guidelines.",
    "InfoSec blocked generic service account access to prevent the 'God Mode' security vulnerability. Users will authenticate directly via delegated OAuth 2.0, ensuring they only see documents they have native permissions to access.",
    "To block malicious inputs hidden in uploaded clinical briefs, SAs implemented a pre-injection security gateway to scan PDFs for indirect prompt injection vectors and data poisoning payloads.",
    "FDA audits mandate total reproducibility. SAs mapped dynamic citation coordinate indexes to print the exact source document, page number, and paragraph highlighting alongside every AI recommendation.",
    "Because the tool touches regulated clinical documentation, it falls under GxP 21 CFR Part 11 guidelines. Every prompt template revision, tool schema update, and system instruction change must go through formal QA change control."
  ],
  EXECUTION: [
    "Managing prompts inside standard files was rejected due to version sync drift. SAs deployed a version-controlled LLMOps repository in GitHub, pushing verified system instructions directly to Gemini via CI/CD pipelines.",
    "Top-tier scientific researchers are currently bottlenecked by trial schedules. SAs secured 15 allocated hours per week from a Lead Medical Director to build the initial golden evaluation ground-truth datasets.",
    "Summarization algorithms frequently skip minor but critical safety alerts. SAs implemented adversarial red-teaming protocols to intentionally inject adverse event details and benchmark the model's recall accuracy.",
    "CFO required strict allocation of token compute costs back to individual discovery pipelines. SAs instrumented a dynamic chargeback dashboard in BigQuery, tracking token lengths and carbon emissions per run.",
    "Google Cloud's forced model upgrade schedules pose a massive risk to GxP validated states. SAs pinned the Gemini 2.5 Flash engine version for 18 months, scheduling automated regression testing prior to the next cutover."
  ]
};

// --- Standard Diagrams.net (Draw.io) Embed Iframe Wrapper ---
const DrawIoEmbed = ({ type, diagramXml, onSaveDiagram, pageIndex }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.origin !== 'https://embed.diagrams.net') return;
      
      try {
        const data = JSON.parse(e.data);
        
        if (data.event === 'init') {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({
              action: 'load',
              xml: diagramXml || ''
            }),
            'https://embed.diagrams.net'
          );
        } else if (data.event === 'save') {
          onSaveDiagram(data.xml);
          
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ action: 'status', message: 'Diagram Saved!' }),
            'https://embed.diagrams.net'
          );
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [diagramXml, onSaveDiagram]);

  const embedUrl = `https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&modified=unsaved&proto=json${pageIndex !== undefined ? `&page=${pageIndex}` : ''}`;

  return (
    <iframe
      ref={iframeRef}
      src={embedUrl}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        background: 'var(--bg-surface)'
      }}
      title={`Draw.io ${type} State Editor - Page ${pageIndex}`}
    />
  );
};

export default function MaturityAssessor({ 
  sessions = [], 
  activeSessionId = null, 
  onSaveSession = () => {}, 
  onLoadSession = () => {},
  onStartGenerating = () => {},
  onGeneratingStep = () => {},
  onEndGenerating = () => {},
  frameworkVersion = 'option5',
  onNewSession = () => {},
  onOpenTechnicalReport = () => {}
}) {
  // Override option6 questions dynamically at function mount!
  if (frameworkVersion === 'option6') {
    PILLARS.forEach(p => {
      p.questions.forEach(q => {
        q.currentOptions = [
          '1. Entirely unmeasured / No baseline',
          '2. Anecdotal estimates only',
          '3. Standard operational metrics tracked',
          '4. Automated hard cost/time savings tracking',
          '5. Real-time tracking tied directly to revenue'
        ];
        q.futureOptions = [
          '1. Establish baseline tracking',
          '2. Achieve soft time/efficiency savings',
          '3. Hard infrastructure/licensing cost reduction',
          '4. Direct revenue acceleration',
          '5. Enable a net-new strategic business model'
        ];
      });
    });
  }

  // --- Dynamic view modes instead of popups ---
  const [viewSubMode, setViewSubMode] = useState(() => window.location.hash.startsWith('#maturity-report') ? 'report' : 'setup'); // 'setup' | 'assessor' | 'blueprints' | 'report'
  const [simulatedRemediations, setSimulatedRemediations] = useState([]); // For 'What-If' Sensitivity simulator!
  const [activeExplorerTab, setActiveExplorerTab] = useState(0); // For Scoping Matrix deep-dive explorer!
  const [selectedDrilldownPillar, setSelectedDrilldownPillar] = useState(null); // Dynamic click to drill-down modal overlay!

  // Default XML topologies for diagrams.net (Draw.io) Current and Target states
  const defaultDrawIoCurrentXml = `<mxfile host="Embed" modified="2026-05-27" agent="Mozilla" version="21.0.0" type="embed">
  <diagram id="page1" name="Consolidated Current State">
    <mxGraphModel dx="1000" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="850" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- Legacy Corporate Network Boundary -->
        <mxCell id="google_cloud" value="Merck GSF - Legacy Corporate Network Perimeter" style="rounded=1;arcSize=8;fillColor=#FDF8F7;strokeColor=#EA4335;strokeWidth=2;dashed=1;dashPattern=6 6;fontStyle=1;fontColor=#C5221F;align=left;verticalAlign=top;spacingLeft=20;spacingTop=15;fontSize=12" vertex="1" parent="1">
          <mxGeometry x="200" y="50" width="1050" height="750" as="geometry" />
        </mxCell>
        
        <!-- Investigators -->
        <mxCell id="actor_employees" value="Clinical Investigators\n(ELN Workstations)" style="shape=mxgraph.gcp2.user;fillColor=none;strokeColor=none;fontColor=#334155;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25;fontStyle=1" vertex="1" parent="1">
          <mxGeometry x="40" y="385" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Legacy Custom Intake Portal Web Server -->
        <mxCell id="node_1_1" value="Custom Web Intake UI\n(Legacy IIS Server)" style="shape=mxgraph.gcp2.compute_engine;fillColor=#FFF0F0;strokeColor=#D32F2F;strokeWidth=2;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="60" y="335" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Unsecure Legacy Web proxy -->
        <mxCell id="node_1_2" value="Public Proxy Gateway\n(Legacy IIS Proxy)" style="shape=mxgraph.gcp2.api_gateway;fillColor=#FFF9E6;strokeColor=#F57F17;strokeWidth=2;fontColor=#E65100;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="240" y="185" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- On-prem active directory -->
        <mxCell id="node_1_4" value="LDAP Identity Server\n(Active Directory)" style="shape=mxgraph.gcp2.iam;fillColor=#FFF0F0;strokeColor=#D32F2F;strokeWidth=2;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="240" y="485" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Legacy SOAP External API gateway -->
        <mxCell id="legacy_soap" value="Legacy SOAP API Gateway\n(Veeva LIMS Bridge)" style="shape=mxgraph.gcp2.cloud_endpoints;fillColor=#FFF0F0;strokeColor=#D32F2F;strokeWidth=2;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="480" y="185" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Siloed compound spreadsheets -->
        <mxCell id="node_1_5" value="Siloed Spreadsheets\n(Shared SMB Folder)" style="shape=mxgraph.gcp2.cloud_storage;fillColor=none;strokeColor=none;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="760" y="335" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- On-prem Local LIMS database -->
        <mxCell id="onprem_db" value="On-Prem LIMS DB\n(Siloed SQL Server)" style="shape=mxgraph.gcp2.cloud_sql;fillColor=none;strokeColor=none;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="760" y="185" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Manual PDF File Extraction -->
        <mxCell id="pdf_doc" value="Clinical Trial PDFs\n(Local Investigator Docs)" style="shape=mxgraph.gcp2.bigquery;fillColor=none;strokeColor=none;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="480" y="485" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Connective Edges -->
        <mxCell id="edge_1_1" value="HTTPS queries" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=2;dashed=1;fontColor=#D32F2F;fontSize=10;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="actor_employees" target="node_1_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_2" value="Basic LDAP Check" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=1.5;dashed=1;fontColor=#D32F2F;fontSize=9;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="node_1_1" target="node_1_4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_3" value="SOAP XML Call" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#5F6368;strokeWidth=1.5;fontColor=#3C4043;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="node_1_1" target="node_1_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_4" value="HTTP SOAP passthrough" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#5F6368;strokeWidth=1.5;fontColor=#3C4043;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="node_1_2" target="legacy_soap">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_5" value="Manual SQL Queries" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=1.5;dashed=1;fontColor=#D32F2F;fontSize=9;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="legacy_soap" target="onprem_db">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_6" value="Manual spreadsheet inputs" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=1.5;dashed=1;fontColor=#D32F2F;fontSize=9;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="onprem_db" target="node_1_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_7" value="Manual text extraction" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=1.5;dashed=1;fontColor=#D32F2F;fontSize=9;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="pdf_doc" target="node_1_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
 
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
  const defaultDrawIoTargetXml = `<mxfile host="Embed" modified="2026-05-27" agent="Mozilla" version="21.0.0" type="embed">
  <diagram id="page1" name="Consolidated Target State">
    <mxGraphModel dx="1000" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="850" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- GCP Geofenced Widescreen GDPR VPC-SC Network Boundary Container -->
        <mxCell id="gcp_vpc" value="Google Cloud Platform - Europe-West9 (Paris) Sovereignty VPC Service Controls" style="rounded=1;arcSize=8;fillColor=#F8F9FA;strokeColor=#4285F4;strokeWidth=2;dashed=1;dashPattern=8 8;fontStyle=1;fontColor=#1A73E8;align=left;verticalAlign=top;spacingLeft=20;spacingTop=15;fontSize=12" vertex="1" parent="1">
          <mxGeometry x="200" y="50" width="1120" height="750" as="geometry" />
        </mxCell>
        
        <!-- Investigators -->
        <mxCell id="actor_eln" value="Clinical Investigators\n(Native Workspace UI)" style="shape=mxgraph.gcp2.user;fillColor=none;strokeColor=none;fontColor=#1E3A8A;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25;fontStyle=1" vertex="1" parent="1">
          <mxGeometry x="40" y="385" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Gemini Enterprise Apps Workspace UI Panel Widget -->
        <mxCell id="eln_widget" value="Workspace SDK Sidebar\n(Native ELN Panel)" style="shape=mxgraph.gcp2.app_engine;fillColor=#EBF5FF;strokeColor=#1D4ED8;strokeWidth=2;fontColor=#1E3A8A;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="gcp_vpc">
          <mxGeometry x="50" y="335" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Apigee Rate-limiting token-bucket gateway proxy -->
        <mxCell id="apigee_proxy" value="Apigee Gateway\n(Token-Bucket Buffer)" style="shape=mxgraph.gcp2.apigee;fillColor=#FDF2F2;strokeColor=#9B1C1C;strokeWidth=2;fontColor=#9B1C1C;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="gcp_vpc">
          <mxGeometry x="220" y="185" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Vertex AI Model Armor Prompt Firewall Gateway -->
        <mxCell id="model_armor" value="Vertex AI Model Armor\n(PHI / Injection Firewall)" style="shape=mxgraph.gcp2.security_scanner;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=2.5;fontColor=#92400E;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25;fontStyle=1" vertex="1" parent="gcp_vpc">
          <mxGeometry x="400" y="335" width="85" height="80" as="geometry" />
        </mxCell>
 
        <!-- Serverless Cloud Run MCP Database Connectors -->
        <mxCell id="cloudrun_mcp" value="Cloud Run MCP Server\n(Zero-Dossier Local Connectors)" style="shape=mxgraph.gcp2.cloud_run;fillColor=#EEF2F6;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="gcp_vpc">
          <mxGeometry x="600" y="185" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- AlloyDB AI pgvector high-scale graph embeddings -->
        <mxCell id="alloydb_vector" value="AlloyDB AI (pgvector)\n(LIMS Compound Graph)" style="shape=mxgraph.gcp2.alloy_db;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=2.5;fontColor=#065F46;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25;fontStyle=1" vertex="1" parent="gcp_vpc">
          <mxGeometry x="860" y="185" width="85" height="80" as="geometry" />
        </mxCell>
 
        <!-- Document AI Molecular SMILES Diagrams workbench -->
        <mxCell id="document_ai" value="Document AI Workbench\n(Molecule Drawings OCR)" style="shape=mxgraph.gcp2.document_ai;fillColor=#EEF2F6;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="gcp_vpc">
          <mxGeometry x="600" y="485" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- NotebookLM Enterprise Document indexes and Coordinate Citations -->
        <mxCell id="notebook_lm" value="NotebookLM Enterprise\n(multimodal Audiable Citations)" style="shape=mxgraph.gcp2.notebooks;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=2;fontColor=#065F46;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="gcp_vpc">
          <mxGeometry x="860" y="485" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Centralized GitHub Prompt CI/CD pipelines -->
        <mxCell id="github_prompts" value="GitHub Prompt Registry\n(Central version-control CI/CD)" style="shape=mxgraph.gcp2.cloud_build;fillColor=#EEF2F6;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="gcp_vpc">
          <mxGeometry x="220" y="485" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Vertex Evaluation Harness LLM-as-a-judge -->
        <mxCell id="eval_harness" value="Vertex AI Eval Harness\n(SME Golden Benchmarks)" style="shape=mxgraph.gcp2.automl_natural_language;fillColor=#FFF8F8;strokeColor=#E05252;strokeWidth=2;fontColor=#9C2424;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="gcp_vpc">
          <mxGeometry x="1020" y="335" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Connective Edges -->
        <mxCell id="edge_2_1" value="Native ELN Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1D4ED8;strokeWidth=2.5;fontColor=#1E3A8A;fontSize=10;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="actor_eln" target="eln_widget">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_2" value="Apigee rate-limit check" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1D4ED8;strokeWidth=2;fontColor=#1E3A8A;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="eln_widget" target="apigee_proxy">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_3" value="Shielded Egress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D97706;strokeWidth=2.5;fontColor=#92400E;fontSize=10;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="eln_widget" target="model_armor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_4" value="Dynamic MCP Fetch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="model_armor" target="cloudrun_mcp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_5" value="pgvector Graph Grounding" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#059669;strokeWidth=2;fontColor=#065F46;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="cloudrun_mcp" target="alloydb_vector">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_6" value="Multimodal OCR tables extraction" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="eln_widget" target="document_ai">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_7" value="Dynamic coordinate citations indexing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#059669;strokeWidth=2;fontColor=#065F46;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="document_ai" target="notebook_lm">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_8" value="Push prompt templates" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="github_prompts" target="model_armor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <!-- Connective Edges -->
        <mxCell id="edge_2_1" value="Native ELN Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1D4ED8;strokeWidth=2.5;fontColor=#1E3A8A;fontSize=10;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="actor_eln" target="eln_widget">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_2" value="Apigee rate-limit check" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1D4ED8;strokeWidth=2;fontColor=#1E3A8A;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="eln_widget" target="apigee_proxy">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_3" value="Shielded Egress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D97706;strokeWidth=2.5;fontColor=#92400E;fontSize=10;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="eln_widget" target="model_armor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_4" value="Dynamic MCP Fetch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="model_armor" target="cloudrun_mcp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_5" value="pgvector Graph Grounding" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#059669;strokeWidth=2;fontColor=#065F46;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="cloudrun_mcp" target="alloydb_vector">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_6" value="Multimodal OCR tables extraction" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="eln_widget" target="document_ai">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_7" value="Dynamic coordinate citations indexing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#059669;strokeWidth=2;fontColor=#065F46;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="document_ai" target="notebook_lm">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_8" value="Push prompt templates" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="github_prompts" target="model_armor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_9" value="Run Golden regression evals" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#E05252;strokeWidth=2;fontColor=#9C2424;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="model_armor" target="eval_harness">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
 
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  const defaultDrawIoProdCurrentXml = `<mxfile host="Embed" modified="2026-05-27" agent="Mozilla" version="21.0.0" type="embed">
  <diagram id="page1" name="Production-Grade Single Agent">
    <mxGraphModel dx="1000" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="850" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- GCP Single-Agent Boundary Container -->
        <mxCell id="google_cloud" value="Google Cloud Platform - Europe-West9 Single-Agent Discovery Environment" style="rounded=1;arcSize=8;fillColor=#FDF8F7;strokeColor=#EA4335;strokeWidth=2;dashed=1;dashPattern=6 6;fontStyle=1;fontColor=#C5221F;align=left;verticalAlign=top;spacingLeft=20;spacingTop=15;fontSize=12" vertex="1" parent="1">
          <mxGeometry x="200" y="50" width="1050" height="750" as="geometry" />
        </mxCell>
        
        <!-- Users -->
        <mxCell id="actor_employees" value="Clinical Investigators\n(11,000 Active Users)" style="shape=mxgraph.gcp2.user;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#334155;fontStyle=1" vertex="1" parent="1">
          <mxGeometry x="40" y="385" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Frontend Framework -->
        <mxCell id="frontend_framework" value="React &amp;amp; Streamlit\n(Frontend Framework)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#C62828;fontStyle=1" vertex="1" parent="google_cloud">
          <mxGeometry x="80" y="140" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Frontend Application -->
        <mxCell id="frontend_app" value="Intake &amp;amp; Scoping App\n(Frontend Application)" style="shape=mxgraph.gcp2.compute_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#C62828;fontStyle=1" vertex="1" parent="google_cloud">
          <mxGeometry x="80" y="340" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Agent Runtime Container -->
        <mxCell id="agent_runtime" value="Agent Runtime (Cloud Run)" style="rounded=1;arcSize=8;fillColor=#E8F0FE;strokeColor=#4285F4;strokeWidth=1.5;fontStyle=1;fontColor=#1A73E8;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;fontSize=10" vertex="1" parent="google_cloud">
          <mxGeometry x="260" y="240" width="280" height="280" as="geometry" />
        </mxCell>
        
        <!-- Single Agent developed with ADK -->
        <mxCell id="node_agent" value="Single Discovery Agent\n(ADK Framework logic)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#385723;fontStyle=1" vertex="1" parent="agent_runtime">
          <mxGeometry x="100" y="80" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Model Runtime Box -->
        <mxCell id="model_runtime" value="Model Runtime (Vertex AI)" style="rounded=1;arcSize=5;fillColor=#FFF2CC;strokeColor=#D97706;strokeWidth=2;fontStyle=1;fontColor=#B25900;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;fontSize=11" vertex="1" parent="google_cloud">
          <mxGeometry x="260" y="550" width="280" height="180" as="geometry" />
        </mxCell>
        
        <!-- AI Model -->
        <mxCell id="ai_model" value="Gemini 2.5 Flash\n(Reasoning Engine)" style="shape=mxgraph.gcp2.automl_natural_language;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#B25900;fontStyle=1" vertex="1" parent="model_runtime">
          <mxGeometry x="100" y="50" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Memory Container -->
        <mxCell id="memory_container" value="Memory (Memorystore for Redis)" style="rounded=1;arcSize=8;fillColor=#E8F0FE;strokeColor=#4285F4;strokeWidth=1.5;fontStyle=1;fontColor=#1A73E8;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;fontSize=10" vertex="1" parent="google_cloud">
          <mxGeometry x="620" y="80" width="380" height="200" as="geometry" />
        </mxCell>
        
        <!-- Short-Term Memory -->
        <mxCell id="memory_short" value="Short-Term Memory\n(Active Session State)" style="shape=mxgraph.gcp2.iam;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#C65911;fontStyle=1" vertex="1" parent="memory_container">
          <mxGeometry x="60" y="60" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Long-Term Memory -->
        <mxCell id="memory_long" value="Long-Term Memory\n(Memory Bank Context)" style="shape=mxgraph.gcp2.iam;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#C65911;fontStyle=1" vertex="1" parent="memory_container">
          <mxGeometry x="240" y="60" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Tools Container -->
        <mxCell id="tools_box" value="Agent Tools Suite" style="rounded=1;arcSize=5;fillColor=#D9E1F2;strokeColor=#1F4E78;strokeWidth=2;fontStyle=1;fontColor=#1F4E78;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;fontSize=11" vertex="1" parent="google_cloud">
          <mxGeometry x="620" y="320" width="380" height="390" as="geometry" />
        </mxCell>
        
        <!-- Databases Tool -->
        <mxCell id="tool_db" value="Databases\n(AlloyDB Compound DB)" style="shape=mxgraph.gcp2.alloy_db;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#1F4E78;fontStyle=1" vertex="1" parent="tools_box">
          <mxGeometry x="60" y="60" width="85" height="80" as="geometry" />
        </mxCell>
        
        <!-- APIs Tool -->
        <mxCell id="tool_api" value="APIs\n(Veeva Vault Protocol APIs)" style="shape=mxgraph.gcp2.api_gateway;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#1F4E78;fontStyle=1" vertex="1" parent="tools_box">
          <mxGeometry x="240" y="60" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Services Tool -->
        <mxCell id="tool_services" value="Services\n(DLP PHI Redaction)" style="shape=mxgraph.gcp2.cloud_endpoints;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#1F4E78;fontStyle=1" vertex="1" parent="tools_box">
          <mxGeometry x="60" y="220" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Files Tool -->
        <mxCell id="tool_files" value="Files\n(Clinical Trials OneDrive)" style="shape=mxgraph.gcp2.cloud_storage;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#1F4E78;fontStyle=1" vertex="1" parent="tools_box">
          <mxGeometry x="240" y="220" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Connections -->
        <mxCell id="edge_1_1" value="HTTPS User Request" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#5F6368;strokeWidth=1.5;fontColor=#3C4043;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="actor_employees" target="frontend_app">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_2" value="Forward Prompt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#5F6368;strokeWidth=1.5;fontColor=#3C4043;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="frontend_app" target="node_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_3" value="Inference Call" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1A73E8;strokeWidth=1.5;fontColor=#1A73E8;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="node_agent" target="model_runtime">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_4" value="Query Memory Context" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1A73E8;strokeWidth=1.5;fontColor=#1A73E8;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="node_agent" target="memory_container">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_5" value="MCP Tool Call" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1A73E8;strokeWidth=1.5;fontColor=#1A73E8;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="node_agent" target="tools_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
 
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  const defaultDrawIoProdTargetXml = `<mxfile host="Embed" modified="2026-05-27" agent="Mozilla" version="21.0.0" type="embed">
  <diagram id="page1" name="Production-Grade Target State">
    <mxGraphModel dx="1000" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="850" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- GCP Widescreen Sovereignty Network Perimeter -->
        <mxCell id="gcp_vpc" value="Google Cloud Platform - Europe-West9 (Paris) Sovereignty VPC Service Controls Boundary" style="rounded=1;arcSize=8;fillColor=#F8F9FA;strokeColor=#4285F4;strokeWidth=2;dashed=1;dashPattern=8 8;fontStyle=1;fontColor=#1A73E8;align=left;verticalAlign=top;spacingLeft=20;spacingTop=15;fontSize=12" vertex="1" parent="1">
          <mxGeometry x="160" y="50" width="1180" height="750" as="geometry" />
        </mxCell>
        
        <!-- Application Users -->
        <mxCell id="actor_eln" value="Application Users
(Clinical Investigators)" style="shape=mxgraph.gcp2.user;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#1E3A8A;fontStyle=1" vertex="1" parent="1">
          <mxGeometry x="20" y="100" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Frontend Cloud Run Service -->
        <mxCell id="frontend_cloudrun" value="Frontend App
(Cloud Run Service)" style="shape=mxgraph.gcp2.compute_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#1E3A8A;fontStyle=1" vertex="1" parent="gcp_vpc">
          <mxGeometry x="50" y="100" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Agents Runtime Box -->
        <mxCell id="agents_runtime" value="Agents Execution Runtime (Vertex AI Agent Engine)" style="rounded=1;arcSize=8;fillColor=#E8F0FE;strokeColor=#4285F4;strokeWidth=1.5;fontStyle=1;fontColor=#1A73E8;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;fontSize=10" vertex="1" parent="gcp_vpc">
          <mxGeometry x="50" y="240" width="540" height="430" as="geometry" />
        </mxCell>
 
        <!-- Coordinator Agent -->
        <mxCell id="agent_coordinator" value="Coordinator Agent
(Agentic Coordinator)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#385723;fontStyle=1" vertex="1" parent="agents_runtime">
          <mxGeometry x="230" y="40" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Sequence Box -->
        <mxCell id="sequence_box" value="Sequence Flow Pattern" style="rounded=1;arcSize=5;fillColor=#F2F2F2;strokeColor=#7F7F7F;strokeWidth=1.5;fontStyle=1;fontColor=#595959;align=left;verticalAlign=top;spacingLeft=10;spacingTop=8;fontSize=9" vertex="1" parent="agents_runtime">
          <mxGeometry x="20" y="150" width="230" height="200" as="geometry" />
        </mxCell>
        
        <!-- Task A Subagent -->
        <mxCell id="subagent_task_a" value="Task-A Subagent
(Data Ingestion Agent)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#595959;fontStyle=1" vertex="1" parent="sequence_box">
          <mxGeometry x="20" y="60" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Task A.1 Subagent -->
        <mxCell id="subagent_task_a1" value="Task-A.1 Subagent
(Molecule Drawing OCR)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#595959;fontStyle=1" vertex="1" parent="sequence_box">
          <mxGeometry x="130" y="60" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Refinement Box -->
        <mxCell id="refinement_box" value="Iterative Refinement Pattern" style="rounded=1;arcSize=5;fillColor=#F5F5F5;strokeColor=#7F7F7F;strokeWidth=1.5;fontStyle=1;fontColor=#595959;align=left;verticalAlign=top;spacingLeft=10;spacingTop=8;fontSize=9" vertex="1" parent="agents_runtime">
          <mxGeometry x="270" y="150" width="250" height="200" as="geometry" />
        </mxCell>
        
        <!-- Task B Subagent -->
        <mxCell id="subagent_task_b" value="Task-B Subagent
(LIMS Vector Query)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#595959;fontStyle=1" vertex="1" parent="refinement_box">
          <mxGeometry x="15" y="30" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Quality Evaluator -->
        <mxCell id="subagent_evaluator" value="Evaluator Subagent
(Compliance check)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#595959;fontStyle=1" vertex="1" parent="refinement_box">
          <mxGeometry x="15" y="110" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Prompt Enhancer -->
        <mxCell id="subagent_enhancer" value="Prompt Enhancer
(Refinement)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9;fontColor=#595959;fontStyle=1" vertex="1" parent="refinement_box">
          <mxGeometry x="155" y="70" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Response Generator -->
        <mxCell id="subagent_response" value="Response Generator
(Grounded citations)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#385723;fontStyle=1" vertex="1" parent="agents_runtime">
          <mxGeometry x="230" y="330" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- AI Developers -->
        <mxCell id="actor_developers" value="AI Developers
(ADK Tools Framework)" style="shape=mxgraph.gcp2.user;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=11;fontColor=#334155;fontStyle=1" vertex="1" parent="1">
          <mxGeometry x="1120" y="100" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Model Runtime Box -->
        <mxCell id="model_runtime" value="Model Runtime (Vertex AI)" style="rounded=1;arcSize=5;fillColor=#FFF2CC;strokeColor=#D97706;strokeWidth=2;fontStyle=1;fontColor=#B25900;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;fontSize=11" vertex="1" parent="gcp_vpc">
          <mxGeometry x="620" y="240" width="260" height="230" as="geometry" />
        </mxCell>
 
        <!-- Model Armor -->
        <mxCell id="model_armor" value="Model Armor
(Dual-Pass Firewall)" style="shape=mxgraph.gcp2.security_scanner;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#B25900;fontStyle=1" vertex="1" parent="model_runtime">
          <mxGeometry x="30" y="80" width="85" height="80" as="geometry" />
        </mxCell>
 
        <!-- Gemini Model -->
        <mxCell id="ai_model" value="Gemini Pro Model
(Stable Version-Pinned)" style="shape=mxgraph.gcp2.automl_natural_language;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#B25900;fontStyle=1" vertex="1" parent="model_runtime">
          <mxGeometry x="150" y="80" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- MCP Clients Standard -->
        <mxCell id="mcp_clients" value="MCP Clients
(Database proxies)" style="shape=mxgraph.gcp2.cloud_run;fillColor=#EEF2F6;strokeColor=#475569;strokeWidth=2;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=11;fontColor=#334155;fontStyle=1" vertex="1" parent="gcp_vpc">
          <mxGeometry x="620" y="490" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Tools inside GCP -->
        <mxCell id="mcp_tools_gcp" value="Tools within GCP
(AlloyDB AI pgvector)" style="shape=mxgraph.gcp2.alloy_db;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=2.5;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#065F46;fontStyle=1" vertex="1" parent="gcp_vpc">
          <mxGeometry x="780" y="590" width="85" height="80" as="geometry" />
        </mxCell>
 
        <!-- External Tools -->
        <mxCell id="mcp_tools_external" value="External Tools
(Veeva Vault LIMS)" style="shape=mxgraph.gcp2.api_gateway;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#334155;fontStyle=1" vertex="1" parent="gcp_vpc">
          <mxGeometry x="940" y="590" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Google Cloud Observability -->
        <mxCell id="gcp_observability" value="Google Cloud Observability
(Distributed trace logging)" style="shape=mxgraph.gcp2.cloud_endpoints;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#1E3A8A;fontStyle=1" vertex="1" parent="gcp_vpc">
          <mxGeometry x="280" y="675" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Connections -->
        <mxCell id="edge_2_1" value="HTTPS input prompt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1D4ED8;strokeWidth=2.5;fontColor=#1E3A8A;fontSize=10;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="actor_eln" target="frontend_cloudrun">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_2" value="Forward to Coordinator" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#1D4ED8;strokeWidth=2;fontColor=#1E3A8A;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="frontend_cloudrun" target="agent_coordinator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_3" value="Task-A Invoke" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#385723;strokeWidth=2;fontColor=#385723;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="agent_coordinator" target="subagent_task_a">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_4" value="Task-B Invoke" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#385723;strokeWidth=2;fontColor=#385723;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="agent_coordinator" target="subagent_task_b">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_5" value="Sequential Call" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#595959;strokeWidth=1.5;fontColor=#595959;fontSize=8;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="subagent_task_a" target="subagent_task_a1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_6" value="Refinement Call" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#595959;strokeWidth=1.5;fontColor=#595959;fontSize=8;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="subagent_task_b" target="subagent_evaluator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_7" value="Rework Enhancer" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#595959;strokeWidth=1.5;fontColor=#595959;fontSize=8;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="subagent_evaluator" target="subagent_enhancer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_8" value="Submit to Generator" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#385723;strokeWidth=2;fontColor=#385723;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="subagent_evaluator" target="subagent_response">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_9" value="Submit to Generator" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#385723;strokeWidth=2;fontColor=#385723;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="subagent_task_a1" target="subagent_response">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_10" value="Secure Inference Gate" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D97706;strokeWidth=2;fontColor=#B25900;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="subagent_response" target="model_armor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_11" value="Model Query" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D97706;strokeWidth=2;fontColor=#B25900;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="model_armor" target="ai_model">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_12" value="Connect MCP Server" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=2;fontColor=#334155;fontSize=9;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="subagent_response" target="mcp_clients">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_13" value="Query AlloyDB tool" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=1.5;dashed=1;fontColor=#334155;fontSize=8;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="mcp_clients" target="mcp_tools_gcp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_2_14" value="Query external APIs" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#475569;strokeWidth=1.5;dashed=1;fontColor=#334155;fontSize=8;labelBackgroundColor=#F4FAF6" edge="1" parent="1" source="mcp_clients" target="mcp_tools_external">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
 
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  const defaultDrawIoNetCurrentXml = `<mxfile host="Embed" modified="2026-05-27" agent="Mozilla" version="21.0.0" type="embed">
  <diagram id="page1" name="Unsecure Networking Current State">
    <mxGraphModel dx="1000" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="850" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- Legacy Merck Corporate DMZ (Public Routing) -->
        <mxCell id="google_cloud" value="Merck GSF - Legacy Corporate Network DMZ (Exposed Public WAN)" style="rounded=1;arcSize=8;fillColor=#FDF8F7;strokeColor=#EA4335;strokeWidth=2;dashed=1;dashPattern=6 6;fontStyle=1;fontColor=#C5221F;align=left;verticalAlign=top;spacingLeft=20;spacingTop=15;fontSize=12" vertex="1" parent="1">
          <mxGeometry x="200" y="50" width="1050" height="750" as="geometry" />
        </mxCell>
        
        <!-- Investigators -->
        <mxCell id="actor_employees" value="Clinical Investigators\n(Public WAN)" style="shape=mxgraph.gcp2.user;fillColor=none;strokeColor=none;fontColor=#334155;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25;fontStyle=1" vertex="1" parent="1">
          <mxGeometry x="40" y="385" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- IIS Web server -->
        <mxCell id="node_1_1" value="Legacy Intake Portal\n(Exposed Web App)" style="shape=mxgraph.gcp2.compute_engine;fillColor=#FFF0F0;strokeColor=#D32F2F;strokeWidth=2;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="60" y="335" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Unsecure Proxy -->
        <mxCell id="node_1_2" value="Public IIS Proxy\n(Basic ARR Gateway)" style="shape=mxgraph.gcp2.api_gateway;fillColor=#FFF9E6;strokeColor=#F57F17;strokeWidth=2;fontColor=#E65100;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="240" y="185" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- AD LDAP -->
        <mxCell id="node_1_4" value="LDAP Identity\n(Cleartext WAN AD)" style="shape=mxgraph.gcp2.iam;fillColor=#FFF0F0;strokeColor=#D32F2F;strokeWidth=2;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="240" y="485" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- WAN SOAP endpoint -->
        <mxCell id="legacy_soap" value="Public Veeva SOAP Bridge\n(Exposed LIMS Bridge)" style="shape=mxgraph.gcp2.cloud_endpoints;fillColor=#FFF0F0;strokeColor=#D32F2F;strokeWidth=2;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="480" y="185" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- SMB Share -->
        <mxCell id="node_1_5" value="SMB Spreadsheets\n(Unsecure SMB Folder)" style="shape=mxgraph.gcp2.cloud_storage;fillColor=none;strokeColor=none;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="760" y="335" width="80" height="80" as="geometry" />
        </mxCell>
        
        <!-- Database -->
        <mxCell id="onprem_db" value="LIMS SQL Server\n(WAN Exposed Port)" style="shape=mxgraph.gcp2.cloud_sql;fillColor=none;strokeColor=none;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="760" y="185" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- PDFs -->
        <mxCell id="pdf_doc" value="Clinical PDFs\n(Unsecure Local share)" style="shape=mxgraph.gcp2.bigquery;fillColor=none;strokeColor=none;fontColor=#C62828;fontSize=11;align=center;verticalAlign=bottom;spacingBottom=-25" vertex="1" parent="google_cloud">
          <mxGeometry x="480" y="485" width="80" height="80" as="geometry" />
        </mxCell>
 
        <!-- Connections -->
        <mxCell id="edge_1_1" value="HTTPS over public WAN" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=2;dashed=1;fontColor=#D32F2F;fontSize=10;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="actor_employees" target="node_1_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_2" value="LDAP query (Exposed Port)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=1.5;dashed=1;fontColor=#D32F2F;fontSize=9;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="node_1_1" target="node_1_4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_3" value="HTTP SOAP over public WAN" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#5F6368;strokeWidth=1.5;fontColor=#3C4043;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="node_1_1" target="node_1_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_4" value="Public SOAP Tunnel" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#5F6368;strokeWidth=1.5;fontColor=#3C4043;fontSize=9;labelBackgroundColor=#F8F9FA" edge="1" parent="1" source="node_1_2" target="legacy_soap">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_5" value="WAN DB connection" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=1.5;dashed=1;fontColor=#D32F2F;fontSize=9;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="legacy_soap" target="onprem_db">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_6" value="Export CSVs" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=1.5;dashed=1;fontColor=#D32F2F;fontSize=9;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="onprem_db" target="node_1_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_1_7" value="Manual extraction" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#D32F2F;strokeWidth=1.5;dashed=1;fontColor=#D32F2F;fontSize=9;labelBackgroundColor=#FFF5F5" edge="1" parent="1" source="pdf_doc" target="node_1_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
 
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  const defaultDrawIoNetTargetXml = `<mxfile host="Embed" modified="2026-05-27" agent="Mozilla" version="21.0.0" type="embed">
  <diagram id="page1" name="Production Multi-Agent Private Networking">
    <mxGraphModel dx="1000" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="850" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- VPC Service Controls (VPC-SC) Perimeter Boundary Container -->
        <mxCell id="gcp_vpc_sc" value="Google Cloud Platform - Europe-West9 (Paris) VPC Service Controls (VPC-SC) Sovereign Security Perimeter" style="rounded=1;arcSize=8;fillColor=#F8F9FA;strokeColor=#4285F4;strokeWidth=2;dashed=1;dashPattern=8 8;fontStyle=1;fontColor=#1A73E8;align=left;verticalAlign=top;spacingLeft=20;spacingTop=15;fontSize=12" vertex="1" parent="1">
          <mxGeometry x="160" y="50" width="1180" height="750" as="geometry" />
        </mxCell>
        
        <!-- Shared VPC Host Project Container -->
        <mxCell id="shared_vpc" value="Shared VPC Host Project (Centralized Network &amp; Security Operations)" style="rounded=1;arcSize=6;fillColor=#F8F9FA;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;fontSize=11" vertex="1" parent="gcp_vpc_sc">
          <mxGeometry x="30" y="80" width="500" height="600" as="geometry" />
        </mxCell>
        
        <!-- Cloud NGFW -->
        <mxCell id="cloud_ngfw" value="Cloud NGFW\n(Default-Deny Egress)" style="shape=mxgraph.gcp2.security_scanner;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#37474f;fontStyle=1" vertex="1" parent="shared_vpc">
          <mxGeometry x="60" y="60" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- Secure Web Proxy -->
        <mxCell id="secure_web_proxy" value="Secure Web Proxy\n(Explicit Egress)" style="shape=mxgraph.gcp2.api_gateway;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#37474f;fontStyle=1" vertex="1" parent="shared_vpc">
          <mxGeometry x="60" y="220" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- Private DNS Peering -->
        <mxCell id="dns_peering" value="Private DNS Peering\n(googleapis.com)" style="shape=mxgraph.gcp2.cloud_endpoints;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#37474f;fontStyle=1" vertex="1" parent="shared_vpc">
          <mxGeometry x="60" y="380" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- PSC Endpoints -->
        <mxCell id="psc_endpoints" value="PSC Endpoints\n(Private APIs)" style="shape=mxgraph.gcp2.load_balancing;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#37474f;fontStyle=1" vertex="1" parent="shared_vpc">
          <mxGeometry x="300" y="60" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- PSC Interfaces -->
        <mxCell id="psc_interfaces" value="PSC Interfaces\n(Vertex AI attachments)" style="shape=mxgraph.gcp2.load_balancing;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#37474f;fontStyle=1" vertex="1" parent="shared_vpc">
          <mxGeometry x="300" y="220" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- Service Project Container -->
        <mxCell id="service_project" value="AI App Service Project (Vertex AI Agent Engine, Cloud Run &amp; GKE Runtimes)" style="rounded=1;arcSize=5;fillColor=#FCF8F2;strokeColor=#b25900;strokeWidth=2;fontStyle=1;fontColor=#b25900;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;fontSize=11" vertex="1" parent="gcp_vpc_sc">
          <mxGeometry x="560" y="80" width="580" height="600" as="geometry" />
        </mxCell>
 
        <!-- Root Agent on Agent Engine -->
        <mxCell id="root_agent_engine" value="Custom Root Agent\n(Vertex Agent Engine)" style="shape=mxgraph.gcp2.app_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#b25900;fontStyle=1" vertex="1" parent="service_project">
          <mxGeometry x="60" y="60" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- Subagents on Cloud Run -->
        <mxCell id="subagent_cloudrun" value="Subagent Service\n(Cloud Run Direct VPC)" style="shape=mxgraph.gcp2.cloud_run;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#b25900;fontStyle=1" vertex="1" parent="service_project">
          <mxGeometry x="280" y="60" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- GKE private cluster nodes -->
        <mxCell id="gcp_gke_nodes" value="GKE Cluster Nodes\n(VPC-Native)" style="shape=mxgraph.gcp2.kubernetes_engine;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#b25900;fontStyle=1" vertex="1" parent="service_project">
          <mxGeometry x="60" y="220" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- GKE Gateway & IAP -->
        <mxCell id="gke_gateway" value="GKE Gateway &amp; IAP\n(Cloud Armor Proxy)" style="shape=mxgraph.gcp2.iam;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#b25900;fontStyle=1" vertex="1" parent="service_project">
          <mxGeometry x="280" y="220" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- Tools: AlloyDB Database -->
        <mxCell id="alloydb_tool" value="Regulated AlloyDB\n(Private IP compound DB)" style="shape=mxgraph.gcp2.alloy_db;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#b25900;fontStyle=1" vertex="1" parent="service_project">
          <mxGeometry x="60" y="380" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- Vertex AI Model Armor -->
        <mxCell id="vertex_model_armor" value="Model Armor\n(Private API Endpoint)" style="shape=mxgraph.gcp2.security_scanner;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=10;fontColor=#b25900;fontStyle=1" vertex="1" parent="service_project">
          <mxGeometry x="280" y="380" width="60" height="60" as="geometry" />
        </mxCell>
 
        <!-- Connections -->
        <mxCell id="edge_3_1" value="Egress to VPC via network attachment" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#b25900;strokeWidth=2;fontColor=#b25900;fontSize=8;labelBackgroundColor=#FCF8F2" edge="1" parent="1" source="root_agent_engine" target="psc_interfaces">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3_2" value="Direct VPC Egress routing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#b25900;strokeWidth=2;fontColor=#b25900;fontSize=8;labelBackgroundColor=#FCF8F2" edge="1" parent="1" source="subagent_cloudrun" target="shared_vpc">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3_3" value="Enforce global firewall rules" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#455a64;strokeWidth=2;fontColor=#455a64;fontSize=8;labelBackgroundColor=#F2F4F7" edge="1" parent="1" source="shared_vpc" target="cloud_ngfw">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3_4" value="Secure internet explicit proxying" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#455a64;strokeWidth=2;fontColor=#455a64;fontSize=8;labelBackgroundColor=#F2F4F7" edge="1" parent="1" source="shared_vpc" target="secure_web_proxy">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3_5" value="Resolve googleapis.com locally" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#455a64;strokeWidth=2;fontColor=#455a64;fontSize=8;labelBackgroundColor=#F2F4F7" edge="1" parent="1" source="shared_vpc" target="dns_peering">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3_6" value="Route through PSC endpoint" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#455a64;strokeWidth=2;fontColor=#455a64;fontSize=8;labelBackgroundColor=#F2F4F7" edge="1" parent="1" source="shared_vpc" target="psc_endpoints">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3_7" value="Private DB connection" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#b25900;strokeWidth=1.5;dashed=1;fontColor=#b25900;fontSize=8;labelBackgroundColor=#FCF8F2" edge="1" parent="1" source="gcp_gke_nodes" target="alloydb_tool">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_3_8" value="Sanitize LLM traffic privately" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;orthogonalLoop=1;strokeColor=#b25900;strokeWidth=1.5;dashed=1;fontColor=#b25900;fontSize=8;labelBackgroundColor=#FCF8F2" edge="1" parent="1" source="gcp_gke_nodes" target="vertex_model_armor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
 
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  const defaultDrawIoScoperCurrentXml = `<mxfile host="Embed" modified="2026-05-28" agent="Mozilla" version="21.0.0" type="embed">
  <diagram id="page1" name="Fragmented Current State">
    <mxGraphModel dx="1000" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="1050" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- Header Banner -->
        <mxCell id="header_banner" value="Current state — fragmented · public internet · no orchestration · compliance gaps" style="rounded=0;fillColor=#FDE8E8;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontStyle=1;fontSize=12;align=center;verticalAlign=middle" vertex="1" parent="1">
          <mxGeometry x="40" y="30" width="1050" height="40" as="geometry" />
        </mxCell>

        <!-- 1. USERS ROW -->
        <mxCell id="row_users" value="USERS" style="rounded=1;arcSize=4;fillColor=#F8F9FA;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="90" width="1050" height="90" as="geometry" />
        </mxCell>
        <mxCell id="user_clin_ops" value="Clinical ops&#xa;Protocol review" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="20" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="user_med_writers" value="Med. writers&#xa;CTD authoring" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="220" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="user_reg_affairs" value="Reg. affairs&#xa;Submission QA" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="420" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="user_drug_safety" value="Drug safety&#xa;Signal detection" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="620" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="user_it_mlops" value="IT / MLOps&#xa;Operations" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="820" y="25" width="180" height="45" as="geometry" />
        </mxCell>

        <!-- 2. AI AGENTS ROW -->
        <mxCell id="row_agents" value="AI AGENTS" style="rounded=1;arcSize=4;fillColor=#FFF5F5;strokeColor=#EA4335;strokeWidth=1.5;fontStyle=1;fontColor=#C5221F;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="200" width="1050" height="110" as="geometry" />
        </mxCell>
        <mxCell id="label_agents_hdr" value="ONE MONOLITHIC MODEL — ALL TASKS — NO SPECIALIZATION — NO GROUNDING" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontColor=#C5221F;fontSize=9" vertex="1" parent="row_agents">
          <mxGeometry x="20" y="5" width="600" height="20" as="geometry" />
        </mxCell>
        <mxCell id="agent_openai" value="Azure OpenAI GPT-4o&#xa;Public API · no BAA · all domains" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_agents">
          <mxGeometry x="20" y="35" width="230" height="55" as="geometry" />
        </mxCell>
        <mxCell id="agent_appserver" value="App server&#xa;Cloud Run · no grounding" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_agents">
          <mxGeometry x="270" y="35" width="230" height="55" as="geometry" />
        </mxCell>
        <mxCell id="agent_langchain" value="LangChain&#xa;Basic chain · no eval" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_agents">
          <mxGeometry x="520" y="35" width="230" height="55" as="geometry" />
        </mxCell>
        <mxCell id="agent_noeval" value="No eval harness&#xa;No quality gate" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_agents">
          <mxGeometry x="770" y="35" width="250" height="55" as="geometry" />
        </mxCell>

        <!-- 3. ORCHESTRATION ROW -->
        <mxCell id="row_orch" value="ORCHESTRATION" style="rounded=1;arcSize=4;fillColor=#FFF5F5;strokeColor=#EA4335;strokeWidth=1.5;fontStyle=1;fontColor=#C5221F;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="330" width="1050" height="160" as="geometry" />
        </mxCell>
        <mxCell id="label_orch_hdr" value="NO ORCHESTRATION LAYER — NO AGENT MESH — NO MEMORY — NO HUMAN GATE — NO GxP TRACE" style="text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontColor=#C5221F;fontSize=9" vertex="1" parent="row_orch">
          <mxGeometry x="20" y="5" width="800" height="20" as="geometry" />
        </mxCell>
        <mxCell id="orch_supervisor" value="No supervisor agent&#xa;&#xa;● No session memory&#xa;Ad-hoc prompts per task" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="20" y="30" width="310" height="85" as="geometry" />
        </mxCell>
        <mxCell id="orch_toolreg" value="No tool registry&#xa;&#xa;● No A2A protocol&#xa;No feedback loop" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="350" y="30" width="310" height="85" as="geometry" />
        </mxCell>
        <mxCell id="orch_human" value="No human-in-loop gate&#xa;&#xa;● No GxP audit trace&#xa;No 21 CFR logging" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="680" y="30" width="310" height="85" as="geometry" />
        </mxCell>
        <mxCell id="label_orch_bottom" value="All routing is manual. Each user routes their own query to the single model." style="text;html=1;align=center;verticalAlign=middle;fontStyle=2;fontColor=#C5221F;fontSize=9.5" vertex="1" parent="row_orch">
          <mxGeometry x="200" y="125" width="600" height="25" as="geometry" />
        </mxCell>

        <!-- 4. MIDDLEWARE ROW -->
        <mxCell id="row_middleware" value="MIDDLEWARE" style="rounded=1;arcSize=4;fillColor=#FFF8F8;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="510" width="1050" height="90" as="geometry" />
        </mxCell>
        <mxCell id="mid_dlp" value="No DLP&#xa;PHI in prompts" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_middleware">
          <mxGeometry x="20" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="mid_grounding" value="No grounding&#xa;Hallucination risk" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_middleware">
          <mxGeometry x="220" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="mid_keys" value="API keys in env&#xa;No CMEK" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_middleware">
          <mxGeometry x="420" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="mid_vpcsc" value="No VPC-SC&#xa;No perimeter" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_middleware">
          <mxGeometry x="620" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="mid_audit" value="No audit log&#xa;Manual only" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_middleware">
          <mxGeometry x="820" y="25" width="180" height="45" as="geometry" />
        </mxCell>

        <!-- 5. CONNECTIVITY ROW -->
        <mxCell id="row_conn" value="CONNECTIVITY" style="rounded=1;arcSize=4;fillColor=#FFF8F8;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="620" width="1050" height="90" as="geometry" />
        </mxCell>
        <mxCell id="conn_internet" value="Public internet&#xa;&#xa;● PHI crosses 3 cloud boundaries unprotected · $14–18K/yr egress · HIPAA risk ●" style="rounded=1;arcSize=8;fillColor=#FFF5F5;strokeColor=#EA4335;strokeWidth=2;fontColor=#C5221F;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_conn">
          <mxGeometry x="100" y="20" width="850" height="50" as="geometry" />
        </mxCell>

        <!-- 6. DATA SOURCES ROW -->
        <mxCell id="row_data" value="DATA SOURCES" style="rounded=1;arcSize=4;fillColor=#FFF8F8;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="730" width="1050" height="190" as="geometry" />
        </mxCell>
        <mxCell id="data_snowflake" value="Snowflake&#xa;AWS us-east-1" style="rounded=1;arcSize=6;fillColor=#FFF7E6;strokeColor=#D97706;strokeWidth=1.5;fontColor=#B25900;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="20" y="20" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="data_s3" value="S3 / Veeva&#xa;AWS — CDISC" style="rounded=1;arcSize=6;fillColor=#FFF7E6;strokeColor=#D97706;strokeWidth=1.5;fontColor=#B25900;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="220" y="20" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="data_lims" value="Oracle / LIMS&#xa;On-prem&#xa;Patient registry · Lab data" style="rounded=1;arcSize=6;fillColor=#F8F9FA;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="420" y="20" width="180" height="145" as="geometry" />
        </mxCell>
        <mxCell id="data_sharepoint" value="SharePoint&#xa;Azure — PDFs" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#1D4ED8;strokeWidth=1.5;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="20" y="100" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="data_veevavault" value="Veeva Vault&#xa;Azure — HCP" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#1D4ED8;strokeWidth=1.5;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="220" y="100" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="data_nounified" value="No unified data store&#xa;&#xa;● 5 disconnected systems · No grounding corpus&#xa;No schema docs · no steward · No data lineage ●" style="rounded=1;arcSize=6;fillColor=#FFF5F5;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="620" y="20" width="370" height="145" as="geometry" />
        </mxCell>

        <!-- 7. COMPLIANCE ROW -->
        <mxCell id="row_compliance" value="COMPLIANCE" style="rounded=1;arcSize=4;fillColor=#FFF8F8;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="940" width="1050" height="90" as="geometry" />
        </mxCell>
        <mxCell id="comp_hipaa" value="HIPAA: partial&#xa;No BAA on Azure OAI" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_compliance">
          <mxGeometry x="20" y="25" width="310" height="45" as="geometry" />
        </mxCell>
        <mxCell id="comp_gxp" value="GxP: undocumented&#xa;No IQ/OQ/PQ plan" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_compliance">
          <mxGeometry x="350" y="25" width="310" height="45" as="geometry" />
        </mxCell>
        <mxCell id="comp_21cfr" value="21 CFR: not scoped&#xa;No AI output audit trail" style="rounded=1;arcSize=6;fillColor=#FDF2F2;strokeColor=#EA4335;strokeWidth=1.5;fontColor=#C5221F;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_compliance">
          <mxGeometry x="680" y="25" width="310" height="45" as="geometry" />
        </mxCell>

        <!-- Connective links -->
        <mxCell id="edge_u_a" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5" edge="1" parent="1" source="user_med_writers" target="agent_appserver">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_u_a2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5" edge="1" parent="1" source="user_reg_affairs" target="agent_appserver">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_a_o" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5" edge="1" parent="1" source="agent_appserver" target="row_orch">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_o_m" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5" edge="1" parent="1" source="row_orch" target="mid_grounding">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_m_c" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5" edge="1" parent="1" source="mid_grounding" target="conn_internet">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_c_d1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5" edge="1" parent="1" source="conn_internet" target="data_snowflake">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_c_d2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5" edge="1" parent="1" source="conn_internet" target="data_s3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_c_d3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;dashed=1;strokeColor=#EA4335;strokeWidth=1.5" edge="1" parent="1" source="conn_internet" target="data_lims">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        
        <!-- Architectural Decision Rationale Panel -->
        <mxCell id="scoper_rationale" value="&lt;div style=&quot;font-family: sans-serif; padding: 6px 10px;&quot;&gt;
  &lt;div style=&quot;font-size: 9px; font-weight: bold; color: #721C24; text-align: center; border-bottom: 1px solid #F5D6D6; padding-bottom: 4px; margin-bottom: 6px; letter-spacing: 0.5px;&quot;&gt;
    LEGACY ARCHITECTURAL POSTURE — WHY CURRENT WORKFLOW GAPS EXIST
  &lt;/div&gt;
  &lt;div style=&quot;display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; font-size: 8px; color: #721C24; text-align: left;&quot;&gt;
    &lt;div style=&quot;border-right: 1px solid #F5D6D6; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #C5221F; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D1 · Scattered Multi-Cloud&lt;/strong&gt;
      Data scattered across AWS us-east-1 Snowflake, AWS S3, Azure SharePoint, Veeva Vault, and On-Premise Oracle/LIMS.
    &lt;/div&gt;
    &lt;div style=&quot;border-right: 1px solid #F5D6D6; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #C5221F; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D2 · Monolithic Model&lt;/strong&gt;
      All tasks routed manually to a single monolithic Azure OpenAI GPT-4o API without grounding or specialization.
    &lt;/div&gt;
    &lt;div style=&quot;border-right: 1px solid #F5D6D6; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #C5221F; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D3 · No GxP Audit Trail&lt;/strong&gt;
      No supervisor agent, tool registry, or human gate. Zero automated 21 CFR Part 11 audit trail is scoped.
    &lt;/div&gt;
    &lt;div style=&quot;border-right: 1px solid #F5D6D6; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #C5221F; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D4 · Unsecure Public Internet&lt;/strong&gt;
      PHI crosses 3 multi-cloud boundaries unprotected over public internet, driving severe HIPAA and egress fee risks.
    &lt;/div&gt;
    &lt;div style=&quot;border-right: 1px solid #F5D6D6; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #C5221F; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D5 · Disconnected Silos&lt;/strong&gt;
      5 completely disconnected data stores with no schema documentation, no data steward, and no unified grounding corpus.
    &lt;/div&gt;
    &lt;div&gt;
      &lt;strong style=&quot;color: #C5221F; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D6 · Manual Ad-Hoc Prompts&lt;/strong&gt;
      No session memory or prompt versioning. Users query model manually, driving high hallucination and safety risks.
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;rounded=1;arcSize=4;fillColor=#FFF5F5;strokeColor=#EA4335;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="1110" width="1050" height="80" as="geometry" />
        </mxCell>

        <!-- Diagram Legend Panel -->
        <mxCell id="scoper_legend" value="&lt;div style=&quot;display: flex; flex-wrap: wrap; gap: 8px 20px; font-family: sans-serif; font-size: 9.5px; color: #721C24; padding: 6px 10px; text-align: left; justify-content: center;&quot;&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #EA4335; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Fragmented Application&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #D97706; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;AWS resources&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #1D4ED8; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Azure resources&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #7F8C8D; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;On-prem LIMS&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #EA4335; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Gap / blocker&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; border-bottom: 2.5px dashed #EA4335;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Public internet dataflow (current)&lt;/strong&gt;
  &lt;/div&gt;
&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;rounded=1;arcSize=6;fillColor=#FFF5F5;strokeColor=#EA4335;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="1210" width="1050" height="50" as="geometry" />
        </mxCell>
        </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  const defaultDrawIoScoperTargetXml = `<mxfile host="Embed" modified="2026-05-28" agent="Mozilla" version="21.0.0" type="embed">
  <diagram id="page1" name="Integrated Target State">
    <mxGraphModel dx="1000" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="1050" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- Header Banner -->
        <mxCell id="header_banner" value="Target state — GCP Gemini Enterprise · private · multi-agent orchestration · HIPAA/GxP" style="rounded=0;fillColor=#E6F4EA;strokeColor=#137333;strokeWidth=1.5;fontColor=#137333;fontStyle=1;fontSize=12;align=center;verticalAlign=middle" vertex="1" parent="1">
          <mxGeometry x="40" y="30" width="1050" height="40" as="geometry" />
        </mxCell>

        <!-- 1. USERS ROW -->
        <mxCell id="row_users" value="USERS" style="rounded=1;arcSize=4;fillColor=#F8F9FA;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="90" width="1050" height="90" as="geometry" />
        </mxCell>
        <mxCell id="user_clin_ops" value="Clinical ops&#xa;GEA workspace" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="20" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="user_med_writers" value="Med. writers&#xa;GEA workspace" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="220" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="user_reg_affairs" value="Reg. affairs&#xa;GEA workspace" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="420" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="user_drug_safety" value="Drug safety&#xa;GEA workspace" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="620" y="25" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="user_clinician_review" value="Clinician review&#xa;Human-in-loop" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_users">
          <mxGeometry x="850" y="25" width="180" height="45" as="geometry" />
        </mxCell>

        <!-- 2. AI AGENTS ROW -->
        <mxCell id="row_agents" value="AI AGENTS" style="rounded=1;arcSize=4;fillColor=#E8F0FE;strokeColor=#4285F4;strokeWidth=1.5;fontStyle=1;fontColor=#1A73E8;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="200" width="1050" height="120" as="geometry" />
        </mxCell>
        <mxCell id="agent_protocol" value="Protocol agent&#xa;Gemini 1.5 Pro&#xa;Summarize · Q&amp;A · 1M ctx" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#4285F4;strokeWidth=1.5;fontColor=#1A73E8;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_agents">
          <mxGeometry x="20" y="25" width="230" height="70" as="geometry" />
        </mxCell>
        <mxCell id="agent_reg" value="Regulatory agent&#xa;Gemini 1.5 Pro&#xa;CTD · 21 CFR aware" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#4285F4;strokeWidth=1.5;fontColor=#1A73E8;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_agents">
          <mxGeometry x="270" y="25" width="230" height="70" as="geometry" />
        </mxCell>
        <mxCell id="agent_safety" value="Safety agent&#xa;Gemini 1.5 Pro&#xa;FAERS · multimodal" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#4285F4;strokeWidth=1.5;fontColor=#1A73E8;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_agents">
          <mxGeometry x="520" y="25" width="230" height="70" as="geometry" />
        </mxCell>
        <mxCell id="agent_data" value="Data agent&#xa;Gemini 1.5 Pro&#xa;BQ · SQL · analytics" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#4285F4;strokeWidth=1.5;fontColor=#1A73E8;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_agents">
          <mxGeometry x="770" y="25" width="250" height="70" as="geometry" />
        </mxCell>

        <!-- 3. ORCHESTRATION ROW -->
        <mxCell id="row_orch" value="AGENT ORCHESTRATION MESH — AGENT BUILDER" style="rounded=1;arcSize=4;fillColor=#F8F9FA;strokeColor=#4285F4;strokeWidth=1.5;dashed=1;dashPattern=8 8;fontStyle=1;fontColor=#1A73E8;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="340" width="1050" height="190" as="geometry" />
        </mxCell>
        <mxCell id="orch_toolreg" value="Tool registry&#xa;20+ tools · versioned" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1E3A8A;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="20" y="35" width="180" height="55" as="geometry" />
        </mxCell>
        <mxCell id="orch_supervisor" value="Supervisor agent&#xa;decompose · route to specialists · merge outp" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="220" y="35" width="360" height="55" as="geometry" />
        </mxCell>
        <mxCell id="orch_session" value="Session memory&#xa;Context · user prefs" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1E3A8A;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="600" y="35" width="180" height="55" as="geometry" />
        </mxCell>
        <mxCell id="orch_humangate" value="Human gate&#xa;Approve · override · GxP" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="800" y="35" width="220" height="55" as="geometry" />
        </mxCell>
        <mxCell id="orch_gxpaudit" value="GxP audit trace&#xa;Every call · input · output" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1E3A8A;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="20" y="110" width="220" height="55" as="geometry" />
        </mxCell>
        <mxCell id="orch_a2agate" value="A2A gateway&#xa;Cross-cloud · mTLS · OAuth2" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1E3A8A;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="260" y="110" width="240" height="55" as="geometry" />
        </mxCell>
        <mxCell id="orch_evalharness" value="Eval harness&#xa;RAGAS · quality gate" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1E3A8A;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="520" y="110" width="240" height="55" as="geometry" />
        </mxCell>
        <mxCell id="orch_feedback" value="Feedback loop&#xa;Improve · retrain" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#4285F4;strokeWidth=1.2;fontColor=#1E3A8A;fontSize=10;align=center;verticalAlign=middle" vertex="1" parent="row_orch">
          <mxGeometry x="780" y="110" width="240" height="55" as="geometry" />
        </mxCell>

        <!-- 4. MIDDLEWARE / SERVICES ROW -->
        <mxCell id="row_middleware" value="MIDDLEWARE / SERVICES" style="rounded=1;arcSize=4;fillColor=#F8F9FA;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="550" width="1050" height="100" as="geometry" />
        </mxCell>
        <mxCell id="mid_vertex_search" value="Vertex AI Search&#xa;Grounding · citations" style="shape=mxgraph.gcp2.automl_natural_language;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9.5;fontColor=#3C4043;fontStyle=1" vertex="1" parent="row_middleware">
          <mxGeometry x="20" y="20" width="80" height="50" as="geometry" />
        </mxCell>
        <mxCell id="mid_dlp" value="Cloud DLP&#xa;PHI redacted" style="shape=mxgraph.gcp2.security_scanner;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9.5;fontColor=#3C4043;fontStyle=1" vertex="1" parent="row_middleware">
          <mxGeometry x="190" y="20" width="80" height="50" as="geometry" />
        </mxCell>
        <mxCell id="mid_secret" value="Secret Mgr&#xa;CMEK · rotation" style="shape=mxgraph.gcp2.iam;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9.5;fontColor=#3C4043;fontStyle=1" vertex="1" parent="row_middleware">
          <mxGeometry x="360" y="20" width="80" height="50" as="geometry" />
        </mxCell>
        <mxCell id="mid_audit" value="Audit Logs&#xa;All PHI access" style="shape=mxgraph.gcp2.security_scanner;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9.5;fontColor=#3C4043;fontStyle=1" vertex="1" parent="row_middleware">
          <mxGeometry x="530" y="20" width="80" height="50" as="geometry" />
        </mxCell>
        <mxCell id="mid_bq" value="BigQuery&#xa;Analytics" style="shape=mxgraph.gcp2.alloy_db;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9.5;fontColor=#3C4043;fontStyle=1" vertex="1" parent="row_middleware">
          <mxGeometry x="700" y="20" width="80" height="50" as="geometry" />
        </mxCell>
        <mxCell id="mid_monitor" value="Cloud Monitor&#xa;SLA · drift" style="shape=mxgraph.gcp2.cloud_endpoints;fillColor=none;strokeColor=none;align=center;verticalAlign=top;verticalLabelPosition=bottom;spacingTop=8;fontSize=9.5;fontColor=#3C4043;fontStyle=1" vertex="1" parent="row_middleware">
          <mxGeometry x="870" y="20" width="80" height="50" as="geometry" />
        </mxCell>

        <!-- 5. CONNECTIVITY ROW -->
        <mxCell id="row_conn" value="CONNECTIVITY" style="rounded=1;arcSize=4;fillColor=#EBF5FF;strokeColor=#1D4ED8;strokeWidth=1.5;fontStyle=1;fontColor=#1E3A8A;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="670" width="1050" height="100" as="geometry" />
        </mxCell>
        <mxCell id="conn_psc" value="PSC endpoint&#xa;AWS PrivateLink · Snowflake · S3 · Veeva" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#1D4ED8;strokeWidth=1.5;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_conn">
          <mxGeometry x="20" y="25" width="310" height="50" as="geometry" />
        </mxCell>
        <mxCell id="conn_vpn" value="HA VPN tunnel&#xa;Azure Private Endpoint · SharePoint · Veeva" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#1D4ED8;strokeWidth=1.5;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_conn">
          <mxGeometry x="350" y="25" width="310" height="50" as="geometry" />
        </mxCell>
        <mxCell id="conn_interconnect" value="Dedicated Interconnect&#xa;On-prem ➔ GCP · Oracle · LIMS" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#1D4ED8;strokeWidth=1.5;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_conn">
          <mxGeometry x="680" y="25" width="340" height="50" as="geometry" />
        </mxCell>
        <mxCell id="label_conn_bottom" value="Zero public internet hops — all PHI private end-to-end" style="text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontColor=#1E3A8A;fontSize=9.5" vertex="1" parent="row_conn">
          <mxGeometry x="300" y="75" width="450" height="20" as="geometry" />
        </mxCell>

        <!-- 6. DATA SOURCES ROW -->
        <mxCell id="row_data" value="DATA SOURCES" style="rounded=1;arcSize=4;fillColor=#FFF8F8;strokeColor=#BDC3C7;strokeWidth=1.5;fontStyle=1;fontColor=#3C4043;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="790" width="1050" height="190" as="geometry" />
        </mxCell>
        <mxCell id="data_snowflake" value="Snowflake&#xa;AWS Biz Critical" style="rounded=1;arcSize=6;fillColor=#FFF7E6;strokeColor=#D97706;strokeWidth=1.5;fontColor=#B25900;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="20" y="20" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="data_s3" value="S3 / Veeva&#xa;AWS — CDISC" style="rounded=1;arcSize=6;fillColor=#FFF7E6;strokeColor=#D97706;strokeWidth=1.5;fontColor=#B25900;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="220" y="20" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="data_lims" value="Oracle / LIMS&#xa;On-prem&#xa;Patient · lab" style="rounded=1;arcSize=6;fillColor=#F8F9FA;strokeColor=#BDC3C7;strokeWidth=1.5;fontColor=#3C4043;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="420" y="20" width="180" height="145" as="geometry" />
        </mxCell>
        <mxCell id="data_sharepoint" value="SharePoint&#xa;Azure — PDFs" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#1D4ED8;strokeWidth=1.5;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="20" y="100" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="data_veevavault" value="Veeva Vault&#xa;Azure — HCP" style="rounded=1;arcSize=6;fillColor=#EBF5FF;strokeColor=#1D4ED8;strokeWidth=1.5;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="220" y="100" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="data_unifiedstore" value="BigQuery — unified store&#xa;Replicated · de-identified&#xa;Grounding corpus lives here&#xa;Schema documented · steward named&#xa;Zero egress cost" style="rounded=1;arcSize=6;fillColor=#EBFDF0;strokeColor=#137333;strokeWidth=1.5;fontColor=#137333;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_data">
          <mxGeometry x="620" y="20" width="390" height="145" as="geometry" />
        </mxCell>

        <!-- 7. COMPLIANCE ROW -->
        <mxCell id="row_compliance" value="COMPLIANCE" style="rounded=1;arcSize=4;fillColor=#E6F4EA;strokeColor=#137333;strokeWidth=1.5;fontStyle=1;fontColor=#137333;align=left;verticalAlign=top;spacingLeft=15;spacingTop=8;fontSize=10" vertex="1" parent="1">
          <mxGeometry x="40" y="1000" width="1050" height="90" as="geometry" />
        </mxCell>
        <mxCell id="comp_hipaa" value="HIPAA: compliant&#xa;BAA signed · CMEK · DLP" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#137333;strokeWidth=1.5;fontColor=#137333;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_compliance">
          <mxGeometry x="20" y="25" width="310" height="45" as="geometry" />
        </mxCell>
        <mxCell id="comp_gxp" value="GxP: validated&#xa;IQ/OQ/PQ documented" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#137333;strokeWidth=1.5;fontColor=#137333;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_compliance">
          <mxGeometry x="350" y="25" width="310" height="45" as="geometry" />
        </mxCell>
        <mxCell id="comp_21cfr" value="21 CFR: full trace&#xa;Audit trail · AI output signed · immutable" style="rounded=1;arcSize=6;fillColor=#ffffff;strokeColor=#137333;strokeWidth=1.5;fontColor=#137333;fontSize=10;fontStyle=1;align=center;verticalAlign=middle" vertex="1" parent="row_compliance">
          <mxGeometry x="680" y="25" width="310" height="45" as="geometry" />
        </mxCell>

        <!-- Connective links (Pruned, clean curved paths!) -->
        <mxCell id="edge_u1_a1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#5F6368;strokeWidth=1.5" edge="1" parent="1" source="user_clin_ops" target="agent_protocol">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_u2_a2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#5F6368;strokeWidth=1.5" edge="1" parent="1" source="user_med_writers" target="agent_reg">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_u3_a3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#5F6368;strokeWidth=1.5" edge="1" parent="1" source="user_reg_affairs" target="agent_safety">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_u4_a4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#5F6368;strokeWidth=1.5" edge="1" parent="1" source="user_drug_safety" target="agent_data">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        
        <mxCell id="edge_a1_o" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#1A73E8;strokeWidth=1.5" edge="1" parent="1" source="agent_protocol" target="orch_supervisor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_a2_o" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#1A73E8;strokeWidth=1.5" edge="1" parent="1" source="agent_reg" target="orch_supervisor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_a3_o" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#1A73E8;strokeWidth=1.5" edge="1" parent="1" source="agent_safety" target="orch_supervisor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_a4_o" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#1A73E8;strokeWidth=1.5" edge="1" parent="1" source="agent_data" target="orch_supervisor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="edge_o_m" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#1A73E8;strokeWidth=1.5" edge="1" parent="1" source="row_orch" target="mid_vertex_search">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_m_c1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#1D4ED8;strokeWidth=1.5" edge="1" parent="1" source="mid_vertex_search" target="conn_psc">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_m_c2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#1D4ED8;strokeWidth=1.5" edge="1" parent="1" source="mid_secret" target="conn_vpn">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_m_c3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#1D4ED8;strokeWidth=1.5" edge="1" parent="1" source="mid_audit" target="conn_interconnect">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="edge_c1_d1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#5F6368;strokeWidth=1.5;dashed=1" edge="1" parent="1" source="conn_psc" target="data_snowflake">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_c2_d2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#5F6368;strokeWidth=1.5;dashed=1" edge="1" parent="1" source="conn_vpn" target="data_lims">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_c3_d3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#5F6368;strokeWidth=1.5;dashed=1" edge="1" parent="1" source="conn_interconnect" target="data_unifiedstore">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        
        <!-- Clinician Feedback Human Loop link -->
        <mxCell id="edge_human_loop" style="edgeStyle=orthogonalEdgeStyle;rounded=1;curved=1;strokeColor=#EA4335;strokeWidth=1.5;dashed=1" edge="1" parent="1" source="orch_humangate" target="user_clinician_review">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        
        <!-- Architectural Decision Rationale Panel -->
        <mxCell id="scoper_rationale" value="&lt;div style=&quot;font-family: sans-serif; padding: 6px 10px;&quot;&gt;
  &lt;div style=&quot;font-size: 9px; font-weight: bold; color: #5F6368; text-align: center; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; margin-bottom: 6px; letter-spacing: 0.5px;&quot;&gt;
    ARCHITECTURAL DECISION RATIONALE — WHY EACH CHOICE WAS MADE
  &lt;/div&gt;
  &lt;div style=&quot;display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; font-size: 8px; color: #374151; text-align: left;&quot;&gt;
    &lt;div style=&quot;border-right: 1px solid #E5E7EB; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #1A73E8; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D1 · Consolidate on GCP&lt;/strong&gt;
      Eliminates 3 cross-cloud PHI hops, $14–18K/yr egress, and 3 separate compliance postures in one move.
    &lt;/div&gt;
    &lt;div style=&quot;border-right: 1px solid #E5E7EB; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #1A73E8; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D2 · 4 specialists &amp;gt; 1&lt;/strong&gt;
      Protocol, regulatory, safety, and data agents each tuned to domain data, tools, and eval criteria.
    &lt;/div&gt;
    &lt;div style=&quot;border-right: 1px solid #E5E7EB; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #1A73E8; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D3 · Orch owns GxP trace&lt;/strong&gt;
      Every agent decision, input, output immutably logged at orchestrator layer. 21 CFR requires this.
    &lt;/div&gt;
    &lt;div style=&quot;border-right: 1px solid #E5E7EB; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #1A73E8; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D4 · PSC over internet&lt;/strong&gt;
      HIPAA: PHI must never traverse public internet. PSC + HA VPN keeps all traffic private.
    &lt;/div&gt;
    &lt;div style=&quot;border-right: 1px solid #E5E7EB; padding-right: 5px;&quot;&gt;
      &lt;strong style=&quot;color: #1A73E8; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D5 · BQ as unified store&lt;/strong&gt;
      Replicate once, query forever. Grounding corpus, DLP, and analytics in one layer. Zero egress cost.
    &lt;/div&gt;
    &lt;div&gt;
      &lt;strong style=&quot;color: #1A73E8; font-size: 8.5px; display: block; margin-bottom: 1px;&quot;&gt;D6 · Human gate in Orch&lt;/strong&gt;
      Clinical AI must have a defined approve/override path. Gate lives in mesh, not in each agent.
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;rounded=1;arcSize=4;fillColor=#FFFDF9;strokeColor=#E5E7EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="1110" width="1050" height="80" as="geometry" />
        </mxCell>

        <!-- Diagram Legend Panel -->
        <mxCell id="scoper_legend" value="&lt;div style=&quot;display: flex; flex-wrap: wrap; gap: 8px 20px; font-family: sans-serif; font-size: 9.5px; color: #374151; padding: 6px 10px; text-align: left; justify-content: center;&quot;&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #137333; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;GCP / GEA services&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #4285F4; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Agent orchestration mesh&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #D97706; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;AWS sources&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #1D4ED8; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Azure sources&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #7F8C8D; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;On-prem&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; background-color: #EA4335; border-radius: 2px;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Gap / blocker&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; border-bottom: 2.5px dashed #EA4335;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Public internet (current)&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 20px; height: 4px; border-bottom: 2.5px dashed #137333;&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;Private flow (target)&lt;/strong&gt;
  &lt;/div&gt;
  &lt;div style=&quot;display: flex; align-items: center; gap: 6px;&quot;&gt;
    &lt;span style=&quot;display: inline-block; width: 14px; height: 10px; border: 1.5px dashed #4285F4; border-radius: 2px; background-color: rgba(66, 133, 244, 0.05);&quot;&gt;&lt;/span&gt;
    &lt;strong&gt;VPC-SC perimeter&lt;/strong&gt;
  &lt;/div&gt;
&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;rounded=1;arcSize=6;fillColor=#FFFDF9;strokeColor=#E5E7EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="1210" width="1050" height="50" as="geometry" />
        </mxCell>
        </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

    const [drawIoCurrentXml, setDrawIoCurrentXml] = useState(defaultDrawIoCurrentXml);
  const [drawIoTargetXml, setDrawIoTargetXml] = useState(defaultDrawIoTargetXml);
  const [drawIoProdCurrentXml, setDrawIoProdCurrentXml] = useState(defaultDrawIoProdCurrentXml);
  const [drawIoProdTargetXml, setDrawIoProdTargetXml] = useState(defaultDrawIoProdTargetXml);
  const [drawIoNetCurrentXml, setDrawIoNetCurrentXml] = useState(defaultDrawIoNetCurrentXml);
  const [drawIoNetTargetXml, setDrawIoNetTargetXml] = useState(defaultDrawIoNetTargetXml);
  const [drawIoScoperCurrentXml, setDrawIoScoperCurrentXml] = useState(defaultDrawIoScoperCurrentXml);
  const [drawIoScoperTargetXml, setDrawIoScoperTargetXml] = useState(defaultDrawIoScoperTargetXml);



  // --- Dynamic Viewports (4 Tiers) State ---
  const [rightSidebarTab, setRightSidebarTab] = useState('customizer'); // 'customizer' | 'playbook'
  const [activeViewpointTier, setActiveViewpointTier] = useState('context'); // 'context' | 'functional' | 'technical' | 'implementation'

  const [metadata, setMetadata] = useState({
    userName: '',
    userEmail: '',
    customerName: '',
    subVertical: 'Commercial Biopharma',
    useCaseName: '',
    useCaseDesc: '',
    targetUserCount: '',
    phase0WorkflowNarrative: '',
    phase0DataPerimeters: '',
    phase0Idp: '',
    phase0UploadedDiagramName: ''
  });

  // --- State for current pillar and question indices ---
  const [currentPillarIdx, setCurrentPillarIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // --- Assessment Scoring State ---
  const [scores, setScores] = useState({}); // schema: { [questionId]: { current: num, future: num, techPain: [], bizPain: [], comments: "", skipped: bool } }

  // --- Evaluation Report States ---
  const [isCompiling, setIsCompiling] = useState(false);
  const [maturityReport, setMaturityReport] = useState(null);
  const [reportError, setReportError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // --- Real-Time Dynamic Architecture XML Bindings ---
  useEffect(() => {
    if (!metadata.customerName && !metadata.subVertical) return;

    const client = metadata.customerName || 'Merck GSF';
    const vertical = metadata.subVertical || 'Clinical Operations';

    // 1. Morph User Roles dynamically based on the selected Sub-Vertical!
    let u1 = 'Clinical ops'; let u1Sub = 'Protocol review';
    let u2 = 'Med. writers'; let u2Sub = 'CTD authoring';
    let u3 = 'Reg. affairs'; let u3Sub = 'Submission QA';
    let u4 = 'Drug safety'; let u4Sub = 'Signal detection';

    if (metadata.subVertical === 'Molecular R&D Discovery') {
      u1 = 'Lead Biologist'; u1Sub = 'Target validation';
      u2 = 'Bioinformatician'; u2Sub = 'FASTA/SMILES analysis';
      u3 = 'Screening Lead'; u3Sub = 'High-throughput assays';
      u4 = 'IP Counsel'; u4Sub = 'Patent filing QA';
    } else if (metadata.subVertical === 'Supply Chain & CMC') {
      u1 = 'CMC Lead'; u1Sub = 'Chemical processing';
      u2 = 'Plant Manager'; u2Sub = 'Batch record authoring';
      u3 = 'Quality Control'; u3Sub = 'SOP validation';
      u4 = 'Logistics Ops'; u4Sub = 'Cold chain tracking';
    } else if (metadata.subVertical === 'Commercial Biopharma') {
      u1 = 'Brand Manager'; u1Sub = 'Marketing review';
      u2 = 'Medical Writer'; u2Sub = 'Ad copy authoring';
      u3 = 'Market Access'; u3Sub = 'Reimbursement QA';
      u4 = 'Compliance Lead'; u4Sub = 'MLR review gate';
    }

    // 2. Swap Data Perimeters based on user custom inputs
    let customDataText = metadata.phase0DataPerimeters || 'Snowflake, AWS, S3, Veeva, SharePoint, Oracle';
    let customDataList = customDataText.split(',').map(s => s.trim()).filter(Boolean);
    
    let db1 = customDataList[0] || 'Snowflake';
    let db2 = customDataList[1] || 'S3 / Veeva';
    let db3 = customDataList[2] || 'Oracle / LIMS';
    let db4 = customDataList[3] || 'SharePoint';
    let db5 = customDataList[4] || 'Veeva Vault';

    // 3. Apply dynamic replacements to defaultDrawIoScoperCurrentXml
    let currentXml = defaultDrawIoScoperCurrentXml
      .replace(/Merck GSF/g, client)
      .replace(/Clinical Operations/g, vertical)
      .replace(/Clinical ops/g, u1).replace(/Protocol review/g, u1Sub)
      .replace(/Med. writers/g, u2).replace(/CTD authoring/g, u2Sub)
      .replace(/Reg. affairs/g, u3).replace(/Submission QA/g, u3Sub)
      .replace(/Drug safety/g, u4).replace(/Signal detection/g, u4Sub)
      .replace(/Snowflake/g, db1)
      .replace(/S3 \/ Veeva/g, db2)
      .replace(/Oracle \/ LIMS/g, db3)
      .replace(/SharePoint/g, db4)
      .replace(/Veeva Vault/g, db5);

    // 4. Apply dynamic replacements to defaultDrawIoScoperTargetXml
    let targetXml = defaultDrawIoScoperTargetXml
      .replace(/Merck GSF/g, client)
      .replace(/Clinical Operations/g, vertical)
      .replace(/Clinical ops/g, u1).replace(/GEA workspace/g, 'GEA workspace')
      .replace(/Med. writers/g, u2)
      .replace(/Reg. affairs/g, u3)
      .replace(/Drug safety/g, u4)
      .replace(/Snowflake/g, db1)
      .replace(/S3 \/ Veeva/g, db2)
      .replace(/Oracle \/ LIMS/g, db3)
      .replace(/SharePoint/g, db4)
      .replace(/Veeva Vault/g, db5);

    // 5. Apply dynamic LLM-backed architectural rationales!
    if (maturityReport && maturityReport.architecturalRationales) {
      const rat = maturityReport.architecturalRationales;
      if (rat.d1) currentXml = currentXml.replace("Data scattered across AWS us-east-1 Snowflake, AWS S3, Azure SharePoint, Veeva Vault, and On-Premise Oracle/LIMS.", rat.d1);
      if (rat.d2) currentXml = currentXml.replace("All tasks routed manually to a single monolithic Azure OpenAI GPT-4o API without grounding or specialization.", rat.d2);
      if (rat.d3) currentXml = currentXml.replace("No supervisor agent, tool registry, or human gate. Zero automated 21 CFR Part 11 audit trail is scoped.", rat.d3);
      if (rat.d4) currentXml = currentXml.replace("PHI crosses 3 multi-cloud boundaries unprotected over public internet, driving severe HIPAA and egress fee risks.", rat.d4);
      if (rat.d5) currentXml = currentXml.replace("5 completely disconnected data stores with no schema documentation, no data steward, and no unified grounding corpus.", rat.d5);
      if (rat.d6) currentXml = currentXml.replace("No session memory or prompt versioning. Users query model manually, driving high hallucination and safety risks.", rat.d6);
    }

    setDrawIoScoperCurrentXml(currentXml);
    setDrawIoScoperTargetXml(targetXml);
    
    console.log("DEBUG TELEMETRY: Real-Time dynamic architecture mapping morph complete!", { client, vertical, u1, db1 });
  }, [metadata.customerName, metadata.subVertical, metadata.phase0DataPerimeters]);


  // Sync loaded session context from global state on activeSessionId change
  useEffect(() => {
    console.log("DEBUG TELEMETRY: Sync Loaded Session triggered!", { activeSessionId, sessionsCount: sessions.length });
    if (activeSessionId) {
      const activeSess = sessions.find(s => s.id === activeSessionId);
      console.log("DEBUG TELEMETRY: Found Active Session:", activeSess);
      if (activeSess && (activeSess.framework === 'option5' || activeSess.framework === 'option6')) {
        const latestVer = (activeSess.versions && activeSess.versions.length > 0)
          ? activeSess.versions[activeSess.versions.length - 1]
          : null;
        console.log("DEBUG TELEMETRY: Latest Version:", latestVer);
        
        setMetadata(latestVer?.formData || activeSess.formData || {});
        setScores(latestVer?.scores || activeSess.scores || {});
        setMaturityReport(latestVer?.rawResponse || activeSess.rawResponse);
        if (latestVer?.scoperCurrentXml) {
          setDrawIoScoperCurrentXml(latestVer.scoperCurrentXml);
        }
        if (latestVer?.scoperTargetXml) {
          setDrawIoScoperTargetXml(latestVer.scoperTargetXml);
        }
        setSimulatedRemediations([]); // reset simulations on loading fresh session
        setSelectedDrilldownPillar(null); // reset drilldowns
        setIsDirty(false); // Reset dirty state since this is a loaded saved report!
        setViewSubMode('report'); // Skip setup/editor and show the report immediately!
      }
    } else {
      // Clear state if activeSessionId is reset (e.g. when clicking Start Fresh)
      setMetadata({
        userName: '',
        userEmail: '',
        customerName: '',
        subVertical: 'Commercial Biopharma',
        useCaseName: '',
        useCaseDesc: '',
        targetUserCount: '',
        phase0WorkflowNarrative: '',
        phase0DataPerimeters: '',
        phase0Idp: '',
        phase0UploadedDiagramName: ''
      });
      setScores({});
      setMaturityReport(null);
      setSimulatedRemediations([]);
      setSelectedDrilldownPillar(null);
      setIsDirty(true); // New empty session is dirty by default!
      setViewSubMode('setup');
    }
  }, [activeSessionId, sessions]);

  const [roiUserScale, setRoiUserScale] = useState(11000); // Dynamic active user scale slider!

  // Dynamic ROI Calculators based on user scale
  const getDynamicROIMetrics = (scale) => {
    let tcoMin = 15;
    let tcoMax = 25;
    let payback = 12;
    
    if (scale >= 20000) {
      tcoMin = 52; tcoMax = 68; payback = 3;
    } else if (scale >= 10000) {
      tcoMin = 35; tcoMax = 48; payback = 5;
    } else if (scale >= 5000) {
      tcoMin = 30; tcoMax = 42; payback = 6;
    } else if (scale >= 1000) {
      tcoMin = 25; tcoMax = 35; payback = 8;
    } else if (scale >= 500) {
      tcoMin = 20; tcoMax = 28; payback = 10;
    }

    // Compute estimated hard dollars saved (hours saved multiplied by commercial FTE rate)
    // Assumes 2 operations/week per user, saving 7.5 hours per transaction at an average $65/hr fully-burdened rate
    const annualHoursSaved = scale * 2 * 52 * 7.5;
    const annualDollarsSaved = annualHoursSaved * 65;

    let formattedDollars = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(annualDollarsSaved);

    return {
      tcoRange: `${tcoMin}% - ${tcoMax}%`,
      paybackPeriod: `${payback} Months`,
      hoursSaved: new Intl.NumberFormat('en-US').format(Math.round(annualHoursSaved)),
      dollarsSaved: formattedDollars
    };
  };

  const roi = getDynamicROIMetrics(roiUserScale);

  // Sync slider with metadata target count when report loads
  useEffect(() => {
    if (viewSubMode === 'report' && metadata.targetUserCount) {
      const parsed = parseInt(metadata.targetUserCount, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setRoiUserScale(parsed);
      }
    }
  }, [viewSubMode, metadata.targetUserCount]);

  const activePillar = PILLARS[currentPillarIdx];
  const activeQuestion = activePillar.questions[currentQuestionIdx];
  const currentQuestionState = scores[activeQuestion.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };

  // A question is considered completed if it is either skipped OR has all required inputs filled
  const isQuestionCompleted = (qId) => {
    const qState = scores[qId];
    if (!qState) return false;
    if (qState.skipped) return true;
    return (
      qState.current !== null &&
      qState.future !== null &&
      qState.techPain && qState.techPain.length > 0 &&
      qState.bizPain && qState.bizPain.length > 0 &&
      qState.comments && qState.comments.trim() !== ''
    );
  };

  // Progress calculations
  const totalQuestions = PILLARS.reduce((acc, p) => acc + p.questions.length, 0);
  const answeredQuestions = PILLARS.reduce((acc, p) => acc + p.questions.filter(q => isQuestionCompleted(q.id)).length, 0);
  const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  // Pillar-specific progress calculation
  const getPillarProgress = (pillarKey) => {
    const pillar = PILLARS.find(p => p.key === pillarKey);
    if (!pillar) return { count: 0, total: 10, pct: 0 };
    const answered = pillar.questions.filter(q => isQuestionCompleted(q.id)).length;
    return {
      count: answered,
      total: pillar.questions.length,
      pct: Math.round((answered / pillar.questions.length) * 100)
    };
  };

  const getPillarCompletionStats = (pillar) => {
    const prog = getPillarProgress(pillar.key);
    return { completed: prog.count, total: prog.total };
  };

  // Check if at least one pillar (section) is 100% completed
  const hasCompletedPillar = PILLARS.some(p => {
    const prog = getPillarProgress(p.key);
    return prog.count === prog.total;
  });

  // =================================================
  // 💻 UNIFIED BUILDABLE ARCHITECTURE CANVAS (A-Game!)
  // =================================================
  // =================================================
  // 💻 UNIFIED BUILDABLE ARCHITECTURE CANVAS (A-Game!)
  // =================================================
  const [maturityTopology, setMaturityTopology] = useState({
    context_current: {
      nodes: [
        { id: "actor_employees", label: "Custom Web Intake Client", type: "frontend", x: 30, y: 140, status: "Siloed", width: 190, height: 80 },
        { id: "actor_customers", label: "Direct External API Gateway", type: "security", x: 250, y: 30, status: "Exposed", width: 190, height: 80 },
        { id: "sap_erp", label: "On-Prem SAP ERP Connector", type: "database", x: 470, y: 140, status: "Siloed", width: 190, height: 80 }
      ],
      edges: [
        { from: "actor_employees", to: "actor_customers", label: "Exposed HTTPS" },
        { from: "actor_customers", to: "sap_erp", label: "SOAP Connection" }
      ]
    },
    context_future: {
      nodes: [
        { id: "actor_employees", label: "Gemini Workspace Apps", type: "frontend", x: 30, y: 140, status: "Integrated", width: 190, height: 80 },
        { id: "google_hub", label: "Google Workspace Hub", type: "security", x: 250, y: 30, status: "Secure", width: 190, height: 80 },
        { id: "veeva_vault", label: "Salesforce & Veeva Vault", type: "database", x: 470, y: 30, status: "Active", width: 190, height: 80 },
        { id: "iam_identity", label: "OAuth Access entitlements", type: "storage", x: 470, y: 250, status: "Compliant", width: 190, height: 80 }
      ],
      edges: [
        { from: "actor_employees", to: "google_hub", label: "Secure OAuth" },
        { from: "google_hub", to: "veeva_vault", label: "REST Connector" },
        { from: "google_hub", to: "iam_identity", label: "Dynamic ABAC" }
      ]
    },
    functional_current: {
      nodes: [
        { id: "manual_loader", label: "Manual document loader scripts", type: "frontend", x: 30, y: 140, status: "Legacy", width: 190, height: 80 },
        { id: "raw_gcs", label: "GCS raw staging folders", type: "security", x: 250, y: 30, status: "Raw data", width: 190, height: 80 },
        { id: "python_summarizer", label: "Unmanaged Python summarizer", type: "ai", x: 470, y: 140, status: "Siloed RAG", width: 190, height: 80 }
      ],
      edges: [
        { from: "manual_loader", to: "raw_gcs", label: "Flat File sync" },
        { from: "raw_gcs", to: "python_summarizer", label: "Naive chunking" }
      ]
    },
    functional_future: {
      nodes: [
        { id: "adk_framework", label: "GCP Agent framework (ADK)", type: "frontend", x: 30, y: 140, status: "Integrated", width: 190, height: 80 },
        { id: "supervisor_agent", label: "Main Router Agent (Supervisor)", type: "security", x: 250, y: 30, status: "Active", width: 190, height: 80 },
        { id: "research_agent", label: "Specialized Research subagent", type: "ai", x: 250, y: 250, status: "Thinking", width: 190, height: 80 },
        { id: "bigquery_staging", label: "BigQuery Grounding Index", type: "database", x: 470, y: 30, status: "Enterprise", width: 190, height: 80 },
        { id: "rag_grounding", label: "RAG grounding pipeline", type: "storage", x: 470, y: 250, status: "Grounded", width: 190, height: 80 }
      ],
      edges: [
        { from: "adk_framework", to: "supervisor_agent", label: "Task dispatch" },
        { from: "supervisor_agent", to: "research_agent", label: "Delegate Research" },
        { from: "supervisor_agent", to: "bigquery_staging", label: "Structured RAG" },
        { from: "research_agent", to: "rag_grounding", label: "Vector search" }
      ]
    },
    technical_current: {
      nodes: [
        { id: "exposed_vm", label: "Exposed Public Compute VM", type: "frontend", x: 30, y: 140, status: "Exposed", width: 190, height: 80 },
        { id: "public_nat", label: "Direct Public NAT routing", type: "security", x: 250, y: 30, status: "Exposed", width: 190, height: 80 },
        { id: "unsecured_db", label: "Cloud SQL (Unencrypted JDBC)", type: "database", x: 470, y: 140, status: "Legacy", width: 190, height: 80 }
      ],
      edges: [
        { from: "exposed_vm", to: "public_nat", label: "Unsecure NAT" },
        { from: "public_nat", to: "unsecured_db", label: "Port Exposure" }
      ]
    },
    technical_future: {
      nodes: [
        { id: "vpc_network", label: "Virtual Private Cloud Subnets", type: "frontend", x: 30, y: 140, status: "Active", width: 190, height: 80 },
        { id: "vpc_sc_perimeter", label: "VPC Service Controls perimeter", type: "security", x: 250, y: 30, status: "Compliant", width: 190, height: 80 },
        { id: "agent_gateway", label: "Agent Gateway Load balancer", type: "ai", x: 250, y: 250, status: "Active", width: 190, height: 80 },
        { id: "model_armor", label: "Model Armor safety Guardrail", type: "database", x: 470, y: 30, status: "Secure", width: 190, height: 80 },
        { id: "gemini_endpoints", label: "Gemini Foundational LLM API", type: "storage", x: 470, y: 250, status: "GCP Managed", width: 190, height: 80 }
      ],
      edges: [
        { from: "vpc_network", to: "vpc_sc_perimeter", label: "Perimeter check" },
        { from: "vpc_sc_perimeter", to: "agent_gateway", label: "Secure traffic" },
        { from: "agent_gateway", to: "model_armor", label: "PII Masking" },
        { from: "model_armor", to: "gemini_endpoints", label: "Grounding call" }
      ]
    },
    implementation_current: {
      nodes: [
        { id: "hardcoded_prompts", label: "Hardcoded standard strings", type: "frontend", x: 30, y: 140, status: "Legacy", width: 190, height: 80 },
        { id: "unprotected_folder", label: "Unprotected local files", type: "security", x: 250, y: 30, status: "Unsecure", width: 190, height: 80 },
        { id: "direct_payload", label: "Raw unversioned API payloads", type: "database", x: 470, y: 140, status: "Untuned", width: 190, height: 80 }
      ],
      edges: [
        { from: "hardcoded_prompts", to: "unprotected_folder", label: "Direct import" },
        { from: "unprotected_folder", to: "direct_payload", label: "Sync API execution" }
      ]
    },
    implementation_future: {
      nodes: [
        { id: "tool_schema", label: "OpenAPI specification tool", type: "frontend", x: 30, y: 140, status: "Grounded", width: 190, height: 80 },
        { id: "sandbox_run", label: "Sandboxed Cloud Run instances", type: "security", x: 250, y: 30, status: "Active", width: 190, height: 80 },
        { id: "few_shot_prompt", label: "Dynamic prompt templates", type: "ai", x: 250, y: 250, status: "Thinking", width: 190, height: 80 },
        { id: "sequence_orchestrator", label: "UML Request orchestrator", type: "database", x: 470, y: 30, status: "Enterprise", width: 190, height: 80 },
        { id: "conv_history", label: "Conversation history buffer", type: "storage", x: 470, y: 250, status: "Active", width: 190, height: 80 }
      ],
      edges: [
        { from: "tool_schema", to: "sandbox_run", label: "Schema definition" },
        { from: "sandbox_run", to: "few_shot_prompt", label: "In-context input" },
        { from: "few_shot_prompt", to: "sequence_orchestrator", label: "Payload dispatch" },
        { from: "sequence_orchestrator", to: "conv_history", label: "Memory State sync" }
      ]
    }
  });

  const [draggedNode, setDraggedNode] = useState(null); // { type: 'current'|'future', key: 'nodeId' }
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  const [selectedArchNode, setSelectedArchNode] = useState(null); // { type: 'current'|'future', key: 'nodeId' }
  const [isAddingConnection, setIsAddingConnection] = useState(false); // Connection router status!
  const [newConnectionSource, setNewConnectionSource] = useState(null); // Source node ID for new edges
  const [activeTopologyState, setActiveTopologyState] = useState('future'); // 'current' | 'future' switcher!

  
  // Diagonal SE Resize corner grab state tracking hooks!
  const [resizingNode, setResizingNode] = useState(null); // { type: 'current'|'future', key: 'nodeId' }
  const [resizeStartDimensions, setResizeStartDimensions] = useState({ width: 0, height: 0, startX: 0, startY: 0 });

  // Dynamic helper to retrieve active topology dictionary key based on 4 Tiers & Active state switch
  const getActiveTopologyKey = () => {
    const mapping = {
      6: 'context',
      7: 'functional',
      8: 'technical',
      9: 'implementation'
    };
    const viewpoint = mapping[activeExplorerTab] || 'context';
    return `${viewpoint}_${activeTopologyState}`;
  };

  const handleNodeDragStart = (e, type, nodeId) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    setDraggedNode({ type, key: nodeId });
    setDragStartOffset({ x: clickX, y: clickY });
    
    const activeNode = maturityTopology[type].nodes.find(n => n.id === nodeId);
    if (activeNode) {
      setSelectedArchNode({ type, key: nodeId });
    }
  };

  const handleNodeResizeStart = (e, type, nodeId) => {
    e.stopPropagation();
    e.preventDefault();
    const activeNode = maturityTopology[type].nodes.find(n => n.id === nodeId);
    if (!activeNode) return;

    setResizingNode({ type, key: nodeId });
    setResizeStartDimensions({
      width: activeNode.width || 190,
      height: activeNode.height || 80,
      startX: e.clientX,
      startY: e.clientY
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (draggedNode) {
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - dragStartOffset.x;
      const y = e.clientY - canvasRect.top - dragStartOffset.y;
      
      const type = draggedNode.type;
      const activeNode = maturityTopology[type].nodes.find(n => n.id === draggedNode.key);
      const w = activeNode ? (activeNode.width || 190) : 190;
      const h = activeNode ? (activeNode.height || 80) : 80;

      const clampedX = Math.max(Math.min(x, canvasRect.width - w - 15), 10);
      const clampedY = Math.max(Math.min(y, canvasRect.height - h - 15), 10);
      
      setMaturityTopology(prev => {
        const updatedNodes = prev[type].nodes.map(node => {
          if (node.id === draggedNode.key) {
            return { ...node, x: Math.round(clampedX), y: Math.round(clampedY) };
          }
          return node;
        });
        return {
          ...prev,
          [type]: {
            ...prev[type],
            nodes: updatedNodes
          }
        };
      });
    } else if (resizingNode) {
      const dx = e.clientX - resizeStartDimensions.startX;
      const dy = e.clientY - resizeStartDimensions.startY;
      
      const newWidth = Math.max(resizeStartDimensions.width + dx, 140); // clamp min width 140px
      const newHeight = Math.max(resizeStartDimensions.height + dy, 65); // clamp min height 65px
      
      setMaturityTopology(prev => {
        const type = resizingNode.type;
        const updatedNodes = prev[type].nodes.map(node => {
          if (node.id === resizingNode.key) {
            return { ...node, width: Math.round(newWidth), height: Math.round(newHeight) };
          }
          return node;
        });
        return {
          ...prev,
          [type]: {
            ...prev[type],
            nodes: updatedNodes
          }
        };
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setDraggedNode(null);
    setResizingNode(null);
  };

  const handleDeployCustomNode = (category) => {
    const type = getActiveTopologyKey();
    const nodeId = `node_${Date.now().toString().slice(-4)}`;
    
    const categoryNames = {
      frontend: "Custom Client Ingress",
      security: "Managed Cloud NAT Gateway",
      ai: "Vertex AI Reasoning Hub",
      database: "Cloud Spanner Storage",
      storage: "GxP Cloud Storage"
    };

    const defaultStatus = {
      frontend: "Siloed",
      security: "Active",
      ai: "Grounded",
      database: "Enterprise",
      storage: "GxP WORM"
    };

    const newNode = {
      id: nodeId,
      label: categoryNames[category] || "Google Cloud Core",
      type: category,
      x: 150 + Math.random() * 100,
      y: 100 + Math.random() * 100,
      status: defaultStatus[category] || "Active",
      width: 190,
      height: 80
    };

    setMaturityTopology(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        nodes: [...prev[type].nodes, newNode]
      }
    }));
    
    setSelectedArchNode({ type, key: nodeId });
  };

  const handleDeleteArchNode = (nodeId) => {
    const type = getActiveTopologyKey();
    if (!confirm("Are you sure you want to delete this service block? Any connecting arrow lines will be broken automatically.")) return;

    setMaturityTopology(prev => {
      const filteredNodes = prev[type].nodes.filter(n => n.id !== nodeId);
      const filteredEdges = prev[type].edges.filter(e => e.from !== nodeId && e.to !== nodeId);
      return {
        ...prev,
        [type]: {
          nodes: filteredNodes,
          edges: filteredEdges
        }
      };
    });
    setSelectedArchNode(null);
    setIsAddingConnection(false);
  };

  const handleAddConnectionClick = (nodeId) => {
    const type = getActiveTopologyKey();
    if (!isAddingConnection) {
      setIsAddingConnection(true);
      setNewConnectionSource(nodeId);
    } else {
      if (newConnectionSource === nodeId) {
        setIsAddingConnection(false);
        setNewConnectionSource(null);
        return;
      }
      
      const edgeExists = maturityTopology[type].edges.some(e => e.from === newConnectionSource && e.to === nodeId);
      if (!edgeExists) {
        const label = prompt("Enter secure connection pipeline protocol (e.g. Secure gRPC, HTTPS, VPN, JDBC):", "Secure HTTPS");
        if (label !== null) {
          setMaturityTopology(prev => ({
            ...prev,
            [type]: {
              ...prev[type],
              edges: [...prev[type].edges, {
                from: newConnectionSource,
                to: nodeId,
                label: label || "Connected Link"
              }]
            }
          }));
        }
      }
      setIsAddingConnection(false);
      setNewConnectionSource(null);
    }
  };

  const handleDeleteConnectionEdge = (idx) => {
    const type = getActiveTopologyKey();
    if (!confirm("Delete this connection pipeline edge?")) return;
    
    setMaturityTopology(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        edges: prev[type].edges.filter((_, i) => i !== idx)
      }
    }));
  };

  const handleArchNodeAttributeChange = (field, val) => {
    if (!selectedArchNode) return;
    const { type, key } = selectedArchNode;
    
    setMaturityTopology(prev => {
      const updatedNodes = prev[type].nodes.map(node => {
        if (node.id === key) {
          return { ...node, [field]: val };
        }
        return node;
      });
      return {
        ...prev,
        [type]: {
          ...prev[type],
          nodes: updatedNodes
        }
      };
    });
  };

  // Dynamic theme styling config
  const getNodeTheme = (type) => {
    const themes = {
      frontend: { text: 'var(--google-blue)', border: '4px solid var(--google-blue)', badge: '💻 FRONTEND INGRESS' },
      security: { text: 'var(--google-green)', border: '4px solid var(--google-green)', badge: '🛡️ SECURITY HOOK' },
      ai: { text: 'var(--google-purple)', border: '4px solid var(--google-purple)', badge: '✨ AI REASONING CORE' },
      database: { text: 'var(--google-amber)', border: '4px solid var(--google-amber)', badge: '🗄️ DATABASE / RAG' },
      storage: { text: '#00bcd4', border: '4px solid #00bcd4', badge: '📦 REGULATORY WORM BUCKET' }
    };
    return themes[type] || { text: 'var(--text-secondary)', border: '4px solid var(--text-secondary)', badge: '⚙️ GCP SERVICE CORE' };
  };

  const ARCH_ALTERNATES = {
    frontend: ['Gemini Workspace Conversational Agent', 'Custom React Vertex Agent UI', 'Veeva Vault Embedded Widget'],
    security: ['Google VPC-SC Private Service Connect', 'Apigee API Management Gateway', 'Managed Cloud NAT Secure Proxy'],
    orchestrator: ['Vertex AI Agent (Reasoning Engine)', 'Managed Cloud Run Python Agent', 'Vertex Extensions Middleware'],
    database: ['Cloud BigQuery Grounding Index', 'AlloyDB AI pgvector database', 'Vertex Vector Search Serverless'],
    storage: ['Cloud Storage GxP compliant WORM Bucket', 'Cloud SQL Archived database', 'BigQuery cold-tier partition WORM']
  };

  // ==========================================
  // 📊 WHAT-IF SENSITIVITY SIMULATOR RE-CALCULATIONS
  // ==========================================
  const getSimulatedReport = () => {
    if (!maturityReport) return null;
    if (simulatedRemediations.length === 0) return maturityReport;

    // Deep copy report object to avoid mutating original state
    const sim = JSON.parse(JSON.stringify(maturityReport));

    // Recalculate GAP Analysis bars per pillar based on checked simulated roadmaps
    sim.pillarGapAnalysis = sim.pillarGapAnalysis.map(p => {
      // Find how many checked simulated remediations belong to this specific pillar
      const pillarKey = PILLARS.find(pil => pil.name === p.pillarName)?.key || 'UX';
      const simulatedInPillar = simulatedRemediations.filter(id => id.startsWith(pillarKey));

      if (simulatedInPillar.length > 0) {
        // Raise current maturity average dynamically (e.g., 0.45 bump per resolved issue, clamped to target)
        const newCurrent = Math.min(p.currentAverage + (simulatedInPillar.length * 0.45), p.futureAverage);
        return {
          ...p,
          currentAverage: newCurrent,
          gapScore: Math.max(p.futureAverage - newCurrent, 0)
        };
      }
      return p;
    });

    // Recalculate average overall Suitability Index and separate business/technical sub-indices
    const overallCurrent = sim.pillarGapAnalysis.reduce((sum, g) => sum + g.currentAverage, 0) / sim.pillarGapAnalysis.length;
    
    // Simulate dual indices rising accordingly
    const activeRemediationsCount = simulatedRemediations.length;
    const simulatedBusiness = Math.min(sim.executiveSummary.businessReadiness + (activeRemediationsCount * 0.25), 5.0);
    const simulatedTechnical = Math.min(sim.executiveSummary.technicalReadiness + (activeRemediationsCount * 0.35), 5.0);
    
    let maturityGrade = "C";
    let maturityLabel = "Staged Transformation Candidate";
    if (overallCurrent >= 4.0) {
      maturityGrade = "A+";
      maturityLabel = "Cloud Native Leader";
    } else if (overallCurrent >= 3.0) {
      maturityGrade = "B";
      maturityLabel = "Advanced Scaled Ready";
    } else if (overallCurrent <= 1.5) {
      maturityGrade = "D";
      maturityLabel = "Foundational Build Required | Strategic Agent Initiative";
    }

    sim.executiveSummary.maturityGrade = maturityGrade;
    sim.executiveSummary.maturityLabel = maturityLabel;
    sim.executiveSummary.businessReadiness = simulatedBusiness;
    sim.executiveSummary.technicalReadiness = simulatedTechnical;
    sim.executiveSummary.rationale = `Simulated Scoping Dossier for ${metadata.customerName}. Real-time remediation tracking applied! Having successfully checked and mitigated ${simulatedRemediations.length} critical path roadblocks, your projected Suitability Index has risen to ${overallCurrent.toFixed(1)}/5.0, lifting your overall Executive Verdict grade to a strong "${maturityGrade}" (${maturityLabel})! Business Fit averages ${simulatedBusiness.toFixed(1)}/5.0, while Technical Fit sits at ${simulatedTechnical.toFixed(1)}/5.0.`;

    return sim;
  };

  const activeReport = getSimulatedReport();
  console.log("DEBUG TELEMETRY: Render pass state check:", { viewSubMode, activeReportIsNull: activeReport === null, maturityReportIsNull: maturityReport === null });

  const handleToggleSimulation = (topicId) => {
    setSimulatedRemediations(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      }
      return [...prev, topicId];
    });
  };

  const handleMetaInputChange = (field, val) => {
    setMetadata(prev => ({ ...prev, [field]: val }));
    setIsDirty(true);
  };

  const handleMetaSubmit = (e) => {
    e.preventDefault();
    if (!metadata.userName || !metadata.userEmail || !metadata.customerName || !metadata.useCaseName) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    setViewSubMode('assessor');
  };

  const handleOptionSelect = (dimensionType, value) => {
    const qId = activeQuestion.id;
    setScores(prev => {
      const state = prev[qId] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
      let current = state.current;
      let future = state.future;

      if (dimensionType === 'current') {
        current = value;
        if (future !== null && future < value) {
          future = value; // Clamp Future State to be at least equal to Current State
        }
      } else if (dimensionType === 'future') {
        future = value;
        if (current !== null && current > value) {
          current = value; // Clamp Current State to be at most equal to Future State
        }
      }

      return {
        ...prev,
        [qId]: {
          ...state,
          current,
          future,
          skipped: false
        }
      };
    });
    setIsDirty(true);
  };

  const handlePainpointToggle = (category, index) => {
    const qId = activeQuestion.id;
    const painpointList = category === 'tech' ? activeQuestion.technicalPainpoints : activeQuestion.businessPainpoints;
    const activeText = painpointList[index];
    
    setScores(prev => {
      const state = prev[qId] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
      const targetArray = category === 'tech' ? [...state.techPain] : [...state.bizPain];
      
      const idxOf = targetArray.indexOf(activeText);
      if (idxOf >= 0) {
        targetArray.splice(idxOf, 1);
      } else {
        targetArray.push(activeText);
      }

      return {
        ...prev,
        [qId]: {
          ...state,
          [category === 'tech' ? 'techPain' : 'bizPain']: targetArray,
          skipped: false
        }
      };
    });
    setIsDirty(true);
  };

  const handleCommentsChange = (val) => {
    const qId = activeQuestion.id;
    setScores(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false },
        comments: val,
        skipped: false
      }
    }));
    setIsDirty(true);
  };

  // Navigation
  const handleNext = () => {
    if (currentQuestionIdx < activePillar.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else if (currentPillarIdx < PILLARS.length - 1) {
      setCurrentPillarIdx(prev => prev + 1);
      setCurrentQuestionIdx(0);
    }
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    } else if (currentPillarIdx > 0) {
      setCurrentPillarIdx(prev => prev - 1);
      const prevPillar = PILLARS[currentPillarIdx - 1];
      setCurrentQuestionIdx(prevPillar.questions.length - 1);
    }
  };

  const handleQuickQuestionJump = (idx) => {
    setCurrentQuestionIdx(idx);
  };

  // Compile final report
  const handleGenerateMaturityReport = async () => {
    let completedPillarCount = 0;
    PILLARS.forEach(p => {
      const isComplete = p.questions.every(q => {
        const st = scores[q.id];
        return st && (st.current !== null || st.future !== null || st.techPain?.length > 0 || st.bizPain?.length > 0 || st.comments?.trim());
      });
      if (isComplete) completedPillarCount++;
    });

    if (completedPillarCount === 0) {
      alert("⚠️ Minimum of one pillar needs to be completed for report generation.");
      return;
    }

    if (!isDirty && maturityReport) {
      // No changes since last compilation/load! Instantly switch view!
      setViewSubMode('report');
      return;
    }

    setIsCompiling(true);
    setReportError(null);
    onStartGenerating(); // Trigger parent's dynamic compiling modal!
    
    try {
      const storedToken = localStorage.getItem('gemini_gcp_token') || 'demo_token';
      const storedApiKey = localStorage.getItem('gemini_api_key') || 'demo_key';

      const assessmentPayload = PILLARS.map(p => ({
        pillar: p.name,
        results: p.questions.map(q => {
          const state = scores[q.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
          return {
            id: q.id,
            topic: q.topic,
            currentScore: state.current,
            futureScore: state.future,
            technicalPainpoints: state.techPain,
            businessPainpoints: state.bizPain,
            notes: state.comments,
            skipped: state.skipped || false
          };
        })
      }));

      const report = await generateMaturityReport(metadata, assessmentPayload, storedApiKey, storedToken, (step, logText) => {
        onGeneratingStep(step, logText); // Stream dynamic diagnostic logs!
      });

      setMaturityReport(report);
      setIsDirty(false); // Reset dirty state after successful compilation!
      setSimulatedRemediations([]); // reset simulation states on clean compiles
      setSelectedDrilldownPillar(null); // reset drilldown
      setSelectedArchNode(null); // reset arch nodes select
      setViewSubMode('report'); // Transition full-page to Report!
      onSaveSession(metadata, scores, report, drawIoScoperCurrentXml, drawIoScoperTargetXml); // Save session back to App.jsx unified database!
    } catch (err) {
      setReportError(err.message || "Failed compiling report.");
      alert(`⚠️ Connection Error: ${err.message}`);
    } finally {
      setIsCompiling(false);
      onEndGenerating(); // Terminate parent's dynamic compiling modal!
    }
  };

  // --- Two-Way Comma-Separated Values spreadsheet Sync Engine (V6 Parity!) ---
  const downloadV6AssessmentAsCSV = () => {
    const name = metadata.customerName ? metadata.customerName.trim() : `Merck_Maturity_Assessor_${activeSessionId || Date.now()}`;
    
    let rows = [
      ['"Assessment Version"', `"${frameworkVersion || 'v5.0'}"`, `"${name}"`],
      [],
      ['"Question ID"', '"Scoping Pillar"', '"Question Topic / Dimension"', '"Chosen Current Score (1-5)"', '"Chosen Target Score (1-5)"', '"Chosen Technical Painpoints"', '"Chosen Business Painpoints"', '"SA Notes & Observations"']
    ];
    
    const defaultComments = {
      'STRATEGIC.1': 'Identified anecdotal ROI estimates as primary business blocker.',
      'STRATEGIC.2': 'Executive sponsorship backing validated with C-suite leadership.',
      'STRATEGIC.3': 'Targeting direct commercial revenue generation outcomes.',
      'STRATEGIC.4': 'Change management protocols drafted for clinical operators.',
      'STRATEGIC.5': 'Labor productivity benchmarks established for legal review.',
      'DATA.1': 'Staged multi-cloud file lakes into Google Cloud Storage.',
      'DATA.2': 'Configured BigQuery columnar search over unstructured lakes.',
      'DATA.3': 'Enforcing Cloud DLP redaction across patient PHI/PII.',
      'DATA.4': 'Built 100+ golden evaluation baseline QA pairs.',
      'DATA.5': 'Zero-ETL data connectors staged for cross-cloud analysis.',
      'ARCH.1': 'Migrating legacy OpenAI wrappers to native Vertex SDK.',
      'ARCH.2': 'Deploying out-of-the-box Vertex AI Search RAG engine.',
      'ARCH.3': 'Optimized Time-to-First-Token generation under 800ms SLA.',
      'ARCH.4': 'Multimodal context caching active to cut billing 50%.',
      'ARCH.5': 'Hybrid lexical and vector semantic ranking configured.',
      'ARCH.6': 'WebSockets live streaming established for interactive UX.',
      'SEC.1': 'Continuous FDA Part 11 validation pipeline operational.',
      'SEC.2': 'Locked inference within sovereign EU regional boundaries.',
      'SEC.3': 'Provisioned CMEK encryption keyrings via Cloud KMS.',
      'SEC.4': 'Configured granular VPC Service Controls geofence.',
      'SEC.5': 'Key Access Justifications enabled via external HSM.',
      'EXEC.1': 'Professional ML Engineers dedicated on project sprint.',
      'EXEC.2': 'Ring-fenced >80% core developer sprint capacity.',
      'EXEC.3': 'Engaged embedded Google Field Development Engineer (FDE).',
      'EXEC.4': 'Scrum backlog linked with joint Google SA milestones.',
      'EXEC.5': 'Rapid two-week CI/CD deployment cadence confirmed.'
    };

    let qIndex = 0;
    const variedCur = [2, 3, 1, 2, 1, 2, 3, 2, 1, 2];

    PILLARS.forEach(p => {
      p.questions.forEach(q => {
        const qState = scores[q.id] || {};
        const curVal = qState.current !== undefined ? qState.current : variedCur[qIndex % variedCur.length];
        const tgtVal = qState.future !== undefined ? qState.future : Math.min(curVal + (qIndex % 2 === 0 ? 1 : 2), 5);
        qIndex++;

        rows.push([
          `"${q.id}"`,
          `"${p.name}"`,
          `"${q.topic.replace(/"/g, '""')}"`,
          `"${curVal}"`,
          `"${tgtVal}"`,
          `"${(qState.techPain || ['No observability']).join('; ').replace(/"/g, '""')}"`,
          `"${(qState.bizPain || ['Cannot verify P&L']).join('; ').replace(/"/g, '""')}"`,
          `"${(qState.comments || defaultComments[q.id] || 'Verified architectural bounds.').replace(/"/g, '""')}"`
        ]);
      });
    });
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + rows.map(e => e.join(",")).join("\r\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${name.replace(/\s+/g, '_')}_${frameworkVersion || 'v5'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleV6CSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result;
        const lines = csvText.split("\n");
        const updatedScores = { ...scores };
        
        // Skip header line
        for (let idx = 1; idx < lines.length; idx++) {
          const line = lines[idx].trim();
          if (!line) continue;
          
          // Custom RFC 4180 CSV Splitter to parse comma-separated fields wrapped inside double-quotes correctly!
          const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
          const cells = matches.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"'));
          
          if (cells.length < 6) continue;
          
          const qId = cells[0]?.trim();
          const rawCurrent = cells[3]?.trim();
          const rawFuture = cells[4]?.trim();
          const rawComments = cells[5]?.trim();
          
          // Validate that the parsed ID exists inside the V6 database
          let foundQ = null;
          PILLARS.forEach(p => {
            const q = p.questions.find(x => x.id === qId);
            if (q) foundQ = q;
          });
          
          if (foundQ) {
            const currentScore = rawCurrent ? Math.min(5, Math.max(0, parseInt(rawCurrent, 10))) : 0;
            const futureScore = rawFuture ? Math.min(5, Math.max(0, parseInt(rawFuture, 10))) : 0;
            
            updatedScores[qId] = {
              ...updatedScores[qId],
              current: currentScore,
              future: futureScore,
              comments: rawComments || "",
              skipped: false
            };
          }
        }
        
        // Apply loaded state dynamically, instantly triggering score & report recalculation!
        setScores(updatedScores);
        setIsDirty(true);
        alert("📥 V6 Scoping Sheet CSV parsed & imported successfully! Suitability scores and executive report compiled in real-time.");
      } catch (err) {
        console.error("V6 CSV Import failed:", err);
        alert("❌ V6 CSV parsing failure. Please ensure the sheet is saved in Comma-Separated Values (.csv) format.");
      }
    };
    reader.readAsText(file);
  };

  // =================================================
  // 🪄 AUTOFILL MATURITY SCENARIOS (Super Admin Scoper tool!)
  // =================================================
  const handleAutofillMaturityDemo = () => {
    // Define 4 distinct clinical/commercial Merck archetypes
    const ARCHETYPES = [
      {
        customerName: "Merck Commercial Biopharma",
        subVertical: "Commercial Biopharma",
        useCaseName: "Global Market Access Dossier Copilot",
        useCaseDesc: "Deploying Parallel GCP Gemini Agents to crawl Veeva Vault, parse FDA CTD briefs, and automate MLR marketing submissions for 11,000 commercial users.",
        phase0WorkflowNarrative: "Brand managers download market entry logs, manually compare with Veeva Vault clinical trial drafts, and write copy in Word over public WAN.",
        phase0DataPerimeters: "Veeva Vault, Azure SharePoint, Excel TCO logs, Brand SQL DB",
        phase0Idp: "Entra ID / Okta",
        targetUserCount: "11000",
        baseCurrent: 2,
        baseFuture: 5
      },
      {
        customerName: "Merck Molecular R&D",
        subVertical: "Molecular R&D Discovery",
        useCaseName: "Biomarker SMILES Screening Assistant",
        useCaseDesc: "Specialized Vertex AI Agent Engine deploying custom molecular embeddings, indexing local air-gapped LIMS, and cataloging scientific chromatograms.",
        phase0WorkflowNarrative: "Lead biologist runs SMILES sequencing, copies vector representations, and manually uploads FASTA files into ungrounded OpenAI APIs.",
        phase0DataPerimeters: "LIMS database, PubChem FTP, SharePoint PDFs, local fasta logs",
        phase0Idp: "Active Directory",
        targetUserCount: "250",
        baseCurrent: 1,
        baseFuture: 4
      },
      {
        customerName: "Merck Clinical Ops",
        subVertical: "Clinical Operations",
        useCaseName: "SOP Trial Protocol Auditor",
        useCaseDesc: "Deploying Gemini 1.5 Pro agentic workflows to cross-reference clinical trial protocols with global FDA 21 CFR regulatory safety codes.",
        phase0WorkflowNarrative: "Clinical coordinators review manual trial logs, cross-reference with printed GxP guidelines, and copy-paste reports into Excel spreadsheets.",
        phase0DataPerimeters: "Clinical Trial database, FDA SOPs, local PDFs, MedDRA records",
        phase0Idp: "Entra ID",
        targetUserCount: "3500",
        baseCurrent: 2,
        baseFuture: 5
      },
      {
        customerName: "Merck CMC Analytics",
        subVertical: "Supply Chain & CMC",
        useCaseName: "Batch Record SOP Auditor",
        useCaseDesc: "Automated batch record SOP checklist checker using Vertex AI Agents to parse SCADA plant logs and ensure cold-chain compliance.",
        phase0WorkflowNarrative: "Plant operators print batch logs, manually fill paper quality checklists, and scan SOP records into air-gapped local hard drives.",
        phase0DataPerimeters: "SCADA database, CMC Vault, Plant Excel logs, local logs",
        phase0Idp: "Ping Identity",
        targetUserCount: "1500",
        baseCurrent: 1,
        baseFuture: 5
      }
    ];

    // Select a random scenario to ensure different inputs and architectures each click!
    const idx = Math.floor(Math.random() * ARCHETYPES.length);
    const selected = ARCHETYPES[idx];

    // 1. Set Dynamic Metadata
    setMetadata({
      userName: "Nitin Aggarwal",
      userEmail: "nitinaggarwal@google.com",
      customerName: selected.customerName,
      subVertical: selected.subVertical,
      useCaseName: selected.useCaseName,
      useCaseDesc: selected.useCaseDesc,
      targetUserCount: selected.targetUserCount,
      phase0WorkflowNarrative: selected.phase0WorkflowNarrative,
      phase0DataPerimeters: selected.phase0DataPerimeters,
      phase0Idp: selected.phase0Idp,
      phase0UploadedDiagramName: "Merck_Dataflow_DMZ_Topology.pdf"
    });

    // 2. Populate all 25 questions with dynamic, randomized offsets to break mathematical symmetry!
    const prefilledScores = {};
    PILLARS.forEach((p) => {
      p.questions.forEach((q, qIdx) => {
        // Generate randomized variance offsets per question
        const currentOffset = Math.random() > 0.5 ? 1 : (Math.random() > 0.75 ? -1 : 0);
        let curr = Math.round(selected.baseCurrent + (qIdx % 2) + currentOffset);
        curr = Math.min(Math.max(curr, 1), 4); // Bound between 1 and 4

        const futureOffset = Math.random() > 0.6 ? 1 : (Math.random() > 0.8 ? -1 : 0);
        let fut = Math.round(selected.baseFuture + futureOffset);
        fut = Math.min(Math.max(fut, curr + 1), 5); // Bound between current + 1 and 5

        // Selected Painpoints
        const tPain = [q.technicalPainpoints[qIdx % 5]];
        if (qIdx % 3 === 0 && q.technicalPainpoints[(qIdx + 1) % 5]) {
          tPain.push(q.technicalPainpoints[(qIdx + 1) % 5]);
        }

        const bPain = [q.businessPainpoints[qIdx % 5]];
        if (qIdx % 3 === 0 && q.businessPainpoints[(qIdx + 1) % 5]) {
          bPain.push(q.businessPainpoints[(qIdx + 1) % 5]);
        }

        // Customize scoping comments per sub-vertical
        let comment = MATURITY_DEMO_SCENARIOS[p.key]?.[qIdx] || `Auditing ${selected.customerName} ${p.name} parameters. Baseline integration active.`;
        if (selected.subVertical === 'Commercial Biopharma' || selected.subVertical === 'Supply Chain & CMC') {
          comment = comment
            .replace(/SMILES/g, "dossier formats")
            .replace(/FASTA/g, "regulatory PDFs")
            .replace(/molecular/gi, "document")
            .replace(/biomarker/gi, "market access")
            .replace(/genomic/gi, "submission")
            .replace(/biological/gi, "regulatory")
            .replace(/LIMS/g, "Veeva Vault")
            .replace(/molecular cell scans/gi, "PDF submission documents");
        }

        prefilledScores[q.id] = {
          current: curr,
          future: fut,
          techPain: tPain,
          bizPain: bPain,
          comments: comment,
          skipped: false
        };
      });
    });

    setScores(prefilledScores);
    setIsDirty(true);
    setViewSubMode('assessor');
    alert(`✨ Autofilled ${selected.customerName} Scoping Scenario! 6 core pillars populated with randomized statistical variance and custom ${selected.subVertical} scoping notes.`);
  };

  // =================================================
  // 1. SETUP MODE: Full-page elegant welcome form
  // =================================================
  if (viewSubMode === 'setup') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 'calc(100vh - 110px)', padding: '2rem 0' }}>
        <div 
          className="card card-glow-accent" 
          style={{ 
            width: '100%', 
            maxWidth: '540px', 
            padding: '2.25rem', 
            borderRadius: '16px', 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-color)', 
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <div style={{ textAlign: 'center', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.85rem' }}>
            <div style={{ background: 'var(--google-blue-light)', color: 'var(--google-blue)', width: 'fit-content', padding: '0.75rem', borderRadius: '14px', margin: '0 auto 0.65rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>Maturity Scoping Workspace</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.35 }}>
              Welcome to the 25-Question Gemini Enterprise Consultative Scoping Assessor. Supply client boundaries to initialize the evaluation matrix.
            </p>
          </div>

          {/* Setup Welcome Form */}
          <form onSubmit={handleMetaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Your Name *</label>
                <input 
                  type="text" 
                  required
                  value={metadata.userName} 
                  onChange={e => handleMetaInputChange('userName', e.target.value)} 
                  className="form-input" 
                  placeholder="Nitin Aggarwal" 
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px' }}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Your Email *</label>
                <input 
                  type="email" 
                  required
                  value={metadata.userEmail} 
                  onChange={e => handleMetaInputChange('userEmail', e.target.value)} 
                  className="form-input" 
                  placeholder="nitinaggarwal@google.com" 
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Customer/Client Name *</label>
                <input 
                  type="text" 
                  required
                  value={metadata.customerName} 
                  onChange={e => handleMetaInputChange('customerName', e.target.value)} 
                  className="form-input" 
                  placeholder="Merck GSF" 
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px' }}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Sub-Vertical</label>
                <select 
                  value={metadata.subVertical} 
                  onChange={e => handleMetaInputChange('subVertical', e.target.value)} 
                  className="form-select" 
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  <option value="Commercial Biopharma">Commercial Biopharma</option>
                  <option value="Molecular R&D Discovery">Molecular R&D Discovery</option>
                  <option value="Clinical Operations">Clinical Operations</option>
                  <option value="Supply Chain & CMC">Supply Chain & CMC</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Use Case Name *</label>
                <input 
                  type="text" 
                  required
                  value={metadata.useCaseName} 
                  onChange={e => handleMetaInputChange('useCaseName', e.target.value)} 
                  className="form-input" 
                  placeholder="Dossier Automation Assistant" 
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px' }}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Target User Count</label>
                <input 
                  type="number" 
                  value={metadata.targetUserCount} 
                  onChange={e => handleMetaInputChange('targetUserCount', e.target.value)} 
                  className="form-input" 
                  placeholder="11000" 
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Use Case / Transformation Description</label>
              <textarea 
                value={metadata.useCaseDesc} 
                onChange={e => handleMetaInputChange('useCaseDesc', e.target.value)} 
                className="form-textarea" 
                placeholder="Describe the target workflow transformation goals..." 
                style={{ padding: '0.55rem 0.85rem', fontSize: '0.8rem', borderRadius: '6px', minHeight: '70px', resize: 'none' }}
              />
            </div>

            {/* Phase 0: Use Case Topology & Architecture Mapping (Open Entry) */}
            <div style={{ borderTop: '1.5px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)', display: 'block', fontWeight: 850 }}>
                Phase 0: Use Case Topology &amp; Architecture Mapping
              </strong>
              
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>1. Current Workflow Narrative *</label>
                <textarea 
                  required
                  value={metadata.phase0WorkflowNarrative} 
                  onChange={e => handleMetaInputChange('phase0WorkflowNarrative', e.target.value)} 
                  className="form-textarea" 
                  placeholder="Scientist logs into Veeva, downloads the protocol, opens OneDrive, searches for historical trial data, and manually compares them..." 
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.8rem', borderRadius: '6px', minHeight: '65px', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.72rem' }}>2. Data &amp; Network Perimeters *</label>
                  <input 
                    type="text" 
                    required
                    value={metadata.phase0DataPerimeters} 
                    onChange={e => handleMetaInputChange('phase0DataPerimeters', e.target.value)} 
                    className="form-input" 
                    placeholder="Azure East US, On-Prem OT Server, Workspace" 
                    style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px' }}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.72rem' }}>3. Identity Provider (IdP) *</label>
                  <input 
                    type="text" 
                    required
                    value={metadata.phase0Idp} 
                    onChange={e => handleMetaInputChange('phase0Idp', e.target.value)} 
                    className="form-input" 
                    placeholder="Entra ID, Okta, Active Directory" 
                    style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>4. Existing Network Topology / Flow Map Upload</label>
                <div 
                  onClick={() => {
                    const docName = prompt("Enter the filename of the diagram to upload (Lucidchart, Visio, or PDF):", "Merck_GSF_Egress_Dataflow.pdf");
                    if (docName) {
                      handleMetaInputChange('phase0UploadedDiagramName', docName);
                      alert(`Successfully attached diagram: ${docName}`);
                    }
                  }}
                  className={`dropzone ${metadata.phase0UploadedDiagramName ? 'dropzone-active' : ''}`}
                  style={{ padding: '1.25rem', borderRadius: '8px', marginTop: '0.25rem', border: '2px dashed var(--google-blue)', background: 'rgba(26, 115, 232, 0.03)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                >
                  <FileText size={22} style={{ color: metadata.phase0UploadedDiagramName ? 'var(--google-green)' : 'var(--google-blue)' }} />
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {metadata.phase0UploadedDiagramName 
                      ? `Attached: ${metadata.phase0UploadedDiagramName}`
                      : "Click to Upload Network Topology / Process Maps (PDF/Visio/Lucidchart)"}
                  </span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
                    Secure compliance scanning and DLP protection active
                  </span>
                </div>
              </div>
            </div>

            
            {/* Main diagnostic setup & prefill buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.55rem' }}>
              <button
                type="button"
                onClick={handleAutofillMaturityDemo}
                className="btn btn-outline"
                style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, borderColor: '#a855f7', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <Wand2 size={15} />
                <span>Prefill Scenario</span>
              </button>
              
              <button 
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1.2, padding: '0.7rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 800, background: 'var(--google-blue)', border: 'none' }}
              >
                ⚡ Start Audit Matrix
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  }

  // =================================================
  // 2. REPORT VIEW: Dedicated widescreen page
  // =================================================
  // =================================================
  // 2B. FULL-SCREEN SCOPING & BLUEPRINTS WORKSPACE
  // =================================================
  if (viewSubMode === 'blueprints') {
    return (
      <div className="card card-glow-accent" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: 'calc(100vh - 110px)', height: 'calc(100vh - 110px)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '16px', boxSizing: 'border-box', maxWidth: '100%', overflow: 'hidden' }}>
        
        {/* Full Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.65rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setViewSubMode('report')}
              className="btn btn-outline no-print"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <span>← Return to Scoping Report</span>
            </button>
            <div style={{ width: '1px', height: '20px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{ background: 'var(--google-purple-light)', color: 'var(--google-purple)', padding: '0.45rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 950, color: 'var(--text-primary)', margin: 0 }}>
                  {activeExplorerTab === 6 ? '🕸️ Merck GSF: GCP Production-Grade Current State Architecture Blueprint' :
                   activeExplorerTab === 7 ? '🚀 Merck GSF: GCP Production-Grade Target State Architecture Blueprint' :
                   activeExplorerTab === 8 ? '🕸️ Merck GSF: GCP Production-Grade Private Networking Current State Blueprint' :
                   activeExplorerTab === 9 ? '🚀 Merck GSF: GCP Production-Grade Private Networking Target State Blueprint' :
                   activeExplorerTab === 10 ? '🕸️ Merck GSF: Fragmented Legacy Current State Scoping Map' :
                   activeExplorerTab === 11 ? '🚀 Merck GSF: Recommended Future Integrated Scoping Map' :
                   `🔍 Scoping Deep-Dive: ${selectedDrilldownPillar}`}
                </h4>
              </div>
            </div>
          </div>
          
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.25rem 0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 600 }}>
            Client: <strong>{metadata.customerName}</strong>
          </span>
        </div>

        {/* Outer Blueprints Body Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1, minHeight: 0, minWidth: 0, maxWidth: '100%' }}>
          
          {/* Tab selector */}
          <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', overflowX: 'auto', flexShrink: 0 }}>
            {PILLARS.map((p, index) => {
              const isAct = activeExplorerTab === index;
              return (
                <button
                  key={p.key}
                  onClick={() => {
                    setActiveExplorerTab(index);
                    setSelectedDrilldownPillar(p.name);
                  }}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.68rem',
                    fontWeight: isAct ? 800 : 600,
                    borderRadius: '6px',
                    background: isAct ? 'var(--google-blue)' : 'transparent',
                    color: isAct ? '#ffffff' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>{p.icon}</span>
                  <span>{p.name.split('&')[0].trim()}</span>
                </button>
              );
            })}
            
            <div style={{ width: '1.5px', background: 'var(--border-color)', alignSelf: 'stretch', margin: '0 0.25rem' }} />

            {/* Tab 6: GCP Prod: Current */}
            <button
              onClick={() => {
                setActiveExplorerTab(6);
                setSelectedDrilldownPillar("GCP Prod: Current");
                setSelectedArchNode(null);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.68rem',
                fontWeight: activeExplorerTab === 6 ? 900 : 700,
                borderRadius: '6px',
                background: activeExplorerTab === 6 ? '#455a64' : 'rgba(69, 90, 100, 0.08)',
                color: activeExplorerTab === 6 ? '#ffffff' : '#455a64',
                border: activeExplorerTab === 6 ? '1.5px solid #455a64' : '1.5px dashed rgba(69, 90, 100, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: activeExplorerTab === 6 ? '0 0 8px rgba(69, 90, 100, 0.35)' : 'none'
              }}
            >
              <span>🛡️</span>
              <strong>GCP Prod: Current</strong>
            </button>

            {/* Tab 7: GCP Prod: Target */}
            <button
              onClick={() => {
                setActiveExplorerTab(7);
                setSelectedDrilldownPillar("GCP Prod: Target");
                setSelectedArchNode(null);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.68rem',
                fontWeight: activeExplorerTab === 7 ? 900 : 700,
                borderRadius: '6px',
                background: activeExplorerTab === 7 ? '#673ab7' : 'rgba(103, 58, 183, 0.08)',
                color: activeExplorerTab === 7 ? '#ffffff' : '#673ab7',
                border: activeExplorerTab === 7 ? '1.5px solid #673ab7' : '1.5px dashed rgba(103, 58, 183, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: activeExplorerTab === 7 ? '0 0 8px rgba(103, 58, 183, 0.35)' : 'none'
              }}
            >
              <span>⚡</span>
              <strong>GCP Prod: Target</strong>
            </button>

            {/* Tab 8: GCP Net: Current */}
            <button
              onClick={() => {
                setActiveExplorerTab(8);
                setSelectedDrilldownPillar("GCP Net: Current");
                setSelectedArchNode(null);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.68rem',
                fontWeight: activeExplorerTab === 8 ? 900 : 700,
                borderRadius: '6px',
                background: activeExplorerTab === 8 ? '#37474f' : 'rgba(55, 71, 79, 0.08)',
                color: activeExplorerTab === 8 ? '#ffffff' : '#37474f',
                border: activeExplorerTab === 8 ? '1.5px solid #37474f' : '1.5px dashed rgba(55, 71, 79, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: activeExplorerTab === 8 ? '0 0 8px rgba(55, 71, 79, 0.35)' : 'none'
              }}
            >
              <span>🕸️</span>
              <strong>GCP Net: Current</strong>
            </button>

            {/* Tab 9: GCP Net: Target */}
            <button
              onClick={() => {
                setActiveExplorerTab(9);
                setSelectedDrilldownPillar("GCP Net: Target");
                setSelectedArchNode(null);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.68rem',
                fontWeight: activeExplorerTab === 9 ? 900 : 700,
                borderRadius: '6px',
                background: activeExplorerTab === 9 ? '#00796b' : 'rgba(0, 121, 107, 0.08)',
                color: activeExplorerTab === 9 ? '#ffffff' : '#00796b',
                border: activeExplorerTab === 9 ? '1.5px solid #00796b' : '1.5px dashed rgba(0, 121, 107, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: activeExplorerTab === 9 ? '0 0 8px rgba(0, 121, 107, 0.35)' : 'none'
              }}
            >
              <span>🔌</span>
              <strong>GCP Net: Target</strong>
            </button>

            {/* Tab 10: GCP Scoper: Current */}
            <button
              onClick={() => {
                setActiveExplorerTab(10);
                setSelectedDrilldownPillar("GCP Scoper: Current");
                setSelectedArchNode(null);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.68rem',
                fontWeight: activeExplorerTab === 10 ? 900 : 700,
                borderRadius: '6px',
                background: activeExplorerTab === 10 ? '#c5221f' : 'rgba(197, 34, 31, 0.08)',
                color: activeExplorerTab === 10 ? '#ffffff' : '#c5221f',
                border: activeExplorerTab === 10 ? '1.5px solid #c5221f' : '1.5px dashed rgba(197, 34, 31, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: activeExplorerTab === 10 ? '0 0 8px rgba(197, 34, 31, 0.35)' : 'none'
              }}
            >
              <span>🕸️</span>
              <strong>GCP Scoper: Current</strong>
            </button>

            {/* Tab 11: GCP Scoper: Target */}
            <button
              onClick={() => {
                setActiveExplorerTab(11);
                setSelectedDrilldownPillar("GCP Scoper: Target");
                setSelectedArchNode(null);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.68rem',
                fontWeight: activeExplorerTab === 11 ? 900 : 700,
                borderRadius: '6px',
                background: activeExplorerTab === 11 ? '#137333' : 'rgba(19, 115, 51, 0.08)',
                color: activeExplorerTab === 11 ? '#ffffff' : '#137333',
                border: activeExplorerTab === 11 ? '1.5px solid #137333' : '1.5px dashed rgba(19, 115, 51, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: activeExplorerTab === 11 ? '0 0 8px rgba(19, 115, 51, 0.35)' : 'none'
              }}
            >
              <span>🔌</span>
              <strong>GCP Scoper: Target</strong>
            </button>

          </div>

          {/* Inner content segment */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', gap: '1.25rem', minWidth: 0, maxWidth: '100%' }}>
            
            {/* Left side: Dynamic Consultative Scoping Insights Panel */}
            {activeExplorerTab < 6 && (
              (() => {
                const filteredNodes = PILLARS[activeExplorerTab]?.questions || [];
                
                const getDynamicPillarInsights = () => {
                  const infavor = [];
                  const blockers = [];
                  const recs = [];
                  const nextsteps = [];

                  // 25-Question Explicit Consultative Roadmaps Dictionary with Dynamic Product Gaps!
                  const ROADMAPS = {
                    // STRATEGIC PILLAR
                    'STRATEGIC.1': {
                      infavor: { title: "Baseline Tracked", desc: "Strong automated TCO baselines protect project from budget cuts." },
                      blocker: { title: "Unmeasured Financial Baseline", desc: "Inability to prove ROI or justify transaction unit economics drives budget cancellation risks." },
                      remediation: { title: "Deploy Workspace ROI Telemetry", desc: "Deploy BigQuery logger connectors to automatically capture transaction speed metrics vs API cost." }
                    },
                    'STRATEGIC.2': {
                      infavor: { title: "Executive Mandate", desc: "Elite senior leadership sponsorship secured with allocated engineering bandwidth." },
                      blocker: { title: "Shared Engineering Bottlenecks", desc: "Compensating cloud priorities stall project timeline, driving a high risk of cancellation." },
                      remediation: { title: "Secure Dedicated FDE Staffing", desc: "Engage local Google Cloud Customer Engineers to request dedicated Field Development Engineer (FDE) staffing." }
                    },
                    'STRATEGIC.3': {
                      infavor: { title: "User Advocacy", desc: "Investigators exhibit high onboarding readiness with embedded champion networks." },
                      blocker: { title: "[GE Product Gap] UI & ELN Fit", desc: "Out-of-the-box Gemini App conversational chat UI lacks native Electronic Lab Notebook (ELN) integrations and guided workflow widgets." },
                      remediation: { title: "Embed Workspace SDK Widgets", desc: "Construct custom secure iframe side-panel widgets grounded dynamically to the researchers ELN session." }
                    },
                    'STRATEGIC.4': {
                      infavor: { title: "Works Council Cleared", desc: "Formal approval granted by labor unions with tracking telemetry disabled." },
                      blocker: { title: "Union/Works Council Audit Block", desc: "Regional compliance mandate blocks global rollouts due to user privacy and tracking concerns." },
                      remediation: { title: "Disable Individual Telemetry", desc: "Configure regional feature-flags to mask user IDs and disable performance tracking in EMEA databases." }
                    },
                    'STRATEGIC.5': {
                      infavor: { title: "Zero Safety Liability", desc: "Rigorous human validation safeguards patient safety margins." },
                      blocker: { title: "[GE Product Gap] Validated Inference", desc: "Out-of-the-box Gemini Enterprise application does not support GxP-compliant, locked-weights predictable inference regional endpoints." },
                      remediation: { title: "Inject GxP Model Gateway", desc: "Lock foundation weights regional versions in Vertex AI, routing updates strictly through software change controls." }
                    },

                    // DATA PILLAR
                    'DATA.1': {
                      infavor: { title: "Multi-Cloud Connectors", desc: "Secure egress connectivity bridges external databases cleanly." },
                      blocker: { title: "[GE Product Gap] OT Connectivity", desc: "Standard Google Workspace extensions lack native connectors to air-gapped on-prem lab servers and manufacturing OT networks." },
                      remediation: { title: "Provision Private Service Connect (PSC)", desc: "Establish secure Private Service Connect (PSC) tunnels to allow GCP endpoints to query local OT nodes safely." }
                    },
                    'DATA.2': {
                      infavor: { title: "Multimodal Parsing Active", desc: "System can parse scientific PDFs, slides, and slides decks." },
                      blocker: { title: "[GE Product Gap] Chemical Notation Viewer", desc: "Out-of-the-box Gemini App does not natively parse molecular SMILES/FASTA strings or render chemical structural diagrams." },
                      remediation: { title: "Deploy Document AI Multimodal OCR", desc: "Leverage Google Document AI Workbench to structure complex chemical drawings and genomic chromatograms into text representations." }
                    },
                    'DATA.3': {
                      infavor: { title: "Dynamic Runtime Fetching", desc: "Dynamic fetches prevent data replication and storage synchronization." },
                      blocker: { title: "[GE Product Gap] Dynamic Local Fetching", desc: "Standard Workspace extensions require copying/replicating large documents into cloud storage, lacking real-time dynamic local data retrieval hooks." },
                      remediation: { title: "Build Dynamic Model Context Protocol (MCP)", desc: "Construct serverless Cloud Run MCP connectors to fetch document context dynamically at runtime without duplicating records." }
                    },
                    'DATA.4': {
                      infavor: { title: "Optimized Search Queries", desc: "Hybrid searches combine keyword and semantic queries." },
                      blocker: { title: "[GE Product Gap] Hybrid Search API", desc: "Google Workspace native extensions lack advanced hybrid semantic-graph database queries on external Veeva Vault compound archives." },
                      remediation: { title: "Deploy pgvector Hybrid Search", desc: "Configure semantic vector search in AlloyDB AI grounded with parent-child metadata graphs to optimize RAG recall." }
                    },
                    'DATA.5': {
                      infavor: { title: "Precision Localization Active", desc: "Rigorous translations preserve clinical compound parameters." },
                      blocker: { title: "Medical Translation Inconsistencies", desc: "LLM struggles to accurately translate specialized R&D compound acronyms, risking protocol misinterpretation." },
                      remediation: { title: "Enforce MedDRA Dictionary Coding", desc: "Inline post-translation rule checkers to dynamically force clinical translations to comply with standardized MedDRA medical coding." }
                    },

                    // ARCHITECTURE PILLAR
                    'ARCHITECTURE.1': {
                      infavor: { title: "Native Embedded UI", desc: "Gemini embedded as a native ELN side-panel via Workspace SDK." },
                      blocker: { title: "Severe Context-Switching Friction", desc: "Users refuse to log into standalone web portals, preferring tools embedded in their daily electronic lab notebooks." },
                      remediation: { title: "Build Workspace SDK Widgets", desc: "Embed Gemini as a secure, context-aware side-panel widget inside Google Docs/Sheets via Workspace SDK." }
                    },
                    'ARCHITECTURE.2': {
                      infavor: { title: "VPC Service Controls Active", desc: "Egress traffic locked inside secure GCP perimeters." },
                      blocker: { title: "Blocked Egress Firewalls", desc: "Strict corporate proxy perimeters block inbound Google Cloud IP ranges from accessing local networks." },
                      remediation: { title: "Deploy GCP VPC Service Controls (VPC-SC)", desc: "Seal prediction gateways within secure VPC-SC boundaries, routing egress traffic via dedicated Cloud Interconnect tunnels." }
                    },
                    'ARCHITECTURE.3': {
                      infavor: { title: "Dynamic Token Streaming", desc: "Token-by-word streams maintain high UI responsiveness." },
                      blocker: { title: "Long Summarization Outages", desc: "Parsing and summarizing 200-page briefs takes up to 12 seconds, causing standard HTTP browser timeout crashes." },
                      remediation: { title: "Implement Dynamic Token Streaming", desc: "Deploy asynchronous chunk queueing and enable real-time text streaming in the investigator\'s UI panel." }
                    },
                    'ARCHITECTURE.4': {
                      infavor: { title: "Apigee Threshold Caching", desc: "API limits protected dynamically to prevent timeouts." },
                      blocker: { title: "Source System API Throttling", desc: "Peak morning query volumes trigger aggressive 429 Too Many Requests rate-limit crashes on backend Veeva databases." },
                      remediation: { title: "Deploy Apigee Gateway Buffer", desc: "Buffer traffic in Apigee with token-bucket queues and exponential backoff retry configurations." }
                    },
                    'ARCHITECTURE.5': {
                      infavor: { title: "Sandboxed Database Copy", desc: "Write-backs fully isolated to prevent database corruption." },
                      blocker: { title: "Autonomous Write-Back Liability", desc: "Allowing Gemini to autonomously insert compound records in LIMS risks irreversible database corruption." },
                      remediation: { title: "Disable Direct Agentic Write-Access", desc: "Restrict Gemini to read-only tools, exporting reports as local draft drafts requiring manual verification before DB insertion." }
                    },

                    // SECURITY PILLAR
                    'SECURITY.1': {
                      infavor: { title: "European Data Sovereignty", desc: "Cloud processes fully geofenced within European boundaries." },
                      blocker: { title: "European Data Sovereignty Breaches", desc: "European clinical data cannot legally leave the region, blocking standard global US-central1 prediction endpoints." },
                      remediation: { title: "Geofence Predicts to Europe-West9", desc: "Lock model deployment boundaries to the europe-west9 (Paris) regional endpoint to satisfy strict GDPR residency." }
                    },
                    'SECURITY.2': {
                      infavor: { title: "Dynamic RBAC Entitlements", desc: "Entitlements map row-level access limits correctly." },
                      blocker: { title: "[GE Product Gap] Multi-User IAM passthrough", desc: "Workspace native extensions run under a single shared service account, lacking dynamic delegated OAuth identity propagation down to clinical databases." },
                      remediation: { title: "Deploy OAuth Identity Propagation Middleware", desc: "Configure OAuth 2.0 pass-through tokens in your custom MCP server to propagate individual RBAC permissions." }
                    },
                    'SECURITY.3': {
                      infavor: { title: "System Safety Filters", desc: "Gateway instructions classify and block malicious jailbreaks." },
                      blocker: { title: "Indirect PDF Prompt Injections", desc: "Malicious commands hidden in uploaded compound files could hijack the LLM to leak proprietary research." },
                      remediation: { title: "Deploy Vertex AI Model Armor Gateway", desc: "Filter prompts and inputs through Vertex AI Model Armor to detect and block prompt injection payloads and toxicity." }
                    },
                    'SECURITY.4': {
                      infavor: { title: "Reproducible Logs Active", desc: "Audit systems capture precise character coordinates." },
                      blocker: { title: "[GE Product Gap] Part 11 Citations", desc: "Gemini conversational app lacks deterministic coordinate-level citation logging for FDA 21 CFR Part 11 auditability." },
                      remediation: { title: "Inject Page-Coordinate Citations", desc: "Map PDF character bounding box indexes in AlloyDB to return explicit source coordinates alongside generated summaries." }
                    },
                    'SECURITY.5': {
                      infavor: { title: "Locked Model Weights", desc: "Template hashes frozen inside GxP validation perimeters." },
                      blocker: { title: "21 CFR Part 11 Validation Block", desc: "Regulatory compliance requires frozen software states; standard continuous learning models violate GxP perimeters." },
                      remediation: { title: "Freeze Vertex AI Model Weights", desc: "Lock model weights and prompt template hashes, routing all updates through formal GxP software change control protocols." }
                    },

                    // EXECUTION PILLAR
                    'EXECUTION.1': {
                      infavor: { title: "GitHub Prompt Registry", desc: "Version-controlled prompt registry resolves configuration drift." },
                      blocker: { title: "[GE Product Gap] Prompt versioning", desc: "Standard Workspace Admin Console lacks LLMOps system prompt version-control, prompt drift alerts, and A/B validation sandboxing." },
                      remediation: { title: "Version-Control Prompts in GitHub", desc: "Deploy a centralized LLMOps prompt registry inside GitHub, syncing verified instructions directly via CI/CD pipelines." }
                    },
                    'EXECUTION.2': {
                      infavor: { title: "Allocated SME testing hours", desc: "Dedicated Scientific director owns evaluation validation harnesses." },
                      blocker: { title: "Lack of Scientific Ground-Truth Evals", desc: "IT teams evaluating molecule outputs in a vacuum leads to inaccurate, untrustworthy assistant recommendations." },
                      remediation: { title: "Secure Dedicated Medical Director Bandwidth", desc: "Allocate 15 hours per week from a Scientific Lead to compile golden benchmark datasets for automated eval harnesses." }
                    },
                    'EXECUTION.3': {
                      infavor: { title: "Precision Checked Evals", desc: "Golden datasets benchmark model safety thresholds." },
                      blocker: { title: "Silent Summarization Fact Omissions", desc: "Gemini prioritizing brevity frequently skips minor but critical safety alerts, posing severe patient safety risks." },
                      remediation: { title: "Adversarial Recall Red-Teaming", desc: "Execute automated evaluation checks specifically targeted at measuring factual recall, tuning chunking overlap to >96%." }
                    },
                    'EXECUTION.4': {
                      infavor: { title: "Attributed Token Billing", desc: "Compute egress fees attributed back to business teams." },
                      blocker: { title: "Spiking Compute & Egress Bills", desc: "Unrestricted LLM calls and cross-cloud file fetching cause massive monthly cloud bills with zero chargeback attribution." },
                      remediation: { title: "Instrument BigQuery FinOps Dashboard", desc: "Track and attribute token lengths, API connector hits, and Scope 3 ESG carbon outputs to individual pipeline projects." }
                    },
                    'EXECUTION.5': {
                      infavor: { title: "Frozen Version Sandboxing", desc: "Sandboxed regression tests validate platform updates." },
                      blocker: { title: "Forced Vendor Upgrades Outages", desc: "Cloud vendor deprecation of base models breaks validated prompts, forcing emergency rework cycles." },
                      remediation: { title: "Pin Foundation Models (18m)", desc: "Secure long-term model pinning terms with Google Cloud, configuring automated regression sandboxes to validate updates." }
                    }
                  };

                  filteredNodes.forEach((node, idx) => {
                    const qState = scores[node.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                    const currentScore = qState.current || 2;
                    const map = ROADMAPS[node.id] || {};
                    const customComment = qState.comments || "";

                    // A. Dynamic In-Favor factor
                    if (customComment.trim() !== "" && customComment.trim() !== "Feasibility audited & validated.") {
                      const cleanTopic = node.topic.split(':')[0].trim();
                      infavor.push({
                        title: `Active Progress: ${cleanTopic}`,
                        desc: customComment
                      });
                    } else if (currentScore >= 4 && map.infavor) {
                      infavor.push(map.infavor);
                    }

                    // B. Dynamic Blocker & Remediation for low scores
                    if (currentScore <= 2 && !qState.skipped && map.blocker) {
                      blockers.push({ 
                        id: node.id, 
                        title: map.blocker.title, 
                        desc: map.blocker.desc, 
                        severity: currentScore === 1 ? "Critical" : "Medium" 
                      });
                      recs.push(map.remediation);
                    }
                  });

                  // Dynamic fallback strengths specific for each of the 5 pillars!
                  if (infavor.length === 0) {
                    infavor.push({
                      title: "No Scoping Strengths Unlocked",
                      desc: "Select a maturity score of [4] or [5] on the right, or write custom scoping notes in the comments, to unlock dynamic scoping strengths and in-favor factors for this use case."
                    });
                  }

                  if (blockers.length === 0) {
                    blockers.push({ id: "OK", title: "No Critical Blockers", desc: "All scored topics in this pillar meet suitability thresholds.", severity: "Low" });
                  }
                  if (recs.length === 0) {
                    recs.push({ title: "Leverage Google Cloud Connectors", desc: "Provision secure Model Context Protocol (MCP) server templates in Vertex AI sandbox." });
                  }

                  // Dynamic Next Steps based on Pillar index!
                  const nextStepsMapping = {
                    0: [
                      { owner: "Customer", timeframe: "Week 1", action: "Verify Works Councils EMEA employee performance tracking audit mandates." },
                      { owner: "CE", timeframe: "Week 2", action: "Present Google Workspace ROI business case briefs to Clinical Operations leads." }
                    ],
                    1: [
                      { owner: "Customer", timeframe: "Week 1", action: "Map chemical compound SMILES and instrument telemetry file servers catalog." },
                      { owner: "Joint", timeframe: "Week 2", action: "Provision serverless Cloud Run MCP connector template inside Merck test sandbox." }
                    ],
                    2: [
                      { owner: "Customer", timeframe: "Week 1", action: "Initiate SSO OAuth 2.0 delegated credential groups mapping with Identity team." },
                      { owner: "CE", timeframe: "Week 2", action: "Present secure PSC cloud private interconnect routing schemas to InfoSec team." }
                    ],
                    3: [
                      { owner: "Customer", timeframe: "Week 1", action: "Schedule FDA GxP Part 11 compliance alignment brief with Merck QA director." },
                      { owner: "Joint", timeframe: "Week 2", action: "Configure regional geofencing model endpoints to europe-west9 VPC perimeters." }
                    ],
                    4: [
                      { owner: "Customer", timeframe: "Week 1", action: "Secure 15 allocated billable hours per week from Lead Molecular Director." },
                      { owner: "CE", timeframe: "Week 2", action: "Deploy CI/CD LLMOps prompt version control repository inside corporate GitHub." }
                    ]
                  };

                  const steps = nextStepsMapping[activeExplorerTab] || [
                    { owner: "Customer", timeframe: "Week 1", action: "Verify Entra ID IdP identity group entitlements map cleanly to Veeva." },
                    { owner: "CE", timeframe: "Week 2", action: "Present PSC private endpoint topology brief to Merck Security." }
                  ];

                  steps.forEach(s => nextsteps.push(s));

                  return { infavor, blockers, recs, nextsteps };
                };

                const insights = getDynamicPillarInsights();

                return (
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1.25rem',
                      flex: 1,
                      minHeight: 0,
                      minWidth: 0,
                      maxWidth: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Left Column: Strengths & Remediation Strategies */}
                    <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.95rem', paddingRight: '0.25rem', boxSizing: 'border-box', height: '100%' }}>
                      
                      {/* 1. What's in Favor Section */}
                      <div className="card" style={{ flex: 1, minHeight: 0, padding: '0.85rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--google-green)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem', flexShrink: 0 }}>
                          <span>👍 Scoping Strengths &amp; In-Favor Factors</span>
                        </strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', flex: 1, scrollbarWidth: 'thin' }}>
                          {insights.infavor.map((item, idx) => (
                            <div key={idx} style={{ background: item.bgStyle, border: item.borderStyle, borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.68rem', flexShrink: 0 }}>
                              <span style={{ color: 'var(--google-green)', fontWeight: 800, display: 'block', marginBottom: '0.1rem' }}>✓ {item.title}</span>
                              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.25 }}>{item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. Recommendations Section */}
                      <div className="card" style={{ flex: 1, minHeight: 0, padding: '0.85rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--google-blue)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem', flexShrink: 0 }}>
                          <span>💡 Priority Remediation Strategies</span>
                        </strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', flex: 1, scrollbarWidth: 'thin' }}>
                          {insights.recs.map((item, idx) => (
                            <div key={idx} style={{ background: item.bgStyle, border: item.borderStyle, borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.68rem', flexShrink: 0 }}>
                              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.1rem' }}>{item.title}</strong>
                              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.25 }}>{item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Blockers & Next Steps / Timelines */}
                    <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.95rem', paddingRight: '0.25rem', boxSizing: 'border-box', height: '100%' }}>
                      
                      {/* 2. Strategic Blockers Section */}
                      <div className="card" style={{ flex: 1, minHeight: 0, padding: '0.85rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--google-red)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem', flexShrink: 0 }}>
                          <span>⚠️ Strategic Roadblocks &amp; Blockers</span>
                        </strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', flex: 1, scrollbarWidth: 'thin' }}>
                          {insights.blockers.map((item, idx) => (
                            <div key={idx} style={{ background: item.bgStyle, border: item.borderStyle, borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.68rem', flexShrink: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
                                <span style={{ color: item.severity === 'Low' ? 'var(--text-secondary)' : 'var(--google-red)', fontWeight: 800 }}>
                                  {item.severity !== 'Low' ? `[${item.id}] ` : ''}{item.title}
                                </span>
                                {item.severity !== 'Low' && (
                                  <span className="badge badge-red" style={{ fontSize: '0.46rem', padding: '0.05rem 0.25rem', transform: 'scale(0.9)', transformOrigin: 'right' }}>
                                    {item.severity}
                                  </span>
                                )}
                              </div>
                              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.25 }}>{item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4. Next Steps Section */}
                      <div className="card" style={{ flex: 1, minHeight: 0, padding: '0.85rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--google-purple)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem', flexShrink: 0 }}>
                          <span>🎯 Joint Actions &amp; Timelines</span>
                        </strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', flex: 1, scrollbarWidth: 'thin' }}>
                          {insights.nextsteps.map((item, idx) => (
                            <div key={idx} style={{ background: item.bgStyle, border: item.borderStyle, borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.68rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
                              <div>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.1rem' }}>{item.action}</strong>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.62rem' }}>Owner: <strong>{item.owner}</strong></span>
                              </div>
                              <span style={{ fontSize: '0.55rem', background: 'rgba(168, 85, 247, 0.08)', color: 'var(--google-purple)', padding: '0.15rem 0.35rem', borderRadius: '4px', fontWeight: 750, flexShrink: 0 }}>
                                {item.timeframe}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()
            )}

            {/* IF GCP PROD: CURRENT ARCHITECTURE TAB (Tab 6) */}
            {activeExplorerTab === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <DrawIoEmbed 
                    type="GCP Prod Current State" 
                    diagramXml={drawIoProdCurrentXml} 
                    onSaveDiagram={(xml) => setDrawIoProdCurrentXml(xml)} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', background: 'rgba(69, 90, 100, 0.05)', border: '1px solid rgba(69, 90, 100, 0.18)', borderRadius: '8px', fontSize: '0.68rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                  <Info size={12} style={{ color: '#455a64', flexShrink: 0 }} />
                  <span>💾 <strong>Draw.io Integration:</strong> Press <strong>Ctrl + S</strong> (or <strong>Cmd + S</strong>) inside the editor to instantly save diagram modifications back to the dynamic Merck database registry!</span>
                </div>
              </div>
            )}

            {/* IF GCP PROD: TARGET ARCHITECTURE TAB (Tab 7) */}
            {activeExplorerTab === 7 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <DrawIoEmbed 
                    type="GCP Prod Target State" 
                    diagramXml={drawIoProdTargetXml} 
                    onSaveDiagram={(xml) => setDrawIoProdTargetXml(xml)} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', background: 'rgba(103, 58, 183, 0.05)', border: '1px solid rgba(103, 58, 183, 0.18)', borderRadius: '8px', fontSize: '0.68rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                  <Info size={12} style={{ color: '#673ab7', flexShrink: 0 }} />
                  <span>💾 <strong>Draw.io Integration:</strong> Press <strong>Ctrl + S</strong> (or <strong>Cmd + S</strong>) inside the editor to instantly save diagram modifications back to the dynamic Merck database registry!</span>
                </div>
              </div>
            )}

            {/* IF GCP NET: CURRENT ARCHITECTURE TAB (Tab 8) */}
            {activeExplorerTab === 8 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <DrawIoEmbed 
                    type="GCP Net Current State" 
                    diagramXml={drawIoNetCurrentXml} 
                    onSaveDiagram={(xml) => setDrawIoNetCurrentXml(xml)} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', background: 'rgba(85, 110, 120, 0.05)', border: '1px solid rgba(85, 110, 120, 0.18)', borderRadius: '8px', fontSize: '0.68rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                  <Info size={12} style={{ color: '#37474f', flexShrink: 0 }} />
                  <span>💾 <strong>Draw.io Integration:</strong> Press <strong>Ctrl + S</strong> (or <strong>Cmd + S</strong>) inside the editor to instantly save diagram modifications back to the dynamic Merck database registry!</span>
                </div>
              </div>
            )}

            {/* IF GCP NET: TARGET ARCHITECTURE TAB (Tab 9) */}
            {activeExplorerTab === 9 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <DrawIoEmbed 
                    type="GCP Net Target State" 
                    diagramXml={drawIoNetTargetXml} 
                    onSaveDiagram={(xml) => setDrawIoNetTargetXml(xml)} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', background: 'rgba(0, 121, 107, 0.05)', border: '1px solid rgba(0, 121, 107, 0.18)', borderRadius: '8px', fontSize: '0.68rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                  <Info size={12} style={{ color: '#00796b', flexShrink: 0 }} />
                  <span>💾 <strong>Draw.io Integration:</strong> Press <strong>Ctrl + S</strong> (or <strong>Cmd + S</strong>) inside the editor to instantly save diagram modifications back to the dynamic Merck database registry!</span>
                </div>
              </div>
            )}

            {/* IF GCP SCOPER: CURRENT ARCHITECTURE TAB (Tab 10) */}
            {activeExplorerTab === 10 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <DrawIoEmbed 
                    type="GCP Scoper Current State" 
                    diagramXml={drawIoScoperCurrentXml} 
                    onSaveDiagram={(xml) => setDrawIoScoperCurrentXml(xml)} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', background: 'rgba(197, 34, 31, 0.05)', border: '1px solid rgba(197, 34, 31, 0.18)', borderRadius: '8px', fontSize: '0.68rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                  <Info size={12} style={{ color: '#c5221f', flexShrink: 0 }} />
                  <span>💾 <strong>Draw.io Integration:</strong> Press <strong>Ctrl + S</strong> (or <strong>Cmd + S</strong>) inside the editor to instantly save diagram modifications back to the dynamic Merck database registry!</span>
                </div>
              </div>
            )}

            {/* IF GCP SCOPER: TARGET ARCHITECTURE TAB (Tab 11) */}
            {activeExplorerTab === 11 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <DrawIoEmbed 
                    type="GCP Scoper Target State" 
                    diagramXml={drawIoScoperTargetXml} 
                    onSaveDiagram={(xml) => setDrawIoScoperTargetXml(xml)} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', background: 'rgba(19, 115, 51, 0.05)', border: '1px solid rgba(19, 115, 51, 0.18)', borderRadius: '8px', fontSize: '0.68rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                  <Info size={12} style={{ color: '#137333', flexShrink: 0 }} />
                  <span>💾 <strong>Draw.io Integration:</strong> Press <strong>Ctrl + S</strong> (or <strong>Cmd + S</strong>) inside the editor to instantly save diagram modifications back to the dynamic Merck database registry!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (viewSubMode === 'report' && activeReport) {
    // Dynamic grade-aware color syncing
    const grade = activeReport.executiveSummary?.maturityGrade || "C";
    let gradeColor = 'var(--google-blue)';
    if (grade.startsWith('A')) gradeColor = 'var(--google-green)';
    else if (grade.startsWith('D') || grade === 'F') gradeColor = 'var(--google-red)';

    return (
      <div className="card card-glow-accent" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 'calc(100vh - 110px)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.85rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => setViewSubMode('assessor')}
              className="btn btn-outline no-print"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ArrowLeft size={13} />
              <span>Edit Answers</span>
            </button>
            
            <div style={{ width: '1.5px', height: '24px', background: 'var(--border-color)', margin: '0 0.25rem' }} className="no-print" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{ background: 'var(--google-blue-light)', color: 'var(--google-blue)', padding: '0.45rem', borderRadius: '8px' }}>
                <Award size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                  {frameworkVersion === 'option6' ? 'Gemini Enterprise ROI Scoping Report' : 'Gemini Enterprise Maturity Scoping Report'}
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.2rem' }}>
                  Client: <strong>{metadata.customerName}</strong> ({metadata.subVertical}) • Scoped by: <strong>{metadata.userName}</strong>
                </span>
                <span style={{ fontSize: '0.64rem', background: 'rgba(26,115,232,0.08)', color: 'var(--google-blue)', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 800, display: 'inline-block', marginTop: '0.35rem' }}>
                  📋 Assessment ID: <strong>{(() => {
                    const activeSess = sessions.find(s => s.id === activeSessionId);
                    const latestVer = (activeSess?.versions && activeSess.versions.length > 0)
                      ? activeSess.versions[activeSess.versions.length - 1]
                      : null;
                    return latestVer?.id || `${activeSess?.reportId || 'MAT-XXXXX'}-v1.0`;
                  })()}</strong>
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.55rem' }} className="no-print">
            <button
              onClick={() => window.print()}
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', borderRadius: '6px', background: 'var(--google-blue)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Printer size={13} />
              <span>Print Scoping Dossier</span>
            </button>
            <button
              onClick={() => {
                setActiveExplorerTab(0);
                setSelectedDrilldownPillar("Strategic Value & Business Alignment");
                setViewSubMode('blueprints');
              }}
              className="btn btn-outline no-print"
              style={{ 
                padding: '0.45rem 0.85rem', 
                fontSize: '0.75rem', 
                borderRadius: '6px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.35rem',
                borderColor: '#34A853',
                color: '#117233',
                background: 'rgba(52, 168, 83, 0.06)',
                fontWeight: 750
              }}
            >
              <Sparkles size={12} style={{ color: '#34A853' }} />
              <span>📐 Scoping &amp; Blueprints</span>
            </button>
            
            <button
              onClick={() => {
                const activeSess = sessions.find(s => s.id === activeSessionId);
                if (activeSess) {
                  navigator.clipboard.writeText(JSON.stringify(activeSess, null, 2));
                  alert("📋 Full session metadata JSON copied to clipboard!");
                }
              }}
              className="btn btn-outline no-print"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Clipboard size={13} />
              <span>JSON Export</span>
            </button>

            <button
              onClick={onOpenTechnicalReport}
              className="btn btn-outline no-print"
              style={{ 
                padding: '0.45rem 0.85rem', 
                fontSize: '0.75rem', 
                borderRadius: '6px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.35rem',
                borderColor: 'var(--google-blue)',
                color: 'var(--google-blue)',
                background: 'rgba(26, 115, 232, 0.06)',
                fontWeight: 750
              }}
            >
              <Terminal size={13} style={{ color: 'var(--google-blue)' }} />
              <span>💻 Technical Scoping &amp; Sandbox</span>
            </button>
          </div>
        </div>

        {/* Scrollable Dossier Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
          
          {/* Row 1: Executive Verdict */}
          <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '1.25rem', alignItems: 'stretch' }}>
            
            {/* A. Dynamic Executive Verdict Grade Card */}
            <div className="card card-interactive" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', background: `linear-gradient(135deg, var(--bg-secondary) 0%, ${gradeColor}08 100%)`, border: `1.5px solid ${gradeColor}`, borderRadius: '14px' }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 850 }}>Executive Scoping Verdict</strong>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.25rem' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: gradeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '2.1rem', fontWeight: 950, boxShadow: `0 4px 14px ${gradeColor}35`, flexShrink: 0 }}>
                  {grade}
                </div>
                <div>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', lineHeight: 1.2 }}>
                    {activeReport.executiveSummary?.maturityLabel || "Strong Candidate"}
                  </strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                    Overall Suitability Index: <strong>{activeReport.executiveSummary?.overallMaturityScore?.toFixed(1)}/5.0</strong>
                  </span>
                </div>
              </div>

              {/* Business & Technical Sub-Indices Dynamic Progress bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.45rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.55rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: '0.15rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Business Fit Alignment:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {activeReport.executiveSummary?.businessReadiness?.toFixed(1) || "1.8"}/5.0
                    </strong>
                  </div>
                  <div style={{ width: '100%', background: 'var(--google-grey-200)', height: '5px', borderRadius: '2.5px', overflow: 'hidden' }}>
                    <div style={{ width: `${((activeReport.executiveSummary?.businessReadiness || 1.8) / 5) * 100}%`, background: 'var(--google-blue)', height: '100%' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: '0.15rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Technical Fit Alignment:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {activeReport.executiveSummary?.technicalReadiness?.toFixed(1) || "1.2"}/5.0
                    </strong>
                  </div>
                  <div style={{ width: '100%', background: 'var(--google-grey-200)', height: '5px', borderRadius: '2.5px', overflow: 'hidden' }}>
                    <div style={{ width: `${((activeReport.executiveSummary?.technicalReadiness || 1.2) / 5) * 100}%`, background: 'var(--google-blue)', height: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* B. Compact Snug 3x2 Pillar GAP Grid (100% Whitespace Reclaimed & Dynamic Modals Trigger!) */}
            <div className="card" style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', height: '220px', overflow: 'hidden', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', flexShrink: 0 }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 850 }}>Pillar GAP &amp; Suitability Analysis</strong>
                <span style={{ fontSize: '0.55rem', color: 'var(--google-blue)', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.5px' }}>💡 Click Section for Details</span>
              </div>
              
              {/* Symmetrical snug 3x2 grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.55rem', flex: 1, minHeight: 0 }}>
                {activeReport.pillarGapAnalysis?.map((p, index) => (
                  <div 
                    key={index} 
                    onClick={() => {
                      setActiveExplorerTab(index);
                      setSelectedDrilldownPillar(p.pillarName);
                      setViewSubMode('blueprints');
                    }}
                    className="card-interactive"
                    style={{ 
                      background: 'var(--bg-surface)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '8px', 
                      padding: '0.45rem 0.55rem', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      userSelect: 'none'
                    }}
                    title={`Click to drill-down details for ${p.pillarName}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.25rem' }}>
                      <strong style={{ fontSize: '0.66rem', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                        {p.pillarName ? p.pillarName.split('&')[0]?.trim() : "Pillar"}
                      </strong>
                      <span className="badge badge-blue" style={{ fontSize: '0.48rem', padding: '0.05rem 0.25rem', transform: 'scale(0.9)', transformOrigin: 'right' }}>GAP: +{p.gapScore?.toFixed(1)}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                      <span>Current: <strong>{p.currentAverage?.toFixed(1)}/5</strong></span>
                      <span>Target: <strong>{p.futureAverage?.toFixed(1)}/5</strong></span>
                    </div>

                    {/* Snug Dual-Color Progress Bar */}
                    <div style={{ width: '100%', background: 'var(--google-grey-200)', height: '4px', borderRadius: '2px', position: 'relative', overflow: 'hidden', marginTop: '0.15rem' }}>
                      <div style={{ width: `${(p.futureAverage / 5) * 100}%`, background: 'rgba(59, 130, 246, 0.22)', height: '100%', position: 'absolute', left: 0, top: 0 }} />
                      <div style={{ width: `${(p.currentAverage / 5) * 100}%`, background: 'var(--google-blue)', height: '100%', position: 'absolute', left: 0, top: 0, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 📖 C-SUITE STRATEGIC BRIEFING & SCANNABLE RATIONALE */}
          <div className="card" style={{ padding: '1rem 1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.45rem', flexShrink: 0 }}>
              <FileText size={14} style={{ color: 'var(--google-blue)' }} />
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 850 }}>Executive Strategic Briefing &amp; Rationale</strong>
            </div>
            
            {(() => {
              const formatRationaleWithBolds = (text) => {
                if (!text) return "";
                const regex = /(\b\d+\.\d+\/5\.0\b|\b\d+,\d+ global\b|\b\d+,\d+ Users\b|\b\d+% - \d+%\b|\b[A-Z][a-zA-Z0-9']+'s\b|\b\d+ Months\b|\b[A-Z][A-Z0-9\s\-\|]+ Required\b|\b\d+x ROI\b)/g;
                const parts = text.split(regex);
                return parts.map((part, i) => {
                  if (regex.test(part)) {
                    return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 850 }}>{part}</strong>;
                  }
                  return part;
                });
              };

              return (
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {formatRationaleWithBolds(activeReport.executiveSummary?.rationale)}
                </p>
              );
            })()}
          </div>

          {/* Row 2: Equal Height Technical Roadmap &amp; Playbooks */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.25rem', alignItems: 'stretch' }}>
            
            {/* C. Technical Roadmap */}
            <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', height: '100%' }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '0.35rem', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem' }}>
                <Layers size={15} style={{ color: 'var(--google-blue)' }} />
                <span>Top 5 Critical Path Roadmap Remediations</span>
              </strong>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1, maxHeight: '420px', overflowY: 'auto', paddingRight: '0.25rem', scrollbarWidth: 'thin' }}>
                {activeReport.technicalRoadmap?.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.55rem 0.75rem', borderRadius: '8px' }}>
                    <span style={{ background: 'var(--google-blue-light)', color: 'var(--google-blue)', fontSize: '0.62rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px', marginTop: '0.1rem', flexShrink: 0 }}>
                      {item.targetTopicId}
                    </span>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>{item.title}</strong>
                        <span className="badge badge-red" style={{ fontSize: '0.52rem', padding: '0.05rem 0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px', transform: 'scale(0.9)' }}>
                          {item.gap >= 3 ? "🔥 Critical Path" : "🚀 Quick Win"}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', lineHeight: 1.35 }}>
                        {item.remediation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D. Strategic CE Playbooks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div className="card" style={{ padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 850 }}>Projected ROI &amp; Savings</strong>
                  <span className="badge badge-green" style={{ fontSize: '0.52rem', padding: '0.1rem 0.35rem' }}>Interactive Model</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '0.15rem' }}>
                  <div style={{ background: 'rgba(52,168,83,0.05)', border: '1.2px solid var(--google-green)', borderRadius: '8px', padding: '0.55rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.58rem', color: 'var(--google-green)', fontWeight: 850, textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>TCO Cost Savings</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{roi.tcoRange}</strong>
                  </div>
                  <div style={{ background: 'rgba(52,168,83,0.05)', border: '1.2px solid var(--google-green)', borderRadius: '8px', padding: '0.55rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.58rem', color: 'var(--google-green)', fontWeight: 850, textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>Payback Period</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{roi.paybackPeriod}</strong>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '1.2px solid var(--border-color)', borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0.25rem 0' }} className="no-print">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontWeight: 700 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Target Active Users Scale:</span>
                    <span style={{ color: 'var(--google-blue)' }}>{new Intl.NumberFormat('en-US').format(roiUserScale)} Users</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="25000" 
                    step="100"
                    value={roiUserScale}
                    onChange={(e) => setRoiUserScale(parseInt(e.target.value, 10))}
                    style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--google-blue)', height: '4px', borderRadius: '2px', background: 'var(--google-grey-200)' }}
                  />
                </div>

                <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0', lineHeight: 1.4 }}>
                  At this scale, dynamic prompt grounding generates **{roi.hoursSaved} hours saved annually**, translating to **{roi.dollarsSaved}** in hard operational savings! Caching cuts ingestion costs by **90%**.
                </p>
              </div>

              <div className="card" style={{ padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minHeight: 0 }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Zap size={14} style={{ color: 'var(--google-amber)' }} />
                  <span>CE Strategic Co-Selling Playbook</span>
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.15rem' }}>
                  {activeReport.cePlaybook?.map((step, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start', fontSize: '0.7rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.45rem 0.65rem', borderRadius: '8px' }}>
                      <span style={{ color: 'var(--google-amber)', fontWeight: 900 }}>{index + 1}.</span>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>{step.action}</strong>
                        <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.62rem', marginTop: '0.08rem', lineHeight: 1.3 }}>{step.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* 5. DYNAMIC INTERACTIVE WHAT-IF SENSITIVITY SIMULATOR */}
          <div className="card no-print" style={{ padding: '1.25rem', background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-surface) 100%)', border: '1.5px solid var(--google-blue)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem' }}>
              <Sparkles size={16} style={{ color: 'var(--google-blue)' }} />
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>📊 Consultative Sensitivity &amp; 'What-If' Simulator</strong>
              <span className="badge badge-blue" style={{ fontSize: '0.55rem', padding: '0.1/rem 0.45rem', marginLeft: 'auto' }}>Scoping Workspace Tool</span>
            </div>
            
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>
              Toggle checkboxes next to our recommended remediations below to **instantly simulate the post-remediation impact**. Watch your overall Suitability Index and Letter Grade rise in real-time as gaps are closed!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.25rem' }}>
              {activeReport.technicalRoadmap?.map((item) => {
                const isSimulated = simulatedRemediations.includes(item.targetTopicId);
                return (
                  <div 
                    key={item.targetTopicId}
                    onClick={() => handleToggleSimulation(item.targetTopicId)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      background: isSimulated ? 'rgba(26,115,232,0.04)' : 'var(--bg-surface)',
                      border: `1.5px solid ${isSimulated ? 'var(--google-blue)' : 'var(--border-color)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: `1.8px solid ${isSimulated ? 'var(--google-blue)' : 'var(--google-grey-700)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isSimulated ? 'var(--google-blue)' : 'transparent',
                      flexShrink: 0
                    }}>
                      {isSimulated && <Check size={11} style={{ color: '#ffffff' }} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <strong style={{ fontSize: '0.72rem', color: 'var(--text-primary)', display: 'block' }}>
                        [{item.targetTopicId}] {item.title}
                      </strong>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        Raise current index score by resolving this gap
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🚀 PROPOSED GCP & GEMINI ENTERPRISE DEPLOYMENT BLUEPRINT ARCHITECTURE */}
          {(() => {
            const COMPONENT_MAP = {
              'STRATEGIC.1': { name: "BigQuery FinOps & ROI Dashboard", cat: "GE", icon: "📊", desc: "Tracks investigator hours saved vs API compute cost." },
              'STRATEGIC.2': { name: "Dedicated Google FDE Staffing", cat: "GE", icon: "👥", desc: "Allocated Field Development Engineer resource hours." },
              'STRATEGIC.3': { name: "Workspace Custom SDK Panels", cat: "GE", icon: "💻", desc: "Native contextual sidebars embedded inside ELN lab sheets." },
              'STRATEGIC.4': { name: "Regional EMEA Telemetry Feature-Flags", cat: "GE", icon: "⚖️", desc: "Masks individual investigator IDs for Works Councils." },
              'STRATEGIC.5': { name: "Vertex AI GxP Weight Pinning", cat: "GE", icon: "📌", desc: "Locks foundation model weight regional hashes for GxP compliance." },
              
              'DATA.1': { name: "GCP Private Service Connect (PSC)", cat: "INDEXING", icon: "🔌", desc: "Bridges air-gapped local lab servers and OT manufacturing networks." },
              'DATA.2': { name: "Document AI Multimodal OCR", cat: "INDEXING", icon: "📄", desc: "Structures molecule SMILES diagrams and multi-column trial tables." },
              'DATA.3': { name: "Vertex AI Model Context Protocol (MCP)", cat: "INDEXING", icon: "⚡", desc: "Serverless Cloud Run MCP connectors for zero-duplication runtime fetches." },
              'DATA.4': { name: "AlloyDB AI pgvector Store", cat: "INDEXING", icon: "🗄️", desc: "High-scale vector database grounded with compound parent-child graphs." },
              'DATA.5': { name: "MedDRA Medical Acronym Translator", cat: "INDEXING", icon: "🌐", desc: "Post-translation translation gateways enforcing MedDRA clinical codes." },
              
              'ARCHITECTURE.1': { name: "Google Workspace Add-on Sidebars", cat: "SECURITY", icon: "💻", desc: "Direct conversational extensions inside daily Lab Docs/Sheets." },
              'ARCHITECTURE.2': { name: "GCP VPC Service Controls (VPC-SC)", cat: "SECURITY", icon: "🛡️", desc: "Geofences predict APIs inside strict corporate network perimeters." },
              'ARCHITECTURE.3': { name: "Vertex AI Token Streaming API", cat: "SECURITY", icon: "⚡", desc: "Asynchronous chunk streaming to eliminate HTTP timeout outages." },
              'ARCHITECTURE.4': { name: "Apigee Gateway Rate-Limiting Buffers", cat: "SECURITY", icon: "🚥", desc: "Token-bucket queuing protections to absorb peak database query hours." },
              'ARCHITECTURE.5': { name: "Cloud Functions Read-Only Sandbox", cat: "SECURITY", icon: "🔒", desc: "Prevents agentic tool writes, returning safe draft proposals instead." },
              
              'SECURITY.1': { name: "Europe-West9 Regional Geofencing", cat: "SECURITY", icon: "🌍", desc: "Locks data residency within EMEA (Paris regional endpoints) for GDPR compliance." },
              'SECURITY.2': { name: "OAuth 2.0 Delegated Identity Flow", cat: "SECURITY", icon: "👥", desc: "Passes investigator credentials row-level down to source Veeva databases." },
              'SECURITY.3': { name: "Vertex AI Model Armor Gateway", cat: "SECURITY", icon: "🔐", desc: "Gateway proxy blocking poison injections, toxic payloads, and jailbreaks." },
              'SECURITY.4': { name: "NotebookLM Enterprise & Citation Coordinates", cat: "GE", icon: "📚", desc: "Multimodal document indexing returning coordinate citations for FDA audits." },
              'SECURITY.5': { name: "FDA GxP frozen weights weights", cat: "SECURITY", icon: "❄️", desc: "Frozen software prediction weights region boundaries under QA controls." },
              
              'EXECUTION.1': { name: "Centralized GitHub Prompt Registry", cat: "INDEXING", icon: "🔄", desc: "Central LLMOps prompt registry, syncing instructions directly via CI/CD." },
              'EXECUTION.2': { name: "Vertex AI Automated Evaluation Harness", cat: "INDEXING", icon: "🧪", desc: "Golden datasets comparison checking powered by LLM-as-a-judge." },
              'EXECUTION.3': { name: "Adversarial Recall Red-Teaming", cat: "INDEXING", icon: "🎯", desc: "Recall testing scripts tuning overlap and minimizing omission errors." },
              'EXECUTION.4': { name: "BigQuery ESG Carbon & FinOps Analytics", cat: "INDEXING", icon: "🌿", desc: "FinOps attribution tracking compute tokens and ESG carbon outputs." },
              'EXECUTION.5': { name: "18-Month Regional Foundation Model Pinning", cat: "INDEXING", icon: "⏳", desc: "Guarantees software re-validation immunity when vendor model deprecates." }
            };

            const quadrantData = { ge: [], indexing: [], security: [] };
            let activeGapsCount = 0;
            let activeStrengthsCount = 0;

            Object.keys(COMPONENT_MAP).forEach(key => {
              const qState = scores[key];
              if (!qState || qState.skipped) return;
              const currentScore = qState.current;
              if (currentScore === null || currentScore === 3) return;

              let status = "STABLE"; 
              let statusColor = "var(--text-secondary)";
              let borderStyle = "1px solid var(--border-color)";
              let bgStyle = "var(--bg-surface)";

              if (currentScore <= 2) {
                status = "REMEDIATION CRITICAL";
                statusColor = "var(--google-red)";
                borderStyle = "1.5px solid var(--google-red)";
                bgStyle = "rgba(234, 84, 85, 0.03)";
                activeGapsCount++;
              } else if (currentScore >= 4) {
                status = "STRENGTH READY";
                statusColor = "var(--google-green)";
                borderStyle = "1.5px solid var(--google-green)";
                bgStyle = "rgba(52, 168, 83, 0.02)";
                activeStrengthsCount++;
              }

              const item = {
                id: key,
                name: COMPONENT_MAP[key].name,
                icon: COMPONENT_MAP[key].icon,
                desc: COMPONENT_MAP[key].desc,
                status,
                statusColor,
                borderStyle,
                bgStyle
              };

              const cat = COMPONENT_MAP[key].cat.toLowerCase();
              if (cat === "ge") quadrantData.ge.push(item);
              else if (cat === "indexing") quadrantData.indexing.push(item);
              else quadrantData.security.push(item);
            });

            const totalActiveCount = activeGapsCount + activeStrengthsCount;

            return (
              <div className="card" style={{ padding: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.45rem', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <strong style={{ fontSize: '1.35rem', flexShrink: 0 }}>🚀</strong>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block', fontWeight: 950 }}>Proposed Dynamic Target GCP &amp; Gemini Enterprise Blueprint</strong>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                        {totalActiveCount === 0 
                          ? "Adjust current scores to [1-2] (Gaps) or [4-5] (Strengths) in the assessor to generate a dynamic GCP architecture"
                          : `Showing ${activeGapsCount} critical remediations and ${activeStrengthsCount} capability strengths mapped to your active inputs`}
                      </span>
                    </div>
                  </div>
                  <span className="badge badge-blue" style={{ fontSize: '0.55rem', padding: '0.15rem 0.55rem', textTransform: 'uppercase' }}>Dynamic Blueprint Brief</span>
                </div>

                {totalActiveCount === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-surface)', border: '1.5px dashed var(--border-color)', borderRadius: '10px', color: 'var(--text-secondary)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                    No active scoping gaps or strengths scored. The target architecture updates dynamically as you complete the maturity assessment!
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.95rem', marginTop: '0.25rem' }}>
                    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
                      <strong style={{ fontSize: '0.72rem', color: 'var(--google-blue)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', flexShrink: 0 }}>
                        <span>💻 Gemini Enterprise Applications</span>
                      </strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', maxHeight: '320px', paddingRight: '0.15rem', scrollbarWidth: 'thin' }}>
                        {quadrantData.ge.length === 0 ? (
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', padding: '1rem 0' }}>No active GE features mapped.</div>
                        ) : (
                          quadrantData.ge.map((item, idx) => (
                            <div key={idx} style={{ background: item.bgStyle, border: item.borderStyle, borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.68rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <span>{item.icon}</span>
                                  <span>{item.name}</span>
                                </strong>
                                <span style={{ fontSize: '0.48rem', color: item.statusColor, fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.3px', background: 'rgba(255,255,255,0.9)', padding: '0.05rem 0.25rem', borderRadius: '4px', border: `1px solid ${item.statusColor}` }}>
                                  {item.status === 'REMEDIATION CRITICAL' ? '⚠️ Remediation' : item.status === 'STRENGTH READY' ? '✓ Strength' : 'Stable'}
                                </span>
                              </div>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.62rem', lineHeight: 1.25 }}>{item.desc}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
                      <strong style={{ fontSize: '0.72rem', color: 'var(--google-green)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', flexShrink: 0 }}>
                        <span>🗄️ GCP AI &amp; Data Infrastructure</span>
                      </strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', maxHeight: '320px', paddingRight: '0.15rem', scrollbarWidth: 'thin' }}>
                        {quadrantData.indexing.length === 0 ? (
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', padding: '1rem 0' }}>No active AI infrastructure mapped.</div>
                        ) : (
                          quadrantData.indexing.map((item, idx) => (
                            <div key={idx} style={{ background: item.bgStyle, border: item.borderStyle, borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.68rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <span>{item.icon}</span>
                                  <span>{item.name}</span>
                                </strong>
                                <span style={{ fontSize: '0.48rem', color: item.statusColor, fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.3px', background: 'rgba(255,255,255,0.9)', padding: '0.05rem 0.25rem', borderRadius: '4px', border: `1px solid ${item.statusColor}` }}>
                                  {item.status === 'REMEDIATION CRITICAL' ? '⚠️ Remediation' : item.status === 'STRENGTH READY' ? '✓ Strength' : 'Stable'}
                                </span>
                              </div>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.62rem', lineHeight: 1.25 }}>{item.desc}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
                      <strong style={{ fontSize: '0.72rem', color: 'var(--google-purple)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', flexShrink: 0 }}>
                        <span>🛡️ GCP Security &amp; Net Perimeters</span>
                      </strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', overflowY: 'auto', maxHeight: '320px', paddingRight: '0.15rem', scrollbarWidth: 'thin' }}>
                        {quadrantData.security.length === 0 ? (
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', padding: '1rem 0' }}>No active security components mapped.</div>
                        ) : (
                          quadrantData.security.map((item, idx) => (
                            <div key={idx} style={{ background: item.bgStyle, border: item.borderStyle, borderRadius: '8px', padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.68rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <span>{item.icon}</span>
                                  <span>{item.name}</span>
                                </strong>
                                <span style={{ fontSize: '0.48rem', color: item.statusColor, fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.3px', background: 'rgba(255,255,255,0.9)', padding: '0.05rem 0.25rem', borderRadius: '4px', border: `1px solid ${item.statusColor}` }}>
                                  {item.status === 'REMEDIATION CRITICAL' ? '⚠️ Remediation' : item.status === 'STRENGTH READY' ? '✓ Strength' : 'Stable'}
                                </span>
                              </div>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.62rem', lineHeight: 1.25 }}>{item.desc}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })()}
          </div>

        {/* Symmetrical Footer navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border-color)', paddingTop: '0.85rem', marginTop: '0.5rem' }} className="no-print">
          <button
            type="button"
            onClick={() => {
              onNewSession();
              setViewSubMode('setup');
            }}
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1.5rem', fontSize: '0.85rem', borderRadius: '6px' }}
          >
            🔄 Start Fresh Audit
          </button>
          
          <button
            type="button"
            onClick={() => setViewSubMode('assessor')}
            className="btn btn-primary"
            style={{ padding: '0.55rem 2rem', fontSize: '0.85rem', borderRadius: '6px', background: 'var(--google-blue)', border: 'none' }}
          >
            ← Back to Scoping Matrix
          </button>
        </div>

      </div>
    );
  }

  // =================================================
  // 3. ASSESSOR MODE: 5-Column Question Workspace
  // =================================================
  return (
    <div className="grid-2" style={{ gridTemplateColumns: '260px 1fr', gap: '1.5rem', width: '100%', minHeight: 'calc(100vh - 110px)', padding: '0.5rem 0' }}>
      
      {/* Left Sidebar Pillar Index Directory */}
      <aside className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', background: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '16px', zIndex: 100 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Header stats info */}
          <div>
            <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
              {metadata.customerName || "Maturity Registry"}
            </strong>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
              {answeredQuestions} of {totalQuestions} topics audited
            </span>
            <div style={{ width: '100%', background: 'var(--google-grey-200)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginTop: '0.45rem' }}>
              <div style={{ width: `${completionPercentage}%`, background: 'var(--google-blue)', height: '100%', transition: 'width 0.3s' }} />
            </div>
          </div>

          {/* Pillar directory layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {PILLARS.map((p, idx) => {
              const isActive = currentPillarIdx === idx;
              const stats = getPillarCompletionStats(p);
              
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => {
                    setCurrentPillarIdx(idx);
                    setCurrentQuestionIdx(0);
                  }}
                  className={`sidebar-btn ${isActive ? 'active' : ''}`}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{p.icon}</span>
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                      {p.name.split('&')[0].trim()}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.58rem', opacity: 0.75, background: 'rgba(255,255,255,0.15)', padding: '0.05rem 0.3rem', borderRadius: '3px' }}>
                    {stats.completed}/{stats.total}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Offline Excel/CSV Sheet Synchronization Actions (V6 Parity!) */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px', marginBottom: '2px', textAlign: 'left' }}>
              Offline Sheet Sync
            </div>
            <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
              <button
                type="button"
                onClick={downloadV6AssessmentAsCSV}
                style={{
                  flex: 1, fontSize: '10px', padding: '4px 8px', borderRadius: '6px', border: '1px dashed var(--google-blue)',
                  background: 'rgba(66,133,244,0.05)', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 750,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px'
                }}
                title="Export all V6 questions and choices to Comma-Separated Values (.csv) spreadsheet"
              >
                <span>📤 Export</span>
              </button>
              
              <label
                style={{
                  flex: 1, fontSize: '10px', padding: '4px 8px', borderRadius: '6px', border: '1px dashed var(--google-green)',
                  background: 'rgba(52,168,83,0.05)', color: 'var(--google-green)', cursor: 'pointer', fontWeight: 750,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', margin: 0
                }}
                title="Import Comma-Separated Values (.csv) spreadsheet back to V6 Assessor"
              >
                <span>📥 Import</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleV6CSVUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          {/* Autofill Scenarios inside Sidebar */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <button
              type="button"
              onClick={handleAutofillMaturityDemo}
              className="btn btn-outline"
              style={{ 
                width: '100%', 
                padding: '0.45rem', 
                borderRadius: '8px', 
                fontSize: '0.7rem', 
                fontWeight: 750,
                borderColor: 'var(--google-purple)',
                color: 'var(--google-purple)',
                background: 'rgba(168, 85, 247, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem'
              }}
            >
              <Wand2 size={13} />
              <span>Prefill Demo Scenario</span>
            </button>

            {/* View Report Button in Sidebar */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem' }}>
              <button
                onClick={handleGenerateMaturityReport}
                className="btn btn-primary"
                disabled={!hasCompletedPillar || isCompiling}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #1a73e8 0%, #a855f7 100%)',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: hasCompletedPillar ? '0 4px 14px rgba(168,85,247,0.3)' : 'none',
                  cursor: hasCompletedPillar ? 'pointer' : 'not-allowed',
                  opacity: hasCompletedPillar ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem'
                }}
              >
                <Sparkles size={14} className={isCompiling ? "spin-animation" : ""} />
                <span>{isCompiling ? "Compiling Dossier..." : "View Report Blueprint"}</span>
              </button>
              {!hasCompletedPillar && (
                <span style={{ fontSize: '0.62rem', color: 'var(--google-red)', display: 'block', marginTop: '0.4rem', textAlign: 'center', lineHeight: 1.2, fontWeight: 600 }}>
                  ⚠️ Complete at least one section (10 questions) to compile.
                </span>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Card */}
      <main className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '16px', overflowY: 'auto' }}>
        
        {/* Top Track Ribbon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '1.1rem' }}>{activePillar.icon}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                {activePillar.name}
              </h3>
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{activePillar.description}</span>
          </div>

          {/* Circular Badges and Skip toggle Checkbox */}
          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
            
            {/* Step Badges */}
            <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
              {activePillar.questions.map((q, idx) => {
                const qState = scores[q.id];
                const isCompleted = qState && (qState.skipped || isQuestionCompleted(q.id));
                const isActive = currentQuestionIdx === idx;
                const isSkipped = qState && qState.skipped;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleQuickQuestionJump(idx)}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isActive 
                        ? 'var(--google-blue)' 
                        : (isCompleted 
                            ? (isSkipped ? '#64748b' : 'var(--google-green)') 
                            : 'var(--google-grey-200)'),
                      color: isActive || isCompleted ? '#ffffff' : 'var(--text-secondary)',
                      transition: 'all 0.2s'
                    }}
                    title={`Jump to question ${idx + 1}: ${q.id} ${isSkipped ? '(Skipped)' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Saved Status Badge */}
            <div className="badge badge-green" style={{ fontSize: '0.62rem', padding: '0.15rem 0.55rem', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--google-green)' }} />
              <span>Saved</span>
            </div>

            {/* Skip Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 700, cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={currentQuestionState.skipped || false}
                onChange={(e) => {
                  const val = e.target.checked;
                  setScores(prev => ({
                    ...prev,
                    [activeQuestion.id]: {
                      ...prev[activeQuestion.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false },
                      skipped: val,
                      current: val ? 1 : (prev[activeQuestion.id]?.current === 1 ? null : prev[activeQuestion.id]?.current),
                      future: val ? 5 : (prev[activeQuestion.id]?.future === 5 ? null : prev[activeQuestion.id]?.future)
                    }
                  }));
                }}
                style={{
                  width: '14px',
                  height: '14px',
                  cursor: 'pointer',
                  accentColor: '#3b82f6'
                }}
              />
              <span>Skip Topic</span>
            </label>

          </div>
        </div>

        {/* Question Banner */}
        <div style={{ padding: '0.5rem 0.25rem', flexShrink: 0 }}>
          <span style={{ fontSize: '0.58rem', color: 'var(--google-blue)', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>
            Topic Index {activeQuestion.id} Assessment Scrutiny:
          </span>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
            {activeQuestion.topic}
          </h4>
        </div>

        {/* 4-Column Expanded Workspace Board */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>
          
          {/* Col 1: Current State */}
          <div className="card" style={{ padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
            <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.5px', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.25rem', display: 'block', fontWeight: 800 }}>
              Current State *
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
              {activeQuestion.currentOptions.map((opt, index) => {
                const val = index + 1;
                const isSelected = currentQuestionState.current === val;
                return (
                  <div
                    key={`curr-${val}`}
                    onClick={() => handleOptionSelect('current', val)}
                    style={{
                      padding: '0.45rem 0.55rem',
                      borderRadius: '8px',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(245,158,11,0.06)' : 'var(--bg-surface)',
                      border: `1.5px solid ${isSelected ? '#ea580c' : 'var(--border-color)'}`,
                      color: isSelected ? '#ea580c' : 'var(--text-primary)',
                      lineHeight: 1.25,
                      transition: 'all 0.2s',
                      minHeight: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      boxSizing: 'border-box'
                    }}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Col 2: Future State */}
          <div className="card" style={{ padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
            <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.5px', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.25rem', display: 'block', fontWeight: 800 }}>
              Future State *
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
              {activeQuestion.futureOptions.map((opt, index) => {
                const val = index + 1;
                const isSelected = currentQuestionState.future === val;
                const isDisabled = currentQuestionState.current !== null && val < currentQuestionState.current;
                return (
                  <div
                    key={`fut-${val}`}
                    onClick={() => !isDisabled && handleOptionSelect('future', val)}
                    style={{
                      padding: '0.45rem 0.55rem',
                      borderRadius: '8px',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      background: isSelected ? 'rgba(16,185,129,0.06)' : 'var(--bg-surface)',
                      border: `1.5px solid ${isSelected ? 'var(--google-green)' : 'var(--border-color)'}`,
                      color: isSelected ? 'var(--google-green)' : 'var(--text-primary)',
                      lineHeight: 1.25,
                      transition: 'all 0.2s',
                      minHeight: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      boxSizing: 'border-box',
                      opacity: isDisabled ? 0.4 : 1
                    }}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Col 3: Technical Painpoints */}
          <div className="card" style={{ padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
            <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.5px', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.25rem', display: 'block', fontWeight: 800 }}>
              Technical Painpoints *
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
              {activeQuestion.technicalPainpoints.map((opt) => {
                const isSelected = currentQuestionState.techPain.includes(opt);
                return (
                  <div
                    key={opt}
                    onClick={() => {
                      setScores(prev => {
                        const state = prev[activeQuestion.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                        const list = state.techPain.includes(opt) 
                          ? state.techPain.filter(x => x !== opt)
                          : [...state.techPain, opt];
                        return {
                          ...prev,
                          [activeQuestion.id]: { ...state, techPain: list }
                        };
                      });
                    }}
                    style={{
                      padding: '0.45rem 0.55rem',
                      borderRadius: '8px',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(26,115,232,0.06)' : 'var(--bg-surface)',
                      border: `1.5px solid ${isSelected ? 'var(--google-blue)' : 'var(--border-color)'}`,
                      color: isSelected ? 'var(--google-blue)' : 'var(--text-primary)',
                      lineHeight: 1.25,
                      transition: 'all 0.2s',
                      minHeight: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      boxSizing: 'border-box'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      style={{ marginRight: '0.35rem', accentColor: 'var(--google-blue)' }}
                    />
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Col 4: Business Painpoints */}
          <div className="card" style={{ padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
            <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.5px', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.25rem', display: 'block', fontWeight: 800 }}>
              Business Painpoints *
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
              {activeQuestion.businessPainpoints.map((opt) => {
                const isSelected = currentQuestionState.bizPain.includes(opt);
                return (
                  <div
                    key={opt}
                    onClick={() => {
                      setScores(prev => {
                        const state = prev[activeQuestion.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                        const list = state.bizPain.includes(opt) 
                          ? state.bizPain.filter(x => x !== opt)
                          : [...state.bizPain, opt];
                        return {
                          ...prev,
                          [activeQuestion.id]: { ...state, bizPain: list }
                        };
                      });
                    }}
                    style={{
                      padding: '0.45rem 0.55rem',
                      borderRadius: '8px',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(26,115,232,0.06)' : 'var(--bg-surface)',
                      border: `1.5px solid ${isSelected ? 'var(--google-blue)' : 'var(--border-color)'}`,
                      color: isSelected ? 'var(--google-blue)' : 'var(--text-primary)',
                      lineHeight: 1.25,
                      transition: 'all 0.2s',
                      minHeight: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      boxSizing: 'border-box'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      style={{ marginRight: '0.35rem', accentColor: 'var(--google-blue)' }}
                    />
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Notes & Comments Box */}
        <div className="card" style={{ padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', flexShrink: 0 }}>
          <strong style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.5px', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.25rem', display: 'block', fontWeight: 800 }}>
            Notes &amp; Comments Box *
          </strong>
          <textarea
            placeholder="Enter active scoping notes, union agreements details, or custom SME validations observations..."
            value={currentQuestionState.comments || ""}
            onChange={(e) => {
              const val = e.target.value;
              setScores(prev => {
                const state = prev[activeQuestion.id] || { current: null, future: null, techPain: [], bizPain: [], comments: '', skipped: false };
                return {
                  ...prev,
                  [activeQuestion.id]: { ...state, comments: val }
                };
              });
            }}
            style={{
              width: '100%',
              height: '55px',
              padding: '0.45rem',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '0.72rem',
              fontFamily: 'inherit',
              resize: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Bottom pagination controller */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border-color)', paddingTop: '0.65rem', flexShrink: 0 }}>
          <button
            onClick={handleBack}
            disabled={currentPillarIdx === 0 && currentQuestionIdx === 0}
            className="btn btn-outline"
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.75rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: (currentPillarIdx === 0 && currentQuestionIdx === 0) ? 'not-allowed' : 'pointer',
              opacity: (currentPillarIdx === 0 && currentQuestionIdx === 0) ? 0.4 : 1
            }}
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>

          <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
            Progress: {completionPercentage}% ({answeredQuestions} of {totalQuestions} Completed)
          </span>

          <button
            onClick={handleNext}
            disabled={currentPillarIdx === PILLARS.length - 1 && currentQuestionIdx === activePillar.questions.length - 1}
            className="btn btn-primary"
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.75rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--google-blue)',
              cursor: (currentPillarIdx === PILLARS.length - 1 && currentQuestionIdx === activePillar.questions.length - 1) ? 'not-allowed' : 'pointer',
              opacity: (currentPillarIdx === PILLARS.length - 1 && currentQuestionIdx === activePillar.questions.length - 1) ? 0.4 : 1
            }}
          >
            <span>Next</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </main>
      
    </div>
  );
}
