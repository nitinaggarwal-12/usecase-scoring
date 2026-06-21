import os

v3_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/App_v3.jsx'
v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

# =========================================================================
# STEP 1: PATCH App_v3.jsx TO PASS DATABASE PROPS TO V12 COCKPIT
# =========================================================================

with open(v3_path, 'r', encoding='utf-8') as f:
    v3_code = f.read()

target_v3_mount = """          ) : activeFramework === 'option12' ? (
            <PremiumScopingAssessorV12 
              globalTheme={globalTheme}
              apiKey={apiKey}
              gcpToken={gcpToken}
              onBackToLanding={() => {
                setViewMode('landing');
                window.location.hash = '#landing-option12';
              }}
            />"""

replacement_v3_mount = """          ) : activeFramework === 'option12' ? (
            <PremiumScopingAssessorV12 
              globalTheme={globalTheme}
              apiKey={apiKey}
              gcpToken={gcpToken}
              onBackToLanding={() => {
                setViewMode('landing');
                window.location.hash = '#landing-option12';
              }}
              onSaveSession={handleSaveMaturitySession}
              activeSessionId={activeSessionId}
              sessions={sessions}
            />"""

if target_v3_mount in v3_code:
    v3_code = v3_code.replace(target_v3_mount, replacement_v3_mount)
    print("✓ Successfully patched App_v3.jsx mount points!")
else:
    print("❌ target_v3_mount not found in App_v3.jsx!")

with open(v3_path, 'w', encoding='utf-8') as f:
    f.write(v3_code)


# =========================================================================
# STEP 2: PATCH PremiumScopingAssessorV12.jsx TO CONNECT DATABASE
# =========================================================================

with open(v12_path, 'r', encoding='utf-8') as f:
    v12_code = f.read()

# 1. Patch the component signature to receive database props
target_header = "export default function PremiumScopingAssessorV12({ onBackToLanding, globalTheme = 'light', apiKey = '', gcpToken = '' }) {"

replacement_header = """export default function PremiumScopingAssessorV12({ 
  onBackToLanding, 
  globalTheme = 'light', 
  apiKey = '', 
  gcpToken = '',
  onSaveSession,
  activeSessionId,
  sessions = []
}) {"""

if target_header in v12_code:
    v12_code = v12_code.replace(target_header, replacement_header)
    print("✓ Successfully patched V12 component signature!")
else:
    print("❌ target_header not found in PremiumScopingAssessorV12.jsx!")

# 2. Patch the persistence block from localStorage to PostgreSQL DB
target_persistence_block = """  // --------------------------------------------------------------------------
  // FDA GxP SESSION PERSISTENCE & AUTO-REHYDRATION ENGINE
  // --------------------------------------------------------------------------
  
  // Extract Session ID from URL Hash
  const getSessionIdFromHash = () => {
    const hash = window.location.hash || '';
    if (hash.includes('session=')) {
      const params = new URLSearchParams(hash.split('?')[1]);
      return params.get('session');
    }
    return null;
  };

  const activeSessionId = getSessionIdFromHash();

  // 1. Rehydrate State from LocalStorage upon mounting/hashchange
  useEffect(() => {
    const sessId = getSessionIdFromHash();
    if (!sessId) return;

    try {
      // Rehydrate Scores
      const savedScoresRaw = localStorage.getItem(`v12_scores_${sessId}`);
      if (savedScoresRaw) {
        const parsed = JSON.parse(savedScoresRaw);
        setScores(prev => ({ ...prev, ...parsed }));
      }

      // Rehydrate Customer Info
      const savedInfoRaw = localStorage.getItem(`v12_customer_info_${sessId}`);
      if (savedInfoRaw) {
        setCustomerInfo(JSON.parse(savedInfoRaw));
      }

      // Rehydrate Report Page View Mode & Tab View
      const savedPage = localStorage.getItem(`v12_report_page_${sessId}`);
      if (savedPage) {
        setReportPage(savedPage);
        setActiveTab('scorecard'); // Automatically lock them into the report dashboard view!
      }
    } catch (e) {
      console.error("[GxP_REHYDRATION_ERROR] Failed to restore session states:", e);
    }
  }, [activeSessionId]);

  // 2. Auto-Save States to LocalStorage in Real-Time
  useEffect(() => {
    const sessId = getSessionIdFromHash();
    if (!sessId) return;

    try {
      // Write Scores
      localStorage.setItem(`v12_scores_${sessId}`, JSON.stringify(scores));

      // Write Customer Info
      localStorage.setItem(`v12_customer_info_${sessId}`, JSON.stringify(customerInfo));

      // Write Report Page View Mode
      localStorage.setItem(`v12_report_page_${sessId}`, reportPage);
    } catch (e) {
      console.error("[GxP_AUTOSAVE_ERROR] Failed to persist session states:", e);
    }
  }, [scores, customerInfo, reportPage, activeSessionId]);"""

replacement_database_engine = """  // --------------------------------------------------------------------------
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

if target_persistence_block in v12_code:
    v12_code = v12_code.replace(target_persistence_block, replacement_database_engine)
    print("✓ Successfully deployed PostgreSQL Database Sync Engine!")
else:
    print("❌ target_persistence_block not found in PremiumScopingAssessorV12.jsx!")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(v12_code)

print("🎉 Complete!")
