import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the randomized handleAutoFillRandom with a 100% deterministic prefiller
target_prefiller = """  // High-Randomness Dynamic Scopes Prefiller
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
  };"""

replacement_prefiller = """  // 100% Deterministic Scopes Prefiller (Zero Randomness - Guaranteed First-Click Selection)
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
  };"""

code = code.replace(target_prefiller, replacement_prefiller)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully deployed 100% deterministic first-click prefiller!")
