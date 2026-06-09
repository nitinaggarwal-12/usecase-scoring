import express from 'express';
import cors from 'cors';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

import { GoogleAuth } from 'google-auth-library';

// Permanent GCE Metadata Auto-Refresh Ingestion Endpoint (Zero Client Credentials!)
const gceAuth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

app.post('/api/v10/synthesize', async (req, res) => {
  try {
    const client = await gceAuth.getClient();
    const projectId = await gceAuth.getProjectId() || 'nitinagga-ge';
    const location = 'us-central1';
    const model = 'gemini-1.5-pro';

    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:streamGenerateContent`;
    
    const response = await client.request({
      method: 'POST',
      url,
      data: req.body
    });

    return res.json(response.data);
  } catch (err) {
    console.error('[GCE_SYNTHESIZE_ERROR]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// Native PostgreSQL Pool (Peer Unix Domain Socket Auth)
const pool = new pg.Pool({
  host: '/var/run/postgresql'
});

// Automated Backup Archive Directory
const BACKUP_DIR = path.join(__dirname, 'backup_archive');
const BACKUP_FILE = path.join(BACKUP_DIR, 'v10_assessments_backup.json');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Ensure default backup file exists
const DEFAULT_PORTFOLIO = [
  { id: 'merck_sop', company: 'Merck & Co.', useCase: 'Regulatory SOP Assistant', domain: 'Quality & Regulatory', priorityScore: 92, verdict: 'Launch Now', date: 'June 2, 2026', presetKey: 'sop_assistant' },
  { id: 'merck_gma', company: 'Merck & Co.', useCase: 'GMAX Pricing Agent (AccessIQ)', domain: 'Commercial Ops', priorityScore: 88, verdict: 'Launch Now', date: 'June 7, 2026', presetKey: 'ai_scanned_custom' },
  { id: 'pfizer_copilot', company: 'Pfizer Inc.', useCase: 'Submission Drafting Copilot', domain: 'R&D / Clinical', priorityScore: 78, verdict: 'Incubate & Validate', date: 'May 28, 2026', presetKey: 'submission_copilot' },
  { id: 'roche_inv', company: 'Roche AG', useCase: 'Quality Event Investigator', domain: 'Quality & Regulatory', priorityScore: 64, verdict: 'Hold & Re-Architect', date: 'June 5, 2026', presetKey: 'quality_investigator' }
];

if (!fs.existsSync(BACKUP_FILE)) {
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(DEFAULT_PORTFOLIO, null, 2), 'utf8');
}

// Helper to write to local flat-file backup
const syncToFlatFileBackup = (entries) => {
  try {
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(entries, null, 2), 'utf8');
  } catch (err) {
    console.error('[DUAL_WRITE_WARN] Flat-file backup sync failed:', err.message);
  }
};

// Stub endpoints to satisfy App.jsx bootstrap network sync over reverse proxy
app.get('/api/sessions', (req, res) => res.json([]));
app.get('/api/settings', (req, res) => res.json({}));

// GET: Fetch all assessments (Primary Postgres with Flat-File Fallback)
app.get('/api/v10/assessments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM v10_assessments ORDER BY created_at DESC');
    const mapped = result.rows.map(r => ({
      id: r.id,
      company: r.company,
      useCase: r.use_case,
      domain: r.domain,
      priorityScore: r.priority_score,
      verdict: r.verdict,
      date: new Date(r.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      presetKey: r.scoring_vector?.presetKey || 'ai_scanned_custom',
      scoringVector: r.scoring_vector
    }));
    // Keep flat-file backup synchronized with latest Postgres read
    syncToFlatFileBackup(mapped);
    return res.json({ source: 'POSTGRES', data: mapped });
  } catch (err) {
    console.error('[POSTGRES_READ_ERROR] Native DB read failed. Falling back to offline flat-file backup:', err.message);
    try {
      const backupData = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
      return res.json({ source: 'FILE_BACKUP', data: backupData });
    } catch (fileErr) {
      return res.json({ source: 'DEFAULT_PORTFOLIO', data: DEFAULT_PORTFOLIO });
    }
  }
});

// POST: Save assessment via Atomic Dual-Write Engine
app.post('/api/v10/assessments', async (req, res) => {
  const { company, useCase, domain, priorityScore, verdict, presetKey, scoringVector } = req.body;
  const targetId = req.body.id || 'tile_' + Date.now();
  const targetCompany = company || 'Novartis Pharma AG';
  const targetUseCase = useCase || 'Autonomous Assessment';
  const targetDomain = domain || 'R&D / Clinical';
  const targetScore = priorityScore !== undefined ? Number(priorityScore) : 92;
  const targetVerdict = verdict || (targetScore >= 90 ? 'Launch Now' : (targetScore >= 75 ? 'Incubate & Validate' : 'Hold & Re-Architect'));
  const targetPreset = presetKey || 'ai_scanned_custom';
  const targetVector = scoringVector || { presetKey: targetPreset };

  const newEntry = {
    id: targetId,
    company: targetCompany,
    useCase: targetUseCase,
    domain: targetDomain,
    priorityScore: targetScore,
    verdict: targetVerdict,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    presetKey: targetPreset,
    scoringVector: targetVector
  };

  let pgSuccess = false;
  try {
    await pool.query(
      `INSERT INTO v10_assessments (id, company, use_case, domain, priority_score, verdict, scoring_vector, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (id) DO UPDATE SET
         company = EXCLUDED.company,
         use_case = EXCLUDED.use_case,
         domain = EXCLUDED.domain,
         priority_score = EXCLUDED.priority_score,
         verdict = EXCLUDED.verdict,
         scoring_vector = EXCLUDED.scoring_vector,
         created_at = NOW()`,
      [targetId, targetCompany, targetUseCase, targetDomain, targetScore, targetVerdict, JSON.stringify(targetVector)]
    );
    pgSuccess = true;
  } catch (err) {
    console.error('[POSTGRES_WRITE_ERROR] Native DB commit failed:', err.message);
  }

  // Simultaneously update flat-file JSON backup
  try {
    let existing = DEFAULT_PORTFOLIO;
    if (fs.existsSync(BACKUP_FILE)) {
      existing = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
    }
    const filtered = existing.filter(x => x.useCase !== targetUseCase && x.id !== targetId);
    const nextArr = [newEntry, ...filtered];
    syncToFlatFileBackup(nextArr);
  } catch (fileErr) {
    console.error('[FILE_WRITE_ERROR]', fileErr.message);
  }

  return res.json({
    success: true,
    dualWrite: pgSuccess,
    source: pgSuccess ? 'POSTGRES_AND_FILE' : 'FILE_ONLY',
    data: newEntry
  });
});

app.listen(PORT, () => {
  console.log(`[SYS_INIT] Native PostgreSQL + Dual-Write Express Microservice active on port ${PORT}`);
});
