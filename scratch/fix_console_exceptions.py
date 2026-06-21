file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Rename overrideAnswers to overrideScores in persistToSavedAssessments signature
content = content.replace(
    "const persistToSavedAssessments = async (cName, uName, pScore, overrideAnswers = null, overrideLiveSynthesis = null) => {",
    "const persistToSavedAssessments = async (cName, uName, pScore, overrideScores = null, overrideLiveSynthesis = null) => {"
)

# 2. Re-write handleAutoFillRandom
old_autofill_start = "  const handleAutoFillRandom = () => {"
# Let's find the end of handleAutoFillRandom. In the file, it ends around line 1756.
# Let's write a python index search to replace from 'const handleAutoFillRandom = () => {' up to the next try/catch block's end.
# Wait, let's look at the old code from line 1711 to 1765:
old_autofill_block = """  const handleAutoFillRandom = () => {
    const randIdx = Math.floor(Math.random() * PRESET_CANDIDATES.length);
    const candidate = PRESET_CANDIDATES[randIdx];
    const uniqueSuffix = '#' + Math.floor(100 + Math.random() * 900);
    const fullUseCase = `${candidate.useCaseName} [${uniqueSuffix}]`;

    setCustomerInfo(prev => ({
      ...prev,
      company: candidate.company,
      useCaseName: fullUseCase,
      domain: candidate.domain,
      connectors: ['Microsoft 365 / SharePoint', 'Veeva Vault GxP Docs', 'Google BigQuery Lake'],
      runtime: 'GCP Vertex AI',
      evidenceMode: 'funding_gate'
    }));
    setGateMode('funding_gate');

    const randomAnswers = {};
    let prioritySum = 0;

    V11_PILLARS.forEach(pillar => {
      let pillarRawScore = 0;
      pillar.questions.forEach(q => {
        if (q.options && q.options.length > 0) {
          const optIdx = Math.floor(Math.random() * 3) + Math.max(0, q.options.length - 3);
          const boundedIdx = Math.min(q.options.length - 1, Math.max(0, optIdx));
          randomAnswers[q.id] = q.type === 'multi' ? [boundedIdx] : boundedIdx;

          const optScore = q.options[boundedIdx]?.score || 75;
          pillarRawScore += optScore * (q.weightInPillar / 100);
        }
      });
      prioritySum += pillarRawScore * (pillar.weight / 100);
    });

    setAnswers(randomAnswers);
    setActiveTab('intake');
    try {
      const hashObj = window.location.hash || '';
      const params = new URLSearchParams(hashObj.split('?')[1] || '');
      const urlId = params.get('id');
      const targetId = urlId || ('tile_' + Date.now());
      window.location.hash = `#agentic-maturity-v11?id=${targetId}&view=intake_form`;
    } catch (err) {}
  };"""

new_autofill_block = """  const handleAutoFillRandom = () => {
    const randIdx = Math.floor(Math.random() * PRESET_CANDIDATES.length);
    const candidate = PRESET_CANDIDATES[randIdx];
    const uniqueSuffix = '#' + Math.floor(100 + Math.random() * 900);
    const fullUseCase = `${candidate.useCaseName} [${uniqueSuffix}]`;

    setCustomerInfo(prev => ({
      ...prev,
      company: candidate.company,
      useCaseName: fullUseCase,
      domain: candidate.domain,
      connectors: ['Microsoft 365 / SharePoint', 'Veeva Vault GxP Docs', 'Google BigQuery Lake'],
      runtime: 'GCP Vertex AI',
      evidenceMode: 'funding_gate'
    }));
    setGateMode('funding_gate');

    const randomScores = {};
    V11_PILLARS.forEach(pillar => {
      pillar.questions.forEach(q => {
        const curr = Math.floor(Math.random() * 4) + 2; // Random current score 2-5
        const fut = Math.min(5, Math.floor(Math.random() * (6 - curr)) + curr); // Random target >= current
        
        const techPain = [];
        if (curr <= 3 && q.technicalPainpoints && q.technicalPainpoints.length > 0) {
          const tIdx = Math.floor(Math.random() * q.technicalPainpoints.length);
          techPain.push(q.technicalPainpoints[tIdx]);
        }
        
        const bizPain = [];
        if (curr <= 3 && q.businessPainpoints && q.businessPainpoints.length > 0) {
          const bIdx = Math.floor(Math.random() * q.businessPainpoints.length);
          bizPain.push(q.businessPainpoints[bIdx]);
        }

        randomScores[q.id] = {
          current: curr,
          future: fut,
          techPain,
          bizPain,
          comments: `Auto-simulated compliance check validating ${q.dimension} state telemetry.`,
          skipped: false
        };
      });
    });

    setScores(randomScores);
    setActiveTab('intake');
    try {
      const hashObj = window.location.hash || '';
      const params = new URLSearchParams(hashObj.split('?')[1] || '');
      const urlId = params.get('id');
      const targetId = urlId || ('tile_' + Date.now());
      window.location.hash = `#agentic-maturity-v11?id=${targetId}&view=intake_form`;
    } catch (err) {}
  };"""

content = content.replace(old_autofill_block, new_autofill_block)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("AutoFill and Persist exceptions fixed successfully!")
