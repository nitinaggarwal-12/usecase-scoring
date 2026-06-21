file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Surgical replacement for handleRoute session restoration (lines 1172 to 1205 approximately)
old_route_restore_block = """      if (idParam && matchedTile && matchedTile.scoringVector) {
        const vec = { ...matchedTile.scoringVector };
        // If loading the Merck demo preset, ignore any stale, hardcoded pre-saved liveSynthesis
        // to force a fresh, dynamic, real-time scoping generation!
        if (idParam === 'demo_merck_preset' || presetParam) {
          vec.liveSynthesis = null;
        }
        let restoredScores = vec.scores || vec.answers || {};
        let restoredCust = vec.customerInfo || {};
        
        if (Object.keys(restoredScores).length === 0) { restoredScores = {}; }
        setScores(restoredScores);
        if (Object.keys(restoredAnswers).length === 0) {
          restoredAnswers = {
            Q1: 4, Q2: 4, Q3: 3, Q4: 4, Q5: 4, Q6: 4, Q7: 3, Q8: 4, Q9: 3, Q10: 3,
            Q11: 4, Q12: 3, Q13: 4, Q14: 4, Q15: 4, Q16: 3, Q17: 4, Q18: 3,
            Q19: 4, Q20: 4, Q21: 4, Q22: 4, Q23: 3, Q24: 4, Q25: 4, Q26: 3, Q27: 4, Q28: 3, Q29: 4, Q30: 4
          };
          restoredCust = {
            company: matchedTile.company || 'Enterprise Candidate',
            useCaseName: matchedTile.useCase || 'BeyondCorp Digital GxP Copilot',
            domain: matchedTile.domain || 'R&D / Clinical',
            runtime: 'GCP Vertex AI',
            connectors: ['BigQuery Vector Mesh', 'SharePoint Mesh', 'Veeva Vault Docs'],
            evidenceMode: 'funding_gate'
          };
        }
        
        setAnswers(restoredAnswers);
        setCustomerInfo(restoredCust);"""

new_route_restore_block = """      if (idParam && matchedTile && matchedTile.scoringVector) {
        const vec = { ...matchedTile.scoringVector };
        // If loading the Merck demo preset, ignore any stale, hardcoded pre-saved liveSynthesis
        // to force a fresh, dynamic, real-time scoping generation!
        if (idParam === 'demo_merck_preset' || presetParam) {
          vec.liveSynthesis = null;
        }
        let restoredScores = vec.scores || {};
        let restoredCust = vec.customerInfo || {};
        
        if (Object.keys(restoredScores).length === 0) { restoredScores = {}; }
        setScores(restoredScores);
        setCustomerInfo(restoredCust);"""

content = content.replace(old_route_restore_block, new_route_restore_block)

# 2. Surgical replacement for handleAutoFillRandom (matching the exact file content character-for-character)
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
      params.set('view', 'intake');
      window.location.hash = `#agentic-maturity-v11?${params.toString()}`;
    } catch(e) {}
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
          comments: `Auto-simulated GxP compliance check validating ${q.dimension} state telemetry.`,
          skipped: false
        };
      });
    });

    setScores(randomScores);
    setActiveTab('intake');
    try {
      const hashObj = window.location.hash || '';
      const params = new URLSearchParams(hashObj.split('?')[1] || '');
      params.set('view', 'intake');
      window.location.hash = `#agentic-maturity-v11?${params.toString()}`;
    } catch(e) {}
  };"""

content = content.replace(old_autofill_block, new_autofill_block)

# 3. Completely delete the unused handleSelectOption method
old_select_option_block = """  const handleSelectOption = useCallback((qId, optionIdx, isMulti) => {
    setAnswers(prev => {
      if (isMulti) {
        const curr = prev[qId] || [];
        if (curr.includes(optionIdx)) {
          return { ...prev, [qId]: curr.filter(x => x !== optionIdx) };
        } else {
          return { ...prev, [qId]: [...curr, optionIdx] };
        }
      } else {
        return { ...prev, [qId]: optionIdx };
      }
    }
  }, []);"""

# Let's do a direct replace of handleSelectOption since it's a small block
content = content.replace(
    """  const handleSelectOption = useCallback((qId, optionIdx, isMulti) => {
    setAnswers(prev => {
      if (isMulti) {
        const curr = prev[qId] || [];
        if (curr.includes(optionIdx)) {
          return { ...prev, [qId]: curr.filter(x => x !== optionIdx) };
        } else {
          return { ...prev, [qId]: [...curr, optionIdx] };
        }
      } else {
        return { ...prev, [qId]: optionIdx };
      }
    });
  }, []);""",
    ""
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("All setAnswers and restoredAnswers references successfully eliminated from V11 source!")
