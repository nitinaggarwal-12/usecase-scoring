import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target our database rehydration block
old_db_rehydration = """  // 1. Rehydrate V12 State directly from the PostgreSQL Database Session (Guarded deep-equality check)
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
  }, [activeSessionId, sessions]);"""

# Replace with the hybrid rehydration engine (LocalStorage immediate first-render + DB background alignment!)
replacement_hybrid_rehydration = """  // 1. Hybrid GxP Persistence Engine (LocalStorage Immediate Mount + PostgreSQL Database Sync)
  
  // Phase A: Immediate Synchronous Rehydration on Mount (Prevents form resets & keeps view mode!)
  useEffect(() => {
    if (!activeSessionId) return;

    try {
      // Synchronously restore scores from local cache to prevent empty screen flashes!
      const cachedScoresRaw = localStorage.getItem(`v12_scores_${activeSessionId}`);
      if (cachedScoresRaw) {
        const parsed = JSON.parse(cachedScoresRaw);
        if (JSON.stringify(scores) !== JSON.stringify(parsed)) {
          setScores(parsed);
        }
      }

      // Synchronously restore customer profile
      const cachedInfoRaw = localStorage.getItem(`v12_customer_info_${activeSessionId}`);
      if (cachedInfoRaw) {
        const parsed = JSON.parse(cachedInfoRaw);
        if (JSON.stringify(customerInfo) !== JSON.stringify(parsed)) {
          setCustomerInfo(parsed);
        }
      }

      // Synchronously restore report view tab and sub-page
      const cachedPage = localStorage.getItem(`v12_report_page_${activeSessionId}`);
      if (cachedPage) {
        setReportPage(cachedPage);
        setActiveTab('scorecard');
      }
    } catch (e) {
      console.error("[GxP_LOCAL_REHYDRATION_ERROR] Failed immediate mount restore:", e);
    }
  }, [activeSessionId]);

  // Phase B: Asynchronous Database Alignment (Aligns local state with database once network fetch completes)
  useEffect(() => {
    if (!activeSessionId || !sessions || sessions.length === 0) return;

    const dbSession = sessions.find(s => s.id === activeSessionId);
    if (!dbSession || !dbSession.versions || dbSession.versions.length === 0) return;

    try {
      const latestVer = dbSession.versions[dbSession.versions.length - 1];
      
      // Sync scores with database
      if (latestVer.scores && Object.keys(latestVer.scores).length > 0) {
        const localScoresJson = JSON.stringify(scores);
        const dbScoresJson = JSON.stringify(latestVer.scores);
        if (localScoresJson !== dbScoresJson) {
          setScores(latestVer.scores);
        }
      }

      // Sync customer profile with database
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
    } catch (e) {
      console.error("[GxP_DB_ALIGNMENT_ERROR] Failed background database alignment:", e);
    }
  }, [activeSessionId, sessions]);

  // Phase C: Write-through Cache (Saves state locally on any change to back up Phase A rehydration)
  useEffect(() => {
    if (!activeSessionId) return;
    try {
      localStorage.setItem(`v12_scores_${activeSessionId}`, JSON.stringify(scores));
      localStorage.setItem(`v12_customer_info_${activeSessionId}`, JSON.stringify(customerInfo));
    } catch (e) {
      console.error("[GxP_CACHE_WRITE_ERROR] Failed writing to local cache:", e);
    }
  }, [scores, customerInfo, activeSessionId]);"""

code = code.replace(old_db_rehydration, replacement_hybrid_rehydration)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully deployed Hybrid Local+Database Rehydration Engine!")
