import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Replace the rehydration & auto-save block with the guarded rehydration & manual trigger helper
old_db_block = """  // --------------------------------------------------------------------------
  // POSTGRESQL DATABASE SESSION PERSISTENCE & AUTO-REHYDRATION ENGINE
  // --------------------------------------------------------------------------
  
  // 1. Rehydrate V12 State directly from the PostgreSQL Database Session
  useEffect(() => {
    if (!activeSessionId || !sessions || sessions.length === 0) return;

    const dbSession = sessions.find(s => s.id === activeSessionId);
    if (!dbSession || !dbSession.versions || dbSession.versions.length === 0) return;

    try {
      const latestVer = dbSession.versions[dbSession.versions.length - 1];
      
      // Load Scores from DB
      if (latestVer.scores && Object.keys(latestVer.scores).length > 0) {
        setScores(latestVer.scores);
      }

      // Load Customer Profile from DB
      if (latestVer.formData) {
        setCustomerInfo({
          company: latestVer.formData.customerName || latestVer.formData.company || 'Pfizer Oncology Research',
          useCaseName: latestVer.formData.useCaseName || 'Clinical Trial Protocol Generator [V12]',
          domain: latestVer.formData.customerDomain || latestVer.formData.industry || latestVer.formData.domain || 'Clinical Development',
          runtime: latestVer.formData.runtime || 'Google Cloud Vertex AI',
          connectors: latestVer.formData.connectors || ['Medidata Rave REST API', 'BigQuery Omnishare', 'Veeva Vault GxP Docs']
        });
      }

      // Restore report view mode if they were viewing a compiled report
      const savedPage = localStorage.getItem(`v12_report_page_${activeSessionId}`);
      if (savedPage) {
        setReportPage(savedPage);
        setActiveTab('scorecard');
      }
    } catch (e) {
      console.error("[GxP_DB_REHYDRATION_ERROR] Failed to rehydrate session from database:", e);
    }
  }, [activeSessionId, sessions]);

  // 2. Real-Time Debounced Auto-Save Callback to PostgreSQL Database
  useEffect(() => {
    if (!activeSessionId || !onSaveSession) return;
    
    const timer = setTimeout(() => {
      try {
        const metadata = {
          customerName: customerInfo.company || 'Pfizer Oncology Research',
          customerDomain: customerInfo.domain || 'Clinical Development',
          useCaseName: customerInfo.useCaseName || 'Clinical Trial Protocol Generator [V12]',
          runtime: customerInfo.runtime || 'Google Cloud Vertex AI',
          connectors: customerInfo.connectors || []
        };
        
        // Write all V12 scores and metadata directly to the PostgreSQL database!
        onSaveSession(metadata, scores, liveSynthesis || '', null, null);
      } catch (e) {
        print("[GxP_DB_AUTOSAVE_ERROR] Failed to save session to database:", e);
      }
    }, 800); // 800ms debounce to prevent database query spam on rapid checkbox clicks!
    
    return () => clearTimeout(timer);
  }, [scores, customerInfo, activeSessionId]);

  // 3. Save active report view page locally (transient view state)
  useEffect(() => {
    if (!activeSessionId) return;
    localStorage.setItem(`v12_report_page_${activeSessionId}`, reportPage);
  }, [reportPage, activeSessionId]);"""

replacement_db_block = """  // --------------------------------------------------------------------------
  // POSTGRESQL DATABASE SESSION PERSISTENCE & AUTO-REHYDRATION ENGINE
  // --------------------------------------------------------------------------
  
  // 1. Rehydrate V12 State directly from the PostgreSQL Database Session (Guarded deep-equality check)
  useEffect(() => {
    if (!activeSessionId || !sessions || sessions.length === 0) return;

    const dbSession = sessions.find(s => s.id === activeSessionId);
    if (!dbSession || !dbSession.versions || dbSession.versions.length === 0) return;

    try {
      const latestVer = dbSession.versions[dbSession.versions.length - 1];
      
      // Deep JSON equality guard to completely block circular React re-render loops!
      if (latestVer.scores && Object.keys(latestVer.scores).length > 0) {
        const localScoresJson = JSON.stringify(scores);
        const dbScoresJson = JSON.stringify(latestVer.scores);
        if (localScoresJson !== dbScoresJson) {
          setScores(latestVer.scores);
        }
      }

      // Deep JSON equality guard for customer info profile
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

      // Restore report view mode if they were viewing a compiled report
      const savedPage = localStorage.getItem(`v12_report_page_${activeSessionId}`);
      if (savedPage) {
        setReportPage(savedPage);
        setActiveTab('scorecard');
      }
    } catch (e) {
      console.error("[GxP_DB_REHYDRATION_ERROR] Failed to rehydrate session from database:", e);
    }
  }, [activeSessionId, sessions]);

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
  }, [reportPage, activeSessionId]);"""

code = code.replace(old_db_block, replacement_db_block)

# 2. Add auto-save triggers inside the milestone buttons:
# Milestone 1: "View Report Blueprint" click (around line 1338)
old_blueprint_btn = """              <button
                onClick={handleRunLiveGeminiAssessment}
                disabled={geminiStreamingState.active}
                style={{ background: colors.purpleGradient, color: '#ffffff', border: 'none', borderRadius: '6px', padding: '0.45rem 0', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)' }}
              >
                <Activity size={12} /> View Report Blueprint
              </button>"""

replacement_blueprint_btn = """              <button
                onClick={() => {
                  triggerDbSave(scores, customerInfo); // Auto-save to DB before loading report!
                  handleRunLiveGeminiAssessment();
                }}
                disabled={geminiStreamingState.active}
                style={{ background: colors.purpleGradient, color: '#ffffff', border: 'none', borderRadius: '6px', padding: '0.45rem 0', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)' }}
              >
                <Activity size={12} /> View Report Blueprint
              </button>"""

code = code.replace(old_blueprint_btn, replacement_blueprint_btn)

# Milestone 2: "Approve Budget" in Control Tower (around line 1676)
# Milestone 3: "Certify & Lock" in Moonshot (around line 4345)
# In these manual sign-offs, we can trigger the save inside the alert/click block.
# Let's add the DB save to Approve Budget:
old_approve_budget = """                  <Shield size={13} /> {isSignedOff ? "Approved & Locked" : "Approve Budget"}
                </button>"""

replacement_approve_budget = """                  <Shield size={13} /> {isSignedOff ? "Approved & Locked" : "Approve Budget"}
                </button>"""
# Actually, let's inject it directly in the onClick of the Approve Budget button.
# Let's find it. Line 1676 is the button rendering. Let's do a replace of the onClick block:
old_onclick_budget = """                  onClick={() => {
                    if (isSignedOff) {
                      alert("⚠️ Architecture has already been cryptographically signed!");
                    } else {
                      setSignOffModalActive(true);
                    }
                  }}"""

replacement_onclick_budget = """                  onClick={() => {
                    if (isSignedOff) {
                      alert("⚠️ Architecture has already been cryptographically signed!");
                    } else {
                      triggerDbSave(scores, customerInfo); // Auto-save to DB on approval!
                      setSignOffModalActive(true);
                    }
                  }}"""

code = code.replace(old_onclick_budget, replacement_onclick_budget)

# 3. Inject the beautiful manual "Save Active Scoping" button in the sidebar (both Intake mode and Report mode)
# In Intake mode, let's put it right above "View Report Blueprint"
old_intake_buttons = """              <button
                onClick={handleAutoFillRandom}
                style={{ background: 'rgba(37, 99, 235, 0.04)', border: '1px solid rgba(37, 99, 235, 0.15)', color: '#2563eb', borderRadius: '6px', padding: '0.35rem 0', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
              >
                <Sparkles size={11} /> Prefill Demo Scenario
              </button>"""

replacement_intake_buttons = """              <button
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
              </button>"""

code = code.replace(old_intake_buttons, replacement_intake_buttons)

# In Report mode, let's put it right below "Back to Scoping Matrix"
old_report_buttons = """              <button
                onClick={() => handleTabSwitch('intake')}
                style={{ background: '#f1f5f9', border: '1px solid rgba(15, 23, 42, 0.08)', color: '#0f172a', borderRadius: '6px', padding: '0.45rem 0', fontSize: '0.68rem', fontWeight: 800, cursor: 'pointer' }}
              >
                ← Back to Scoping Matrix
              </button>"""

replacement_report_buttons = """              <button
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
              </button>"""

code = code.replace(old_report_buttons, replacement_report_buttons)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully broke circular loops & deployed Manual Scoping Savers!")
