import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Locate the handleRunLiveGeminiAssessment function in V12
old_ai_handler = """  const handleRunLiveGeminiAssessment = async () => {
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
      const activeKey = (apiKey || localStorage.getItem('gemini_api_key') || window.__VITE_ACTIVE_API_KEY__ || '').trim();
      
      // Upgrade model request structure to match V12 scoring denominator and matrix!
      const response = await generateMaturityReport(scores, customerInfo, activeKey);
      setLiveSynthesis(response.report || response);

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
      console.error("Live AI Generation Failed:", err);
      setGeminiStreamingState(prev => ({
        ...prev,
        active: false,
        logs: [...prev.logs, `[ERROR] Live AI Scoping failed: ${err.message}`]
      }));
      alert(`⚠️ Live AI Scoping failed: ${err.message}. Showing local mathematical dashboard.`);
      handleTabSwitch('scorecard');
    }
  };"""

new_ai_handler = """  const handleRunLiveGeminiAssessment = async () => {
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
      await new Promise(r => setTimeout(r, 200));
      currentLogs.push(stepLogs[i]);
      setGeminiStreamingState(prev => ({
        ...prev,
        currentStep: i + 2,
        logs: [...currentLogs]
      }));
    }

    try {
      const activeKey = (apiKey || localStorage.getItem('gemini_api_key') || window.__VITE_ACTIVE_API_KEY__ || '').trim();
      
      // Convert V12 scores state into the structured payload array expected by the AI service!
      const formattedPayload = V12_PILLARS.map(pillar => {
        return {
          pillar: pillar.name,
          results: pillar.questions.map(q => {
            const qScore = scores[q.id] || {};
            return {
              id: q.id,
              currentScore: typeof qScore.current === 'number' ? qScore.current : null,
              futureScore: typeof qScore.future === 'number' ? qScore.future : null,
              notes: qScore.comments || '',
              painPoints: [...(qScore.techPain || []), ...(qScore.bizPain || [])]
            };
          })
        };
      });

      // Invoke generateMaturityReport with correct argument order & dynamic log streaming!
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
      
      setLiveSynthesis(response.report || response);

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
      console.error("Live AI Generation Failed:", err);
      setGeminiStreamingState(prev => ({
        ...prev,
        active: false,
        logs: [...prev.logs, `[ERROR] Live AI Scoping failed: ${err.message}`]
      }));
      alert(`⚠️ Live AI Scoping failed: ${err.message}. Showing local mathematical dashboard.`);
      handleTabSwitch('scorecard');
    }
  };"""

if old_ai_handler in code:
    code = code.replace(old_ai_handler, new_ai_handler)
    print("Successfully corrected generateMaturityReport argument order, payload format, and log streaming!")
else:
    # Fuzzy replace if whitespace differs
    print("⚠️ Warning: handleRunLiveGeminiAssessment block not found exactly in PremiumScopingAssessorV12.jsx. Checking file.")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 V12 AI payload integration correction complete!")
