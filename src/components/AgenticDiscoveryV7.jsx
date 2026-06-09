import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'ctx', label: 'Use case context', nav: 'Context', score: 'both', qs: 5 },
  { id: 'pain', label: 'Business pain & urgency', nav: 'Business pain', score: 'discovery', qs: 8 },
  { id: 'value', label: 'Strategic value', nav: 'Strategic value', score: 'discovery', qs: 4 },
  { id: 'users', label: 'Users & interaction', nav: 'Users', score: 'discovery', qs: 4 },
  { id: 'current', label: 'Current state', nav: 'Current state', score: 'readiness', qs: 7, path: 'recreate' },
  { id: 'target', label: 'Target architecture', nav: 'Target arch', score: 'readiness', qs: 6 },
  { id: 'data', label: 'Data sources & quality', nav: 'Data sources', score: 'readiness', qs: 11 },
  { id: 'connectivity', label: 'Connectivity & networking', nav: 'Connectivity', score: 'readiness', qs: 8 },
  { id: 'security', label: 'Security & compliance', nav: 'Security', score: 'readiness', qs: 5 },
  { id: 'team', label: 'Team & delivery', nav: 'Team', score: 'readiness', qs: 4 },
  { id: 'sustain', label: 'Sustainability & ROI', nav: 'ROI & sustain', score: 'both', qs: 5 },
];

// Exhaustive 67-question custom scoping database with custom options!
const QUESTIONS = [
  /* ── SECTION 1: CONTEXT (5 questions) ── */
  {
    id: 'ctx1', sec: 'ctx', n: 1, path: 'both', who: 'both', disc: false, read: false,
    q: 'What is the name and one-line description of this use case?',
    hint: 'Be specific — "AI assistant" is too vague. A precise name anchors everything that follows.',
    custom: true,
    groups: [{ label: 'Clinical & pharma patterns', opts: ['Clinical trial protocol summarization', 'Regulatory submission Q&A (CTD/eCTD)', 'Drug safety signal detection (FAERS)', 'Medical writer assistant (document drafting)'] }]
  },
  {
    id: 'ctx2', sec: 'ctx', n: 2, path: 'both', who: 'both', disc: true, read: false,
    q: 'What is the industry domain and sub-vertical?',
    hint: 'Drives GxP compliance categories and GCP landing zone configurations.',
    groups: [
      { label: 'Life sciences & HCLS sub-verticals', opts: ['Pharma R&D', 'Clinical operations', 'Medical affairs', 'Regulatory affairs', 'Pharmacovigilance', 'Payer / insurance', 'Provider / hospital system'] },
      { label: 'Other industries', opts: ['Financial services / banking', 'Insurance', 'Manufacturing', 'Technology / software', 'Other'] }
    ]
  },
  {
    id: 'ctx3', sec: 'ctx', n: 3, path: 'both', who: 'both', disc: false, read: false,
    q: 'Is this a migration of an existing AI system, or a net-new build?',
    hint: 'Migration = legacy current state assessment applies. Greenfield = skips legacy current state chapters.',
    groups: [{ label: 'Scoping pathways', opts: ['Building fresh — no prior AI exists for this use case', 'Recreating / migrating an existing AI system onto GCP', 'Replacing a manual / rule-based process (no AI today)'] }]
  },
  {
    id: 'ctx5', sec: 'ctx', n: 4, path: 'both', who: 'both', disc: false, read: false,
    q: 'What cloud environments are currently in scope?',
    hint: 'Multi-cloud setups add connectivity perimeters and network egress overheads.',
    multi: true,
    groups: [{ label: 'Cloud environments', opts: ['Google Cloud Platform (GCP)', 'Amazon Web Services (AWS)', 'Microsoft Azure', 'On-premises (data centre)', 'Oracle Cloud (OCI)'] }]
  },
  {
    id: 'ctx6', sec: 'ctx', n: 5, path: 'both', who: 'both', disc: false, read: false,
    q: 'What is the deployment tier for this phase?',
    hint: 'Sizing of the pilot or production architecture.',
    groups: [{ label: 'Deployment scope', opts: ['Proof of concept — validate feasibility only', 'Pilot — limited users, production-like environment', 'Phase 1 production — core use case, limited rollout', 'Full production — all users, all features'] }]
  },

  /* ── SECTION 2: BUSINESS PAIN & URGENCY (8 questions) ── */
  {
    id: 'pain1', sec: 'pain', n: 6, path: 'both', who: 'biz', disc: true, read: false,
    q: 'What is the severity of the current pain without this solution?',
    hint: 'Pain severity is the primary driver of business urgency and executive support.',
    groups: [{ label: 'Pain severity', opts: ['Critical — causing measurable clinical trial delays today', 'High — significant productivity loss or compliance risk', 'Medium — notable inefficiency but manual workarounds exist', 'Low — nice to have, not causing active process delays'] }]
  },
  {
    id: 'pain2', sec: 'pain', n: 7, path: 'both', who: 'biz', disc: true, read: false,
    q: 'How frequently does this process friction occur for affected users?',
    hint: 'High frequency multiplies the FTE cost calculation.',
    groups: [{ label: 'Frequencies', opts: ['Multiple times per day', 'Daily', 'Weekly', 'Monthly', 'Per clinical trial submission'] }]
  },
  {
    id: 'pain3', sec: 'pain', n: 8, path: 'both', who: 'biz', disc: true, read: false,
    q: 'What is the estimated time lost per user per week on this task?',
    hint: 'Core mathematical baseline for direct time-savings calculation.',
    groups: [{ label: 'Weekly hours lost', opts: ['More than 10 hours', '5–10 hours', '3–5 hours', '1–3 hours', 'Less than 1 hour'] }]
  },
  {
    id: 'pain4', sec: 'pain', n: 9, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Does this process create downstream delays affecting adjacent teams?',
    hint: 'Cascading delays amplify the total business urgency.',
    blocker: { cond: 'Yes — significant downstream delays (regulatory submissions, trial timelines, patient care)', type: 'risk', title: 'Downstream cascade amplifies business impact', body: 'This process delays clinical trial filings, multiplying timelines across the organisation.', opts: 'Engage Scientific leads to isolate pipeline constraints.' },
    groups: [{ label: 'Downstream impact', opts: ['No downstream dependencies — contained to immediate team', 'Yes — moderate downstream impact on adjacent teams', 'Yes — significant downstream delays (regulatory submissions, trial timelines, patient care)'] }]
  },
  {
    id: 'pain5', sec: 'pain', n: 10, path: 'both', who: 'biz', disc: true, read: false,
    q: 'What is the consequence of a 12-month delay in deploying this?',
    hint: 'Uncovers true business cost and competitive risk of inaction.',
    groups: [{ label: 'Consequences', opts: ['Clinical trial / FDA submission delayed — massive revenue impact', 'Compliance violation risk — potential audits or findings', 'Competitive disadvantage — peers already deploying similar capabilities', 'Internal productivity loss only — no external GxP or financial risk'] }]
  },
  {
    id: 'pain6', sec: 'pain', n: 11, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Is there a hard external deadline tied to a regulatory event?',
    hint: 'Schedules all readiness gaps into fixed remediation dates.',
    blocker: { cond: 'Yes — hard regulatory deadline (FDA submission, audit date)', type: 'risk', title: 'Hard regulatory deadline', body: 'A fixed FDA filing date means all technical and connectivity gaps must be cleared on a locked schedule.', opts: 'Form a dedicated co-selling network/security taskforce.' },
    groups: [{ label: 'Regulatory deadlines', opts: ['No external deadline', 'Soft target — preferred internal rollout milestones', 'Yes — hard contractual deadline (vendor contract end, board review)', 'Yes — hard regulatory deadline (FDA submission, audit date)'] }]
  },
  {
    id: 'pain7', sec: 'pain', n: 12, path: 'both', who: 'biz', disc: false, read: false,
    q: 'Has this pain been acknowledged and prioritised at executive level?',
    hint: 'Ensures the project has executive air cover during roadmap conflicts.',
    groups: [{ label: 'Prioritization', opts: ['Yes — on corporate roadmap with named C-Suite owner', 'Yes — acknowledged but not formally prioritized', 'Informal departmental agreement only', 'Not yet raised to leadership'] }]
  },
  {
    id: 'pain8', sec: 'pain', n: 13, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Are direct competitors already deploying AI for this specific use case?',
    hint: 'A strong strategic driver for program priority.',
    groups: [{ label: 'Competitor activities', opts: ['Yes — peers are actively deploying similar workloads', 'Suspected competitive activity', 'No known peer activity', 'Unknown / not researched'] }]
  },

  /* ── SECTION 3: STRATEGIC VALUE (4 questions) ── */
  {
    id: 'val1', sec: 'value', n: 14, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Does this use case build a reusable platform capability?',
    hint: 'Shared data connectives or orchestration graphs justify higher investments.',
    groups: [{ label: 'Platform reusability', opts: ['Core platform capability — reused by 5+ other planned use cases', 'Reusable pattern — 2–4 other workloads will benefit', 'Fully bespoke — no direct reusability potential'] }]
  },
  {
    id: 'val2', sec: 'value', n: 15, path: 'both', who: 'biz', disc: true, read: false,
    q: 'How many other planned AI use cases depend on this being built first?',
    hint: 'First-mover dependencies unblock broader enterprise roadmaps.',
    groups: [{ label: 'Dependencies', opts: ['None — standalone use case', '1–2 use cases depend on this', '3–5 use cases depend on this', 'More than 5 workloads depend on this'] }]
  },
  {
    id: 'val3', sec: 'value', n: 16, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Is this use case a strategic proof point for the AI program?',
    hint: 'Vetting and winning over internally skeptical stakeholders.',
    groups: [{ label: 'Strategic proof point', opts: ['Critical proof point — entire AI program scaling depends on this succeeding', 'Important — will heavily influence executive investment decisions', 'Helpful but not essential to broad program momentum'] }]
  },
  {
    id: 'val4', sec: 'value', n: 17, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Is there an active Google Cloud commercial target this counts toward?',
    hint: 'Aligns the FDE resources directly to committed customer consumption.',
    groups: [{ label: 'GCP target commits', opts: ['Yes — specific GCP commit or CUD this must contribute to', 'Yes — Vertex AI / Agent Builder consumption targets', 'No active cloud committed commercial target'] }]
  },

  /* ── SECTION 4: USERS & INTERACTION (4 questions) ── */
  {
    id: 'usr1', sec: 'users', n: 18, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Who are the primary user personas?',
    hint: 'Assesses workflow integration styles and security scoping requirements.',
    multi: true,
    groups: [{ label: 'User personas', opts: ['Senior specialists (clinical researchers, underwriters, data scientists)', 'Executive / C-Suite (high-stakes search queries)', 'Knowledge workers (daily document summarization)', 'Operational / frontline staff (high-volume data tasks)'] }]
  },
  {
    id: 'usr2', sec: 'users', n: 19, path: 'both', who: 'biz', disc: true, read: false,
    q: 'How many direct users will benefit from this phase?',
    hint: 'Contributes to total business value and concurrent token load metrics.',
    groups: [{ label: 'User counts', opts: ['1–10 users', '11–50 users', '51–200 users', '201–1,000 users', 'More than 1,000 users'] }]
  },
  {
    id: 'usr3', sec: 'users', n: 20, path: 'both', who: 'biz', disc: true, read: false,
    q: 'What is the primary system interaction pattern?',
    hint: 'Conversational interfaces vs scheduled batches dictate architectural layouts.',
    groups: [{ label: 'Interaction patterns', opts: ['Real-time conversational (types, expects sub-3s response)', 'Human-in-the-loop review (AI drafts, human approves)', 'Document upload + Q&A (async, minutes acceptable)', 'Scheduled batch (nightly/weekly, latency not critical)', 'API consumer (downstream system calls agent)'] }]
  },
  {
    id: 'usr4', sec: 'users', n: 21, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Is there a validated demand signal directly from end users?',
    hint: 'Reduces post-launch adoption risks significantly.',
    groups: [{ label: 'User demand verification', opts: ['Yes — formal user research or survey with quantified demand', 'Yes — direct user interviews completed, strong signal', 'Informal — anecdotal requests from department managers', 'Assumed — top-down mandate with no direct user validation'] }]
  },

  /* ── SECTION 5: CURRENT STATE (7 questions - legacy path) ── */
  {
    id: 'cur1', sec: 'current', n: 22, path: 'recreate', who: 'tech', disc: false, read: true,
    q: 'What is the current legacy AI model and vendor?',
    hint: 'Determines prompt portability and model conversion complexity.',
    groups: [{ label: 'Current legacy vendor & model', opts: ['Azure OpenAI — GPT-4o', 'Azure OpenAI — GPT-4 Turbo', 'AWS Bedrock — Claude (Anthropic)', 'OpenAI API direct — GPT-4o', 'On-prem / self-hosted Llama container', 'Traditional ML model (non-LLM)'] }]
  },
  {
    id: 'cur2', sec: 'current', n: 23, path: 'recreate', who: 'tech', disc: false, read: true,
    q: 'How is the current model accessed?',
    hint: 'Self-hosted containers add VM migrations on top of prompt adjustments.',
    groups: [{ label: 'Access methods', opts: ['Managed API (vendor-hosted endpoint)', 'SDK (LangChain, LlamaIndex, custom)', 'Self-hosted container on cloud VM', 'Embedded in enterprise SaaS product'] }]
  },
  {
    id: 'cur4', sec: 'current', n: 24, path: 'recreate', who: 'tech', disc: false, read: true,
    q: 'What is the current context window utilization status?',
    hint: 'Gemini 1.5 Pro 1M context eliminates complex document chunking.',
    groups: [{ label: 'Context utilization', opts: ['Context window adequate — not a current bottleneck', 'Context limit occasionally hit — workarounds in place', 'Context limit frequently hit — complex chunking required', 'Unknown — not measured'] }]
  },
  {
    id: 'cur5', sec: 'current', n: 25, path: 'recreate', who: 'tech', disc: false, read: true,
    q: 'What is the current legacy monthly AI API and infrastructure cost?',
    hint: 'Provides the direct financial cost baseline for TCO models.',
    groups: [{ label: 'Monthly TCO', opts: ['Less than $1,000/month', '$1,000–$5,000/month', '$5,000–$20,000/month', '$20,000–$100,000/month', 'More than $100,000/month'] }]
  },
  {
    id: 'cur6', sec: 'current', n: 26, path: 'recreate', who: 'tech', disc: false, read: true,
    q: 'Is the existing training data, grounding corpus, or fine-tune portable?',
    hint: 'Vendor-locked embeddings cannot be exported and must be rebuilt on GCP.',
    blocker: { cond: 'No — significant vendor lock-in', type: 'fatal', title: 'Data or model lock-in — rebuild required', body: 'Vendor-locked embeddings or fine-tunes cannot be exported. Corpus must be re-embedded on GCP.', opts: 'Engage GCP ISO or partner to rebuild vector database on Vertex AI.' },
    groups: [{ label: 'Data portability', opts: ['Yes — source documents available, embeddings can be recreated', 'Partial — most documents portable, some vendor-specific indexes locked', 'No — significant vendor lock-in', 'Fine-tuned model — weights not exportable'] }]
  },
  {
    id: 'cur7', sec: 'current', n: 27, path: 'recreate', who: 'tech', disc: false, read: true,
    q: 'What is the preferred legacy migration pattern?',
    hint: 'Parallel runs reduce cutover risks but double infrastructure spend.',
    groups: [{ label: 'Migration approach', opts: ['Big bang cutover — switch all users at once on go-live', 'Parallel run — old and new run simultaneously, compare outputs', 'Phased by user group — roll out one team at a time', 'Shadow mode — new runs in background, outputs compared'] }]
  },
  {
    id: 'cur8', sec: 'current', n: 28, path: 'recreate', who: 'tech', disc: false, read: true,
    q: 'What is the fallback rollback plan if the GCP migration underperforms?',
    hint: 'Sponsors will not approve production go-live without a rollback plan.',
    blocker: { cond: 'No fallback plan defined', type: 'risk', title: 'No migration fallback plan', body: 'Without a documented rollback procedure, security and risk teams will block final go-live approvals.', opts: 'Define rollback trigger criteria and retain the old API endpoints on standby for 30 days.' },
    groups: [{ label: 'Rollback & recovery', opts: ['Keep old system live — rollback in hours if needed', 'Old system on standby — rollback in 1–3 days', 'Feature flags in place to reroute traffic to old system', 'No fallback plan defined'] }]
  },

  /* ── SECTION 6: TARGET ARCHITECTURE (6 questions) ── */
  {
    id: 'tgt1', sec: 'target', n: 29, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Which Gemini model is the best fit for this workload?',
    hint: 'Balances cost, reasoning complexity, and speed. GxP tasks benefit from 1.5 Pro.',
    groups: [{ label: 'GCP Gemini models', opts: ['Gemini 1.5 Pro — complex reasoning, long documents, 1M context', 'Gemini 1.5 Flash — fast, cost-efficient, most everyday tasks', 'Gemini 2.0 Flash — latest generation, best speed-quality balance', 'Gemini Ultra — highest capability, multi-step clinical reasoning'] }]
  },
  {
    id: 'tgt2', sec: 'target', n: 30, path: 'both', who: 'tech', disc: false, read: true,
    q: 'What target grounding approach is planned?',
    hint: 'Vertex AI Search simplifies retrieval GxP citations out of the box.',
    groups: [{ label: 'Grounding approach', opts: ['Vertex AI Search / Discovery Engine — managed grounding', 'Custom RAG pipeline (vector DB + Cloud Run)', 'BigQuery as grounding source (structured data)', 'Google Search grounding (public web)', 'No grounding required — model knowledge sufficient'] }]
  },
  {
    id: 'tgt4', sec: 'target', n: 31, path: 'both', who: 'tech', disc: false, read: true,
    q: 'What GCP compute and storage services are required?',
    hint: 'Maps the infrastructure build footprint and cost estimations.',
    multi: true,
    groups: [
      { label: 'Compute & serving', opts: ['Cloud Run', 'Google Kubernetes Engine (GKE)', 'Cloud Functions', 'Vertex AI Endpoints'] },
      { label: 'Data & storage', opts: ['BigQuery', 'Cloud Storage (GCS)', 'AlloyDB', 'Spanner'] }
    ]
  },
  {
    id: 'tgt5', sec: 'target', n: 32, path: 'both', who: 'tech', disc: false, read: true,
    q: 'What is the target end-to-end response latency requirement (P95)?',
    hint: 'Low-latency SLAs require pre-staged caching or lighter models.',
    blocker: { cond: 'Under 1 second (real-time conversational)', type: 'risk', title: 'Aggressive sub-second latency SLA', body: 'Sub-second latency demands highly optimized embedding caches and model routing structures.', opts: 'Prototype routing using Gemini 1.5 Flash and evaluate prompt caching.' },
    groups: [{ label: 'Latency requirement', opts: ['No latency SLA requirement — fully async', 'Minutes (batch is fine)', '10–60 seconds (async with progress indicator)', '1–3 seconds (acceptable for most UI interactions)', 'Under 1 second (real-time conversational)'] }]
  },
  {
    id: 'tgt6', sec: 'target', n: 33, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Do agents on GCP need to call legacy agents on other cloud platforms (A2A)?',
    hint: 'Multi-cloud handshakes require mTLS endpoints and custom supervisors.',
    blocker: { cond: 'Yes — required for production (GCP agent ↔ AWS Bedrock agent or Azure AI)', type: 'risk', title: 'A2A cross-cloud agent calls required', body: 'Cross-cloud agent handshakes add network latency, token format variances, and authentication complexities.', opts: 'Design OAuth2 endpoints and VPC HA VPN gateways first.' },
    groups: [{ label: 'Cross-cloud handshakes', opts: ['No legacy agent connections required — fully on GCP', 'Under evaluation', 'Yes — required for production (GCP agent ↔ AWS Bedrock agent or Azure AI)'] }]
  },
  {
    id: 'tgt7', sec: 'target', n: 34, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Is there a human-in-the-loop (HITL) requirement for AI outputs?',
    hint: 'Review queues must be designed into the orchestration state, not bolted on.',
    groups: [{ label: 'Human oversight', opts: ['All AI outputs must be reviewed before action (full human approval)', 'High-risk outputs reviewed, routine outputs automated', 'Human can override but AI acts by default', 'Fully autonomous — no human review needed'] }]
  },

  /* ── SECTION 7: DATA SOURCES (11 questions) ── */
  {
    id: 'dat1', sec: 'data', n: 35, path: 'both', who: 'tech', disc: false, read: true,
    q: 'List all data sources this use case requires.',
    hint: 'Every unmapped data silo becomes a connectivity bottleneck in week 3.',
    multi: true,
    groups: [
      { label: 'Data warehouses & lakes', opts: ['Snowflake (AWS-hosted)', 'Snowflake (Azure-hosted)', 'Snowflake (GCP-hosted)', 'Google BigQuery', 'Databricks'] },
      { label: 'File & document stores', opts: ['SharePoint / OneDrive (Azure)', 'AWS S3', 'Google Cloud Storage', 'On-prem file server', 'Veeva Vault (documents)'] }
    ]
  },
  {
    id: 'dat2', sec: 'data', n: 36, path: 'both', who: 'tech', disc: false, read: true,
    q: 'What data formats are involved? (select all that apply)',
    hint: 'Unstructured PDFs and medical images require specialized parsing pipelines.',
    multi: true,
    groups: [{ label: 'Data formats', opts: ['Structured SQL / relational tables', 'JSON / semi-structured', 'PDF documents', 'Word / Excel / PowerPoint files', 'DICOM / medical imaging', 'Audio / video files'] }]
  },
  {
    id: 'dat3', sec: 'data', n: 37, path: 'both', who: 'tech', disc: false, read: true,
    q: 'What is the estimated data volume and daily velocity?',
    hint: 'Streaming data requires Pub/Sub + Dataflow pipelines rather than standard batching.',
    groups: [
      { label: 'Total data size', opts: ['Under 10 GB total', '10–100 GB total', '100 GB – 1 TB total', '1–10 TB total', 'More than 10 TB total'] },
      { label: 'Daily new data', opts: ['Static / infrequent updates', 'Less than 1 GB/day new data', '1–10 GB/day', '10–100 GB/day', 'More than 100 GB/day real-time stream'] }
    ]
  },
  {
    id: 'dat4', sec: 'data', n: 38, path: 'both', who: 'tech', disc: false, read: true,
    q: 'What data freshness requirement applies to this use case?',
    hint: 'Overly strict real-time freshness scales pipeline costs significantly.',
    groups: [{ label: 'Freshness', opts: ['Daily batch acceptable', 'Static corpus — updated weekly or monthly', 'Hourly refresh', 'Near real-time — seconds to minutes', 'Real-time — under 1 second'] }]
  },
  {
    id: 'dat5', sec: 'data', n: 39, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Is there a labeled evaluation dataset available?',
    hint: 'Essential to establish objective model accuracy and GxP OQ compliance.',
    blocker: { cond: 'No — no evaluation dataset exists', type: 'start', title: 'No evaluation dataset available', body: 'Without a labeled golden dataset, there is no objective way to measure model accuracy or GxP compliance.', opts: 'Commission a human annotation sprint to compile 100 gold-standard QA pairs.' },
    groups: [{ label: 'Eval datasets', opts: ['Yes — labeled dataset exists, >100 examples', 'Yes — small eval set exists, <100 examples', 'Partial — reference outputs exist but not formally labeled', 'No — no evaluation dataset exists'] }]
  },
  {
    id: 'dat6', sec: 'data', n: 40, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Are there known data quality issues?',
    hint: 'Corrupt source data is the top reason for post-launch model hallucination.',
    blocker: { cond: 'Significant data quality issues documented', type: 'risk', title: 'Source data quality issues', body: 'Active data corruption or duplicates will degrade grounding accuracy and increase model hallucination.', opts: 'Inject an AlloyDB or BigQuery cleanup pipeline step before grounding.' },
    groups: [{ label: 'Data quality status', opts: ['No known issues — data is clean and structured', 'Minor issues documented — being addressed', 'Significant data quality issues documented', 'Unknown — data quality not assessed'] }]
  },
  {
    id: 'dat7', sec: 'data', n: 41, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Is the data schema / data dictionary documented for all sources?',
    hint: 'Undocumented source schemas add 2–3 weeks of reverse-engineering.',
    blocker: { cond: 'No — schemas not documented', type: 'risk', title: 'Undocumented data schemas', body: 'Building grounding pipelines against undocumented schemas forces manual reverse-engineering.', opts: 'Assign a data steward to document the relational tables in parallel.' },
    groups: [{ label: 'Schema documentation', opts: ['Yes — fully documented with data dictionary', 'Partially documented — some sources covered', 'No — schemas not documented'] }]
  },
  {
    id: 'dat8', sec: 'data', n: 42, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Is there a named data steward or data owner for each source?',
    hint: 'Without an owner, access requests will stall in procurement loops.',
    blocker: { cond: 'No — no named data ownership', type: 'start', title: 'No named data ownership', body: 'Without a named data steward, security credentials and access permissions will stall project kickoff.', opts: 'Identify a data owner for each source system before development begins.' },
    groups: [{ label: 'Data stewards', opts: ['Yes — named steward for each source', 'Partially — some sources have owners', 'No — no named data ownership'] }]
  },
  {
    id: 'dat9', sec: 'data', n: 43, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Are there regulatory restrictions on using this data for AI inference?',
    hint: 'Contractual exclusions on using specific clinical data may be showstoppers.',
    blocker: { cond: 'Yes — regulatory restrictions identified', type: 'fatal', title: 'Regulatory data restrictions', body: 'Exclusions or consent limits on using clinical data for LLM inference may legally block the use case.', opts: 'Initiate a formal legal review. Transition to synthetic or anonymized datasets if blocked.' },
    groups: [{ label: 'Legal exclusions', opts: ['No restrictions — cleared for AI use', 'Restrictions exist — approved for AI use with specific controls', 'Yes — regulatory restrictions identified', 'Unknown — not assessed'] }]
  },
  {
    id: 'dat10', sec: 'data', n: 44, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Does the source data contain sensitive PHI or PII?',
    hint: 'PHI triggers strict HIPAA VPC service controls and DLP redaction.',
    blocker: { cond: 'Yes — contains PHI (protected health information)', type: 'risk', title: 'Sensitive PHI data present', body: 'Protected health information triggers strict HIPAA compliance requirements and mandatory VPC-SC perimeters.', opts: 'Configure Sensitive Data Protection (DLP) scanners on the prompt ingestion pipeline.' },
    groups: [{ label: 'Sensitivity', opts: ['No sensitive data — fully anonymised or public', 'Yes — contains PII (personally identifiable information)', 'Yes — contains PHI (protected health information)'] }]
  },
  {
    id: 'dat11', sec: 'data', n: 45, path: 'both', who: 'tech', disc: false, read: true,
    q: 'What happens when a source system schema changes?',
    hint: 'Undetected schema drift silently breaks downstream grounding.',
    blocker: { cond: 'No process — schema changes break pipelines silently', type: 'risk', title: 'Lack of schema drift management', body: 'Undetected schema changes in source systems will break your vector databases and grounding pipelines silently.', opts: 'Deploy continuous schema validation schemas inside Vertex AI Pipelines.' },
    groups: [{ label: 'Schema drift management', opts: ['API versioning or schema freeze in place', 'Formal change notification process in place', 'No process — schema changes break pipelines silently'] }]
  },

  /* ── SECTION 8: CONNECTIVITY (8 questions) ── */
  {
    id: 'con1', sec: 'connectivity', n: 46, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Is a private connectivity path designed for all non-GCP sources?',
    hint: 'Mandatory for PHI. Data traversing the public internet is a compliance failure.',
    blocker: { cond: 'Not yet designed', type: 'start', title: 'Private connectivity not designed', body: 'Traversing PHI over the public internet violates HIPAA compliance and security standards.', opts: 'Design AWS PrivateLink to GCP Private Service Connect (PSC) connections immediately.' },
    groups: [{ label: 'Private path design', opts: ['Yes — all private paths designed and tested', 'Designed but not yet built', 'Not yet designed', 'Not applicable — all data already on GCP'] }]
  },
  {
    id: 'con2', sec: 'connectivity', n: 47, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Which connectivity options have been evaluated for cross-cloud transit?',
    hint: 'Direct dedicated interconnects have the lowest latency and highest security.',
    multi: true,
    groups: [{ label: 'Cross-cloud transit options', opts: ['GCP Private Service Connect (PSC)', 'AWS PrivateLink → GCP via VPN', 'Azure Private Endpoint → GCP via VPN', 'Google Dedicated Interconnect (on-prem)', 'Site-to-site IPSec VPN', 'Data replication to GCP (GCS/BigQuery)'] }]
  },
  {
    id: 'con3', sec: 'connectivity', n: 48, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Is a named network architect assigned to design and build connectivity?',
    hint: 'Cross-cloud networking requires dedicated engineering bandwidth.',
    blocker: { cond: 'No — no network owner assigned', type: 'start', title: 'No network architect assigned', body: 'Cross-cloud private routing is complex and requires dedicated network engineers. Without an owner, development will stall.', opts: 'Assign a named network architect from the Cloud Infrastructure team.' },
    groups: [{ label: 'Owner allocation', opts: ['Yes — named network architect assigned', 'In progress — assignment being arranged', 'No — no network owner assigned', 'Will use Google Proxy / partner support'] }]
  },
  {
    id: 'con4', sec: 'connectivity', n: 49, path: 'both', who: 'tech', disc: false, read: true,
    q: 'If Snowflake is a source: which tier is in use and is PrivateLink enabled?',
    hint: 'Snowflake PrivateLink requires Business Critical edition. Standard/Enterprise tiers cannot support it.',
    blocker: { cond: 'Standard or Enterprise tier — PrivateLink unavailable', type: 'fatal', title: 'Snowflake tier lacks PrivateLink support', body: 'Snowflake Standard and Enterprise tiers do not support secure PrivateLink connections.', opts: 'Upgrade Snowflake to Business Critical, or replicate required tables into BigQuery.' },
    groups: [{ label: 'Snowflake tiering', opts: ['Not applicable — no Snowflake in scope', 'Business Critical tier — PrivateLink enabled', 'Standard or Enterprise tier — PrivateLink unavailable', 'Unknown tier — needs assessment'] }]
  },
  {
    id: 'con5', sec: 'connectivity', n: 50, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Are firewall rules or proxy policies blocking GCP API access?',
    hint: 'Outbound proxy restrictions silently break Cloud SDK calls in development.',
    blocker: { cond: 'Yes — outbound restrictions block GCP API access', type: 'start', title: 'Firewall proxy blocking GCP APIs', body: 'Egress restrictions in corporate development environments block outbound calls to Vertex AI endpoints.', opts: 'Coordinate with corporate network security to whitelist required GCP endpoints.' },
    groups: [{ label: 'Firewalls & proxies', opts: ['No restrictions — cloud APIs fully accessible', 'Minor restrictions — whitelisting in progress', 'Yes — outbound restrictions block GCP API access', 'Unknown — not tested'] }]
  },
  {
    id: 'con6', sec: 'connectivity', n: 51, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Has cross-cloud network latency been measured?',
    hint: 'Ensures target sub-3s conversational SLAs can actually be achieved.',
    blocker: { cond: 'No — transit latency not measured', type: 'risk', title: 'Transit latency unmeasured', body: 'Unmeasured cross-cloud transit latency spikes can silently degrade UI responsiveness and SLA compliance.', opts: 'Perform ping/traceroute benchmark tests across cloud endpoints in Week 1.' },
    groups: [{ label: 'Latency validation', opts: ['Yes — measured and within acceptable conversational SLAs', 'Estimated but not measured', 'No — transit latency not measured'] }]
  },
  {
    id: 'con7', sec: 'connectivity', n: 52, path: 'both', who: 'tech', disc: false, read: true,
    q: 'What downstream systems receive output from this AI agent?',
    hint: 'Downstream integrations require custom API contracts and token handlers.',
    multi: true,
    groups: [{ label: 'Downstream destinations', opts: ['Salesforce / Veeva CRM', 'Epic / EHR system', 'SharePoint / document repository', 'REST API (internal downstream service)', 'Human review queue (ticketing, workflow)', 'No downstream integration — user sees output directly'] }]
  },
  {
    id: 'con8', sec: 'connectivity', n: 53, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Are downstream API contracts documented and sandbox credentials available?',
    hint: 'Downstream APIs block integration testing late in sprints.',
    blocker: { cond: 'No — downstream API sandboxes unavailable', type: 'risk', title: 'Missing downstream API sandboxes', body: 'Undocumented downstream APIs and missing sandbox credentials force reverse-engineering, delaying delivery.', opts: 'Request API contracts and sandbox tokens from downstream product owners.' },
    groups: [{ label: 'Integration sandbox', opts: ['Yes — API contracts documented, sandbox environments available', 'Partially documented — sandboxes in progress', 'No — downstream API sandboxes unavailable'] }]
  },

  /* ── SECTION 9: SECURITY & COMPLIANCE (5 questions) ── */
  {
    id: 'sec1', sec: 'security', n: 54, path: 'both', who: 'both', disc: false, read: true,
    q: 'Which regulatory frameworks apply to this use case?',
    hint: 'Drives continuous validation architectures and encryption keys.',
    multi: true,
    groups: [{ label: 'Compliance frameworks', opts: ['HIPAA / HITECH (US healthcare)', 'GDPR (EU personal data)', 'FDA GxP validation (21 CFR Part 11)', 'SOC 2 Type II', 'No regulated data applies'] }]
  },
  {
    id: 'sec3', sec: 'security', n: 55, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Is GxP validation (IQ/OQ/PQ) required and has it been scoped?',
    hint: 'Validation adds 8–12 weeks and requires a dedicated Quality validation specialist.',
    blocker: { cond: 'Yes — GxP validation required but not scoped', type: 'risk', title: 'GxP validation required but unscoped', body: 'Mandatory FDA IQ/OQ/PQ validation adds 8–12 weeks of documentation and requires dedicated validation SMEs.', opts: 'Engage a GxP validation engineer and prepare validation templates early.' },
    groups: [{ label: 'GxP validation', opts: ['Not GxP regulated', 'Yes — GxP validation required and fully scoped', 'Yes — GxP validation required but not scoped'] }]
  },
  {
    id: 'sec6', sec: 'security', n: 56, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Is CMEK (customer-managed encryption keys) required for data at rest?',
    hint: 'CMEK using Cloud KMS is commonly mandated by corporate security for PHI.',
    blocker: { cond: 'Yes — CMEK required but not configured', type: 'risk', title: 'CMEK encryption required but unscoped', body: 'PHI workloads require corporate security key controls. Unconfigured Cloud KMS CMEK keys block sandbox migrations.', opts: 'Provision Cloud KMS CMEK keys and bind them to target GCS and AlloyDB instances.' },
    groups: [{ label: 'Encryption keys (CMEK)', opts: ['No — Google-managed default encryption keys sufficient', 'Yes — CMEK required and fully configured (Cloud KMS)', 'Yes — CMEK required but not configured'] }]
  },
  {
    id: 'sec7', sec: 'security', n: 57, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Has the corporate security team reviewed the target GCP architecture?',
    hint: 'Late-stage security reviews are the top cause of production rollout blocks.',
    blocker: { cond: 'No — review not scheduled', type: 'risk', title: 'Corporate security review unscheduled', body: 'Failing to schedule corporate security reviews early will lead to last-minute architecture overrides.', opts: 'Schedule security architecture review in Week 1. Share VPC-SC and IAM topologies.' },
    groups: [{ label: 'Security review status', opts: ['Yes — target architecture approved and signed off', 'Review in progress / scheduled', 'No — review not scheduled'] }]
  },
  {
    id: 'sec8', sec: 'security', n: 58, path: 'both', who: 'both', disc: false, read: true,
    q: 'Is there a defined AI governance policy for output overrides?',
    hint: 'Governs who is authorized to override and approve contested agent answers.',
    blocker: { cond: 'No — no AI governance policy exists', type: 'risk', title: 'Missing AI governance policy', body: 'Unclear AI accountability chains and lack of output override procedures block corporate production sign-off.', opts: 'Draft an AI governance charter detailing human review oversight and escalation rules.' },
    groups: [{ label: 'AI governance', opts: ['Yes — formal AI governance policy and override process defined', 'Policy in development — draft exists', 'No — no AI governance policy exists'] }]
  },

  /* ── SECTION 10: TEAM (4 questions) ── */
  {
    id: 'tea1', sec: 'team', n: 59, path: 'both', who: 'both', disc: false, read: true,
    q: 'Are named engineers assigned with confirmed time allocation?',
    hint: 'Unnamed teams or fractional developers (<50% time) never start on schedule.',
    blocker: { cond: 'No — resources unassigned / unconfirmed', type: 'start', title: 'Engineering resources unconfirmed', body: 'Exploratory sandboxes without named engineers with dedicated time allocation will stall immediately.', opts: 'Secure named engineers with at least 50% dedicated time allocation before kickoff.' },
    groups: [{ label: 'Time allocations', opts: ['Yes — dedicated named engineers assigned (>50% time allocated)', 'Yes — named team assigned but <50% time (at risk)', 'No — resources unassigned / unconfirmed'] }]
  },
  {
    id: 'tea2', sec: 'team', n: 60, path: 'both', who: 'tech', disc: false, read: true,
    q: 'Has any team member deployed a production AI workload on Vertex AI or GCP?',
    hint: 'Platform experience gaps add training overheads.',
    blocker: { cond: 'No — zero production GCP AI experience on team', type: 'risk', title: 'No Vertex AI production experience', body: 'Teams without Vertex AI production experience consistently underestimate network VPC-SC and IAM complexity.', opts: 'Embed a certified Google FDE or partner engineer during the first two sprints.' },
    groups: [{ label: 'Vertex AI experience', opts: ['Yes — multiple team members with production Vertex AI experience', 'Yes — cloud AI experience (AWS/Azure) but net-new to GCP Vertex', 'No — zero production GCP AI experience on team'] }]
  },
  {
    id: 'tea4', sec: 'team', n: 61, path: 'both', who: 'both', disc: false, read: true,
    q: 'What is the target delivery model?',
    hint: 'Determines co-selling RACI alignments.',
    groups: [{ label: 'Delivery model', opts: ['Internal build only', 'System integrator / partner led', 'Internal team with embedded partner support', 'Joint delivery — defined RACI in place'] }]
  },
  {
    id: 'tea5', sec: 'team', n: 62, path: 'both', who: 'both', disc: false, read: true,
    q: 'Is a Google FDE or equivalent technical advisor actively engaged?',
    hint: 'Leverages platform expertise directly during architecture design.',
    blocker: { cond: 'No FDE / technical advisor engaged', type: 'risk', title: 'No technical advisor engaged', body: 'Operating without a Google FDE or expert technical advisor increases implementation risk for VPC-SC networking.', opts: 'Request FDE technical advisory support or secure partner co-selling advisory.' },
    groups: [{ label: 'Embedded Technical Advisor', opts: ['Yes — hands-on embedded Google FDE', 'Yes — advisory engagement (weekly office hours)', 'No FDE / technical advisor engaged'] }]
  },

  /* ── SECTION 11: SUSTAINABILITY & ROI (5 questions) ── */
  {
    id: 'sus1', sec: 'sustain', n: 63, path: 'both', who: 'biz', disc: true, read: false,
    q: 'What is the current monthly cost of this process (FTE + tooling)?',
    hint: 'Required baseline for time savings and operational payback calculations.',
    groups: [{ label: 'Process cost baseline', opts: ['Under $5,000/month', '$5,000–$20,000/month', '$20,000–$100,000/month', 'More than $100,000/month', 'Cannot estimate — no baseline tracked'] }]
  },
  {
    id: 'sus2', sec: 'sustain', n: 64, path: 'both', who: 'biz', disc: true, read: false,
    q: 'What is the realistic expected automation rate?',
    hint: 'Overly optimistic estimates without pilot data skew ROI modeling.',
    groups: [{ label: 'Target Automation Rate', opts: ['60–80% — backed by comparable industry case studies', '40–60% — based on process flow analysis', 'Under 40% — complex tasks with mandatory manual reviews', 'Over 80% — target expectation (high risk without pilot data)'] }]
  },
  {
    id: 'sus3', sec: 'sustain', n: 65, path: 'both', who: 'biz', disc: true, read: false,
    q: 'Are there clinical or strategic outcomes that can be quantified?',
    hint: 'Time-to-market trial acceleration outweighs direct FTE cost savings.',
    groups: [{ label: 'Strategic outcomes', opts: ['Faster regulatory submissions (revenue acceleration)', 'Reduced clinical trial timelines (patient impact)', 'Improved data quality (downstream cleanup savings)', 'Direct FTE time savings only — no strategic acceleration'] }]
  },
  {
    id: 'sus4', sec: 'sustain', n: 66, path: 'both', who: 'biz', disc: true, read: false,
    q: 'What is the acceptable payback period for this investment?',
    hint: 'A 24-month payback is a high risk if corporate roadmaps shift annually.',
    groups: [{ label: 'Payback expectations', opts: ['Under 6 months', '6–12 months', '12–24 months', 'ROI not primary driver — compliance/strategic mandate'] }]
  },
  {
    id: 'sus6', sec: 'sustain', n: 67, path: 'both', who: 'biz', disc: false, read: true,
    q: 'Is there a confirmed operational budget for Year 1 API costs?',
    hint: 'Failure to budget Year 1 inference costs blocks scaling after pilot.',
    blocker: { cond: 'No — Year 1 operational budget unconfirmed', type: 'risk', title: 'Year 1 operational budget unconfirmed', body: 'Deploying high-volume inference models without a confirmed Year 1 operations budget risks immediate project shutdown post-launch.', opts: 'Calculate Year 1 inference volumes and secure budget approval early.' },
    groups: [{ label: 'Operational Budget Confirmation', opts: ['Yes — dedicated operational budget approved', 'In progress — budget approval submitted', 'No — Year 1 operational budget unconfirmed'] }]
  }
];

const FACTUAL_IDS = [
  'ctx1', 'ctx2', 'ctx3', 'ctx5', 'ctx6', 
  'usr1', 'usr2', 'usr3', 
  'cur1', 'cur2', 'cur5', 'cur7', 
  'tgt1', 'tgt2', 'tgt4', 'tgt7', 
  'dat1', 'dat2', 'dat3', 'dat4', 
  'con2', 'con7', 
  'sec1', 
  'tea4', 
  'sus1'
];

const SECTION_MAP = {
  ctx: ['ctx1', 'ctx2', 'ctx3', 'ctx5', 'ctx6'],
  pain: ['pain1', 'pain2', 'pain3', 'pain4', 'pain5', 'pain6', 'pain7', 'pain8'],
  value: ['val1', 'val2', 'val3', 'val4'],
  users: ['usr1', 'usr2', 'usr3', 'usr4'],
  current: ['cur1', 'cur2', 'cur4', 'cur5', 'cur6', 'cur7', 'cur8'],
  target: ['tgt1', 'tgt2', 'tgt4', 'tgt5', 'tgt6', 'tgt7'],
  data: ['dat1', 'dat2', 'dat3', 'dat4', 'dat5', 'dat6', 'dat7', 'dat8', 'dat9', 'dat10', 'dat11'],
  connectivity: ['con1', 'con2', 'con3', 'con4', 'con5', 'con6', 'con7', 'con8'],
  security: ['sec1', 'sec3', 'sec6', 'sec7', 'sec8'],
  team: ['tea1', 'tea2', 'tea4', 'tea5'],
  sustain: ['sus1', 'sus2', 'sus3', 'sus4', 'sus6'],
};

export default function AgenticDiscoveryV7({ viewMode, onViewModeChange, activeSessionId, onSessionIdChange, onGenerateReport }) {
  const [activeRawResponse, setActiveRawResponse] = useState(null);
  const [savedSessions, setSavedSessions] = useState([]);
  const [state, setState] = useState({});
  const [currentPath, setCurrentPath] = useState('both');

  const [sessionNameInput, setSessionNameInput] = useState('');
  const [isJumpMenuOpen, setIsJumpMenuOpen] = useState(false);
  const [drawIoTargetXml, setDrawIoTargetXml] = useState(null);

  // Master two-tiered report routing states (Parity with V6!)
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState('strategic');
  const [isDrawIoOpen, setIsDrawIoOpen] = useState(false);

  // Financial sliders state (Parity with V6!)
  const [roiFteScale, setRoiFteScale] = useState(11000);
  const [roiFteCount, setRoiFteCount] = useState(12);
  const [roiHoursPerWeek, setRoiHoursPerWeek] = useState(8);
  const [roiHourlyRate, setRoiHourlyRate] = useState(85);
  const [roiAutomationRate, setRoiAutomationRate] = useState(65);

  const viewSubMode = viewMode === 'report' ? 'report' : 'questions';
  const setViewSubMode = (mode) => {
    if (onViewModeChange) {
      onViewModeChange(mode === 'report' ? 'report' : 'home');
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gemini_intake_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        const v7Sessions = parsed.filter(s => s && s.framework === 'option7');
        setSavedSessions(v7Sessions);
      }
    } catch (e) {}
  }, [activeSessionId]);

  // Stateful activeSessionId prop synchronization effect (Parity with V6!)
  useEffect(() => {
    if (activeSessionId) {
      try {
        const stored = localStorage.getItem('gemini_intake_sessions');
        if (stored) {
          const parsed = JSON.parse(stored);
          const session = parsed.find(s => s && s.id === activeSessionId);
          if (session) {
            setSessionNameInput(session.reportName || session.name || '');
            setCurrentPath(session.path || 'both');
            setState(session.state || {});
            setDrawIoTargetXml(session.drawIoTargetXml || null);
            setActiveRawResponse(session.rawResponse || null);
            if (session.state) {
              // Sync the FTE model sliders statefully if saved
              const headcount = session.state['pain3']?.selectedOptions?.[0];
              if (headcount) {
                setRoiFteCount(headcount.includes('More than 10') ? 15 : 8);
              }
            }
          }
        }
      } catch (e) {}
    } else {
      // Reset state for new greenfield discovery assessments!
      setState({});
      setSessionNameInput('');
      setDrawIoTargetXml(null);
      setActiveRawResponse(null);
      setCurrentPath('both');
    }
  }, [activeSessionId]);

  const handleSelectOpt = (qId, val, isMulti) => {
    const currentItem = state[qId] || { comments: '', selectedOptions: [] };
    let next;
    if (isMulti) {
      const arr = currentItem.selectedOptions || [];
      next = arr.includes(val) ? arr.filter(i => i !== val) : [...arr, val];
    } else {
      next = currentItem.selectedOptions?.includes(val) ? [] : [val];
    }
    setState(prev => ({ ...prev, [qId]: { ...currentItem, selectedOptions: next } }));
  };

  const scoreQ = (id) => {
    const q = QUESTIONS.find(x => x.id === id);
    const stateItem = state[id];
    if (!stateItem) return null;
    
    const isFactual = FACTUAL_IDS.includes(id);
    if (isFactual) return 1.0;

    if (q.blocker) {
      const matchesBlockerOption = stateItem.selectedOptions?.includes(q.blocker.cond);
      if (matchesBlockerOption) {
        return q.blocker.type === 'fatal' ? 0.05 : q.blocker.type === 'start' ? 0.15 : 0.35;
      }
    }

    if (stateItem.selectedOptions && stateItem.selectedOptions.length > 0 && q.groups && q.groups.length > 0) {
      const optIndex = q.groups[0].opts.indexOf(stateItem.selectedOptions[0]);
      if (optIndex === 0) return 0.95;
      if (optIndex === 1) return 0.80;
      if (optIndex === 2) return 0.65;
      return 0.40;
    }
    return 0.50;
  };

  const scoreSec = (secId) => {
    const ids = SECTION_MAP[secId] || [];
    const applicable = ids.filter(id => {
      const q = QUESTIONS.find(x => x.id === id);
      if (q?.path === 'recreate' && currentPath === 'build') return false;
      return true;
    });
    let total = 0, count = 0;
    applicable.forEach(id => {
      const s = scoreQ(id);
      if (s !== null) {
        total += s;
        count++;
      }
    });
    return count > 0 ? Math.round((total / count) * 100) : 0;
  };

  const calcDiscovery = () => {
    const pain = scoreSec('pain'), value = scoreSec('value'), users = scoreSec('users'), ctx = scoreSec('ctx'), sustain = scoreSec('sustain');
    return Math.round(pain * .30 + value * .25 + users * .20 + ctx * .10 + sustain * .15);
  };

  const calcReadiness = () => {
    const data = scoreSec('data'), conn = scoreSec('connectivity'), tgt = scoreSec('target'), sec = scoreSec('security'), team = scoreSec('team');
    return Math.round(data * .25 + conn * .25 + tgt * .20 + sec * .20 + team * .10);
  };

  // Helper variables declared statefully (Hoisted safely!)
  const scoreSecPainVal = scoreSec('pain');
  const scoreSecValVal = scoreSec('value');
  const scoreSecDataVal = scoreSec('data');
  const scoreSecTgtVal = scoreSec('target');
  const scoreSecSecVal = scoreSec('security');
  const scoreSecConnVal = scoreSec('connectivity');
  const scoreSecTeamVal = scoreSec('team');
  const scoreSecSustVal = scoreSec('sustain');

  const pStrategicVal = Math.round(scoreSecValVal * 0.6 + scoreSecPainVal * 0.4) / 20;
  const pDataReadiness = scoreSecDataVal / 20;
  const pArchitecture = scoreSecTgtVal / 20;
  const pSecurityGovern = Math.round(scoreSecSecVal * 0.7 + scoreSecConnVal * 0.3) / 20;
  const pExecutionEval = Math.round(scoreSecTeamVal * 0.5 + scoreSecSustVal * 0.5) / 20;

  const discScore = calcDiscovery();
  const readScore = calcReadiness();
  
  const countAnswered = () => {
    return QUESTIONS.filter(q => {
      if (q.path === 'recreate' && currentPath === 'build') return false;
      const item = state[q.id];
      if (!item) return false;
      return (item.selectedOptions && item.selectedOptions.length > 0) || (item.comments && item.comments.trim().length > 0);
    }).length;
  };

  const totalApplicable = () => {
    return QUESTIONS.filter(q => !(q.path === 'recreate' && currentPath === 'build')).length;
  };

  const answeredCount = countAnswered();
  const applicableCount = totalApplicable();

  const getVerdictHTML = (score, type) => {
    if (score === 0) return { text: '—', bg: 'var(--paper2)', color: 'var(--ink4)' };
    if (score >= 70) return { text: type === 'disc' ? 'High priority' : 'Ready', bg: 'var(--green-ll)', color: 'var(--green)' };
    if (score >= 45) return { text: type === 'disc' ? 'Medium' : 'Conditional', bg: 'var(--amber-ll)', color: 'var(--amber)' };
    return { text: type === 'disc' ? 'Low priority' : 'Blockers', bg: 'var(--red-ll)', color: 'var(--red)' };
  };

  const getBlockerCounts = () => {
    let fatal = 0, start = 0, risk = 0;
    QUESTIONS.forEach(q => {
      if (q.path === 'recreate' && currentPath === 'build') return;
      const item = state[q.id];
      if (!item) return;
      const isTriggered = item.selectedOptions?.includes(q.blocker?.cond);
      if (isTriggered && q.blocker) {
        if (q.blocker.type === 'fatal') fatal++;
        else if (q.blocker.type === 'start') start++;
        else risk++;
      }
    });
    return { fatal, start, risk };
  };

  const { fatal: cntFatal, start: cntStart, risk: cntRisk } = getBlockerCounts();

  const handleSetPath = (p) => {
    setCurrentPath(p);
  };

  const handleAutofillV7 = () => {
    const autofilledState = {};
    
    // Randomly select one of three highly realistic Merck HCLS use cases
    const useCases = [
      {
        name: 'Clinical Trial Dossier Semantic QA Assistant',
        vertical: 'Clinical operations',
        desc: 'Automate regulatory dossier summaries and clinical trial Q&A for Merck study coordinators.'
      },
      {
        name: 'Drug Safety FAERS Signal Detection Agent',
        vertical: 'Pharmacovigilance',
        desc: 'Real-time ingestion and side-effect trend analysis on FAERS XML feeds.'
      },
      {
        name: 'Commercial Product Brand Manager Dashboard',
        vertical: 'Medical affairs',
        desc: 'Grounding marketing content against FDA labeling packages for brand compliance.'
      }
    ];
    
    const uCase = useCases[Math.floor(Math.random() * useCases.length)];
    const path = Math.random() > 0.5 ? 'build' : 'recreate';
    setCurrentPath(path);

    // Seed dynamic, randomized, and highly logical selections
    QUESTIONS.forEach(q => {
      if (q.path === 'recreate' && path === 'build') return;

      // Default options prefill
      let opts = [];
      let comment = `Merck ${q.sec.toUpperCase()} verified parameters.`;

      if (q.id === 'ctx1') {
        opts = [uCase.desc.includes('dossier') ? q.groups[0].opts[1] : q.groups[0].opts[0]];
        comment = uCase.name;
      } else if (q.id === 'ctx2') {
        opts = [q.groups[0].opts.includes(uCase.vertical) ? uCase.vertical : q.groups[0].opts[0]];
        comment = uCase.vertical;
      } else if (q.id === 'ctx3') {
        opts = [path === 'build' ? q.groups[0].opts[0] : q.groups[0].opts[1]];
      } else if (q.groups && q.groups.length > 0) {
        const g = q.groups[0];
        
        // Dynamic logical randomizer:
        // - 70% chance of premium/positive answer (opts[0])
        // - 20% chance of warning/conditional answer (opts[1] or opts[2])
        // - 10% chance of triggering a blocker if present
        const rand = Math.random();
        if (q.blocker && rand < 0.12) {
          opts = [q.blocker.cond];
          comment = `⚠️ Flagged constraints: ${q.blocker.title}. Scoping workaround under review.`;
        } else if (rand < 0.75) {
          opts = [g.opts[0]];
          comment = `Cleared - aligned to Google Cloud best practices.`;
        } else {
          const fallbackIdx = Math.min(g.opts.length - 1, g.opts.indexOf(q.blocker?.cond) !== -1 ? 0 : 1);
          opts = [g.opts[fallbackIdx]];
          comment = `Minor scoping warning - requires Week 1 alignment review.`;
        }
      }

      autofilledState[q.id] = {
        comments: comment,
        selectedOptions: opts
      };
    });

    setState(autofilledState);
    alert(`🪄 Dynamic Scoping Prefilled successfully!\nUse Case: "${uCase.name}" (${path === 'build' ? 'Greenfield' : 'Migration'})`);
  };

  const handleChapterClick = (secId) => {
    if (viewSubMode !== 'questions') {
      setViewSubMode('questions');
      setTimeout(() => {
        const target = document.getElementById('sec-' + secId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      const target = document.getElementById('sec-' + secId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSaveSession = () => {
    const name = sessionNameInput.trim() || state['ctx1']?.comments || `V7 Assessment - ${new Date().toLocaleDateString()}`;
    
    const newSession = {
      id: activeSessionId || `v7_sess_${Date.now()}`,
      reportName: name,
      timestamp: new Date().toISOString(),
      currentVersion: 'v1.0',
      status: 'Completed',
      health: 'Green',
      generationTime: '0.6s',
      framework: 'option7',
      path: currentPath,
      state,
      drawIoTargetXml,
      scores: { discovery: discScore, readiness: readScore },
      versions: []
    };

    let corporateSessions = [];
    try {
      const stored = localStorage.getItem('gemini_intake_sessions');
      if (stored) corporateSessions = JSON.parse(stored);
    } catch (e) {}

    let updatedCorporate;
    const exists = corporateSessions.some(s => s && s.id === newSession.id);
    if (exists) {
      updatedCorporate = corporateSessions.map(s => (s && s.id === newSession.id) ? newSession : s);
    } else {
      updatedCorporate = [newSession, ...corporateSessions];
    }

    setSavedSessions(updatedCorporate.filter(s => s && s.framework === 'option7'));
    localStorage.setItem('gemini_intake_sessions', JSON.stringify(updatedCorporate));
    
    if (onSessionIdChange) {
      onSessionIdChange(newSession.id);
    }
    alert(`💾 Session "${name}" successfully saved & unified with corporate portfolio!`);
  };

  const handleLoadSession = (sess) => {
    if (onSessionIdChange) {
      onSessionIdChange(sess.id);
    }
    alert(`📂 Session "${sess.name}" successfully loaded!`);
  };

  const handleResetSession = () => {
    if (window.confirm('Are you sure you want to clear current inputs & start a new assessment?')) {
      setState({});
      setSessionNameInput('');
      setDrawIoTargetXml(null);
      setActiveRawResponse(null);
      if (onSessionIdChange) {
        onSessionIdChange(null);
      }
    }
  };

  // --- Dynamic Executive Rationale Generator (100% Real-Time & State-Reactive!) ---
  const generateDynamicRationale = () => {
    const name = state['ctx1']?.comments || "Agentic AI Scoping";
    const vertical = state['ctx2']?.selectedOptions?.[0] || "HCLS clinical trials";
    const isGreenfield = currentPath === 'build';
    
    let intro = `Merck's initiative, "${name}", is a ${isGreenfield ? 'greenfield build' : 'legacy migration'} optimized for the ${vertical} sub-vertical. `;
    
    let strengthsText = "";
    if (state['tgt1']?.selectedOptions?.[0]?.includes('1.5 Pro')) {
      strengthsText += "Leveraging Gemini 1.5 Pro's 1M context window enables the ingestion of raw clinical dossiers without complex chunking pipelines. ";
    }
    if (state['tea1']?.selectedOptions?.[0]?.includes('Yes')) {
      strengthsText += "The commitment of a dedicated named engineering team with >50% bandwidth reduces execution risk. ";
    }
    if (strengthsText === "") {
      strengthsText = "The use case represents a valuable AI prototype with foundational HCLS parameters mapped. ";
    }
    
    let constraintsText = "";
    if (nvBlockers.length > 0) {
      constraintsText += `However, the assessment has triggered ${nvBlockers.length} active blockers. `;
      
      const fatalBlocker = nvBlockers.find(b => b.title.includes('FATAL'));
      if (fatalBlocker) {
        constraintsText += `Specifically, the "${fatalBlocker.title}" poses an immediate architecture risk that must be cleared. `;
      }
      
      if (state['con4']?.selectedOptions?.[0]?.includes('Standard or Enterprise')) {
        constraintsText += "The standard Snowflake tier lacks AWS PrivateLink transit perimeters, mandating an infrastructure upgrade or a BigQuery data replication pipeline. ";
      }
      
      if (state['sec3']?.selectedOptions?.[0]?.includes('Yes') && state['sec3']?.selectedOptions?.[0]?.includes('not scoped')) {
        constraintsText += "Since GxP regulations apply, GxP validation is a critical timeline constraint that must not be delayed. ";
      }
    } else {
      constraintsText += "The due diligence assessment indicates zero active blockers, establishing a clear technical path. ";
    }
    
    let conclusion = `Currently holding an overall suitability rating of ${((readScore / 20)).toFixed(1)} / 5.0, aligning this platform to GCP Native security landing zones in Sprint 0 will safely accelerate production release schedules.`;
    
    return `${intro}${strengthsText}${constraintsText}${conclusion}`;
  };

  // --- Widescreen Offline Excel/CSV Sync Engine (PSO-PRINCIPAL Premium!) ---
  const downloadAssessmentAsCSV = () => {
    const name = sessionNameInput.trim() || `Merck_Agentic_Scoping_${activeSessionId || Date.now()}`;
    
    // Compile CSV Headers
    let csvContent = "Question ID,Question Number,Scoping Pillar,Question Text,All Available Options,Your Selections,Meeting Comments & Notes\n";
    
    QUESTIONS.forEach(q => {
      if (q.path === 'recreate' && currentPath === 'build') return;
      const item = state[q.id] || { selectedOptions: [], comments: "" };
      
      // Flatten all available choices for reference
      let allOptsList = [];
      if (q.groups && q.groups.length > 0) {
        q.groups.forEach(g => {
          allOptsList = [...allOptsList, ...g.opts];
        });
      }
      
      // Sanitize cell values to handle commas and quotes correctly (Standard RFC 4180)
      const cleanVal = (val) => {
        if (!val) return '""';
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      };
      
      const row = [
        q.id,
        q.n,
        q.sec.toUpperCase(),
        cleanVal(q.q),
        cleanVal(allOptsList.join('; ')),
        cleanVal(item.selectedOptions?.join('; ')),
        cleanVal(item.comments)
      ];
      
      csvContent += row.join(",") + "\n";
    });
    
    // Trigger browser file download via pure JS Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result;
        const lines = csvText.split("\n");
        const updatedState = { ...state };
        
        // Skip header line
        for (let idx = 1; idx < lines.length; idx++) {
          const line = lines[idx].trim();
          if (!line) continue;
          
          // Custom RFC 4180 CSV Splitter to parse comma-separated fields wrapped inside double-quotes correctly!
          const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
          const cells = matches.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"'));
          
          if (cells.length < 6) continue;
          
          const qId = cells[0]?.trim();
          const rawSelections = cells[5]?.trim();
          const rawComments = cells[6]?.trim();
          
          if (qId && QUESTIONS.some(q => q.id === qId)) {
            const selections = rawSelections ? rawSelections.split(';').map(s => s.trim()).filter(s => s.length > 0) : [];
            updatedState[qId] = {
              selectedOptions: selections,
              comments: rawComments || ""
            };
          }
        }
        
        // Apply loaded state dynamically, instantly triggering score & report recalculation!
        setState(updatedState);
        alert("📥 Scoping Sheet CSV parsed & imported successfully! Suitability scores and executive report compiled in real-time.");
      } catch (err) {
        console.error("CSV Import failed:", err);
        alert("❌ CSV parsing failure. Please ensure the sheet is saved in Comma-Separated Values (.csv) format.");
      }
    };
    reader.readAsText(file);
  };

  // --- Consultative Narrative Generator (§7.5 Symmetrical to V6!) ---
  const getNarrativeContent = () => {
    const whatsGood = [];
    const blockersAndGaps = [];
    const recommendations = [];

    if (state['tgt1']?.selectedOptions?.[0]?.includes('1.5 Pro')) {
      whatsGood.push({
        sec: 'target',
        title: 'Enterprise Reasoning Model',
        desc: 'Gemini 1.5 Pro selected, unlocking the industry-leading 1M token context window and eliminating complex document chunking.'
      });
    }
    if (state['con1']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        sec: 'connectivity',
        title: 'Secure Transit Path',
        desc: 'Private cross-cloud connectivity successfully designed and validated for transit. Traverses no public internet perimeters.'
      });
    }
    if (state['sec7']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        sec: 'security',
        title: 'Aligned Security Gate',
        desc: 'Corporate security architecture review completed and target GCP VPC-SC landing zone approved.'
      });
    }
    if (state['tea1']?.selectedOptions?.[0]?.includes('Yes')) {
      whatsGood.push({
        sec: 'team',
        title: 'Resource Commitments Secured',
        desc: 'Named engineering team confirmed with >50% dedicated bandwidth, preventing sprint kick-off resource delays.'
      });
    }

    QUESTIONS.forEach(q => {
      if (q.path === 'recreate' && currentPath === 'build') return;
      const item = state[q.id];
      if (!item || !item.selectedOptions?.[0]) return;

      const selText = item.selectedOptions[0];

      // 1. Evaluate Blockers & Roadblocks
      const isTriggered = q.blocker && item.selectedOptions.includes(q.blocker.cond);
      if (isTriggered && (q.blocker.type === 'fatal' || q.blocker.type === 'start')) {
        blockersAndGaps.push({
          sec: q.sec,
          title: `${q.blocker.type.toUpperCase()} BLOCKER: ${q.blocker.title}`,
          desc: q.blocker.body || `Mitigate identified risk on ${q.title}: ${selText}`,
          opts: q.blocker.opts
        });
      }

      // 2. Evaluate Dynamic Scoping Strengths
      if (!isTriggered && (selText.includes('Yes') || selText.includes('Ready') || selText.includes('Pro') || selText.includes('Dedicated') || selText.includes('High'))) {
        if (!whatsGood.some(wg => wg.title.includes(q.title))) {
          whatsGood.push({
            sec: q.sec,
            title: `VERIFIED ASSET: ${q.title}`,
            desc: `Confirmed operational capability: "${selText}" verified within active cloud landing zone.`
          });
        }
      }

      // 3. Evaluate Dynamic Remediation Strategies
      if (selText.includes('No') || selText.includes('Partial') || selText.includes('Not scoped') || selText.includes('Legacy') || selText.includes('Low') || selText.includes('Not yet')) {
        if (!recommendations.some(rc => rc.title.includes(q.title))) {
          recommendations.push({
            sec: q.sec,
            title: `REMEDIATION TARGET: ${q.title}`,
            desc: `Standardize target architecture for "${selText}" via automated Google Cloud Professional Services engineering roadmaps.`
          });
        }
      }
    });

    if (whatsGood.length === 0) {
      whatsGood.push({
        sec: 'ctx',
        title: 'Strategic AI Alignment',
        desc: 'Use case parameters mapped successfully inside HCLS compliance perimeters.'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        sec: 'target',
        title: 'Proceed to Technical Architecture Design',
        desc: 'Remediation logs are clear. Draft target GCS and Cloud Run Terraform landing zones in Sprint 0.'
      });
    }

    return { whatsGood, blockersAndGaps, recommendations };
  };

  const { whatsGood: nvGood, blockersAndGaps: nvBlockers, recommendations: nvRecs } = getNarrativeContent();

  // --- Consultative Pillars Synthesizer (§7.6 Eliminates the Laundry List!) ---
  const getSynthesizedPillars = () => {
    const activeBlockers = [];
    QUESTIONS.forEach(q => {
      if (q.path === 'recreate' && currentPath === 'build') return;
      const item = state[q.id];
      if (!item) return;
      const isTriggered = item.selectedOptions?.includes(q.blocker?.cond);
      if (isTriggered && q.blocker) {
        activeBlockers.push({ ...q.blocker, qId: q.id, qSec: q.sec });
      }
    });

    const pillars = [
      {
        id: 'data',
        label: 'Data Sovereignty & Quality Audits',
        icon: '🛡️',
        color: 'var(--google-blue)',
        desc: 'Source schema catalogs, clinical trial data ownership, HIPAA consent limits, and gold-standard accuracy evaluation datasets.',
        blockers: activeBlockers.filter(b => b.qSec === 'data' || b.qSec === 'current'),
        remediation: 'Establish a named clinical Data Steward, initiate consent compliance review, and commission a human annotation sprint in Week 1 to compile a gold-standard eval dataset.'
      },
      {
        id: 'network',
        label: 'Hybrid Network Security & Connectivity',
        icon: '🌐',
        color: 'var(--google-green)',
        desc: 'Cross-cloud transit perimeters, Snowflake PrivateLink editions, egress proxy proxies, and downstream API sandbox integrations.',
        blockers: activeBlockers.filter(b => b.qSec === 'connectivity' || b.qSec === 'target'),
        remediation: 'Assign a dedicated Network Architect to provision GCP Private Service Connect (PSC) endpoints to route Snowflake Business Critical / S3 buckets securely inside VPC perimeters.'
      },
      {
        id: 'security',
        label: 'Regulatory Hardening & AI Governance',
        icon: '⚖️',
        color: 'var(--google-purple)',
        desc: 'FDA GxP IQ/OQ/PQ continuous validations, customer-managed encryption keys (CMEK), security reviews, and override authority boards.',
        blockers: activeBlockers.filter(b => b.qSec === 'security' || b.qSec === 'sustain'),
        remediation: 'Engage a GxP FDA validation specialist in parallel with early design, provision Cloud KMS CMEK keys on AlloyDB, and schedule corporate security architecture review in Week 1.'
      },
      {
        id: 'resources',
        label: 'Resource Commitments & Platform Skillsets',
        icon: '👥',
        color: 'var(--google-amber)',
        desc: 'Named developer time allocations, Vertex AI platform experience gaps, and RACI delivery RACI matrices.',
        blockers: activeBlockers.filter(b => b.qSec === 'team'),
        remediation: 'Secure named engineers with at least 50% dedicated allocation prior to kickoff. Embed a certified partner SME or Google PSO advisor to accelerate the early infrastructure setup.'
      }
    ];

    return pillars;
  };

  const synthesizedPillars = getSynthesizedPillars();

  // --- Stateful Assessment Report HTML Builders ---
  const nextStepsList = [];
  QUESTIONS.forEach(q => {
    if (q.path === 'recreate' && currentPath === 'build') return;
    const item = state[q.id];
    if (!item) return;
    const isTriggered = item.selectedOptions?.includes(q.blocker?.cond);
    if (isTriggered && q.blocker && q.blocker.type === 'fatal') {
      nextStepsList.push({
        title: `[Fatal] ${q.blocker.title}`,
        desc: q.blocker.opts,
        owner: 'Assign before all other work',
        timeline: 'Immediate',
        tags: ['Fatal blocker']
      });
    }
  });
  QUESTIONS.forEach(q => {
    if (q.path === 'recreate' && currentPath === 'build') return;
    const item = state[q.id];
    if (!item) return;
    const isTriggered = item.selectedOptions?.includes(q.blocker?.cond);
    if (isTriggered && q.blocker && q.blocker.type === 'start') {
      nextStepsList.push({
        title: `[Start blocker] ${q.blocker.title}`,
        desc: q.blocker.opts,
        owner: 'Resolve before sprint 1',
        timeline: 'Weeks 1-3',
        tags: ['Start blocker']
      });
    }
  });
  if (nextStepsList.length < 4) {
    nextStepsList.push({
      title: 'Sprint 0: Ingestion & Grounding Corpus Setup',
      desc: 'Provision secure Cloud Storage buckets, parse and index GxP regulatory dossiers, and configure Vertex AI Search grounding perimeters.',
      owner: 'Joint Delivery (Customer + FDE)',
      timeline: 'Week 1-2',
      tags: ['Grounding', 'Sprint 0']
    });
    nextStepsList.push({
      title: 'Sprint 1: Custom Agent Orchestration & UI',
      desc: 'Build and deploy conversational supervisor agents (using LangGraph or Google Agent Builder) and host UI wrappers securely on Cloud Run.',
      owner: 'GCP Partner / FDE Team',
      timeline: 'Week 3-4',
      tags: ['Agent Build', 'Sprint 1']
    });
    nextStepsList.push({
      title: 'Sprint 2: VPC-SC Security Hardening & DLP Integration',
      desc: 'Lock down Vertex AI endpoints inside secure VPC Service Controls (VPC-SC) perimeters and deploy DLP prompt redaction gates.',
      owner: 'Infrastructure Security Team',
      timeline: 'Week 5-6',
      tags: ['Security', 'Sprint 2']
    });
    nextStepsList.push({
      title: 'Sprint 3: Continuous Evaluation & FDA GxP IQ/OQ Validation',
      desc: 'Compile a golden dataset of 100+ QA clinical pairs, run model quality benchmarks, and document IQ/OQ regulatory proof binders.',
      owner: 'Quality Assurance SME',
      timeline: 'Week 7-8',
      tags: ['Validation', 'Sprint 3']
    });
  }
  QUESTIONS.forEach(q => {
    if (q.path === 'recreate' && currentPath === 'build') return;
    const item = state[q.id];
    if (!item) return;
    const isTriggered = item.selectedOptions?.includes(q.blocker?.cond);
    if (isTriggered && q.blocker && q.blocker.type === 'risk') {
      nextStepsList.push({
        title: q.blocker.title,
        desc: q.blocker.opts,
        owner: 'Before production',
        timeline: 'Sprint planning',
        tags: ['Risk']
      });
    }
  });
  const finalSteps = nextStepsList.slice(0, 6);

  const nextStepsListHtml = (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', marginBottom: '20px', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.45rem' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 850, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--google-blue)', marginBottom: '3px' }}>
            🎯 Actionable Implementation & Rollout Timeline
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>Phased engineering sprints and compliance audits compiled chronologically for build kickoff.</p>
        </div>
        <span style={{ fontSize: '9.5px', fontWeight: 750, background: 'rgba(66,133,244,0.1)', color: 'var(--google-blue)', padding: '2px 8px', borderRadius: '20px' }}>
          8-Week Rollout Plan
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '8.5px', fontWeight: 800, background: 'var(--google-blue)', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>PHASE 0</span>
            <span style={{ fontSize: '8.5px', color: 'var(--text-secondary)', fontWeight: 700 }}>Weeks 1-2</span>
          </div>
          <strong style={{ fontSize: '11.5px', color: '#fff', display: 'block', marginBottom: '4px' }}>Ingestion & Grounding</strong>
          <p style={{ fontSize: '10.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>Provision Cloud Storage, index Hx clinical dossiers, and configure Vertex AI Search grounding.</p>
          <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '8px', paddingTop: '4px', fontSize: '9.5px', color: 'var(--text-primary)', fontWeight: 700 }}>
            Owner: Joint Delivery / PSO
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '8.5px', fontWeight: 800, background: 'var(--google-purple)', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>PHASE 1</span>
            <span style={{ fontSize: '8.5px', color: 'var(--text-secondary)', fontWeight: 700 }}>Weeks 3-4</span>
          </div>
          <strong style={{ fontSize: '11.5px', color: '#fff', display: 'block', marginBottom: '4px' }}>Agent & UI Build</strong>
          <p style={{ fontSize: '10.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>Code stateful LangGraph supervisor agent orchestrations and host UI wrappers securely on Cloud Run.</p>
          <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '8px', paddingTop: '4px', fontSize: '9.5px', color: 'var(--text-primary)', fontWeight: 700 }}>
            Owner: GCP Partner Team
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '8.5px', fontWeight: 800, background: 'var(--google-green)', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>PHASE 2</span>
            <span style={{ fontSize: '8.5px', color: 'var(--text-secondary)', fontWeight: 700 }}>Weeks 5-6</span>
          </div>
          <strong style={{ fontSize: '11.5px', color: '#fff', display: 'block', marginBottom: '4px' }}>Security & DLP Gates</strong>
          <p style={{ fontSize: '10.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>Lock perimeters inside VPC Service Controls (VPC-SC) and configure KMS CMEK encryption keys.</p>
          <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '8px', paddingTop: '4px', fontSize: '9.5px', color: 'var(--text-primary)', fontWeight: 700 }}>
            Owner: Security Architect
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '8.5px', fontWeight: 800, background: 'var(--google-amber)', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>PHASE 3</span>
            <span style={{ fontSize: '8.5px', color: 'var(--text-secondary)', fontWeight: 700 }}>Weeks 7-8</span>
          </div>
          <strong style={{ fontSize: '11.5px', color: '#fff', display: 'block', marginBottom: '4px' }}>Evaluations & GxP</strong>
          <p style={{ fontSize: '10.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>Compile golden dataset accuracy evaluations and document validation binders for QA sign-off.</p>
          <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '8px', paddingTop: '4px', fontSize: '9.5px', color: 'var(--text-primary)', fontWeight: 700 }}>
            Owner: Quality Specialist
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="v7-shell" style={{ display: 'block', width: '100%', minHeight: 'calc(100vh - 110px)', background: 'var(--bg-primary)', color: 'var(--text-primary)', boxSizing: 'border-box' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .v7-shell {
          padding: 0;
          box-sizing: border-box;
        }
        .v7-main {
          min-width: 0;
          background: var(--bg-primary);
          box-sizing: border-box;
        }
        
        .sb-scores { padding: 12px; display: flex; gap: 12px; justify-content: center; }
        .score-w { background: rgba(255,255,255,0.02); border-radius: 8px; padding: 8px; text-align: center; border: 1px solid var(--border-color); width: 110px; }
        .sw-lbl { font-size: 9px; font-weight: 600; letter-spacing: .8px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 6px; }
        .sw-ring { margin: 0 auto 4px; display: block; }
        .sw-verdict { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 20px; display: inline-block; }
        
        .v7-pg-head { padding: 24px 36px; border-bottom: 1px solid var(--border-color); background: var(--bg-surface); text-align: left; }
        .ph-eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--google-blue); margin-bottom: 6px; }
        .ph-title { font-family: var(--fs); font-size: 24px; font-style: italic; color: var(--text-primary); letter-spacing: -.3px; margin-bottom: 3px; }
        .ph-sub { font-size: 12px; color: var(--text-secondary); max-width: 600px; line-height: 1.6; }
        .ph-tags { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
        .ph-tag { font-size: 11px; padding: 3px 10px; border-radius: 20px; border: 1px solid var(--border-color); color: var(--text-secondary); }
        
        .v7-content { padding: 24px 36px; }
        .v7-section { margin-bottom: 32px; scroll-margin-top: 20px; }
        .sec-header { margin-bottom: 16px; text-align: left; }
        .sec-eyebrow { font-size: 9px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 4px; }
        .sec-title { font-family: var(--fs); font-size: 18px; color: var(--text-primary); margin-bottom: 3px; }
        .sec-sub { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
        
        .v7-q-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 10px; overflow: hidden; transition: border-color .15s; }
        .v7-q-card.answered { border-color: var(--google-blue); }
        .v7-q-card.has-blocker { border-color: var(--google-red); }
        .v7-q-card.has-warning { border-color: var(--google-amber); }
        .q-main { padding: 14px 16px; display: grid; grid-template-columns: 28px 1fr auto; gap: 10px; align-items: start; }
        .q-num { width: 24px; height: 24px; border-radius: 50%; background: var(--bg-surface); color: var(--text-secondary); font-size: 10px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; font-family: var(--fm); transition: all .15s; border: 1px solid var(--border-color); }
        .v7-q-card.answered .q-num { background: var(--google-blue); color: #fff; border-color: var(--google-blue); }
        .v7-q-card.has-blocker .q-num { background: var(--google-red); color: #fff; border-color: var(--google-red); }
        .q-body { min-width: 0; text-align: left; }
        .q-text { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; line-height: 1.4; }
        .q-hint { font-size: 11px; color: var(--text-secondary); line-height: 1.5; }
        .q-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
        .q-who { font-size: 9px; font-weight: 600; padding: 2px 7px; border-radius: 10px; white-space: nowrap; }
        .who-biz { background: var(--google-green-light); color: var(--google-green); }
        .who-tech { background: var(--google-blue-light); color: var(--google-blue); }
        .who-both { background: rgba(255,255,255,0.06); color: var(--text-primary); }
        .q-out-tag { font-size: 9px; font-weight: 500; padding: 1px 6px; border-radius: 6px; white-space: nowrap; }
        .out-discovery { background: var(--google-green-light); color: var(--google-green); }
        .out-readiness { background: var(--google-blue-light); color: var(--google-blue); }
        .out-both { background: var(--google-purple-light); color: var(--google-purple); }
        .q-input-wrap { padding: 0 16px 12px; }
        
        .blocker-callout { margin: 4px 16px 10px; border-radius: 6px; padding: 9px 12px; font-size: 11px; line-height: 1.55; border-left: 3px solid; text-align: left; }
        .bc-fatal { background: var(--google-red-light); border-color: var(--google-red); color: var(--google-red); }
        .bc-start { background: var(--google-amber-light); border-color: var(--google-amber); color: var(--google-amber); }
        .bc-risk { background: var(--google-blue-light); border-color: var(--google-blue); color: var(--google-blue); }
        .bc-title { font-weight: 700; margin-bottom: 2px; }
        .bc-opts { margin-top: 5px; }
        
        .path-sel { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
        .path-card { border: 1.5px solid var(--border-color); border-radius: 12px; padding: 14px 16px; cursor: pointer; transition: all .15s; background: var(--bg-card); text-align: left; }
        .path-card:hover { border-color: var(--text-secondary); }
        .path-card.sel-recreate { border-color: var(--google-blue); background: var(--google-blue-light); }
        .path-card.sel-build { border-color: var(--google-green); background: var(--google-green-light); }
        .pc-icon { font-size: 20px; margin-bottom: 6px; }
        .pc-title { font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 2px; }
        .pc-sub { font-size: 11px; color: var(--text-secondary); line-height: 1.4; }
        .pc-badge { display: inline-block; margin-top: 7px; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 8px; }
        .pcb-r { background: rgba(59,130,246,0.15); color: var(--google-blue); }
        .pcb-b { background: rgba(16,185,129,0.15); color: var(--google-green); }
        
        .divider { border: none; border-top: 1px solid var(--border-color); margin: 20px 0; }
        .chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; }
        
        .dc-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .dc-label { font-size: 12px; font-weight: 600; color: var(--text-primary); flex: 1; text-align: left; }
        .dc-score { font-family: var(--fm); font-size: 12px; color: var(--text-secondary); width: 34px; text-align: right; }
        .dc-wt { font-size: 10px; color: var(--text-secondary); width: 30px; text-align: right; }
        .bar-wrap { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 3px; transition: width .6s cubic-bezier(.4,0,.2,1); }
        .b-high { background: var(--google-green); }
        .b-mid { background: var(--google-amber); }
        .b-low { background: var(--google-red); }
        
        .dim-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px 16px; margin-bottom: 10px; box-shadow: var(--shadow-sm); }
        .hs-card { border-radius: 16px; padding: 22px; border: 1px solid var(--border-color); background: var(--bg-card); box-shadow: var(--shadow-md); }
        
        .blocker-log-card { border-radius: 12px; border: 1px solid; padding: 13px 15px; margin-bottom: 8px; text-align: left; box-shadow: var(--shadow-sm); }
        .blc-fatal { background: var(--google-red-light); border-color: rgba(239,68,68,0.2); }
        .blc-start { background: var(--google-amber-light); border-color: rgba(245,158,11,0.2); }
        .blc-risk { background: var(--google-blue-light); border-color: rgba(59,130,246,0.2); }
        .blc-header { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
        .blc-sev { font-size: 9px; font-weight: 700; letter-spacing: .6px; padding: 2px 7px; border-radius: 8px; }
        .blc-fatal-s { background: var(--google-red); color: #fff; }
        .blc-start-s { background: var(--google-amber); color: #fff; }
        .blc-risk-s { background: var(--google-blue); color: #fff; }
        .blc-title { font-size: 12px; font-weight: 700; color: var(--text-primary); }
        .blc-body { font-size: 11px; color: var(--text-secondary); line-height: 1.55; }
        .blc-opts { margin-top: 5px; font-size: 11px; color: var(--text-primary); }
        
        .matrix-wrap { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 3px; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-color); margin-bottom: 16px; }
        .mc { padding: 14px; position: relative; text-align: left; }
        .mc-tl { background: rgba(16,185,129,0.08); }
        .mc-tr { background: rgba(59,130,246,0.12); }
        .mc-bl { background: rgba(255,255,255,0.01); }
        .mc-br { background: rgba(59,130,246,0.04); }
        .mc-label { font-size: 12px; font-weight: 700; color: var(--text-primary); }
        .mc-sub { font-size: 10px; color: var(--text-secondary); margin-top: 1px; }
        .uc-dot { position: absolute; width: 14px; height: 14px; border-radius: 50%; background: var(--google-blue); border: 2px solid #fff; box-shadow: 0 0 12px rgba(59,130,246,0.6); transition: all 0.5s; cursor: pointer; }
      `}} />

      {/* SINGLE CONTENT PORTAL - 100% WIDTH SCREEN WITH HORIZONTAL TOPBAR SUMMARY */}
      <div className="v7-main" style={{ width: '100%', boxSizing: 'border-box' }}>
        
        {/* PATH QUESTIONS MODE */}
        {viewSubMode === 'questions' && (
          <div id="page-questions" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <div className="v7-pg-head">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div className="ph-eyebrow">Use case discovery · GCP Gemini Enterprise</div>
                  <div className="ph-title">Agentic AI assessment (v7)</div>
                  <div className="ph-sub">Exhaustive 67-question technical due diligence. Map factual perimeters, audit compliance readiness, and compile sprint roadmaps.</div>
                  <div className="ph-tags">
                    <span className="ph-tag chip" style={{ background: 'var(--google-green-light)', color: 'var(--google-green)' }}>Business team</span>
                    <span className="ph-tag chip" style={{ background: 'var(--google-blue-light)', color: 'var(--google-blue)' }}>Technical team</span>
                    <span className="ph-tag chip" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{applicableCount} questions applicable</span>
                    <span className="ph-tag chip" style={{ background: 'var(--google-purple-light)', color: 'var(--google-purple)' }}>Zero Overlap</span>
                  </div>
                </div>

                {/* Inline Control Panel for Saved Sessions (Replaces middle sidebar completely!) */}
                <div className="no-print" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', textAlign: 'left', minWidth: '240px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px', letterSpacing: '0.5px' }}>
                    PERSISTED SESSIONS
                  </div>
                  <input
                    type="text"
                    placeholder="Session name..."
                    value={sessionNameInput}
                    onChange={(e) => setSessionNameInput(e.target.value)}
                    style={{
                      width: '100%', fontSize: '11px', padding: '4px 6px', borderRadius: '4px',
                      background: 'var(--bg-primary)', border: '1.5px solid var(--border-color)', color: 'var(--text-primary)', marginBottom: '6px'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button type="button" onClick={handleSaveSession} className="btn btn-primary btn-sm" style={{ flex: 1, fontSize: '10px', padding: '3px', justifyContent: 'center', borderRadius: '4px' }}>
                      Save
                    </button>
                    <button type="button" onClick={handleResetSession} className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: '10px', padding: '3px', justifyContent: 'center', borderRadius: '4px' }}>
                      Clear
                    </button>
                  </div>
                  {savedSessions.length > 0 && (
                    <select
                      onChange={(e) => {
                        const s = savedSessions.find(x => x.id === e.target.value);
                        if (s) handleLoadSession(s);
                      }}
                      value={activeSessionId || ''}
                      style={{
                        width: '100%', fontSize: '11px', padding: '4px', borderRadius: '4px',
                        background: '#131a2e', border: '1px solid var(--border-color)', color: '#fff', marginTop: '6px'
                      }}
                    >
                      <option value="">📂 Load Saved Session...</option>
                      {savedSessions.map(s => (
                        <option key={s.id} value={s.id}>{s.reportName || s.name} ({s.scores.discovery}/{s.scores.readiness})</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Horizontal Live Scoring & Progress Summary Banner (Replaces duplicate gauges & completion menus!) */}
              <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '16px', paddingTop: '12px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Discovery:</span>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--google-blue)' }}>{discScore}% ({getVerdictHTML(discScore, 'disc').text})</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Readiness:</span>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--google-green)' }}>{readScore}% ({getVerdictHTML(readScore, 'read').text})</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Blockers:</span>
                  <span style={{ fontSize: '11px', color: 'var(--google-red)', fontWeight: 750 }}>{cntFatal} Fatal</span>
                  <span style={{ fontSize: '11px', color: 'var(--google-amber)', fontWeight: 750 }}>{cntStart} Start</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>Progress:</span>
                  <div className="bar-wrap" style={{ flex: 1, height: '5px' }}><div className="bar-fill b-high" style={{ width: `${Math.round((answeredCount / applicableCount) * 100)}%`, background: 'var(--google-blue)' }}></div></div>
                  <span style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: 750, whiteSpace: 'nowrap' }}>{answeredCount} / {applicableCount}</span>
                </div>
                
                {/* Clean, Collapsed Dropdown Chapter Jump Menu & Button Group (Zero Clutter, Zero Overflow!) */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="no-print">
                  
                  {/* Unified Jump Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => setIsJumpMenuOpen(!isJumpMenuOpen)}
                      style={{
                        fontSize: '11px', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 750,
                        display: 'flex', alignItems: 'center', gap: '4px'
                      }}
                    >
                      <span>📖 Jump to Chapter...</span>
                      <span style={{ fontSize: '8px' }}>▼</span>
                    </button>
                    
                    {isJumpMenuOpen && (
                      <div style={{
                        position: 'absolute', top: '100%', right: 0, background: 'var(--bg-surface)', border: '1.5px solid var(--border-color)',
                        borderRadius: '12px', boxShadow: 'var(--shadow-lg)', zIndex: 200, width: '240px', marginTop: '6px', padding: '6px 0'
                      }}>
                        {SECTIONS.map(sec => {
                          if (sec.id === 'current' && currentPath === 'build') return null;
                          const ids = SECTION_MAP[sec.id] || [];
                          const applicable = ids.filter(id => {
                            const q = QUESTIONS.find(x => x.id === id);
                            return !(q?.path === 'recreate' && currentPath === 'build');
                          });
                          const answered = applicable.filter(id => {
                            const item = state[id];
                            if (!item) return false;
                            return (item.selectedOptions && item.selectedOptions.length > 0) || (item.comments && item.comments.trim().length > 0);
                          }).length;
                          const isDone = answered === applicable.length && applicable.length > 0;

                          return (
                            <div
                              key={sec.id}
                              onClick={() => { handleChapterClick(sec.id); setIsJumpMenuOpen(false); }}
                              style={{
                                padding: '8px 14px', fontSize: '11.5px', color: isDone ? 'var(--google-green)' : 'var(--text-secondary)',
                                cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              <span>{sec.label}</span>
                              <span style={{ fontSize: '9.5px', fontWeight: 700, opacity: 0.8 }}>{answered}/{applicable.length}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Offline Excel/CSV Sheet Synchronization Actions (PSO-PRINCIPAL Premium!) */}
                  <div style={{ display: 'flex', gap: '5px' }} className="no-print">
                    <button
                      type="button"
                      onClick={downloadAssessmentAsCSV}
                      style={{
                        fontSize: '11px', padding: '6px 12px', borderRadius: '8px', border: '1.5px dashed var(--google-blue)',
                        background: 'rgba(66,133,244,0.05)', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 750,
                        display: 'flex', alignItems: 'center', gap: '4px'
                      }}
                      title="Export all questions and active options to Excel/Google Sheets CSV"
                    >
                      <span>📤 Export Sheet</span>
                    </button>
                    
                    <label
                      style={{
                        fontSize: '11px', padding: '6px 12px', borderRadius: '8px', border: '1.5px dashed var(--google-green)',
                        background: 'rgba(52,168,83,0.05)', color: 'var(--google-green)', cursor: 'pointer', fontWeight: 750,
                        display: 'flex', alignItems: 'center', gap: '4px', margin: 0
                      }}
                      title="Upload edited Excel/Google Sheets CSV back to instantly update"
                    >
                      <span>📥 Import Sheet</span>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  {/* Spacious, Aligned Button Group */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn btn-primary btn-sm" onClick={() => {
                      if (answeredCount === 0) {
                        alert('⚠️ Please complete at least one assessment question / pillar before generating the report.');
                        return;
                      }
                      if (onGenerateReport) {
                        onGenerateReport(state, currentPath);
                      } else {
                        setViewSubMode('report');
                      }
                    }} style={{ borderRadius: '8px', padding: '6px 12px', fontSize: '11px', whiteSpace: 'nowrap' }}>
                      Generate Report v7
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleAutofillV7} style={{ borderRadius: '8px', padding: '6px 12px', fontSize: '11px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>🪄</span>
                      <span>Prefill</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden', width: '100%' }}>
              
              {/* Right-Pane: Scrollable Questions Canvas */}
              <div style={{ width: '100%', overflowY: 'auto', padding: '1.5rem 2.25rem', boxSizing: 'border-box', height: '100%' }}>
                
                {/* Path Selector */}
                <div className="v7-section" style={{ marginBottom: '2rem' }}>
                  <div className="sec-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.45rem', marginBottom: '1rem' }}>
                    <div className="sec-eyebrow">Start here</div>
                    <h3 style={{ fontFamily: 'var(--fs)', fontSize: '20px', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Select your use case path</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>This determines which questions are shown. You can change this at any time.</p>
                  </div>
                  <div className="path-sel">
                    <div className={`path-card ${currentPath === 'recreate' ? 'sel-recreate' : ''}`} onClick={() => handleSetPath('recreate')}>
                      <div className="pc-icon">🔄</div>
                      <div className="pc-title">Recreate existing</div>
                      <div className="pc-sub">Migrate a live AI use case from another platform onto GCP Gemini Enterprise</div>
                      <span className="pc-badge pcb-r">Azure OpenAI · AWS Bedrock · OpenAI</span>
                    </div>
                    <div className={`path-card ${currentPath === 'build' ? 'sel-build' : ''}`} onClick={() => handleSetPath('build')}>
                      <div className="pc-icon">✨</div>
                      <div className="pc-title">Build fresh</div>
                      <div className="pc-sub">Net-new AI capability — no existing system to migrate, or replacing a manual process</div>
                      <span className="pc-badge pcb-b">Greenfield · No prior AI · Manual process</span>
                    </div>
                  </div>
                </div>

                {/* Dynamically render V7 questions with 100% logically consistent multiple-choice select layout! */}
                {SECTIONS.map(sec => {
                  if (sec.id === 'current' && currentPath === 'build') return null;

                  const secQuestions = QUESTIONS.filter(q => q.sec === sec.id && !(q.path === 'recreate' && currentPath === 'build'));

                  return (
                    <div className="v7-section" key={sec.id} id={`sec-${sec.id}`}>
                      <div className="sec-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.45rem', marginBottom: '1.25rem' }}>
                        <div className="sec-eyebrow">{sec.score === 'discovery' ? 'Discovery score' : sec.score === 'readiness' ? 'Readiness score' : 'Both scores'}</div>
                        <h3 style={{ fontFamily: 'var(--fs)', fontSize: '20px', margin: 0, color: 'var(--text-primary)' }}>{sec.label}</h3>
                      </div>

                      {secQuestions.map(q => {
                        const stateItem = state[q.id] || { 
                          comments: '',
                          selectedOptions: [] 
                        };

                        const isAnswered = (stateItem.selectedOptions && stateItem.selectedOptions.length > 0) || stateItem.comments?.trim().length > 0;
                        const hasBlocker = q.blocker && stateItem.selectedOptions?.includes(q.blocker.cond);
                        const cardClass = hasBlocker ? (q.blocker.type === 'fatal' ? 'has-blocker' : 'has-warning') : (isAnswered ? 'answered' : '');

                        return (
                          <div key={q.id} className={`v7-q-card ${cardClass}`} id={`qc-${q.id}`} style={{ marginBottom: '1.25rem', padding: '1.25rem' }}>
                            
                            {/* Card Header */}
                            <div className="q-main" style={{ marginBottom: '1rem' }}>
                              <div className="q-num">{q.n}</div>
                              <div className="q-body">
                                <div className="q-text">{q.q}</div>
                                <div className="q-hint">{q.hint}</div>
                              </div>
                              <div className="q-meta">
                                <span className={`q-who ${q.who === 'biz' ? 'who-biz' : q.who === 'tech' ? 'who-tech' : 'who-both'}`}>
                                  {q.who === 'biz' ? 'Business team' : q.who === 'tech' ? 'Technical team' : 'Both teams'}
                                </span>
                                {q.disc || q.read ? (
                                  <span className={`q-out-tag ${q.disc && q.read ? 'out-both' : q.disc ? 'out-discovery' : 'out-readiness'}`}>
                                    {q.disc && q.read ? 'Both' : q.disc ? 'Discovery' : 'Readiness'}
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            {/* Options Selection capsule cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              {q.groups && q.groups.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
                                  {q.groups.map(g => (
                                    <div key={g.label} style={{ textAlign: 'left' }}>
                                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--google-blue)', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                                        {g.label}
                                      </div>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                                        {g.opts.map(opt => {
                                          const isSelected = stateItem.selectedOptions?.includes(opt);
                                          return (
                                            <button
                                              key={opt}
                                              type="button"
                                              onClick={() => handleSelectOpt(q.id, opt, q.multi)}
                                              style={{
                                                padding: '0.45rem 0.75rem',
                                                background: isSelected ? 'var(--google-blue)' : 'rgba(255,255,255,0.02)',
                                                border: `1.2px solid ${isSelected ? 'var(--google-blue)' : 'var(--border-color)'}`,
                                                borderRadius: '20px',
                                                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                                                fontSize: '0.82rem',
                                                fontWeight: isSelected ? 750 : 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                                textAlign: 'left'
                                              }}
                                            >
                                              {isSelected && '✓ '}
                                              {opt}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Context comments */}
                              <div style={{ textAlign: 'left' }}>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                  Scoping Comments & Contextual Meeting Notes
                                </label>
                                <textarea
                                  placeholder="Detail specific staging databases, latency targets, regulatory dates, or project timelines discussed..."
                                  className="form-textarea"
                                  style={{ minHeight: '50px', fontSize: '0.82rem', padding: '0.45rem 0.65rem', borderRadius: '6px', background: 'var(--bg-primary)', border: '1.5px solid var(--border-color)', color: 'var(--text-primary)' }}
                                  value={stateItem.comments || ''}
                                  onChange={(e) => {
                                    const currentItem = state[q.id] || { comments: '', selectedOptions: [] };
                                    setState(prev => ({ ...prev, [q.id]: { ...currentItem, comments: e.target.value } }));
                                  }}
                                />
                              </div>

                              {/* Blocker Alert */}
                              {hasBlocker && q.blocker && (
                                <div className="blocker-callout bc-fatal" style={{ margin: '0.5rem 0 0 0' }}>
                                  <div className="bc-title">{q.blocker.type.toUpperCase()} BLOCKER: {q.blocker.title}</div>
                                  <div>{q.blocker.body}</div>
                                  <div className="bc-opts"><strong>Resolution options:</strong> {q.blocker.opts}</div>
                                </div>
                              )}
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        )}

        {/* TWO-TIER ASSESSMENT REPORT */}
        {viewSubMode === 'report' && (
          answeredCount === 0 ? (
            <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--google-red)', borderRadius: '16px', padding: '40px', maxWidth: '540px', margin: '60px auto', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>⚠️</div>
              <h3 style={{ fontSize: '18px', fontWeight: 850, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Incomplete Diligence Assessment
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                No questions have been completed. At least one pillar must be evaluated before the executive scoping report can be generated and displayed.
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => { setViewSubMode('questions'); }}
                style={{ borderRadius: '8px', padding: '8px 18px', fontWeight: 750 }}
              >
                ← Return to Scoping Chapters
              </button>
            </div>
          ) : (
            <div id="page-report" style={{ padding: '0 0 40px 0' }}>
            
            {/* Header Panel (Exact V6 Format!) */}
            <div className="v7-pg-head" style={{ borderBottom: '1.5px solid var(--border-color)', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div className="ph-eyebrow">Assessment report · GCP Gemini Enterprise</div>
                  <h2 style={{ fontFamily: 'var(--fs)', fontSize: '22px', fontStyle: 'italic', margin: '3px 0', color: 'var(--text-primary)' }}>
                    {state['ctx1']?.comments || 'Agentic AI Discovery Report'}
                  </h2>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '16px', marginTop: '4px' }}>
                    <span><strong>Client:</strong> {state['ctx1']?.comments || 'Merck GSF'} ({state['ctx2']?.selectedOptions?.[0] || 'Pharma R&D'})</span>
                    <span><strong>Path:</strong> {currentPath === 'recreate' ? 'Migration' : 'Greenfield'}</span>
                    <span><strong>ID:</strong> {activeSessionId || 'GSF-DISC-v7.0'}</span>
                  </div>
                </div>

                <div className="no-print" style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-secondary btn-sm" style={{ borderRadius: '6px', fontWeight: 750 }} onClick={() => { setViewSubMode('questions'); setIsDeepDiveOpen(false); }}>
                    ← Edit Answers
                  </button>
                  <button className="btn btn-primary btn-sm" style={{ borderRadius: '6px', fontWeight: 750 }} onClick={() => setIsDeepDiveOpen(!isDeepDiveOpen)}>
                    {isDeepDiveOpen ? '📊 View Executive Report' : '⚙️ View Scoping Deep-Dives'}
                  </button>
                  <button className="btn btn-primary btn-sm" style={{ background: 'var(--google-blue)', borderRadius: '6px', fontWeight: 750 }} onClick={() => window.print()}>
                    Export PDF
                  </button>
                </div>
              </div>
            </div>

            {/* TIER 1: MASTER EXECUTIVE SCOPING REPORT VIEWPORT */}
            {!isDeepDiveOpen ? (
              <div className="v7-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeRawResponse && (
                  <div style={{ background: 'rgba(66,133,244,0.08)', border: '1.5px solid var(--google-blue)', borderRadius: '12px', padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span>🤖</span>
                    <span><strong>Grounded Executive Scoping Active:</strong> This high-fidelity report has been statefully compiled and generated in real-time by the <strong>Gemini 2.5 Flash API / Google Cloud Reasoning Engine</strong>.</span>
                  </div>
                )}
                
                {/* Row 1: Executive Scoping Verdict & Pillar Suitability Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }}>
                  
                  {/* Executive Scoping Verdict Card */}
                  <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'left' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '12px' }}>
                      EXECUTIVE SCOPING VERDICT
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '1.5rem' }}>
                      <div style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        background: (activeRawResponse?.scoring?.overallFit || readScore) >= 70 ? 'var(--google-green)' : (readScore >= 45 ? 'var(--google-blue)' : 'var(--google-red)'),
                        color: '#fff', display: 'flex', alignItems: 'center', justifyOrigin: 'center', justifyContent: 'center',
                        fontSize: '28px', fontWeight: 900, fontFamily: 'var(--fs)', flexShrink: 0, boxShadow: '0 0 20px rgba(66,133,244,0.2)'
                      }}>
                        {(activeRawResponse?.scoring?.overallFit || readScore) >= 75 ? 'A' : (readScore >= 50 ? 'B' : 'C')}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>
                          {(activeRawResponse?.scoring?.overallFit || readScore) >= 75 ? 'Optimized Build Recommended' : (readScore >= 50 ? 'Foundational Scaling Required' : 'Blocker Mitigation Required')}
                        </h3>
                        <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                          Overall Suitability Index: <strong style={{ color: 'var(--text-primary)' }}>{Math.round(((activeRawResponse?.scoring?.overallFit || readScore) / 20) * 10) / 10} / 5.0</strong>
                        </span>
                      </div>
                    </div>

                    {/* Business & Technical Fit Progress Bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Business Fit Alignment:</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{Math.round(((activeRawResponse?.scoring?.scores?.business || discScore) / 20) * 10) / 10} / 5.0</strong>
                        </div>
                        <div className="bar-wrap" style={{ height: '5px' }}>
                          <div className="bar-fill b-high" style={{ width: `${activeRawResponse?.scoring?.scores?.business || discScore}%`, background: 'var(--google-blue)' }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Technical Fit Alignment:</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{Math.round(((activeRawResponse?.scoring?.scores?.technical || readScore) / 20) * 10) / 10} / 5.0</strong>
                        </div>
                        <div className="bar-wrap" style={{ height: '5px' }}>
                          <div className="bar-fill b-high" style={{ width: `${activeRawResponse?.scoring?.scores?.technical || readScore}%`, background: 'var(--google-green)' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pillar GAP & Suitability Analysis Grid (5 Pillars!) */}
                  <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
                        Pillar GAP & Suitability Analysis
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 750 }} onClick={() => setIsDeepDiveOpen(true)}>
                        💡 CLICK SECTION FOR DETAILS
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                      {[
                        { label: 'Context & Urgency', score: activeRawResponse?.scoring?.scores?.business ? activeRawResponse.scoring.scores.business / 20 : pStrategicVal, id: 'strategic' },
                        { label: 'Data Readiness', score: activeRawResponse?.scoring?.scores?.technical ? activeRawResponse.scoring.scores.technical / 20 : pDataReadiness, id: 'data' },
                        { label: 'Architecture Design', score: activeRawResponse?.scoring?.scores?.migration ? activeRawResponse.scoring.scores.migration / 20 : pArchitecture, id: 'architecture' },
                        { label: 'Security & Network', score: activeRawResponse?.scoring?.scores?.risk ? activeRawResponse.scoring.scores.risk / 20 : pSecurityGovern, id: 'security' },
                        { label: 'Execution & ROI', score: activeRawResponse?.scoring?.scores?.timeToValue ? activeRawResponse.scoring.scores.timeToValue / 20 : pExecutionEval, id: 'execution' }
                      ].map(p => (
                        <div
                          key={p.id}
                          onClick={() => { setIsDeepDiveOpen(true); setActiveDeepDiveTab(p.id); }}
                          style={{
                            background: 'rgba(255,255,255,0.01)', border: '1.2px solid var(--border-color)', borderRadius: '8px',
                            padding: '10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s'
                          }}
                          className="pillar-gap-card"
                        >
                          <div style={{ fontSize: '9.5px', fontWeight: 800, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '6px' }}>{p.label}</div>
                          <div style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'var(--fs)', color: p.score >= 3.5 ? 'var(--google-green)' : (p.score >= 2.5 ? 'var(--google-blue)' : 'var(--google-red)') }}>
                            {p.score.toFixed(1)}
                          </div>
                          <div style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 750, background: p.score >= 3.5 ? 'rgba(52,168,83,0.1)' : 'rgba(239,68,68,0.1)', color: p.score >= 3.5 ? 'var(--google-green)' : 'var(--google-red)', display: 'inline-block', padding: '1px 4px', borderRadius: '4px', marginTop: '4px' }}>
                            GAP: +{(5.0 - p.score).toFixed(1)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Row 2: Executive Strategic Briefing & Rationale */}
                <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'left' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '8px' }}>
                    📄 EXECUTIVE STRATEGIC BRIEFING & RATIONALE
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.65', margin: 0 }}>
                    {activeRawResponse?.scoring?.rationale || generateDynamicRationale()}
                  </p>
                </div>

                {/* Row 3: Top 5 Critical Path Roadmaps & Projected ROI savings */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr', gap: '20px' }}>
                  
                  {/* Top 5 Critical Path Roadmap Remediations Card */}
                  <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'left' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '12px' }}>
                      🛡️ TOP 5 CRITICAL PATH ROADMAP REMEDIATIONS
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activeRawResponse ? (
                        activeRawResponse.blockers?.slice(0, 4).map((b, idx) => (
                          <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '10px 12px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                              <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{b.title}</strong>
                              <span style={{ fontSize: '8px', fontWeight: 850, background: b.severity === 'Critical' ? 'var(--google-red-light)' : 'var(--google-blue-light)', color: b.severity === 'Critical' ? 'var(--google-red)' : 'var(--google-blue)', padding: '1px 5px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                {b.severity || 'RISK'}
                              </span>
                            </div>
                            <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', display: 'block', lineHeight: 1.4 }}>{b.desc}</span>
                          </div>
                        ))
                      ) : nvBlockers.length === 0 ? (
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '12px 0' }}>
                          🎉 Zero blockers identified. Target landing zone is clear and optimized.
                        </div>
                      ) : (
                        nvBlockers.slice(0, 3).map((b, idx) => (
                          <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '10px 12px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                              <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{b.title}</strong>
                              <span style={{ fontSize: '8px', fontWeight: 850, background: 'var(--google-red-light)', color: 'var(--google-red)', padding: '1px 5px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                QUICK WIN
                              </span>
                            </div>
                            <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', display: 'block', lineHeight: 1.4 }}>{b.desc}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Projected ROI & Savings Card */}
                  <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'left' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '12px' }}>
                      📈 PROJECTED ROI & SAVINGS
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                      <div style={{ background: 'rgba(16,185,129,0.05)', border: '1.2px solid rgba(16,185,129,0.15)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '8.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--google-green)', marginBottom: '3px' }}>TCO Cost Savings</div>
                        <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--google-green)', fontFamily: 'var(--fs)' }}>{activeRawResponse?.roi?.tcoSavings || `${roiAutomationRate}% - ${roiAutomationRate + 12}%`}</div>
                      </div>

                      <div style={{ background: 'rgba(66,133,244,0.05)', border: '1.2px solid rgba(66,133,244,0.15)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '8.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--google-blue)', marginBottom: '3px' }}>Payback Period</div>
                        <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--google-blue)', fontFamily: 'var(--fs)' }}>
                          {activeRawResponse?.roi?.paybackPeriod || (isFinite(Math.round((45000 / (roiFteCount * roiHoursPerWeek * 52 * roiHourlyRate * (roiAutomationRate / 100) - 12000)) * 12)) ? `${Math.max(1, Math.round((45000 / (roiFteCount * roiHoursPerWeek * 52 * roiHourlyRate * (roiAutomationRate / 100) - 12000)) * 12))} Months` : '1 Month')}
                        </div>
                      </div>
                    </div>

                    {/* ROI outlook summary text directly from Gemini API rawResponse! */}
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', padding: '10px 12px', borderRadius: '8px', fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px', textAlign: 'left' }}>
                      {activeRawResponse?.roi?.summary || "Real-time simulation baseline. Transitioning target agent workflows to Google Cloud serverless runtimes yields a high TCO savings margin."}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Target Active Users Scale:</span>
                        <strong style={{ color: 'var(--google-blue)' }}>{roiFteScale.toLocaleString()} Users</strong>
                      </div>
                      <input
                        type="range" min="100" max="50000" step="100"
                        value={roiFteScale} onChange={(e) => {
                          setRoiFteScale(Number(e.target.value));
                          setRoiFteCount(Math.max(1, Math.round(Number(e.target.value) * 0.0012)));
                        }}
                        style={{ width: '100%', cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                </div>

                {/* Clean bottom boundary */}
                {/* Target spec and Gantt timeline are grouped inside tab deep-dives where they belong! */}

              </div>
            ) : (
              /* TIER 2: DUAL-COLUMN PILLARS DEEP-DIVE VIEWPORT */
              <div className="v7-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeRawResponse && (
                  <div style={{ background: 'rgba(66,133,244,0.08)', border: '1.5px solid var(--google-blue)', borderRadius: '12px', padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span>🤖</span>
                    <span><strong>Grounded Executive Scoping Active:</strong> This high-fidelity report has been statefully compiled and generated in real-time by the <strong>Gemini 2.5 Flash API / Google Cloud Reasoning Engine</strong>.</span>
                  </div>
                )}
                
                {/* Pillars Sub-Navigation Tab bar */}
                <div style={{ display: 'flex', background: 'var(--bg-surface)', borderBottom: '1.5px solid var(--border-color)', padding: '0 10px', borderRadius: '8px' }}>
                  {[
                    { id: 'strategic', label: 'Strategic Value', icon: '👍' },
                    { id: 'data', label: 'Data Readiness', icon: '📂' },
                    { id: 'security', label: 'Security, Governance', icon: '🛡️' },
                    { id: 'execution', label: 'Execution, Evaluation', icon: '📈' },
                    { id: 'architecture', label: 'Architecture Blueprint', icon: '✏️' }
                  ].map(tab => {
                    const isActive = activeDeepDiveTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveDeepDiveTab(tab.id)}
                        style={{
                          padding: '0.85rem 1.25rem',
                          border: 'none',
                          background: 'transparent',
                          borderBottom: `3px solid ${isActive ? 'var(--google-blue)' : 'transparent'}`,
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontSize: '0.82rem',
                          fontWeight: isActive ? 800 : 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Render V6 Symmetrical 4-Quadrant Grid Cards! */}
                {(() => {
                  const renderPillarDossier = (pId) => {
                    if (pId === 'architecture') {
                      const getReactiveSource = () => {
                        const sel = state['dat1']?.selectedOptions?.[0] || state['dat2']?.selectedOptions?.[0] || '';
                        if (sel.includes('S3') || sel.includes('AWS')) return '🪣 AWS S3 Analytical Bucket';
                        if (sel.includes('BigQuery')) return '📊 Google BigQuery EDW';
                        if (sel.includes('SharePoint')) return '📂 SharePoint GxP Lake';
                        if (sel.includes('Snowflake')) return '❄️ Snowflake Database';
                        if (sel.includes('Azure')) return '☁️ Azure Blob Storage';
                        return sel || '❄️ Snowflake Database';
                      };
                      const getReactiveModel = () => {
                        const tgt = state['tgt1']?.selectedOptions?.[0] || '';
                        if (tgt.includes('1.5 Flash')) return '⚡ Vertex AI (Gemini 1.5 Flash)';
                        if (tgt.includes('2.5 Pro')) return '🚀 Vertex AI (Gemini 2.5 Pro)';
                        if (tgt.includes('Ultra')) return '💎 Vertex AI (Gemini 3.0 Ultra)';
                        return '🧠 Vertex AI (Gemini 1.5 Pro)';
                      };
                      const getReactiveOrchestrator = () => {
                        const cur = state['cur1']?.selectedOptions?.[0] || '';
                        if (cur.includes('LangGraph') || cur.includes('LangChain')) return '🔗 LangGraph Supervisor';
                        if (cur.includes('LlamaIndex')) return '🦙 LlamaIndex RAG Enclave';
                        return '⚙️ Cloud Run Serving Layer';
                      };

                      const reactiveSource = getReactiveSource();
                      const reactiveModel = getReactiveModel();
                      const reactiveOrchestrator = getReactiveOrchestrator();

                      return (
                        <div key={pId} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', textAlign: 'left', pageBreakInside: 'avoid', marginBottom: '24px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div>
                              <h3 style={{ fontFamily: 'var(--fs)', fontSize: '18px', margin: 0, color: 'var(--text-primary)' }}>Target Agentic AI GCP Architecture Blueprint</h3>
                              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Dynamic VPC Service Controls (VPC-SC) perimeter, Snowflake PrivateLink, and Google Cloud Run serving layer.</p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm no-print"
                              onClick={() => setIsDrawIoOpen(true)}
                              style={{ borderRadius: '8px', gap: '4px' }}
                            >
                              ✏️ Open in Interactive Draw.io Canvas
                            </button>
                          </div>

                          {isDrawIoOpen && pId === activeDeepDiveTab ? (
                            <div className="no-print" style={{ border: '1.5px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: '#fff', height: '480px', position: 'relative' }}>
                              <iframe
                                src={`https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&modified=unsaved&proto=json`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title="Draw.io Editor v7"
                              />
                              <button
                                type="button"
                                onClick={() => setIsDrawIoOpen(false)}
                                className="btn btn-secondary btn-sm"
                                style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '6px' }}
                              >
                                Close Editor
                              </button>
                            </div>
                          ) : (
                            <div style={{ border: '1.5px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: '#090e18', padding: '20px', display: 'flex', justifyContent: 'center' }}>
                              <svg width="880" height="320" viewBox="0 0 880 320">
                                <defs>
                                  <linearGradient id="glow-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#4285F4" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#0D47A1" stopOpacity="0.3" />
                                  </linearGradient>
                                  <linearGradient id="glow-green" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#34A853" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#1B5E20" stopOpacity="0.3" />
                                  </linearGradient>
                                  <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
                                    <feGaussianBlur stdDeviation="6" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                  </filter>
                                </defs>

                                <g opacity="0.08">
                                  {Array.from({ length: 18 }).map((_, i) => (
                                    <line key={`h-${i}`} x1="0" y1={i * 20} x2="880" y2={i * 20} stroke="#fff" strokeWidth="0.5" />
                                  ))}
                                  {Array.from({ length: 45 }).map((_, i) => (
                                    <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="320" stroke="#fff" strokeWidth="0.5" />
                                  ))}
                                </g>

                                <g transform="translate(30, 60)">
                                  <rect x="0" y="0" width="180" height="180" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" rx="8" />
                                  <text x="90" y="22" textAnchor="middle" fontSize="9" fontWeight="900" fill="rgba(255,255,255,0.4)" letterSpacing="1">EXTERNAL SOURCE TIER</text>
                                  
                                  <g transform="translate(15, 40)">
                                    <rect x="0" y="0" width="150" height="45" fill="#101c30" stroke="#34a853" strokeWidth="1.2" rx="6" />
                                    <text x="12" y="20" fontSize="10.5" fontWeight="700" fill="#fff">{reactiveSource}</text>
                                    <text x="12" y="34" fontSize="8" fill="#34a853">Enterprise Business Critical</text>
                                  </g>
                                  <g transform="translate(15, 105)">
                                    <rect x="0" y="0" width="150" height="45" fill="#101c30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" rx="6" />
                                    <text x="12" y="20" fontSize="11" fontWeight="700" fill="#fff">📂 SharePoint Files</text>
                                    <text x="12" y="34" fontSize="8.5" fill="var(--text-secondary)">Clinical Trial Dossiers</text>
                                  </g>
                                </g>

                                <path d="M210 122 L 320 122" fill="none" stroke="#34a853" strokeWidth="2.5" strokeDasharray="5 3" />
                                <circle cx="265" cy="122" r="4" fill="#34a853" />
                                <path d="M210 187 L 280 187 L 280 145 L 320 145" fill="none" stroke="#ea4335" strokeWidth="2" strokeDasharray="3 3" />
                                <text x="265" y="112" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#34a853">GCP Private PSC Link</text>

                                <g transform="translate(320, 30)">
                                  <rect x="0" y="0" width="340" height="240" fill="rgba(66,133,244,0.03)" stroke="#4285F4" strokeWidth="2" rx="12" strokeDasharray="6 3" filter="url(#glow)" />
                                  <text x="170" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fill="#4285F4" letterSpacing="1.2">GCP VPC-SC COMPLIANCE BOUNDARY</text>

                                  <g transform="translate(20, 40)">
                                    <rect x="0" y="0" width="300" height="55" fill="#0f1a30" stroke="#4285F4" strokeWidth="1.5" rx="8" />
                                    <text x="15" y="22" fontSize="11" fontWeight="800" fill="#fff">{reactiveOrchestrator}</text>
                                    <text x="15" y="38" fontSize="8.5" fill="var(--text-secondary)">Stateful Supervisor Enclave (SLA Conversational)</text>
                                  </g>

                                  <g transform="translate(20, 110)">
                                    <rect x="0" y="0" width="140" height="45" fill="#1d1020" stroke="#a040f0" strokeWidth="1.2" rx="6" />
                                    <text x="12" y="20" fontSize="10" fontWeight="800" fill="#fff">🛡️ Cloud DLP Gate</text>
                                    <text x="12" y="34" fontSize="8" fill="#a040f0">PHI/PII Masking Active</text>
                                  </g>

                                  <g transform="translate(180, 110)">
                                    <rect x="0" y="0" width="140" height="45" fill="#101c30" stroke="#10b981" strokeWidth="1.2" rx="6" />
                                    <text x="12" y="20" fontSize="10" fontWeight="800" fill="#fff">🔑 Cloud KMS CMEK</text>
                                    <text x="12" y="34" fontSize="8" fill="#10b981">Regulatory Key Rotation</text>
                                  </g>

                                  <g transform="translate(20, 170)">
                                    <rect x="0" y="0" width="300" height="55" fill="#0c2220" stroke="#10b981" strokeWidth="1.5" rx="8" />
                                    <text x="15" y="22" fontSize="11" fontWeight="800" fill="#fff">{reactiveModel}</text>
                                    <text x="15" y="38" fontSize="8.5" fill="#10b981">Managed Discovery Engine · Labeled accuracy eval</text>
                                  </g>
                                </g>

                                <path d="M660 150 L 730 150" fill="none" stroke="#4285F4" strokeWidth="2" />
                                <circle cx="695" cy="150" r="4" fill="#4285F4" />
                                <text x="695" y="140" textAnchor="middle" fontSize="8" fontWeight="700" fill="#4285F4">mTLS REST API</text>

                                <g transform="translate(730, 60)">
                                  <rect x="0" y="0" width="120" height="180" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" rx="8" />
                                  <text x="60" y="22" textAnchor="middle" fontSize="9" fontWeight="900" fill="rgba(255,255,255,0.4)" letterSpacing="1">INTEGRATIONS</text>
                                  
                                  <g transform="translate(10, 40)">
                                    <rect x="0" y="0" width="100" height="45" fill="#101c30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" rx="6" />
                                    <text x="12" y="20" fontSize="11" fontWeight="700" fill="#fff">🏥 Epic EHR</text>
                                    <text x="12" y="34" fontSize="8" fill="var(--text-secondary)">Clinical Trials</text>
                                  </g>
                                  <g transform="translate(10, 105)">
                                    <rect x="0" y="0" width="100" height="45" fill="#101c30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" rx="6" />
                                    <text x="12" y="20" fontSize="11" fontWeight="700" fill="#fff">☁️ Veeva CRM</text>
                                    <text x="12" y="34" fontSize="8" fill="var(--text-secondary)">Medical Affairs</text>
                                  </g>
                                </g>
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    }

                    const getPillarSections = (id) => {
                      if (id === 'strategic') return ['ctx', 'pain', 'value', 'users'];
                      if (id === 'data') return ['data', 'current'];
                      if (id === 'architecture') return ['target'];
                      if (id === 'security') return ['security', 'connectivity'];
                      return ['team', 'sustain'];
                    };
                    const mappedSecs = getPillarSections(pId);
                    const filteredGood = nvGood.filter(g => mappedSecs.includes(g.sec));
                    const filteredBlockers = nvBlockers.filter(b => mappedSecs.includes(b.sec));
                    const filteredRecs = nvRecs.filter(r => mappedSecs.includes(r.sec));

                    const getDynamicGood = (id) => {
                      if (id === 'strategic') return [{ title: 'Executive Sponsorship Verified', desc: 'Named C-suite executive champion confirmed with active budget alignment.' }];
                      if (id === 'data') return [{ title: 'Enterprise Data Lake Foundation', desc: 'Core operational databases accessible via internal network endpoints.' }];
                      if (id === 'security') return [{ title: 'Zero Public Ingress Target', desc: 'Target network topology excludes all public internet exposure points.' }];
                      return [{ title: 'Named Engineering Bandwidth', desc: 'Dedicated engineering resources allocated with >50% sprint execution focus.' }];
                    };
                    const getDynamicRecs = (id) => {
                      if (id === 'strategic') return [{ title: 'Google Cloud FinOps MAP Offset', desc: 'Structure a Google Cloud Dual-Write FinOps consumption commitment paired with Migration Acceleration Program (MAP) funding credits.' }];
                      if (id === 'data') return [{ title: 'Automated Document AI Vector Pipeline', desc: 'Build a zero-trust GCS staging bucket leveraging custom Document AI medical parsers paired with BigQuery Vector Search indexation.' }];
                      if (id === 'security') return [{ title: 'Cloud DLP Inline Redaction Interceptor', desc: 'Deploy inline Cloud DLP proxy wrappers to automatically detect and de-identify sensitive PHI tokens prior to LLM execution.' }];
                      return [{ title: 'Vertex AI Rapid Labeled Evaluation Service', desc: 'Assemble an initial golden evaluation corpus of 250 verified clinical pairs using Vertex AI Labeled Evaluation pipelines.' }];
                    };

                    const finalGood = filteredGood.length > 0 ? filteredGood : getDynamicGood(pId);
                    const finalRecs = filteredRecs.length > 0 ? filteredRecs : getDynamicRecs(pId);

                    const getPillarTimeline = (id) => {
                      if (id === 'data') return [finalSteps[0]];
                      if (id === 'architecture') return [finalSteps[1]];
                      if (id === 'security') return [finalSteps[2]];
                      if (id === 'execution') return [finalSteps[3]];
                      return finalSteps.slice(0, 3);
                    };
                    const timelineSteps = getPillarTimeline(pId);

                    return (
                      <div key={pId} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', gap: '20px', textAlign: 'left', pageBreakInside: 'avoid', marginBottom: '24px' }}>
                        {/* Box 1: Strengths */}
                        <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-green)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                          <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-green)', margin: '0 0 10px 0' }}>
                            ✅ SCOPING STRENGTHS & IN-FAVOR FACTORS
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                            {finalGood.map((g, idx) => (
                              <div key={idx} style={{ fontSize: '11.5px' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{g.title}</strong>
                                <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{g.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Box 2: Roadblocks */}
                        <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: `4px solid ${filteredBlockers.length > 0 ? 'var(--google-red)' : 'var(--google-amber)'}`, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                          <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: filteredBlockers.length > 0 ? 'var(--google-red)' : 'var(--google-amber)', margin: '0 0 10px 0' }}>
                            ⚠️ STRATEGIC ROADBLOCKS & BLOCKERS
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                            {filteredBlockers.length === 0 ? (
                              <>
                                {pId === 'strategic' && (
                                  <div style={{ fontSize: '11.5px' }}>
                                    <strong style={{ color: 'var(--google-amber)', display: 'block' }}>START BLOCKER: Multi-Year Compute Commitment Lock-In</strong>
                                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>Existing commercial terms on legacy infrastructure penalize rapid enterprise migration without structured dual-write compute offsets.</span>
                                  </div>
                                )}
                                {pId === 'data' && (
                                  <div style={{ fontSize: '11.5px' }}>
                                    <strong style={{ color: 'var(--google-amber)', display: 'block' }}>CONDITIONAL GAP: Fragmented Protocol Storage</strong>
                                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>Unstructured clinical trial PDFs cached across legacy isolated SharePoint clusters lack automated ingestion and vector embedding sync.</span>
                                  </div>
                                )}
                                {pId === 'security' && (
                                  <div style={{ fontSize: '11.5px' }}>
                                    <strong style={{ color: 'var(--google-amber)', display: 'block' }}>FATAL BLOCKER: PII/PHI DLP Gate Ingestion Barrier</strong>
                                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>Absence of inline prompt redaction exposes unmasked patient identifiers during raw clinical trial summary execution.</span>
                                  </div>
                                )}
                                {pId === 'execution' && (
                                  <div style={{ fontSize: '11.5px' }}>
                                    <strong style={{ color: 'var(--google-amber)', display: 'block' }}>CONDITIONAL GAP: Evaluation Drift on Medical Hallucinations</strong>
                                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>Lack of a golden human-in-the-loop (HITL) curated evaluation dataset prevents continuous automated SLA verification.</span>
                                  </div>
                                )}
                              </>
                            ) : (
                              filteredBlockers.map((b, idx) => (
                                <div key={idx} style={{ fontSize: '11.5px' }}>
                                  <strong style={{ color: 'var(--google-red)', display: 'block' }}>{b.title}</strong>
                                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{b.desc}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Box 3: Remediations */}
                        <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-blue)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                          <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-blue)', margin: '0 0 10px 0' }}>
                            💡 PRIORITY REMEDIATION STRATEGIES
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                            {finalRecs.map((r, idx) => (
                              <div key={idx} style={{ fontSize: '11.5px' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{r.title}</strong>
                                <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{r.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Box 4: Actions & Timelines */}
                        <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '20px', borderLeft: '4px solid var(--google-amber)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                          <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: 'var(--google-amber)', margin: '0 0 10px 0' }}>
                            📅 JOINT ACTIONS & TIMELINES
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                            {timelineSteps.map((step, idx) => (
                              <div key={idx} style={{ fontSize: '11.5px' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{step.title}</strong>
                                <span style={{ color: 'var(--text-secondary)', display: 'block', margin: '2px 0' }}>{step.desc}</span>
                                <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '1px 4px', borderRadius: '4px', color: 'var(--text-primary)' }}>
                                  {step.owner} · {step.timeline}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  };

                  return (
                    <>
                      {/* SCREEN MODE (Interactive Single Tab) */}
                      <div className="no-print">
                        {renderPillarDossier(activeDeepDiveTab)}
                      </div>

                      {/* UNIFIED EXECUTIVE PRINT DOSSIER (Sequential Print Mode!) */}
                      <div className="print-only" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {['strategic', 'data', 'security', 'execution', 'architecture'].map(p => (
                          <div key={p} style={{ pageBreakInside: 'avoid', borderBottom: '2px solid var(--border-color)', paddingBottom: '24px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 900, color: 'var(--google-blue)', margin: '0 0 16px 0', textTransform: 'uppercase', textAlign: 'left', letterSpacing: '1px' }}>
                              § {p} PILLAR DEEP DILIGENCE
                            </h3>
                            {renderPillarDossier(p)}
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}

              </div>
            )}

          </div>
          )
        )}

      </div>
    </div>
  );
}
